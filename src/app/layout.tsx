import "./globals.css";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import Header from "@/app/components/header";
import SlimeCanvas from "@/app/components/slime-canvas";

// Plex Mono for the retro interface (title bars and navbar),
// and Fraunces, a soft organic serif, for everything written
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-plex-mono" });
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"], variable: "--font-fraunces" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexMono.variable} ${fraunces.variable}`}>
      <body>
        <SlimeCanvas settings={{ respawnRate: 0.05, warmupSeconds: 3 }} />
        <Header />
        <main className="px-4 md:px-16 py-8 gap-8 flex flex-col">
          {children}   {/* the current page renders here */}
        </main>
      </body>
    </html>
  );
}