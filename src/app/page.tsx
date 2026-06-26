'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Scissors, Sparkles, Heart, Eye, Star, Zap, Crown,
  MapPin, ArrowRight, Clock, Search, Calendar,
  CheckCircle, ChevronLeft, ChevronRight, Play, Shield, Award
} from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import { salons, categories, offers, reviews, packages, blogPosts, getFeaturedSalons } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useLang, translations } from '@/lib/i18n'

// ─── Hero Slides ─────────────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80',
    fallback: 'https://picsum.photos/seed/beauty-salon-luxury/1920/1080',
    badge:    { en: '✨ Premium Beauty Experience',       ar: '✨ تجربة تجميل فاخرة' },
    title:    { en: "Saudi Arabia's Most Luxurious",      ar: 'اكتشفي أفخم صالونات' },
    accent:   { en: 'Beauty Marketplace',                 ar: 'التجميل في المملكة' },
    subtitle: { en: 'Book premium beauty services at 500+ verified luxury salons across Riyadh, Jeddah and the GCC.', ar: 'احجزي خدمات التجميل الفاخرة في أكثر من ٥٠٠ صالون معتمد في الرياض وجدة وعبر دول الخليج.' },
    cta1:     { en: 'Book Now',       ar: 'احجزي الآن' },
    cta2:     { en: 'Explore Salons', ar: 'استكشفي الصالونات' },
    accent1Color: 'from-glamora-gold to-amber-300',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80',
    fallback: 'https://picsum.photos/seed/hair-salon-riyadh/1920/1080',
    badge:    { en: '💅 Exclusive Deals Updated Daily',   ar: '💅 عروض حصرية تتجدد يومياً' },
    title:    { en: 'Unbeatable Beauty Deals',            ar: 'عروض تجميل لا تُقاوم' },
    accent:   { en: 'Up to 60% Off',                     ar: 'خصم يصل إلى ٦٠٪' },
    subtitle: { en: 'Flash deals, seasonal packages, and limited-time offers from top-rated salons. New deals every morning.', ar: 'صفقات سريعة وباقات موسمية وعروض محدودة من أعلى الصالونات تقييماً. عروض جديدة كل صباح.' },
    cta1:     { en: 'View Offers',  ar: 'عرض العروض' },
    cta2:     { en: 'Flash Deals',  ar: 'صفقات سريعة' },
    accent1Color: 'from-glamora-pink to-rose-400',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    fallback: 'https://picsum.photos/seed/bridal-beauty/1920/1080',
    badge:    { en: '👑 Join 50,000+ Happy Members',      ar: '👑 انضمي لأكثر من ٥٠٠٠٠ عضوة سعيدة' },
    title:    { en: 'Your Dream Wedding,',                ar: 'حفل زفافك المثالي' },
    accent:   { en: 'Perfectly Styled',                  ar: 'بتنسيق احترافي لا يُنسى' },
    subtitle: { en: 'Complete bridal packages from Riyadh\'s finest makeup artists, hair stylists, and nail technicians.', ar: 'باقات عروس كاملة من أفضل فناني المكياج والمصففين وخبراء الأظافر في الرياض.' },
    cta1:     { en: 'Bridal Packages', ar: 'باقات العروس' },
    cta2:     { en: 'View Salons',     ar: 'عرض الصالونات' },
    accent1Color: 'from-purple-400 to-glamora-pink',
  },
]

// ─── Animated Counter ──────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Countdown Timer ───────────────────────────────────────────────────────
function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) return
      setTime({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    update()
    const i = setInterval(update, 1000)
    return () => clearInterval(i)
  }, [expiresAt])
  return (
    <div className="flex items-center gap-1">
      {[time.h, time.m, time.s].map((v, i) => (
        <div key={i} className="flex items-center gap-0.5">
          <span className="bg-black/40 backdrop-blur-sm rounded-md px-1.5 py-1 text-glamora-gold font-mono font-bold text-xs min-w-[26px] text-center">
            {String(v).padStart(2, '0')}
          </span>
          {i < 2 && <span className="text-white/50 text-xs">:</span>}
        </div>
      ))}
    </div>
  )
}

