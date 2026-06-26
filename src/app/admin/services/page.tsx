'use client'
import { useState } from 'react'
import { Check, X, Eye, Search, Scissors } from 'lucide-react'
import { useGlamoraStore } from '@/lib/store'

export default function AdminServicesPage() {
  const { services, updateService } = useGlamoraStore()
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'disabled'>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof services[0] | null>(null)
  const [bulkSelected, setBulkSelected] = useState<string[]>([])

  const filtered = services.filter(s => {
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    all: services.length,
    pending: services.filter(s => s.status === 'pending').length,
    active: services.filter(s => s.status === 'active').length,
    disabled: services.filter(s => s.status === 'disabled').length,
  }

  const toggleBulk = (id: string) => setBulkSelected(bs => bs.includes(id) ? bs.filter(b => b !== id) : [...bs, id])
  const bulkApprove = () => { bulkSelected.forEach(id => updateService(id, { status: 'active' })); setBulkSelected([]) }

  const STATUS_STYLE = {
    pending: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30',
    active: 'text-green-400 bg-green-400/10 border border-green-400/30',
    disabled: 'text-red-400 bg-red-400/10 border border-red-400/30',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Services Moderation</h1>
          <p className="text-white/50 text-sm mt-1">Review and approve salon services across all salons</p>
        </div>
        {bulkSelected.length > 0 && (
          <button onClick={bulkApprove} className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-sm hover:bg-green-500/30 transition-all">
            <Check className="w-4 h-4" /> Approve Selected ({bulkSelected.length})
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {(['all', 'pending', 'active', 'disabled'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`p-4 rounded-xl border transition-all ${statusFilter === s ? 'border-glamora-gold/40 bg-glamora-gold/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
            <div className="text-2xl font-bold text-white">{counts[s]}</div>
            <div className="text-white/40 text-xs capitalize mt-0.5">{s === 'all' ? 'Total' : s}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="w-8 px-4 py-3">
                <input type="checkbox"
                  checked={bulkSelected.length === filtered.filter(s => s.status === 'pending').length && filtered.filter(s => s.status === 'pending').length > 0}
                  onChange={e => {
                    if (e.target.checked) setBulkSelected(filtered.filter(s => s.status === 'pending').map(s => s.id))
                    else setBulkSelected([])
                  }}
                  className="accent-glamora-gold" />
              </th>
              {['Service', 'Salon', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left text-white/40 text-xs font-medium px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-white/30">No services found</td></tr>
            ) : filtered.map(svc => (
              <tr key={svc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  {svc.status === 'pending' && (
                    <input type="checkbox" checked={bulkSelected.includes(svc.id)} onChange={() => toggleBulk(svc.id)} className="accent-glamora-gold" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {svc.coverImage ? (
                      <img src={svc.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-white/30" />
                      </div>
                    )}
                    <div>
                      <div className="text-white text-sm font-medium">{svc.name}</div>
                      <div className="text-white/40 text-xs">{svc.nameAr}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/60 text-sm">Salon #{svc.salonId}</td>
                <td className="px-4 py-3 text-white/60 text-sm">{svc.categoryId}</td>
                <td className="px-4 py-3">
                  <div className="text-glamora-gold text-sm font-semibold">SAR {svc.discountedPrice ?? svc.originalPrice}</div>
                  {svc.discountedPrice && <div className="text-white/30 text-xs line-through">SAR {svc.originalPrice}</div>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${STATUS_STYLE[svc.status]}`}>
                    {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => setSelected(svc)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    {svc.status === 'pending' && (
                      <button onClick={() => updateService(svc.id, { status: 'active' })} className="p-1.5 rounded-lg text-white/40 hover:text-green-400 hover:bg-green-400/10 transition-all" title="Approve">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    {svc.status === 'active' && (
                      <button onClick={() => updateService(svc.id, { status: 'disabled' })} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all" title="Disable">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {svc.status === 'disabled' && (
                      <button onClick={() => updateService(svc.id, { status: 'active' })} className="p-1.5 rounded-lg text-white/40 hover:text-green-400 hover:bg-green-400/10 transition-all" title="Re-enable">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service preview modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Service Preview</h2>
              <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            {selected.coverImage && <img src={selected.coverImage} alt="" className="w-full h-40 object-cover rounded-xl mb-4" />}
            <div className="space-y-2">
              {[
                ['Name', selected.name], ['Name (AR)', selected.nameAr], ['Description', selected.description],
                ['Price', `SAR ${selected.originalPrice}`],
                ...(selected.discountedPrice ? [['Sale Price', `SAR ${selected.discountedPrice}`]] : []),
                ['Duration', `${selected.duration} min`],
                ['Status', selected.status], ['Featured', selected.isFeatured ? 'Yes' : 'No'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-white/40 text-sm shrink-0">{k}</span>
                  <span className="text-white text-sm text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              {selected.status === 'pending' && (
                <button onClick={() => { updateService(selected.id, { status: 'active' }); setSelected(null) }}
                  className="flex-1 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold hover:bg-green-500/30 transition-all">
                  <Check className="w-4 h-4 inline mr-1" /> Approve
                </button>
              )}
              {selected.status === 'active' && (
                <button onClick={() => { updateService(selected.id, { status: 'disabled' }); setSelected(null) }}
                  className="flex-1 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/30 transition-all">
                  Disable
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
