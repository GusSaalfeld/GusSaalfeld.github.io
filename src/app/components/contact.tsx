"use client";

import { useState } from "react";
import Band from "@/app/components/band";

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
    // scroll-mt keeps the heading clear of the sticky navbar when the Contact link jumps here, even
    // when the navbar takes two rows on the narrowest phones
    <section id="contact" className="scroll-mt-32">
      {/* A sign-off, not a section: about half the height it was. The heading a step smaller than
          the pages' own, the sentence at body size, and the address and its button beside it from md
          up, lined up with its last line. 24px to the closing slime below */}
      <Band className="pb-6">
        <h2 className="mb-3 font-sans text-2xl font-bold leading-[1.25] text-quiet-ink">Contact</h2>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
          <p className="max-w-[52ch] text-lg leading-[1.55] text-quiet-ink text-pretty">
            I&rsquo;m looking for technical and science writing roles. I&rsquo;m based in Pittsburgh and open to
            relocating. Email is the quickest way to reach me.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-sans text-xl font-semibold leading-[1.25] text-quiet-ink hover:text-quiet-link hover:underline underline-offset-4"
            >
              {EMAIL}
            </a>
            {/* Shaped like the download buttons, a little shorter. aria-live reads the change out */}
            <button
              type="button"
              onClick={copyEmail}
              aria-live="polite"
              className="inline-flex min-h-11 items-center border border-quiet-link px-4 font-sans text-base font-semibold whitespace-nowrap text-quiet-link hover:border-quiet-ink hover:text-quiet-ink"
            >
              {copy === "copied" ? "Copied" : copy === "failed" ? "Select the address to copy it" : "Copy email"}
            </button>
          </div>
        </div>
        {/* A credit for the slime, muted and set like the hobby captions: the last line of every page.
            The video is an episode of his series, so its title takes quotation marks, not italics. Only
            the title is the link, so the green underline stays short */}
        <p className="mt-6 max-w-[62ch] text-base leading-[1.55] text-quiet-muted text-pretty">
          This background animation is a slime mold simulation built with WebGL, inspired by Sebastian Lague&rsquo;s
          &ldquo;
          <a
            href="https://www.youtube.com/watch?v=X-iSQQgOd1A"
            className="text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            Ant and Slime Simulations
          </a>
          .&rdquo;
        </p>
      </Band>
    </section>
  );
}
