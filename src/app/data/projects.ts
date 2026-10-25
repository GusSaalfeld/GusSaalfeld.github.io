import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them.
// Thumbnails under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until pictures of the real work are ready. Replace each with the work itself.
// Each description is one sentence: what it is, who it was for, and what it achieved, in about
// 15 to 20 words, like the barista manual's. The rest still need rewriting to that pattern.
export const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "Course export for Canvas",
        hoverDescription: "User interviews, a UX mockup, microcopy and a feature announcement for a simulated launch of course export in Canvas.",
        thumbnail: "/placeholders/ux-writing.jpg",
        year: "2026"
    },
    {
        path: "scientific-explainer",
        title: "Scientific explainer",
        hoverDescription: "A brief guide to web browsers.",
        thumbnail: "/placeholders/scientific-explainer.jpg",
        year: "2026"
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "A training manual that my cafe used to train new baristas.",
        thumbnail: "/placeholders/barista-training.jpg",
        year: "2026"
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        thumbnail: "/placeholders/capstone-project.jpg",
        year: "2022"
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "",
        thumbnail: "/placeholders/home-server.jpg",
        year: "2025–present"
    },
    {
        path: "growing-mushrooms",
        title: "Growing mushrooms",
        hoverDescription: "",
        thumbnail: "/placeholders/growing-mushrooms.jpg",
        year: "2026"
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "",
        thumbnail: "/placeholders/creative-writing.jpg",
        year: "" // writing from across many years, so no single year
    },
];
