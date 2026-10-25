// src/lib/slime/Creatures.ts
// Starfish drawn over the slime by the display pass. This file only tracks where they are;
// displayFrag draws them. Positions are 0..1 of the trail (y up, as in the shader), so they
// survive a resize.
import type { CreatureSettings } from "./SlimeSettings";

// The display shader has room for this many starfish
export const MAX_CREATURES = 4;

// Part of the screen the page covers, 0..1 of the trail with y up
export interface Rect { x0: number; y0: number; x1: number; y1: number }

const TAU = Math.PI * 2;
const PLACEMENT_TRIES = 60;
const random = (min: number, max: number) => min + Math.random() * (max - min);

// rotation turns the whole star, and phase offsets its leg wave so starfish don't move in step.
// A starfish with nowhere uncovered to sit is hidden until room opens up
interface Starfish { x: number; y: number; rotation: number; phase: number; visible: boolean }

export class Creatures {
  readonly starfish: Starfish[] = [];
  covers: Rect[] = []; // where the page hides the slime. Starfish are kept out of these
  time = 0; // seconds, drives the starfish's leg wave

  // Match the settings' count, and move any starfish the page now covers to an uncovered spot.
  // width and height are the trail's size in texels, for the starfish's radius
  sync(settings: CreatureSettings, width: number, height: number) {
    const count = Math.min(MAX_CREATURES, Math.max(0, Math.floor(settings.starfish)));
    while (this.starfish.length < count) {
      this.starfish.push({ x: 0, y: 0, rotation: random(0, TAU), phase: random(0, TAU), visible: false });
    }
    this.starfish.length = count;

    // The radius as 0..1 of each axis, plus a texel for the outline
    const rx = (settings.starfishSize + 1.5) / width;
    const ry = (settings.starfishSize + 1.5) / height;
    for (const star of this.starfish) {
      if (star.visible && this.fits(star.x, star.y, rx, ry)) continue;
      star.visible = false;
      // Try random spots until one is clear. Most of the screen may be covered, so this can fail
      for (let i = 0; i < PLACEMENT_TRIES; i++) {
        const x = random(rx, 1 - rx), y = random(ry, 1 - ry);
        if (this.fits(x, y, rx, ry)) {
          Object.assign(star, { x, y, visible: true });
          break;
        }
      }
    }
  }

  update(dt: number) {
    this.time += dt;
  }

  // Whether a starfish at x, y lies wholly on screen and clear of every cover and every other starfish
  private fits(x: number, y: number, rx: number, ry: number) {
    if (x < rx || x > 1 - rx || y < ry || y > 1 - ry) return false;
    const overlaps = (r: Rect) => x + rx > r.x0 && x - rx < r.x1 && y + ry > r.y0 && y - ry < r.y1;
    if (this.covers.some(overlaps)) return false;
    return !this.starfish.some((s) => s.visible && (s.x !== x || s.y !== y)
      && Math.abs(s.x - x) < rx * 2 && Math.abs(s.y - y) < ry * 2);
  }
}
