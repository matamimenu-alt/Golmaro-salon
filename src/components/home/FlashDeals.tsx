"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { offers } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setTime({ h: 0, m: 0, s: 0 }); return; }
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);
  return (
    <div className="flex items-center gap-1">
      {[{ val: time.h, label: "h" }, { val: time.m, label: "m" }, { val: time.s, label: "s" }].map(({ val, label }) => (
        <div key={label} className="flex items-center gap-0.5">
          <span className="bg-glamora-dark rounded px-1 py-0.5 text-glamora-gold font-mono font-bold text-xs min-w-[22px] text-center">{String(val).padStart(2, "0")}</span>
          <span className="text-white/40 text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FlashDeals() {
  const now = Date.now();
  const flashOffers = offers.filter(o => new Date(o.expiresAt).getTime() - now < 24 * 3600 * 1000);

  if (flashOffers.length === 0) return null;

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-glamora-pink/20 border border-glamora-pink/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-glamora-pink fill-glamora-pink" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Flash Deals</h2>
              <p className="text-white/50 text-sm">Ending soon — grab them before they&apos;re gone!</p>
            </div>
          </div>
          <Link href="/offers"><Button variant="outline" size="sm">View All</Button></Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {flashOffers.map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden shrink-0 w-64 hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-pink/20 transition-all">
              <div className="relative h-40">
                <Image src={offer.image} alt={offer.title.en} fill className="object-cover" sizes="256px" />
                <div className="absolute top-3 left-3 bg-glamora-pink text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" />-{offer.discount}%
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <p className="text-white font-semibold text-sm line-clamp-1 mb-0.5">{offer.title.en}</p>
                <p className="text-white/50 text-xs mb-2">{offer.salonName}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-glamora-gold font-bold">SAR {offer.discountedPrice}</span>
                  <span className="text-white/40 line-through text-xs">SAR {offer.originalPrice}</span>
                </div>
                <CountdownTimer expiresAt={offer.expiresAt} />
                <Link href={`/booking?offerId=${offer.id}`} className="block mt-3">
                  <Button size="sm" variant="pink" className="w-full">Book Now</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
