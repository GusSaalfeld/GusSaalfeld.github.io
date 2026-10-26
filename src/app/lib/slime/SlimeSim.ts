// src/lib/slime/SlimeSim.ts
import { Renderer, Program, Mesh, Triangle, Geometry, RenderTarget } from "ogl";
import type { OGLRenderingContext } from "ogl";
import {
  fullscreenVert, updateAgentFrag, depositVert, depositFrag, diffuseFrag, displayFrag,
  agentsOnlyVert, agentsOnlyFrag, splashVert, splashFrag, foodVert, foodFrag,
  copyTrailFrag, remapAgentsFrag,
} from "./shader";
import {
  SlimeSettings, mergeSettings, SPAWN_MODE_INDEX, MAX_SPECIES, MAX_TRAIL_PALETTE,
} from "./SlimeSettings";
import { Creatures, MAX_CREATURES } from "./Creatures";
import { MAX_FOOD, foodPosition } from "./Dish";

// How a resize carries the slime over (see resize()). "stretch": stretched to the new size, as the
// simulation always looked. "crop": kept at its scale on screen, cropped or opening new space
const RESIZE_MODE: "stretch" | "crop" = "stretch";

// The simulation advances in fixed ticks of settings.fixedTimeStep seconds, however fast the
// screen refreshes. Without this, a 144 Hz display would run 2.4x faster than a 60 Hz one.
const MAX_FRAME_SECONDS = 0.05; // after a stall (hidden tab), catch up at most this much

// Warmup runs this many steps per animation frame, so a long warmup never freezes the page.
const WARMUP_STEPS_PER_FRAME = 60;
const WARMUP_FADE_SECONDS = 4; // fade-in once the warmup finishes

// After this long without pointer movement, the torch drifts on its own
const POINTER_IDLE_MS = 4000;
const LIGHT_FOLLOW_RATE = 6; // how quickly the light catches up with its target, per second

// The plankton wake (see splash()): points scattered per frame, how much glow each adds at most,
// and the light speed, in trail texels per second, at which the wake is brightest
const SPLASH_POINTS = 24;
const SPLASH_POINT_GLOW = 0.5;
const SPLASH_FULL_SPEED = 300;

export class SlimeSim {
  // Edit these at any time. Live settings apply on the next step. For structural ones
  // (agent count, trail resolution, spawn mode) use updateSettings().
  readonly settings: SlimeSettings;

  private renderer: Renderer;
  private gl: OGLRenderingContext & WebGL2RenderingContext;

  // Ping-pong pairs: A is the current state, B is what the next pass writes into.
  private agentsA!: RenderTarget; // created by buildAgents(), which the constructor calls
  private agentsB!: RenderTarget;
  private trailA!: RenderTarget;  // created by resize(), which the constructor calls
  private trailB!: RenderTarget;

  private update: Mesh;
  private deposit: Mesh;
  private diffuse: Mesh;
  private display: Mesh;
  private agentsOnly: Mesh;
  private copyTrail: Mesh;          // carries the trail over to a resized trail texture
  private remapAgents: Mesh;        // and moves the agents to match
  private splashMesh: Mesh;         // the plankton wake
  private foodMesh: Mesh;           // the petri dish's oats, giving off trail
  // The petri dish, 0..1 of the canvas with y up (radius as a fraction of the width), from setDish().
  // Null until the page places it
  private dish: { x: number; y: number; radius: number } | null = null;
  private focus = -1;               // which oat is ringed (setFocus), -1 for none
  private agentGeometry!: Geometry; // one point per agent, shared by deposit and agentsOnly
  private creatures = new Creatures(); // starfish, drawn by the display pass
  // The torch's light, 0..1 of the canvas with y up. It eases toward the pointer, or drifts when
  // the pointer hasn't moved for POINTER_IDLE_MS
  private light = { x: 0.5, y: 0.5 };
  private pointer: { x: number; y: number; time: number } | null = null;
  private driftTime = 0;

