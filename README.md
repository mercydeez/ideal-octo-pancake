# Neural Architect V2 | Galactic Edition

A high-performance, shielded 3D portfolio designed as a futuristic, military-grade engineer's workstation. Built for an elite AI & Data Engineer, this application separates a physical WebGL layer from a reactive UI layer to create a stunning, immersive experience.

![Hero Overview](./public/og-image.png) <!-- Update this path if you add an OG image later -->

## 🚀 The Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Core Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Rendering**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) + `drei`
- **Post-Processing**: `@react-three/postprocessing` (v2.16.2 / postprocessing 6 - highly stable)
- **Animation Physics**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Icons**: [Lucide React](https://lucide.dev/) & [SimpleIcons](https://simpleicons.org/)

## 🏗️ Core Architecture (The Triple-Layer Shield)

The layout is structurally separated into three distinct Z-index planes to maximize FPS and logical separation:

1. **Physical Layer (`z-0`)**: A globally persistent `@react-three/fiber` Canvas. It does not re-render on navigation, strictly managing the GPU-intensive WebGL 3D context.
2. **Terminal Layer (`z-10`)**: The scrollable React content. Tactical panels, Framer Motion grids, and interactive DOM elements.
3. **Overlay Layer (`z-50`)**: A `pointer-events-none` container for the custom DOM Cursor, deep vignetting, and CRT scanlines that physically sit "on top of the glass."

## Visual Aesthetics & Design System

### **Color Palette**
- **Pure Void (Background):** `#030303` — Complete black for infinite depth.
- **Electric Cyan (Primary Accent):** `#00F0FF` — Neon tracking highlights.
- **Amber Glow (Secondary Accent):** `#FF6B35` — Alarms, targets, and critical interactivity states.
- **Pink (Social):** `#FF6BFF` — For the Instagram/Threads broadcasting node.

### **Typography**
- **Syncopate** ("Cyber Font"): Used for massive, heavy component headers and logos.
- **Space Grotesk** ("Terminal Font"): Used for body text, monospace logs, and system statuses.

### **Global Effects & CSS**
- **Glassmorphism:** Standard `tactical-panel` classes use a massive background blur (`12px` to `20px`) atop a pure black background (`rgba(0,0,0,0.85)`).
- **CRT Scanlines:** A global repeating linear gradient spanning across the viewport.
- **Deep Vignette:** A radial gradient fading out monitor edges to absolute `#030303` to force maximum visual focus to the center.
- **Mechanical Kinetics:** All Framer Motion mounts use a customized ease curve: `ease: [0.16, 1, 0.3, 1]` with `duration: 0.8` to simulate heavy architectural weight rather than generic spring bouncing.

## 🛠️ The Functional Intelligence (Features)

### 1. Interstellar Custom Cursor
Replaces the default OS cursor with a reactive tracking dot. Hooked into a global Zustand store (`cursorVariant`), touching any interactive element (buttons, cards, dock icons) morphs the cursor into a spinning, Amber **Targeting Reticle** (a dashed crosshair lock-on).

### 2. 3D Neural Network (Node-Edge Algorithm)
A custom algorithm operating on a `BufferGeometry` particle system.
- **The Physics:** 250 nodes drift in space. When `distance < 1.5`, a highly emissive WebGL Line is dynamically drawn connecting the nodes.
- **The Reactivity:** Hooked to the Zustand store. Whenever the user mouses over a "Project Matrix" card, the `useFrame` loop triggers an `isHovering` state. The neural network's rotation speed accelerates, and its nodes linearly interpolate (`THREE.MathUtils.lerp`) from Cyan to a glowing Amber.

### 3. Magnetic Command Dock
A persistent, absolute bottom command bar. Built using Framer Motion's `useTransform` and `useSpring`, the `DockIcon` components mathematically calculate their radial distance to the user's `mouseX` position, magnifying dynamically as the cursor approaches to emulate native macOS dock physics.

### 4. Interactive Content Sections
- **Hero:** Profile photo encased in three counter-rotating, scaled mechanical HUD rings. Contains glitches and direct `EXTRACT_DATA` download buttons.
- **About (Biological Summary):** Features a dedicated, indefinitely-pulsing "Social Signal" card for `@ai.with.atharva` and a marquee ticker of active ML learning tokens.
- **Projects (Project Matrix):** 
  - **Lulu Sales Intelligence Expanded Card:** A highly customized deep-dive card featuring a live, auto-scrolling terminal window rendering simulated JSON logs of an XG-Boost architecture.
- **Credentials Vault:** 
  - Certifications displayed beneath a "Security Grade" texture (heavy blur, white scanlines). 
  - Master IJCRT Research Paper card features a `CITE_SOURCE` button, directly mounting the exact academic citation to the user's system clipboard.
  - A secure `VIEW_PUBLICATION` overlay pops up the PDF inside an encrypted, full-screen tactical modal.

## 🔧 Getting Started

To boot up the workstation locally:

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/mercydeez/MY_PORTFOLIO.git

# 2. Install dependencies
npm install

# 3. Initialize the development servers
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Directory Structure

- `app/`: Next.js 14 App Router layout and globals.
- `components/three/`: WebGL Context, Post-Processing, and Neural Network logic.
- `components/sections/`: Primary layout blocks (Hero, About, Projects, Credentials).
- `components/ui/`: Isolated components like `CommandBar.tsx`, `CustomCursor.tsx`, and `ProjectExpanded.tsx`.
- `lib/`: System-wide constants (`constants.ts`) and global Zustand state (`store.ts`).
