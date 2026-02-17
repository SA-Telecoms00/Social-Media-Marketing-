"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Calendar, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Image from "next/image";

function MomentumSparkline() {
  const [data, setData] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initial = Array.from({ length: 10 }, (_, i) =>
      10 + (i / 10) * 14 + Math.random() * 6
    );
    setData(initial);

    timerRef.current = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push(Math.max(4, Math.min(28, last + (Math.random() - 0.35) * 5)));
        return next;
      });
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (data.length === 0) return null;

  const w = 64;
  const h = 24;
  const stepX = w / (data.length - 1);
  const pathData = data
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - y}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id="cta-spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathData} L ${(data.length - 1) * stepX} ${h} L 0 ${h} Z`}
        fill="url(#cta-spark-grad)"
      />
      <path
        d={pathData}
        fill="none"
        stroke="#00d4ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={(data.length - 1) * stepX}
        cy={h - data[data.length - 1]}
        r="2"
        fill="#00d4ff"
      >
        <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function LiveMomentumModule({ isInView }: { isInView: boolean }) {
  const [followers, setFollowers] = useState(143);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setFollowers((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
        </span>
        <span className="text-xs text-gray-400">Live campaigns running</span>
      </div>

      <div className="w-px h-4 bg-white/[0.08]" />

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-white font-mono">+{followers}</span>
        <span className="text-xs text-gray-500">followers today</span>
      </div>

      <div className="hidden sm:block w-px h-4 bg-white/[0.08]" />

      <div className="hidden sm:block">
        <MomentumSparkline />
      </div>
    </motion.div>
  );
}

function SocialProofBar({ isInView }: { isInView: boolean }) {
  const platforms = [
    { name: "Instagram", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" },
    { name: "TikTok", path: "M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" },
    { name: "Meta", path: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10Z" },
    { name: "LinkedIn", path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.3 }}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-[11px] text-gray-600 uppercase tracking-widest">Campaigns running on</span>
      <div className="flex items-center gap-5">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 0.35, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.4 + i * 0.08 }}
            whileHover={{ opacity: 0.7, scale: 1.1 }}
            className="transition-all cursor-default"
            title={p.name}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
              <path d={p.path} />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `New enquiry from ${formData.name || "Website Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:info@sa-telecoms.co.za?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-neon-blue/40 focus:bg-white/[0.06] transition-all backdrop-blur-sm";

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/20 flex items-center justify-center">
          <Send className="w-4 h-4 text-neon-blue" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Send Us a Message</h3>
          <p className="text-xs text-gray-500">We&apos;ll respond within 24 hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs text-gray-500 mb-1.5 ml-1">
              Full Name *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs text-gray-500 mb-1.5 ml-1">
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="john@company.co.za"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-phone" className="block text-xs text-gray-500 mb-1.5 ml-1">
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="072 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-service" className="block text-xs text-gray-500 mb-1.5 ml-1">
              Service Interested In
            </label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#120830]">Select a service...</option>
              <option value="Social Media Account Setup" className="bg-[#120830]">Social Media Account Setup</option>
              <option value="Social Media Page Management" className="bg-[#120830]">Social Media Page Management</option>
              <option value="Social Media Advertising" className="bg-[#120830]">Social Media Advertising</option>
              <option value="Full Growth Package" className="bg-[#120830]">Full Growth Package</option>
              <option value="Other" className="bg-[#120830]">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs text-gray-500 mb-1.5 ml-1">
            Your Message *
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            placeholder="Tell us about your brand and what you'd like to achieve..."
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className={`${inputClass} resize-none`}
          />
        </div>

        <motion.button
          type="submit"
          disabled={submitted}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,212,255,0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full px-6 py-4 rounded-xl text-white font-bold text-base shadow-xl shadow-neon-blue/10 hover:shadow-neon-blue/25 transition-shadow flex items-center justify-center gap-2 overflow-hidden disabled:opacity-70"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10">
            {submitted ? "Opening Email Client..." : "Send Message"}
          </span>
          {!submitted && (
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </motion.button>
      </form>
    </div>
  );
}

export default function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative py-32 sm:py-40 px-6 overflow-hidden">
      {/* === LAYER 0: Multi-layer animated gradient background === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06041a] via-[#120830] to-[#08061e]" />

      {/* Secondary gradient layer for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === LAYER 1: Neon light background image === */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/neon-prism.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12] mix-blend-screen"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06041a]/70 via-transparent to-[#06041a]/80" />
      </div>

      {/* === LAYER 2: Moving light streaks === */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        <motion.div
          className="absolute w-[600px] h-[2px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"
          style={{ top: "25%", left: "-30%" }}
          animate={{ left: ["-30%", "130%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        />
        <motion.div
          className="absolute w-[400px] h-[1px] bg-gradient-to-r from-transparent via-neon-purple/15 to-transparent"
          style={{ top: "60%", right: "-20%" }}
          animate={{ right: ["-20%", "120%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatDelay: 4, delay: 2 }}
        />
        <motion.div
          className="absolute w-[500px] h-[1px] bg-gradient-to-r from-transparent via-neon-pink/10 to-transparent"
          style={{ bottom: "30%", left: "-25%" }}
          animate={{ left: ["-25%", "125%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatDelay: 2, delay: 5 }}
        />
      </motion.div>

      {/* === LAYER 3: Animated orbs === */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-neon-blue/[0.07] blur-[140px]"
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-25%", left: "15%" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/[0.08] blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-15%", right: "15%" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-neon-pink/[0.05] blur-[100px]"
        animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "35%", right: "8%" }}
      />

      {/* === LAYER 4: Radial glow behind headline === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* === LAYER 5: Vignette === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(6,4,26,0.6) 100%)",
        }}
      />

      {/* === LAYER 6: Noise texture === */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* === LAYER 7: Grid overlay === */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ============================================= */}
      {/* CONTENT                                       */}
      {/* ============================================= */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* === HEADLINE: Centered === */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Let&apos;s <span className="text-gradient">Get In Touch</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            Ready to grow your brand? Fill out the form or reach out directly — we&apos;ll get back to you within 24 hours.
          </motion.p>

          <div className="mt-6 flex justify-center">
            <LiveMomentumModule isInView={isInView} />
          </div>
        </div>

        {/* === TWO-COLUMN: Form + Contact Details === */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* ── LEFT: Contact Form (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          {/* ── RIGHT: Contact Details (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Contact info card */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl p-6 space-y-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Contact Details</h3>

              <div className="space-y-4">
                <a
                  href="mailto:info@sa-telecoms.co.za"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0 group-hover:bg-neon-blue/20 transition-colors">
                    <Mail className="w-4 h-4 text-neon-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p>info@sa-telecoms.co.za</p>
                  </div>
                </a>

                <a
                  href="tel:+27723446517"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center shrink-0 group-hover:bg-neon-purple/20 transition-colors">
                    <Phone className="w-4 h-4 text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p>072 344 6517</p>
                  </div>
                </a>

                <a
                  href="tel:+27760326170"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center shrink-0 group-hover:bg-neon-purple/20 transition-colors">
                    <Phone className="w-4 h-4 text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p>076 032 6170</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/27760326170"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p>Chat with us</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-neon-pink/10 border border-neon-pink/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-neon-pink" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p>South Africa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <motion.a
              href="mailto:info@sa-telecoms.co.za?subject=I%20want%20to%20book%20a%20strategy%20call"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168,85,247,0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-white/[0.04] border border-white/[0.07] text-gray-300 hover:text-white hover:border-neon-purple/30 font-semibold transition-all backdrop-blur-sm"
            >
              <Calendar className="w-5 h-5" />
              Book a Strategy Call
            </motion.a>

            {/* Social proof */}
            <SocialProofBar isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
