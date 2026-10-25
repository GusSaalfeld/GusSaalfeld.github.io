"use client";

import { useEffect, useState } from "react";
import { FOCUS_EVENT, foodPosition, type FocusDetail } from "@/app/lib/slime/Dish";

// The handwritten labels on the petri dish: one on the bench under the dish saying what's in it,
// and a paper tag naming whichever project's oat the page points to. Positioned over the slime
// canvas, from the same element the dish is measured from. count is the number of oats
export default function DishLabels({ count }: { count: number }) {
  const [dish, setDish] = useState<DOMRect | null>(null);
  const [focus, setFocus] = useState<FocusDetail | null>(null);

  useEffect(() => {
    const measure = () => setDish(document.querySelector("[data-slime-dish]")?.getBoundingClientRect() ?? null);
    const raf = requestAnimationFrame(measure); // after layout, so the dish's box is final
    window.addEventListener("resize", measure);
    const onFocus = (e: Event) => {
      const detail = (e as CustomEvent<FocusDetail>).detail;
      setFocus(detail.index >= 0 ? detail : null);
    };
    window.addEventListener(FOCUS_EVENT, onFocus);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener(FOCUS_EVENT, onFocus);
    };
  }, []);

  if (!dish) return null;
  const radius = Math.min(dish.width, dish.height) / 2;
  const centre = { x: dish.left + dish.width / 2, y: dish.top + dish.height / 2 };
  // The focused oat in CSS pixels. foodPosition's y runs up, the page's runs down
  const oat = focus && foodPosition(focus.index, count);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 font-marker text-lab-marker">
      <p
        className="absolute w-max -translate-x-1/2 -rotate-2 text-lg leading-tight"
        style={{ left: centre.x, top: centre.y + radius + 14 }}
      >
        Physarum polycephalum. Each oat is a project.
      </p>
      {/* Hidden from screen readers: it repeats the title of the row being pointed at */}
      {oat && (
        <p
          aria-hidden
          className="absolute -translate-y-full -rotate-3 rounded-sm bg-lab-paper px-2 py-0.5 text-lg shadow-[0_1px_2px_rgb(0_0_0/0.25)]"
          style={{ left: centre.x + oat.x * radius + radius * 0.08, top: centre.y - oat.y * radius - radius * 0.06 }}
        >
          {focus.title}
        </p>
      )}
    </div>
  );
}
