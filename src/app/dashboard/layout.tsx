'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Scissors, Grid3X3, Package, Tag, Ticket,
  Calendar, Users, Star, Image, Building2, BarChart3, Settings,
  ChevronLeft, ChevronRight, Menu, X, LogOut, Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/services', icon: Scissors, label: 'Services' },
  { href: '/dashboard/categories', icon: Grid3X3, label: 'Categories' },
  { href: '/dashboard/packages', icon: Package, label: 'Packages' },
  { href: '/dashboard/offers', icon: Tag, label: 'Offers' },
  { href: '/dashboard/coupons', icon: Ticket, label: 'Coupons' },
  { href: '/dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { href: '/dashboard/customers', icon: Users, label: 'Customers' },
  { href: '/dashboard/reviews', icon: Star, label: 'Reviews' },
  { href: '/dashboard/gallery', icon: Image, label: 'Gallery' },
  { href: '/dashboard/profile', icon: Building2, label: 'Salon Profile' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-[#1A0A2E] flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-50 bg-[#12071F] border-r border-white/10 flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className={cn('flex items-center gap-3 p-4 border-b border-white/10', collapsed && 'justify-center px-2')}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#E91E8C] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-sm">Glamora</p>
              <p className="text-white/40 text-xs">Dashboard</p>
            </div>
          )}
        </div>

        {/* Salon info */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://picsum.photos/seed/logo1/100/100" alt="salon" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">Lumière Beauty</p>
                <p className="text-white/40 text-xs truncate">Al Olaya, Riyadh</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                collapsed ? 'justify-center px-2' : '',
                isActive(item.href)
                  ? 'bg-[#D4A853]/20 text-[#D4A853] border border-[#D4A853]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm"
          >
            {collapsed
              ? <ChevronRight className="w-4 h-4 mx-auto" />
              : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>
            }
          </button>
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Exit</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className={cn('flex-1 flex flex-col min-h-screen transition-all duration-300', collapsed ? 'lg:pl-16' : 'lg:pl-60')}>
        {/* Top bar */}
        <header className="h-14 bg-[#12071F]/80 backdrop-blur border-b border-white/10 flex items-center px-4 gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4A853]/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/owner/100/100" alt="owner" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
