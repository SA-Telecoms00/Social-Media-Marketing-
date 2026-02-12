"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Megaphone,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import FooterMetrics from "./FooterMetrics";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Growth", href: "#growth" },
  { label: "Feed", href: "#feed" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { label: "Social Media Account Setup", icon: Settings },
  { label: "Social Media Page Management", icon: LayoutDashboard },
  { label: "Social Media Advertising Setup", icon: Megaphone },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Animated gradient glow line at top */}
      <div className="relative h-px w-full">
        <motion.div
          className="absolute inset-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #00d4ff 20%, #a855f7 50%, #ec4899 80%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 h-4 -top-2 bg-gradient-to-b from-transparent via-neon-purple/10 to-transparent blur-sm" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Background image — neon bokeh city */}
      <div className="absolute inset-0">
        <Image
          src="/neon-bokeh-phone.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.05] blur-sm"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#050510]/90" />
      </div>

      {/* Main footer content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8"
      >
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── COL 1: Brand Block ── */}
          <motion.div variants={fadeUp} className="space-y-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/SaTelecoms-Logo.png"
                alt="SA Telecoms"
                width={38}
                height={38}
                className="rounded-full"
              />
              <span className="text-lg font-bold text-white">
                SA <span className="text-gradient">Telecoms</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Turn scrolls into sales with real-time social growth.
            </p>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <span className="text-xs text-gray-500">Campaign monitoring: <span className="text-neon-green font-medium">Active</span></span>
            </div>

            {/* Live growth mini-module */}
            <div className="pt-2">
              <FooterMetrics />
            </div>
          </motion.div>

          {/* ── COL 2: Quick Links ── */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="h-px w-3 bg-gray-700 group-hover:w-5 group-hover:bg-neon-blue transition-all duration-200" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── COL 3: Services ── */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Services</h4>
            <ul className="space-y-3">
              {services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <li key={svc.label}>
                    <motion.a
                      href="#services"
                      className="group flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4 mt-0.5 text-gray-600 group-hover:text-neon-purple transition-colors shrink-0" />
                      <span>{svc.label}</span>
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* ── COL 4: Contact / Support Panel ── */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Get in Touch</h4>

            {/* Glass card */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm p-4 space-y-3">
              <a
                href="mailto:info@sa-telecoms.co.za"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-gray-600 group-hover:text-neon-blue transition-colors shrink-0" />
                <span>info@sa-telecoms.co.za</span>
              </a>
              <a
                href="tel:+27000000000"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-gray-600 group-hover:text-neon-blue transition-colors shrink-0" />
                <span>+27 XX XXX XXXX</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-gray-600 shrink-0" />
                <span>South Africa</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,212,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white text-sm font-semibold shadow-lg shadow-neon-blue/10 hover:shadow-neon-blue/25 transition-shadow"
              >
                Book a Strategy Call
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-14 mb-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* ── Bottom Bar ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600"
        >
          <p>&copy; {new Date().getFullYear()} SA Telecoms. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>

          <p className="text-gray-700 italic">Built for growth</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
