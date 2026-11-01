import type { Role } from "@/app/types";

// The tools, grouped so a recruiter can scan for them. Only what you'd use in an interview task.
// Plain commas, one tool each, no "and": these are lists to scan, not sentences
export const ToolGroups: { name: string, tools: string }[] = [
    { name: "Writing and publishing", tools: "Oxygen XML, Confluence, Markdown, Git, GitHub" },
    { name: "Programming", tools: "Python, C#, JavaScript, React" },
    { name: "Build and deploy", tools: "Docker, Jenkins, GitHub Actions" },
    { name: "Project tracking", tools: "Jira, GitHub Issues" },
    { name: "AI", tools: "Claude Code" },
];

// The work history and education. Dates are years: "2023", or "2025–2026" for a span (an en
// dash). Kept close to the resume's wording, in the site's style: sentence case, the Oxford comma,
// and curly apostrophes (’). A role with points gets a full entry; one without is a single compact
// line. A link goes after the points, or at the end of a compact line: to a portfolio piece, say.
// Within a role, the writing comes first: these pages are read for writing jobs. At most three points
// a role, so the page stays short enough to skim

// All the work on one timeline, newest first, so the years read as continuous. The roles with writing
// or engineering are full entries and stand out by size; the others are compact lines
export const WorkList: Role[] = [
    {
        // Not a job: the writing done since the last one, so the page shows what's recent
        title: "Independent writing projects",
        organization: "",
        dates: "2026",
        points: [
            "Wrote a beginner’s explainer on what happens when you load a website, a how-to guide to growing oyster mushrooms at home, and UX writing for a course export feature in Canvas.",
        ],
        link: { label: "See the portfolio", href: "/portfolio" },
    },
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
            "Rewrote the team’s Confluence wiki, including its onboarding process for new members, which the team still uses today, and gave writing support to team members.",
            "Turned each goal I was given, such as migrating a server, into a timeline of Jira tickets with step-by-step instructions and a definition of done.",
            "Upgraded a Python application the US government uses to report cyberattacks: added new features, tested its security, deployed it, then coordinated the cut-over with our government client.",
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
            "Conducted 30+ stakeholder interviews and user tests, and wrote handover documentation and a product ownership manual.",
            "With two teammates, built a feedback system for DEI events that streamlines data collection, standardizes data, and uses graphs to inform decision-making. The department still uses it today.",
        ],
        link: { label: "See the project", href: "/portfolio/capstone-project" },
    },
    {
        title: "Video game software engineer",
        organization: "Ichigoichie Games",
        dates: "2020",
        points: [
            "Researched what Xbox and Steam each require of a game, summarized it in the team wiki, and presented it to the team.",
            "Led the project to pass QA certification for the Xbox, Steam, and Nintendo stores: wrote a QA checklist, logged bugs as GitHub issues for the team, and set up an automated test server with Jenkins. We passed every certification on the first try, ahead of schedule.",
            "Ported the Nintendo game Hexagroove to Xbox and Steam, refactoring its single-platform C# systems so they work on every platform, with the studio in Stockholm.",
        ],
    },
];

// Newest first, on the same timeline as the work. The degree is a full entry, so it's set like a job
// and outranks the courses, which are compact lines
export const EducationList: Role[] = [
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
    {
        title: "B.S., double major in Information Systems and Creative Writing",
        organization: "Carnegie Mellon University",
        dates: "2022",
        points: [
            "Including courses in Technical Writing and Software Documentation.",
        ],
    },
];
