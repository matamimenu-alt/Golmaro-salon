"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, DollarSign, Clock, Star, Plus, Bell, Settings,
  Users, BarChart3, Home, Scissors, ChevronRight, Menu,
  TrendingUp, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Overview", id: "overview" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Scissors, label: "Services", id: "services" },
  { icon: Users, label: "Staff", id: "staff" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const bookings = [
  { id: "B001", customer: "Sara Al-Ahmad", service: "Balayage", time: "10:00 AM", status: "confirmed", amount: 450, avatar: "https://picsum.photos/seed/cust1/100/100" },
  { id: "B002", customer: "Nora Al-Rashid", service: "Gel Manicure", time: "11:30 AM", status: "pending", amount: 120, avatar: "https://picsum.photos/seed/cust2/100/100" },
  { id: "B003", customer: "Hessa Al-Mansouri", service: "Bridal Makeup", time: "2:00 PM", status: "confirmed", amount: 800, avatar: "https://picsum.photos/seed/cust3/100/100" },
  { id: "B004", customer: "Reem Al-Zahrani", service: "HydraFacial", time: "3:30 PM", status: "in-progress", amount: 450, avatar: "https://picsum.photos/seed/cust4/100/100" },
  { id: "B005", customer: "Dana Al-Harbi", service: "Lash Extensions", time: "5:00 PM", status: "pending", amount: 300, avatar: "https://picsum.photos/seed/cust5/100/100" },
];

const stats = [
  { icon: Calendar, label: "Today's Bookings", value: "12", change: "+3 from yesterday", color: "from-blue-500 to-cyan-600", positive: true },
  { icon: DollarSign, label: "Revenue Today", value: "SAR 4,250", change: "+18% from yesterday", color: "from-glamora-gold to-amber-600", positive: true },
  { icon: Clock, label: "Pending Approval", value: "3", change: "2 new since 1h", color: "from-orange-500 to-red-600", positive: false },
  { icon: Star, label: "Average Rating", value: "4.9", change: "↑ 0.1 this week", color: "from-glamora-pink to-purple-600", positive: true },
];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    if (status === "confirmed") return <Badge variant="green">Confirmed</Badge>;
    if (status === "pending") return <Badge variant="gold">Pending</Badge>;
    if (status === "in-progress") return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">In Progress</Badge>;
    return null;
  };

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
            {/* Salon info */}
            <div className="p-4 border-b border-white/10">
              <p className="text-white font-semibold text-sm">Lumière Beauty</p>
              <p className="text-white/40 text-xs">Al Olaya, Riyadh</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-glamora-gold text-glamora-gold" />
                <span className="text-glamora-gold text-xs">4.9 · 342 reviews</span>
              </div>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left",
                    activeNav === item.id ? "bg-glamora-gold/20 text-glamora-gold" : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-3 border-t border-white/10">
              <Link href="/">
                <Button size="sm" variant="outline" className="w-full text-xs">View Live Page</Button>
              </Link>
            </div>
          </aside>
        </>

        {/* Main content */}
        <main className="flex-1 lg:ml-56 p-4 sm:p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white capitalize">{activeNav}</h1>
                <p className="text-white/50 text-sm">Thursday, 26 June 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link href="/booking">
                <Button size="sm"><Plus className="w-4 h-4" /> New Booking</Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
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
                <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
                <p className={cn("text-xs mt-1", stat.positive ? "text-emerald-400" : "text-orange-400")}>{stat.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Bookings table */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="font-semibold text-white">Today&apos;s Bookings</h2>
                <Button size="sm" variant="ghost" className="text-xs">View All <ChevronRight className="w-3 h-3" /></Button>
              </div>
              <div className="divide-y divide-white/5">
                {bookings.map(booking => (
                  <div key={booking.id} className="flex items-center gap-3 p-4 hover:bg-white/5 transition-all">
                    <Avatar src={booking.avatar} name={booking.customer} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{booking.customer}</p>
                      <p className="text-white/50 text-xs">{booking.service} · {booking.time}</p>
                    </div>
                    {getStatusBadge(booking.status)}
                    <span className="text-glamora-gold text-sm font-semibold flex-shrink-0">SAR {booking.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <h2 className="font-semibold text-white mb-3">Quick Actions</h2>
                <div className="space-y-2">
                  {[
                    { icon: Plus, label: "Add New Service", color: "text-glamora-gold" },
                    { icon: Users, label: "Manage Staff", color: "text-blue-400" },
                    { icon: TrendingUp, label: "View Analytics", color: "text-emerald-400" },
                    { icon: MessageSquare, label: "Customer Reviews", color: "text-glamora-pink" },
                    { icon: Settings, label: "Salon Settings", color: "text-white/60" },
                  ].map(action => (
                    <button key={action.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group text-left">
                      <action.icon className={cn("w-4 h-4", action.color)} />
                      <span className="text-white/70 text-sm group-hover:text-white transition-colors">{action.label}</span>
                      <ChevronRight className="w-3 h-3 text-white/20 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue summary */}
              <div className="bg-gradient-to-br from-glamora-gold/10 to-glamora-pink/10 border border-glamora-gold/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-glamora-gold" />
                  <h3 className="text-white font-semibold text-sm">This Month</h3>
                </div>
                <p className="text-3xl font-bold text-glamora-gold mb-1">SAR 68,450</p>
                <p className="text-emerald-400 text-sm">↑ 23% from last month</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-white/50">
                  <span>247 bookings</span>
                  <span>SAR 277 avg</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
