export type Project = {
  path: string, // the URL segment under /portfolio
  title: string,
  hoverDescription: string,
  thumbnail: string, // a picture of the work, shown 4:3 beside it in the list. "" for none
};
