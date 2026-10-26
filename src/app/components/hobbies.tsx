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
    name: "Naturalism",
    caption: "Logging the mushrooms, plants, and animals I find on iNaturalist.",
    photo: "/placeholders/hobby-nature.jpg",
    alt: "A mushroom on the forest floor",
  },
  {
    name: "My cat",
    caption: "Keeping my lap warm while I write.",
    photo: "/placeholders/hobby-cat.jpg",
    alt: "A black cat asleep on a blanket",
  },
];

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
    </section>
  );
}
