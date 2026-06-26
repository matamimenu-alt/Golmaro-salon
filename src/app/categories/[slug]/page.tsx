"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { categories, getSalonsByCategory } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

// generateStaticParams removed — page uses client-side routing

const POPULAR_SERVICES: Record<string, string[]> = {
  hair: ["Balayage", "Keratin Treatment", "Hair Color", "Blowout", "Hair Extensions"],
  nails: ["Gel Manicure", "Acrylic Full Set", "Nail Art", "Pedicure", "Dip Powder"],
  makeup: ["Bridal Makeup", "Evening Makeup", "Airbrush Makeup", "Natural Look", "Contouring"],
  skincare: ["HydraFacial", "Chemical Peel", "Microneedling", "LED Therapy", "Facial"],
  eyebrows: ["Microblading", "Eyebrow Lamination", "Henna Brows", "Threading", "Tinting"],
  lashes: ["Volume Lash Set", "Classic Lashes", "Hybrid Set", "Mega Volume", "Lash Lift"],
  massage: ["Swedish Massage", "Hot Stone Therapy", "Aromatherapy", "Deep Tissue", "Reflexology"],
  bridal: ["Bridal Package", "Bridal Makeup", "Hair Styling", "Henna", "Pre-Bridal Facial"],
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find(c => c.id === slug);
  const salons = getSalonsByCategory(slug);
  const services = POPULAR_SERVICES[slug] || [];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={`relative py-20 px-4 bg-gradient-to-br ${category.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-glamora-dark/70" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-4">{category.count} Salons</Badge>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-gold-gradient">{category.name.en}</span> Services
            </h1>
            <p className="text-white/70 text-lg">
              Discover the best {category.name.en.toLowerCase()} salons in Saudi Arabia
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Popular Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Services</h2>
          <div className="flex flex-wrap gap-3">
            {services.map(s => (
              <span key={s} className="backdrop-blur-md bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-sm hover:border-glamora-gold/50 hover:text-glamora-gold cursor-pointer transition-all">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Salons Grid */}
        <h2 className="text-2xl font-bold text-white mb-6">
          {salons.length > 0 ? `${salons.length} Salons Found` : "Top Salons"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon, i) => (
            <motion.div key={salon.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all">
              <div className="relative h-44">
                <Image src={salon.cover} alt={salon.name.en} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {salon.isLuxury && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">Luxury</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1">{salon.name.en}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Rating value={salon.rating} size="sm" />
                  <span className="text-glamora-gold text-sm font-medium">{salon.rating}</span>
                  <span className="text-white/40 text-xs">({salon.reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{salon.location.en}</span>
                </div>
                <Link href={`/salons/${salon.id}`}>
                  <Button size="sm" className="w-full">View Salon</Button>
                </Link>
              </div>
            </motion.div>
          ))}
          {salons.length === 0 && (
            <div className="col-span-3 text-center py-20">
              <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No salons found for this category yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
