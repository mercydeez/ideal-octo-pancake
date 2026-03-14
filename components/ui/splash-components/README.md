# Splash Screen — Next.js Components

## Files

| File | Purpose |
|---|---|
| `Splash.tsx` | Main orchestrator — drop this into your page |
| `ParticleBackground.tsx` | WebGL canvas (3,500 particles, mouse-reactive) |
| `SplashLoader.tsx` | Animated 0→100% loading counter |
| `SplashContent.tsx` | Name / role / tags / CTA with Framer Motion |
| `useCursor.ts` | Custom cursor hook |

---

## 1. Install dependency

```bash
npm install framer-motion
# (if not already in your project)
```

---

## 2. Drop the files

Copy all 5 files into your project, e.g.:

```
src/
  components/
    splash/
      Splash.tsx
      ParticleBackground.tsx
      SplashLoader.tsx
      SplashContent.tsx
      useCursor.ts
```

---

## 3. Use in your page

### Option A — Full page splash before portfolio loads

```tsx
// app/page.tsx
"use client";
import { useState } from "react";
import Splash from "@/components/splash/Splash";
import Portfolio from "@/components/Portfolio"; // your existing component

export default function Page() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <Splash onEnter={() => setSplashDone(true)} />;
  }
  return <Portfolio />;
}
```

### Option B — Animate from Splash into portfolio (no remount)

```tsx
"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Splash from "@/components/splash/Splash";

export default function Page() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!entered && <Splash onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Your portfolio content */}
      </motion.main>
    </>
  );
}
```

---

## 4. ParticleBackground as standalone hero background

```tsx
// Use behind your hero section instead of as a splash
import ParticleBackground from "@/components/splash/ParticleBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        {/* Your hero content */}
      </div>
    </section>
  );
}
```

---

## Customization

### Colors (in Splash.tsx / SplashContent.tsx)
```
--c1: #00ffe0   (cyan)
--c2: #8b5cf6   (purple)  
--c3: #ff3cac   (pink)
```

### Particle count (ParticleBackground.tsx line 52)
```ts
const N = 3500; // increase for denser field, decrease for performance
```

### Tags (SplashContent.tsx)
```ts
const TAGS = ["Machine Learning", "Deep Learning", "LLMs", ...];
```

### Loading speed (SplashLoader.tsx)
The `step` values and `delay` ms control how fast the counter runs.

---

## Requirements

- Next.js 13+ (App Router, `"use client"` directives included)
- `framer-motion` ≥ 10
- WebGL-capable browser (all modern browsers)
- Google Fonts loaded (Bebas Neue, Outfit, Space Mono) — add to `layout.tsx`:

```tsx
import { Bebas_Neue, Outfit, Space_Mono } from "next/font/google";
```
