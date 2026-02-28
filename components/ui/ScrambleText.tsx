"use client";
import { useTextScramble } from '@/hooks/useTextScramble';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export default function ScrambleText({
  text,
  className,
  delay = 0
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [shouldScramble, setShouldScramble] = useState(false);
  const { displayText } = useTextScramble(text, {
    delay: shouldScramble ? delay : Infinity,
    speed: 30,
    scrambleDuration: 3
  });

  useEffect(() => {
    if (inView) setShouldScramble(true);
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {shouldScramble ? displayText : '\u00A0'.repeat(text.length)}
    </span>
  );
}
