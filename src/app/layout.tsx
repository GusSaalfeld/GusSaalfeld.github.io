import "./globals.css";
import { Jacquarda_Bastarda_9, VT323 } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";

// VT323, a terminal face, for everything, and Jacquarda Bastarda 9, a pixel blackletter,
// for names and section titles: an 80s fantasy RPG like The Bard's Tale
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323" });
const bastarda = Jacquarda_Bastarda_9({ subsets: ["latin"], weight: "400", variable: "--font-bastarda" });

// The slime at the Commodore 64's 320 pixel width, upscaled blocky. Halving the default
// resolution halves the distances and quarters the agents, so the pattern keeps its scale
const slimeSettings = {
  respawnRate: 0.05,
  warmupSeconds: 3,
  trailResolution: 320,
  numAgents: 10000,
  displayFilter: "pixelated" as const,
  agent: {
    moveSpeed: 3.5, turnSpeed: 2, sensorAngleSpacing: 30, sensorOffsetDst: 6, sensorSize: 0,
    colour: [0.18, 0.12, 0.06] as [number, number, number],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${vt323.variable} ${bastarda.variable}`}>
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
