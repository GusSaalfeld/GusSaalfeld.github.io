// src/components/background/SlimeCanvas.tsx
"use client";

import { useEffect, useRef } from "react";
import { SlimeSim } from "@/app/lib/slime/SlimeSim";
import type { SlimeSettings } from "@/app/lib/slime/SlimeSettings";

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

    let raf = 0;
    const loop = (now: number) => {
      sim.frame(now);
      raf = requestAnimationFrame(loop);
    };
    loop(performance.now());

    return () => {
      window.clearTimeout(timer);
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

  return <div ref={hostRef} aria-hidden className="fixed inset-0 -z-10" />;
}