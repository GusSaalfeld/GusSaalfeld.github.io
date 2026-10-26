// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,            // an image usually: beside the text from md up, after it below
  mediaFirst?: boolean,            // children on the left from md up. Below md they still follow the
                                   // text, so the heading comes first
};

// A section of the page: a heading and paragraphs, with children beside them reaching the
// column's edge. The layout spaces sections apart, so there are no rules between them
export default function Card({ title, description, children, mediaFirst }: CardProps) {
  // Text and children share the column equally, so a photo is big enough to hold its own
  const columns = "md:grid-cols-2";
  return (
    <section className={`grid gap-12 ${children ? columns : ""}`}>
      <div className="flex flex-col gap-6">
        {title && (
          <h2 className="max-w-[24ch] font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink text-balance">
            {title}
          </h2>
        )}
        {description && (
          <div className="flex flex-col gap-6 max-w-[62ch]">
            {[description].flat().map((paragraph) => (
              // A serif reads best with a little more leading
              <p key={paragraph} className="text-lg leading-[1.65] text-quiet-ink text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
      {children && <div className={mediaFirst ? "md:order-first" : ""}>{children}</div>}
    </section>
  );
}
