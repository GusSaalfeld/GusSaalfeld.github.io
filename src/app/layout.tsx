import "./globals.css";
import { Atkinson_Hyperlegible_Mono, Workbench } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/app/components/header";
import FontToggle from "@/app/components/font-toggle";
import SlimeCanvas from "@/app/components/slime-canvas";

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
  // Greens, like moss on the pier: a dark moss background (#1f2e16, matching --background
  // in globals.css), then the trail in even steps up to lichen green (#9cc25a)
  backgroundColour: [0.12, 0.18, 0.086] as [number, number, number],
  colourSteps: 0,
  agent: {
    moveSpeed: 3.5, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 6, sensorSize: 0,
    colour: [0.61, 0.76, 0.35] as [number, number, number],
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
