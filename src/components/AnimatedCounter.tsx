"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  continuous?: boolean;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  continuous = false,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !continuous });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = continuous ? count : 0;
    const endValue = target;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (continuous) {
        intervalRef.current = setTimeout(() => {
          setCount((prev) => prev + Math.random() * (target * 0.02));
        }, 1000 + Math.random() * 2000);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isInView, target, duration, continuous]);

  useEffect(() => {
    if (!continuous || !isInView) return;

    const tick = setInterval(() => {
      setCount((prev) => prev + Math.random() * (target * 0.005) + 1);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(tick);
  }, [continuous, isInView, target]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
