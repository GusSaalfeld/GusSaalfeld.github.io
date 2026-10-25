import Image from "next/image";
import Card from "@/app/components/card";
import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

export default function Portfolio() {
  return (
    <>
      {/* The one place the slime shows: through the letters of the name. This header has no
          background of its own, so the name's letters reach the slime behind the page */}
      <header>
        <h1 className="slime-letters px-6 md:px-12 pt-12 md:pt-20 pb-4 font-sans text-[clamp(4rem,15vw,13rem)] font-black leading-[0.88] tracking-[-0.03em] [font-stretch:112%]">
          Augustus Saalfeld
        </h1>
        <p className="bg-quiet-paper px-6 md:px-12 pb-16 pt-4 font-sans text-xl md:text-2xl text-quiet-muted">
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
      {/* Paper to the bottom of the screen, so the slime never shows below a short page */}
      <div className="grow bg-quiet-paper min-h-[40svh]" />
    </>
  );
}
