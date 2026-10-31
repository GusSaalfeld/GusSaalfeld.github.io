import type { Project } from "@/app/types";

// The projects, in the order the portfolio lists them. To take one off the site, add hidden: true.
// The order: work with real readers first, since hiring
// managers weigh real use above practice pieces, and the first rows get the most attention.
// Thumbnails show the work itself: a writing sample's is the top of its first page. A project
// without a real picture has none, rather than a stock photo that doesn't match it.
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
        hoverDescription: "A feedback system for Dietrich College’s DEI department, designed through iterative user testing and stakeholder interviews, still in use today.",
        thumbnail: "", // none until there’s a real picture of the work
        genre: "UX research and writing",
        // DRAFT: from the resume. Check each line. Put each document's file in public/samples/ and add its
        // href below, and its link appears; screenshots of the form and the visualizations go in previews
        page: {
            kind: "other",
            date: "Spring 2022",
            documents: [
                { name: "Project report", description: "What the office needed, what I built, and why." },
                { name: "Final feedback form", description: "A screenshot of the form attendees fill in after an event." },
                { name: "Data visualizations", description: "The graphs staff use to compare events and decide what to change." },
                { name: "Handover documentation", description: "How to run and maintain the system, so the department could without me." },
                { name: "Postmortem", description: "What went well, what didn’t, and what I’d do differently." },
            ],
            summary: "A feedback system that collects and graphs feedback on DEI events, which Dietrich College’s Office of Diversity, Equity, and Inclusion still uses today.",
            outcomes: [
                "The department still uses the feedback system to collect feedback on its events.",
                "Feedback from every event now arrives in one standard format, with graphs to inform decisions.",
                "Handover documentation and a product ownership manual let the department run it without me.",
            ],
            challenges: [
                {
                    problem: "Staff collected feedback on each event in their own way, so events couldn’t be compared.",
                    solution: "Built one feedback system that collects feedback in a standard format and graphs it for decisions.",
                },
                {
                    problem: "A system the staff didn’t like using wouldn’t get used.",
                    solution: "Ran 30+ stakeholder interviews and user tests, and redesigned the system from what they showed.",
                },
                {
                    problem: "The system had to keep running after my contract ended.",
                    solution: "Wrote handover documentation and a product ownership manual, so the department could run it without me.",
                },
            ],
        },
    },
    {
        path: "barista-training",
        ready: true,
        title: "Barista training manual",
        hoverDescription: "A training manual my café uses to train new baristas.",
        thumbnail: "/samples/previews/barista-training-manual-thumb.png", // the top of its first page
        genre: "Training documentation",
        // DRAFT: from the manual itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Teach a new barista to make a latte, and with it how to use the espresso machine.",
            audience: "New baristas at La Prima’s Gates and Wean cafés on Carnegie Mellon’s campus.",
            format: "7 pages, PDF",
            previews: [{ src: "/samples/previews/barista-training-manual-1.png", alt: "Page 1 of the manual" }, { src: "/samples/previews/barista-training-manual-2.png", alt: "Page 2 of the manual" }],
            summary: "A seven-page training manual that takes a new barista through one drink, a hot 16 oz double latte, from cup to counter.",
            outcomes: [
                "The café uses the manual to train new baristas.",
                "New baristas can follow one drink from cup code to counter in four steps, without a supervisor beside them.",
                "Tables show what good and bad results look like, for tamping espresso and steaming milk, so baristas can check their own work.",
            ],
            challenges: [
                {
                    problem: "New baristas learn mid-shift, with no time to read ahead.",
                    solution: "Organized the manual around one drink, so each step is the next thing they do.",
                },
                {
                    problem: "“Good espresso” and “well-steamed milk” are hard to describe in words.",
                    solution: "Added tables comparing too little, too much, and just right, by how each looks, sounds, and tastes.",
                },
                {
                    problem: "Some mistakes, like caffeine in a decaf order, could hurt a customer.",
                    solution: "Flagged the decaf and milk-allergy risks at the steps where they happen, not in a separate safety section.",
                },
            ],
            sample: { label: "Download the manual (PDF)", href: "/samples/barista-training-manual.pdf" },
        },
    },
    {
        path: "scientific-explainer",
        ready: true,
        title: "What happens when you type youtube.com into the web browser?",
        hoverDescription: "A beginner’s guide to what goes on behind the scenes whenever you look up a website in your web browser.",
        thumbnail: "/samples/previews/what-happens-when-you-type-youtube-com-thumb.png", // the top of its first page
        genre: "Science and tech explainer",
        // DRAFT: from the piece itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Explain what a browser does to load a website, without the jargon that makes most explanations impenetrable.",
            audience: "Curious readers with no technical background who use the internet every day.",
            format: "7 pages, PDF",
            previews: [{ src: "/samples/previews/what-happens-when-you-type-youtube-com-1.png", alt: "Page 1 of the explainer" }, { src: "/samples/previews/what-happens-when-you-type-youtube-com-2.png", alt: "Page 2 of the explainer" }],
            summary: "A seven-page explainer that walks a beginner through what happens between typing a web address and seeing the page.",
            outcomes: [
                "Covers DNS, TCP, HTTP, and how a page is drawn, without assuming any technical knowledge.",
                "Gives each idea an everyday comparison: a phone book, the post, a house’s blueprint and wiring.",
                "Recaps the whole process in a single sentence a reader can carry away.",
            ],
            challenges: [
                {
                    problem: "Most readers stop at the first unfamiliar term.",
                    solution: "Introduced each term, from DNS to HTTP, only at the step that needs it, and defined it in the same sentence.",
                },
                {
                    problem: "The process is invisible, so it’s hard to picture.",
                    solution: "Gave each step an everyday comparison: a phone book, the post, a house’s blueprint and wiring.",
                },
                {
                    problem: "Four steps, each with its own detail, make it easy to lose the thread.",
                    solution: "Summarized all four steps up front, then recapped them in one sentence at the end.",
                },
            ],
            sample: { label: "Download the explainer (PDF)", href: "/samples/what-happens-when-you-type-youtube-com.pdf" },
        },
    },
    {
        path: "ux-writing",
        ready: true,
        title: "Adding a new course export feature to Canvas",
        hoverDescription: "Microcopy, a UX mockup, and a launch announcement for a course export feature in Canvas, written as if it were shipping.",
        thumbnail: "", // none until there’s a real picture of the work
        genre: "UX writing",
        // DRAFT: from the description. Check each line; the challenges are guesses at what was hard.
        // Put each piece's file in public/samples/ and add its href below, and its link appears;
        // screenshots of the mockup would make good previews
        page: {
            kind: "writing",
            date: "2026",
            summary: "Microcopy, a UX mockup, and a launch announcement for a course export feature in Canvas, written as if it were shipping.",
            purpose: "Show how I’d write for a new feature end to end: in the interface itself, and in telling users it exists.",
            audience: "Teachers who use Canvas, the learning platform, and want to take their courses with them.",
            format: "Microcopy, a mockup, and an announcement",
            documents: [
                { name: "Microcopy", description: "The buttons, labels, messages, and errors a teacher meets while exporting a course." },
                { name: "UX mockup", description: "The export flow, screen by screen, with the microcopy in place." },
                { name: "Feature announcement", description: "The launch post that tells teachers what the feature does and how to find it." },
            ],
            outcomes: [
                "Covers a feature from first click to finished export, including what happens when it fails.",
                "Keeps one vocabulary throughout, so the button, the messages, and the announcement name things the same way.",
                "Shows interface writing and announcement writing for the same feature, side by side.",
            ],
            challenges: [
                {
                    problem: "An export can take a while, and a teacher can’t tell whether it’s working.",
                    solution: "Wrote progress and completion messages that say what’s happening and what to do next.",
                },
                {
                    problem: "Export errors usually blame the user or say nothing useful.",
                    solution: "Wrote each error to say what went wrong and how to fix it, in plain words.",
                },
                {
                    problem: "Teachers ignore announcements that read like marketing.",
                    solution: "Led the announcement with the problem it solves, then the three steps to use it.",
                },
            ],
        },
    },
    {
        path: "home-server",
        ready: true,
        title: "Home server",
        hoverDescription: "My home server runs on Proxmox and hosts the open-source tools I use daily, such as a media server, password manager, and network-wide ad blocking.",
        thumbnail: "", // none until there’s a real picture of the work
        genre: "Self-hosting",
        // DRAFT: from the description and the tools you listed. The challenges in particular are
        // guesses at what was hard: replace them with what actually was. Screenshots would make good previews
        page: {
            kind: "other",
            date: "2025–present",
            summary: "A home server running on Proxmox that hosts the open-source tools I use every day, in place of commercial services.",
            builtWith: "Proxmox, Docker, Portainer",
            services: [
                { name: "Jellyfin", role: "media" },
                { name: "AdGuard Home", role: "ad blocking" },
                { name: "Vaultwarden", role: "passwords" },
                { name: "OpenMediaVault", role: "network storage" },
                { name: "OpenWrt", role: "router" },
                { name: "WireGuard", role: "VPN, through OpenWrt" },
                { name: "Tailscale", role: "remote access" },
            ],
            outcomes: [
                "Hosts the services I use every day, from media and passwords to network storage and remote access.",
                "Replaces commercial services with open-source tools I control.",
                "Gives me a place to learn infrastructure hands-on: virtualization, containers, and networking.",
            ],
            challenges: [
                {
                    problem: "Running several services on one machine risks one breaking the others.",
                    solution: "Ran each service in its own Docker container, managed through Portainer on Proxmox.",
                },
                {
                    problem: "Blocking trackers for every device meant changing the network itself, not each device.",
                    solution: "Set up the router with OpenWrt so every device on the network goes through AdGuard Home.",
                },
                {
                    problem: "A server I rely on daily has to be easy to fix when something goes wrong.",
                    solution: "Kept the setup in containers that can be rebuilt quickly, rather than one hand-tuned system.",
                },
            ],
        },
    },
    {
        path: "growing-mushrooms",
        ready: true,
        title: "How to grow oyster mushrooms at home",
        hoverDescription: "A how-to guide that walks beginners through growing oyster mushrooms at home.",
        thumbnail: "/samples/previews/growing-oyster-mushrooms-at-home-thumb.png", // the top of its first page
        genre: "How-to guide",
        // DRAFT: from the guide itself. Check each line, and replace the placeholder picture
        page: {
            kind: "writing",
            date: "2026",
            purpose: "Show beginners that growing gourmet mushrooms at home is cheap and manageable, then walk them through it.",
            audience: "Beginners with no gardening or lab experience who want a cheap, low-effort project at home.",
            format: "5 pages, PDF",
            previews: [{ src: "/samples/previews/growing-oyster-mushrooms-at-home-1.png", alt: "Page 1 of the guide" }, { src: "/samples/previews/growing-oyster-mushrooms-at-home-2.png", alt: "Page 2 of the guide" }],
            summary: "A five-page how-to guide to growing blue oyster mushrooms at home, from a syringe of spores to the first harvest.",
            outcomes: [
                "Breaks growing into three stages, each with what to do, what to watch for, and how long it takes.",
                "Lists every piece of equipment, and where to buy it, before the first step.",
                "Ends with what to learn next, from a second harvest to making your own supplies.",
            ],
            challenges: [
                {
                    problem: "Growers’ guides assume you know terms like spawn, substrate, and pins.",
                    solution: "Explained each term in plain words the first time it appears.",
                },
                {
                    problem: "Beginners give up when a grow gets contaminated.",
                    solution: "Chose blue oysters, the most forgiving species, and covered keeping things clean before the first step.",
                },
                {
                    problem: "A grow takes about six weeks, so it’s hard to tell if it’s on track.",
                    solution: "Gave a timeline for each stage, and what to look for before moving on.",
                },
            ],
            sample: { label: "Download the guide (PDF)", href: "/samples/growing-oyster-mushrooms-at-home.pdf" },
        },
    },
    {
        path: "creative-writing",
        ready: true,
        title: "Short stories and a study on computer science in fiction",
        hoverDescription: "Short stories with absurd premises, and a study of how fiction can demonstrate computer science’s impact on our inner lives, through Italo Calvino’s *Cosmicomics*.",
        thumbnail: "", // none until there’s a real picture of the work
        genre: "Creative writing",
        // DRAFT: from the description and the SURF fellowship. Check each line, the date especially, and
        // add the stories and the study: their files in public/samples/, with an href below each
        page: {
            kind: "writing",
            date: "2022",
            summary: "Short stories with absurd premises, and a study of how Italo Calvino’s *Cosmicomics* uses fiction to show computer science’s effect on our inner lives.",
            purpose: "Explore how fiction can make an abstract computer science idea felt, not just understood.",
            audience: "Readers of literary fiction, with or without a background in computer science.",
            format: "Short stories and a research study",
            documents: [
                { name: "Short stories", description: "Stories with absurd premises, including one that dramatizes abstraction." },
                { name: "Study of *Cosmicomics*", description: "How Calvino turns scientific ideas into stories about how it feels to live with them." },
                { name: "Research summary", description: "A video summary of the research, from Carnegie Mellon’s Meeting of the Minds.", href: "https://www.youtube.com/watch?v=hb2u9kJPV4E" },
            ],
            outcomes: [
                "Won a SURF Creative Writing Fellowship from Carnegie Mellon to write it.",
                "Presented the research at Carnegie Mellon’s Meeting of the Minds.",
                "A story that makes abstraction, a core idea in computer science, something a reader feels.",
            ],
            challenges: [
                {
                    problem: "There’s very little fiction about computer science to learn from.",
                    solution: "Studied how Calvino’s *Cosmicomics* turns physics and cosmology into stories, and applied it to computing.",
                },
                {
                    problem: "Explaining an idea like abstraction kills a story.",
                    solution: "Built each premise around the idea, so readers live through it instead of being told about it.",
                },
                {
                    problem: "The stories had to work for readers who don’t know computer science.",
                    solution: "Kept the technical idea under the surface: the story has to stand on its own.",
                },
            ],
        },
    },
];

// The projects on the site: every one not marked hidden. Everything that lists or links to projects
// starts from this, so hiding one takes it off the site in one step
export const VisibleProjects: Project[] = ProjectList.filter((project) => !project.hidden);

// Whether a project's page can be linked to: it's on the site, marked ready, and has a page. A link that leads
// to "page not found" is worse than no link at all
export function hasLivePage(project: Project): boolean {
    return Boolean(!project.hidden && project.ready && project.page);
}

// Whether a link goes somewhere: any link outside the project pages does; a project page only once
// it can be linked to
export function isLive(href: string): boolean {
    const path = href.match(/^\/portfolio\/(.+)$/)?.[1];
    return !path || VisibleProjects.some((project) => project.path === path && hasLivePage(project));
}
