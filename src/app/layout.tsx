import "./globals.css";
import { Instrument_Sans, Permanent_Marker } from "next/font/google";
import Header from "@/app/components/header";
import DishLabels from "@/app/components/dish-labels";
import SlimeCanvas from "@/app/components/slime-canvas";
import { ProjectList } from "@/app/data/projects";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Instrument Sans for everything you read; Permanent Marker, like a lab marker pen, only for the dish's labels
const instrument = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-permanent-marker" });

// Slime mould in a petri dish, as in the 2010 experiment where Physarum grew a network between
// oat flakes laid out like the cities around Tokyo, much like the real rail network. Here each
// oat is a project, so the slime maps the work
const slimeSettings = {
  numAgents: 30000,
  respawnRate: 0.05,
  warmupSeconds: 3,
  // The agar, dark like a dish on a black lab mat, so the yellow shows (#3d3a30)
  backgroundColour: [0.239, 0.227, 0.188] as RGB,
  // Physarum polycephalum's own yellow, deep where faint (#b8860b) to bright (#ffd84d)
  speciesPalettes: [[[0.722, 0.525, 0.043], [0.878, 0.659, 0.071], [1, 0.847, 0.302]]] as RGB[][],
  dish: {
    enabled: true,
    food: ProjectList.length, // one oat per project, in list order
    foodWeight: 20, foodSize: 5,
    benchColour: [0.902, 0.918, 0.91] as RGB,   // the page (#e6eae8, matching --background in globals.css)
    rimColour: [0.78, 0.82, 0.81] as RGB,
    oatColour: [0.85, 0.77, 0.6] as RGB,
    focusColour: [0.965, 0.945, 0.894] as RGB,  // label paper (#f6f1e4)
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${marker.variable}`}>
      <body>
        <SlimeCanvas settings={slimeSettings} />
        {/* Where the petri dish sits: the slime canvas draws it in this box. Fixed, so the dish stays
            put while the page scrolls: the right half from lg up, otherwise the top of the screen */}
        <div
          data-slime-dish
          aria-hidden
          className="pointer-events-none fixed left-1/2 top-[96px] aspect-square w-[min(84vw,46svh)] -translate-x-1/2 lg:left-auto lg:right-[6vw] lg:top-[calc(50%+24px)] lg:w-[min(38vw,74svh)] lg:translate-x-0 lg:-translate-y-1/2"
        />
        <DishLabels count={ProjectList.length} />
        <Header />
        {/* The notebook column. Below lg it starts under the dish and covers it as it scrolls */}
        <main className="relative z-10 pt-[calc(min(84vw,46svh)+150px)] lg:w-1/2 lg:pt-0">
          <div className="min-h-svh bg-lab-bench pb-16 lg:bg-transparent">
            {children}   {/* the current page renders here */}
          </div>
        </main>
      </body>
    </html>
  );
}
