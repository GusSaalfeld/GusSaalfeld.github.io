export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string, // one sentence: [format] for [audience], and what it achieved. About 15 to 20 words
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  genre: string,     // the kind of writing, in sentence case: "Technical writing". Leads the left column
};

// A job, a degree, or an award, as a row on the Experience page
export type Role = {
  title: string,        // the role, or the degree or award, in sentence case: "Assistant software engineer"
  organization: string, // where
  dates: string,        // years, as shown: "2023", or "2025–2026" for a span (an en dash). "" for none yet
  place?: string,       // city, and state or country: "Pittsburgh, PA"
  points?: string[],    // what you did and what came of it, one sentence or two each
  link?: { label: string, href: string }, // somewhere to see more, shown after the points
};
