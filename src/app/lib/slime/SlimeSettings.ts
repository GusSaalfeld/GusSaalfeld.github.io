// src/lib/slime/SlimeSettings.ts
// Every tweakable number for the simulation, laid out like Sebastian Lague's SlimeSettings.cs.
// Distances are in trail texels, times are in seconds.
// Live settings take effect on the next step. Structural settings (marked below) need
// restart(), which updateSettings() does for you.

export type SpawnMode = "random" | "point" | "inwardCircle" | "randomCircle";
export const SPAWN_MODE_INDEX: Record<SpawnMode, number> = {
  random: 0, point: 1, inwardCircle: 2, randomCircle: 3,
};

export type RGB = [number, number, number]; // each 0..1

// Creatures drawn over the slime (see Creatures.ts). They don't touch the simulation.
export interface CreatureSettings {
  starfish: number;           // how many, at most 4. Each stays put and undulates its legs, only where
                              // the page doesn't cover the slime (see SlimeSim.setCovers)
  starfishSize: number;       // radius in trail texels
  starfishColour: RGB;
  outlineColour: RGB;         // a one-texel edge around each starfish
}

// How the agents move and sense, and what colour their trail is.
export interface AgentSettings {
  // Movement
  moveSpeed: number;          // texels per second
  turnSpeed: number;          // turns per second at most. Negative turns away from trails
  // Sensors
  sensorAngleSpacing: number; // degrees between the forward sensor and each side sensor
  sensorOffsetDst: number;    // texels from the agent to each sensor
  sensorSize: number;         // each sensor sums a (2n+1) x (2n+1) block of texels. 0 = one texel, the cheapest.
                              // 1 reads 9 texels per sensor, 27 per agent per step
  // Display
  colour: RGB;
}

export interface SlimeSettings {
  // Simulation
  fixedTimeStep: number;      // seconds per tick. 1/60 = 60 ticks per second
  stepsPerFrame: number;      // simulation steps per tick. Each step costs a full pass over all agents and the trail
  timeScale: number;          // simulated seconds per real second, per step per tick. Each step moves things by fixedTimeStep * timeScale seconds
                              // Raise it for faster motion without extra cost. Very large values make agents jump too far per step
  trailResolution: number;    // STRUCTURAL. Trail texels along the longer screen edge
  numAgents: number;          // STRUCTURAL
  spawnMode: SpawnMode;       // STRUCTURAL. Where agents start and which way they face
  respawnRate: number;        // fraction of agents sent back to a fresh spawn each simulated second. 0 = never.
                              // Breaks up the big empty cells that form over time, so the pattern stays fine-grained
  wrapEdges: boolean;         // true: agents and trails wrap around. false: agents bounce off the edges.
                              // Changing it clears the trail. Agents keep their places
  warmupSeconds: number;      // real seconds to simulate, hidden, before the first picture on start and restart.
                              // Skips the messy start while the pattern forms. 0 = show it from the first step
  // Trail
  trailWeight: number;        // trail an agent adds per second
  decayRate: number;          // trail removed per second
  diffuseRate: number;        // how quickly trails blur outwards, per second
  trailCap: number;           // trail strength limit. Without it one thick trail swallows every agent
  // Display
  backgroundColour: RGB;
  showAgentsOnly: boolean;    // draw the agents as dots instead of the trail
  displayFilter: "smooth" | "pixelated"; // how the trail is upscaled to the screen: bicubic or blocky
  colourSteps: number;        // 0 = blend smoothly from backgroundColour to the trail colours.
                              // n = snap the blend to n even steps, so the trail shows in n distinct shades, like a limited palette
  speciesPalettes: RGB[][];   // one entry per species, at most MAX_SPECIES: the colours its trail passes through
                              // from faint to strong, after backgroundColour, evenly spaced (at most MAX_TRAIL_PALETTE).
                              // Agents take turns between species. Each follows its own species' trail and
                              // avoids the others', as in Lague's multi-species version. Empty = one species
                              // in the agent colour
  creatures: CreatureSettings;
  agent: AgentSettings;
}

// Each species keeps its trail in one channel of the RGBA trail texture
export const MAX_SPECIES = 4;
// The display shader holds this many trail colours per species
export const MAX_TRAIL_PALETTE = 7;

export const defaultSettings: SlimeSettings = {
  fixedTimeStep: 1 / 60,
  stepsPerFrame: 1,
  timeScale: 2,
  trailResolution: 640,
  numAgents: 40000,
  spawnMode: "random",
  respawnRate: 0,
  wrapEdges: false,
  warmupSeconds: 0,
  trailWeight: 5,
  decayRate: 0.2,
  diffuseRate: 3,
  trailCap: 1,
  backgroundColour: [0.6, 0.52, 0.35],
  showAgentsOnly: false,
  displayFilter: "smooth",
  colourSteps: 0,
  speciesPalettes: [],
  creatures: {
    starfish: 0, starfishSize: 9, starfishColour: [0.71, 0.34, 0.5], outlineColour: [0.18, 0.12, 0.06],
  },
  agent: {
    moveSpeed: 7, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 12, sensorSize: 0,
    colour: [0.18, 0.12, 0.06],
  },
};

// Lague's single-species example presets (Assets/Settings/A and C). He tuned them for a
// 1920 x 1080 trail, so distances and agent counts are scaled down to the trail resolution
// you ask for. The agent density and every per-second rate stay as he set them.
const LAGUE_REFERENCE_WIDTH = 1920;
const LAGUE_PRESETS = {
  A: { numAgents: 250000, spawnMode: "inwardCircle", trailWeight: 5, decayRate: 0.2, diffuseRate: 3,
       moveSpeed: 20, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 35, colour: [1, 1, 1] },
  C: { numAgents: 250000, spawnMode: "point", trailWeight: 2, decayRate: 0.75, diffuseRate: 5,
       moveSpeed: 30, turnSpeed: -3, sensorAngleSpacing: 112, sensorOffsetDst: 20, colour: [0, 1, 0.31] },
} as const;

export function lagueSettings(preset: keyof typeof LAGUE_PRESETS, trailResolution = 640): Partial<SlimeSettings> {
  const p = LAGUE_PRESETS[preset];
  const k = trailResolution / LAGUE_REFERENCE_WIDTH;
  return {
    trailResolution,
    numAgents: Math.round(p.numAgents * k * k),
    spawnMode: p.spawnMode,
    trailWeight: p.trailWeight, decayRate: p.decayRate, diffuseRate: p.diffuseRate,
    agent: {
      moveSpeed: p.moveSpeed * k, turnSpeed: p.turnSpeed,
      sensorAngleSpacing: p.sensorAngleSpacing, sensorOffsetDst: p.sensorOffsetDst * k,
      sensorSize: 1, colour: [...p.colour] as RGB,
    },
  };
}

// Copy of the defaults with your overrides on top. An agent override replaces the whole agent block.
export function mergeSettings(overrides: Partial<SlimeSettings> = {}): SlimeSettings {
  const agent = overrides.agent ?? defaultSettings.agent;
  return {
    ...defaultSettings,
    ...overrides,
    backgroundColour: [...(overrides.backgroundColour ?? defaultSettings.backgroundColour)] as RGB,
    speciesPalettes: (overrides.speciesPalettes ?? defaultSettings.speciesPalettes)
      .map((palette) => palette.map((c) => [...c] as RGB)),
    creatures: { ...defaultSettings.creatures, ...overrides.creatures },
    agent: { ...agent, colour: [...agent.colour] as RGB },
  };
}
