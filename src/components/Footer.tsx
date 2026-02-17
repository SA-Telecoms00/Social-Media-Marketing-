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

            {/* Social media links */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {[
                { name: "Facebook", href: "https://www.facebook.com/satelecoms", path: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10Z" },
                { name: "X (Twitter)", href: "https://twitter.com/@SATelecoms2014/", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { name: "LinkedIn", href: "https://za.linkedin.com/company/sa-telecoms", path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" },
                { name: "YouTube", href: "https://youtube.com/@satelecoms7330", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { name: "TikTok", href: "https://www.tiktok.com/@satelecoms_sa", path: "M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" },
                { name: "WhatsApp", href: "https://wa.me/27760326170", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-600 hover:text-white hover:border-neon-blue/30 hover:bg-neon-blue/10 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

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
                href="tel:+27723446517"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-gray-600 group-hover:text-neon-blue transition-colors shrink-0" />
                <span>072 344 6517</span>
              </a>
              <a
                href="tel:+27760326170"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-gray-600 group-hover:text-neon-blue transition-colors shrink-0" />
                <span>076 032 6170</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-gray-600 shrink-0" />
                <span>South Africa</span>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

              <motion.a
                href="mailto:info@sa-telecoms.co.za?subject=I%20want%20to%20book%20a%20strategy%20call"
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
            <a href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>

          <p className="text-gray-700 italic">Built for growth</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