  private cssWidth: number;
  private cssHeight: number;
  private structure = "";         // the structural settings the current targets were built from
  private builtWrap = false;       // the wrapEdges the trail targets were built with
  private stepCount = 0;          // seeds the random numbers. Wraps so floats stay exact
  private lastTime = 0;           // ms timestamp of the previous frame(), 0 = none yet
  private owed = 0;               // ticks owed from earlier frames (fractional)
  private warmupLeft = 0;         // hidden steps still to run before the next picture

  // width and height are the CSS size of the area the canvas will fill.
  constructor(canvas: HTMLCanvasElement, width: number, height: number, settings: Partial<SlimeSettings> = {}) {
    this.settings = mergeSettings(settings);
    this.cssWidth = width;
    this.cssHeight = height;

    this.renderer = new Renderer({ canvas, dpr: 1, alpha: false });
    const gl = (this.gl = this.renderer.gl as OGLRenderingContext & WebGL2RenderingContext);

    if (!this.renderer.isWebgl2 || !gl.getExtension("EXT_color_buffer_float")) {
      throw new Error("WebGL2 with float render targets is required");
    }

    const quad = new Triangle(gl);
    const pass = (fragment: string, uniforms: Record<string, { value: unknown }>) =>
      new Mesh(gl, {
        geometry: quad,
        program: new Program(gl, { vertex: fullscreenVert, fragment, uniforms, depthTest: false }),
      });

    this.update = pass(updateAgentFrag, {
      uAgents: { value: null }, uTrail: { value: null },
      uDeltaTime: { value: 0 }, uStep: { value: 0 },
      uNumAgents: { value: 0 }, uSpawnMode: { value: 0 }, uWrap: { value: 0 },
      uMove: { value: [0, 0, 0, 0] }, uSensorSize: { value: 1 }, uSpeciesCount: { value: 1 },
      uLight: { value: [0, 0] }, uLightAversion: { value: [1, 0] },
      uDish: { value: [0, 0, 0] }, uRespawnChance: { value: 0 },
    });
    this.diffuse = pass(diffuseFrag, {
      uTrail: { value: null }, uDeltaTime: { value: 0 }, uDiffuseRate: { value: 0 },
      uDecayRate: { value: 0 }, uTrailCap: { value: 1 },
    });
    this.display = pass(displayFrag, {
      uTrail: { value: null }, uBackground: { value: [0, 0, 0] },
      // Every species' colours in one flat array, MAX_TRAIL_PALETTE slots each. Refilled in draw().
      // Uniform arrays must be plain arrays: OGL skips a typed array for a uniform declared as an array
      uPalette: { value: new Array(MAX_SPECIES * MAX_TRAIL_PALETTE * 3).fill(0) },
      uPaletteSizes: { value: [1, 1, 1, 1] }, uSpeciesCount: { value: 1 },
      uPixelated: { value: 0 }, uSteps: { value: 0 },
      // Starfish, refilled in draw(). uStarfish holds MAX_CREATURES vec4 slots
      uTime: { value: 0 },
      uStarfish: { value: new Array(MAX_CREATURES * 4).fill(0) }, uStarfishCount: { value: 0 },
      uStarfishSize: { value: 0 }, uStarfishColour: { value: [0, 0, 0] }, uOutline: { value: [0, 0, 0] },
      uFish: { value: [0, 0, 1, 0] }, uFishSwimming: { value: 0 }, uFishSize: { value: 0 }, uFishColour: { value: [0, 0, 0] },
      uLight: { value: [0, 0] }, uTorch: { value: [0, 1, 1, 0] }, uTorchColour: { value: [0, 0, 0] },
      uPlankton: { value: 0 }, uPlanktonColour: { value: [0, 0, 0] },
      uAnemones: { value: new Array(MAX_CREATURES * 4).fill(0) }, uAnemoneCount: { value: 0 },
      uAnemoneSize: { value: 0 }, uAnemoneColour: { value: [0, 0, 0] },
      uDish: { value: [0, 0, 0] }, uBench: { value: [0, 0, 0] }, uRim: { value: [0, 0, 0] },
      uFood: { value: new Array(MAX_FOOD * 2).fill(0) }, uFoodCount: { value: 0 }, uFoodSize: { value: 0 },
      uOat: { value: [0, 0, 0] }, uFocus: { value: -1 }, uFocusColour: { value: [0, 0, 0] },
    });
    this.copyTrail = pass(copyTrailFrag, { uSource: { value: null }, uScale: { value: [1, 1] }, uOffset: { value: [0, 0] } });
    this.remapAgents = pass(remapAgentsFrag, {
      uAgents: { value: null }, uScale: { value: [1, 1] }, uOffset: { value: [0, 0] }, uRespawn: { value: 0 },
    });

    // Deposit and agentsOnly draw one point per agent. The geometry only supplies each point's index.
    const depositProgram = new Program(gl, {
      vertex: depositVert, fragment: depositFrag,
      uniforms: { uAgents: { value: null }, uTrailWeight: { value: 0 }, uDeltaTime: { value: 0 }, uSpeciesCount: { value: 1 } },
      depthTest: false,
    });
    depositProgram.setBlendFunc(gl.ONE, gl.ONE); // additive: overlapping points add up
    const agentsGeometry = new Geometry(gl, { aId: { size: 1, data: new Float32Array(1) } });
    this.deposit = new Mesh(gl, { geometry: agentsGeometry, program: depositProgram, mode: gl.POINTS });
    // The plankton wake: a fixed handful of points, each placed at random by splashVert
    const splashProgram = new Program(gl, {
      vertex: splashVert, fragment: splashFrag,
      uniforms: {
        uFrom: { value: [0, 0] }, uTo: { value: [0, 0] }, uSize: { value: [1, 1] },
        uStep: { value: 0 }, uSpread: { value: 0 }, uAmount: { value: 0 },
      },
      depthTest: false,
    });
    splashProgram.setBlendFunc(gl.ONE, gl.ONE);
    const splashGeometry = new Geometry(gl, {
      aId: { size: 1, data: Float32Array.from({ length: SPLASH_POINTS }, (_, i) => i) },
    });
    this.splashMesh = new Mesh(gl, { geometry: splashGeometry, program: splashProgram, mode: gl.POINTS });

    // The oats: one point each. simulate() sets how many are drawn
    const foodProgram = new Program(gl, {
      vertex: foodVert, fragment: foodFrag,
      uniforms: {
        uFood: { value: new Array(MAX_FOOD * 2).fill(0) }, uSize: { value: [1, 1] },
        uPointSize: { value: 1 }, uAmount: { value: 0 },
      },
      depthTest: false,
    });
    foodProgram.setBlendFunc(gl.ONE, gl.ONE);
    const foodGeometry = new Geometry(gl, {
      aId: { size: 1, data: Float32Array.from({ length: MAX_FOOD }, (_, i) => i) },
    });
    this.foodMesh = new Mesh(gl, { geometry: foodGeometry, program: foodProgram, mode: gl.POINTS });

    this.agentsOnly = new Mesh(gl, {
      geometry: agentsGeometry,
      program: new Program(gl, {
        vertex: agentsOnlyVert, fragment: agentsOnlyFrag,
        uniforms: { uAgents: { value: null }, uColour: { value: [1, 1, 1] }, uPointSize: { value: 1 } },
        depthTest: false,
      }),
      mode: gl.POINTS,
    });

    this.buildAgents();
    this.resize(width, height, true); // sizes the canvas and creates the trail targets, empty
    this.startWarmup();
  }

