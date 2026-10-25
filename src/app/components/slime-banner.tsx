// A band of slime across the page: a window with no background, so the slime canvas fixed
// behind the page shows through it. The slime stays put as the page scrolls past.
// The page around it must be opaque paper, or the slime shows there too.
// last: the page's final element, growing to the bottom of the screen on a short page
export default function SlimeBanner({ last }: { last?: boolean }) {
  return <div aria-hidden className={`min-h-[clamp(6rem,14vw,11rem)] ${last ? "grow" : ""}`} />;
}