// ─── Salon Card ────────────────────────────────────────────────────────────
function SalonCard({ salon, index }: { salon: ReturnType<typeof getFeaturedSalons>[0]; index: number }) {
  const { isAr, t } = useLang()
  const [wishlisted, setWishlisted] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }} viewport={{ once: true }}
      className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/10 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image src={salon.cover} alt={salon.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <button onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={cn('w-4 h-4 transition-all', wishlisted ? 'fill-glamora-pink text-glamora-pink' : 'text-white')} />
        </button>
        {salon.isLuxury && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-glamora-gold/20 backdrop-blur-sm border border-glamora-gold/40 rounded-full px-2.5 py-1">
            <Crown className="w-3 h-3 text-glamora-gold" />
            <span className="text-glamora-gold text-xs font-semibold">Luxury</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-glamora-gold/60 shadow-lg">
            <Image src={salon.logo} alt={salon.name.en} width={36} height={36} className="object-cover" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight" dir={isAr ? 'rtl' : 'ltr'}>{isAr ? salon.name.ar : salon.name.en}</div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Rating value={salon.rating} size="sm" />
            <span className="text-glamora-gold text-xs font-bold">{salon.rating}</span>
            <span className="text-white/30 text-xs">({salon.reviewsCount})</span>
          </div>
          <span className="text-white/40 text-xs font-mono">{salon.priceRange}</span>
        </div>
        <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
          <MapPin className="w-3 h-3 text-glamora-gold/60 shrink-0" />
          <span>{isAr ? salon.location.ar : salon.location.en}</span>
        </div>
        <Link href={`/salons/${salon.id}`}
          className={cn('block w-full text-center py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-md shadow-glamora-gold/20', isAr && 'font-tajawal')}>
          {t('Book Now', 'احجزي الآن')}
        </Link>
      </div>
    </motion.div>
  )
}

