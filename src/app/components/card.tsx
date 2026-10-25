// src/components/ui/Card.tsx
import type { ReactNode } from "react";
import TitleBar from "./title-bar";

type CardProps = {
  windowTitle?: string, // shown in a title bar across the top. Leave out for no title bar
  eyebrow?: string,
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,
  // Two columns with no visible divide: title and description on the left, children on the right
  split?: boolean,
  // No window frame of its own, for a section inside a shared window
  bare?: boolean
};

export default function Card({ windowTitle, eyebrow, title, description, children, split, bare }: CardProps) {
  // A split card is the page's hero, so its title is the page heading
  const Heading = split ? "h1" : "h3";

  const text = (
    <>
      {eyebrow && <p className="text-sm font-medium text-ink/70">{eyebrow}</p>}
      {title && (
        <Heading
          className={`font-semibold text-slime text-balance ${
            split ? "text-3xl md:text-4xl leading-[1.1] tracking-[-0.8px]" : "text-2xl leading-[1.2] tracking-[-0.48px]"
          }`}
        >
          {title}
        </Heading>
      )}
      {description && (
        <div className="flex flex-col gap-4 max-w-[65ch]">
          {[description].flat().map((paragraph) => (
            // Serif body text gets more leading than sans would
            <p key={paragraph} className="text-lg leading-[1.6] text-ink text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={bare ? "" : "win-raised bg-face p-[3px] text-ink"}>
      {windowTitle && <TitleBar title={windowTitle} />}
      {/* The window face shows around a sunken paper well, where the reading happens */}
      <div className="p-2 md:p-3">
        <div className={`win-sunken bg-paper ${split ? "grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-10 items-center md:p-10" : "flex flex-col gap-4"} p-6`}>
          {split ? (
            <>
              <div className="flex flex-col gap-5">{text}</div>
              {/* Right half shows first when stacked on small screens */}
              <div className="order-first md:order-none">{children}</div>
            </>
          ) : (
            <>
              {text}
              {children && <div>{children}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
