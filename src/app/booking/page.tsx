"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Calendar, User, Tag, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { salons } from "@/lib/data";
import { cn } from "@/lib/utils";

const steps = ["Service & Staff", "Date & Time", "Review", "Confirmation"];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
];

const unavailableSlots = ["10:00 AM", "10:30 AM", "2:00 PM", "4:30 PM", "7:00 PM"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedSalon, setSelectedSalon] = useState(salons[0]);
  const [selectedService, setSelectedService] = useState(salons[0].services[0]);
  const [selectedStaff, setSelectedStaff] = useState(salons[0].staff[0]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [today] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  const bookingRef = `GLM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const discount = couponApplied ? Math.floor(selectedService.price * 0.15) : 0;
  const total = selectedService.price - discount;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
  const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);

  const canProceed = () => {
    if (step === 0) return selectedSalon && selectedService && selectedStaff;
    if (step === 1) return selectedDate !== null && selectedTime !== null;
    return true;
  };

  return (
    <div className="min-h-screen bg-glamora-dark pt-16 pb-10">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all flex-shrink-0",
                  i < step ? "bg-glamora-gold text-white" : i === step ? "bg-gradient-to-r from-glamora-gold to-glamora-pink text-white" : "bg-white/10 text-white/40"
                )}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-2 transition-all", i < step ? "bg-glamora-gold" : "bg-white/10")} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-white/60 text-sm">
            Step {step + 1} of {steps.length}: <span className="text-white">{steps[step]}</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >

            {/* STEP 1: Service & Staff */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Select Service & Staff</h2>

                {/* Salon selector */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Salon</label>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {salons.slice(0, 5).map(salon => (
                      <button
                        key={salon.id}
                        onClick={() => { setSelectedSalon(salon); setSelectedService(salon.services[0]); setSelectedStaff(salon.staff[0]); }}
                        className={cn("flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm", selectedSalon.id === salon.id ? "border-glamora-gold bg-glamora-gold/10 text-glamora-gold" : "border-white/10 text-white/60 hover:text-white")}
                      >
                        <Image src={salon.logo} alt={salon.name.en} width={24} height={24} className="rounded-full object-cover" />
                        {salon.name.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Service</label>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedSalon.services.map(service => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={cn(
                          "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left",
                          selectedService?.id === service.id ? "border-glamora-gold bg-glamora-gold/10" : "border-white/10 hover:border-white/20"
                        )}
                      >
                        <div>
                          <p className="text-white font-medium text-sm">{service.name.en}</p>
                          <p className="text-white/50 text-xs flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{service.duration} min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-glamora-gold font-bold text-sm">SAR {service.price}</span>
                          {selectedService?.id === service.id && <CheckCircle className="w-4 h-4 text-glamora-gold" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Staff */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Staff</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedSalon.staff.map(member => (
                      <button
                        key={member.id}
                        onClick={() => setSelectedStaff(member)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-center",
                          selectedStaff?.id === member.id ? "border-glamora-gold bg-glamora-gold/10" : "border-white/10 hover:border-white/20"
                        )}
                      >
                        <Avatar src={member.photo} name={member.name} size="sm" className="mx-auto mb-2" />
                        <p className="text-white text-xs font-medium">{member.name.split(" ")[0]}</p>
                        <p className="text-white/50 text-xs">{member.role.en}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-glamora-gold text-glamora-gold" />
                          <span className="text-glamora-gold text-xs">{member.rating}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Select Date & Time</h2>

                {/* Calendar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => { if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); } else setCalendarMonth(m => m - 1); }} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium">{monthNames[calendarMonth]} {calendarYear}</span>
                    <button onClick={() => { if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); } else setCalendarMonth(m => m + 1); }} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div key={i} className="text-center text-white/40 text-xs py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                      const isPast = calendarYear === today.getFullYear() && calendarMonth === today.getMonth() && day < today.getDate();
                      return (
                        <button
                          key={day}
                          onClick={() => !isPast && setSelectedDate(day)}
                          disabled={isPast}
                          className={cn(
                            "w-full aspect-square rounded-full text-sm transition-all flex items-center justify-center",
                            isPast ? "text-white/20 cursor-not-allowed" :
                            selectedDate === day ? "bg-gradient-to-br from-glamora-gold to-glamora-pink text-white font-bold" :
                            "text-white/70 hover:bg-white/10"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <label className="text-white/60 text-sm mb-3 block">Available Times for {monthNames[calendarMonth]} {selectedDate}</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map(slot => {
                        const isUnavailable = unavailableSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => !isUnavailable && setSelectedTime(slot)}
                            disabled={isUnavailable}
                            className={cn(
                              "px-2 py-2 rounded-xl text-xs transition-all",
                              isUnavailable ? "bg-white/5 text-white/20 cursor-not-allowed line-through" :
                              selectedTime === slot ? "bg-gradient-to-r from-glamora-gold to-glamora-pink text-white font-semibold" :
                              "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                            )}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Review */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-5">Review Your Booking</h2>
                <div className="space-y-3 mb-5">
                  <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={selectedSalon.logo} alt={selectedSalon.name.en} width={40} height={40} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Salon</p>
                      <p className="text-white font-medium">{selectedSalon.name.en}</p>
                    </div>
                  </div>

                  {[
                    { icon: Tag, label: "Service", value: selectedService?.name.en || "" },
                    { icon: User, label: "Staff", value: selectedStaff?.name || "" },
                    { icon: Calendar, label: "Date", value: selectedDate ? `${monthNames[calendarMonth]} ${selectedDate}, ${calendarYear}` : "" },
                    { icon: Clock, label: "Time", value: selectedTime || "" },
                  ].map(item => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-glamora-gold flex-shrink-0" />
                      <div>
                        <p className="text-white/50 text-xs">{item.label}</p>
                        <p className="text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="GLAMORA15"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-glamora-gold/50 text-sm"
                    />
                    <Button size="sm" variant="outline" onClick={() => { if (couponCode === "GLAMORA15") setCouponApplied(true); }}>
                      Apply
                    </Button>
                  </div>
                  {couponApplied && <p className="text-emerald-400 text-xs mt-1.5 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 15% discount applied!</p>}
                </div>

                {/* Price breakdown */}
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-white/70 text-sm">
                    <span>Service</span><span>SAR {selectedService?.price}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-400 text-sm">
                      <span>Discount (GLAMORA15)</span><span>-SAR {discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-white/10">
                    <span>Total</span><span className="text-glamora-gold">SAR {total}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmation */}
            {step === 3 && (
              <div className="text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-glamora-gold to-glamora-pink flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed! 🎉</h2>
                <p className="text-white/60 mb-6">Your appointment has been successfully booked.</p>

                <div className="bg-glamora-gold/10 border border-glamora-gold/30 rounded-2xl p-4 mb-6 inline-block">
                  <p className="text-white/60 text-xs mb-1">Booking Reference</p>
                  <p className="text-glamora-gold font-mono font-bold text-xl">{bookingRef}</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Salon</span>
                    <span className="text-white">{selectedSalon.name.en}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Service</span>
                    <span className="text-white">{selectedService?.name.en}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Staff</span>
                    <span className="text-white">{selectedStaff?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Date & Time</span>
                    <span className="text-white">{monthNames[calendarMonth]} {selectedDate}, {selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                    <span className="text-white/60">Amount Paid</span>
                    <span className="text-glamora-gold font-bold">SAR {total}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/account" className="flex-1">
                    <Button variant="outline" className="w-full">View My Bookings</Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button className="w-full">Back to Home</Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-4">
            <Button
              variant="dark"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
            >
              {step === 2 ? "Confirm Booking" : "Continue"} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
