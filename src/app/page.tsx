"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Scissors, Sparkles, Heart, Eye, Star, Zap, Crown,
  MapPin, ChevronRight, ArrowRight, Clock,
  Building2, Percent, Search, Calendar,
  CheckCircle, Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Avatar } from "@/components/ui/Avatar";
import { salons, categories, offers, reviews, packages, blogPosts, getFeaturedSalons } from "@/lib/data";
import { cn } from "@/lib/utils";

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setTime({ h: 0, m: 0, s: 0 }); return; }
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="flex items-center gap-1.5">
      {[
        { val: time.h, label: "h" },
        { val: time.m, label: "m" },
        { val: time.s, label: "s" },
      ].map(({ val, label }) => (
        <div key={label} className="flex items-center gap-1">
          <span className="bg-glamora-dark rounded px-1.5 py-0.5 text-glamora-gold font-mono font-bold text-sm min-w-[28px] text-center">
            {String(val).padStart(2, "0")}
          </span>
          <span className="text-white/40 text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

type SalonType = ReturnType<typeof getFeaturedSalons>[0];

function SalonCard({ salon, index }: { salon: SalonType; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={salon.cover}
          alt={salon.name.en}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark/80 to-transparent" />
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart className={cn("w-4 h-4 transition-colors", wishlisted ? "fill-glamora-pink text-glamora-pink" : "text-white")} />
        </button>
        <div className="absolute top-3 left-3 flex gap-1.5">
          {salon.isLuxury && <Badge variant="gold">✨ Luxury</Badge>}
          {salon.hasHomeService && <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">🏠 Home</Badge>}
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-glamora-gold/50">
            <Image src={salon.logo} alt={salon.name.en} width={40} height={40} className="object-cover" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white text-sm">{salon.name.en}</h3>
            <p className="text-white/50 text-xs" dir="rtl">{salon.name.ar}</p>
          </div>
          <span className="text-white/40 text-xs font-mono">{salon.priceRange}</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <Rating value={salon.rating} size="sm" />
          <span className="text-glamora-gold text-xs font-semibold">{salon.rating}</span>
          <span className="text-white/40 text-xs">({salon.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-1 text-white/50 text-xs mb-4">
          <MapPin className="w-3 h-3" />
          <span>{salon.location.en}</span>
        </div>
        <Link href={`/salons/${salon.id}`}>
          <Button size="sm" className="w-full">Book Now</Button>
        </Link>
      </div>
    </motion.div>
  );
}

const heroSlides = [
  {
    id: 1,
    title: "Your Beauty,",
    titleAccent: "Your Way",
    subtitle: "Book premium beauty services at 500+ luxury salons across Saudi Arabia",
    subtitleAr: "احجزي خدمات تجميل فاخرة في أكثر من ٥٠٠ صالون في المملكة العربية السعودية",
    image: "https://picsum.photos/seed/hero1/1920/1080",
    cta: "Book Now",
    ctaSecondary: "Explore Salons",
  },
  {
    id: 2,
    title: "Luxury Beauty",
    titleAccent: "Experience",
    subtitle: "Discover Riyadh's finest salons with exclusive deals and VIP treatment",
    subtitleAr: "اكتشفي أفضل صالونات الرياض مع عروض حصرية ومعاملة VIP",
    image: "https://picsum.photos/seed/hero2/1920/1080",
    cta: "View Offers",
    ctaSecondary: "Learn More",
  },
  {
    id: 3,
    title: "Bridal Dreams",
    titleAccent: "Come True",
    subtitle: "Complete bridal packages from Riyadh's top makeup artists and stylists",
    subtitleAr: "باقات عرائس كاملة من أفضل فناني المكياج والمصففين في الرياض",
    image: "https://picsum.photos/seed/hero3/1920/1080",
    cta: "Bridal Packages",
    ctaSecondary: "View Salons",
  },
];

const categoryIcons: Record<string, React.ElementType> = {
  hair: Scissors,
  nails: Sparkles,
  makeup: Star,
  skincare: Heart,
  eyebrows: Eye,
  lashes: Zap,
  massage: Crown,
  bridal: Crown,
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredSalons = getFeaturedSalons();
  const topRated = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="min-h-screen bg-glamora-dark">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt="Hero"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-glamora-dark/70 via-glamora-dark/50 to-glamora-dark" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-glamora-gold/10 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-glamora-pink/10 blur-3xl animate-float-delay pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center w-full">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-glamora-gold/10 border border-glamora-gold/30 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-glamora-gold" />
              <span className="text-glamora-gold text-sm font-medium">Saudi Arabia&apos;s #1 Beauty Marketplace</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block">{heroSlides[currentSlide].title}</span>
              <span className="block text-gold-gradient">{heroSlides[currentSlide].titleAccent}</span>
            </h1>

            <p className="text-white/60 text-base mb-2" dir="rtl">
              {heroSlides[currentSlide].subtitleAr}
            </p>
            <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/booking">
                <Button size="xl" className="w-full sm:w-auto shadow-xl shadow-glamora-gold/20">
                  <Calendar className="w-5 h-5" />
                  {heroSlides[currentSlide].cta}
                </Button>
              </Link>
              <Link href="/salons">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  {heroSlides[currentSlide].ctaSecondary}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-4 py-3">
                <Search className="w-4 h-4 text-glamora-gold flex-shrink-0" />
                <input placeholder="Service or salon..." className="bg-transparent text-white placeholder:text-white/30 text-sm outline-none w-full" />
              </div>
              <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-4 py-3 border-l border-white/10">
                <MapPin className="w-4 h-4 text-glamora-gold flex-shrink-0" />
                <input placeholder="Location in Riyadh..." className="bg-transparent text-white placeholder:text-white/30 text-sm outline-none w-full" />
              </div>
              <Button className="px-6 flex-shrink-0">Search</Button>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === currentSlide ? "w-8 h-2 bg-glamora-gold" : "w-2 h-2 bg-white/30"
                )}
              />
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-glamora-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Browse by <span className="text-gold-gradient">Category</span></h2>
            <p className="text-white/50">Find your perfect beauty service</p>
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((cat, i) => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              return (
                <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -4 }} className="flex-shrink-0">
                  <Link href={`/salons?category=${cat.id}`}>
                    <div className="w-28 sm:w-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-glamora-gold/40 transition-all duration-300 cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium text-sm">{cat.name.en}</p>
                        <p className="text-white/50 text-xs" dir="rtl">{cat.name.ar}</p>
                        <p className="text-glamora-gold text-xs mt-1">{cat.count}+</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED SALONS */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured <span className="text-gold-gradient">Salons</span></h2>
              <p className="text-white/50">Hand-picked top salons in Riyadh</p>
            </motion.div>
            <Link href="/salons"><Button variant="outline" size="sm" className="hidden sm:flex">View All <ChevronRight className="w-4 h-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSalons.map((salon, i) => <SalonCard key={salon.id} salon={salon} index={i} />)}
          </div>
          <div className="text-center mt-8">
            <Link href="/salons"><Button variant="outline" size="lg">Explore All 500+ Salons <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      {/* TODAY'S OFFERS */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 text-xs font-medium">Limited Time Deals</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Today&apos;s <span className="text-gold-gradient">Offers</span></h2>
              <p className="text-white/50">Flash deals ending soon!</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {offers.slice(0, 8).map((offer, i) => (
              <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <Image src={offer.image} alt={offer.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark/90 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Percent className="w-3 h-3" />{offer.discount}% OFF
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-1">{offer.title.en}</h3>
                  <p className="text-white/50 text-xs mb-3">{offer.salonName}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-glamora-gold font-bold">SAR {offer.discountedPrice}</span>
                      <span className="text-white/30 text-xs line-through ml-2">SAR {offer.originalPrice}</span>
                    </div>
                  </div>
                  <CountdownTimer expiresAt={offer.expiresAt} />
                  <Link href={`/salons/${offer.salonId}`}>
                    <Button size="sm" className="w-full mt-3">Grab Deal</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Popular <span className="text-gold-gradient">Services</span></h2>
            <p className="text-white/50">Most-booked beauty services right now</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Scissors, name: "Balayage", count: "2.3k bookings", color: "from-amber-500 to-orange-600" },
              { icon: Sparkles, name: "Gel Manicure", count: "1.8k bookings", color: "from-pink-500 to-rose-600" },
              { icon: Star, name: "Bridal Makeup", count: "1.2k bookings", color: "from-purple-500 to-violet-600" },
              { icon: Heart, name: "HydraFacial", count: "980 bookings", color: "from-emerald-500 to-teal-600" },
              { icon: Eye, name: "Microblading", count: "870 bookings", color: "from-blue-500 to-cyan-600" },
              { icon: Zap, name: "Lash Extensions", count: "760 bookings", color: "from-red-500 to-pink-600" },
              { icon: Crown, name: "Swedish Massage", count: "650 bookings", color: "from-teal-500 to-green-600" },
              { icon: Scissors, name: "Keratin Treatment", count: "540 bookings", color: "from-yellow-500 to-amber-600" },
            ].map((service, i) => (
              <motion.div key={service.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }} whileHover={{ scale: 1.03, y: -3 }}>
                <Link href="/salons">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3 hover:border-glamora-gold/30 transition-all duration-300 cursor-pointer text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{service.name}</p>
                      <p className="text-glamora-gold text-xs">{service.count}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY COLLECTION BANNER */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden min-h-80">
            <Image src="https://picsum.photos/seed/luxury-banner/1400/600" alt="Luxury Collection" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-glamora-dark via-glamora-dark/70 to-transparent" />
            <div className="relative z-10 p-10 sm:p-16 max-w-xl">
              <Badge variant="gold" className="mb-4">✨ Exclusive Collection</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">The Luxury<br /><span className="text-gold-gradient">VIP Experience</span></h2>
              <p className="text-white/70 mb-8 leading-relaxed">Discover Riyadh&apos;s most exclusive salons offering private suites, VIP packages, and personalized beauty experiences fit for royalty.</p>
              <Link href="/salons"><Button size="lg" className="shadow-xl shadow-glamora-gold/30"><Crown className="w-5 h-5" />Explore VIP Salons</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BEST RATED */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Best <span className="text-gold-gradient">Rated</span></h2>
              <p className="text-white/50">Top-rated by thousands of happy customers</p>
            </motion.div>
            <Link href="/salons"><Button variant="outline" size="sm" className="hidden sm:flex">View All</Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRated.map((salon, i) => (
              <motion.div key={salon.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex gap-4 hover:border-glamora-gold/30 transition-all duration-300 group">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={salon.cover} alt={salon.name.en} fill className="object-cover group-hover:scale-105 transition-transform" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">{salon.name.en}</h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3 h-3 fill-glamora-gold text-glamora-gold" />
                      <span className="text-glamora-gold text-xs font-bold">{salon.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs mb-2">{salon.reviewsCount} reviews</p>
                  <p className="text-white/50 text-xs flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" /> {salon.neighborhood}</p>
                  <Link href={`/salons/${salon.id}`}><Button size="sm" variant="outline" className="text-xs h-7 px-3">Book Now</Button></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEAUTY PACKAGES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Beauty <span className="text-gold-gradient">Packages</span></h2>
            <p className="text-white/50">All-inclusive packages for every occasion</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark/90 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-lg">{pkg.name.en}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-glamora-gold/20 border border-glamora-gold/40 rounded-full px-2 py-1 text-glamora-gold text-xs">Save SAR {pkg.originalPrice - pkg.price}</div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-white/60 text-sm mb-4">{pkg.description.en}</p>
                  <div className="space-y-1.5 mb-5">
                    {pkg.services.map((svc) => (
                      <div key={svc} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-glamora-gold flex-shrink-0" />
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-glamora-gold font-bold text-xl">SAR {pkg.price}</span>
                      <span className="text-white/30 text-sm line-through ml-2">SAR {pkg.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/50 text-xs"><Clock className="w-3 h-3" />{pkg.duration} min</div>
                  </div>
                  <Link href="/booking"><Button className="w-full">Book Package</Button></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our <span className="text-gold-gradient">Clients Say</span></h2>
            <p className="text-white/50">Real reviews from real beauty enthusiasts</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.slice(0, 4).map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                <Rating value={review.rating} size="sm" className="mb-3" />
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">&ldquo;{review.comment.en}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar src={review.customerAvatar} name={review.customerName} size="sm" />
                  <div>
                    <p className="text-white font-medium text-sm">{review.customerName}</p>
                    <p className="text-glamora-gold text-xs">{review.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: 500, suffix: "+", label: "Salons", labelAr: "صالون" },
              { icon: Calendar, value: 50000, suffix: "+", label: "Bookings", labelAr: "حجز" },
              { icon: Star, value: 49, suffix: "", label: "4.9★ Rating", labelAr: "متوسط التقييم" },
              { icon: MapPin, value: 100, suffix: "+", label: "Areas", labelAr: "منطقة" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-glamora-gold/20 to-glamora-pink/20 border border-glamora-gold/20 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-glamora-gold" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-white/40 text-xs" dir="rtl">{stat.labelAr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="pink" className="mb-4">For Salon Owners</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Grow Your <span className="text-gold-gradient">Beauty Business</span></h2>
              <p className="text-white/60 mb-6 leading-relaxed">Join Glamora and reach thousands of beauty enthusiasts across Saudi Arabia. Get more bookings, manage your schedule, and grow your revenue.</p>
              <div className="space-y-3 mb-8">
                {["Access 50,000+ active customers", "Smart booking management system", "Analytics and revenue insights", "Marketing and promotion tools", "24/7 customer support"].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 text-white/70">
                    <CheckCircle className="w-5 h-5 text-glamora-gold flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard"><Button size="lg">Get Started Free</Button></Link>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: "New Clients/Mo", value: "+127" }, { label: "Revenue Growth", value: "+43%" }, { label: "Booking Rate", value: "89%" }, { label: "Customer Rating", value: "4.9★" }].map((metric) => (
                    <div key={metric.label} className="bg-white/5 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-gold-gradient mb-1">{metric.value}</div>
                      <div className="text-white/50 text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-glamora-gold/10 border border-glamora-gold/20 rounded-2xl">
                  <p className="text-glamora-gold text-sm font-medium text-center">✨ Average salon sees 43% revenue increase in 3 months</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD APP */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-glamora-pink/10 border border-glamora-pink/30 rounded-full px-4 py-1.5 mb-6">
              <Download className="w-4 h-4 text-glamora-pink" />
              <span className="text-glamora-pink text-sm font-medium">Download the Glamora App</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Beauty at Your <span className="text-gold-gradient">Fingertips</span></h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">Book, manage, and track your beauty appointments on the go with our award-winning mobile app.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                { platform: "App Store", sub: "Download on the", icon: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" },
                { platform: "Google Play", sub: "Get it on", icon: "M3.18 23.76c.33.17.72.18 1.09-.03l12.43-7.17-2.79-2.79-10.73 9.99zM.5 1.31C.19 1.67 0 2.21 0 2.93v18.14c0 .72.19 1.26.5 1.62l.09.08 10.16-10.16v-.24L.59 1.23.5 1.31zm20.47 9.52l-2.6-1.5-3.12 3.12 3.12 3.12 2.62-1.52c.75-.43.75-1.14-.02-1.58v.08l-.01-.07v.07l.01-.07v-.06zM4.27.24L16.7 7.41l-2.79 2.79-9.64-9.96z" }
              ].map((app) => (
                <a key={app.platform} href="#" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 transition-all duration-200 hover:border-glamora-gold/30">
                  <svg className="w-8 h-8 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d={app.icon}/></svg>
                  <div className="text-left">
                    <div className="text-white/40 text-xs">{app.sub}</div>
                    <div className="text-white font-semibold">{app.platform}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Beauty <span className="text-gold-gradient">Blog</span></h2>
              <p className="text-white/50">Tips, trends, and inspiration</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3"><Badge variant="gold">{post.category}</Badge></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
                    <span>{post.date}</span><span>·</span><span>{post.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-glamora-gold transition-colors">{post.title.en}</h3>
                  <p className="text-white/50 text-sm line-clamp-2 mb-4">{post.excerpt.en}</p>
                  <button className="text-glamora-gold text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200">Read More <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-4 bg-glamora-dark-2">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-r from-glamora-gold/10 to-glamora-pink/10 border border-glamora-gold/20 rounded-3xl p-10 sm:p-14">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay in the <span className="text-gold-gradient">Beauty Loop</span></h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">Get exclusive offers, beauty tips, and new salon announcements delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email address" className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-glamora-gold/50 text-sm" />
              <Button size="lg" className="flex-shrink-0">Subscribe ✨</Button>
            </div>
            <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
