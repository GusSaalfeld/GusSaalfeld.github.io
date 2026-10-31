import type { Role } from "@/app/types";

// The work history and education, newest first, from the resume. Kept close to its wording, in the
// site's style: sentence case, the Oxford comma, and curly apostrophes (’)
export const WorkList: Role[] = [
    {
        title: "Barista",
        organization: "La Prima Espresso Company",
        dates: "Jan 2025–present",
        place: "Pittsburgh, PA",
        points: [
            "Wrote a training manual on how to serve drinks and use the espresso machine.",
        ],
    },
    {
        title: "Assistant software engineer",
        organization: "Software Engineering Institute",
        dates: "Jun 2023–Feb 2024",
        place: "Pittsburgh, PA",
        points: [
            "Upgraded a Python application the US government uses to report cyberattacks: added new features, tested its security, deployed it, then coordinated the cut-over with our government client.",
            "Rewrote the team’s wiki to be clear, concise, and more detailed, and gave writing support to team members.",
        ],
    },
    {
        title: "Technical consultant",
        organization: "CMU Dietrich Office of Diversity, Equity, and Inclusion",
        dates: "Spring 2022",
        place: "Pittsburgh, PA",
        points: [
            "Built a dashboard for DEI events that streamlines data collection, standardizes data, and uses graphs to inform decision-making.",
            "Conducted 30+ stakeholder interviews and user tests, and wrote handover documentation and a product ownership manual.",
        ],
    },
    {
        title: "Video game software engineer",
        organization: "Ichigoichie Games",
        dates: "Summer 2020",
        place: "Stockholm, Sweden",
        points: [
            "Led the project to pass QA certification for the Xbox, Steam, and Nintendo stores: wrote a QA checklist, fixed bugs, and set up an automated test server with Jenkins. We passed every certification on the first try, ahead of schedule.",
            "Added multi-platform support to the game Hexagroove by extending its original C# code.",
            "Wrote summaries of platforms for the wiki and presented findings to the team.",
        ],
    },
];

export const EducationList: Role[] = [
    {
        title: "B.S. in Information Systems, major in Creative Writing",
        organization: "Carnegie Mellon University",
        dates: "May 2022",
        place: "Pittsburgh, PA",
        points: [
            "Coursework included Technical Writing, Software Documentation, Introduction to Computer Systems, Application Design and Development, Website Design and Development, and Principles of Software Construction.",
        ],
    },
    {
        title: "SURF Creative Writing Fellowship",
        organization: "Carnegie Mellon University",
        dates: "Summer 2021",
        place: "Pittsburgh, PA",
        points: [
            "Addressed the lack of computer science fiction by writing a short story that dramatizes the computer science concept of abstraction, showing readers how it shapes our world.",
        ],
        link: { label: "Watch a summary of my research", href: "https://www.youtube.com/watch?v=hb2u9kJPV4E" },
    },
];
