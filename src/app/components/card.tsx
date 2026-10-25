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
      {eyebrow && <p className="text-sm font-medium tracking-[-0.09px] text-[rgba(0,0,0,0.55)]">{eyebrow}</p>}
      {title && (
        <Heading
          className={`font-serif font-semibold text-[var(--win-accent)] text-balance ${
            split ? "text-3xl md:text-4xl leading-[1.1] tracking-[-0.8px]" : "text-2xl leading-[1.2] tracking-[-0.48px]"
          }`}
        >
          {title}
        </Heading>
      )}
      {description && (
        <div className="flex flex-col gap-3">
          {[description].flat().map((paragraph) => (
            <p key={paragraph} className="text-lg font-medium leading-[1.45] tracking-[-0.09px] text-[rgba(0,0,0,0.7)] text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={bare ? "" : "win-raised bg-white p-[3px] text-black"}>
      {windowTitle && <TitleBar title={windowTitle} />}
      <div className={`${split ? "grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-10 items-center md:p-10" : "flex flex-col gap-4"} p-8`}>
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
  );
}
