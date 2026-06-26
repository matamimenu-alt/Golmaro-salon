'use client'
import Link from "next/link"
import { Send, MapPin } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const footerData = {
  discover: {
    en: 'Discover',
    ar: 'اكتشفي',
    links: [
      { en: 'All Salons',        ar: 'كل الصالونات',     href: '/salons' },
      { en: "Today's Offers",    ar: 'عروض اليوم',        href: '/offers' },
      { en: 'Luxury Collection', ar: 'المجموعة الفاخرة',  href: '/salons' },
      { en: 'Bridal Packages',   ar: 'باقات العرائس',     href: '/salons' },
      { en: 'Near Me',           ar: 'قريب مني',          href: '/salons' },
    ],
  },
  services: {
    en: 'Services',
    ar: 'الخدمات',
    links: [
      { en: 'Hair Styling',  ar: 'تصفيف الشعر', href: '/salons' },
      { en: 'Nail Studio',   ar: 'الأظافر',      href: '/salons' },
      { en: 'Makeup',        ar: 'مكياج',        href: '/salons' },
      { en: 'Skincare',      ar: 'العناية بالبشرة', href: '/salons' },
      { en: 'Massage & Spa', ar: 'مساج وسبا',    href: '/salons' },
    ],
  },
  company: {
    en: 'Company',
    ar: 'الشركة',
    links: [
      { en: 'About Beautiva', ar: 'عن بيوتيفا',    href: '/about' },
      { en: 'Partner With Us', ar: 'شراكة معنا',   href: '/partner' },
      { en: 'Beauty Blog',    ar: 'مدونة الجمال',  href: '/blog' },
      { en: 'Press',          ar: 'الإعلام',       href: '/' },
      { en: 'Careers',        ar: 'وظائف',         href: '/' },
    ],
  },
  support: {
    en: 'Support',
    ar: 'الدعم',
    links: [
      { en: 'Help Center',         ar: 'مركز المساعدة',   href: '/' },
      { en: 'Contact Us',          ar: 'تواصل معنا',      href: '/contact' },
      { en: 'Privacy Policy',      ar: 'سياسة الخصوصية', href: '/' },
      { en: 'Terms of Service',    ar: 'شروط الخدمة',     href: '/' },
      { en: 'Cancellation Policy', ar: 'سياسة الإلغاء',   href: '/' },
    ],
  },
}

