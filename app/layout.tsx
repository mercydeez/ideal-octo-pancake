import "./globals.css";
import LatentSpaceBackground from "@/components/three/LatentSpaceBackground";

export const metadata = {
  title: "Neural Architect V2 | Galactic Edition",
  description: "AI & Data Architecture Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased">
        {/* Layer 0: Background Layer (z-0) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <LatentSpaceBackground />
        </div>

        {/* Layer 1: Content Layer (z-10) */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>

        {/* Layer 2: Overlay Layer (z-50) */}
        <div className="cyber-grid" />
        <div className="scanlines animate-crt-scanline" />
        <div className="crt-overlay" />
      </body>
    </html>
  );
}