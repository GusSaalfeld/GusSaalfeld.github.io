import "./globals.css";
import { Atkinson_Hyperlegible_Mono, Chakra_Petch, Kode_Mono } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/app/components/header";
import FontToggle from "@/app/components/font-toggle";
import SlimeCanvas from "@/app/components/slime-canvas";

// Three candidates for names, headings and the menu, switched with FontToggle (see globals.css):
// Kode Mono, Departure Mono (a refined pixel face, not on Google Fonts, so it's bundled), and Chakra Petch.
// Atkinson Hyperlegible Mono, a terminal face built for legibility, for reading
const kodeMono = Kode_Mono({ subsets: ["latin"], variable: "--font-kode" });
const departureMono = localFont({ src: "./fonts/DepartureMono-Regular.woff2", variable: "--font-departure" });
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-chakra" });
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
    <html lang="en" className={`${kodeMono.variable} ${departureMono.variable} ${chakraPetch.variable} ${atkinsonMono.variable}`}>
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
