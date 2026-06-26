'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'ar'

interface LangContextType {
  lang: Lang
  isAr: boolean
  setLang: (l: Lang) => void
  t: (en: string, ar: string) => string
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextType>({
  lang: 'en', isAr: false, setLang: () => {}, t: (en) => en, dir: 'ltr'
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('glamora-lang', l)
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = l
  }

  useEffect(() => {
    const saved = localStorage.getItem('glamora-lang') as Lang | null
    if (saved) setLang(saved)
  }, [])

  const isAr = lang === 'ar'
  const dir = isAr ? 'rtl' : 'ltr'
  const t = (en: string, ar: string) => isAr ? ar : en

  return <LangContext.Provider value={{ lang, isAr, setLang, t, dir }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

// Translation dictionary
export const translations = {
  nav: {
    home:     { en: 'Home',     ar: 'الرئيسية' },
    salons:   { en: 'Salons',   ar: 'الصالونات' },
    services: { en: 'Services', ar: 'الخدمات' },
    offers:   { en: 'Offers',   ar: 'العروض' },
    blog:     { en: 'Blog',     ar: 'المدونة' },
    about:    { en: 'About',    ar: 'عن بيوتيفا' },
    contact:  { en: 'Contact',  ar: 'تواصل معنا' },
    partner:  { en: 'Partner',  ar: 'شراكة' },
    login:    { en: 'Login',    ar: 'تسجيل الدخول' },
    register: { en: 'Register', ar: 'إنشاء حساب' },
  },
  hero: {
    slide1: {
      badge:    { en: '✨ Premium Beauty Experience', ar: '✨ تجربة تجميل فاخرة' },
      title:    { en: 'Discover Saudi\'s Most Luxurious Beauty Salons', ar: 'اكتشفي أفخم صالونات التجميل في المملكة' },
      subtitle: { en: 'Book premium beauty services in Riyadh, Jeddah, and across the GCC. Hundreds of verified luxury salons at your fingertips.', ar: 'احجزي خدمات التجميل الفاخرة في الرياض وجدة وعبر دول الخليج. مئات الصالونات المعتمدة في متناول يدك.' },
      cta1:     { en: 'Book Now',        ar: 'احجزي الآن' },
      cta2:     { en: 'Explore Salons',  ar: 'استكشفي الصالونات' },
    },
    slide2: {
      badge:    { en: '💅 Exclusive Offers', ar: '💅 عروض حصرية' },
      title:    { en: 'Unbeatable Beauty Deals Updated Daily', ar: 'عروض تجميل لا تُقاوم تتجدد يومياً' },
      subtitle: { en: 'Flash deals, seasonal packages and limited-time offers from top salons. Save up to 60% on luxury beauty services.', ar: 'صفقات سريعة وباقات موسمية وعروض محدودة من أفضل الصالونات. وفّري حتى 60% على خدمات التجميل الفاخرة.' },
      cta1:     { en: 'View Offers',     ar: 'عرض العروض' },
      cta2:     { en: 'Flash Deals',     ar: 'صفقات سريعة' },
    },
    slide3: {
      badge:    { en: '👑 VIP Loyalty Program', ar: '👑 برنامج ولاء VIP' },
      title:    { en: 'Earn Points, Unlock VIP Beauty Privileges', ar: 'اجمعي النقاط وافتحي امتيازات VIP الحصرية' },
      subtitle: { en: 'Join thousands of Glamora members. Earn points on every booking, redeem for free services, and climb to Diamond status.', ar: 'انضمي إلى آلاف أعضاء غلامورا. اجمعي نقاطاً على كل حجز واستبدليها بخدمات مجانية وارتقي إلى مستوى الألماس.' },
      cta1:     { en: 'Join Free',       ar: 'انضمي مجاناً' },
      cta2:     { en: 'Learn More',      ar: 'اعرفي أكثر' },
    },
  },
  search: {
    placeholder: { en: 'Search salons, services, offers...', ar: 'ابحثي عن صالونات، خدمات، عروض...' },
    location:    { en: 'Location',   ar: 'الموقع' },
    service:     { en: 'Service',    ar: 'الخدمة' },
    date:        { en: 'Date',       ar: 'التاريخ' },
    searchBtn:   { en: 'Search',     ar: 'بحث' },
  },
  sections: {
    featuredSalons:  { en: 'Featured Salons',     ar: 'الصالونات المميزة' },
    todayOffers:     { en: "Today's Offers",       ar: 'عروض اليوم' },
    popularServices: { en: 'Popular Services',     ar: 'الخدمات الأكثر طلباً' },
    categories:      { en: 'Browse Categories',   ar: 'تصفحي التصنيفات' },
    luxuryCollection:{ en: 'Luxury Collection',   ar: 'المجموعة الفاخرة' },
    bestRated:       { en: 'Best Rated Salons',    ar: 'أعلى الصالونات تقييماً' },
    packages:        { en: 'Beauty Packages',      ar: 'باقات التجميل' },
    testimonials:    { en: 'What Our Customers Say', ar: 'ماذا تقول عملاؤنا' },
    blog:            { en: 'Beauty Blog',          ar: 'مدونة الجمال' },
    partner:         { en: 'Grow Your Salon with Glamora', ar: 'طوّري صالونك مع غلامورا' },
    downloadApp:     { en: 'Download Our App',     ar: 'حمّلي تطبيقنا' },
    viewAll:         { en: 'View All',             ar: 'عرض الكل' },
    bookNow:         { en: 'Book Now',             ar: 'احجزي الآن' },
    off:             { en: 'OFF',                  ar: 'خصم' },
  },
  stats: {
    salons:    { en: 'Salons',    ar: 'صالون' },
    bookings:  { en: 'Bookings',  ar: 'حجز' },
    customers: { en: 'Customers', ar: 'عميلة' },
    rating:    { en: 'Rating',    ar: 'التقييم' },
  },
  footer: {
    tagline:    { en: 'Saudi Arabia\'s Premier Beauty Marketplace', ar: 'أول منصة تجميل فاخرة في المملكة العربية السعودية' },
    quickLinks: { en: 'Quick Links',   ar: 'روابط سريعة' },
    services:   { en: 'Services',      ar: 'الخدمات' },
    support:    { en: 'Support',       ar: 'الدعم' },
    newsletter: { en: 'Stay Updated',  ar: 'ابقي على اطلاع' },
    email:      { en: 'Enter your email', ar: 'أدخلي بريدك الإلكتروني' },
    subscribe:  { en: 'Subscribe',     ar: 'اشتركي' },
    rights:     { en: 'All rights reserved', ar: 'جميع الحقوق محفوظة' },
  },
}

export function tr(key: keyof typeof translations, sub: string, lang: Lang): string {
  const section = translations[key] as Record<string, { en: string; ar: string }>
  return section[sub]?.[lang] ?? sub
}
