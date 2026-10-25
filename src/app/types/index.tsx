export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string, // one sentence: [format] for [audience], and what it achieved. About 15 to 20 words
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  year: string,      // when it was made, as shown: "2026", or "Since 2025" for ongoing work. "" for none
  category: string,  // the kind of writing, in sentence case: "Technical writing". Shown under the year
};
