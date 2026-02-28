import "./globals.css";
import { Space_Grotesk, Syncopate } from "next/font/google";
import CanvasLayer from "@/components/three/CanvasLayer";
import SystemLog from "@/components/ui/SystemLog";
import CommandBar from "@/components/ui/CommandBar";
import CustomCursor from "@/components/ui/CustomCursor";

// Cyber Typography
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-syncopate" });

export const metadata = {
  title: "Neural Architect V2 | Galactic Edition",
  description: "Shielded 3D Architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syncopate.variable} scroll-smooth`}>
      <body className="antialiased bg-void selection:bg-cyan/30 text-white">

        {/* =======================================================
            PHYSICAL LAYER (z-0): Persistent WebGL Context
            ======================================================= */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CanvasLayer />
        </div>

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
        <SystemLog />
        <div className="crt-overlay" />
        <div className="scanlines" />

      </body>
    </html>
  );
}