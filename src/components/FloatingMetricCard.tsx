"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingMetricCardProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  delay?: number;
  glowColor?: string;
  className?: string;
}

export default function FloatingMetricCard({
  icon,
  label,
  children,
  delay = 0,
  glowColor = "neon-blue",
  className = "",
}: FloatingMetricCardProps) {
  const glowMap: Record<string, string> = {
    "neon-blue": "shadow-neon-blue/20",
    "neon-purple": "shadow-neon-purple/20",
    "neon-pink": "shadow-neon-pink/20",
    "neon-cyan": "shadow-neon-cyan/20",
    "neon-green": "shadow-neon-green/20",
  };

  const borderMap: Record<string, string> = {
    "neon-blue": "border-neon-blue/30",
    "neon-purple": "border-neon-purple/30",
    "neon-pink": "border-neon-pink/30",
    "neon-cyan": "border-neon-cyan/30",
    "neon-green": "border-neon-green/30",
  };

  const iconColorMap: Record<string, string> = {
    "neon-blue": "text-neon-blue",
    "neon-purple": "text-neon-purple",
    "neon-pink": "text-neon-pink",
    "neon-cyan": "text-neon-cyan",
    "neon-green": "text-neon-green",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`bg-surface/90 backdrop-blur-xl border ${borderMap[glowColor] || "border-surface-border"} rounded-2xl p-5 shadow-2xl ${glowMap[glowColor] || ""} hover:scale-105 transition-transform cursor-default`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={iconColorMap[glowColor] || "text-neon-blue"}>
            {icon}
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="text-2xl font-bold text-white font-mono">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
