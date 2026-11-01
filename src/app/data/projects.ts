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
        title: "Designing a feedback system for Dietrich College’s DEI office",
        hoverDescription: "A form and Tableau dashboards for Dietrich College’s DEI office, built with two teammates through stakeholder interviews and user testing, and still in use today.",
        thumbnail: "/samples/dei/previews/thumb.png", // the top of the overview dashboard
        genre: "UX research and writing",
        // DRAFT: from the team's final report and handover. Check each line, especially what's said to be
        // mine. Documents are in public/samples/dei/, with participants' names and staff emails redacted
        page: {
            kind: "other",
            date: "Spring 2022",
            summary: "For my capstone project, I helped the Dietrich DEI office improve how it gathered feedback on volunteer-led events. My team designed a form, spreadsheet, and Tableau dashboards to collect, store, and graph data on DEI events across Dietrich College.",
            audience: "The associate dean for DEI, and the department volunteers who run DEI events and report on them.",
            builtWith: "Google Forms, Google Sheets, Tableau",
            role: "Documentation manager. I wrote many of our reports and the handover documentation, and helped design the form and revise it after each round of user testing. I also co-wrote the testing script and put the form on the office’s website.",
            team: "Gloria Moon, project manager, and Neha Choudhari, client relationship manager. Together they also built the Tableau dashboards.",
            teamPhoto: {
                src: "/samples/dei/team.jpg",
                alt: "Augustus, Neha, Ayana, and Gloria standing together in a doorway, smiling",
                caption: "Our team with Ayana Ledford, associate dean for DEI, at the end of the project.",
            },
            sample: { label: "Download the reports and handover guide (PDF)", href: "/samples/dei/reports-and-handover-guide.pdf" },
            video: {
                src: "/samples/dei/pitch-video.mp4",
                poster: "/samples/dei/pitch-video-poster.jpg",
                captions: "/samples/dei/pitch-video.vtt",
                caption: "Our one-minute pitch video: Neha walks through the form.",
            },
            outcomesImage: {
                src: "/samples/dei/previews/website-form-box.png",
                width: 601,
                height: 543,
                alt: "A box on the DEI office’s web page titled “DEI Post-Event Data Collection Form”, saying it takes no more than 5 minutes, with a link to complete the form",
                caption: "The form’s box on the office’s website at handover.",
                href: "/samples/dei/website-integration.png",
            },
            documents: [
                { group: "Handed over to the office", name: "Executive summary", href: "/samples/dei/executive-summary.pdf", description: "The project on two pages. PDF." },
                { group: "Handed over to the office", name: "Final report", href: "/samples/dei/final-report.pdf", description: "What the office needed, what we built, and what we recommend next, with our sketches, flowchart, and dashboards. 14 pages, PDF." },
                { group: "Handed over to the office", name: "Handover guide", href: "/samples/dei/handover-guide.pdf", description: "How to update the form, who owns each part of the system, and how to extend it. 5 pages, PDF." },
                {
                    group: "Handed over to the office",
                    name: "Data visualization dashboards",
                    description: "Events and attendance across the college, by department, and by goal. On Tableau Public, with test data.",
                    links: [
                        { label: "Overall", href: "https://public.tableau.com/app/profile/gloria.moon2530/viz/final_dashboard_1_16513499829850/Dashboard1" },
                        { label: "Departments", href: "https://public.tableau.com/app/profile/gloria.moon2530/viz/final_dashboard_2_16513500162100/Dashboard2" },
                        { label: "Goals", href: "https://public.tableau.com/app/profile/gloria.moon2530/viz/final_dashboard_3/Dashboard3" },
                    ],
                },
                { group: "Handed over to the office", name: "Research findings", href: "/samples/dei/research-findings.pdf", description: "The four pain points our interviews found, and who’s who in the college’s DEI work, for whoever works with the office next. 3 pages, PDF." },
                { group: "Handed over to the office", name: "User testing script", href: "/samples/dei/user-testing-script.pdf", description: "A script for testing future changes to the form with the people who fill it in. 1 page, PDF." },
                { group: "Research, testing, and progress reports", name: "Client context analysis", href: "/samples/dei/client-context-analysis.pdf", description: "Our first look at the office and its work, with five user stories. 5 pages, PDF." },
                { group: "Research, testing, and progress reports", name: "Revised proposal", href: "/samples/dei/revised-proposal.pdf", description: "The problem we chose to solve, the solution we proposed, and the alternatives we ruled out. 17 pages, PDF." },
                { group: "Research, testing, and progress reports", name: "Strategic plan lessons", href: "/samples/dei/strategic-plan-lessons.pdf", description: "How the form’s data could support the goals in the college’s DEI strategic plan. 4 pages, PDF." },
                { group: "Research, testing, and progress reports", name: "Dashboard plan", href: "/samples/dei/dashboard-plan.pdf", description: "The questions each dashboard had to answer. 2 pages, PDF." },
                { group: "Research, testing, and progress reports", name: "User testing findings", href: "/samples/dei/user-testing-findings.pdf", description: "Two rounds of feedback on the form, and what we changed. 4 pages, PDF." },
                { group: "Research, testing, and progress reports", name: "MVP presentation", href: "/samples/dei/mvp-presentation.pdf", description: "The first working version, presented to the class. 9 slides, PDF." },
                { group: "Research, testing, and progress reports", name: "Final presentation", href: "/samples/dei/final-presentation.pdf", description: "The finished system and what it changed for the office. 15 slides, PDF." },
                { group: "Research, testing, and progress reports", name: "Sprint reports", href: "/samples/dei/sprint-reports.pdf", description: "Nine reports, February to April: what we did, who did it, and what came next. 40 pages, PDF." },
            ],
            outcomes: [
                "The office still uses the form to collect data on DEI events from across the college.",
                "Organizers report an event in three to five minutes, instead of answering the associate dean’s emails one by one.",
                "Every response lands in one spreadsheet in a standard format, and three dashboards graph it by department and goal, so events can be compared.",
            ],
            challenges: [
                {
                    problem: "DEI work is spread across the college’s departments and run by volunteers, and each reported its events its own way, if at all.",
                    solution: "We interviewed stakeholders across the college to find the problem worth solving: getting event data into one place. Then we built on the Google tools staff already used, rather than a database they’d have to learn and maintain.",
                },
                {
                    problem: "A form people found confusing wouldn’t get filled in.",
                    solution: "We tested it in two rounds, with people thinking aloud as they reported a real event, and changed it after each: clearer questions, a description of each goal, and a note that it takes three to five minutes.",
                },
                {
                    problem: "Volunteers would stop filling in the form once we left.",
                    solution: "With the associate dean, we named one person in each department to answer for it, with a monthly reminder and awards for departments that report. I wrote down who does what in the handover guide.",
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
            previews: [{ src: "/samples/previews/barista-training-manual-1.png", page: 1, alt: "Page 1 of the manual" }, { src: "/samples/previews/barista-training-manual-2.png", page: 2, alt: "Page 2 of the manual" }],
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
            previews: [{ src: "/samples/previews/what-happens-when-you-type-youtube-com-1.png", page: 1, alt: "Page 1 of the explainer" }, { src: "/samples/previews/what-happens-when-you-type-youtube-com-2.png", page: 2, alt: "Page 2 of the explainer" }],
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
        hoverDescription: "Research, a feature announcement, and microcopy for a proposed Canvas feature that lets students export a course to their own device.",
        thumbnail: "/samples/previews/canvas-course-export-thumb.png", // the export form mockup
        genre: "UX writing",
        page: {
            kind: "writing",
            date: "2026",
            summary: "Research, a feature announcement, and microcopy for a proposed Canvas feature that lets students export a whole course to their own device or cloud storage.",
            purpose: "Propose a feature that lets students keep their course content, and write what it takes to launch it: the announcement and the interface text.",
            audience: "University students and alumni who use Canvas.",
            format: "7 pages, PDF",
            previews: [{ src: "/samples/previews/canvas-course-export-1.png", page: 6, alt: "The export course form mockup, with its checkboxes and destination choices" }, { src: "/samples/previews/canvas-course-export-2.png", page: 1, alt: "Page 1 of the project: its title and executive summary" }],
            // Each part opens the PDF at its page
            documents: [
                { name: "Research", description: "Personas, an empathy map, and an interview, turned into pain points and “how might we” statements, then a prototype tested with classmates.", href: "/samples/canvas-course-export.pdf#page=1" },
                { name: "Feature announcement", description: "The launch post that tells students what the feature does, how to use it, and why it’s worth trying.", href: "/samples/canvas-course-export.pdf#page=3" },
                { name: "Microcopy", description: "The tooltip, form, progress, success and error messages, and legal notice for the export flow.", href: "/samples/canvas-course-export.pdf#page=4" },
                { name: "UX mockups", description: "The export button on a course homepage, the export form, the download in progress, and the success message.", href: "/samples/canvas-course-export.pdf#page=5" },
            ],
            outcomes: [
                "A feature grounded in user research, from interviews and personas to a prototype tested with classmates.",
                "An announcement built on the genre’s four moves, modeled on announcements from Spotify, Ticketmaster, and Goodreads.",
                "Microcopy for the whole export flow that stays consistent: every message names the course and destination the student chose.",
            ],
            challenges: [
                {
                    problem: "Canvas’s interface is already cluttered, so a new feature could go unnoticed.",
                    solution: "Wrote a two-sentence tooltip for the export button that says what it does and how, and an announcement that points students to it.",
                },
                {
                    problem: "Downloading a course file by file takes too long to be worth it.",
                    solution: "Designed the export as one button and a short form, so a whole course downloads in as few as five clicks.",
                },
                {
                    problem: "Sharing downloaded course content can be illegal, but a stern warning puts people off.",
                    solution: "Wrote a short legal notice that warns plainly without sounding restrictive, with a link for more information.",
                },
            ],
            sample: { label: "Download the project (PDF)", href: "/samples/canvas-course-export.pdf" },
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
            previews: [{ src: "/samples/previews/growing-oyster-mushrooms-at-home-1.png", page: 1, alt: "Page 1 of the guide" }, { src: "/samples/previews/growing-oyster-mushrooms-at-home-2.png", page: 2, alt: "Page 2 of the guide" }],
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
