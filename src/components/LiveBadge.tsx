"use client";

import { motion } from "framer-motion";

export default function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
      </span>
      <span className="text-sm text-gray-300 font-medium">Growing brands in real-time</span>
    </motion.div>
  );
}
