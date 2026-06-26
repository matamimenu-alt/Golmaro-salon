"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Building2, Calendar, Star, Settings,
  TrendingUp, Bell, Search, Menu, Shield,
  CheckCircle, AlertCircle, Clock, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Building2, label: "Salons", id: "salons", count: 30 },
  { icon: Users, label: "Customers", id: "customers", count: 1240 },
  { icon: Calendar, label: "Bookings", id: "bookings", count: 89 },
  { icon: Star, label: "Reviews", id: "reviews" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const platformStats = [
  { icon: Building2, label: "Total Salons", value: "30", sub: "Active listings", color: "from-blue-500 to-cyan-600" },
  { icon: Users, label: "Total Customers", value: "12,450", sub: "+127 this week", color: "from-glamora-pink to-purple-600" },
  { icon: Calendar, label: "Total Bookings", value: "50,234", sub: "+89 today", color: "from-glamora-gold to-amber-600" },
  { icon: DollarSign, label: "Platform Revenue", value: "SAR 2.4M", sub: "+18% this month", color: "from-emerald-500 to-teal-600" },
];

const recentActivity = [
  { icon: Building2, text: "Lumière Beauty Lounge updated their services", time: "2m ago", type: "info" },
  { icon: Users, text: "New customer registration: Sara Al-Ahmad", time: "5m ago", type: "success" },
  { icon: Star, text: "5-star review received for Nakheel Nail Studio", time: "12m ago", type: "success" },
  { icon: AlertCircle, text: "Booking dispute reported for salon #5", time: "34m ago", type: "warning" },
  { icon: Building2, text: "New salon application: Pearl Beauty Jeddah", time: "1h ago", type: "info" },
  { icon: CheckCircle, text: "Malaz Bridal Studio verified and approved", time: "2h ago", type: "success" },
  { icon: DollarSign, text: "Monthly payout processed for 28 salons", time: "3h ago", type: "info" },
];

const pendingSalons = [
  { name: "Rose Garden Spa", location: "Jeddah", applied: "2 days ago", status: "pending" },
  { name: "Emirates Nails", location: "Dubai", applied: "1 day ago", status: "review" },
  { name: "Crystal Touch Spa", location: "Riyadh", applied: "5 hours ago", status: "pending" },
];

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-glamora-dark pt-16">
      <div className="flex">
        {/* Sidebar */}
        <>
          {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
          <aside className={cn(
            "fixed top-16 left-0 bottom-0 w-56 bg-glamora-dark-2 border-r border-white/10 z-40 transition-transform duration-300 flex flex-col",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}>
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Admin Panel</p>
                  <p className="text-white/40 text-xs">Super Admin</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all",
                    activeNav === item.id ? "bg-glamora-gold/20 text-glamora-gold" : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </div>
                  {item.count && (
                    <span className="text-xs bg-white/10 rounded-full px-2 py-0.5">{item.count.toLocaleString()}</span>
                  )}
                </button>
              ))}
            </nav>
          </aside>
        </>

        {/* Main */}
        <main className="flex-1 lg:ml-56 p-4 sm:p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Platform Overview</h1>
                <p className="text-white/50 text-sm">Thursday, 26 June 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-white/40" />
                <input placeholder="Search..." className="bg-transparent text-white text-sm placeholder:text-white/30 outline-none w-32" />
              </div>
              <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {platformStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
                <p className="text-emerald-400 text-xs mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="font-semibold text-white">Recent Activity</h2>
                <Button size="sm" variant="ghost" className="text-xs">View All</Button>
              </div>
              <div className="divide-y divide-white/5">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 p-4">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      activity.type === "success" ? "bg-emerald-500/20 text-emerald-400" :
                      activity.type === "warning" ? "bg-orange-500/20 text-orange-400" :
                      "bg-blue-500/20 text-blue-400"
                    )}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm">{activity.text}</p>
                    </div>
                    <span className="text-white/30 text-xs flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Applications */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h2 className="font-semibold text-white text-sm">Pending Salon Applications</h2>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">{pendingSalons.length}</span>
                </div>
                <div className="divide-y divide-white/5">
                  {pendingSalons.map((salon, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-white text-sm font-medium">{salon.name}</p>
                          <p className="text-white/50 text-xs">{salon.location} · {salon.applied}</p>
                        </div>
                        <Badge variant={salon.status === "review" ? "gold" : "outline"}>{salon.status}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="text-xs flex-1 h-7">Approve</Button>
                        <Button size="sm" variant="dark" className="text-xs flex-1 h-7">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="bg-gradient-to-br from-glamora-gold/10 to-glamora-pink/10 border border-glamora-gold/20 rounded-2xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">Platform Health</h3>
                <div className="space-y-2">
                  {[
                    { label: "Active Salons", value: "28/30", percent: 93 },
                    { label: "Customer Satisfaction", value: "4.8/5.0", percent: 96 },
                    { label: "Booking Success Rate", value: "94%", percent: 94 },
                  ].map(metric => (
                    <div key={metric.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{metric.label}</span>
                        <span className="text-white">{metric.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-full" style={{ width: `${metric.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