  // Merge new settings in. Changing a structural one starts the simulation over.
  updateSettings(changes: Partial<SlimeSettings>) {
    const merged = mergeSettings({ ...this.settings, ...changes });
    Object.assign(this.settings, merged);
    if (this.structureKey() !== this.structure) this.restart();
    // The trail's wrap mode is part of the texture, so a change rebuilds the trail, carrying it over
    else if (this.settings.wrapEdges !== this.builtWrap) this.resize(this.cssWidth, this.cssHeight);
  }

  // Respawn every agent and clear the trail, using the current settings.
  restart() {
    this.buildAgents();
    this.resize(this.cssWidth, this.cssHeight, true);
    this.startWarmup();
  }

  // Hide the canvas and queue settings.warmupSeconds of steps. frame() runs them, then fades in.
  private startWarmup() {
    const { warmupSeconds, fixedTimeStep, stepsPerFrame } = this.settings;
    const ticks = Math.round(Math.max(0, warmupSeconds) / Math.max(fixedTimeStep, 1e-4));
    this.warmupLeft = ticks * Math.max(1, Math.round(stepsPerFrame));
    if (this.warmupLeft === 0) return;
    const style = this.gl.canvas.style;
    style.transition = "none";
    style.opacity = "0";
  }

  // One palette per species. No palettes means one species in the agent colour
  private palettes() {
    const { speciesPalettes, agent } = this.settings;
    return speciesPalettes.length ? speciesPalettes.slice(0, MAX_SPECIES) : [[agent.colour]];
  }

