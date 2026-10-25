// src/lib/slime/Dish.ts
// Where the oat flakes sit in the petri dish (DishSettings). Shared by the simulation, which
// draws them and makes the slime seek them, and the page, which labels them.

// The shaders have room for this many oats
export const MAX_FOOD = 12;

// The page announces which oat to point out with this window event, when a project is hovered or
// focused. index is the oat (the project's place in the list), or -1 for none
export const FOCUS_EVENT = "slime-dish-focus";
export type FocusDetail = { index: number; title: string };

// Oat `index` of `count`, in a unit disc: x right, y up, the dish's rim at distance 1. Spread
// evenly on a sunflower spiral (each one a golden angle on from the last), kept off the rim
export function foodPosition(index: number, count: number) {
  const angle = index * 2.399963; // the golden angle, in radians
  const radius = 0.72 * Math.sqrt((index + 0.5) / Math.max(1, count));
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}
