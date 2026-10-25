// src/components/background/SlimeCanvas.tsx
"use client";

import { useEffect, useRef } from "react";
import { SlimeSim } from "@/app/lib/slime/SlimeSim";
import { defaultSettings, type SlimeSettings } from "@/app/lib/slime/SlimeSettings";
import { FOCUS_EVENT, type FocusDetail } from "@/app/lib/slime/Dish";

// settings is optional. Anything you leave out uses the defaults in SlimeSettings.ts.
// Changing it while mounted updates the running simulation.
export default function SlimeCanvas({ settings }: { settings?: Partial<SlimeSettings> }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<SlimeSim | null>(null);

  // Always holds the latest settings, so the effect below can read them without re-running.
  const settingsRef = useRef<Partial<SlimeSettings> | undefined>(settings);
  // Compare by content, because an inline object is new on every render.
  const settingsKey = JSON.stringify(settings ?? {});

  // Refs are written in an effect, not during render. This one is declared first,
  // so it runs before the effects below read the ref.
  useEffect(() => {
    settingsRef.current = settings;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A fresh canvas per mount, because dispose() loses the context for good.
    const host = hostRef.current!;
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    host.appendChild(canvas);

    let sim: SlimeSim;
    try {
      sim = new SlimeSim(canvas, host.clientWidth, host.clientHeight, settingsRef.current ?? undefined);
    } catch {
      canvas.remove(); // no WebGL2: the page background shows instead
      return;
    }
    simRef.current = sim;

    // Follow the container's size. Wait until resizing pauses, because each resize
    // allocates new textures and a window drag fires many events.
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (host.clientWidth > 0 && host.clientHeight > 0) {
          sim.resize(host.clientWidth, host.clientHeight);
        }
      }, 150);
    });
    observer.observe(host);

    // Tell the simulation what the page covers, so starfish sit only where they can be seen.
    // Mark an element data-slime-cover to keep starfish out from behind it, or
    // data-slime-cover="column" for content that scrolls: it covers its full width from the top
    // of the screen to the bottom, since scrolling moves it over every height. Measured twice
    // a second, which also catches resizes and page changes.
    const measureCovers = () => {
      const boxes = [...document.querySelectorAll<HTMLElement>("[data-slime-cover]")].map((el) => {
        const r = el.getBoundingClientRect();
        return el.dataset.slimeCover === "column"
          ? { left: r.left, right: r.right, top: 0, bottom: host.clientHeight }
          : { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      });
      sim.setCovers(boxes, host.clientWidth, host.clientHeight);

      // The petri dish fills the element marked data-slime-dish, a circle inside its box
      const dish = document.querySelector<HTMLElement>("[data-slime-dish]")?.getBoundingClientRect();
      if (dish) {
        sim.setDish(dish.left + dish.width / 2, dish.top + dish.height / 2, Math.min(dish.width, dish.height) / 2,
          host.clientWidth, host.clientHeight);
      }
    };
    measureCovers();
    const coverTimer = window.setInterval(measureCovers, 500);

    // The torch follows the pointer. The canvas fills the window, so client coordinates are canvas coordinates
    const onPointerMove = (e: PointerEvent) => sim.setPointer(e.clientX, e.clientY, host.clientWidth, host.clientHeight);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Ring the oat for whichever project the page points to
    const onFocus = (e: Event) => sim.setFocus((e as CustomEvent<FocusDetail>).detail.index);
    window.addEventListener(FOCUS_EVENT, onFocus);

    let raf = 0;
    const loop = (now: number) => {
      sim.frame(now);
      raf = requestAnimationFrame(loop);
    };
    loop(performance.now());

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(coverTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener(FOCUS_EVENT, onFocus);
      observer.disconnect();
      cancelAnimationFrame(raf);
      sim.dispose();
      canvas.remove();
      simRef.current = null;
    };
  }, []);

  // Push settings changes into the running simulation.
  useEffect(() => {
    simRef.current?.updateSettings(settingsRef.current ?? {});
  }, [settingsKey]);

  // The host shows the slime's background colour, so anything designed to show the slime still
  // has a colour behind it when the simulation can't run (reduced motion, or no WebGL2)
  const [r, g, b] = (settings?.backgroundColour ?? defaultSettings.backgroundColour).map((c) => Math.round(c * 255));
  return <div ref={hostRef} aria-hidden className="fixed inset-0 -z-10" style={{ background: `rgb(${r} ${g} ${b})` }} />;
}