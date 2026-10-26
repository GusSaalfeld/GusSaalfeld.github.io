import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them.
// Thumbnails under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until pictures of the real work are ready. Replace each with the work itself.
// Each description is one sentence: what it is, who it was for, and what it achieved, in about
// 15 to 20 words, like the barista manual's. The rest still need rewriting to that pattern.
// Titles and categories are in sentence case: only the first word and proper nouns capitalised
export const ProjectList: Project[] = [
    {
        path: "ux-writing",
        title: "Adding a new course export feature to Canvas",
        hoverDescription: "User interviews, a UX mockup, microcopy and a feature announcement to simulate adding the course export feature to Canvas.",
        thumbnail: "/placeholders/ux-writing.jpg",
        year: "2026",
        category: "UX writing"
    },
    {
        path: "scientific-explainer",
        title: "What happens when you type youtube.com into the web browser?",
        hoverDescription: "A beginner's guide to what goes on behind the scenes whenever you look up a website in your web browser.",
        thumbnail: "/placeholders/scientific-explainer.jpg",
        year: "2026",
        category: "Technical writing"
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "A training manual that my café used to train new baristas.",
        thumbnail: "/placeholders/barista-training.jpg",
        year: "2026",
        category: "Technical writing"
    },
    {
        path: "capstone-project",
        title: "Capstone project",
        hoverDescription: "Through rigorous testing, I developed a feedback form for my university's DEI department.",
        thumbnail: "/placeholders/capstone-project.jpg",
        year: "2022",
        category: "User research"
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "Built a home server running on Proxmox in order to host open-source software for my daily use.",
        thumbnail: "/placeholders/home-server.jpg",
        year: "2025–present",
        category: "Self-hosting"
    },
    {
        path: "growing-mushrooms",
        title: "How to grow oyster mushrooms at home",
        hoverDescription: "A how-to guide that walks beginners through growing oyster mushrooms at home.",
        thumbnail: "/placeholders/growing-mushrooms.jpg",
        year: "2026",
        category: "How-to guide"
    },
    {
        path: "creative-writing",
        title: "Creative writing",
        hoverDescription: "Selected short stories, as well as a research project on science fiction based in computer science.",
        thumbnail: "/placeholders/creative-writing.jpg",
        year: "", // writing from across many years, so no single year
        category: "Creative writing"
    },
];
