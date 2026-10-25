// src/components/ui/Card.tsx
import type { ReactNode } from "react";

type CardProps = {
  eyebrow?: string,
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,
  // Two panels, like The Bard's Tale's screen: children in the viewport on the left,
  // title and description in the text window on the right
  split?: boolean,
  // No frame of its own, for panels inside a shared frame
  bare?: boolean
};

export default function Card({ eyebrow, title, description, children, split, bare }: CardProps) {
  // A split card is the page's hero, so its title is the page heading
  const Heading = split ? "h1" : "h3";

  const text = (
    <>
      {eyebrow && <p className="text-base text-dust">{eyebrow}</p>}
      {title && (
        <Heading
          className={`font-pixel font-semibold text-gold text-balance ${
            split ? "text-[32px] md:text-[40px] leading-[1.15]" : "text-[28px] leading-[1.2]"
          }`}
        >
          {title}
        </Heading>
      )}
      {description && (
        <div className="flex flex-col gap-4 max-w-[60ch]">
          {[description].flat().map((paragraph) => (
            <p key={paragraph} className="text-lg leading-[1.6] text-parchment text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </>
  );

  const panels = split ? (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-2">
      <div className="panel p-3">{children}</div>
      <div className="panel flex flex-col justify-center gap-5 p-6 md:p-8">{text}</div>
    </div>
  ) : (
    <div className="panel flex flex-col gap-4 p-6">
      {text}
      {children && <div>{children}</div>}
    </div>
  );

  return bare ? panels : <div className="frame">{panels}</div>;
}
