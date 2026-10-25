import Image from "next/image";
import Card from "@/app/components/card";
import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

export default function Portfolio() {
  return (
    <>
      <header className="px-6 md:px-12 pt-12 lg:pt-28 pb-12">
        <h1 className="text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.02em] [font-stretch:85%] text-lab-ink">
          Augustus Saalfeld
        </h1>
        <p className="mt-4 text-xl text-lab-graphite">Tech & science writer</p>
      </header>
      <Card title="Writer with a background in software, storytelling, and user testing." description={[
        "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
        "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
      ]}>
        {/* The column is half the window from lg up, a little under 50vw with its padding */}
        <Image
          src="/hero2.jpg"
          alt="Clam digging on a tidal flat beneath a wooden pier"
          width={1113}
          height={1107}
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
          className="block w-full max-w-md h-auto rounded-md"
        />
      </Card>
      <FeaturedProjects projects={ProjectList} />
    </>
  );
}
