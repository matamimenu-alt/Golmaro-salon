'use client'
import { useState } from 'react'
import { Search, Users, Calendar, DollarSign, X } from 'lucide-react'
import { useGlamoraStore } from '@/lib/store'

const SALON_ID = '1'

export default function CustomersPage() {
  const { bookings } = useGlamoraStore()
  const myBookings = bookings.filter(b => b.salonId === SALON_ID)

  // Build customer list from bookings
  const customerMap = new Map<string, { id: string; name: string; bookings: typeof myBookings }>()
  myBookings.forEach(b => {
    if (!customerMap.has(b.customerId)) {
      customerMap.set(b.customerId, { id: b.customerId, name: b.customerName, bookings: [] })
    }
    customerMap.get(b.customerId)!.bookings.push(b)
  })
  const customers = Array.from(customerMap.values())

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof customers[0] | null>(null)

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-white/50 text-sm mt-1">{customers.length} total customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No customers found</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Customer', 'Total Bookings', 'Total Spent', 'Last Visit', ''].map(h => (
                  <th key={h} className="text-left text-white/40 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const spent = c.bookings.filter(b => b.status === 'completed').reduce((a, b) => a + b.amount, 0)
                const lastVisit = c.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date
                return (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={`https://picsum.photos/seed/${c.id}/32/32`} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-white text-sm font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Calendar className="w-3.5 h-3.5" /> {c.bookings.length}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-glamora-gold text-sm font-semibold">
                        <DollarSign className="w-3.5 h-3.5" /> SAR {spent}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-sm">{lastVisit || '—'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(c)} className="text-xs px-3 py-1.5 border border-white/10 text-white/50 rounded-lg hover:text-white hover:border-white/20 transition-all">
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${selected.id}/48/48`} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="text-white font-bold">{selected.name}</div>
                  <div className="text-white/40 text-xs">{selected.bookings.length} bookings</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Total Spent', value: `SAR ${selected.bookings.filter(b => b.status === 'completed').reduce((a, b) => a + b.amount, 0)}` },
                { label: 'Completed', value: selected.bookings.filter(b => b.status === 'completed').length },
                { label: 'Cancelled', value: selected.bookings.filter(b => b.status === 'cancelled').length },
                { label: 'Member Since', value: selected.bookings[0]?.date ?? '—' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 rounded-xl p-3">
                  <div className="text-white font-bold">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
            <h4 className="text-white/60 text-xs mb-2 font-medium">BOOKING HISTORY</h4>
            <div className="space-y-2">
              {selected.bookings.map(b => (
                <div key={b.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <div className="text-white text-sm">{b.serviceName}</div>
                    <div className="text-white/40 text-xs">{b.date} · {b.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-glamora-gold text-sm">SAR {b.amount}</div>
                    <span className={`text-xs ${b.status === 'completed' ? 'text-green-400' : b.status === 'cancelled' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
