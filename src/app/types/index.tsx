export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string, // one sentence: [format] for [audience], and what it achieved. About 15 to 20 words
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  genre: string,     // the kind of writing, in sentence case: "Technical writing". Leads the left column
  ready?: boolean,   // true to link to its page at /portfolio/<path>. Links appear once it has a page too
  hidden?: boolean,  // true to take it off the site entirely: out of Selected work, no page, no links to
                     // it, and out of the portfolio PDF. For work in progress, or to tailor the site to a job
  page?: ProjectPage, // the project's own page. Without one, there's no page at all
};

// A project's own page: back to the portfolio; the title and date; a one-sentence summary with the
// piece to download; what it's for, who for, and its format; previews of the piece itself; three
// outcomes; three problems and how I solved them; then the previous and next pages of its kind
export type ProjectPage = {
  kind: "writing" | "other",  // a writing sample shows its purpose and audience; other work leaves them out
  date: string,               // as shown under the title: "2026", "Spring 2022"
  summary: string,            // one sentence on what it is: the form, the length, the subject
  purpose?: string,           // what the piece is for, one short sentence
  audience?: string,          // who it's written for, one short sentence
  format?: string,            // its form and length: "7 pages, PDF"
  builtWith?: string,         // other work: the tools it's made with, "Proxmox, Docker"
  services?: { name: string, role: string }[], // other work that runs things: each app, and what it's for
  role?: string,              // team work: my part in it, "Documentation manager"
  team?: string,              // team work: who else made it, by name. With a team, I delivered becomes we did
  teamPhoto?: { src: string, alt: string, caption: string }, // the team, shown beside its names
  video?: { src: string, poster: string, caption: string, captions?: string }, // a short video of the work,
                                            // beside the summary. Captions: a WebVTT file of what's said in it
  youtube?: { id: string, title: string, poster: string, caption: string, group?: string }, // or one on YouTube:
                                            // beside the summary, or with a group of documents when named
  previews?: { src: string, alt: string, page?: number }[], // pictures of the piece itself: pages, screens. Two,
                                            // side by side. With a page, it opens the sample at that page
  documentsHeading?: string,  // the heading over the documents, when "What I delivered" doesn't fit. Empty
                              // leaves it out, making each group's name a main heading
  groupIntros?: Record<string, string>, // a few sentences opening a group of documents, by its name  // the heading over the documents, when "What I delivered" doesn't fit
  documents?: { name: string, description: string, href?: string, group?: string, links?: { label: string, href: string }[] }[],
                                            // what the project produced, each with a line on what it is. One
                                            // with an href links to its file; one made of several files links
                                            // each by its label instead. Documents with a group are listed
                                            // under its name
  outcomes?: string[],        // three results, each one sentence: what changed, for whom. Creative work
                                            // can leave these and the challenges out
  outcomesImage?: { src: string, width: number, height: number, alt: string, caption: string, href?: string },
                                            // a picture that shows a result, under them. It opens href, the
                                            // whole picture it's cut from, or itself
  challenges?: { problem: string, solution: string }[], // three, each a sentence or two
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
