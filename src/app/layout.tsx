import "./globals.css";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Bricolage Grotesque, characterful and narrowable, for display; Atkinson Hyperlegible Next for reading
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz", "wdth"], variable: "--font-bricolage" });
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-atkinson" });

// A tide pool at night. The slime glows faintly in the dark water, and a torch that follows the
// pointer lights it up and shows the creatures. Smooth and at full resolution, so it reads as organic
const slimeSettings = {
  respawnRate: 0.05,
  warmupSeconds: 3,
  // Deep water (#0f2536, matching --background in globals.css)
  backgroundColour: [0.059, 0.145, 0.212] as RGB,
  speciesPalettes: [
    // Two bioluminescent species, glowing brighter where their trails are strongest:
    // green, #4c9a2a to #a3e363
    [[0.298, 0.604, 0.165], [0.64, 0.892, 0.388]],
    // and sea-glow cyan, #1f8a87 to #7ee6da
    [[0.122, 0.541, 0.529], [0.494, 0.902, 0.855]],
  ] as RGB[][],
  // Purple ochre stars, as on the Oregon coast, and a pale blue fish that crosses about every
  // 5 seconds. Edged in a darker night blue. Starfish sit only in the margins (see data-slime-cover)
  creatures: {
    starfish: 3, starfishSize: 18, starfishSpeed: 0.5,
    starfishColour: [0.71, 0.34, 0.5] as RGB,
    fish: true, fishSize: 14, fishSpeed: 140, fishInterval: 5,
    fishColour: [0.56, 0.79, 0.94] as RGB,
    outlineColour: [0.03, 0.08, 0.12] as RGB,
  },
  // A warm torch, about 200px across on a typical screen
  torch: { enabled: true, radius: 70, ambient: 0.35, creatureAmbient: 0.12, colour: [1, 0.784, 0.42] as RGB },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${atkinson.variable}`}>
      <body>
        <SlimeCanvas settings={slimeSettings} />
        <Header />
        <main className="flex flex-col">
          {children}   {/* the current page renders here */}
        </main>
      </body>
    </html>
  );
}
