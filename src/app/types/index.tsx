export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string, // one sentence: [format] for [audience], and what it achieved. About 15 to 20 words
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  genre: string,     // the kind of writing, in sentence case: "Technical writing". Leads the left column
  ready?: boolean,   // true once its page at /portfolio/<path> is finished. Until then nothing links to it
  page?: ProjectPage, // the project's own page. Without one, there's no page at all
};

// A project's own page: the title, date, and links back and to its neighbours (a writing sample
// adds its purpose and audience); a one-sentence summary; a picture; three outcomes; then the
// story, as situation, task, action, and result
export type ProjectPage = {
  kind: "writing" | "other",  // a writing sample offers the piece itself to read; other work doesn't
  date: string,               // as shown under the title: "2026", "Spring 2022"
  purpose?: string,           // writing samples: what the piece is for, one short sentence
  audience?: string,          // writing samples: who it's written for, one short sentence
  summary: string,            // one sentence: what it is and why it mattered. The page's lede
  image: { src: string, alt: string }, // shown across the column. alt says what the picture shows
  outcomes: string[],         // three results, each one sentence: what changed, for whom
  star: { situation: string, task: string, action: string, result: string },
  sample?: { label: string, href: string }, // the piece itself, to download: a PDF in public/samples/. Say what
                                            // downloads and its format: "Download the manual (PDF)"
};

// A job, a degree, or an award, as a row on the Experience page
export type Role = {
  title: string,        // the role, or the degree or award, in sentence case: "Assistant software engineer"
  organization: string, // where
  dates: string,        // years, as shown: "2023", or "2025–2026" for a span (an en dash). "" for none yet
  points?: string[],    // what you did and what came of it, one sentence or two each. None makes a compact line
  link?: { label: string, href: string }, // somewhere to see more: a portfolio piece, a video
};
