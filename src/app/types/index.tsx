export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string, // one sentence: [format] for [audience], and what it achieved. About 15 to 20 words
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  year: string,      // when it was made, as shown: "2026", or "2025–present" for ongoing work (an en dash). "" for none
  genre: string,     // the kind of writing, in sentence case: "Technical writing". Leads the left column, above the year
};