  private structureKey() {
    const s = this.settings;
    return [s.numAgents, s.trailResolution, s.spawnMode].join("|");
  }

  // Agents live in a square texture. New textures are all zeros, which updateAgentFrag
  // reads as "place this agent".
  private buildAgents() {
    const gl = this.gl;
    const count = Math.max(1, Math.floor(this.settings.numAgents));
    const side = Math.ceil(Math.sqrt(count));

    if (this.agentsA) {
      this.freeTarget(this.agentsA);
      this.freeTarget(this.agentsB);
      this.agentGeometry.remove();
    }
    // 32-bit float, NEAREST so values are never blended together.
    this.agentsA = this.makeTarget(side, side, gl.FLOAT, gl.RGBA32F, gl.NEAREST);
    this.agentsB = this.makeTarget(side, side, gl.FLOAT, gl.RGBA32F, gl.NEAREST);

    const ids = Float32Array.from({ length: count }, (_, i) => i);
    this.agentGeometry = new Geometry(gl, { aId: { size: 1, data: ids } });
    this.deposit.geometry = this.agentGeometry;
    this.agentsOnly.geometry = this.agentGeometry;
    this.structure = this.structureKey();
  }

  // Call when the area the canvas fills changes size, in CSS pixels, then redraw(). The trail
  // carries over (see RESIZE_MODE). fresh: start with an empty trail instead (the first sizing,
  // and restart())
  resize(width: number, height: number, fresh = false) {
    const oldWidth = this.cssWidth, oldHeight = this.cssHeight;
    this.cssWidth = width;
    this.cssHeight = height;
    // Trail texels per CSS pixel, the same along both axes
    const texelsPerPixel = (w: number, h: number) => Math.max(8, this.settings.trailResolution) / Math.max(w, h, 1);
    const k = texelsPerPixel(width, height);
    const w = Math.max(2, Math.round(width * k));
    const h = Math.max(2, Math.round(height * k));

    // The canvas is one pixel per CSS pixel (the renderer's dpr is 1), and the display pass
    // upscales the trail into it. Matching high-DPI screens' real pixels cost too much.
    // Setting the size clears the canvas, so the caller redraws (redraw())
    this.renderer.setSize(width, height);
    this.gl.canvas.style.width = "100%"; // setSize pins pixel sizes, so undo that
    this.gl.canvas.style.height = "100%";

    // Same trail size and wrap mode: the canvas changed by less than a texel, so the trail stands
    const old = this.trailA;
    if (old && !fresh && w === old.width && h === old.height && this.builtWrap === this.settings.wrapEdges) return;

    // Trail: half float, which supports blending and filtering without extra extensions.
    // Its wrap mode is what makes the blur wrap around the edges (see diffuseFrag).
    const wrap = this.settings.wrapEdges ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
    this.builtWrap = this.settings.wrapEdges;
    const nextA = this.makeTarget(w, h, this.gl.HALF_FLOAT, this.gl.RGBA16F, this.gl.LINEAR, wrap);
    const nextB = this.makeTarget(w, h, this.gl.HALF_FLOAT, this.gl.RGBA16F, this.gl.LINEAR, wrap);

    // Carry the slime over, stretched to the new size, rather than wiping it: the agents keep their
    // places relative to the edges (they're stored as 0..1), so the copied trail lines up with them.
    // Each step of a window drag is small, so the pattern deforms smoothly and then settles back.
    // RESIZE_MODE "crop" instead keeps the slime at its scale on screen, cropping or opening space
    if (old && !fresh) {
      const c = this.copyTrail.program.uniforms;
      c.uSource.value = old.texture;
      if (RESIZE_MODE === "stretch") {
        c.uScale.value = [1, 1];
        c.uOffset.value = [0, 0];
        this.renderer.render({ scene: this.copyTrail, target: nextA });
      } else {
        // A point at newUV sat at newUV * scale + offset in the old trail, measured from the top
        const oldK = texelsPerPixel(oldWidth, oldHeight);
        const scale = [(w * oldK) / (k * old.width), (h * oldK) / (k * old.height)];
        const offset = [0, ((oldHeight - height) * oldK) / old.height];
        c.uScale.value = scale;
        c.uOffset.value = offset;
        this.renderer.render({ scene: this.copyTrail, target: nextA });
        const r = this.remapAgents.program.uniforms;
        r.uAgents.value = this.agentsA.texture;
        r.uScale.value = scale;
        r.uOffset.value = offset;
        // The share of the new trail the old one didn't cover: the old trail reaches 1 / scale of
        // the way across each axis
        const covered = Math.min(1, 1 / scale[0]) * Math.min(1, 1 / scale[1]);
        r.uRespawn.value = 1 - covered;
        this.renderer.render({ scene: this.remapAgents, target: this.agentsB });
        [this.agentsA, this.agentsB] = [this.agentsB, this.agentsA];
      }
    }

    // OGL has no dispose for render targets, so free the old trail by hand.
    if (old) {
      this.freeTarget(old);
      this.freeTarget(this.trailB);
    }
    this.trailA = nextA;
    this.trailB = nextB;
  }

