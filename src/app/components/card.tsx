import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string | string[], // an array shows each entry as its own paragraph
  children?: ReactNode,            // an image usually: beside the text from md up, between the
                                   // heading and the text below, so a face comes before the reading
  mediaFirst?: boolean,            // children on the left from md up
  pageTitle?: boolean,             // the page's title: an h1, a step up the type scale, with the
                                   // first paragraph set as a lede, like the portfolio's
};

// A section of the page: a heading and paragraphs, with children beside them reaching the
// column's edge. The layout spaces sections apart, so there are no rules between them.
// From md up, the text and children share the column equally, so a photo holds its own
export default function Card({ title, description, children, mediaFirst, pageTitle }: CardProps) {
  const Heading = pageTitle ? "h1" : "h2";
  const textColumn = children ? (mediaFirst ? "md:col-start-2" : "md:col-start-1") : "";
  const mediaColumn = mediaFirst ? "md:col-start-1" : "md:col-start-2";
  return (
    // Three grid items, so below md the children can sit between the heading and the paragraphs.
    // From md up, the children span both rows beside them
    <section className={`grid gap-y-6 ${children ? "md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-12" : ""}`}>
      {title && (
        <Heading
          className={`max-w-[24ch] font-sans font-bold leading-[1.15] text-quiet-ink text-balance ${textColumn} md:row-start-1 ${
            pageTitle ? "text-[2.625rem] tracking-[-0.02em]" : "text-[2rem] tracking-[-0.01em]"
          }`}
        >
          {title}
        </Heading>
      )}
      {children && <div className={`${mediaColumn} md:row-span-2 md:row-start-1`}>{children}</div>}
      {description && (
        <div className={`flex flex-col gap-6 max-w-[62ch] ${textColumn} md:row-start-2`}>
          {[description].flat().map((paragraph, i) => (
            // A serif reads best with a little more leading. A page's lede is a step up, at 24px
            <p
              key={paragraph}
              className={`text-quiet-ink text-pretty ${
                pageTitle && i === 0 ? "text-xl md:text-2xl md:short:text-xl leading-[1.4]" : "text-lg leading-[1.65]"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
