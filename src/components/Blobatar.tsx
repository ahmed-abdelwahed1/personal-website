"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Blobatar as NativeBlobatar } from "@blobatar/react";
import { useGaze } from "@blobatar/react/gaze";
import {
  happy,
  wink,
  surprised,
  smug,
  love,
  thinking,
  type Expression,
} from "blobatar/expression";

const EXPRESSIONS: Expression[] = [wink, happy, surprised, smug, love, thinking];

interface BlobatarProps {
  name?: string;
  size?: number;
  className?: string;
}

export default function Blobatar({
  name = "Osmar",
  size,
  className = "",
}: BlobatarProps) {
  const [mounted, setMounted] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<Expression | undefined>(undefined);
  const [clickIndex, setClickIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Native cursor gaze tracking across the screen
  const { ref } = useGaze({ travel: 3.8, lookAt: "pointer" });

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Click interaction: cycle through native expressions with a spring squish/bounce
  const handleClick = useCallback(() => {
    setIsBouncing(true);
    const nextExpr = EXPRESSIONS[clickIndex % EXPRESSIONS.length];
    setClickIndex((prev) => prev + 1);
    setCurrentExpression(nextExpr);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentExpression(undefined);
      setIsBouncing(false);
      timeoutRef.current = null;
    }, 2200);
  }, [clickIndex]);

  // Hover interaction: perk up and smile
  const handleMouseEnter = () => {
    if (!timeoutRef.current) {
      setCurrentExpression(happy);
    }
  };

  const handleMouseLeave = () => {
    if (!timeoutRef.current) {
      setCurrentExpression(undefined);
    }
  };

  const sizeStyle = size ? ({ "--blobatar-size": `${size}px` } as React.CSSProperties) : undefined;

  if (!mounted) {
    return (
      <div
        className={`hero-blobatar-interactive ${className}`}
        style={sizeStyle}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className={`hero-blobatar-interactive ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Interactive Osmar blobatar - click to interact"
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.88, y: 2 }}
      animate={
        isBouncing
          ? {
              scale: [1, 1.22, 0.9, 1.06, 1],
              rotate: [0, -6, 6, -2, 0],
              transition: { duration: 0.45, ease: "easeOut" },
            }
          : {}
      }
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={sizeStyle}
    >
      <NativeBlobatar
        ref={ref}
        name={name}
        animate="always"
        expression={currentExpression}
        className="hero-blobatar"
      />
    </motion.div>
  );
}
