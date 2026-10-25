// src/lib/slime/Creatures.ts
// Starfish, anemones and a fish drawn over the slime by the display pass. This file only tracks
// where they are and what they're doing; displayFrag draws them. Positions are 0..1 of the trail
// (y up, as in the shader), so they survive a resize.
import type { CreatureSettings } from "./SlimeSettings";

// The display shader has room for this many of each kind
export const MAX_CREATURES = 4;

// Part of the screen the page covers, 0..1 of the trail with y up
export interface Rect { x0: number; y0: number; x1: number; y1: number }

// The torch's light, for creatures that react to it. x and y are 0..1 of the trail, radius in trail texels
export interface Light { x: number; y: number; radius: number }

const TAU = Math.PI * 2;
const PLACEMENT_TRIES = 60;
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Starfish and anemones stay put. rotation turns the whole creature, and phase offsets its
// motion so no two move in step. side is the half of the screen it keeps to. rx and ry are its
// radius as 0..1 of each axis, outline included. open is how far an anemone's tentacles are
// out, 0..1. A sitter with nowhere uncovered to sit is hidden until room opens up
type Side = "left" | "right" | "any";
interface Sitter {
  x: number; y: number; rotation: number; phase: number; side: Side; rx: number; ry: number;
  open: number; visible: boolean;
}

// One fish at a time. Between crossings it waits offscreen. direction is 1 for left to right,
// -1 for right to left. wag drives its tail. fright is 1 just after the torch catches it, then fades
interface Fish { x: number; y: number; direction: number; wag: number; swimming: boolean; wait: number; fright: number }

export class Creatures {
  readonly starfish: Sitter[] = [];
  readonly anemones: Sitter[] = [];
  readonly fish: Fish = { x: 0, y: 0, direction: 1, wag: 0, swimming: false, wait: random(1, 5), fright: 0 };
  covers: Rect[] = []; // where the page hides the slime. Sitters are kept out of these
  time = 0; // drives the starfish's leg wave and the anemones' sway. Seconds, scaled by starfishSpeed

  // Match the settings' counts, and move any sitter the page now covers to an uncovered spot.
  // width and height are the trail's size in texels
  sync(settings: CreatureSettings, width: number, height: number) {
    // The first of each kind keeps to the left and the second to the right, so with room on both
    // sides of the content there's one of each kind on each side. Anemones start on the right,
    // so a side with one starfish gets one anemone too
    this.resize(this.starfish, settings.starfish, (i) => (i === 0 ? "left" : i === 1 ? "right" : "any"));
    this.resize(this.anemones, settings.anemones, (i) => (i === 0 ? "right" : i === 1 ? "left" : "any"));
    this.place(this.starfish, settings.starfishSize, width, height);
    this.place(this.anemones, settings.anemoneSize, width, height);
  }

  private resize(list: Sitter[], wanted: number, sideFor: (index: number) => Side) {
    const count = Math.min(MAX_CREATURES, Math.max(0, Math.floor(wanted)));
    while (list.length < count) {
      list.push({
        x: 0, y: 0, rotation: random(0, TAU), phase: random(0, TAU), side: sideFor(list.length),
        rx: 0, ry: 0, open: 1, visible: false,
      });
    }
    list.length = count;
  }

  private place(list: Sitter[], size: number, width: number, height: number) {
    for (const sitter of list) {
      // The radius as 0..1 of each axis, plus a texel for the outline
      sitter.rx = (size + 1.5) / width;
      sitter.ry = (size + 1.5) / height;
      if (sitter.visible && this.fits(sitter, sitter.x, sitter.y)) continue;
      sitter.visible = false;
      // Try random spots on its side until one is clear. Most of the screen may be covered, so this can fail
      const minX = sitter.side === "right" ? 0.5 : sitter.rx;
      const maxX = sitter.side === "left" ? 0.5 : 1 - sitter.rx;
      for (let i = 0; i < PLACEMENT_TRIES; i++) {
        const x = random(minX, maxX), y = random(sitter.ry, 1 - sitter.ry);
        if (this.fits(sitter, x, y)) {
          Object.assign(sitter, { x, y, visible: true });
          break;
        }
      }
    }
  }

  // Whether sitter would lie wholly on screen at x, y, clear of every cover and every other sitter
  private fits(sitter: Sitter, x: number, y: number) {
    const { rx, ry } = sitter;
    if (x < rx || x > 1 - rx || y < ry || y > 1 - ry) return false;
    const overlaps = (r: Rect) => x + rx > r.x0 && x - rx < r.x1 && y + ry > r.y0 && y - ry < r.y1;
    if (this.covers.some(overlaps)) return false;
    return ![...this.starfish, ...this.anemones].some((other) => other !== sitter && other.visible
      && Math.abs(other.x - x) < rx + other.rx && Math.abs(other.y - y) < ry + other.ry);
  }

  // Advance by dt real seconds. width and height are the trail's size in texels. light is the
  // torch, or null when it's off, so nothing reacts
  update(dt: number, settings: CreatureSettings, width: number, height: number, light: Light | null) {
    this.time += dt * settings.starfishSpeed;
    // How far a point is from the light, in trail texels
    const fromLight = (x: number, y: number) => light ? Math.hypot((x - light.x) * width, (y - light.y) * height) : Infinity;

    // Anemones pull their tentacles in quickly when the light is on them, and ease back out in the dark
    for (const anemone of this.anemones) {
      const lit = light !== null && fromLight(anemone.x, anemone.y) < light.radius * 0.8;
      anemone.open = Math.min(1, Math.max(0, anemone.open + (lit ? -dt / 0.5 : dt / 2.5)));
    }

    this.swim(dt, settings, width, height, light, fromLight);
  }

  private swim(dt: number, settings: CreatureSettings, width: number, height: number,
    light: Light | null, fromLight: (x: number, y: number) => number) {
    const fish = this.fish;
    if (!settings.fish) {
      fish.swimming = false;
      return;
    }
    // Far enough past the edge that the whole fish is out of sight, tail and outline included
    const offscreen = (settings.fishSize * 1.3 + 2) / width;
    if (!fish.swimming) {
      fish.wait -= dt;
      if (fish.wait > 0) return;
      fish.direction = Math.random() < 0.5 ? 1 : -1;
      fish.x = fish.direction > 0 ? -offscreen : 1 + offscreen;
      fish.y = random(0.15, 0.85);
      fish.fright = 0;
      fish.swimming = true;
    }

    // Caught in the light, it bolts: up to three and a half times as fast, veering away from the
    // light's centre. The fright fades over a second and a half
    if (light && fromLight(fish.x, fish.y) < light.radius) fish.fright = 1;
    fish.fright = Math.max(0, fish.fright - dt / 1.5);
    const speed = settings.fishSpeed * (1 + 2.5 * fish.fright);
    fish.x += (fish.direction * speed * dt) / width;
    if (light) fish.y += (Math.sign(fish.y - light.y) * fish.fright * settings.fishSpeed * 0.6 * dt) / height;
    fish.y = Math.min(0.95, Math.max(0.05, fish.y));
    fish.wag += dt * 9 * (1 + 1.5 * fish.fright); // its tail beats faster as it bolts

    if (fish.x < -offscreen || fish.x > 1 + offscreen) {
      fish.swimming = false;
      fish.wait = settings.fishInterval + random(-1, 1);
    }
  }
}
