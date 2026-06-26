"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Star, Home } from "lucide-react";
import { Salon } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";

interface SalonCardProps {
  salon: Salon;
  index?: number;
}

export default function SalonCard({ salon, index = 0 }: SalonCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all group">
      {/* Cover Image */}
      <div className="relative h-48">
        <Image src={salon.cover} alt={salon.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {salon.isLuxury && <Badge variant="gold">Luxury</Badge>}
          {salon.hasHomeService && (
            <span className="bg-glamora-pink/90 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Home className="w-3 h-3" />Home
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors">
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-glamora-pink text-glamora-pink" : "text-white"}`} />
        </button>

        {/* Logo */}
        <div className="absolute -bottom-5 left-4">
          <div className="relative w-12 h-12 rounded-xl border-2 border-glamora-dark overflow-hidden shadow-lg">
            <Image src={salon.logo} alt={`${salon.name.en} logo`} fill className="object-cover" sizes="48px" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 pt-7">
        <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">{salon.name.en}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Rating value={salon.rating} size="sm" />
          <span className="text-glamora-gold text-sm font-medium">{salon.rating}</span>
          <span className="text-white/40 text-xs">({salon.reviewsCount})</span>
          <span className="ml-auto text-white/50 text-xs font-medium">{salon.priceRange}</span>
        </div>
        <div className="flex items-center gap-1 text-white/50 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{salon.location.en}</span>
        </div>
        <Link href={`/salons/${salon.id}`}>
          <Button size="sm" className="w-full">Book Now</Button>
        </Link>
      </div>
    </motion.div>
  );
}
