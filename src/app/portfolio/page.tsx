import Image from "next/image";
import Card from "@/app/components/card";
import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

export default function Portfolio() {
  return (
    <>
      <header>
        {/* The top of a 1.333 type scale: 18 body, 24, 32 headings, 42, 57, 76 */}
        <h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1] tracking-[-0.025em] text-quiet-ink">
          Augustus Saalfeld
        </h1>
        <p className="mt-6 font-sans text-2xl text-quiet-muted">
          Tech & science writer
        </p>
      </header>
      <Card title="Writer with a background in software, storytelling, and user testing." description={[
        "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
        "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
      ]}>
        <Image
          src="/hero2.jpg"
          alt="Clam digging on a tidal flat beneath a wooden pier"
          width={1113}
          height={1107}
          sizes="(min-width: 768px) 288px, 100vw"
          priority
          className="block w-full max-w-sm h-auto"
        />
      </Card>
      <FeaturedProjects projects={ProjectList} />
    </>
  );
}
