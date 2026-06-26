"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, MessageSquare, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const MOCK_COMPLAINTS = [
  { id: "CMP-001", type: "Service Quality", salon: "Lumière Beauty Lounge", date: "2024-12-10", status: "resolved", desc: "The balayage didn't match the reference photo I provided." },
  { id: "CMP-002", type: "Staff Behavior", salon: "Crystal Nails Studio", date: "2024-12-15", status: "under review", desc: "Staff were dismissive and did not listen to my preferences." },
  { id: "CMP-003", type: "Billing Issue", salon: "Radiance Skin Clinic", date: "2024-12-18", status: "pending", desc: "I was charged more than the price shown on Beautiva." },
];

const STEPS = ["Submitted", "Under Review", "Waiting for Response", "Resolved"];

const FAQS = [
  { q: "How long does a complaint take to resolve?", a: "Most complaints are resolved within 3–5 business days. Complex cases may take up to 10 business days." },
  { q: "Can I appeal a complaint decision?", a: "Yes, if you disagree with the resolution, you can escalate within 7 days by contacting our support team." },
  { q: "What types of complaints can I submit?", a: "Service quality, billing issues, staff behavior, hygiene concerns, and any other booking-related issues." },
  { q: "Will the salon know it's me who complained?", a: "Complaints are handled confidentially. Salons receive anonymized feedback unless legal action is required." },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "gold",
  "under review": "pink",
  resolved: "green",
};

export default function ComplaintsPage() {
  const [form, setForm] = useState({ type: "", salonName: "", reference: "", description: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-glamora-dark via-glamora-dark-2 to-glamora-dark" />
        <div className="relative">
          <Badge variant="pink" className="mb-4">Support Center</Badge>
          <h1 className="text-5xl font-bold mb-4"><span className="text-gold-gradient">Complaint</span> Center</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Your feedback helps us maintain the highest standards across all partner salons.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Complaint Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-glamora-pink" /> Submit a Complaint
              </h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Complaint Submitted</h3>
                  <p className="text-white/60">Reference: <span className="text-glamora-gold font-mono">CMP-{Date.now().toString().slice(-5)}</span></p>
                  <p className="text-white/50 text-sm mt-2">We&apos;ll review and respond within 3–5 business days.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-glamora-gold">
                    <option value="" className="bg-glamora-dark">Complaint Type</option>
                    {["Service Quality", "Staff Behavior", "Billing Issue", "Hygiene Concern", "Booking Problem", "Other"].map(t => (
                      <option key={t} value={t} className="bg-glamora-dark">{t}</option>
                    ))}
                  </select>
                  <input required placeholder="Salon Name" value={form.salonName} onChange={e => setForm({ ...form, salonName: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
                  <input placeholder="Booking Reference (optional)" value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
                  <textarea required rows={5} placeholder="Describe your complaint in detail..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold resize-none" />
                  <div className="border border-dashed border-white/20 rounded-xl p-4 text-center">
                    <Upload className="w-6 h-6 text-white/40 mx-auto mb-2" />
                    <p className="text-white/50 text-sm mb-2">Attach supporting photos (optional)</p>
                    <input type="file" accept="image/*" multiple className="text-white/40 text-sm w-full" />
                  </div>
                  <Button type="submit" size="lg" variant="pink" className="w-full">Submit Complaint</Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Status Tracker */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-glamora-gold" /> Complaint Tracker
              </h2>
              <div className="mb-4">
                <p className="text-white/50 text-sm mb-1">Reference: <span className="text-glamora-gold font-mono">CMP-00247</span></p>
                <p className="text-white/40 text-xs">Submitted: Dec 15, 2024</p>
              </div>
              <div className="space-y-4">
                {STEPS.map((step, i) => {
                  const activeStep = 1;
                  const isDone = i < activeStep;
                  const isCurrent = i === activeStep;
                  return (
                    <div key={step} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isDone ? "bg-glamora-gold border-glamora-gold" : isCurrent ? "border-glamora-gold bg-glamora-gold/20" : "border-white/20"}`}>
                        {isDone ? <CheckCircle className="w-4 h-4 text-white" /> : <span className={`text-xs font-bold ${isCurrent ? "text-glamora-gold" : "text-white/30"}`}>{i + 1}</span>}
                      </div>
                      <div className={`${isCurrent ? "text-white" : isDone ? "text-white/60" : "text-white/30"}`}>
                        <p className={`font-medium ${isCurrent ? "text-glamora-gold" : ""}`}>{step}</p>
                        {isCurrent && <p className="text-xs text-white/50 mt-0.5">Currently being reviewed by our team</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* My Complaints */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-glamora-gold" /> My Complaints
          </h2>
          <div className="space-y-4">
            {MOCK_COMPLAINTS.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-glamora-gold font-mono text-sm">{c.id}</span>
                    <Badge variant={STATUS_COLORS[c.status] as "gold" | "pink" | "green" | "default"}>{c.status}</Badge>
                  </div>
                  <p className="text-white font-medium">{c.type} — {c.salon}</p>
                  <p className="text-white/50 text-sm mt-0.5 line-clamp-1">{c.desc}</p>
                </div>
                <p className="text-white/40 text-xs shrink-0">{c.date}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
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
