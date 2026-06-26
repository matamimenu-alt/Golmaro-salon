'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Tag, Calendar, Users, TrendingUp } from 'lucide-react'
import { useGlamoraStore, StoreOffer } from '@/lib/store'

const SALON_ID = '1'

const emptyOffer = (): Omit<StoreOffer, 'id'> => ({
  salonId: SALON_ID, title: '', titleAr: '', description: '',
  serviceId: undefined, discountType: 'percentage', discountValue: 0,
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  maxUses: undefined, usedCount: 0, coverImage: '', isActive: true, status: 'active'
})

function offerStatus(offer: StoreOffer) {
  const now = new Date()
  const start = new Date(offer.startDate)
  const end = new Date(offer.endDate)
  if (!offer.isActive || offer.status === 'disabled') return { label: 'Disabled', color: 'text-white/40 bg-white/10' }
  if (now < start) return { label: 'Upcoming', color: 'text-blue-400 bg-blue-400/10 border border-blue-400/30' }
  if (now > end) return { label: 'Expired', color: 'text-red-400 bg-red-400/10 border border-red-400/30' }
  return { label: 'Active', color: 'text-green-400 bg-green-400/10 border border-green-400/30' }
}

export default function OffersPage() {
  const { offers, services, addOffer, updateOffer, deleteOffer } = useGlamoraStore()
  const myOffers = offers.filter(o => o.salonId === SALON_ID)
  const myServices = services.filter(s => s.salonId === SALON_ID && s.status === 'active')

  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<StoreOffer | null>(null)
  const [form, setForm] = useState(emptyOffer())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openAdd = () => { setForm(emptyOffer()); setEditing(null); setModal('add') }
  const openEdit = (o: StoreOffer) => { setForm({ ...o }); setEditing(o); setModal('edit') }

  const save = () => {
    if (!form.title.trim() || form.discountValue <= 0) return
    if (modal === 'add') addOffer(form)
    else if (editing) updateOffer(editing.id, form)
    setModal(null)
  }

  const activeCount = myOffers.filter(o => offerStatus(o).label === 'Active').length
  const expiredCount = myOffers.filter(o => offerStatus(o).label === 'Expired').length
  const upcomingCount = myOffers.filter(o => offerStatus(o).label === 'Upcoming').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Promotional Offers</h1>
          <p className="text-white/50 text-sm mt-1">{myOffers.length} total offers</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Offer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active', value: activeCount, color: 'text-green-400', icon: TrendingUp },
          { label: 'Upcoming', value: upcomingCount, color: 'text-blue-400', icon: Calendar },
          { label: 'Expired', value: expiredCount, color: 'text-red-400', icon: Tag },
        ].map(stat => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-white/40 text-xs">{stat.label} Offers</div>
          </div>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myOffers.map(offer => {
          const status = offerStatus(offer)
          const targetService = myServices.find(s => s.id === offer.serviceId)
          return (
            <div key={offer.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
              <div className="relative">
                {offer.coverImage ? (
                  <img src={offer.coverImage} alt={offer.title} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-glamora-pink/20 to-glamora-gold/20 flex items-center justify-center">
                    <Tag className="w-10 h-10 text-glamora-gold/40" />
                  </div>
                )}
                <div className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</div>
                <div className="absolute top-2 left-2 bg-glamora-pink text-white text-sm font-bold px-2.5 py-1 rounded-full">
                  {offer.discountType === 'percentage' ? `-${offer.discountValue}%` : `-SAR ${offer.discountValue}`}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">{offer.title}</h3>
                <p className="text-white/40 text-xs mt-0.5">{offer.titleAr}</p>
                {targetService && <p className="text-glamora-gold text-xs mt-1">On: {targetService.name}</p>}
                {!offer.serviceId && <p className="text-glamora-gold text-xs mt-1">All services</p>}

                <div className="flex items-center gap-3 mt-3 text-xs text-white/40">
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{offer.startDate} – {offer.endDate}</div>
                </div>
                {offer.maxUses && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-white/40 mb-1">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Uses</span>
                      <span>{offer.usedCount}/{offer.maxUses}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div className="bg-glamora-gold h-1 rounded-full" style={{ width: `${Math.min(100, (offer.usedCount / offer.maxUses) * 100)}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(offer)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all text-xs">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => updateOffer(offer.id, { isActive: !offer.isActive })}
                    className={`px-3 py-2 rounded-xl border text-xs transition-all ${offer.isActive ? 'border-green-500/30 text-green-400 hover:bg-green-500/10' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                    {offer.isActive ? 'Active' : 'Paused'}
                  </button>
                  <button onClick={() => setDeleteId(offer.id)} className="p-2 border border-white/10 rounded-xl text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-5">{modal === 'add' ? 'Create Offer' : 'Edit Offer'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Title (EN)</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Title (AR)</label>
                  <input value={form.titleAr} onChange={e => setForm(f => ({ ...f, titleAr: e.target.value }))} dir="rtl"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Target Service (leave blank for all services)</label>
                <select value={form.serviceId ?? ''} onChange={e => setForm(f => ({ ...f, serviceId: e.target.value || undefined }))}
                  className="w-full bg-[#12071F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50">
                  <option value="">All Services</option>
                  {myServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Discount Type</label>
                  <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full bg-[#12071F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (SAR)</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Discount Value</label>
                  <input type="number" value={form.discountValue} onChange={e => setForm(f => ({ ...f, discountValue: +e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Start Date</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">End Date</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Max Uses (optional)</label>
                  <input type="number" value={form.maxUses ?? ''} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value ? +e.target.value : undefined }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="Unlimited" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Cover Image URL</label>
                  <input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="https://..." />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-white/60 text-sm">Active</label>
                <button onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  className={`w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-glamora-gold' : 'bg-white/20'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white mx-0.5 transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">Save Offer</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#1E0D35] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Offer?</h3>
            <p className="text-white/50 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white/60 text-sm">Cancel</button>
              <button onClick={() => { deleteOffer(deleteId); setDeleteId(null) }} className="flex-1 px-4 py-2 bg-red-500/80 rounded-xl text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
