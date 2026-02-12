"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface MiniLineChartProps {
  color?: string;
  width?: number;
  height?: number;
  points?: number;
}

export default function MiniLineChart({
  color = "#00d4ff",
  width = 200,
  height = 60,
  points = 12,
}: MiniLineChartProps) {
  const [data, setData] = useState<number[]>([]);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initial = Array.from({ length: points }, (_, i) =>
      20 + (i / points) * 30 + Math.random() * 15
    );
    setData(initial);

    animRef.current = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push(Math.max(10, Math.min(height - 5, last + (Math.random() - 0.35) * 10)));
        return next;
      });
    }, 1500);

    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [points, height]);

  if (data.length === 0) return null;

  const stepX = width / (data.length - 1);
  const pathData = data
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${height - y}`)
    .join(" ");

  const areaPath = `${pathData} L ${(data.length - 1) * stepX} ${height} L 0 ${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill={`url(#grad-${color.replace("#", "")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.circle
        cx={(data.length - 1) * stepX}
        cy={height - data[data.length - 1]}
        r="4"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}
