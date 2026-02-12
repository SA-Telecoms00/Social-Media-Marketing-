"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function FooterSparkline({ color = "#00d4ff" }: { color?: string }) {
  const [data, setData] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initial = Array.from({ length: 10 }, (_, i) =>
      12 + (i / 10) * 16 + Math.random() * 8
    );
    setData(initial);

    timerRef.current = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push(Math.max(5, Math.min(35, last + (Math.random() - 0.4) * 6)));
        return next;
      });
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (data.length === 0) return null;

  const w = 80;
  const h = 32;
  const stepX = w / (data.length - 1);
  const pathData = data
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - y}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={`fsg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathData} L ${(data.length - 1) * stepX} ${h} L 0 ${h} Z`}
        fill={`url(#fsg-${color.replace("#", "")})`}
      />
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={(data.length - 1) * stepX}
        cy={h - data[data.length - 1]}
        r="2.5"
        fill={color}
      >
        <animate attributeName="r" values="2.5;4;2.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function FooterMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [followerBump, setFollowerBump] = useState(128);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setFollowerBump((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-green" />
        </span>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Live Growth</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-white font-mono">
            + {followerBump}
          </div>
          <div className="text-[10px] text-gray-500">new followers today</div>
        </div>
        <FooterSparkline color="#00d4ff" />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Engagement</span>
        <motion.span
          className="text-sm font-bold text-neon-green font-mono"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          9.8%
        </motion.span>
      </div>
    </motion.div>
  );
}
