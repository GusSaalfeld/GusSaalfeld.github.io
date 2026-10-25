import Image from "next/image";
import Card from "@/app/components/card";
import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

// Work first: the name and one sentence, then the projects, then a short about with the photo
export default function Portfolio() {
  return (
    <>
      <header>
        {/* The top of a 1.333 type scale: 18 body, 24 lede and project titles, 32 headings, 42, 57, 76 */}
        <h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1] tracking-[-0.025em] text-quiet-ink">
          Augustus Saalfeld
        </h1>
        {/* The lede: set in the reading face, as the first line of the writing */}
        <p className="mt-6 max-w-[36ch] text-2xl leading-[1.4] text-quiet-ink text-pretty">
          Writer with a background in software, storytelling, and user testing.
        </p>
      </header>
      <FeaturedProjects projects={ProjectList} />
      <Card mediaFirst title="About" description={[
        "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
        "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
      ]}>
        {/* The whole scene, uncropped, about as tall as the paragraphs beside it */}
        <Image
          src="/hero2.jpg"
          alt="Clam digging on a tidal flat beneath a wooden pier"
          width={1113}
          height={1107}
          sizes="(min-width: 768px) 352px, 100vw"
          className="block w-full h-auto"
        />
      </Card>
    </>
  );
}
