"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, MapPin, Star, Heart, Award, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  { icon: <Sparkles className="w-7 h-7" />, value: "500+", label: "Partner Salons" },
  { icon: <Users className="w-7 h-7" />, value: "50K+", label: "Happy Customers" },
  { icon: <MapPin className="w-7 h-7" />, value: "15+", label: "Cities" },
  { icon: <Star className="w-7 h-7" />, value: "4.9", label: "Average Rating" },
];

const TEAM = [
  { name: "Lina Al-Turki", role: "CEO & Co-Founder", seed: "team1" },
  { name: "Sarah Al-Mansouri", role: "CTO", seed: "team2" },
  { name: "Nadia Al-Ghamdi", role: "Head of Partnerships", seed: "team3" },
  { name: "Reem Al-Zahrani", role: "Head of Marketing", seed: "team4" },
  { name: "Hessa Al-Rashid", role: "Lead Designer", seed: "team5" },
  { name: "Mona Al-Dosari", role: "Head of Customer Success", seed: "team6" },
];

const TIMELINE = [
  { year: "2020", title: "Glamora Founded", desc: "Launched in Riyadh with a vision to revolutionize beauty booking in Saudi Arabia." },
  { year: "2021", title: "First 100 Salons", desc: "Reached our milestone of 100 partner salons across Riyadh and Al Khobar." },
  { year: "2022", title: "App Launch", desc: "Launched our iOS and Android app, bringing beauty booking to your fingertips." },
  { year: "2023", title: "Jeddah Expansion", desc: "Expanded to Jeddah and Makkah, connecting thousands of new customers with top salons." },
  { year: "2024", title: "50K Customers", desc: "Celebrated 50,000 happy customers and 500+ partner salons across 15+ cities." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-glamora-gold blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-glamora-pink blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-6">Our Story</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Redefining <span className="text-gold-gradient">Beauty</span> in Saudi Arabia
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Glamora was built on a simple belief: every woman deserves access to world-class beauty services, effortlessly booked from anywhere.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            { icon: <Heart className="w-8 h-8 text-glamora-pink" />, title: "Our Mission", text: "To empower women across Saudi Arabia with seamless access to premium beauty services, fostering confidence and self-expression through technology and trusted partnerships." },
            { icon: <Award className="w-8 h-8 text-glamora-gold" />, title: "Our Vision", text: "To become the Middle East's most trusted beauty platform, setting new standards for luxury, convenience, and quality in the beauty industry." },
          ].map(({ icon, title, text }) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="mb-4">{icon}</div>
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
              <p className="text-white/70 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-glamora-gold mb-3 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-bold text-gold-gradient mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Meet the Team</h2>
          <p className="text-white/50 text-center mb-10">The passionate people behind Glamora</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:-translate-y-1 transition-all">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-glamora-gold/30">
                  <Image src={`https://picsum.photos/seed/${member.seed}/100/100`} alt={member.name} fill className="object-cover" sizes="80px" />
                </div>
                <h3 className="text-white font-semibold text-sm">{member.name}</h3>
                <p className="text-glamora-gold text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-glamora-gold to-glamora-pink hidden md:block" />
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`flex items-center gap-8 mb-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1 md:text-right md:text-left hidden md:block" style={i % 2 !== 0 ? { textAlign: "left" } : { textAlign: "right" }}>
                  {i % 2 === 0 && (
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 inline-block">
                      <h3 className="text-glamora-gold font-bold text-lg">{item.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                    </div>
                  )}
                </div>
                <div className="shrink-0 z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center font-bold text-white shadow-lg shadow-glamora-gold/30">
                    {item.year.slice(2)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-glamora-gold/60 text-xs mb-1">{item.year}</p>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center backdrop-blur-md bg-glamora-gold/10 border border-glamora-gold/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Join the Glamora Family</h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Whether you&apos;re a beauty lover or a salon owner, there&apos;s a place for you in our community.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/salons"><Button size="lg">Explore Salons <ArrowRight className="w-5 h-5" /></Button></Link>
            <Link href="/partner"><Button size="lg" variant="outline">List Your Salon</Button></Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
