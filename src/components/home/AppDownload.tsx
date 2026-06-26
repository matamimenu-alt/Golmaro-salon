"use client";

import { motion } from "framer-motion";
import { Smartphone, Bell, Calendar, Tag } from "lucide-react";

const FEATURES = [
  { icon: <Calendar className="w-5 h-5" />, title: "Instant Booking", desc: "Book in under 30 seconds" },
  { icon: <Bell className="w-5 h-5" />, title: "Track Appointments", desc: "Reminders & updates" },
  { icon: <Tag className="w-5 h-5" />, title: "App-Only Deals", desc: "Exclusive in-app offers" },
];

export default function AppDownload() {
  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
            <p className="text-glamora-gold font-semibold mb-3 uppercase tracking-wider text-sm">Mobile App</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Beauty Booking <span className="text-gold-gradient">In Your Pocket</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Download the Glamora app and discover hundreds of beauty salons near you. Book, track, and manage your appointments on the go.
            </p>

            <div className="space-y-4 mb-10">
              {FEATURES.map(f => (
                <div key={f.title} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-glamora-gold/20 border border-glamora-gold/30 flex items-center justify-center text-glamora-gold shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{f.title}</p>
                    <p className="text-white/50 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Store Buttons */}
            <div className="flex gap-4 flex-wrap">
              {[
                { store: "App Store", sub: "Download on the", icon: "🍎" },
                { store: "Google Play", sub: "Get it on", icon: "▶" },
              ].map(btn => (
                <button key={btn.store}
                  className="flex items-center gap-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-3 hover:bg-white/20 hover:border-glamora-gold/50 transition-all">
                  <span className="text-2xl">{btn.icon}</span>
                  <div className="text-left">
                    <p className="text-white/50 text-xs">{btn.sub}</p>
                    <p className="text-white font-bold">{btn.store}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 flex justify-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-glamora-gold/20 blur-3xl rounded-full" />
              {/* Phone */}
              <div className="relative w-56 h-[480px] rounded-[3rem] bg-glamora-dark-3 border-4 border-white/10 shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-white/60 text-xs">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1.5 rounded-full bg-white/60" />
                    <div className="w-3 h-1.5 rounded-full bg-white/60" />
                    <div className="w-3 h-1.5 rounded-full bg-white/60" />
                  </div>
                </div>
                {/* Notch */}
                <div className="w-24 h-6 bg-glamora-dark rounded-b-2xl mx-auto -mt-1" />
                {/* Screen content */}
                <div className="px-4 pt-4">
                  <div className="text-center mb-4">
                    <span className="text-gold-gradient font-bold text-lg">Glamora</span>
                  </div>
                  {/* Mock cards */}
                  {[1, 2].map(n => (
                    <div key={n} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 mb-2">
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-glamora-gold/20 shrink-0" />
                        <div className="flex-1">
                          <div className="h-2 bg-white/20 rounded mb-1.5 w-3/4" />
                          <div className="h-2 bg-white/10 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 h-8 rounded-xl bg-gradient-to-r from-glamora-gold to-glamora-pink" />
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-glamora-gold" />
                  <span className="text-white text-sm font-semibold">4.9 ★ on App Store</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
