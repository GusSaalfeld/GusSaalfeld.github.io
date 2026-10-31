import type { Role } from "@/app/types";

// The work history and education, newest first. Dates are years: "2023", or "2025–2026" for a span
// (an en dash). Kept close to the resume's wording, in the site's style: sentence case, the Oxford
// comma, and curly apostrophes (’). A role with points gets a full entry; one without is a single
// compact line, so the roles with writing or engineering stand out while the order stays by date.
// A link goes after the points, or at the end of a compact line: to a portfolio piece, say
export const WorkList: Role[] = [
    {
        title: "Barista",
        organization: "La Prima Espresso Company",
        dates: "2025–2026",
        link: { label: "See the training manual I wrote", href: "/portfolio/barista-training" },
    },
    {
        title: "Assistant store manager",
        organization: "Gaby et Jules",
        dates: "2024",
    },
    {
        title: "Voter registration",
        organization: "", // left out on purpose: the organization can read as partisan
        dates: "2024",
    },
    {
        title: "Assistant software engineer",
        organization: "Software Engineering Institute",
        dates: "2023",
        points: [
            "Upgraded a Python application the US government uses to report cyberattacks: added new features, tested its security, deployed it, then coordinated the cut-over with our government client.",
            "Rewrote the team’s wiki to be clear, concise, and more detailed, and gave writing support to team members.",
            "Broke each task down into Jira tickets on a timeline, each with its dependencies, the steps to complete it, and a definition of done.",
        ],
    },
    {
        title: "SURF research grant",
        organization: "Carnegie Mellon University",
        dates: "2022",
        points: [
            "Addressed the lack of computer science fiction by writing a short story that dramatizes the computer science concept of abstraction, showing readers how it shapes our world.",
        ],
        link: { label: "Watch a summary of my research", href: "https://www.youtube.com/watch?v=hb2u9kJPV4E" },
    },
    {
        title: "Technical consultant",
        organization: "CMU Dietrich Office of Diversity, Equity, and Inclusion",
        dates: "2022",
        points: [
            "Built a dashboard for DEI events that streamlines data collection, standardizes data, and uses graphs to inform decision-making.",
            "Conducted 30+ stakeholder interviews and user tests, and wrote handover documentation and a product ownership manual.",
        ],
        link: { label: "See the project", href: "/portfolio/capstone-project" },
    },
    {
        title: "Video game software engineer",
        organization: "Ichigoichie Games",
        dates: "2020",
        points: [
            "Led the project to pass QA certification for the Xbox, Steam, and Nintendo stores: wrote a QA checklist, fixed bugs, and set up an automated test server with Jenkins. We passed every certification on the first try, ahead of schedule.",
            "Added multi-platform support to the game Hexagroove by extending its original C# code, working with the studio in Stockholm.",
            "Logged bugs as GitHub issues and assigned them to the team.",
            "Wrote summaries of platforms for the wiki and presented findings to the team.",
        ],
    },
];

// The degree leads the education section, set apart from the courses taken since
export const Degree: Role = {
    title: "B.S., double major in Information Systems and Creative Writing",
    organization: "Carnegie Mellon University",
    dates: "2022",
    points: [
        "Including Technical Writing and Software Documentation.",
    ],
};

// Courses since the degree, newest first
export const CourseList: Role[] = [
    {
        title: "Professional and Technical Writing (graduate course)",
        organization: "Carnegie Mellon University",
        dates: "2026",
    },
    {
        title: "AI and Ethics",
        organization: "London School of Economics",
        dates: "2024",
    },
];
