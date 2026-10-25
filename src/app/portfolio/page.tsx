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
    // One frame around every panel, like a single game screen
    <div className="frame flex flex-col gap-2 w-full max-w-5xl mx-auto">
      <Card bare split title="Writer with a background in software, storytelling, and user testing." description={[
        "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
        "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
      ]}>
        {/* Pixelated like a game viewport: sizes asks for a small copy of the photo
            (128 or 256 pixels wide), and the browser scales it up in hard blocks */}
        <Image
          src="/hero.jpg"
          alt="Clam digging on a tidal flat beneath a wooden pier"
          width={1284}
          height={1107}
          sizes="128px"
          priority
          className="block w-full h-auto [image-rendering:pixelated]"
        />
      </Card>
      <FeaturedProjects bare projects={ProjectList} />
    </div>
  );
}