  // Draw the current state straight away, without simulating: after a resize, which clears the
  // canvas, so the screen never shows a blank or stretched frame. Not before the first frame or
  // during the warmup, while the canvas is hidden
  redraw() {
    if (this.lastTime && this.warmupLeft === 0) this.draw();
  }

  private makeTarget(width: number, height: number, type: number, internalFormat: number, filter: number,
    wrap: number = this.gl.CLAMP_TO_EDGE) {
    return new RenderTarget(this.gl, {
      width, height, depth: false, type, internalFormat,
      minFilter: filter, magFilter: filter, wrapS: wrap, wrapT: wrap,
    });
  }

  private freeTarget(target: RenderTarget) {
    this.gl.deleteFramebuffer(target.buffer);
    for (const tex of target.textures) this.gl.deleteTexture(tex.texture);
  }

  // Call once per animation frame with the timestamp requestAnimationFrame provides.
  frame(now: number) {
    if (this.warmupLeft > 0) {
      const steps = Math.min(this.warmupLeft, WARMUP_STEPS_PER_FRAME);
      for (let i = 0; i < steps; i++) this.simulate();
      this.warmupLeft -= steps;
      this.lastTime = now; // time spent warming up is not owed afterwards
      if (this.warmupLeft === 0) {
        this.draw();
        const style = this.gl.canvas.style;
        style.transition = `opacity ${WARMUP_FADE_SECONDS}s ease-in`;
        style.opacity = "1";
      }
      return;
    }

    const elapsed = this.lastTime ? now - this.lastTime : 0;
    this.lastTime = now;

    // Creatures and the torch run on real time, not the simulation's timeScale
    const dt = Math.min(elapsed / 1000, MAX_FRAME_SECONDS);
    const { creatures, torch } = this.settings;
    const { width, height } = this.trailA;
    const from = { ...this.light };
    this.moveLight(dt, now);
    this.splash(from, dt);
    this.creatures.sync(creatures, width, height);
    this.creatures.update(dt, creatures, width, height,
      torch.enabled ? { x: this.light.x, y: this.light.y, radius: torch.radius } : null);

    const { fixedTimeStep, stepsPerFrame } = this.settings;
    this.owed += Math.min(elapsed / 1000, MAX_FRAME_SECONDS) / Math.max(fixedTimeStep, 1e-4);
    const ticks = Math.floor(this.owed);
    this.owed -= ticks;

    // On the first frame nothing is owed yet, but the canvas still needs a picture.
    if (ticks === 0 && elapsed > 0) return; // canvas keeps showing the previous picture
    const steps = ticks * Math.max(1, Math.round(stepsPerFrame));
    for (let i = 0; i < steps; i++) this.simulate();
    this.draw();
  }

