"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoyaltyBanner() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-glamora-gold via-amber-500 to-glamora-pink p-8 md:p-12">
          {/* Animated background elements */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute opacity-20 animate-float"
              style={{ right: `${5 + i * 12}%`, top: `${10 + (i % 3) * 30}%`, animationDelay: `${i * 0.7}s` }}>
              {i % 2 === 0 ? <Star className="w-6 h-6 text-white fill-white" /> : <Crown className="w-5 h-5 text-white" />}
            </div>
          ))}

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Crown className="w-8 h-8 text-white" />
                <span className="text-white/80 font-medium text-sm uppercase tracking-wider">Glamora Rewards</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Earn Points on Every Booking
              </h2>
              <p className="text-white/80 text-lg mb-4">
                <span className="bg-white/20 rounded-lg px-3 py-1 font-bold">1 SAR = 1 Point</span>
                &nbsp; Redeem for free services and exclusive rewards
              </p>
              <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                {["Bronze → Silver → Gold → Platinum → Diamond", "Bonus points on birthdays", "Refer friends, earn more"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Link href="/loyalty">
                <Button variant="white" size="lg" className="flex items-center gap-2 shadow-2xl">
                  Join Rewards <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
