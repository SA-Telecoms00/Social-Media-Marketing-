"use client";

import { useEffect, useState } from "react";

interface ParallaxValues {
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

export default function useMouseParallax(sensitivity: number = 0.02): ParallaxValues {
  const [values, setValues] = useState<ParallaxValues>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  });

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
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);

      setValues({
        x: currentX,
        y: currentY,
        rotateX: -currentY * 0.5,
        rotateY: currentX * 0.5,
      });

      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [sensitivity]);

  return values;
}
