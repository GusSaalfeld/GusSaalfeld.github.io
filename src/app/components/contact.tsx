"use client";

import { useState } from "react";
import Band, { SECTION_GAP } from "@/app/components/band";

const EMAIL = "gus.saalfeld@gmail.com";

// The page's sign-off, on every page just above the closing slime. It mirrors the lede at the top:
// two sentences in the lede's size, with the action beside them from md up, so the page opens
// and closes the same way. The address is the mailto link; the button copies it, for anyone whose
// email is in a browser tab rather than an app. The navbar's Contact link jumps here
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <p className="max-w-[44ch] md:max-w-[52ch] text-2xl short:text-xl leading-[1.4] text-quiet-ink text-pretty">
            I&apos;m looking for technical, science, and content writing roles. Email is the quickest way
            to reach me:{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="whitespace-nowrap text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              {EMAIL}
            </a>
          </p>
          {/* Shaped like the download buttons beside the lede. aria-live reads the change out */}
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            className="inline-flex min-h-12 shrink-0 items-center self-start md:self-auto border border-quiet-link px-5 font-sans text-base font-semibold whitespace-nowrap text-quiet-link hover:bg-quiet-link hover:text-quiet-paper"
          >
            {copy === "copied" ? "Copied" : copy === "failed" ? "Select the address to copy it" : "Copy email"}
          </button>
        </div>
      </Band>
    </section>
  );
}
