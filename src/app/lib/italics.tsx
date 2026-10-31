// Text with *asterisks* around words that should be italic, such as a book's title, as in the
// project data. Splitting on the pattern alternates plain and italic runs: the odd pieces are italic
export function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/).map((piece, i) => (i % 2 ? <em key={i}>{piece}</em> : piece));
}

// The same text with the asterisks dropped, for places that can't show italics, like a page description
export function plain(text: string) {
  return text.replace(/\*([^*]+)\*/g, "$1");
}
