import Image from "next/image";
import { isLive } from "@/app/data/projects";

// Your photos are in /hobbies/: describe each in alt. focus places the crop (CSS object-position),
// for a photo whose subject isn't at its centre; zoom crops the square in further, around the focus,
// for one whose subject is small in the frame. Each caption adds a detail the name doesn't. A link points to
// the writing a hobby led to, and shows once that page is ready
type Hobby = {
  name: string;
  caption: string;
  photo: string;
  alt: string;
  focus?: string;
  zoom?: number;
  fit?: "contain";  // show the whole picture on white, for a drawing or animation, rather than crop it
  link?: { label: string; href: string };
  credit?: { text: string; href: string }; // for a picture that isn't mine: who made it, and its licence
};

const HOBBIES: Hobby[] = [
  {
    name: "Rock climbing",
    caption: "While I mostly boulder, here’s me climbing at Smith Rock, Oregon.",
    photo: "/hobbies/rock-climbing.jpg",
    alt: "Climbing a tall rock face at Smith Rock, Oregon, on a rope, under a blue sky",
    focus: "50% 58%", // the climber, a little below the middle of the tall photo
  },
  {
    name: "Growing mushrooms",
    caption: "Blue oysters, pink oysters (which taste like bacon), and lion’s mane (which has the texture of crab).",
    photo: "/hobbies/mushroom-growing.jpg",
    alt: "Jars of grain with white oyster mushroom mycelium growing through them",
    focus: "62% 58%", // the sharpest jar, on the right, with the most growth
    zoom: 1.3,
    link: { label: "Read my guide to growing them", href: "/portfolio/growing-mushrooms" },
  },
  {
    name: "Juggling",
    caption: "Recently, I learned to juggle three balls for about eight seconds. Now I’m working on juggling while reciting riddles, as a party trick.",
    // PLACEHOLDER: an animation of the three-ball cascade, until there's a photo or clip of me
    photo: "/placeholders/hobby-juggling.gif",
    alt: "An animated figure juggling three balls in a cascade",
    fit: "contain",
    credit: { text: "Animation: Koxinga, CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:3-ball_cascade_movie.gif" },
  },
];

const LINK = "text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2";

// A heading and a sentence, then three photos in a row, each with its name and a sentence under it,
// set like the projects in Selected work (one column on phones), then links to where I log what I
// watch, read, and find
export default function Hobbies() {
  return (
    <section>
      <h2 className="font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        Interests and hobbies
      </h2>
      <p className="mt-6 max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">
        When I&rsquo;m not writing, you can usually find me doing one of these.
      </p>
      {/* 24px under the sentence that introduces them, so it leads straight into them */}
      <ul className="mt-6 grid gap-12 sm:grid-cols-3 sm:gap-6">
        {HOBBIES.map((hobby) => (
          <li key={hobby.name} className="flex flex-col">
            {/* Square, and 3:2 on phones so the three stacked take less than a screen. No edge:
                an edge marks a thumbnail that links somewhere, and these don't */}
            <div className={`${hobby.fit ? "bg-white" : "photo-grade bg-quiet-rule"} relative aspect-[3/2] sm:aspect-square overflow-hidden`}>
              <Image
                src={hobby.photo}
                alt={hobby.alt}
                fill
                sizes="(min-width: 640px) 300px, 100vw"
                // The zoom applies to the squares only: the wider phone crop already frames the subject
                className={hobby.fit ? "object-contain" : "object-cover sm:[scale:var(--zoom)]"}
                style={{
                  objectPosition: hobby.focus,
                  transformOrigin: hobby.focus,
                  ["--zoom" as string]: hobby.zoom ?? 1,
                }}
              />
            </div>
            <h3 className="mt-4 font-sans text-lg font-semibold leading-[1.3] text-quiet-ink">{hobby.name}</h3>
            <p className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{hobby.caption}</p>
            {hobby.credit && (
              <p className="mt-1 text-sm leading-[1.5] text-quiet-muted">
                <a href={hobby.credit.href} className="underline decoration-1 underline-offset-2 hover:text-quiet-link">{hobby.credit.text}</a>
              </p>
            )}
            {hobby.link && isLive(hobby.link.href) && (
              <p className="mt-1 text-base leading-[1.55]">
                <a href={hobby.link.href} className={LINK}>{hobby.link.label}</a>
              </p>
            )}
          </li>
        ))}
      </ul>
      {/* A way to find more, after the hobbies themselves: the photos come first, as what's most
          worth seeing, and the links, which leave the site, last */}
      <p className="mt-12 max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">
        Want to know what I&rsquo;m watching, reading, or identifying? Find me on{" "}
        <a href="https://letterboxd.com/GusReviewsMovie/" className={LINK}>Letterboxd</a>,{" "}
        <a href="https://www.goodreads.com/gusreviewsbook" className={LINK}>Goodreads</a>, and{" "}
        <a href="https://www.inaturalist.org/people/augustus45814" className={LINK}>iNaturalist</a>.
      </p>
    </section>
  );
}
