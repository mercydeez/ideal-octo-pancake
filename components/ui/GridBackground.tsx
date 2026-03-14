export default function GridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-base overflow-hidden">
      {/* Base Grid Pattern — increased opacity */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Sub-grid Pattern (smaller squares) */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }}
      />

      {/* ── Section-Aware Ambient Glows ────────────────────── */}
      {/* Hero: deep blue glow top-right */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[160px]"
        style={{ top: '0%', right: '10%', width: '50vw', height: '50vh', background: 'rgba(56,189,248,0.06)' }}
      />
      {/* About: indigo glow left-center */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[140px]"
        style={{ top: '25%', left: '-5%', width: '40vw', height: '40vh', background: 'rgba(129,140,248,0.05)' }}
      />
      {/* Journey: violet glow bottom-left */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[140px]"
        style={{ top: '45%', left: '5%', width: '35vw', height: '35vh', background: 'rgba(139,92,246,0.04)' }}
      />
      {/* Skills: cyan glow top-center */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[140px]"
        style={{ top: '60%', left: '30%', width: '40vw', height: '30vh', background: 'rgba(34,211,238,0.05)' }}
      />
      {/* Projects: blue glow right */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[160px]"
        style={{ top: '75%', right: '0%', width: '45vw', height: '40vh', background: 'rgba(56,189,248,0.04)' }}
      />

      {/* ── SVG Noise Texture Overlay ──────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.018]" aria-hidden="true">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* ── Edge Vignette ──────────────────────────────────── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(6,10,20,0.7) 100%)'
        }}
      />
      
      {/* Scanline overlay (subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
    </div>
  );
}
