"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Heart, Eye, Target, TrendingUp } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import MiniLineChart from "./MiniLineChart";
import Image from "next/image";

function AnimatedProgressBar({
  label,
  percentage,
  color,
  delay,
}: {
  label: string;
  percentage: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [currentPct, setCurrentPct] = useState(percentage);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentPct((prev) => {
        const delta = (Math.random() - 0.3) * 2;
        return Math.min(100, Math.max(percentage - 10, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-mono">{currentPct.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-surface-light rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${currentPct}%` } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/30">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
      </span>
      <span className="text-xs font-bold text-neon-green uppercase tracking-widest">Live</span>
    </div>
  );
}

const metrics = [
  { icon: Users, label: "Followers", target: 48392, color: "neon-blue", chartColor: "#00d4ff", pctGrowth: "24.3" },
  { icon: Heart, label: "Likes", target: 127845, color: "neon-pink", chartColor: "#ec4899", pctGrowth: "18.7" },
  { icon: Eye, label: "Views", target: 892100, color: "neon-purple", chartColor: "#a855f7", pctGrowth: "31.2" },
  { icon: Target, label: "Leads", target: 3247, color: "neon-green", chartColor: "#22c55e", pctGrowth: "15.9" },
];

const iconColorMap: Record<string, string> = {
  "neon-blue": "text-neon-blue",
  "neon-pink": "text-neon-pink",
  "neon-purple": "text-neon-purple",
  "neon-green": "text-neon-green",
};

const borderColorMap: Record<string, string> = {
  "neon-blue": "border-neon-blue/20",
  "neon-pink": "border-neon-pink/20",
  "neon-purple": "border-neon-purple/20",
  "neon-green": "border-neon-green/20",
};

export default function LiveGrowthSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="growth" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background image accent — analytics reach phone */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/analytics-reach.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.04] blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <LiveBadge />
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            Real-Time <span className="text-gradient">Growth Dashboard</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Watch the numbers climb. This is what happens when strategy meets execution.
          </p>
        </motion.div>

        {/* Metric cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`bg-surface/80 backdrop-blur-xl border ${borderColorMap[metric.color]} rounded-2xl p-6 hover:scale-[1.03] transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${iconColorMap[metric.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-neon-green text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    +{metric.pctGrowth}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-white font-mono mb-1">
                  <AnimatedCounter target={metric.target} continuous />
                </div>
                <p className="text-sm text-gray-400 mb-4">{metric.label}</p>
                <MiniLineChart
                  color={metric.chartColor}
                  width={220}
                  height={40}
                  points={10}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Progress bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-surface/60 backdrop-blur-xl border border-surface-border rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-neon-blue" />
            Campaign Performance
          </h3>
          <div className="space-y-5">
            <AnimatedProgressBar label="Audience Reach" percentage={87.3} color="#00d4ff" delay={0.2} />
            <AnimatedProgressBar label="Engagement Rate" percentage={72.8} color="#a855f7" delay={0.4} />
            <AnimatedProgressBar label="Conversion Rate" percentage={45.6} color="#ec4899" delay={0.6} />
            <AnimatedProgressBar label="Brand Awareness" percentage={93.1} color="#22c55e" delay={0.8} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
