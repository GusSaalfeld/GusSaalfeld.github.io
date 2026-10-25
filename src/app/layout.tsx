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
  // Colours sampled from the hero photo: bare ground is mud (#7e724c, matching --background
  // in globals.css). The trail's faint edges are a deep shadow, the dark green on the pier
  // pilings (#132410), then it passes through seaweed (#848947) and water (#adcfe6)
  // to ripples (#e2f4fa) where it's strongest
  backgroundColour: [0.494, 0.447, 0.298] as RGB,
  trailPalette: [
    [0.075, 0.141, 0.063],
    [0.518, 0.537, 0.278],
    [0.678, 0.812, 0.902],
    [0.886, 0.957, 0.98],
  ] as RGB[],
  colourSteps: 4, // one band per colour: steps land exactly on the 5 stops (background + 4 trail colours)
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
