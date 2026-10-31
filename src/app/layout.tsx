import "./globals.css";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Header from "@/app/components/header";
import Contact from "@/app/components/contact";
import SlimeBanner from "@/app/components/slime-banner";
import SlimeCanvas from "@/app/components/slime-canvas";
import type { Metadata } from "next";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Archivo, heavy and wide, for the name and headings; Source Serif 4, a reading face, for everything else
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], axes: ["opsz"], variable: "--font-source-serif" });

// The slime only shows in the two banners around the content (SlimeBanner). Quiet, like an ink
// drawing: green veins on a sage a shade darker than the paper, fine-grained from the higher
// resolution, and kept crisp by a slow spread (diffuseRate, 3 by default)
const slimeSettings = {
  trailResolution: 960,
  diffuseRate: 1.2,
  numAgents: 70000,
  respawnRate: 0.05,
  warmupSeconds: 3,
  backgroundColour: [0.863, 0.894, 0.855] as RGB, // pale sage (#dce4da)
  // #c3d0bf to #a3b89d to #7f9a78: darkest where the veins are thickest, but never far from the paper
  speciesPalettes: [[[0.765, 0.816, 0.749], [0.639, 0.722, 0.616], [0.498, 0.604, 0.471]]] as RGB[][],
};

// The browser tab's title, and what a shared link shows. A page sets its own title with
// metadata.title, and the template adds the name. The tab icon (icon.png, apple-icon.png,
// favicon.ico) and the preview card (opengraph-image.png) are files beside this one, which Next
// links in itself; metadataBase makes the card's address absolute, as link previews need
const description =
  "Programmer turned technical writer. I write documentation that helps people use software, and articles that help research reach a wider audience.";

export const metadata: Metadata = {
  metadataBase: new URL("https://augustus-saalfeld.com"),
  title: {
    default: "Augustus Saalfeld, technical and science writer",
    template: "%s · Augustus Saalfeld",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Augustus Saalfeld",
    title: "Augustus Saalfeld, technical and science writer",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      {/* At least a screen tall, so a page's last element can grow to the bottom of the screen */}
      <body className="flex min-h-svh flex-col">
        <SlimeCanvas settings={slimeSettings} />
        {/* For keyboard users: the first stop on every page, hidden until it has focus, so a Tab
            then Enter skips the navigation: the page scrolls to sit just under the navbar, and the
            next Tab goes to the page's first link. It shows the site's focus ring, nothing more */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-quiet-paper focus:px-4 focus:py-3 focus:font-sans focus:font-semibold focus:text-quiet-ink"
        >
          Skip to content
        </a>
        <Header />
        {/* Every page sits between two slime banners, built from paper bands (Band), which space
            themselves. main has no background, so the name's letters can reach the slime */}
        <SlimeBanner masthead />
        <main id="main" tabIndex={-1} className="flex flex-col scroll-mt-[7.5rem] md:scroll-mt-[4.5rem]">
          {children}   {/* the current page renders here */}
        </main>
        {/* Every page signs off with the email address, then the closing slime */}
        <Contact />
        <SlimeBanner last />
      </body>
    </html>
  );
}
