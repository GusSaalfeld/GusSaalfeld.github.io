import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them.
// Thumbnails under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until pictures of the real work are ready. Replace each with the work itself.
export const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "UX writing",
        hoverDescription: "Feature announcement + UX microcopy.",
        thumbnail: "/placeholders/ux-writing.jpg"
    },
    {
        path: "scientific-explainer",
        title: "Scientific explainer",
        hoverDescription: "A brief guide to web browsers.",
        thumbnail: "/placeholders/scientific-explainer.jpg"
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "I developed a training manual for new baristas at my workplace.",
        thumbnail: "/placeholders/barista-training.jpg"
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        thumbnail: "/placeholders/capstone-project.jpg"
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "",
        thumbnail: "/placeholders/home-server.jpg"
    },
    {
        path: "growing-mushrooms",
        title: "Growing mushrooms",
        hoverDescription: "",
        thumbnail: "/placeholders/growing-mushrooms.jpg"
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "",
        thumbnail: "/placeholders/creative-writing.jpg"
    },
];
