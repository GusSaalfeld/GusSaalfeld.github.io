"use client";

import { useState } from "react";
import Band, { SECTION_GAP } from "@/app/components/band";

const EMAIL = "gus.saalfeld@gmail.com";

// The page's sign-off, on every page just above the closing slime: the email address set large,
// like the name that opens the page, and a button to copy it, for anyone whose email is in a browser
// tab rather than an app. The navbar's Contact link jumps here
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
        <h2 className="font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">Contact</h2>
        <p className="mt-6 text-lg leading-[1.65] text-quiet-ink">Email is the quickest way to reach me.</p>
        {/* A step down the type scale from the name: 42px, 24px on narrow phones so it fits */}
        <a
          href={`mailto:${EMAIL}`}
          className="mt-4 inline-block break-words font-sans text-[clamp(1.5rem,5vw,2.625rem)] font-bold leading-[1.15] tracking-[-0.02em] text-quiet-ink hover:text-quiet-link hover:underline underline-offset-[6px]"
        >
          {EMAIL}
        </a>
        <div className="mt-6">
          {/* Says what it does, then confirms it. aria-live reads the change out to screen readers */}
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="inline-flex min-h-12 items-center border border-quiet-link px-5 font-sans text-base font-semibold text-quiet-link hover:bg-quiet-link hover:text-quiet-paper"
          >
            {copy === "copied" ? "Copied" : copy === "failed" ? "Select the address to copy it" : "Copy email"}
          </button>
        </div>
      </Band>
    </section>
  );
}
