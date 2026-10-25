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
// side is the half of the screen it keeps to. A starfish with nowhere uncovered to sit there is
// hidden until room opens up
type Side = "left" | "right" | "any";
interface Starfish { x: number; y: number; rotation: number; phase: number; side: Side; visible: boolean }

// The first starfish keeps to the left half and the second to the right, so with room on both
// sides of the content there's always one on each. Any more go wherever there's room
const sideFor = (index: number): Side => (index === 0 ? "left" : index === 1 ? "right" : "any");

// One fish at a time. Between crossings it waits offscreen. direction is 1 for left to right,
// -1 for right to left. wag drives its tail
interface Fish { x: number; y: number; direction: number; wag: number; swimming: boolean; wait: number }

export class Creatures {
  readonly starfish: Starfish[] = [];
  readonly fish: Fish = { x: 0, y: 0, direction: 1, wag: 0, swimming: false, wait: random(1, 5) };
  covers: Rect[] = []; // where the page hides the slime. Starfish are kept out of these
  time = 0; // drives the starfish's leg wave. Seconds, scaled by starfishSpeed

  // Match the settings' count, and move any starfish the page now covers to an uncovered spot.
  // width and height are the trail's size in texels, for the starfish's radius
  sync(settings: CreatureSettings, width: number, height: number) {
    const count = Math.min(MAX_CREATURES, Math.max(0, Math.floor(settings.starfish)));
    while (this.starfish.length < count) {
      this.starfish.push({
        x: 0, y: 0, rotation: random(0, TAU), phase: random(0, TAU), side: sideFor(this.starfish.length), visible: false,
      });
    }
    this.starfish.length = count;

    // The radius as 0..1 of each axis, plus a texel for the outline
    const rx = (settings.starfishSize + 1.5) / width;
    const ry = (settings.starfishSize + 1.5) / height;
    for (const star of this.starfish) {
      if (star.visible && this.fits(star.x, star.y, rx, ry)) continue;
      star.visible = false;
      // Try random spots on its side until one is clear. Most of the screen may be covered, so this can fail
      const minX = star.side === "right" ? 0.5 : rx;
      const maxX = star.side === "left" ? 0.5 : 1 - rx;
      for (let i = 0; i < PLACEMENT_TRIES; i++) {
        const x = random(minX, maxX), y = random(ry, 1 - ry);
        if (this.fits(x, y, rx, ry)) {
          Object.assign(star, { x, y, visible: true });
          break;
        }
      }
    }
  }

  // Advance by dt real seconds. width is the trail's width in texels, for the fish's speed
  update(dt: number, settings: CreatureSettings, width: number) {
    this.time += dt * settings.starfishSpeed;

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
      fish.swimming = true;
    }
    fish.x += (fish.direction * settings.fishSpeed * dt) / width;
    fish.wag += dt * 9;
    if (fish.x < -offscreen || fish.x > 1 + offscreen) {
      fish.swimming = false;
      fish.wait = settings.fishInterval + random(-1, 1);
    }
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
