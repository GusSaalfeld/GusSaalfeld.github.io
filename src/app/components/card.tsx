// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,
  // Two columns: children on the left (an image, usually), title and description on the right
  split?: boolean,
};

export default function Card({ title, description, children, split }: CardProps) {
  // A split card introduces the page, under the hero's h1
  const Heading = split ? "h2" : "h3";

  const text = (
    <>
      {title && (
        <Heading
          className={`font-display font-semibold text-pool-moonlight text-balance tracking-[-0.01em] ${
            split ? "text-[2rem] md:text-[2.5rem] leading-[1.1]" : "text-2xl leading-[1.2]"
          }`}
        >
          {title}
        </Heading>
      )}
      {description && (
        <div className="flex flex-col gap-4 max-w-[62ch]">
          {[description].flat().map((paragraph) => (
            <p key={paragraph} className="text-lg leading-[1.6] text-pool-moonlight text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </>
  );

  return split ? (
    <div className="panel grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-10 items-center p-5 md:p-8">
      <div>{children}</div>
      <div className="flex flex-col gap-5">{text}</div>
    </div>
  ) : (
    <div className="panel flex flex-col gap-4 p-6 md:p-8">
      {text}
      {children && <div>{children}</div>}
    </div>
  );
}
