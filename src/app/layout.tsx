import "./globals.css";
import { Atkinson_Hyperlegible_Mono, Workbench } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/app/components/header";
import FontToggle from "@/app/components/font-toggle";
import SlimeCanvas from "@/app/components/slime-canvas";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Pixel font candidates for names, headings and the menu, switched with FontToggle (see globals.css):
// Workbench, after the Amiga's interface font; IBM VGA 8x16, the DOS PC's own (CC BY-SA 4.0, VileR,
// int10h.org: needs a credit on the site if chosen); and Departure Mono (SIL OFL). The last two aren't
// on Google Fonts, so they're bundled in ./fonts with their licenses.
// Atkinson Hyperlegible Mono, a terminal face built for legibility, for reading
const workbench = Workbench({ subsets: ["latin"], variable: "--font-workbench" });
const ibmVga = localFont({ src: "./fonts/WebPlus_IBM_VGA_8x16.woff", variable: "--font-ibm-vga" });
const departureMono = localFont({ src: "./fonts/DepartureMono-Regular.woff2", variable: "--font-departure" });
const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], variable: "--font-atkinson-mono" });

// The slime at the Commodore 64's 320 pixel width, upscaled blocky. Halving the default
// resolution halves the distances and quarters the agents, so the pattern keeps its scale
const slimeSettings = {
  respawnRate: 0.05,
  warmupSeconds: 3,
  trailResolution: 320,
  numAgents: 10000,
  displayFilter: "pixelated" as const,
  // Colours from the hero photo. The background is the water's hue at a darker slate (#4d7999,
  // matching --background in globals.css). Two species of slime compete over it, each in the
  // photo's greens, faint to strong
  backgroundColour: [0.302, 0.475, 0.6] as RGB,
  speciesPalettes: [
    // Seaweed, a light network: olive from the flats (#848947) to sunlit algae (#aec29d)
    [[0.518, 0.537, 0.278], [0.682, 0.761, 0.616]],
    // Moss, a dark network: mid moss (#405f28) to the shadowed moss on the pilings (#132c0c)
    [[0.251, 0.373, 0.157], [0.075, 0.173, 0.047]],
  ] as RGB[][],
  colourSteps: 6, // a multiple of the 2 colours per species, so every colour gets its own band
  // Purple ochre stars on top, as on the Oregon coast, edged in the panels' slime brown.
  // They sit only in the margins beside the content (see data-slime-cover)
  creatures: {
    starfish: 2, starfishSize: 9,
    starfishColour: [0.71, 0.34, 0.5] as RGB,
    outlineColour: [0.18, 0.12, 0.06] as RGB,
  },
  agent: {
    moveSpeed: 3.5, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 6, sensorSize: 0,
    colour: [0.886, 0.957, 0.98] as RGB, // only shows when drawing agents as dots
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[workbench, ibmVga, departureMono, atkinsonMono].map((font) => font.variable).join(" ")}>
      <body>
        <SlimeCanvas settings={slimeSettings} />
        <Header />
        <main className="px-4 md:px-16 py-8 gap-8 flex flex-col">
          {children}   {/* the current page renders here */}
        </main>
        <FontToggle />
      </body>
    </html>
  );
}
