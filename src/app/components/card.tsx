// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,            // shown after the text, an image usually
};

// A section of the lab notebook column: a heading, paragraphs, then children, ruled off above
export default function Card({ title, description, children }: CardProps) {
  return (
    <section className="flex flex-col gap-5 border-t border-lab-line px-6 md:px-12 py-10">
      {title && (
        <h2 className="max-w-[24ch] text-[1.75rem] md:text-[2rem] font-semibold leading-[1.15] tracking-[-0.01em] text-lab-ink text-balance">
          {title}
        </h2>
      )}
      {description && (
        <div className="flex flex-col gap-4 max-w-[62ch]">
          {[description].flat().map((paragraph) => (
            <p key={paragraph} className="text-lg leading-[1.6] text-lab-ink text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      {children && <div>{children}</div>}
    </section>
  );
}
