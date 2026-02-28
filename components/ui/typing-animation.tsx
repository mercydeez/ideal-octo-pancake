"use client";

import { useState, useEffect, useCallback } from "react";

interface TypingAnimationProps {
    texts: string[];
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
}

export function TypingAnimation({
    texts,
    speed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
}: TypingAnimationProps) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleTyping = useCallback(() => {
        const fullText = texts[index];

        if (isDeleting) {
            setDisplayText((prev) => prev.substring(0, prev.length - 1));
            if (displayText === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        } else {
            setDisplayText((prev) => fullText.substring(0, prev.length + 1));
            if (displayText === fullText) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            }
        }
    }, [displayText, index, isDeleting, texts, pauseTime]);

    useEffect(() => {
        const timer = setTimeout(
            handleTyping,
            isDeleting ? deleteSpeed : speed
        );
        return () => clearTimeout(timer);
    }, [handleTyping, isDeleting, deleteSpeed, speed]);

    return (
        <span className="border-r-2 border-[#FF6B35] pr-1 animate-pulse">
            {displayText}
        </span>
    );
}