function BeautivaLogoSmall() {
  return (
    <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
      <defs>
        <linearGradient id="bvFootGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="29" fill="url(#bvFootGrad)" opacity="0.15" stroke="url(#bvFootGrad)" strokeWidth="1" strokeOpacity="0.3" />
      <path d="M30 12 C26 12 23 15 23 19 C23 22 24.5 24.5 27 25.5 L25 34 L35 34 L33 25.5 C35.5 24.5 37 22 37 19 C37 15 34 12 30 12Z" fill="url(#bvFootGrad)" opacity="0.9" />
      <ellipse cx="43" cy="13" rx="4" ry="7" fill="url(#bvFootGrad)" opacity="0.75" transform="rotate(-35 43 13)" />
      <text x="8" y="52" fontSize="28" fontWeight="900" fill="url(#bvFootGrad)" fontFamily="Georgia, serif">B</text>
    </svg>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    color: 'hover:text-pink-400',
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: 'X',
    href: 'https://twitter.com',
    color: 'hover:text-blue-400',
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
]

export default function Footer() {
  const { lang, isAr } = useLang()

  return (
    <footer className="bg-[#0D0520] border-t border-purple-500/15" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className={cn('flex items-center gap-2 mb-4', isAr && 'flex-row-reverse')}>
              <BeautivaLogoSmall />
              <span className={cn('text-xl font-bold bg-gradient-to-r from-[#9333EA] to-[#D946EF] bg-clip-text text-transparent', isAr && 'font-tajawal')}>
                {isAr ? 'بيوتيفا' : 'Beautiva'}
              </span>
            </Link>
            <p className={cn('text-white/50 text-sm leading-relaxed mb-2', isAr && 'font-tajawal text-right')}>
              {isAr
                ? 'سوق الجمال الفاخر في المملكة العربية السعودية ودول الخليج'
                : 'Your luxury beauty marketplace across Saudi Arabia and the GCC.'}
            </p>

            {/* Social */}
            <div className={cn('flex items-center gap-3 mb-6 mt-5', isAr && 'flex-row-reverse')}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-white/50 transition-all duration-200 ${s.color}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
                </svg>
              </a>
              {/* Snapchat */}
              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-white/50 hover:text-yellow-300 transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.166 3c-1.837 0-4.116 1.087-4.678 3.954-.168.864-.123 1.755-.09 2.499.002.027.004.054.006.081-.175.1-.497.191-.936.152-.392-.035-.713-.183-.855-.388a.457.457 0 00-.637-.118c-.206.153-.255.447-.11.657.305.449.874.826 1.773.902.04.003.08.005.12.005.258 0 .484-.063.641-.133.196.422.612.783 1.158.969.56.19 1.186.18 1.66-.024.108.19.16.43.12.71-.148 1.006-1.32 1.51-1.77 1.62-.194.047-.462.23-.462.49 0 .367.38.494.566.517.266.032.55.063.856.095.32.033.65.067.894.127.145.035.233.114.24.216.009.147-.087.35-.187.513l-.006.009c-.11.173-.226.356-.226.544 0 .283.192.397.334.42 1.12.176 2.3.183 2.301.183h.002c.001 0 1.18-.007 2.3-.183.142-.023.334-.137.334-.42 0-.188-.116-.37-.226-.544l-.006-.009c-.1-.163-.196-.366-.186-.513.006-.102.094-.181.24-.216.243-.06.574-.094.893-.127.306-.032.59-.063.856-.095.186-.023.566-.15.566-.517 0-.26-.268-.443-.462-.49-.45-.11-1.622-.614-1.77-1.62-.04-.28.012-.52.12-.71.474.204 1.1.215 1.66.024.546-.186.962-.547 1.158-.969.157.07.383.133.641.133.04 0 .08-.002.12-.005.9-.076 1.468-.453 1.773-.902.145-.21.096-.504-.11-.657a.457.457 0 00-.637.118c-.142.205-.463.353-.855.388-.439.039-.761-.052-.936-.152.002-.027.004-.054.006-.081.033-.744.078-1.635-.09-2.499C16.282 4.087 14.003 3 12.166 3z" />
                </svg>
              </a>
            </div>

            {/* App Store */}
            <div className="flex flex-col gap-2">
              <a href="#" className={cn('flex items-center gap-3 bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2.5 transition-all duration-200 group', isAr && 'flex-row-reverse')}>
                <svg className="w-6 h-6 text-white/70 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className={cn(isAr && 'text-right')}>
                  <div className={cn('text-white/40 text-xs', isAr && 'font-tajawal')}>{isAr ? 'تحميل من' : 'Download on the'}</div>
                  <div className={cn('text-white font-semibold text-sm', isAr && 'font-tajawal')}>{isAr ? 'آب ستور' : 'App Store'}</div>
                </div>
              </a>
              <a href="#" className={cn('flex items-center gap-3 bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2.5 transition-all duration-200 group', isAr && 'flex-row-reverse')}>
                <svg className="w-6 h-6 text-white/70 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.17.72.18 1.09-.03l12.43-7.17-2.79-2.79-10.73 9.99zM.5 1.31C.19 1.67 0 2.21 0 2.93v18.14c0 .72.19 1.26.5 1.62l.09.08 10.16-10.16v-.24L.59 1.23.5 1.31zm20.47 9.52l-2.6-1.5-3.12 3.12 3.12 3.12 2.62-1.52c.75-.43.75-1.14-.02-1.58v.08l-.01-.07v.07l.01-.07v-.06zM4.27.24L16.7 7.41l-2.79 2.79-9.64-9.96z" />
                </svg>
                <div className={cn(isAr && 'text-right')}>
                  <div className={cn('text-white/40 text-xs', isAr && 'font-tajawal')}>{isAr ? 'احصلي عليه من' : 'Get it on'}</div>
                  <div className={cn('text-white font-semibold text-sm', isAr && 'font-tajawal')}>{isAr ? 'جوجل بلاي' : 'Google Play'}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Links columns */}
          {([
            footerData.discover,
            footerData.services,
            footerData.company,
            footerData.support,
          ] as typeof footerData.discover[]).map((col) => (
            <div key={col.en} className={isAr ? 'text-right' : ''}>
              <h3 className={cn('text-white font-semibold mb-4', isAr && 'font-tajawal')}>{col[lang]}</h3>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.en}>
                    <Link href={link.href}
                      className={cn('text-white/50 hover:text-purple-300 text-sm transition-colors duration-200', isAr && 'font-tajawal')}>
                      {link[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-purple-500/20 rounded-2xl p-6 mb-8 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5">
          <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4', isAr && 'md:flex-row-reverse')}>
            <div className={isAr ? 'text-right' : ''}>
              <h3 className={cn('text-white font-semibold text-lg mb-1', isAr && 'font-tajawal')}>
                {isAr ? 'ابقي جميلة وعلى اطلاع ✨' : 'Stay Beautiful, Stay Updated ✨'}
              </h3>
              <p className={cn('text-white/50 text-sm', isAr && 'font-tajawal')}>
                {isAr ? 'احصلي على عروض حصرية ونصائح التجميل في بريدك.' : 'Get exclusive offers and beauty tips in your inbox.'}
              </p>
            </div>
            <div className={cn('flex gap-2 flex-shrink-0', isAr && 'flex-row-reverse')}>
              <input
                type="email"
                placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email address'}
                className={cn('bg-white/5 border border-purple-500/20 rounded-full px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-sm w-56', isAr && 'text-right font-tajawal')}
              />
              <button className={cn('bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2', isAr && 'font-tajawal flex-row-reverse')}>
                <Send className="w-4 h-4" />
                {isAr ? 'اشتركي' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={cn('border-t border-purple-500/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4', isAr && 'md:flex-row-reverse')}>
          <p className={cn('text-white/40 text-sm', isAr && 'font-tajawal')}>
            {isAr
              ? '© 2025 بيوتيفا. جميع الحقوق محفوظة'
              : '© 2025 Beautiva. All rights reserved.'}
          </p>
          <div className={cn('flex items-center gap-2 text-white/40 text-sm', isAr && 'flex-row-reverse font-tajawal')}>
            <MapPin className="w-3 h-3" />
            <span>{isAr ? 'الرياض، المملكة العربية السعودية 🇸🇦' : 'Riyadh, Saudi Arabia 🇸🇦'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
