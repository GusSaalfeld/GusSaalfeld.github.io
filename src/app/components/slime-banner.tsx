// A band of slime across the page: a window with no background, so the slime canvas fixed
// behind the page shows through it. The slime stays put as the page scrolls past.
// The page around it must be opaque paper, or the slime shows there too.
// The layout puts one at the top of every page and one at the bottom:
// masthead: the taller opening band, under the navbar. It grows with the screen's width, but never
//   past a fifth of its height. On short screens (laptops) it drops to about a sixth, 80px at least,
//   so the first project's thumbnail shows below the hero
// last: the page's final element, growing to the bottom of the screen on a short page
export default function SlimeBanner({ masthead, last }: { masthead?: boolean; last?: boolean }) {
  const height = masthead ? "h-[max(9rem,min(18vw,15rem,20svh))] short:h-[max(5rem,16svh)]" : "min-h-24";
  return <div aria-hidden className={`${height} ${last ? "grow" : ""}`} />;
}
