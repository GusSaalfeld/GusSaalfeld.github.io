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
        ready: true,
        title: "Designing a feedback system for Dietrich College’s DEI department",
        hoverDescription: "Using iterative design, user testing, and stakeholder interviews, I designed a feedback collection system still in use by the department today.",
        thumbnail: "/placeholders/capstone-project.jpg",
        genre: "User research",
        // DRAFT: from the resume. Check each line, and replace the placeholder picture
        page: {
            kind: "other",
            date: "Spring 2022",
            summary: "A dashboard that collects and reports feedback on DEI events, which Dietrich College’s Office of Diversity, Equity, and Inclusion still uses today.",
            image: { src: "/placeholders/capstone-project.jpg", alt: "Placeholder picture" },
            outcomes: [
                "The department still uses the dashboard to collect feedback on its events.",
                "Feedback from every event now arrives in one standard format, with graphs to inform decisions.",
                "Handover documentation and a product ownership manual let the department run it without me.",
            ],
            star: {
                situation: "The Office of Diversity, Equity, and Inclusion collected feedback on its events, but in no consistent format, so it was hard to compare events or act on what people said.",
                task: "As the office’s technical consultant, design a system to collect feedback and report it in a form the staff could use to make decisions.",
                action: "Conducted 30+ stakeholder interviews and user tests, designed the dashboard iteratively from what they showed, then wrote handover documentation and a product ownership manual.",
                result: "A dashboard that streamlines and standardizes data collection, and that the department still uses today.",
            },
        },
    },
    {
        path: "barista-training",
        ready: true,
        title: "Barista training manual",
        hoverDescription: "A training manual that my café used to train new baristas.",
        thumbnail: "/placeholders/barista-training.jpg",
        genre: "Technical writing",
        // DRAFT: from the manual itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Teach a new barista to make a latte, and with it how to use the espresso machine.",
            audience: "New baristas at La Prima’s Gates and Wean cafés on Carnegie Mellon’s campus.",
            summary: "A step-by-step guide that teaches new baristas at La Prima’s CMU cafés to make a latte, and with it how to use the espresso machine.",
            image: { src: "/placeholders/barista-training.jpg", alt: "Placeholder picture" },
            outcomes: [
                "The café uses the manual to train new baristas.",
                "New baristas can follow one drink from cup code to counter in four steps, without a supervisor beside them.",
                "Tables show what good and bad results look like, for tamping espresso and steaming milk, so baristas can check their own work.",
            ],
            star: {
                situation: "New baristas at La Prima’s Gates and Wean cafés learn the espresso machine during busy shifts, where mistakes like serving caffeine to a decaf order matter.",
                task: "Write a guide a new barista could follow on their own, true to La Prima’s traditional Italian coffee-making.",
                action: "Broke making a 16 oz double latte into four steps, from reading the cup code to serving the drink, and added comparison tables and safety notes on decaf and milk allergies.",
                result: "A manual the café uses to train new baristas.",
            },
            sample: { label: "Download the manual (PDF)", href: "/samples/barista-training-manual.pdf" },
        },
    },
    {
        path: "scientific-explainer",
        ready: true,
        title: "What happens when you type youtube.com into the web browser?",
        hoverDescription: "A beginner’s guide to what goes on behind the scenes whenever you look up a website in your web browser.",
        thumbnail: "/placeholders/scientific-explainer.jpg",
        genre: "Technical writing",
        // DRAFT: from the piece itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Explain what a browser does to load a website, without the jargon that makes most explanations impenetrable.",
            audience: "Curious readers with no technical background who use the internet every day.",
            summary: "A beginner’s guide to what happens between typing a web address and seeing the page, in four steps.",
            image: { src: "/placeholders/scientific-explainer.jpg", alt: "Placeholder picture" },
            outcomes: [
                "Covers DNS, TCP, HTTP, and how a page is drawn, without assuming any technical knowledge.",
                "Gives each idea an everyday comparison: a phone book, the post, a house’s blueprint and wiring.",
                "Recaps the whole process in a single sentence a reader can carry away.",
            ],
            star: {
                situation: "Explanations of how the web works are written for engineers, so most people who use it every day can’t follow them.",
                task: "Write an explanation that a reader with no technical background could follow from start to finish.",
                action: "Broke loading a website into four steps, introduced each technical term only when it was needed, and paired every idea with an everyday comparison.",
                result: "A self-contained guide that takes a beginner from a typed address to a page on screen.",
            },
            sample: { label: "Download the explainer (PDF)", href: "/samples/what-happens-when-you-type-youtube-com.pdf" },
        },
    },
    {
        path: "ux-writing",
        ready: true,
        title: "Adding a new course export feature to Canvas",
        hoverDescription: "Microcopy, a UX mockup, and a feature announcement meant to simulate adding a course export feature to Canvas.",
        thumbnail: "/placeholders/ux-writing.jpg",
        genre: "UX writing"
    },
    {
        path: "home-server",
        ready: true,
        title: "Home server",
        hoverDescription: "My home server runs on Proxmox and hosts the open-source tools I use daily, such as a recipe book, media server, and digital tracking protection.",
        thumbnail: "/placeholders/home-server.jpg",
        genre: "Self-hosting"
    },
    {
        path: "growing-mushrooms",
        ready: true,
        title: "How to grow oyster mushrooms at home",
        hoverDescription: "A how-to guide that walks beginners through growing oyster mushrooms at home.",
        thumbnail: "/placeholders/growing-mushrooms.jpg",
        genre: "How-to guide",
        // DRAFT: from the guide itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Show beginners that growing gourmet mushrooms at home is cheap and manageable, then walk them through it.",
            audience: "Beginners with no gardening or lab experience who want a cheap, low-effort project at home.",
            summary: "A how-to guide that takes a beginner from a syringe of spores to a harvest of blue oyster mushrooms in about six weeks.",
            image: { src: "/placeholders/growing-mushrooms.jpg", alt: "Placeholder picture" },
            outcomes: [
                "Breaks growing into three stages, each with what to do, what to watch for, and how long it takes.",
                "Lists every piece of equipment, and where to buy it, before the first step.",
                "Ends with what to learn next, from a second harvest to making your own supplies.",
            ],
            star: {
                situation: "Growing mushrooms at home is cheap and takes only a few hours of work, but guides for it are written for hobbyists who already know the jargon.",
                task: "Write a guide a beginner could follow on their own, starting with the easiest mushroom to grow.",
                action: "Opened with why it’s worth doing, chose blue oysters for how forgiving they are, then explained each grower’s term as it came up and gave timelines for every stage.",
                result: "A complete guide from first purchase to harvest, drawn from my own grows.",
            },
            sample: { label: "Download the guide (PDF)", href: "/samples/growing-oyster-mushrooms-at-home.pdf" },
        },
    },
    {
        path: "creative-writing",
        ready: true,
        title: "Short stories and a study on computer science in fiction",
        hoverDescription: "Short stories with absurd premises, and a study of how fiction can demonstrate computer science’s impact on our inner lives, through Italo Calvino’s *Cosmicomics*.",
        thumbnail: "/placeholders/creative-writing.jpg",
        genre: "Creative writing"
    },
];

// Whether a project's page can be linked to: it's marked ready and it has a page. A link that leads
// to "page not found" is worse than no link at all
export function hasLivePage(project: Project): boolean {
    return Boolean(project.ready && project.page);
}

// Whether a link goes somewhere: any link outside the project pages does; a project page only once
// it can be linked to
export function isLive(href: string): boolean {
    const path = href.match(/^\/portfolio\/(.+)$/)?.[1];
    return !path || ProjectList.some((project) => project.path === path && hasLivePage(project));
}
