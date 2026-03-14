import "./globals.css";
import { Space_Grotesk, Syncopate, Bebas_Neue, Space_Mono } from "next/font/google";
import GridBackground from "@/components/ui/GridBackground";
import CommandBar from "@/components/ui/CommandBar";
import CustomCursor from "@/components/ui/CustomCursor";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

// Cyber Typography
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-syncopate" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono" });

export const metadata = {
  title: "Atharva Soundankar | AI & Big Data Engineer Portfolio",
  description: "AI & Big Data Engineer building scalable data pipelines and intelligent ML systems. Portfolio showcasing projects in Machine Learning, Data Analysis, and Big Data.",
  keywords: ["AI Engineer", "Big Data", "Machine Learning", "Data Scientist", "Portfolio", "Atharva Soundankar"],
  authors: [{ name: "Atharva Soundankar" }],
  openGraph: {
    title: "Atharva Soundankar | AI & Big Data Engineer",
    description: "Building scalable data pipelines and intelligent ML systems — from raw data to production-ready AI solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Soundankar | AI & Big Data Engineer",
    description: "Building scalable data pipelines and intelligent ML systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syncopate.variable} ${bebasNeue.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-base selection:bg-primary/30 text-text-1">

        <SmoothScrollProvider>

          {/* =======================================================
            PHYSICAL LAYER (z-0): CSS Architectural Grid
            ======================================================= */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <GridBackground />
          </div>

          {/* =======================================================
            SPOTLIGHT LAYER (z-1): Mouse-Following Gradient
            ======================================================= */}
          <MouseSpotlight />

          {/* =======================================================
            TERMINAL LAYER (z-10): React UI & Content
            ======================================================= */}
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>

          {/* =======================================================
            HUD LAYER (z-50): Diagnostics & Overlays
            ======================================================= */}
          <CustomCursor />
          <CommandBar />
          <div className="crt-overlay" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}