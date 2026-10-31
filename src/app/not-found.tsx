import type { Metadata } from "next";
import Link from "next/link";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";

export const metadata: Metadata = { title: "Page not found" };

const LINK = "text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2";

// For an address that doesn't exist: a mistyped link, or a project since renamed or hidden. Says
// what happened, without blaming anyone, and where to go instead. GitHub Pages serves it as 404.html
export default function NotFound() {
  return (
    <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
      <h1 className="font-sans text-[2.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-quiet-ink">Page not found</h1>
      <p className="mt-6 max-w-[44ch] md:max-w-[52ch] text-xl md:text-2xl md:short:text-xl leading-[1.4] text-quiet-ink text-pretty">
        This page doesn&rsquo;t exist, or it&rsquo;s moved. You can find my writing on the{" "}
        <Link href="/portfolio" className={LINK}>portfolio</Link>, or{" "}
        <a href="#contact" className={LINK}>get in touch</a>.
      </p>
    </Band>
  );
}
