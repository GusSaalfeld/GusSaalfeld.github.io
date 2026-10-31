import Image from "next/image";

// Your photos are in /hobbies/: describe each in alt. focus places the crop (CSS object-position),
// for a photo whose subject isn't at its centre
const HOBBIES: { name: string; caption: string; photo: string; alt: string; focus?: string }[] = [
  {
    name: "Rock climbing",
    caption: "Climbing outdoors whenever the weather allows.",
    photo: "/hobbies/rock-climbing.jpg",
    alt: "Climbing a tall sandstone cliff on a rope, under a blue sky",
    focus: "50% 58%", // the climber, a little below the middle of the tall photo
  },
  {
    name: "Growing mushrooms",
    caption: "Growing oyster mushrooms at home.",
    photo: "/hobbies/mushroom-growing.jpg",
    alt: "Jars of grain with white oyster mushroom mycelium growing through them",
    focus: "50% 48%", // the jars, lids and all
  },
  {
    name: "Painting miniatures",
    caption: "Painting Warhammer figurines.",
    photo: "/hobbies/warhammer-miniature.jpg",
    alt: "A Warhammer figurine, part-painted in dark green, beside a paintbrush",
    focus: "0% 65%", // the figurine, left of centre
  },
];

const LINK = "text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2";

// A heading, a few sentences linking to where I log what I watch, read, and find, then three
// photos in a row, each with its name and a sentence under it, set like the projects in Selected
// work. One column on phones
export default function Hobbies() {
  return (
    <section>
      <h2 className="font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        Interests and hobbies
      </h2>
      <p className="mt-6 max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">
        Want to know what I&rsquo;m watching, reading, or identifying? Find me on{" "}
        <a href="https://letterboxd.com/GusReviewsMovie/" className={LINK}>Letterboxd</a>,{" "}
        <a href="https://www.goodreads.com/gusreviewsbook" className={LINK}>Goodreads</a>, and{" "}
        <a href="https://www.inaturalist.org/people/augustus45814" className={LINK}>iNaturalist</a>.
      </p>
      <p className="mt-6 max-w-[62ch] text-lg leading-[1.55] text-quiet-ink text-pretty">
        Here are some things I do in my free time.
      </p>
      {/* 24px under the sentence that introduces them, so it leads straight into them */}
      <ul className="mt-6 grid gap-12 sm:grid-cols-3 sm:gap-6">
        {HOBBIES.map((hobby) => (
          <li key={hobby.name} className="flex flex-col">
            {/* Square, and 3:2 on phones so the three stacked take less than a screen. No edge:
                an edge marks a thumbnail that links somewhere, and these don't */}
            <div className="photo-grade relative aspect-[3/2] sm:aspect-square overflow-hidden bg-quiet-rule">
              <Image
                src={hobby.photo}
                alt={hobby.alt}
                fill
                sizes="(min-width: 640px) 300px, 100vw"
                className="object-cover"
                style={hobby.focus ? { objectPosition: hobby.focus } : undefined}
              />
            </div>
            <h3 className="mt-4 font-sans text-lg font-semibold leading-[1.3] text-quiet-ink">{hobby.name}</h3>
            <p className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{hobby.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
