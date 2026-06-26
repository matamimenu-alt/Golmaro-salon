"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, TrendingUp, CreditCard, BarChart2, Star, Megaphone, HeadphonesIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const BENEFITS = [
  { icon: <TrendingUp className="w-7 h-7" />, title: "More Bookings", desc: "Reach thousands of potential customers actively searching for your services." },
  { icon: <CreditCard className="w-7 h-7" />, title: "Online Payments", desc: "Accept secure online payments and reduce no-shows with instant confirmation." },
  { icon: <BarChart2 className="w-7 h-7" />, title: "Analytics Dashboard", desc: "Get real-time insights on bookings, revenue, and customer behavior." },
  { icon: <Star className="w-7 h-7" />, title: "Customer Reviews", desc: "Build trust with verified reviews from real customers." },
  { icon: <Megaphone className="w-7 h-7" />, title: "Marketing Tools", desc: "Create offers, flash deals, and loyalty programs to retain customers." },
  { icon: <HeadphonesIcon className="w-7 h-7" />, title: "24/7 Support", desc: "Dedicated account manager and round-the-clock technical support." },
];

const PLANS = [
  { name: "Starter", price: "Free", period: "", features: ["5 services listed", "Basic booking calendar", "Email notifications", "Customer reviews", "Glamora directory listing"], cta: "Get Started", highlight: false },
  { name: "Professional", price: "SAR 199", period: "/mo", features: ["Unlimited services", "Advanced booking calendar", "SMS + Email notifications", "Offer & promotions tool", "Analytics dashboard", "Priority listing"], cta: "Start Free Trial", highlight: true },
  { name: "Premium", price: "SAR 399", period: "/mo", features: ["Everything in Professional", "Loyalty program tools", "Home service management", "Staff management", "Custom branding", "Dedicated account manager"], cta: "Start Free Trial", highlight: false },
  { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Premium", "Multi-branch management", "API access", "White-label option", "Custom integrations", "SLA guarantee"], cta: "Contact Sales", highlight: false },
];

const TESTIMONIALS = [
  { name: "Amal Al-Ghamdi", salon: "Lumière Beauty Lounge", quote: "Glamora increased our bookings by 300% in the first 3 months. It's been a game-changer for our business.", avatar: "partner1" },
  { name: "Fatima Al-Rashid", salon: "Crystal Nails Studio", quote: "The analytics dashboard helped us understand peak hours and optimize our staff schedule. Revenue is up 45%.", avatar: "partner2" },
  { name: "Noura Al-Zahrani", salon: "Velvet Touch Beauty", quote: "Our clients love the online booking experience. We've seen a huge reduction in no-shows since joining Glamora.", avatar: "partner3" },
];

const PARTNER_FAQS = [
  { q: "How long does onboarding take?", a: "Our onboarding process typically takes 24-48 hours. Our team will guide you through every step." },
  { q: "Is there a contract commitment?", a: "No long-term contracts! All paid plans are month-to-month with the option to cancel anytime." },
  { q: "How do I receive payments?", a: "Payments are deposited directly to your bank account within 2 business days after each completed booking." },
  { q: "Can I manage multiple branches?", a: "Yes! Our Enterprise plan supports unlimited branches with centralized management." },
  { q: "What commission does Glamora take?", a: "Glamora charges a flat platform fee (your monthly subscription) with no per-booking commission on paid plans." },
];

export default function PartnerPage() {
  const [form, setForm] = useState({ salonName: "", ownerName: "", phone: "", city: "", email: "", type: "", bookings: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-glamora-gold to-glamora-pink" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-6">For Salon Owners</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Grow Your Salon with <span className="text-gold-gradient">Glamora</span>
            </h1>
            <p className="text-white/70 text-xl mb-8 max-w-2xl mx-auto">
              Join 500+ successful salons already growing their business on Saudi Arabia&apos;s #1 beauty platform.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#register"><Button size="xl">List Your Salon Free</Button></a>
              <a href="#plans"><Button size="xl" variant="outline">View Pricing</Button></a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Everything You Need to Succeed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all">
              <div className="text-glamora-gold mb-4">{b.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-white/60 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div id="plans" className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Pricing Plans</h2>
          <p className="text-white/50 text-center mb-10">Start free, scale as you grow</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl p-6 relative ${plan.highlight ? "bg-gradient-to-b from-glamora-gold/20 to-glamora-pink/10 border-2 border-glamora-gold" : "backdrop-blur-md bg-white/5 border border-white/10"}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge variant="gold">Most Popular</Badge></div>}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold text-glamora-gold">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-glamora-gold shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlight ? "default" : "outline"} size="md" className="w-full">{plan.cta}</Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-10">What Salon Owners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-white/70 italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-glamora-gold/20 border border-glamora-gold/30 flex items-center justify-center text-glamora-gold font-bold shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-glamora-gold text-xs">{t.salon}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div id="register" className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-2">Register Your Salon</h2>
          <p className="text-white/50 text-center mb-8">Join for free — no credit card required</p>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Application Submitted!</h3>
              <p className="text-white/60">Our team will contact you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Salon Name" value={form.salonName} onChange={e => setForm({ ...form, salonName: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
              <input required placeholder="Owner Name" value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
              <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-glamora-gold">
                <option value="" className="bg-glamora-dark">Select City</option>
                {["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Al Khobar", "Abha", "Tabuk"].map(c => (
                  <option key={c} value={c} className="bg-glamora-dark">{c}</option>
                ))}
              </select>
              <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-glamora-gold">
                <option value="" className="bg-glamora-dark">Salon Type</option>
                {["Hair", "Nails", "Makeup", "Skincare", "Bridal", "Lashes", "Massage", "Full Service"].map(t => (
                  <option key={t} value={t} className="bg-glamora-dark">{t}</option>
                ))}
              </select>
              <select value={form.bookings} onChange={e => setForm({ ...form, bookings: e.target.value })}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-glamora-gold sm:col-span-2">
                <option value="" className="bg-glamora-dark">Expected Monthly Bookings</option>
                {["1-20", "21-50", "51-100", "101-200", "200+"].map(b => (
                  <option key={b} value={b} className="bg-glamora-dark">{b}</option>
                ))}
              </select>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full">Submit Application</Button>
              </div>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Partner FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {PARTNER_FAQS.map((faq, i) => (
              <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="text-white font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-glamora-gold shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
