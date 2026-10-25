import Image from "next/image";
import Card from "@/app/components/card";
import FeaturedProjects from "@/app/components/featured-projects";
import type { Project } from "@/app/types";

const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "UX writing",
        hoverDescription: "Feature announcement + UX microcopy.",
        iconPath: "/ux.jfif"
    },
    {
        path: "scientific-explainer",
        title: "Scientific explainer",
        hoverDescription: "A brief guide to web browsers.",
        iconPath: ""
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "I developed a training manual for new baristas at my workplace.",
        iconPath: ""
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        iconPath: ""
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "",
        iconPath: ""
    },
    {
        path: "growing-mushrooms",
        title: "Growing mushrooms",
        hoverDescription: "",
        iconPath: ""
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "",
        iconPath: ""
    },
];

export default function Portfolio() {
  return (
    // One column for everything. The hero leaves the pool open above the name, and the margins
    // beside the column stay open all the way down, for the starfish
    <div data-slime-cover="column" className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-4 md:px-8 pb-16">
      <header className="flex min-h-[80svh] flex-col justify-end gap-3 pb-6">
        <h1 className="font-display text-[clamp(3.25rem,11vw,8rem)] font-bold leading-[0.9] tracking-[-0.025em] [font-stretch:80%] text-pool-moonlight">
          Augustus Saalfeld
        </h1>
        <p className="font-display text-xl md:text-2xl text-pool-torch">Tech & science writer</p>
      </header>
      <Card split title="Writer with a background in software, storytelling, and user testing." description={[
        "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
        "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
      ]}>
        {/* About 40% of the column's width from md up */}
        <Image
          src="/hero2.jpg"
          alt="Clam digging on a tidal flat beneath a wooden pier"
          width={1113}
          height={1107}
          sizes="(min-width: 768px) 400px, 100vw"
          priority
          className="block w-full h-auto rounded-xl"
        />
      </Card>
      <FeaturedProjects projects={ProjectList} />
    </div>
  );
}
