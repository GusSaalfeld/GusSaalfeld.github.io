// src/lib/slime/Creatures.ts
// Starfish and crabs drawn over the slime by the display pass. This file only tracks where they
// are and what they're doing; displayFrag draws them. Positions are 0..1 of the trail, so they
// survive a resize.
import type { CreatureSettings } from "./SlimeSettings";

// The display shader has room for this many of each creature
export const MAX_CREATURES = 4;

const TAU = Math.PI * 2;
const random = (min: number, max: number) => min + Math.random() * (max - min);

// Each starfish stays put. rotation turns the whole star, and phase offsets its leg wave
// so starfish don't move in step
interface Starfish { x: number; y: number; rotation: number; phase: number }

// A crab walks sideways along heading for a while, stops, then picks a new heading.
// legPhase only advances while it walks, so its legs freeze when it stops
interface Crab { x: number; y: number; heading: number; legPhase: number; walking: boolean; timer: number }

export class Creatures {
  readonly starfish: Starfish[] = [];
  readonly crabs: Crab[] = [];
  time = 0; // seconds, drives the starfish's leg wave

  // Add or remove creatures to match the settings. Existing ones keep their places
  sync(settings: CreatureSettings) {
    const starfishCount = Math.min(MAX_CREATURES, Math.max(0, Math.floor(settings.starfish)));
    const crabCount = Math.min(MAX_CREATURES, Math.max(0, Math.floor(settings.crabs)));
    // Kept away from the edges so a starfish is never cut in half
    while (this.starfish.length < starfishCount) {
      this.starfish.push({ x: random(0.1, 0.9), y: random(0.1, 0.9), rotation: random(0, TAU), phase: random(0, TAU) });
    }
    while (this.crabs.length < crabCount) {
      this.crabs.push({ x: random(0.1, 0.9), y: random(0.1, 0.9), heading: random(0, TAU), legPhase: 0, walking: false, timer: random(0, 2) });
    }
    this.starfish.length = starfishCount;
    this.crabs.length = crabCount;
  }

  // Advance by dt real seconds. width and height are the trail's size in texels, so crabSpeed
  // (texels per second) covers the same ground in both directions
  update(dt: number, settings: CreatureSettings, width: number, height: number) {
    this.time += dt;
    const margin = 0.05;

    for (const crab of this.crabs) {
      crab.timer -= dt;
      if (!crab.walking) {
        if (crab.timer <= 0) {
          crab.walking = true;
          crab.heading = random(0, TAU);
          crab.timer = random(1.5, 4); // seconds of walking
        }
        continue;
      }

      crab.x += (Math.cos(crab.heading) * settings.crabSpeed * dt) / width;
      crab.y += (Math.sin(crab.heading) * settings.crabSpeed * dt) / height;
      crab.legPhase += dt * 14; // legs scuttle fast

      // Near an edge, turn back the way it came
      if (crab.x < margin || crab.x > 1 - margin) crab.heading = Math.PI - crab.heading;
      if (crab.y < margin || crab.y > 1 - margin) crab.heading = -crab.heading;
      crab.x = Math.min(1 - margin, Math.max(margin, crab.x));
      crab.y = Math.min(1 - margin, Math.max(margin, crab.y));

      if (crab.timer <= 0) {
        crab.walking = false;
        crab.timer = random(1, 3); // seconds standing still
      }
    }
  }
}
