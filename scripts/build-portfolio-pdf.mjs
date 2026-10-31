// Builds public/Augustus-Saalfeld-portfolio.pdf, the "Download portfolio (PDF)" file, from the
// writing samples in public/samples/, so each sample is kept in one place. Runs before every build
// (npm run build): a contents page, then each ready project's sample, in Selected work's order.
// A hidden project is left out.
// To change a piece, replace its file in public/samples/; to add one, give its project a page with
// a sample. Run it by hand with: npm run portfolio-pdf
import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// The project list itself, so the order and titles can't drift from the site (Node strips the types)
import { VisibleProjects } from "../src/app/data/projects.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "Augustus-Saalfeld-portfolio.pdf");

const samples = VisibleProjects.filter((p) => p.ready && p.page?.sample?.href.endsWith(".pdf")).map((p) => ({
  title: p.title,
  file: path.join(ROOT, "public", p.page.sample.href),
}));
if (!samples.length) throw new Error("No ready project has a PDF sample, so there's no portfolio to build");

const portfolio = await PDFDocument.create();
portfolio.setTitle("Augustus Saalfeld, writing samples");
portfolio.setAuthor("Augustus Saalfeld");

// The contents page goes first, so samples start on page 2
const contents = portfolio.addPage([612, 792]); // US letter, like the samples
let page = 2;
const entries = [];
for (const sample of samples) {
  const doc = await PDFDocument.load(fs.readFileSync(sample.file));
  const pages = await portfolio.copyPages(doc, doc.getPageIndices());
  pages.forEach((p) => portfolio.addPage(p));
  entries.push({ title: sample.title, page });
  page += pages.length;
}

// The site's ink and muted greens; the standard Helvetica, which every PDF reader has
const ink = rgb(0x1d / 255, 0x2a / 255, 0x22 / 255);
const muted = rgb(0x56 / 255, 0x63 / 255, 0x5b / 255);
const bold = await portfolio.embedFont(StandardFonts.HelveticaBold);
const regular = await portfolio.embedFont(StandardFonts.Helvetica);
const left = 72, right = 612 - 72;
let y = 792 - 96;
contents.drawText("Augustus Saalfeld", { x: left, y, size: 28, font: bold, color: ink });
y -= 30;
contents.drawText("Writing samples", { x: left, y, size: 16, font: regular, color: muted });
y -= 60;
for (const [i, entry] of entries.entries()) {
  const number = String(entry.page);
  contents.drawText(`${i + 1}.  ${entry.title}`, { x: left, y, size: 13, font: regular, color: ink, maxWidth: right - left - 48 });
  contents.drawText(number, { x: right - regular.widthOfTextAtSize(number, 13), y, size: 13, font: regular, color: muted });
  y -= 26;
}
contents.drawText("augustus-saalfeld.com", { x: left, y: 72, size: 11, font: regular, color: muted });

fs.writeFileSync(OUT, await portfolio.save());
console.log(`Built ${path.relative(ROOT, OUT)}: ${entries.length} samples, ${page - 1} pages`);
