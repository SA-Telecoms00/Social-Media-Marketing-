"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxValues {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

const THRESHOLD = 0.05;

export default function useMouseParallax(sensitivity: number = 0.02): ParallaxValues {
  const [values, setValues] = useState<ParallaxValues>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  });

  const isMoving = useRef(false);
  const moveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let animFrame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) * sensitivity;
      targetY = (e.clientY - centerY) * sensitivity;

      if (!isMoving.current) {
        isMoving.current = true;
        animFrame = requestAnimationFrame(animate);
      }

      // Stop animating 200ms after last mouse move
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        isMoving.current = false;
      }, 200);
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      const prevX = currentX;
      const prevY = currentY;
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);

      // Only update state if values changed meaningfully
      if (
        Math.abs(currentX - prevX) > THRESHOLD ||
        Math.abs(currentY - prevY) > THRESHOLD
      ) {
        setValues({
          x: currentX,
          y: currentY,
          rotateX: -currentY * 0.5,
          rotateY: currentX * 0.5,
        });
      }

      if (isMoving.current || Math.abs(currentX - targetX) > THRESHOLD || Math.abs(currentY - targetY) > THRESHOLD) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [sensitivity]);

  return values;
}
