import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them: work with real readers first, since hiring
// managers weigh real use above practice pieces, and the first rows get the most attention.
// Thumbnails under /placeholders/ are stock photos from Picsum (picsum.photos, Unsplash licence),
// standing in until pictures of the real work are ready. Replace each with the work itself.
// Each description is one sentence: what it is, who it was for, and what it achieved, in about
// 15 to 20 words, like the barista manual's. The rest still need rewriting to that pattern.
// Titles and genres are in sentence case: only the first word and proper nouns capitalised.
// Lists of three or more take the Oxford comma: "a, b, and c".
// Apostrophes are curly (’), not straight ('), as everywhere on the site.
// In a description, *asterisks* set the words between them in italics, for titles of books and the like
export const ProjectList: Project[] = [
    {
        path: "capstone-project",
        title: "Designing a feedback system for Dietrich College’s DEI department",
        hoverDescription: "Using iterative design, user testing, and stakeholder interviews, I designed a feedback collection system still in use by the department today.",
        thumbnail: "/placeholders/capstone-project.jpg",
        genre: "User research"
    },
    {
        path: "barista-training",
        title: "Barista training manual",
        hoverDescription: "A training manual that my café used to train new baristas.",
        thumbnail: "/placeholders/barista-training.jpg",
        genre: "Technical writing"
    },
    {
        path: "scientific-explainer",
        title: "What happens when you type youtube.com into the web browser?",
        hoverDescription: "A beginner’s guide to what goes on behind the scenes whenever you look up a website in your web browser.",
        thumbnail: "/placeholders/scientific-explainer.jpg",
        genre: "Technical writing"
    },
    {
        path: "ux-writing",
        title: "Adding a new course export feature to Canvas",
        hoverDescription: "Microcopy, a UX mockup, and a feature announcement meant to simulate adding a course export feature to Canvas.",
        thumbnail: "/placeholders/ux-writing.jpg",
        genre: "UX writing"
    },
    {
        path: "home-server",
        title: "Home server",
        hoverDescription: "My home server runs on Proxmox and hosts the open-source tools I use daily, such as a recipe book, media server, and digital tracking protection.",
        thumbnail: "/placeholders/home-server.jpg",
        genre: "Self-hosting"
    },
    {
        path: "growing-mushrooms",
        title: "How to grow oyster mushrooms at home",
        hoverDescription: "A how-to guide that walks beginners through growing oyster mushrooms at home.",
        thumbnail: "/placeholders/growing-mushrooms.jpg",
        genre: "How-to guide"
    },
    {
        path: "creative-writing",
        title: "Short stories and a study on computer science in fiction",
        hoverDescription: "Short stories with absurd premises, and a study of how fiction can demonstrate computer science’s impact on our inner lives, through Italo Calvino’s *Cosmicomics*.",
        thumbnail: "/placeholders/creative-writing.jpg",
        genre: "Creative writing"
    },
];

// Whether a link goes somewhere: any link outside the project pages does; a project page only once
// its project is marked ready. A link that leads to "page not found" is worse than no link at all
export function isLive(href: string): boolean {
    const path = href.match(/^\/portfolio\/(.+)$/)?.[1];
    return !path || ProjectList.some((project) => project.path === path && project.ready);
}
