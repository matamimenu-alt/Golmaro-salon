'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Heart, Menu, X } from 'lucide-react'
import { useLang, translations } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const navLinks = [
  { key: 'home',     href: '/' },
  { key: 'salons',   href: '/salons' },
  { key: 'services', href: '/salons' },
  { key: 'offers',   href: '/offers' },
  { key: 'blog',     href: '/blog' },
]

/* ── Beautiva SVG Logo ── */
function BeautivaLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bvGrad" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="29" fill="url(#bvGrad)" opacity="0.12" stroke="url(#bvGrad)" strokeWidth="1" strokeOpacity="0.3" />
      {/* Woman silhouette path */}
      <path d="M30 12 C26 12 23 15 23 19 C23 22 24.5 24.5 27 25.5 L25 34 L35 34 L33 25.5 C35.5 24.5 37 22 37 19 C37 15 34 12 30 12Z" fill="url(#bvGrad)" opacity="0.9" />
      {/* Flowing hair */}
      <path d="M24 18 C21 16 19 20 20 24 C21 26 22 27 23 27" stroke="url(#bvGrad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M36 18 C39 16 41 20 40 24 C39 26 38 27 37 27" stroke="url(#bvGrad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Leaf accent */}
      <ellipse cx="43" cy="13" rx="4" ry="7" fill="url(#bvGrad)" opacity="0.75" transform="rotate(-35 43 13)" />
      <ellipse cx="46.5" cy="9" rx="2.5" ry="5" fill="url(#bvGrad)" opacity="0.5" transform="rotate(-55 46.5 9)" />
      {/* B letter */}
      <text x="8" y="52" fontSize="28" fontWeight="900" fill="url(#bvGrad)" fontFamily="Georgia, serif" letterSpacing="-1">B</text>
    </svg>
  )
}

