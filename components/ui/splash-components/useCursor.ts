"use client";

import { useEffect, useRef, useCallback } from "react";

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ rx: 0, ry: 0, cx: 0, cy: 0 });
  const rafRef = useRef<number>(0);

  const expandRing = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = "64px";
      ringRef.current.style.height = "64px";
    }
  }, []);

  const contractRing = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = "38px";
      ringRef.current.style.height = "38px";
    }
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.cx = e.clientX;
      pos.current.cy = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      const p = pos.current;
      p.rx += (p.cx - p.rx) * 0.1;
      p.ry += (p.cy - p.ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + "px";
        ringRef.current.style.top = p.ry + "px";
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { cursorRef, ringRef, expandRing, contractRing };
}
