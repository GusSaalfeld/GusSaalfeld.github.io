// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,            // shown beside the text from md up, after it below; an image usually
};

// A section of the page: a heading and paragraphs, ruled off above. Opaque paper, so the slime
// shows only where something asks for it
export default function Card({ title, description, children }: CardProps) {
  return (
    <section className="bg-quiet-paper border-t border-quiet-rule px-6 md:px-12 py-12">
      <div className={`column grid gap-8 md:gap-12 ${children ? "md:grid-cols-[minmax(0,62ch)_minmax(0,18rem)]" : ""}`}>
        <div className="flex flex-col gap-5">
          {title && (
            <h2 className="max-w-[24ch] font-sans text-[1.75rem] md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink text-balance">
              {title}
            </h2>
          )}
          {description && (
            <div className="flex flex-col gap-4 max-w-[62ch]">
              {[description].flat().map((paragraph) => (
                // A serif reads best with a little more leading
                <p key={paragraph} className="text-[1.1875rem] leading-[1.65] text-quiet-ink text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
    </section>
  );
}
