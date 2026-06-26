'use client'
import { useState } from 'react'
import { Calendar, Check, X, Clock, ChevronRight, Search, Filter } from 'lucide-react'
import { useGlamoraStore, StoreBooking } from '@/lib/store'

const SALON_ID = '1'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: 'Pending',   color: 'text-yellow-400', bg: 'bg-yellow-400/10 border border-yellow-400/30' },
  confirmed: { label: 'Confirmed', color: 'text-blue-400',   bg: 'bg-blue-400/10 border border-blue-400/30' },
  completed: { label: 'Completed', color: 'text-green-400',  bg: 'bg-green-400/10 border border-green-400/30' },
  cancelled: { label: 'Cancelled', color: 'text-red-400',    bg: 'bg-red-400/10 border border-red-400/30' },
  rescheduled:{ label: 'Rescheduled', color: 'text-purple-400', bg: 'bg-purple-400/10 border border-purple-400/30' },
}

const TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

export default function BookingsPage() {
  const { bookings, services, updateBookingStatus } = useGlamoraStore()
  const myBookings = bookings.filter(b => b.salonId === SALON_ID)
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<StoreBooking | null>(null)

  const filtered = myBookings.filter(b => {
    const matchTab = tab === 'All' || b.status.toLowerCase() === tab.toLowerCase()
    const matchSearch = !search || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.serviceName.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const counts = {
    All: myBookings.length,
    Pending: myBookings.filter(b => b.status === 'pending').length,
    Confirmed: myBookings.filter(b => b.status === 'confirmed').length,
    Completed: myBookings.filter(b => b.status === 'completed').length,
    Cancelled: myBookings.filter(b => b.status === 'cancelled').length,
  }

  const today = new Date().toISOString().split('T')[0]
  const todayCount = myBookings.filter(b => b.date === today).length
  const revenue = myBookings.filter(b => b.status === 'completed').reduce((acc, b) => acc + b.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Bookings</h1>
        <p className="text-white/50 text-sm mt-1">Manage all customer bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Bookings", value: todayCount, icon: Calendar, color: 'text-glamora-gold' },
          { label: 'Pending Approval', value: counts.Pending, icon: Clock, color: 'text-yellow-400' },
          { label: 'Confirmed', value: counts.Confirmed, icon: Check, color: 'text-blue-400' },
          { label: 'Revenue (SAR)', value: revenue.toLocaleString(), icon: ChevronRight, color: 'text-green-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
        </div>
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                tab === t ? 'bg-glamora-gold text-black' : 'text-white/50 hover:text-white'
              }`}>
              {t} ({counts[t as keyof typeof counts]})
            </button>
          ))}
        </div>
      </div>

      {/* Bookings list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No bookings found</p>
          </div>
        ) : filtered.map(booking => {
          const st = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending
          return (
            <div key={booking.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/${booking.customerId}/40/40`} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-white font-semibold text-sm">{booking.customerName}</div>
                    <div className="text-white/50 text-xs mt-0.5">{booking.serviceName}</div>
                    {booking.staffName && <div className="text-white/30 text-xs">with {booking.staffName}</div>}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${st.bg} ${st.color}`}>{st.label}</span>
                  <div className="text-glamora-gold font-bold mt-1">SAR {booking.amount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.time}</span>
                </div>
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all">
                        <Check className="w-3 h-3" /> Confirm
                      </button>
                      <button onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-all">
                        <X className="w-3 h-3" /> Decline
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-all">
                      <Check className="w-3 h-3" /> Mark Complete
                    </button>
                  )}
                  <button onClick={() => setSelected(booking)}
                    className="px-3 py-1.5 border border-white/10 text-white/50 rounded-lg text-xs hover:text-white hover:border-white/20 transition-all">
                    Details
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Booking Details</h2>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[
                ['Booking ID', selected.id],
                ['Customer', selected.customerName],
                ['Service', selected.serviceName],
                ['Staff', selected.staffName || 'Any available'],
                ['Date', selected.date],
                ['Time', selected.time],
                ['Duration', `${selected.duration} min`],
                ['Amount', `SAR ${selected.amount}`],
                ['Notes', selected.notes ?? '—'],
                ['Status', selected.status],
                ...(selected.notes ? [['Notes', selected.notes]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/40 text-sm">{label}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
