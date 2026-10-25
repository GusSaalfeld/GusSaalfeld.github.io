import "./globals.css";
import { Atkinson_Hyperlegible_Mono, Pixelify_Sans } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";

// Pixelify Sans, a sturdy pixel face, for names, headings and the menu, like an 80s RPG
// such as The Bard's Tale. Atkinson Hyperlegible Mono, a terminal face built for legibility, for reading
const pixelify = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify" });
const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], variable: "--font-atkinson-mono" });

// The slime at the Commodore 64's 320 pixel width, upscaled blocky. Halving the default
// resolution halves the distances and quarters the agents, so the pattern keeps its scale
const slimeSettings = {
  respawnRate: 0.05,
  warmupSeconds: 3,
  trailResolution: 320,
  numAgents: 10000,
  displayFilter: "pixelated" as const,
  // Five greens, like moss on the pier: a dark moss background (#1f2e16, matching --background
  // in globals.css), then the trail in four even steps up to lichen green (#9cc25a)
  backgroundColour: [0.12, 0.18, 0.086] as [number, number, number],
  colourSteps: 4,
  agent: {
    moveSpeed: 3.5, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 6, sensorSize: 0,
    colour: [0.61, 0.76, 0.35] as [number, number, number],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixelify.variable} ${atkinsonMono.variable}`}>
      <body>
        <SlimeCanvas settings={slimeSettings} />
        <Header />
        <main className="px-4 md:px-16 py-8 gap-8 flex flex-col">
          {children}   {/* the current page renders here */}
        </main>
      </body>
    </html>
  );
}