const catIcons: Record<string, React.ElementType> = {
  hair: Scissors, nails: Sparkles, makeup: Star, skincare: Heart,
  eyebrows: Eye, lashes: Zap, massage: Crown, bridal: Crown,
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const { lang, isAr, t } = useLang()
  const [slide, setSlide] = useState(0)
  const [city, setCity] = useState('')
  const [service, setService] = useState('')
  const s = translations.sections

  useEffect(() => {
    const timer = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const featuredSalons = getFeaturedSalons()
  const topRated = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const flashOffers = offers.slice(0, 4)
  const current = heroSlides[slide]

  return (
    <div className="min-h-screen bg-[#1A0A2E]" dir={isAr ? 'rtl' : 'ltr'}>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background Image with smooth crossfade */}
        <AnimatePresence mode="sync">
          <motion.div key={slide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }} className="absolute inset-0">
            <Image
              src={current.image}
              alt="Beauty salon"
              fill
              className="object-cover"
              priority
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = current.fallback }}
            />
            {/* Layered overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A2E]/95 via-[#1A0A2E]/70 to-[#1A0A2E]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A2E]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Animated luxury orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-glamora-gold/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glamora-pink/10 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl animate-float-delay" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={slide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7 }}>

                {/* Badge */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                  <span className={cn('text-white/90 text-sm', isAr && 'font-tajawal')}>{current.badge[lang]}</span>
                </motion.div>

                {/* Title */}
                <h1 className={cn('text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4', isAr && 'font-tajawal text-right lg:text-6xl')}>
                  {current.title[lang]}{' '}
                  <span className={cn('bg-gradient-to-r bg-clip-text text-transparent', current.accent1Color)}>
                    {current.accent[lang]}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className={cn('text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl', isAr && 'font-tajawal text-right')}>
                  {current.subtitle[lang]}
                </p>

                {/* CTA Buttons */}
                <div className={cn('flex flex-wrap gap-4 mb-12', isAr && 'justify-end sm:justify-start')}>
                  <Link href="/salons"
                    className={cn('inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-glamora-gold to-amber-400 text-black font-bold rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-glamora-gold/30 hover:shadow-glamora-gold/50 hover:-translate-y-0.5 text-sm sm:text-base', isAr && 'font-tajawal flex-row-reverse')}>
                    {current.cta1[lang]}
                    <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
                  </Link>
                  <Link href="/offers"
                    className={cn('inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all text-sm sm:text-base', isAr && 'font-tajawal flex-row-reverse')}>
                    {current.cta2[lang]}
                    <Play className="w-4 h-4 fill-white" />
                  </Link>
                </div>

                {/* Trust badges */}
                <div className={cn('flex flex-wrap gap-5', isAr && 'justify-end sm:justify-start')}>
                  {[
                    { icon: Shield, en: '100% Verified Salons',    ar: '١٠٠٪ صالونات معتمدة' },
                    { icon: Award,  en: 'Best Price Guarantee',    ar: 'ضمان أفضل سعر' },
                    { icon: CheckCircle, en: 'Instant Confirmation', ar: 'تأكيد فوري' },
                  ].map(b => (
                    <div key={b.en} className="flex items-center gap-2">
                      <b.icon className="w-4 h-4 text-glamora-gold" />
                      <span className={cn('text-white/60 text-xs', isAr && 'font-tajawal')}>{isAr ? b.ar : b.en}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Search Box */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-12 bg-white/8 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-5 shadow-2xl max-w-4xl">
            <div className={cn('flex flex-col sm:flex-row gap-3', isAr && 'sm:flex-row-reverse')}>
              {/* City */}
              <div className="flex-1 relative">
                <MapPin className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-glamora-gold', isAr ? 'right-3' : 'left-3')} />
                <input value={city} onChange={e => setCity(e.target.value)}
                  placeholder={isAr ? 'المدينة أو الحي' : 'City or district'}
                  className={cn('w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 placeholder:text-white/30', isAr ? 'pr-10 pl-4 text-right font-tajawal' : 'pl-10 pr-4')} />
              </div>
              {/* Service */}
              <div className="flex-1 relative">
                <Scissors className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-glamora-gold', isAr ? 'right-3' : 'left-3')} />
                <input value={service} onChange={e => setService(e.target.value)}
                  placeholder={isAr ? 'الخدمة المطلوبة' : 'Service (e.g. Hair color)'}
                  className={cn('w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 placeholder:text-white/30', isAr ? 'pr-10 pl-4 text-right font-tajawal' : 'pl-10 pr-4')} />
              </div>
              {/* Date */}
              <div className="flex-1 relative">
                <Calendar className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-glamora-gold', isAr ? 'right-3' : 'left-3')} />
                <input type="date"
                  className={cn('w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 text-white/60 text-sm focus:outline-none focus:border-glamora-gold/50', isAr ? 'pr-10 pl-4' : 'pl-10 pr-4')} />
              </div>
              {/* Search button */}
              <Link href={`/search?city=${city}&service=${service}`}
                className={cn('flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white font-bold rounded-2xl hover:opacity-90 transition-all whitespace-nowrap shadow-lg shadow-glamora-gold/20', isAr && 'font-tajawal flex-row-reverse')}>
                <Search className="w-5 h-5" />
                {isAr ? 'بحث' : 'Search'}
              </Link>
            </div>
            {/* Quick tags */}
            <div className={cn('flex gap-2 mt-3 flex-wrap', isAr && 'flex-row-reverse justify-end')}>
              <span className={cn('text-white/40 text-xs self-center', isAr && 'font-tajawal')}>
                {isAr ? 'شائع:' : 'Popular:'}
              </span>
              {(isAr
                ? ['قص الشعر', 'مانيكير', 'مكياج', 'علاج البشرة', 'عرائس', 'رموش']
                : ['Hair Cut', 'Manicure', 'Makeup', 'Facial', 'Bridal', 'Lashes']
              ).map(tag => (
                <button key={tag} onClick={() => setService(tag)}
                  className={cn('text-xs px-3 py-1 border border-white/10 text-white/50 rounded-full hover:border-glamora-gold/40 hover:text-glamora-gold transition-all', isAr && 'font-tajawal')}>
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={cn('h-1.5 rounded-full transition-all duration-300', i === slide ? 'w-8 bg-glamora-gold' : 'w-2 bg-white/30 hover:bg-white/50')} />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button onClick={() => setSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}
          className={cn('absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all', isAr ? 'right-6' : 'left-6')}>
          <ChevronLeft className={cn('w-5 h-5', isAr && 'rotate-180')} />
        </button>
        <button onClick={() => setSlide(p => (p + 1) % heroSlides.length)}
          className={cn('absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all', isAr ? 'left-6' : 'right-6')}>
          <ChevronRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
        </button>
      </section>

      {/* ══════════ ANIMATED STATS ══════════ */}
      <section className="py-12 bg-gradient-to-r from-glamora-gold/5 via-transparent to-glamora-pink/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: '+', en: 'Verified Salons',   ar: 'صالون معتمد',   icon: '💎' },
              { value: 50000, suffix: '+', en: 'Happy Bookings',  ar: 'حجز ناجح',      icon: '📅' },
              { value: 30000, suffix: '+', en: 'Loyal Customers', ar: 'عميلة وفية',    icon: '👑' },
              { value: 4.9, suffix: '★',   en: 'Average Rating',  ar: 'متوسط التقييم', icon: '⭐' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-glamora-gold">
                  {stat.suffix === '★'
                    ? <>{stat.value}{stat.suffix}</>
                    : <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  }
                </div>
                <div className={cn('text-white/50 text-sm mt-1', isAr && 'font-tajawal')}>
                  {isAr ? stat.ar : stat.en}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CATEGORIES ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.categories[lang]} link="/salons" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.slice(0, 8).map((cat, i) => {
              const Icon = catIcons[cat.id] ?? Sparkles
              return (
                <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Link href={`/categories/${cat.id}`}
                    className="group flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-glamora-gold/40 hover:bg-glamora-gold/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glamora-gold/20 to-glamora-pink/20 flex items-center justify-center group-hover:from-glamora-gold/30 group-hover:to-glamora-pink/30 transition-all">
                      <Icon className="w-6 h-6 text-glamora-gold" />
                    </div>
                    <span className={cn('text-white/70 text-xs text-center font-medium group-hover:text-white transition-colors leading-tight', isAr && 'font-tajawal')}>
                      {isAr ? cat.name.ar : cat.name.en}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED SALONS ══════════ */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-white/2">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.featuredSalons[lang]} subtitle={isAr ? 'صالونات مميزة اختارها خبراؤنا لك' : 'Handpicked by our beauty experts'} link="/salons" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getFeaturedSalons().map((salon, i) => <SalonCard key={salon.id} salon={salon} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════ TODAY'S OFFERS ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.todayOffers[lang]} subtitle={isAr ? 'عروض لفترة محدودة — لا تفوّتيها!' : 'Limited time offers — Don\'t miss out!'} link="/offers" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.slice(0, 4).map((offer, i) => {
              const expiresAt = new Date(Date.now() + (8 - i) * 3600000 + i * 1800000).toISOString()
              return (
                <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-pink/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={offer.image} alt={offer.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    {/* Discount badge */}
                    <div className="absolute top-3 right-3 bg-glamora-pink text-white font-black text-lg px-2.5 py-1 rounded-xl shadow-lg">
                      -{offer.discount}%
                    </div>
                    {/* Countdown */}
                    <div className="absolute bottom-3 left-3">
                      <div className={cn('text-white/60 text-xs mb-1', isAr && 'font-tajawal text-right')}>{isAr ? 'ينتهي خلال' : 'Ends in'}</div>
                      <CountdownTimer expiresAt={expiresAt} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className={cn('text-white font-semibold text-sm mb-1 line-clamp-1', isAr && 'font-tajawal text-right')}>
                      {isAr ? offer.title.ar : offer.title.en}
                    </h3>
                    <div className={cn('flex items-center gap-2 mb-3', isAr && 'flex-row-reverse')}>
                      <span className="text-white/40 text-xs line-through">SAR {offer.originalPrice}</span>
                      <span className="text-glamora-gold font-bold">SAR {offer.discountedPrice}</span>
                    </div>
                    <Link href="/booking"
                      className={cn('block w-full text-center py-2 bg-gradient-to-r from-glamora-pink/80 to-glamora-gold/80 text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity', isAr && 'font-tajawal')}>
                      {s.bookNow[lang]}
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ LUXURY BANNER ══════════ */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden h-64 sm:h-80">
            <Image
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury collection"
              fill className="object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://picsum.photos/seed/luxury-banner/1920/600' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A2E]/90 via-[#1A0A2E]/60 to-transparent" />
            <div className={cn('absolute inset-0 flex flex-col justify-center px-8 sm:px-12', isAr && 'items-end text-right')}>
              <div className="inline-flex items-center gap-2 bg-glamora-gold/20 border border-glamora-gold/40 rounded-full px-3 py-1 mb-4">
                <Crown className="w-4 h-4 text-glamora-gold" />
                <span className={cn('text-glamora-gold text-xs font-semibold', isAr && 'font-tajawal')}>{isAr ? 'مجموعة VIP الحصرية' : 'Exclusive VIP Collection'}</span>
              </div>
              <h2 className={cn('text-3xl sm:text-4xl font-bold text-white mb-3', isAr && 'font-tajawal')}>
                {isAr ? 'صالونات فاخرة لكل مناسبة' : 'Luxury Salons for Every Occasion'}
              </h2>
              <p className={cn('text-white/60 text-sm sm:text-base max-w-md mb-6', isAr && 'font-tajawal')}>
                {isAr ? 'تجربة تجميل لا مثيل لها في أرقى صالونات المملكة' : 'An unmatched beauty experience at the finest salons in the Kingdom'}
              </p>
              <Link href="/salons?luxury=true"
                className={cn('inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-glamora-gold to-amber-400 text-black font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg', isAr && 'font-tajawal flex-row-reverse')}>
                {isAr ? 'استكشفي المجموعة الفاخرة' : 'Explore Luxury Collection'}
                <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ BEST RATED ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.bestRated[lang]} subtitle={isAr ? 'الأكثر تقييماً من قِبَل عميلاتنا' : 'Top-rated by our customers'} link="/salons" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRated.slice(0, 6).map((salon, i) => <SalonCard key={salon.id} salon={salon as any} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════ BEAUTY PACKAGES ══════════ */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-white/2">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.packages[lang]} subtitle={isAr ? 'باقات شاملة بأسعار استثنائية' : 'Comprehensive packages at exceptional prices'} link="/salons" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {packages.slice(0, 3).map((pkg, i) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48">
                  <Image src={pkg.image} alt={pkg.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {pkg.services.slice(0, 3).map(svc => (
                        <span key={svc} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{svc}</span>
                      ))}
                      {pkg.services.length > 3 && <span className="text-xs text-white/50">+{pkg.services.length - 3}</span>}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={cn('text-white font-semibold mb-1', isAr && 'font-tajawal text-right')}>{isAr ? pkg.name.ar : pkg.name.en}</h3>
                  <p className={cn('text-white/50 text-xs mb-3 line-clamp-2', isAr && 'font-tajawal text-right')}>{isAr ? pkg.description.ar : pkg.description.en}</p>
                  <div className={cn('flex items-center justify-between', isAr && 'flex-row-reverse')}>
                    <div>
                      <div className="text-white/30 text-xs line-through">SAR {pkg.originalPrice}</div>
                      <div className="text-glamora-gold font-bold text-lg">SAR {pkg.price}</div>
                    </div>
                    <span className="text-xs bg-glamora-pink/20 border border-glamora-pink/30 text-glamora-pink px-2 py-1 rounded-full font-semibold">
                      {isAr ? `وفّري SAR ${pkg.originalPrice - pkg.price}` : `Save SAR ${pkg.originalPrice - pkg.price}`}
                    </span>
                  </div>
                  <Link href="/booking" className={cn('mt-3 block w-full text-center py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity', isAr && 'font-tajawal')}>
                    {s.bookNow[lang]}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.testimonials[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className={cn('w-4 h-4', s <= review.rating ? 'text-glamora-gold fill-glamora-gold' : 'text-white/20')} />)}
                </div>
                <p className={cn('text-white/70 text-sm leading-relaxed mb-4 line-clamp-3', isAr && 'font-tajawal text-right')}>
                  {isAr ? review.comment.ar : review.comment.en}
                </p>
                <div className={cn('flex items-center gap-3', isAr && 'flex-row-reverse')}>
                  <Image src={review.customerAvatar} alt={review.customerName} width={36} height={36} className="rounded-full object-cover" />
                  <div>
                    <div className={cn('text-white text-sm font-semibold', isAr && 'font-tajawal text-right')}>{review.customerName}</div>
                    <div className="text-white/30 text-xs">{review.service}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ POPULAR SERVICES ══════════ */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-white/2">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.popularServices[lang]} isAr={isAr} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { en: 'Hair Color',   ar: 'صبغ الشعر',    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80', count: '1.2k' },
              { en: 'Nail Art',     ar: 'فن الأظافر',   img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80', count: '980' },
              { en: 'Facial',       ar: 'العناية بالبشرة', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=400&q=80', count: '856' },
              { en: 'Blow Dry',     ar: 'تجفيف الشعر',  img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', count: '743' },
              { en: 'Makeup',       ar: 'المكياج',       img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=400&q=80', count: '692' },
              { en: 'Lashes',       ar: 'الرموش',        img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80', count: '578' },
            ].map((svc, i) => (
              <motion.div key={svc.en} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link href={`/search?service=${svc.en}`}
                  className="group relative block h-32 rounded-2xl overflow-hidden border border-white/10 hover:border-glamora-gold/40 transition-all hover:-translate-y-1">
                  <Image src={svc.img} alt={svc.en} fill className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${svc.en}/400/300` }}
                    sizes="200px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <div className={cn('text-white text-xs font-semibold', isAr && 'font-tajawal text-right')}>{isAr ? svc.ar : svc.en}</div>
                    <div className="text-white/40 text-[10px]">{svc.count} {isAr ? 'حجز' : 'bookings'}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PARTNER BANNER ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-glamora-gold/10 via-glamora-pink/5 to-purple-500/10 border border-glamora-gold/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-glamora-gold/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-glamora-pink/5 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-glamora-gold/20 border border-glamora-gold/30 rounded-full px-4 py-2 mb-5">
                <Award className="w-4 h-4 text-glamora-gold" />
                <span className={cn('text-glamora-gold text-sm font-semibold', isAr && 'font-tajawal')}>{isAr ? 'لأصحاب الصالونات' : 'For Salon Owners'}</span>
              </div>
              <h2 className={cn('text-3xl sm:text-4xl font-bold text-white mb-4', isAr && 'font-tajawal')}>
                {isAr ? 'طوّري صالونك مع غلامورا' : 'Grow Your Salon with Glamora'}
              </h2>
              <p className={cn('text-white/60 text-lg max-w-2xl mx-auto mb-8', isAr && 'font-tajawal')}>
                {isAr ? 'انضم إلى أكثر من ٥٠٠ صالون وابدأ في استقبال حجوزات جديدة من عملاء مميزين عبر منصتنا' : 'Join 500+ salons and start receiving new bookings from premium customers through our platform'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  { en: 'More Bookings',    ar: 'حجوزات أكثر',     icon: Calendar },
                  { en: 'Easy Management',  ar: 'إدارة سهلة',       icon: CheckCircle },
                  { en: 'Real Analytics',   ar: 'تحليلات حقيقية',   icon: Star },
                  { en: 'Free Marketing',   ar: 'تسويق مجاني',      icon: Sparkles },
                ].map(f => (
                  <div key={f.en} className="flex items-center gap-2">
                    <f.icon className="w-5 h-5 text-glamora-gold" />
                    <span className={cn('text-white/70 text-sm', isAr && 'font-tajawal')}>{isAr ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
              <Link href="/partner"
                className={cn('inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-glamora-gold to-amber-400 text-black font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-glamora-gold/30', isAr && 'font-tajawal flex-row-reverse')}>
                {isAr ? 'سجّل صالونك مجاناً' : 'List Your Salon Free'}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ BLOG ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title={s.blog[lang]} link="/blog" linkText={s.viewAll[lang]} isAr={isAr} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <Image src={post.image} alt={post.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-glamora-gold/80 text-black font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 text-white/30 text-xs mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className={cn('text-white font-semibold mb-2 line-clamp-2 leading-snug', isAr && 'font-tajawal text-right')}>
                    {isAr ? post.title.ar : post.title.en}
                  </h3>
                  <Link href={`/blog/${post.id}`} className={cn('text-glamora-gold text-xs hover:text-glamora-gold-light transition-colors flex items-center gap-1', isAr && 'font-tajawal flex-row-reverse')}>
                    {isAr ? 'اقرئي المزيد' : 'Read More'}
                    <ArrowRight className={cn('w-3 h-3', isAr && 'rotate-180')} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-4xl mb-4">💌</div>
            <h2 className={cn('text-2xl sm:text-3xl font-bold text-white mb-3', isAr && 'font-tajawal')}>
              {isAr ? 'ابقي على اطلاع بأحدث العروض' : 'Stay Updated with the Latest Deals'}
            </h2>
            <p className={cn('text-white/50 mb-6', isAr && 'font-tajawal')}>
              {isAr ? 'اشتركي في نشرتنا البريدية واحصلي على عروض حصرية مبكراً' : 'Subscribe to our newsletter and get exclusive early access to deals'}
            </p>
            <div className={cn('flex gap-3 max-w-md mx-auto', isAr && 'flex-row-reverse')}>
              <input
                type="email"
                placeholder={isAr ? 'بريدك الإلكتروني' : 'Enter your email'}
                className={cn('flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-glamora-gold/50 placeholder:text-white/30', isAr && 'text-right font-tajawal')}
              />
              <button className={cn('px-6 py-3 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity whitespace-nowrap', isAr && 'font-tajawal')}>
                {isAr ? 'اشتركي' : 'Subscribe'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

// ─── Section Header ────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, link, linkText, isAr }: {
  title: string; subtitle?: string; link?: string; linkText?: string; isAr: boolean
}) {
  return (
    <div className={cn('flex items-start justify-between mb-8 gap-4', isAr && 'flex-row-reverse')}>
      <div className={cn(isAr && 'text-right')}>
        <h2 className={cn('text-2xl sm:text-3xl font-bold text-white', isAr && 'font-tajawal')}>{title}</h2>
        {subtitle && <p className={cn('text-white/50 text-sm mt-1', isAr && 'font-tajawal')}>{subtitle}</p>}
      </div>
      {link && linkText && (
        <Link href={link}
          className={cn('shrink-0 flex items-center gap-1 text-sm text-glamora-gold hover:text-glamora-gold-light transition-colors', isAr && 'font-tajawal flex-row-reverse')}>
          {linkText}
          <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
        </Link>
      )}
    </div>
  )
}
