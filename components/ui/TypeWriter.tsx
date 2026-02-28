"use client";

import { useState, useEffect, useCallback } from "react";

interface TypeWriterProps {
  strings: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

/**
 * Custom typewriter component that replaces typeit-react
 * to avoid the React 18 JSX runtime incompatibility.
 */
export default function TypeWriter({
  strings,
  speed = 80,
  deleteSpeed = 50,
  pauseTime = 1500,
}: TypeWriterProps) {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = strings[stringIndex];

    if (!isDeleting) {
      /* Typing forward */
      setText(current.substring(0, text.length + 1));

      if (text.length + 1 === current.length) {
        /* Finished typing — pause then delete */
        setTimeout(() => setIsDeleting(true), pauseTime);
        return pauseTime;
      }
      return speed;
    } else {
      /* Deleting */
      setText(current.substring(0, text.length - 1));

      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        return speed;
      }
      return deleteSpeed;
    }
  }, [text, stringIndex, isDeleting, strings, speed, deleteSpeed, pauseTime]);

  useEffect(() => {
    const delay = tick();
    const timer = setTimeout(() => {
      /* Force a re-render to trigger the next tick */
      setText((prev) => prev); // no-op to re-trigger effect via tick change
      tick();
    }, delay);

    return () => clearTimeout(timer);
  }, [tick]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-accent-amber ml-1 animate-pulse align-middle" />
    </span>
  );
}