export default function Header() {
  const { lang, isAr, setLang } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = translations.nav

  return (
    <>
      <header dir={isAr ? 'rtl' : 'ltr'} className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0D0520]/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-900/30'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative">
                <BeautivaLogo size={40} />
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-lg group-hover:bg-purple-500/20 transition-all" />
              </div>
              <div>
                <span className={cn(
                  'text-xl font-bold bg-gradient-to-r from-[#9333EA] to-[#D946EF] bg-clip-text text-transparent tracking-wide',
                  isAr && 'font-tajawal'
                )}>
                  {isAr ? 'بيوتيفا' : 'Beautiva'}
                </span>
                {isScrolled && (
                  <p className="text-white/30 text-[9px] leading-none hidden lg:block">
                    {isAr ? 'منصة الجمال الأولى' : 'Beauty Marketplace'}
                  </p>
                )}
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(link => (
                <Link key={link.key} href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-purple-500/10 transition-all duration-200',
                    isAr && 'font-tajawal'
                  )}>
                  {nav[link.key as keyof typeof nav][lang]}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className={cn('flex items-center gap-2', isAr && 'flex-row-reverse')}>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-all duration-200 min-w-[160px]"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span className={cn(isAr && 'font-tajawal')}>
                  {isAr ? 'بحث...' : 'Search...'}
                </span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-2 transition-all duration-200 group"
                title={isAr ? 'Switch to English' : 'التبديل للعربية'}
              >
                <span className="text-lg leading-none">{isAr ? '🇺🇸' : '🇸🇦'}</span>
                <span className={cn('text-xs font-medium text-white/70 group-hover:text-white transition-colors', isAr && 'font-tajawal')}>
                  {isAr ? 'EN' : 'عربي'}
                </span>
              </button>

              {/* Wishlist */}
              <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 text-white/60 hover:text-[#D946EF] transition-all duration-200">
                <Heart className="w-4 h-4" />
              </button>

              {/* Notifications */}
              <button className="hidden md:flex w-9 h-9 relative items-center justify-center rounded-full bg-white/5 hover:bg-purple-500/10 border border-purple-500/20 text-white/60 hover:text-white transition-all duration-200">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#D946EF] rounded-full" />
              </button>

              {/* Auth */}
              <div className="hidden md:flex items-center gap-2">
                <Link href="/account" className={cn(
                  'text-sm text-white/70 hover:text-white px-3 py-2 rounded-full hover:bg-purple-500/10 transition-all',
                  isAr && 'font-tajawal'
                )}>
                  {nav.login[lang]}
                </Link>
                <Link href="/account" className={cn(
                  'text-sm font-semibold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25',
                  isAr && 'font-tajawal'
                )}>
                  {nav.register[lang]}
                </Link>
              </div>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-purple-500/20 bg-[#0D0520]/95 backdrop-blur-md"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30', isAr ? 'right-3' : 'left-3')} />
                    <input
                      autoFocus
                      value={searchVal}
                      onChange={e => setSearchVal(e.target.value)}
                      placeholder={isAr ? 'ابحثي عن صالونات، خدمات، عروض...' : 'Search salons, services, offers...'}
                      className={cn(
                        'w-full bg-white/5 border border-purple-500/20 rounded-xl py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 placeholder:text-white/30',
                        isAr ? 'pr-10 pl-4 text-right font-tajawal' : 'pl-10 pr-4'
                      )}
                    />
                  </div>
                  <Link href={`/search?q=${searchVal}`} onClick={() => setSearchOpen(false)}
                    className={cn('px-5 py-3 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap', isAr && 'font-tajawal')}>
                    {isAr ? 'بحث' : 'Search'}
                  </Link>
                  <button onClick={() => setSearchOpen(false)} className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-white border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className={cn('flex gap-2 mt-3 flex-wrap', isAr && 'justify-end')}>
                  {(isAr
                    ? ['قص الشعر', 'مانيكير', 'ميكب', 'علاج البشرة', 'عرائس', 'رموش']
                    : ['Hair Cut', 'Manicure', 'Makeup', 'Facial', 'Bridal', 'Lashes']
                  ).map(s => (
                    <button key={s} onClick={() => setSearchVal(s)}
                      className={cn('text-xs px-3 py-1.5 border border-purple-500/20 text-white/50 rounded-full hover:border-purple-400/50 hover:text-purple-300 transition-all', isAr && 'font-tajawal')}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" dir={isAr ? 'rtl' : 'ltr'}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: isAr ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn('absolute top-0 h-full w-72 bg-[#0D0520] border-purple-500/20 flex flex-col', isAr ? 'right-0 border-l' : 'left-0 border-r')}
            >
              <div className="flex items-center justify-between p-5 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <BeautivaLogo size={34} />
                  <span className={cn('font-bold bg-gradient-to-r from-[#9333EA] to-[#D946EF] bg-clip-text text-transparent', isAr && 'font-tajawal')}>
                    {isAr ? 'بيوتيفا' : 'Beautiva'}
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navLinks.map(link => (
                  <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                    className={cn('flex items-center px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-purple-500/10 transition-all text-sm', isAr && 'justify-end font-tajawal')}>
                    {nav[link.key as keyof typeof nav][lang]}
                  </Link>
                ))}
                <div className="pt-3 border-t border-purple-500/20 space-y-1">
                  {[
                    { key: 'about',   href: '/about' },
                    { key: 'contact', href: '/contact' },
                    { key: 'partner', href: '/partner' },
                  ].map(link => (
                    <Link key={link.key} href={link.href} onClick={() => setMobileOpen(false)}
                      className={cn('flex items-center px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-purple-500/10 transition-all text-sm', isAr && 'justify-end font-tajawal')}>
                      {nav[link.key as keyof typeof nav][lang]}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="p-4 border-t border-purple-500/20 space-y-3">
                <button
                  onClick={() => { setLang(isAr ? 'en' : 'ar'); setMobileOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-purple-500/20 rounded-xl text-white/60 hover:text-white hover:border-purple-500/40 transition-all"
                >
                  <span className="text-lg">{isAr ? '🇺🇸' : '🇸🇦'}</span>
                  <span className={cn('text-sm', isAr && 'font-tajawal')}>{isAr ? 'Switch to English' : 'التبديل للعربية'}</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/account" onClick={() => setMobileOpen(false)}
                    className={cn('py-2.5 border border-purple-500/20 rounded-xl text-white/60 hover:text-white text-center text-sm transition-all', isAr && 'font-tajawal')}>
                    {nav.login[lang]}
                  </Link>
                  <Link href="/account" onClick={() => setMobileOpen(false)}
                    className={cn('py-2.5 bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white rounded-xl text-center text-sm font-semibold hover:opacity-90 transition-opacity', isAr && 'font-tajawal')}>
                    {nav.register[lang]}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
