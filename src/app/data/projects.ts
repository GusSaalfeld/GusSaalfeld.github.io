import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them.
// Thumbnails under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until pictures of the real work are ready. Replace each with the work itself.
// Each format reads "[Format] for [audience]" until the real phrase is in: three to six words, like
// "Training manual for new baristas"
export const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "UX writing",
        hoverDescription: "Feature announcement + UX microcopy.",
        thumbnail: "/placeholders/ux-writing.jpg",
        year: "2026",
        format: "[Format] for [audience]"
    },
    {
        path: "scientific-explainer",
        title: "Scientific explainer",
        hoverDescription: "A brief guide to web browsers.",
        thumbnail: "/placeholders/scientific-explainer.jpg",
        year: "2026",
        format: "[Format] for [audience]"
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "I developed a training manual for new baristas at my workplace.",
        thumbnail: "/placeholders/barista-training.jpg",
        year: "2026",
        format: "[Format] for [audience]"
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        thumbnail: "/placeholders/capstone-project.jpg",
        year: "2022",
        format: "[Format] for [audience]"
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "",
        thumbnail: "/placeholders/home-server.jpg",
        year: "2025–present",
        format: "[Format] for [audience]"
    },
    {
        path: "growing-mushrooms",
        title: "Growing mushrooms",
        hoverDescription: "",
        thumbnail: "/placeholders/growing-mushrooms.jpg",
        year: "2026",
        format: "[Format] for [audience]"
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "",
        thumbnail: "/placeholders/creative-writing.jpg",
        year: "", // writing from across many years, so no single year
        format: "[Format] for [audience]"
    },
];
