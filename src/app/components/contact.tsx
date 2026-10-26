"use client";

import { useState } from "react";
import Band, { SECTION_GAP } from "@/app/components/band";

const EMAIL = "gus.saalfeld@gmail.com";

// The page's sign-off, on every page just above the closing slime: two sentences in the lede's
// size, so the page opens and closes the same way, then the address as a mailto link and a button
// to copy it, for anyone whose email is in a browser tab rather than an app. The navbar's Contact
// link jumps here
export default function Contact() {
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopy("copied");
    } catch {
      setCopy("failed"); // no clipboard access: the address is on screen to select
    }
    window.setTimeout(() => setCopy("idle"), 2500);
  };

  return (
    // scroll-mt keeps the heading clear of the sticky navbar when the Contact link jumps here
    <section id="contact" className="scroll-mt-24">
      <Band className={SECTION_GAP}>
        <h2 className="mb-6 font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">Contact</h2>
        <p className="max-w-[44ch] md:max-w-[52ch] text-2xl short:text-xl leading-[1.4] text-quiet-ink text-pretty">
          I&apos;m looking for technical and science writing roles. Email is the quickest way
          to reach me.
        </p>
        {/* The address on a line of its own, set like the project titles, with the button to copy it
            beside it (under it on narrow phones) */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="font-sans text-2xl font-semibold leading-[1.25] text-quiet-ink hover:text-quiet-link hover:underline underline-offset-4"
          >
            {EMAIL}
          </a>
          {/* Shaped like the download buttons beside the lede. aria-live reads the change out */}
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="inline-flex min-h-12 items-center border border-quiet-link px-5 font-sans text-base font-semibold whitespace-nowrap text-quiet-link hover:border-quiet-ink hover:text-quiet-ink"
          >
            {copy === "copied" ? "Copied" : copy === "failed" ? "Select the address to copy it" : "Copy email"}
          </button>
        </div>
        {/* A credit for the slime, muted and set like the hobby captions: the last line of every page */}
        <p className="mt-12 text-base leading-[1.55] text-quiet-muted">
          The animation is a slime mold simulation written in WebGL.
        </p>
      </Band>
    </section>
  );
}
