"use client";
import { useState, useEffect, useCallback } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function useTextScramble(finalText: string, options?: { speed?: number; delay?: number; scrambleDuration?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const speed = options?.speed ?? 30;
  const delay = options?.delay ?? 0;
  const scrambleDuration = options?.scrambleDuration ?? 3;

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = finalText.length * scrambleDuration;

    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (index < iteration / scrambleDuration) return char;
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, speed, scrambleDuration]);

  useEffect(() => {
    if (!isFinite(delay)) return;
    const timeout = setTimeout(scramble, delay);
    return () => clearTimeout(timeout);
  }, [scramble, delay]);

  return { displayText, isComplete };
}