  // One simulation step. It covers fixedTimeStep * timeScale simulated seconds.
  private simulate() {
    const { renderer, settings } = this;
    const { agent } = settings;
    const dt = settings.fixedTimeStep * settings.timeScale; // simulated seconds this step covers
    const speciesCount = this.palettes().length;
    this.stepCount = (this.stepCount + 1) % 1048576;

    // 1. Move agents: read A, write B, swap.
    const u = this.update.program.uniforms;
    u.uAgents.value = this.agentsA.texture;
    u.uTrail.value = this.trailA.texture;
    u.uDeltaTime.value = dt;
    u.uStep.value = this.stepCount;
    u.uNumAgents.value = Math.max(1, Math.floor(settings.numAgents));
    u.uSpawnMode.value = SPAWN_MODE_INDEX[settings.spawnMode] ?? 0;
    u.uWrap.value = settings.wrapEdges ? 1 : 0;
    // turnSpeed is in turns per second and the shader wants radians. Same for the sensor angle.
    const move = u.uMove.value as number[]; // reused every step to avoid garbage
    move[0] = agent.moveSpeed;
    move[1] = agent.turnSpeed * 2 * Math.PI;
    move[2] = (agent.sensorAngleSpacing * Math.PI) / 180;
    move[3] = agent.sensorOffsetDst;
    u.uSensorSize.value = Math.max(0, Math.round(agent.sensorSize));
    const { torch } = settings;
    u.uLight.value = [this.light.x * this.trailA.width, this.light.y * this.trailA.height];
    u.uLightAversion.value = [torch.radius, torch.enabled ? torch.slimeAversion : 0];
    u.uDish.value = this.dishTexels();
    u.uRespawnChance.value = Math.max(0, settings.respawnRate) * dt;
    u.uSpeciesCount.value = speciesCount;
    renderer.render({ scene: this.update, target: this.agentsB });
    [this.agentsA, this.agentsB] = [this.agentsB, this.agentsA];

    // 2. Deposit: each agent adds to the trail where it stands (clear: false keeps the trail).
    const d = this.deposit.program.uniforms;
    d.uAgents.value = this.agentsA.texture;
    d.uTrailWeight.value = settings.trailWeight;
    d.uDeltaTime.value = dt;
    d.uSpeciesCount.value = speciesCount;
    renderer.render({ scene: this.deposit, target: this.trailA, clear: false });
    this.feed(dt);

    // 3. Blur and fade: read A, write B, swap.
    const f = this.diffuse.program.uniforms;
    f.uTrail.value = this.trailA.texture;
    f.uDeltaTime.value = dt;
    f.uDiffuseRate.value = settings.diffuseRate;
    f.uDecayRate.value = settings.decayRate;
    f.uTrailCap.value = settings.trailCap;
    renderer.render({ scene: this.diffuse, target: this.trailB });
    [this.trailA, this.trailB] = [this.trailB, this.trailA];
  }

