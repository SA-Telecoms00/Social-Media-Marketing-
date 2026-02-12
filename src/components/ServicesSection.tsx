"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, LayoutDashboard, Megaphone, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Settings,
    accentIcon: Sparkles,
    title: "Social Media Account Setup",
    description: "We build your social presence from scratch — optimized profiles, branded visuals, and platform-specific strategies that set you up for explosive growth.",
    features: ["Profile Optimization", "Brand Kit Setup", "Content Calendar", "Platform Strategy"],
    gradient: "from-neon-blue to-neon-cyan",
    glowClass: "glow-blue",
    borderColor: "border-neon-blue/20 hover:border-neon-blue/50",
    iconBg: "bg-neon-blue/10",
    iconColor: "text-neon-blue",
  },
  {
    icon: LayoutDashboard,
    accentIcon: Zap,
    title: "Social Media Page Management",
    description: "Daily content, community management, and growth tactics. We handle everything so you can focus on running your business.",
    features: ["Daily Posting", "Community Management", "Analytics & Reports", "Growth Hacking"],
    gradient: "from-neon-purple to-neon-pink",
    glowClass: "glow-purple",
    borderColor: "border-neon-purple/20 hover:border-neon-purple/50",
    iconBg: "bg-neon-purple/10",
    iconColor: "text-neon-purple",
  },
  {
    icon: Megaphone,
    accentIcon: Target,
    title: "Social Media Advertising Setup",
    description: "Precision-targeted ad campaigns that convert. We set up, optimize, and scale your paid social for maximum ROI.",
    features: ["Ad Campaign Setup", "Audience Targeting", "A/B Testing", "ROI Optimization"],
    gradient: "from-neon-pink to-neon-blue",
    glowClass: "glow-pink",
    borderColor: "border-neon-pink/20 hover:border-neon-pink/50",
    iconBg: "bg-neon-pink/10",
    iconColor: "text-neon-pink",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;
  const AccentIcon = service.accentIcon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-surface/80 backdrop-blur-xl border ${service.borderColor} rounded-3xl p-8 cursor-pointer transition-all duration-300 group overflow-hidden`}
    >
      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl`} />

      {/* Top accent line */}
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative">
        {/* Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${service.iconColor}`} />
          </div>
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            className={`${service.iconColor} opacity-30 group-hover:opacity-60 transition-opacity`}
          >
            <AccentIcon className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 rounded-full bg-surface-light/80 text-xs text-gray-400 border border-surface-border/50"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={`flex items-center gap-2 ${service.iconColor} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background image accent */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/social-icons-3d.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07] blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 mb-6">
            <Zap className="w-4 h-4 text-neon-blue" />
            <span className="text-sm text-neon-blue font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Growth <span className="text-gradient">Modules</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Plug into our growth engine. Each module is designed to accelerate your brand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
