// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,            // shown beside the text from md up, after it below; an image usually
};

// A section of the page: a heading and paragraphs, with children beside them reaching the
// column's right edge. The layout spaces sections apart, so there are no rules between them
export default function Card({ title, description, children }: CardProps) {
  return (
    <section className={`grid gap-12 ${children ? "md:grid-cols-[minmax(0,1fr)_18rem]" : ""}`}>
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
      {children && <div>{children}</div>}
    </section>
  );
}