  // 4. Draw the trail (or just the agents) to the canvas.
  private draw() {
    const { settings } = this;

    if (settings.showAgentsOnly) {
      const [r, g, b] = settings.backgroundColour;
      this.gl.clearColor(r, g, b, 1);
      const a = this.agentsOnly.program.uniforms;
      a.uAgents.value = this.agentsA.texture;
      a.uColour.value = settings.agent.colour;
      a.uPointSize.value = Math.max(1, this.gl.canvas.width / this.trailA.width);
      this.renderer.render({ scene: this.agentsOnly });
    } else {
      const u = this.display.program.uniforms;
      u.uTrail.value = this.trailA.texture;
      u.uBackground.value = settings.backgroundColour;
      const palette = u.uPalette.value as number[]; // reused every frame to avoid garbage
      const sizes = u.uPaletteSizes.value as number[];
      const palettes = this.palettes();
      palettes.forEach((colours, s) => {
        // A species with no colours of its own falls back to the agent colour
        const used = (colours.length ? colours : [settings.agent.colour]).slice(0, MAX_TRAIL_PALETTE);
        used.forEach((c, i) => palette.splice((s * MAX_TRAIL_PALETTE + i) * 3, 3, ...c));
        sizes[s] = used.length;
      });
      u.uSpeciesCount.value = palettes.length;

      // The visible starfish, converted from 0..1 of the trail to trail texels
      const { width, height } = this.trailA;
      const { creatures } = settings;
      const starfish = u.uStarfish.value as number[];
      const visible = this.creatures.starfish.filter((s) => s.visible);
      visible.forEach((s, i) => starfish.splice(i * 4, 4, s.x * width, s.y * height, s.rotation, s.phase));
      u.uTime.value = this.creatures.time;
      u.uStarfishCount.value = visible.length;
      u.uStarfishSize.value = creatures.starfishSize;
      u.uStarfishColour.value = creatures.starfishColour;
      u.uOutline.value = creatures.outlineColour;
      const { fish } = this.creatures;
      const fishUniform = u.uFish.value as number[];
      fishUniform.splice(0, 4, fish.x * width, fish.y * height, fish.direction, fish.wag);
      u.uFishSwimming.value = fish.swimming ? 1 : 0;
      u.uFishSize.value = creatures.fishSize;
      u.uFishColour.value = creatures.fishColour;

      const { torch } = settings;
      u.uLight.value = [this.light.x * width, this.light.y * height];
      u.uTorch.value = [torch.radius, torch.ambient, torch.creatureAmbient, torch.enabled ? 1 : 0];
      u.uTorchColour.value = torch.colour;
      u.uPlankton.value = torch.enabled ? torch.plankton : 0;
      u.uPlanktonColour.value = torch.planktonColour;

      const anemones = u.uAnemones.value as number[];
      const shownAnemones = this.creatures.anemones.filter((a) => a.visible);
      shownAnemones.forEach((a, i) => anemones.splice(i * 4, 4, a.x * width, a.y * height, a.phase, a.open));
      u.uAnemoneCount.value = shownAnemones.length;
      u.uAnemoneSize.value = creatures.anemoneSize;
      u.uAnemoneColour.value = creatures.anemoneColour;

      const { dish } = settings;
      const food = this.foodTexels();
      u.uDish.value = this.dishTexels();
      u.uBench.value = dish.benchColour;
      u.uRim.value = dish.rimColour;
      (u.uFood.value as number[]).splice(0, food.length, ...food);
      u.uFoodCount.value = food.length / 2;
      u.uFoodSize.value = dish.foodSize;
      u.uOat.value = dish.oatColour;
      u.uFocus.value = this.focus;
      u.uFocusColour.value = dish.focusColour;
      u.uPixelated.value = settings.displayFilter === "pixelated" ? 1 : 0;
      u.uSteps.value = settings.colourSteps;
      this.renderer.render({ scene: this.display });
    }
  }

  // Where the pointer is, in CSS pixels from the canvas's top left. The torch follows it.
  // width and height are the canvas's CSS size
  setPointer(x: number, y: number, width: number, height: number) {
    this.pointer = { x: x / width, y: 1 - y / height, time: performance.now() };
  }

