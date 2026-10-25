// A band of slime across the page: a window with no background, so the slime canvas fixed
// behind the page shows through it. The slime stays put as the page scrolls past.
// The page around it must be opaque paper, or the slime shows there too
export default function SlimeBanner() {
  return <div aria-hidden className="h-[clamp(6rem,14vw,11rem)] border-y border-quiet-rule" />;
}
