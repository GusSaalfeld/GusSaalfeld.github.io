import "./globals.css";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";
import type { RGB } from "@/app/lib/slime/SlimeSettings";

// Archivo, heavy and wide, for the name and headings; Source Serif 4, a reading face, for everything else
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], axes: ["opsz"], variable: "--font-source-serif" });

// The slime only shows in the two banners around the content (SlimeBanner): fresh greens on deep green, smooth
const slimeSettings = {
  respawnRate: 0.05,
  warmupSeconds: 3,
  backgroundColour: [0.137, 0.212, 0.165] as RGB, // deep green (#23362a)
  // #4f7a3a to #9cc46a to #d6ecb0
  speciesPalettes: [[[0.31, 0.478, 0.227], [0.612, 0.769, 0.416], [0.839, 0.925, 0.69]]] as RGB[][],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
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
