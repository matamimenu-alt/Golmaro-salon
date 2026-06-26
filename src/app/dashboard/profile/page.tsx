'use client'
import { useState } from 'react'
import { Save, Check, Building2, Phone, Globe, Clock, Star } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIMES = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return `${h}:${m}`
})

const initialHours = DAYS.map(day => ({ day, open: true, openTime: '09:00', closeTime: '22:00' }))

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [hours, setHours] = useState(initialHours)
  const [profile, setProfile] = useState({
    nameEn: 'Glamora Beauty Riyadh', nameAr: 'غلامورا بيوتي الرياض',
    descEn: 'Premium beauty salon offering luxury services in the heart of Riyadh.',
    descAr: 'صالون تجميل فاخر يقدم خدمات راقية في قلب الرياض.',
    category: 'Full Service Salon', city: 'Riyadh', district: 'Al Olaya',
    phone: '+966 11 234 5678', whatsapp: '+966 50 123 4567',
    email: 'info@glamora.sa', website: 'https://glamora.sa',
    instagram: 'glamorasalon', tiktok: 'glamorasalon', snapchat: 'glamorasalon',
    twitter: 'glamorasalon', facebook: 'glamorasalon', youtube: 'glamorasalon',
    logo: 'https://picsum.photos/seed/salon1logo/200/200',
    cover: 'https://picsum.photos/seed/salon1cover/1200/400',
    mapsLink: '', lat: '24.6877', lng: '46.7219',
    cancellationPolicy: '24-hour cancellation notice required. Late cancellations may incur a 50% fee.',
    bookingRequirements: 'Valid ID required for first booking. Payment at time of service.',
    homeService: false, parking: true, femaleOnly: true, creditCard: true,
  })

  const set = (k: keyof typeof profile, v: string | boolean) => setProfile(p => ({ ...p, [k]: v }))

  const setHour = (idx: number, field: string, value: string | boolean) => {
    setHours(h => h.map((day, i) => i === idx ? { ...day, [field]: value } : day))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-5 h-5 text-glamora-gold" />
        <h2 className="text-white font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  )

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="text-white/50 text-xs mb-1 block">{label}</label>
      {children}
    </div>
  )

  const Input = ({ value, onChange, placeholder, dir }: { value: string; onChange: (v: string) => void; placeholder?: string; dir?: string }) => (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} dir={dir}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 transition-colors" />
  )

  const Toggle = ({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-white/70 text-sm">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors flex items-center ${value ? 'bg-glamora-gold' : 'bg-white/20'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow mx-0.5 transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Salon Profile</h1>
          <p className="text-white/50 text-sm mt-1">Update your salon information visible to customers</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            saved ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-gradient-to-r from-glamora-gold to-glamora-pink text-white hover:opacity-90'
          }`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {/* Cover & Logo */}
      <Section title="Salon Photos" icon={Star}>
        <div className="space-y-4">
          <Field label="Cover Image URL">
            <Input value={profile.cover} onChange={v => set('cover', v)} placeholder="https://..." />
            {profile.cover && <img src={profile.cover} alt="cover" className="mt-2 w-full h-32 object-cover rounded-xl" />}
          </Field>
          <Field label="Logo URL">
            <div className="flex gap-3 items-start">
              <Input value={profile.logo} onChange={v => set('logo', v)} placeholder="https://..." />
              {profile.logo && <img src={profile.logo} alt="logo" className="w-12 h-12 rounded-xl object-cover shrink-0" />}
            </div>
          </Field>
        </div>
      </Section>

      {/* Basic Info */}
      <Section title="Basic Information" icon={Building2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Salon Name (English)"><Input value={profile.nameEn} onChange={v => set('nameEn', v)} /></Field>
          <Field label="Salon Name (Arabic)"><Input value={profile.nameAr} onChange={v => set('nameAr', v)} dir="rtl" /></Field>
          <Field label="Category"><Input value={profile.category} onChange={v => set('category', v)} /></Field>
          <Field label="City"><Input value={profile.city} onChange={v => set('city', v)} /></Field>
          <Field label="District"><Input value={profile.district} onChange={v => set('district', v)} /></Field>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Description (English)">
            <textarea value={profile.descEn} onChange={e => set('descEn', e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
          </Field>
          <Field label="Description (Arabic)">
            <textarea value={profile.descAr} onChange={e => set('descAr', e.target.value)} rows={3} dir="rtl"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
          </Field>
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact Information" icon={Phone}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone"><Input value={profile.phone} onChange={v => set('phone', v)} /></Field>
          <Field label="WhatsApp"><Input value={profile.whatsapp} onChange={v => set('whatsapp', v)} /></Field>
          <Field label="Email"><Input value={profile.email} onChange={v => set('email', v)} /></Field>
          <Field label="Website"><Input value={profile.website} onChange={v => set('website', v)} /></Field>
        </div>
      </Section>

      {/* Social Media */}
      <Section title="Social Media" icon={Globe}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(['instagram', 'tiktok', 'snapchat', 'twitter', 'facebook', 'youtube'] as const).map(platform => (
            <Field key={platform} label={platform.charAt(0).toUpperCase() + platform.slice(1)}>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-glamora-gold/50 transition-colors">
                <span className="text-white/30 text-sm">@</span>
                <input value={profile[platform]} onChange={e => set(platform, e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none" />
              </div>
            </Field>
          ))}
        </div>
      </Section>

      {/* Working Hours */}
      <Section title="Working Hours" icon={Clock}>
        <div className="space-y-2">
          {hours.map((day, idx) => (
            <div key={day.day} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-24 text-white/70 text-sm">{day.day}</div>
              <button onClick={() => setHour(idx, 'open', !day.open)}
                className={`w-10 h-5 rounded-full transition-colors flex items-center shrink-0 ${day.open ? 'bg-glamora-gold' : 'bg-white/20'}`}>
                <div className={`w-4 h-4 rounded-full bg-white mx-0.5 transition-transform ${day.open ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
              {day.open ? (
                <div className="flex items-center gap-2 flex-1">
                  <select value={day.openTime} onChange={e => setHour(idx, 'openTime', e.target.value)}
                    className="flex-1 bg-[#12071F] border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-glamora-gold/40">
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="text-white/30 text-xs">to</span>
                  <select value={day.closeTime} onChange={e => setHour(idx, 'closeTime', e.target.value)}
                    className="flex-1 bg-[#12071F] border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-glamora-gold/40">
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              ) : (
                <span className="text-white/30 text-sm">Closed</span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section title="Salon Features" icon={Star}>
        <div className="grid grid-cols-2 gap-1">
          <Toggle value={profile.homeService} onChange={v => set('homeService', v)} label="Home Service Available" />
          <Toggle value={profile.parking} onChange={v => set('parking', v)} label="Free Parking" />
          <Toggle value={profile.femaleOnly} onChange={v => set('femaleOnly', v)} label="Female Staff Only" />
          <Toggle value={profile.creditCard} onChange={v => set('creditCard', v)} label="Credit Card Accepted" />
        </div>
      </Section>

      {/* Policies */}
      <Section title="Policies" icon={Building2}>
        <div className="space-y-4">
          <Field label="Cancellation Policy">
            <textarea value={profile.cancellationPolicy} onChange={e => set('cancellationPolicy', e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
          </Field>
          <Field label="Booking Requirements">
            <textarea value={profile.bookingRequirements} onChange={e => set('bookingRequirements', e.target.value)} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
          </Field>
        </div>
      </Section>

      <button onClick={handleSave}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          saved ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-gradient-to-r from-glamora-gold to-glamora-pink text-white hover:opacity-90'
        }`}>
        {saved ? '✓ Changes Saved!' : 'Save All Changes'}
      </button>
    </div>
  )
}
