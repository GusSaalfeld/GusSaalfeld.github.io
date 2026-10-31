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
// Within a role, the writing comes first: these pages are read for writing jobs

// Roles with writing or engineering, newest first. Recruiters scan job titles first, so these lead
export const WritingWork: Role[] = [
    {
        title: "Assistant software engineer",
        organization: "Software Engineering Institute",
        dates: "2023",
        points: [
            "Rewrote the team’s wiki to be clear, concise, and more detailed, and gave writing support to team members.",
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
            "Built a dashboard for DEI events that streamlines data collection, standardizes data, and uses graphs to inform decision-making.",
        ],
        link: { label: "See the project", href: "/portfolio/capstone-project" },
    },
    {
        title: "Video game software engineer",
        organization: "Ichigoichie Games",
        dates: "2020",
        points: [
            "Wrote summaries of platforms for the wiki and presented findings to the team.",
            "Led the project to pass QA certification for the Xbox, Steam, and Nintendo stores: wrote a QA checklist, fixed bugs, and set up an automated test server with Jenkins. We passed every certification on the first try, ahead of schedule.",
            "Logged bugs as GitHub issues and assigned them to the team.",
            "Added multi-platform support to the game Hexagroove by extending its original C# code, working with the studio in Stockholm.",
        ],
    },
];

// Other jobs, newest first, as compact lines
export const OtherWork: Role[] = [
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
            "Including Technical Writing and Software Documentation.",
        ],
    },
];
