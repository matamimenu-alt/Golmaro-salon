"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, Heart, Menu, X,
  Sparkles, Globe
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", labelAr: "الرئيسية", href: "/" },
  { label: "Salons", labelAr: "الصالونات", href: "/salons" },
  { label: "Services", labelAr: "الخدمات", href: "/salons" },
  { label: "Offers", labelAr: "العروض", href: "/salons" },
  { label: "Blog", labelAr: "المدونة", href: "/" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-glamora-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gold-gradient">
                {isArabic ? "غلامورا" : "Glamora"}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  {isArabic ? link.labelAr : link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:block">{isArabic ? "بحث..." : "Search..."}</span>
              </button>

              {/* Lang toggle */}
              <button
                onClick={() => setIsArabic(!isArabic)}
                className="hidden md:flex items-center gap-1 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-2 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>{isArabic ? "EN" : "AR"}</span>
              </button>

              {/* Icons */}
              <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200">
                <Bell className="w-4 h-4" />
              </button>
              <button className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-glamora-pink transition-all duration-200">
                <Heart className="w-4 h-4" />
              </button>

              {/* Auth buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link href="/account">
                  <Button variant="ghost" size="sm">
                    {isArabic ? "تسجيل الدخول" : "Login"}
                  </Button>
                </Link>
                <Link href="/account">
                  <Button size="sm">
                    {isArabic ? "سجلي الآن" : "Sign Up"}
                  </Button>
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search bar dropdown */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pb-4"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder={isArabic ? "ابحثي عن صالون أو خدمة..." : "Search for a salon or service..."}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-glamora-gold/50"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-glamora-dark-2 border-l border-white/10 z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gold-gradient">Glamora</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 mb-1"
                  >
                    <span>{isArabic ? link.labelAr : link.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => setIsArabic(!isArabic)}
                  className="w-full flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl px-4 py-2.5 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span>{isArabic ? "Switch to English" : "التبديل للعربية"}</span>
                </button>
                <div className="flex gap-2">
                  <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Login</Button>
                  </Link>
                  <Link href="/account" onClick={() => setIsMenuOpen(false)} className="flex-1">
                    <Button size="sm" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
