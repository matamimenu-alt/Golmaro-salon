"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, Zap, Gift, Sparkles, Users } from "lucide-react";
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
    <div className="flex items-center gap-1.5">
      {[{ val: time.h, label: "h" }, { val: time.m, label: "m" }, { val: time.s, label: "s" }].map(({ val, label }) => (
        <div key={label} className="flex items-center gap-1">
          <span className="bg-glamora-dark rounded px-1.5 py-0.5 text-glamora-gold font-mono font-bold text-sm min-w-[28px] text-center">{String(val).padStart(2, "0")}</span>
          <span className="text-white/40 text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

const FILTER_TABS = [
  { id: "all", label: "All", icon: <Tag className="w-4 h-4" /> },
  { id: "flash", label: "Flash Deals", icon: <Zap className="w-4 h-4" /> },
  { id: "packages", label: "Packages", icon: <Gift className="w-4 h-4" /> },
  { id: "seasonal", label: "Seasonal", icon: <Sparkles className="w-4 h-4" /> },
  { id: "new", label: "New Customers", icon: <Users className="w-4 h-4" /> },
];

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [minDiscount, setMinDiscount] = useState(0);

  const now = Date.now();
  const flashDeals = offers.filter(o => new Date(o.expiresAt).getTime() - now < 24 * 3600 * 1000);

  const filtered = offers.filter(o => {
    if (activeTab === "flash") return new Date(o.expiresAt).getTime() - now < 24 * 3600 * 1000;
    if (activeTab === "packages") return o.originalPrice > 800;
    if (activeTab === "seasonal") return o.discount >= 30;
    if (activeTab === "new") return o.discount >= 40;
    return true;
  }).filter(o => o.discount >= minDiscount);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-glamora-gold/30 animate-float"
              style={{ width: `${20 + Math.random() * 40}px`, height: `${20 + Math.random() * 40}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-4 text-sm px-4 py-1">Limited Time</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gold-gradient">Exclusive</span> Offers
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              Handpicked deals on luxury beauty services. Book now before they&apos;re gone.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Today Only Section */}
      {flashDeals.length > 0 && (
        <div className="px-4 pb-8 max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-glamora-gold/10 border border-glamora-gold/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-glamora-gold fill-glamora-gold" />
              <h2 className="text-2xl font-bold text-glamora-gold">Today Only</h2>
              <span className="text-white/50 text-sm">— Ending in less than 24 hours</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashDeals.slice(0, 3).map(o => (
                <div key={o.id} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={o.image} alt={o.title.en} fill className="object-cover" sizes="80px" />
                    <div className="absolute top-1 left-1 bg-glamora-pink text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      -{o.discount}%
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{o.title.en}</p>
                    <p className="text-white/50 text-xs mb-1">{o.salonName}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-glamora-gold font-bold">SAR {o.discountedPrice}</span>
                      <span className="text-white/40 line-through text-xs">SAR {o.originalPrice}</span>
                    </div>
                    <CountdownTimer expiresAt={o.expiresAt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
            <h3 className="text-white font-semibold mb-4">Filter Offers</h3>
            <div className="mb-6">
              <p className="text-white/50 text-sm mb-3">Min. Discount</p>
              {[0, 20, 30, 40, 50].map(d => (
                <label key={d} className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="radio" name="discount" checked={minDiscount === d} onChange={() => setMinDiscount(d)}
                    className="accent-glamora-gold" />
                  <span className="text-white/80 text-sm">{d === 0 ? "Any discount" : `${d}% or more`}</span>
                </label>
              ))}
            </div>
            <div>
              <p className="text-white/50 text-sm mb-3">Price Range</p>
              {["Under SAR 200", "SAR 200-500", "SAR 500-1000", "SAR 1000+"].map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="checkbox" className="accent-glamora-gold" />
                  <span className="text-white/80 text-sm">{r}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {FILTER_TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-glamora-gold to-glamora-pink text-white" : "backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:text-white"}`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <p className="text-white/50 text-sm mb-4">{filtered.length} offers found</p>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((offer, i) => (
              <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all">
                <div className="relative h-48">
                  <Image src={offer.image} alt={offer.title.en} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 bg-glamora-pink text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{offer.discount}%
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white/70 text-xs">{offer.salonName}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 line-clamp-1">{offer.title.en}</h3>
                  <p className="text-white/50 text-sm mb-3 line-clamp-2">{offer.description.en}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-glamora-gold text-xl font-bold">SAR {offer.discountedPrice}</span>
                    <span className="text-white/40 line-through text-sm">SAR {offer.originalPrice}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-white/60 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expires: {new Date(offer.expiresAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <CountdownTimer expiresAt={offer.expiresAt} />
                  </div>
                  <Link href={`/booking?offerId=${offer.id}`}>
                    <Button size="sm" className="w-full">Book Now</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No offers match your filters</p>
              <button onClick={() => { setActiveTab("all"); setMinDiscount(0); }} className="text-glamora-gold text-sm mt-2 hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
