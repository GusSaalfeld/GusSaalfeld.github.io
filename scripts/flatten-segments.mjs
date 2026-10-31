// Runs after every build (npm run build). The static export writes each page's prefetch data in
// folders, out/portfolio/__next.portfolio/__PAGE__.txt, but the browser asks for it as one flat
// name, /portfolio/__next.portfolio.__PAGE__.txt. On GitHub Pages every prefetch then 404s: pages
// still open, but each hover or scroll logs errors and fetches the page again. This copies each file
// to the flat name too, so prefetching works
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(dir, full);
    else walk(full);
  }
}

// Every file under a __next.* folder, copied into the folder holding it, its path joined with dots
function flatten(base, folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile()) continue;
    const file = path.join(entry.parentPath ?? entry.path, entry.name);
    const flat = path.relative(base, file).split(path.sep).join(".");
    fs.copyFileSync(file, path.join(base, flat));
    copied++;
  }
}

walk(OUT);
console.log(`Flattened ${copied} prefetch files in out/`);
