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
      {eyebrow && <p className="text-xl text-c64-grey">{eyebrow}</p>}
      {title && (
        <Heading
          className={`text-c64-yellow text-balance ${
            split ? "text-[36px] md:text-[44px] leading-[1.05]" : "text-[32px] leading-[1.1]"
          }`}
        >
          {title}
        </Heading>
      )}
      {description && (
        <div className="flex flex-col gap-4 max-w-[60ch]">
          {[description].flat().map((paragraph) => (
            <p key={paragraph} className="text-[22px] leading-[1.35] text-c64-white text-pretty">
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
