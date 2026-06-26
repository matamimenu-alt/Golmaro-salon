"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Camera, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const FAQS = [
  { q: "How do I book an appointment?", a: "Simply browse our salons, select your preferred service and time slot, and confirm your booking. You'll receive a confirmation via SMS and email." },
  { q: "Can I cancel or reschedule my booking?", a: "Yes! You can cancel or reschedule up to 2 hours before your appointment through the app or website at no charge." },
  { q: "Are prices listed inclusive of VAT?", a: "All prices shown on Glamora include 15% VAT as per Saudi regulations." },
  { q: "What if I'm not satisfied with the service?", a: "Your satisfaction is our priority. Contact us within 24 hours of your appointment and we'll work with the salon to find a solution." },
  { q: "How do I become a partner salon?", a: "Visit our Partner page and fill out the registration form. Our team will reach out within 2 business days." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="relative">
          <Badge variant="gold" className="mb-4">Get in Touch</Badge>
          <h1 className="text-5xl font-bold mb-4"><span className="text-gold-gradient">Contact</span> Us</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">We&apos;d love to hear from you. Our team is here to help.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-2xl">✓</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold w-full" />
                    <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold w-full" />
                  </div>
                  <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold w-full" />
                  <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-glamora-gold w-full">
                    <option value="" className="bg-glamora-dark">Select Subject</option>
                    <option value="booking" className="bg-glamora-dark">Booking Inquiry</option>
                    <option value="partner" className="bg-glamora-dark">Partnership</option>
                    <option value="complaint" className="bg-glamora-dark">Complaint</option>
                    <option value="other" className="bg-glamora-dark">Other</option>
                  </select>
                  <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold w-full resize-none" />
                  <Button type="submit" size="lg" className="w-full">Send Message</Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            {[
              { icon: <Phone className="w-5 h-5" />, title: "Phone", value: "+966-11-000-0000", sub: "Sun–Thu, 9am–6pm" },
              { icon: <Mail className="w-5 h-5" />, title: "Email", value: "hello@glamora.sa", sub: "We reply within 24h" },
              { icon: <MapPin className="w-5 h-5" />, title: "Address", value: "Al Olaya District, Riyadh", sub: "Saudi Arabia" },
              { icon: <Clock className="w-5 h-5" />, title: "Hours", value: "Sun–Thu: 9am–6pm", sub: "Fri–Sat: Closed" },
            ].map(info => (
              <div key={info.title} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-glamora-gold/20 border border-glamora-gold/30 flex items-center justify-center text-glamora-gold shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-white/50 text-sm">{info.title}</p>
                  <p className="text-white font-semibold">{info.value}</p>
                  <p className="text-white/40 text-xs">{info.sub}</p>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl h-52 flex flex-col items-center justify-center gap-3">
              <MapPin className="w-10 h-10 text-glamora-gold" />
              <p className="text-white/50 font-medium">Map Placeholder</p>
              <p className="text-white/30 text-sm">Al Olaya, Riyadh, Saudi Arabia</p>
            </div>

            {/* Social Media */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/50 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", icon: <Camera className="w-5 h-5" />, color: "from-pink-500 to-purple-600" },
                  { name: "Twitter / X", icon: <MessageCircle className="w-5 h-5" />, color: "from-sky-400 to-blue-500" },
                  { name: "Snapchat", icon: <span className="text-sm font-bold">SC</span>, color: "from-yellow-400 to-yellow-500" },
                  { name: "TikTok", icon: <span className="text-sm font-bold">TT</span>, color: "from-black to-glamora-pink" },
                ].map(s => (
                  <button key={s.name} className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white hover:scale-110 transition-transform`}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="text-white font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-glamora-gold shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
