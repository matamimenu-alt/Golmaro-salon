"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Settings, Calendar, Star, Award,
  Edit2, CheckCircle, X, Clock, QrCode, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { sampleBookings, salons } from "@/lib/data";
import { cn } from "@/lib/utils";

type TabType = "upcoming" | "completed" | "cancelled" | "wishlist" | "settings";


export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [notifications, setNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const upcomingBookings = sampleBookings.filter(b => b.status === "upcoming");
  const completedBookings = sampleBookings.filter(b => b.status === "completed");
  const cancelledBookings = sampleBookings.filter(b => b.status === "cancelled");
  const wishlisted = salons.filter(s => s.isLuxury).slice(0, 4);

  const tabs: { id: TabType; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "upcoming", label: "Upcoming", icon: Calendar, count: upcomingBookings.length },
    { id: "completed", label: "Completed", icon: CheckCircle, count: completedBookings.length },
    { id: "cancelled", label: "Cancelled", icon: X, count: cancelledBookings.length },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlisted.length },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "upcoming") return <Badge variant="green">Upcoming</Badge>;
    if (status === "completed") return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">Completed</Badge>;
    if (status === "cancelled") return <Badge variant="red">Cancelled</Badge>;
    return null;
  };

  const BookingCard = ({ booking }: { booking: typeof sampleBookings[0] }) => (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-glamora-gold/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-white font-medium">{booking.salonName}</h3>
          <p className="text-white/60 text-sm">{booking.service}</p>
          <p className="text-white/40 text-xs">with {booking.staff}</p>
        </div>
        {getStatusBadge(booking.status)}
      </div>
      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.date}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.time}</span>
        <span className="text-glamora-gold font-semibold">SAR {booking.price}</span>
      </div>
      <div className="flex gap-2">
        {booking.status === "upcoming" && (
          <>
            <Button size="sm" variant="outline" className="text-xs">Reschedule</Button>
            <Button size="sm" variant="ghost" className="text-xs text-red-400 hover:text-red-300">Cancel</Button>
          </>
        )}
        {booking.status === "completed" && (
          <>
            <Link href={`/salons/${booking.salonId}`}><Button size="sm" className="text-xs">Rebook</Button></Link>
            <Button size="sm" variant="dark" className="text-xs">Rate & Review</Button>
          </>
        )}
        {booking.status === "cancelled" && (
          <Link href={`/salons/${booking.salonId}`}><Button size="sm" variant="outline" className="text-xs">Book Again</Button></Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-glamora-dark pt-16 pb-10">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-glamora-dark-2 to-glamora-dark-3 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start gap-5">
            <div className="relative">
              <Avatar name="Nora Al-Mansouri" size="xl" />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-glamora-gold flex items-center justify-center">
                <Edit2 className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-xl font-bold text-white">Nora Al-Mansouri</h1>
                  <p className="text-white/50 text-sm">nora@email.com · +966-50-123-4567</p>
                </div>
                <Badge variant="gold" className="text-sm px-3 py-1">✨ Gold Member</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/60">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-glamora-gold" />12 bookings</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-glamora-gold" />350 points</span>
                <span className="flex items-center gap-1"><Award className="w-4 h-4 text-glamora-gold" />Bronze Level</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loyalty Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-white font-semibold mb-3">Loyalty Card</h2>
          <div className="relative bg-gradient-to-br from-glamora-dark-3 via-glamora-dark-2 to-glamora-dark rounded-2xl p-6 border border-glamora-gold/20 overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-glamora-gold/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-glamora-pink/5 translate-y-1/2" />

            <div className="relative flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-glamora-gold" />
                  <span className="text-glamora-gold font-bold text-lg">Glamora</span>
                </div>
                <p className="text-white/40 text-xs">LOYALTY CARD</p>
              </div>
              <div className="text-right">
                <Badge variant="gold" className="mb-1">Bronze</Badge>
                <p className="text-glamora-gold font-bold text-xl">350 pts</p>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/40 text-xs mb-1">MEMBER</p>
                <p className="text-white font-semibold">Nora Al-Mansouri</p>
                <p className="text-white/50 text-xs mt-1">Member since Jan 2024</p>
              </div>
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-glamora-dark" />
              </div>
            </div>

            {/* Progress to next level */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs text-white/50 mb-1">
                <span>Bronze</span>
                <span>350 / 1,000 pts to Silver</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-full" style={{ width: "35%" }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === tab.id ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={cn("text-xs px-1.5 py-0.5 rounded-full", activeTab === tab.id ? "bg-white/20" : "bg-glamora-gold/20 text-glamora-gold")}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

          {/* Upcoming bookings */}
          {activeTab === "upcoming" && (
            <div className="space-y-3">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12 text-white/40">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No upcoming bookings</p>
                  <Link href="/salons"><Button className="mt-4">Book a Service</Button></Link>
                </div>
              ) : (
                upcomingBookings.map(b => <BookingCard key={b.id} booking={b} />)
              )}
            </div>
          )}

          {/* Completed bookings */}
          {activeTab === "completed" && (
            <div className="space-y-3">
              {completedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
          )}

          {/* Cancelled bookings */}
          {activeTab === "cancelled" && (
            <div className="space-y-3">
              {cancelledBookings.length === 0 ? (
                <div className="text-center py-12 text-white/40">
                  <X className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No cancelled bookings</p>
                </div>
              ) : (
                cancelledBookings.map(b => <BookingCard key={b.id} booking={b} />)
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlisted.map(salon => (
                <div key={salon.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-glamora-gold/30 transition-all group">
                  <div className="relative h-32 overflow-hidden">
                    <Image src={salon.cover} alt={salon.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark/80 to-transparent" />
                    <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 flex items-center justify-center">
                      <Heart className="w-3 h-3 fill-glamora-pink text-glamora-pink" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm mb-1">{salon.name.en}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Rating value={salon.rating} size="sm" />
                      <span className="text-glamora-gold text-xs">{salon.rating}</span>
                    </div>
                    <Link href={`/salons/${salon.id}`}><Button size="sm" className="w-full">Book Now</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="text-white font-semibold">Profile Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "Full Name", value: "Nora Al-Mansouri", type: "text" },
                    { label: "Email", value: "nora@email.com", type: "email" },
                    { label: "Phone", value: "+966-50-123-4567", type: "tel" },
                    { label: "City", value: "Riyadh", type: "text" },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="text-white/60 text-xs mb-1 block">{field.label}</label>
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-glamora-gold/50"
                      />
                    </div>
                  ))}
                </div>
                <Button size="sm">Save Changes</Button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="text-white font-semibold">Notifications</h3>
                {[
                  { label: "Email Notifications", desc: "Booking confirmations, reminders", value: notifications, set: setNotifications },
                  { label: "SMS Notifications", desc: "Appointment reminders via SMS", value: smsNotifications, set: setSmsNotifications },
                ].map(setting => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">{setting.label}</p>
                      <p className="text-white/40 text-xs">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => setting.set(!setting.value)}
                      className={cn(
                        "w-11 h-6 rounded-full transition-all relative",
                        setting.value ? "bg-glamora-gold" : "bg-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                        setting.value ? "left-6" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