  // Ease the light toward the pointer, or along a slow looping drift when the pointer is idle
  // Leave a glowing plankton wake along the path the light moved this frame, from `from` to where
  // it is now. The faster it moved, the brighter the wake, so a still light leaves none
  private splash(from: { x: number; y: number }, dt: number) {
    const { torch } = this.settings;
    if (!torch.enabled || torch.plankton <= 0 || dt <= 0) return;
    const { width, height } = this.trailA;
    const fromTexels = [from.x * width, from.y * height];
    const toTexels = [this.light.x * width, this.light.y * height];
    const speed = Math.hypot(toTexels[0] - fromTexels[0], toTexels[1] - fromTexels[1]) / dt; // texels per second
    const amount = Math.min(1, speed / SPLASH_FULL_SPEED) * SPLASH_POINT_GLOW;
    if (amount < 0.01) return;

    const u = this.splashMesh.program.uniforms;
    u.uFrom.value = fromTexels;
    u.uTo.value = toTexels;
    u.uSize.value = [width, height];
    u.uStep.value = (this.stepCount + Math.floor(Math.random() * 1000)) % 1048576;
    u.uSpread.value = torch.radius * 0.25;
    u.uAmount.value = amount;
    this.renderer.render({ scene: this.splashMesh, target: this.trailA, clear: false });
  }

  private moveLight(dt: number, now: number) {
    this.driftTime += dt;
    const idle = !this.pointer || now - this.pointer.time > POINTER_IDLE_MS;
    const t = this.driftTime;
    const target = idle
      ? { x: 0.5 + 0.32 * Math.sin(t * 0.21), y: 0.5 + 0.28 * Math.sin(t * 0.13 + 1) }
      : this.pointer!;
    const k = 1 - Math.exp(-dt * LIGHT_FOLLOW_RATE);
    this.light.x += (target.x - this.light.x) * k;
    this.light.y += (target.y - this.light.y) * k;
  }

  // Tell the simulation which parts of the canvas the page hides, as CSS pixel boxes measured from
  // the canvas's top left. Starfish are kept out of them. width and height are the canvas's CSS size
  // Place the petri dish: its centre and radius in CSS pixels from the canvas's top left.
  // width and height are the canvas's CSS size. Ignored unless dish.enabled
  setDish(x: number, y: number, radius: number, width: number, height: number) {
    this.dish = { x: x / width, y: 1 - y / height, radius: radius / width };
  }

  // Ring oat `index` (one per project on the page), or none with -1
  setFocus(index: number) {
    this.focus = index;
  }

  // The dish as centre and radius in trail texels, or all zeros for no dish. Trail texels are
  // square, so the radius scales with the width alone
  private dishTexels(): number[] {
    if (!this.settings.dish.enabled || !this.dish) return [0, 0, 0];
    const { width, height } = this.trailA;
    return [this.dish.x * width, this.dish.y * height, this.dish.radius * width];
  }

  // The oats' centres in trail texels, flattened x, y, x, y...
  private foodTexels(): number[] {
    const [cx, cy, r] = this.dishTexels();
    if (r === 0) return [];
    const count = Math.min(MAX_FOOD, Math.max(0, Math.floor(this.settings.dish.food)));
    return Array.from({ length: count }, (_, i) => foodPosition(i, count))
      .flatMap((f) => [cx + f.x * r, cy + f.y * r]);
  }

  // The oats give off a little trail every step, so the slime is drawn to them
  private feed(dt: number) {
    const food = this.foodTexels();
    if (food.length === 0) return;
    const { width, height } = this.trailA;
    const u = this.foodMesh.program.uniforms;
    (u.uFood.value as number[]).splice(0, food.length, ...food);
    u.uSize.value = [width, height];
    u.uPointSize.value = Math.max(1, this.settings.dish.foodSize * 1.5);
    u.uAmount.value = this.settings.dish.foodWeight * dt;
    this.foodMesh.geometry.setDrawRange(0, food.length / 2);
    this.renderer.render({ scene: this.foodMesh, target: this.trailA, clear: false });
  }

  setCovers(boxes: { left: number; top: number; right: number; bottom: number }[], width: number, height: number) {
    // To 0..1 of the trail, flipping y: the trail's y runs up from the bottom
    this.creatures.covers = boxes.map((b) => ({
      x0: b.left / width, x1: b.right / width, y0: 1 - b.bottom / height, y1: 1 - b.top / height,
    }));
  }

  // Losing the context frees every texture, program, and buffer at once.
  // The canvas can't be reused afterwards, so the caller discards it.
  dispose() {
    this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
