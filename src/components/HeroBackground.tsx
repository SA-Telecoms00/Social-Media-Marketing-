"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export default function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* === LAYER 0: Base dark gradient === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04040a] via-[#0a0818] to-[#10061e]" />

      {/* === LAYER 1: Hero image as background === */}
      <motion.div
        className="absolute -inset-[8%]"
        style={{
          transform: `translate(${mouseX * 0.08}px, ${mouseY * 0.08}px) scale(1.08)`,
          willChange: "transform",
        }}
        animate={{
          scale: [1.08, 1.11, 1.08],
          x: [0, 8, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/color-swatches.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
          quality={85}
        />
      </motion.div>

      {/* === LAYER 2: Dark overlays for readability === */}

      {/* Top-to-bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04040a]/80 via-[#04040a]/50 to-[#04040a]/90" />

      {/* Left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04040a]/70 via-transparent to-[#04040a]/60" />

      {/* Radial vignette — darkest at edges, lighter in center-left where content sits */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 35% 50%, transparent 0%, rgba(4,4,10,0.7) 100%)",
        }}
      />

      {/* Extra bottom fade for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Extra top fade for navbar blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#04040a]/60 to-transparent" />

      {/* === LAYER 3: Neon color haze === */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/[0.04] via-transparent to-neon-purple/[0.06] mix-blend-screen" />

      {/* === LAYER 4: Ambient glow orbs (subtle, behind content) === */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-neon-blue/[0.035] blur-[130px]"
        style={{
          top: "10%",
          left: "5%",
          transform: `translate(${mouseX * 0.12}px, ${mouseY * 0.12}px)`,
        }}
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/[0.04] blur-[110px]"
        style={{
          bottom: "10%",
          right: "10%",
          transform: `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`,
        }}
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-neon-pink/[0.03] blur-[90px]"
        style={{
          top: "40%",
          right: "30%",
          transform: `translate(${mouseX * 0.08}px, ${mouseY * 0.08}px)`,
        }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === LAYER 5: Noise texture === */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* === LAYER 6: Grid pattern === */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `translate(${mouseX * 0.04}px, ${mouseY * 0.04}px)`,
        }}
      />
    </div>
  );
}
