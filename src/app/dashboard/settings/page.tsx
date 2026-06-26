'use client'
import { useState } from 'react'
import { Bell, Lock, Crown, AlertTriangle, Check, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [notifs, setNotifs] = useState({
    emailNewBooking: true, emailCancellation: true, emailReview: false, emailPromo: true,
    smsNewBooking: true, smsCancellation: false, smsReview: false, smsPromo: false,
  })

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors flex items-center ${value ? 'bg-glamora-gold' : 'bg-white/20'}`}>
      <div className={`w-4 h-4 rounded-full bg-white mx-0.5 transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-5 h-5 text-glamora-gold" />
        <h2 className="text-white font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  )

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Notifications */}
      <Section title="Notification Preferences" icon={Bell}>
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div />
            <div className="text-center text-white/40 text-xs font-medium">Email</div>
            <div className="text-center text-white/40 text-xs font-medium">SMS</div>
          </div>
          {[
            { label: 'New Booking', emailKey: 'emailNewBooking', smsKey: 'smsNewBooking' },
            { label: 'Cancellation', emailKey: 'emailCancellation', smsKey: 'smsCancellation' },
            { label: 'New Review', emailKey: 'emailReview', smsKey: 'smsReview' },
            { label: 'Promotions', emailKey: 'emailPromo', smsKey: 'smsPromo' },
          ].map(row => (
            <div key={row.label} className="grid grid-cols-3 gap-3 items-center py-2.5 border-b border-white/5 last:border-0">
              <span className="text-white/70 text-sm">{row.label}</span>
              <div className="flex justify-center">
                <Toggle value={notifs[row.emailKey as keyof typeof notifs]} onChange={() => setNotifs(n => ({ ...n, [row.emailKey]: !n[row.emailKey as keyof typeof n] }))} />
              </div>
              <div className="flex justify-center">
                <Toggle value={notifs[row.smsKey as keyof typeof notifs]} onChange={() => setNotifs(n => ({ ...n, [row.smsKey]: !n[row.smsKey as keyof typeof n] }))} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSave} className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-glamora-gold/20 border border-glamora-gold/30 text-glamora-gold hover:bg-glamora-gold/30'}`}>
          {saved ? <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Saved</span> : 'Save Preferences'}
        </button>
      </Section>

      {/* Subscription */}
      <Section title="Subscription" icon={Crown}>
        <div className="bg-gradient-to-br from-glamora-gold/10 to-glamora-pink/10 border border-glamora-gold/20 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-glamora-gold" />
                <span className="text-white font-bold">Professional Plan</span>
              </div>
              <p className="text-white/50 text-sm mt-1">Unlimited services, priority support, analytics</p>
            </div>
            <div className="text-right">
              <div className="text-glamora-gold font-bold text-lg">SAR 199</div>
              <div className="text-white/40 text-xs">/month</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-sm">
            <span className="text-white/50">Renewal Date</span>
            <span className="text-white">July 26, 2026</span>
          </div>
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">
          Upgrade to Premium
        </button>
      </Section>

      {/* Password */}
      <Section title="Change Password" icon={Lock}>
        <div className="space-y-3">
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password', key: 'newPw' },
            { label: 'Confirm New Password', key: 'confirm' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-white/50 text-xs mb-1 block">{f.label}</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'}
                  value={pwForm[f.key as keyof typeof pwForm]}
                  onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50 pr-10" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-2.5 bg-white/10 border border-white/10 rounded-xl text-white text-sm hover:bg-white/15 transition-all mt-2">
            Update Password
          </button>
        </div>
      </Section>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h2 className="text-red-400 font-semibold">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-sm font-medium">Deactivate Account</div>
            <div className="text-white/40 text-xs">Your salon will be hidden from the marketplace</div>
          </div>
          <button className="px-4 py-2 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-all">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  )
}
