'use client'
import { useState } from 'react'
import { TrendingUp, Users, Star, DollarSign, Calendar, BarChart3 } from 'lucide-react'
import { useGlamoraStore } from '@/lib/store'

const SALON_ID = '1'
const RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months']

const revenueData7 = [1200, 1800, 1400, 2100, 1700, 2400, 1900]
const revenueData30 = [900, 1100, 1400, 1200, 1600, 1800, 1500, 2000, 1700, 1900, 2100, 2300, 1800, 2500, 2200, 2000, 1600, 1800, 2100, 2400, 2000, 2200, 2500, 2700, 2300, 2100, 2400, 2600, 2800, 2500]

function LineChart({ data, color = '#D4A853' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 600, h = 120
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min || 1)) * (h - 20) - 10
  }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const fill = `${path} L ${pts[pts.length-1].x} ${h} L 0 ${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#lineGrad)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />)}
    </svg>
  )
}

function BarChart({ data, labels, color = '#E91E8C' }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data)
  return (
    <div className="space-y-2">
      {data.map((v, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-28 text-white/50 text-xs truncate text-right">{labels[i]}</div>
          <div className="flex-1 bg-white/5 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(v / max) * 100}%`, background: color }} />
          </div>
          <div className="w-8 text-white/50 text-xs">{v}</div>
        </div>
      ))}
    </div>
  )
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  let offset = 0
  const r = 40, cx = 50, cy = 50, circumference = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-24 h-24">
        {segments.map(seg => {
          const pct = seg.value / total
          const dash = pct * circumference
          const el = (
            <circle key={seg.label} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color}
              strokeWidth="18" strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset * circumference} style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }} />
          )
          offset += pct
          return el
        })}
      </svg>
      <div className="space-y-1.5">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-white/60">{s.label}</span>
            <span className="text-white font-semibold ml-auto">{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [range, setRange] = useState('Last 7 Days')
  const { bookings, services } = useGlamoraStore()
  const myBookings = bookings.filter(b => b.salonId === SALON_ID)
  const myServices = services.filter(s => s.salonId === SALON_ID)

  const revenue = myBookings.filter(b => b.status === 'completed').reduce((a, b) => a + b.amount, 0)
  const avgRating = 4.8
  const completionRate = myBookings.length > 0
    ? Math.round((myBookings.filter(b => b.status === 'completed').length / myBookings.length) * 100)
    : 0
  const cancellationRate = myBookings.length > 0
    ? Math.round((myBookings.filter(b => b.status === 'cancelled').length / myBookings.length) * 100)
    : 0

  const revenueData = range === 'Last 7 Days' ? revenueData7 : revenueData30.slice(0, range === 'Last 30 Days' ? 30 : 30)

  const topServiceLabels = myServices.slice(0, 5).map(s => s.name)
  const topServiceData = [42, 35, 28, 22, 18]

  const statusData = [
    { label: 'Completed', value: myBookings.filter(b => b.status === 'completed').length || 12, color: '#10B981' },
    { label: 'Confirmed', value: myBookings.filter(b => b.status === 'confirmed').length || 8, color: '#3B82F6' },
    { label: 'Pending', value: myBookings.filter(b => b.status === 'pending').length || 5, color: '#F59E0B' },
    { label: 'Cancelled', value: myBookings.filter(b => b.status === 'cancelled').length || 3, color: '#EF4444' },
  ]

  const kpis = [
    { label: 'Total Revenue', value: `SAR ${revenue.toLocaleString() || '24,500'}`, icon: DollarSign, color: 'text-glamora-gold', bg: 'from-glamora-gold/20 to-transparent' },
    { label: 'Total Bookings', value: myBookings.length || 145, icon: Calendar, color: 'text-blue-400', bg: 'from-blue-400/20 to-transparent' },
    { label: 'New Customers', value: 32, icon: Users, color: 'text-glamora-pink', bg: 'from-glamora-pink/20 to-transparent' },
    { label: 'Avg Rating', value: avgRating, icon: Star, color: 'text-yellow-400', bg: 'from-yellow-400/20 to-transparent' },
    { label: 'Completion Rate', value: `${completionRate || 83}%`, icon: TrendingUp, color: 'text-green-400', bg: 'from-green-400/20 to-transparent' },
    { label: 'Cancellation Rate', value: `${cancellationRate || 7}%`, icon: BarChart3, color: 'text-red-400', bg: 'from-red-400/20 to-transparent' },
  ]

  const HOURS = ['6am','8am','10am','12pm','2pm','4pm','6pm','8pm','10pm']
  const heatmap = DAYS.map(() => HOURS.map(() => Math.random()))
  const DAYS_SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-white/50 text-sm mt-1">Business performance overview</p>
        </div>
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {RANGES.map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${range === r ? 'bg-glamora-gold text-black' : 'text-white/50 hover:text-white'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={`bg-gradient-to-br ${k.bg} border border-white/10 rounded-2xl p-4`}>
            <k.icon className={`w-5 h-5 ${k.color} mb-3`} />
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-white/40 text-xs mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Revenue Trend (SAR)</h3>
        <LineChart data={revenueData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Services */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Top Services by Bookings</h3>
          <BarChart data={topServiceData} labels={topServiceLabels.length >= 5 ? topServiceLabels : ['Hair Color', 'Blow Dry', 'Manicure', 'Facial', 'Makeup']} />
        </div>

        {/* Booking Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Booking Status Distribution</h3>
          <DonutChart segments={statusData} />
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Peak Hours Heatmap</h3>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="flex gap-1 mb-2">
              <div className="w-8" />
              {HOURS.map(h => <div key={h} className="flex-1 text-center text-white/30 text-xs">{h}</div>)}
            </div>
            {DAYS_SHORT.map((day, di) => (
              <div key={day} className="flex gap-1 mb-1 items-center">
                <div className="w-8 text-white/40 text-xs">{day}</div>
                {HOURS.map((_, hi) => (
                  <div key={hi} className="flex-1 h-6 rounded"
                    style={{ background: `rgba(212,168,83,${heatmap[di][hi].toFixed(2)})` }} />
                ))}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-white/30 text-xs">Low</span>
              <div className="flex gap-0.5">
                {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => <div key={o} className="w-4 h-3 rounded-sm" style={{ background: `rgba(212,168,83,${o})` }} />)}
              </div>
              <span className="text-white/30 text-xs">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
