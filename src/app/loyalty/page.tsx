"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Gift, Zap, Crown, Diamond, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const TIERS = [
  { name: "Bronze", range: "0–999 pts", color: "from-amber-700 to-amber-900", icon: <Star className="w-6 h-6" />, benefits: ["5% points back", "Birthday bonus", "Early access to deals"] },
  { name: "Silver", range: "1K–4.9K pts", color: "from-slate-400 to-slate-600", icon: <Star className="w-6 h-6" />, benefits: ["8% points back", "Priority booking", "Exclusive Silver offers", "Free cancellation"] },
  { name: "Gold", range: "5K–14.9K pts", color: "from-glamora-gold to-amber-600", icon: <Crown className="w-6 h-6" />, benefits: ["12% points back", "Complimentary drink", "Gold member events", "Dedicated support"] },
  { name: "Platinum", range: "15K–49.9K pts", color: "from-purple-400 to-purple-700", icon: <Crown className="w-6 h-6" />, benefits: ["15% points back", "Free add-ons", "Home service discount", "VIP salon access"] },
  { name: "Diamond", range: "50K+ pts", color: "from-cyan-400 to-blue-600", icon: <Diamond className="w-6 h-6" />, benefits: ["20% points back", "Personal beauty advisor", "Private events", "Exclusive Diamond perks"] },
];

const STEPS = [
  { num: "1", title: "Sign Up", desc: "Create your free Beautiva account and automatically join the rewards program." },
  { num: "2", title: "Book Services", desc: "Book any beauty service at participating salons across Saudi Arabia." },
  { num: "3", title: "Earn Points", desc: "Earn 1 point for every SAR 1 spent. Bonus points on special occasions." },
  { num: "4", title: "Redeem Rewards", desc: "Redeem your points for discounts, free services, and exclusive experiences." },
];

const REDEMPTIONS = [
  { title: "SAR 50 Off", points: "500 pts", icon: <Gift className="w-6 h-6" /> },
  { title: "SAR 150 Off", points: "1,500 pts", icon: <Gift className="w-6 h-6" /> },
  { title: "Free Manicure", points: "2,000 pts", icon: <Zap className="w-6 h-6" /> },
  { title: "VIP Upgrade", points: "5,000 pts", icon: <Crown className="w-6 h-6" /> },
];

export default function LoyaltyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full bg-glamora-gold animate-float"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-6">Rewards Program</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gold-gradient">Beautiva</span> Rewards
            </h1>
            <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">Earn points on every booking and unlock exclusive beauty rewards.</p>

            {/* Mock Loyalty Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-block mx-auto">
              <div className="w-80 h-48 rounded-2xl bg-gradient-to-br from-glamora-gold via-glamora-pink to-purple-700 p-6 shadow-2xl shadow-glamora-gold/40 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-white/60 text-xs">GLAMORA REWARDS</p>
                    <p className="text-white font-bold text-lg">Gold Member</p>
                  </div>
                  <Crown className="w-8 h-8 text-white/80" />
                </div>
                <p className="text-white/60 text-xs mb-1">POINTS BALANCE</p>
                <p className="text-white font-bold text-3xl">7,850 pts</p>
                <p className="text-white/60 text-xs mt-2">Sara Al-Mansouri</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-glamora-gold/30">
                  {step.num}
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
                {i < 3 && <ArrowRight className="w-5 h-5 text-glamora-gold/40 absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tiers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Membership Tiers</h2>
          <p className="text-white/50 text-center mb-10">The more you book, the more you earn</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`rounded-2xl p-5 bg-gradient-to-b ${tier.color} bg-opacity-20`}>
                <div className="text-white mb-3">{tier.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{tier.name}</h3>
                <p className="text-white/60 text-xs mb-4">{tier.range}</p>
                <ul className="space-y-1.5">
                  {tier.benefits.map(b => (
                    <li key={b} className="text-white/80 text-xs flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Points Earning Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Points Earning</h2>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto">
            {[
              ["Every SAR 1 spent", "1 point"],
              ["First booking", "+100 bonus points"],
              ["Write a review", "+25 points"],
              ["Refer a friend", "+200 points"],
              ["Birthday month", "2x points"],
              ["Book 5 appointments", "+500 bonus points"],
            ].map(([action, points], i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-4 ${i % 2 === 0 ? "" : "bg-white/5"}`}>
                <span className="text-white/70">{action}</span>
                <span className="text-glamora-gold font-semibold">{points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Redemption Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Redeem Your Points</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {REDEMPTIONS.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-glamora-gold/50 transition-all cursor-pointer">
                <div className="text-glamora-gold mb-3 flex justify-center">{r.icon}</div>
                <h3 className="text-white font-bold mb-1">{r.title}</h3>
                <p className="text-glamora-gold text-sm font-medium">{r.points}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center backdrop-blur-md bg-glamora-gold/10 border border-glamora-gold/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Start Earning Today</h2>
          <p className="text-white/60 mb-8">Sign up free and get 100 bonus points on your first booking.</p>
          <Link href="/salons"><Button size="xl">Book & Earn Points <ArrowRight className="w-5 h-5" /></Button></Link>
        </motion.div>
      </div>
    </div>
  );
}
