"use client";

import { motion } from "framer-motion";
import { Users, Heart, Eye, TrendingUp, BarChart3 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import MiniLineChart from "./MiniLineChart";
import HeroBackground from "./HeroBackground";
import LiveBadge from "./LiveBadge";
import useMouseParallax from "@/hooks/useMouseParallax";

function HeroMetricCard({
  icon,
  label,
  children,
  color,
  borderColor,
  delay,
  className,
  mx,
  my,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  color: string;
  borderColor: string;
  delay: number;
  className?: string;
  mx: number;
  my: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`absolute z-30 ${className}`}
      style={{
        transform: `translate(${mx}px, ${my}px)`,
        willChange: "transform",
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08, y: -8 }}
        className={`bg-black/40 backdrop-blur-xl border ${borderColor} rounded-xl px-4 py-3 shadow-2xl shadow-black/30 cursor-default transition-transform`}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className={color}>{icon}</div>
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-lg font-bold text-white font-mono leading-tight">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function ConnectorDot({ className, color, delay }: { className: string; color: string; delay: number }) {
  return (
    <motion.div
      className={`absolute z-20 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.5 }}
    >
      <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
        <motion.line
          x1="0" y1="40" x2="120" y2="40"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 2, delay: delay + 0.8 }}
        />
        <motion.circle
          cx="0" cy="40" r="2" fill={color}
          animate={{ cx: [0, 120, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        />
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const mouse = useMouseParallax(0.015);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* === BACKGROUND (image + overlays + noise + orbs) === */}
      <HeroBackground mouseX={mouse.x} mouseY={mouse.y} />

      {/* === FLOATING METRIC CARDS (above background, parallax) === */}

      {/* Top-left: Followers */}
      <HeroMetricCard
        icon={<Users className="w-4 h-4" />}
        label="Followers"
        color="text-neon-blue"
        borderColor="border-neon-blue/20"
        delay={0.9}
        className="top-[14%] left-[4%] lg:left-[7%]"
        mx={mouse.x * 1.6}
        my={mouse.y * 1.6}
      >
        <AnimatedCounter target={24853} continuous />
      </HeroMetricCard>

      {/* Top-right: Likes */}
      <HeroMetricCard
        icon={<Heart className="w-4 h-4" />}
        label="Likes"
        color="text-neon-pink"
        borderColor="border-neon-pink/20"
        delay={1.1}
        className="top-[11%] right-[4%] lg:right-[8%]"
        mx={mouse.x * 2.0}
        my={mouse.y * 2.0}
      >
        <AnimatedCounter target={18247} continuous />
      </HeroMetricCard>

      {/* Bottom-left: Reach */}
      <HeroMetricCard
        icon={<Eye className="w-4 h-4" />}
        label="Reach"
        color="text-neon-cyan"
        borderColor="border-neon-cyan/20"
        delay={1.3}
        className="bottom-[18%] left-[3%] lg:left-[10%]"
        mx={mouse.x * 1.8}
        my={mouse.y * 1.8}
      >
        <AnimatedCounter target={142500} continuous />
      </HeroMetricCard>

      {/* Bottom-right: Engagement */}
      <HeroMetricCard
        icon={<TrendingUp className="w-4 h-4" />}
        label="Engagement"
        color="text-neon-green"
        borderColor="border-neon-green/20"
        delay={1.5}
        className="bottom-[16%] right-[3%] lg:right-[9%]"
        mx={mouse.x * 2.2}
        my={mouse.y * 2.2}
      >
        <AnimatedCounter target={8.7} continuous decimals={1} suffix="%" />
      </HeroMetricCard>

      {/* Mid-left: Chart card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="hidden lg:block absolute top-[46%] left-[3%] z-30"
        style={{
          transform: `translate(${mouse.x * 1.4}px, ${mouse.y * 1.4}px)`,
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="bg-black/40 backdrop-blur-xl border border-surface-border rounded-xl p-3 shadow-2xl"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <BarChart3 className="w-3 h-3 text-neon-purple" />
            <span className="text-[10px] text-gray-400">Weekly Growth</span>
          </div>
          <MiniLineChart color="#a855f7" width={120} height={36} points={8} />
        </motion.div>
      </motion.div>

      {/* Mid-right: Activity chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
        className="hidden lg:block absolute top-[50%] right-[4%] z-30"
        style={{
          transform: `translate(${mouse.x * 1.6}px, ${mouse.y * 1.6}px)`,
          willChange: "transform",
        }}
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-black/40 backdrop-blur-xl border border-surface-border rounded-xl p-3 shadow-2xl"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp className="w-3 h-3 text-neon-blue" />
            <span className="text-[10px] text-gray-400">Live Activity</span>
          </div>
          <MiniLineChart color="#00d4ff" width={120} height={36} points={8} />
        </motion.div>
      </motion.div>

      {/* Subtle connector dots (from a couple cards toward center) */}
      <ConnectorDot className="hidden lg:block top-[18%] left-[18%]" color="#00d4ff" delay={1.2} />
      <ConnectorDot className="hidden lg:block bottom-[22%] right-[20%]" color="#22c55e" delay={1.6} />

      {/* === CENTER: Glassmorphism content panel === */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="relative max-w-2xl w-full text-center"
        >
          {/* Glass panel */}
          <div className="relative rounded-3xl bg-black/30 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/20 px-8 py-12 sm:px-12 sm:py-16 overflow-hidden">
            {/* Inner glow accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-blue/[0.03] via-transparent to-neon-purple/[0.03]" />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <div className="relative">
              <LiveBadge />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-8 mb-6 leading-[1.05]"
              >
                Your Brand.{" "}
                <span className="text-gradient">Everywhere.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
                className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed"
              >
                We grow brands through social media strategy, content, and paid advertising.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,212,255,0.25)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-semibold text-lg shadow-lg shadow-neon-blue/20 hover:shadow-neon-blue/40 transition-shadow cursor-pointer"
                >
                  Start Growing Now
                </motion.a>
                <motion.a
                  href="#growth"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("growth")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full border border-white/[0.1] text-gray-300 hover:text-white hover:border-neon-blue/40 font-semibold text-lg transition-all backdrop-blur-sm cursor-pointer"
                >
                  See Live Growth ↓
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-background to-transparent z-40 pointer-events-none" />
    </section>
  );
}
