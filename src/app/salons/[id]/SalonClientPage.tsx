"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Star, Heart, Share2, MessageCircle,
  Navigation, Clock, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Avatar } from "@/components/ui/Avatar";
import type { Salon, Review } from "@/lib/data";
import { cn } from "@/lib/utils";

type TabType = "services" | "staff" | "reviews" | "info";

interface SalonClientPageProps {
  salon: Salon;
  salonReviews: Review[];
  allReviews: Review[];
}

export default function SalonClientPage({ salon, salonReviews, allReviews }: SalonClientPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("services");
  const [wishlisted, setWishlisted] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: "services", label: "Services" },
    { id: "staff", label: "Staff" },
    { id: "reviews", label: `Reviews (${salonReviews.length || salon.reviewsCount})` },
    { id: "info", label: "Info" },
  ];

  const ratingBreakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    percent: stars === 5 ? 55 : stars === 4 ? 30 : stars === 3 ? 10 : stars === 2 ? 3 : 2,
  }));

  return (
    <div className="min-h-screen bg-glamora-dark pt-16">
      {/* Cover */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <Image src={salon.cover} alt={salon.name.en} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-glamora-dark/30 via-transparent to-glamora-dark" />
        <div className="absolute top-4 left-4">
          <Link href="/salons">
            <button className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 hover:text-white text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => setWishlisted(!wishlisted)} className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Heart className={cn("w-4 h-4", wishlisted ? "fill-glamora-pink text-glamora-pink" : "text-white/80")} />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        {/* Salon header */}
        <div className="bg-glamora-dark-2 border border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-glamora-gold/50 flex-shrink-0">
              <Image src={salon.logo} alt={salon.name.en} width={80} height={80} className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">{salon.name.en}</h1>
                  <p className="text-white/50 text-sm" dir="rtl">{salon.name.ar}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {salon.isLuxury && <Badge variant="gold">✨ Luxury</Badge>}
                  <Badge variant="outline">{salon.priceRange}</Badge>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Rating value={salon.rating} size="sm" showValue />
                  <span className="text-white/50 text-xs">({salon.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-sm">
                  <MapPin className="w-4 h-4 text-glamora-gold" />
                  {salon.location.en}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <a href={`https://wa.me/${salon.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="sm">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </Button>
            </a>
            <a href={`https://instagram.com/${salon.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90" size="sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> Instagram
              </Button>
            </a>
            <a href={`tel:${salon.phone}`}>
              <Button variant="dark" size="sm" className="w-full"><Phone className="w-4 h-4" /> Call</Button>
            </a>
            <Button variant="dark" size="sm" className="w-full">
              <Navigation className="w-4 h-4" /> Directions
            </Button>
          </div>
        </div>

        {/* Gallery */}
        {salon.gallery.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-2">
              {salon.gallery.slice(0, 4).map((img, i) => (
                <div key={i} className={cn("relative rounded-xl overflow-hidden cursor-pointer", i === 0 ? "col-span-2 row-span-2 h-48" : "h-24")}>
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="300px" />
                  {i === 3 && salon.gallery.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">+{salon.gallery.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-white mb-2">About</h2>
          <p className="text-white/60 text-sm leading-relaxed">{salon.description.en}</p>
          <p className="text-white/40 text-sm leading-relaxed mt-2" dir="rtl">{salon.description.ar}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-20">
          <div className="flex border-b border-white/10 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 px-5 py-3.5 text-sm font-medium transition-all border-b-2",
                  activeTab === tab.id ? "border-glamora-gold text-glamora-gold" : "border-transparent text-white/60 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-5">
            {activeTab === "services" && (
              <div className="space-y-3">
                {salon.services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/8 transition-all group">
                    <div>
                      <p className="text-white font-medium text-sm">{service.name.en}</p>
                      <p className="text-white/40 text-xs" dir="rtl">{service.name.ar}</p>
                      <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{service.duration} min
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-glamora-gold font-bold">SAR {service.price}</span>
                      <Link href="/booking">
                        <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Book</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "staff" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {salon.staff.map(member => (
                  <div key={member.id} className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/8 transition-all">
                    <Avatar src={member.photo} name={member.name} size="lg" className="mx-auto mb-3" />
                    <p className="text-white font-medium text-sm">{member.name}</p>
                    <p className="text-glamora-gold text-xs mb-1">{member.role.en}</p>
                    <p className="text-white/50 text-xs mb-2">{member.specialty}</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-glamora-gold text-glamora-gold" />
                      <span className="text-glamora-gold text-xs">{member.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-white/10">
                  <div className="text-center flex-shrink-0">
                    <div className="text-6xl font-bold text-glamora-gold">{salon.rating}</div>
                    <Rating value={salon.rating} size="md" className="justify-center my-2" />
                    <p className="text-white/50 text-sm">{salon.reviewsCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {ratingBreakdown.map(({ stars, percent }) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-white/60 text-xs w-8 text-right">{stars}★</span>
                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-glamora-gold rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-white/50 text-xs w-8">{percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {(salonReviews.length > 0 ? salonReviews : allReviews.slice(0, 3)).map(review => (
                    <div key={review.id} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar src={review.customerAvatar} name={review.customerName} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-white font-medium text-sm">{review.customerName}</p>
                            <span className="text-white/40 text-xs">{review.date}</span>
                          </div>
                          <Rating value={review.rating} size="sm" className="mt-1" />
                        </div>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{review.comment.en}</p>
                      <p className="text-white/40 text-xs">{review.service}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-glamora-gold" /> Working Hours</h3>
                  <div className="space-y-2">
                    {salon.workingHours.map(wh => (
                      <div key={wh.day} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-white/70 text-sm">{wh.day}</span>
                        {wh.isOpen ? (
                          <span className="text-white/80 text-sm">{wh.open} – {wh.close}</span>
                        ) : (
                          <span className="text-red-400 text-sm">Closed</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Phone className="w-4 h-4 text-glamora-gold" /> Contact</h3>
                  <div className="space-y-2 text-white/70 text-sm">
                    <p>{salon.phone}</p>
                    <p>{salon.instagram}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-glamora-gold" />{salon.location.en}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {salon.tags.map(tag => (
                    <Badge key={tag} variant="outline">#{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Book Now */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-glamora-dark via-glamora-dark/90 to-transparent pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <Link href="/booking">
            <Button size="xl" className="w-full shadow-xl shadow-glamora-gold/20">
              Book Now at {salon.name.en}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
