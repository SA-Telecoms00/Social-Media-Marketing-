"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Rocket, Users, Award, CheckCircle2 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import Image from "next/image";

const proofMetrics = [
  {
    icon: TrendingUp,
    value: 320,
    suffix: "%",
    prefix: "+",
    label: "Average Reach Increase",
    description: "Our clients see massive reach growth within the first 90 days",
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    borderColor: "border-neon-blue/20",
  },
  {
    icon: Rocket,
    value: 5,
    suffix: "x",
    prefix: "",
    label: "Engagement Multiplier",
    description: "We don't just post — we create conversations that convert",
    color: "text-neon-purple",
    bgColor: "bg-neon-purple/10",
    borderColor: "border-neon-purple/20",
  },
  {
    icon: Users,
    value: 2.8,
    suffix: "x",
    prefix: "",
    decimals: 1,
    label: "Lead Generation Boost",
    description: "Turn followers into customers with strategic content funnels",
    color: "text-neon-pink",
    bgColor: "bg-neon-pink/10",
    borderColor: "border-neon-pink/20",
  },
];

const timeline = [
  { week: "Week 1-2", title: "Audit & Strategy", description: "Deep-dive into your brand, audience, and competitors" },
  { week: "Week 3-4", title: "Setup & Launch", description: "Optimized profiles, content calendar, and first campaigns go live" },
  { week: "Month 2", title: "Growth Phase", description: "Engagement tactics, community building, and paid amplification" },
  { week: "Month 3+", title: "Scale & Optimize", description: "Data-driven optimization, scaling what works, and compounding growth" },
];

export default function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background image accent */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/phone-apps-dark.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.06] blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 mb-6">
            <Award className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-neon-green font-medium">Proof Over Promises</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="text-gradient">SA Telecoms</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Numbers don&apos;t lie. Here&apos;s what happens when you partner with us.
          </p>
        </motion.div>

        {/* Proof metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {proofMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`bg-surface/80 backdrop-blur-xl border ${metric.borderColor} rounded-3xl p-8 text-center group cursor-default transition-all duration-300`}
              >
                <div className={`w-16 h-16 rounded-2xl ${metric.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div className={`text-5xl md:text-6xl font-bold ${metric.color} mb-2 font-mono`}>
                  <AnimatedCounter
                    target={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={(metric as { decimals?: number }).decimals || 0}
                    duration={2500}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{metric.label}</h3>
                <p className="text-sm text-gray-400">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Growth timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Your Growth <span className="text-gradient">Timeline</span>
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

            <div className="space-y-8">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-surface border-2 border-neon-blue/40 flex items-center justify-center group-hover:border-neon-blue group-hover:shadow-lg group-hover:shadow-neon-blue/20 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                    </div>
                  </div>
                  <div className="pb-2">
                    <span className="text-xs font-bold text-neon-blue uppercase tracking-wider">{step.week}</span>
                    <h4 className="text-lg font-semibold text-white mt-1">{step.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
