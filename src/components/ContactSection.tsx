"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate submission — replace with real API call
    setTimeout(() => {
      setFormState("sent");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setFormState("idle"), 4000);
    }, 1500);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/25 transition-all backdrop-blur-sm";

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/20 mb-6">
            <Mail className="w-4 h-4 text-neon-blue" />
            <span className="text-sm text-neon-blue font-medium">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-gradient">Grow Together</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Ready to transform your social media presence? Drop us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-surface/80 backdrop-blur-xl border border-surface-border rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>

              <a
                href="mailto:info@sa-telecoms.co.za"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                  <Mail className="w-4 h-4 text-neon-blue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p>info@sa-telecoms.co.za</p>
                </div>
              </a>

              <a
                href="tel:+27000000000"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <Phone className="w-4 h-4 text-neon-purple" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p>+27 XX XXX XXXX</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-neon-pink" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p>South Africa</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="bg-surface/80 backdrop-blur-xl border border-surface-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                {[
                  { name: "Instagram", href: "#", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" },
                  { name: "TikTok", href: "#", path: "M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" },
                  { name: "Facebook", href: "#", path: "M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10Z" },
                  { name: "LinkedIn", href: "#", path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-neon-blue/30 hover:bg-neon-blue/10 transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-surface/80 backdrop-blur-xl border border-surface-border rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+27 XX XXX XXXX"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClasses} ${!form.service ? "text-gray-500" : ""}`}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="account-setup">Social Media Account Setup</option>
                    <option value="page-management">Social Media Page Management</option>
                    <option value="advertising">Social Media Advertising Setup</option>
                    <option value="full-package">Full Growth Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your brand and goals..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState !== "idle"}
                whileHover={formState === "idle" ? { scale: 1.02 } : {}}
                whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  formState === "sent"
                    ? "bg-neon-green/20 border border-neon-green/30"
                    : "bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink hover:shadow-lg hover:shadow-neon-blue/20"
                } disabled:opacity-70`}
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-neon-green" />
                    <span className="text-neon-green">Message Sent!</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
