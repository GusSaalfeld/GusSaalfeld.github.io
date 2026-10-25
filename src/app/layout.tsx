import "./globals.css";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Archivo, heavy and wide, for the name and headings; Source Serif 4, a reading face, for everything else
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], axes: ["opsz"], variable: "--font-source-serif" });

// The slime only shows in the two banners around the content (SlimeBanner). Quiet, like an ink
// drawing: green veins on a sage a shade darker than the paper, fine-grained from the higher resolution
const slimeSettings = {
  trailResolution: 960,
  numAgents: 70000,
  respawnRate: 0.05,
  warmupSeconds: 3,
  backgroundColour: [0.863, 0.894, 0.855] as RGB, // pale sage (#dce4da)
  // #c3d0bf to #a3b89d to #7f9a78: darkest where the veins are thickest, but never far from the paper
  speciesPalettes: [[[0.765, 0.816, 0.749], [0.639, 0.722, 0.616], [0.498, 0.604, 0.471]]] as RGB[][],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      {/* At least a screen tall, so a page's last element can grow to the bottom of the screen */}
      <body className="flex min-h-svh flex-col">
        <SlimeCanvas settings={slimeSettings} />
        <Header />
        <main className="flex grow flex-col">
          {children}   {/* the current page renders here */}
        </main>
      </body>
    </html>
  );
}
