import Image from "next/image";

// Photos under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until your own are ready. Replace each with your photo and describe it in alt
const HOBBIES = [
  {
    name: "Rock climbing",
    caption: "Climbing outdoors whenever the weather allows.",
    photo: "/placeholders/hobby-rock-climbing.jpg",
    alt: "Rock climbing",
  },
  {
    name: "Growing mushrooms",
    caption: "Growing oyster mushrooms at home.",
    photo: "/placeholders/hobby-nature.jpg",
    alt: "Oyster mushrooms growing",
  },
  {
    name: "My cat",
    caption: "Keeping my lap warm while I write.",
    photo: "/placeholders/hobby-cat.jpg",
    alt: "A black cat asleep on a blanket",
  },
];

const LINK = "text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2";

// A heading, one sentence, then three photos in a row, each with its name and a sentence under
// it, set like the projects in Selected work. One column on phones
export default function Hobbies() {
  return (
    <section>
      <h2 className="font-sans text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-quiet-ink">
        Interests and hobbies
      </h2>
      <p className="mt-6 max-w-[62ch] text-lg leading-[1.65] text-quiet-ink text-pretty">
        Here are some of the things I do in my own time.
      </p>
      <ul className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-6">
        {HOBBIES.map((hobby) => (
          <li key={hobby.name} className="flex flex-col">
            {/* Square, with the same thin edge as the project thumbnails */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden border border-quiet-rule bg-quiet-rule">
              <Image
                src={hobby.photo}
                alt={hobby.alt}
                fill
                sizes="(min-width: 640px) 300px, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-sans text-lg font-semibold leading-[1.3] text-quiet-ink">{hobby.name}</h3>
            <p className="mt-1 text-base leading-[1.55] text-quiet-muted text-pretty">{hobby.caption}</p>
          </li>
        ))}
      </ul>
      {/* An addendum to the photos, in the same voice as the sentence above them */}
      <p className="mt-12 max-w-[62ch] text-lg leading-[1.65] text-quiet-ink text-pretty">
        Wanna know what I&apos;m watching, reading, or identifying? Find me on{" "}
        <a href="https://letterboxd.com/GusReviewsMovie/" className={LINK}>Letterboxd</a>,{" "}
        <a href="https://www.goodreads.com/gusreviewsbook" className={LINK}>Goodreads</a>, and{" "}
        <a href="https://www.inaturalist.org/people/augustus45814" className={LINK}>iNaturalist</a>.
      </p>
    </section>
  );
}
