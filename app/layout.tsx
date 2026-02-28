import "./globals.css";
import { Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import SystemCommandBar from "@/components/ui/SystemCommandBar";
import CustomCursor from "@/components/ui/CustomCursor";
import DraggableTerminal from "@/components/ui/DraggableTerminal";
import LatentSpaceBackground from "@/components/three/LatentSpaceBackground";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: "Atharva Soundankar | Neural Architect",
  description: "Elite AI & Data Architecture Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}
    >
      <body className="antialiased selection:bg-[#00f5ff20] selection:text-[#00f5ff]">
        <div className="crt-overlay" />
        <div className="scanline" />
        <CustomCursor />
        <LatentSpaceBackground />
        <main className="relative z-10">
          {children}
        </main>
        <SystemCommandBar />
        <DraggableTerminal />
      </body>
    </html>
  );
}