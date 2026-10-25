export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string,
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
  year: string,      // when it was made, as shown: "2026", or a span like "2025–present". "" for none
  format: string,    // what it is and who it's for, as one short phrase: "Training manual for new baristas". "" for none
};
