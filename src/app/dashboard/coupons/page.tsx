'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Copy, Check, Ticket, RefreshCw } from 'lucide-react'
import { useGlamoraStore, StoreCoupon } from '@/lib/store'

const SALON_ID = '1'

const emptyC = (): Omit<StoreCoupon, 'id'> => ({
  salonId: SALON_ID, code: '', description: '', discountType: 'percentage',
  discountValue: 0, minOrderValue: undefined, maxDiscount: undefined,
  expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  maxUses: undefined, usedCount: 0, isActive: true, applicableServices: []
})

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return 'GLM' + Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function CouponsPage() {
  const { coupons, services, addCoupon, updateCoupon, deleteCoupon } = useGlamoraStore()
  const myCoupons = coupons.filter(c => c.salonId === SALON_ID)
  const myServices = services.filter(s => s.salonId === SALON_ID && s.status === 'active')

  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<StoreCoupon | null>(null)
  const [form, setForm] = useState(emptyC())
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const openAdd = () => { setForm({ ...emptyC(), code: genCode() }); setEditing(null); setModal('add') }
  const openEdit = (c: StoreCoupon) => { setForm({ ...c }); setEditing(c); setModal('edit') }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleSvc = (id: string) => setForm(f => ({
    ...f, applicableServices: f.applicableServices.includes(id)
      ? f.applicableServices.filter(s => s !== id)
      : [...f.applicableServices, id]
  }))

  const save = () => {
    if (!form.code.trim() || form.discountValue <= 0) return
    if (modal === 'add') addCoupon(form)
    else if (editing) updateCoupon(editing.id, form)
    setModal(null)
  }

  const isExpired = (c: StoreCoupon) => new Date(c.expiryDate) < new Date()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupon Codes</h1>
          <p className="text-white/50 text-sm mt-1">{myCoupons.length} coupons</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      {myCoupons.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Ticket className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No coupons yet.</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Code', 'Discount', 'Min Order', 'Expiry', 'Usage', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-white/40 text-xs font-medium px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myCoupons.map(c => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-glamora-gold font-bold text-sm bg-glamora-gold/10 border border-glamora-gold/20 px-2 py-0.5 rounded-lg">{c.code}</span>
                      <button onClick={() => copyCode(c.code)} className="text-white/30 hover:text-white transition-colors">
                        {copied === c.code ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    {c.description && <p className="text-white/30 text-xs mt-0.5">{c.description}</p>}
                  </td>
                  <td className="px-4 py-3 text-white text-sm font-semibold">
                    {c.discountType === 'percentage' ? `${c.discountValue}%` : `SAR ${c.discountValue}`}
                    {c.maxDiscount && <span className="text-white/30 text-xs ml-1">(max SAR {c.maxDiscount})</span>}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">{c.minOrderValue ? `SAR ${c.minOrderValue}` : '—'}</td>
                  <td className="px-4 py-3 text-white/60 text-sm">
                    <span className={isExpired(c) ? 'text-red-400' : ''}>{c.expiryDate}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-white/60 text-sm">{c.usedCount}{c.maxUses ? `/${c.maxUses}` : ''}</div>
                    {c.maxUses && (
                      <div className="w-16 bg-white/10 rounded-full h-1 mt-1">
                        <div className="bg-glamora-gold h-1 rounded-full" style={{ width: `${Math.min(100, (c.usedCount / c.maxUses) * 100)}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => updateCoupon(c.id, { isActive: !c.isActive })}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        isExpired(c) ? 'text-red-400 bg-red-400/10 border-red-400/30' :
                        c.isActive ? 'text-green-400 bg-green-400/10 border-green-400/30 hover:bg-green-400/20' :
                        'text-white/30 bg-white/5 border-white/10 hover:border-white/20'
                      }`}>
                      {isExpired(c) ? 'Expired' : c.isActive ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-white/40 hover:text-glamora-gold hover:bg-glamora-gold/10 transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteId(c.id)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-5">{modal === 'add' ? 'Create Coupon' : 'Edit Coupon'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-xs mb-1 block">Coupon Code</label>
                <div className="flex gap-2">
                  <input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-glamora-gold font-mono text-sm focus:outline-none focus:border-glamora-gold/50 uppercase tracking-wider" />
                  <button onClick={() => setForm(f => ({ ...f, code: genCode() }))} className="px-3 py-2 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/20 transition-all">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Description</label>
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Discount Type</label>
                  <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full bg-[#12071F] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (SAR)</option>
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
                  <label className="text-white/60 text-xs mb-1 block">Min Order (SAR)</label>
                  <input type="number" value={form.minOrderValue ?? ''} onChange={e => setForm(f => ({ ...f, minOrderValue: e.target.value ? +e.target.value : undefined }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="No minimum" />
                </div>
                {form.discountType === 'percentage' && (
                  <div>
                    <label className="text-white/60 text-xs mb-1 block">Max Discount (SAR)</label>
                    <input type="number" value={form.maxDiscount ?? ''} onChange={e => setForm(f => ({ ...f, maxDiscount: e.target.value ? +e.target.value : undefined }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="No cap" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Expiry Date</label>
                  <input type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Max Uses</label>
                  <input type="number" value={form.maxUses ?? ''} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value ? +e.target.value : undefined }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="Unlimited" />
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs mb-2 block">Applicable Services (empty = all)</label>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {myServices.map(s => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={form.applicableServices.includes(s.id)} onChange={() => toggleSvc(s.id)} className="accent-glamora-gold" />
                      <span className="text-white/60 text-sm group-hover:text-white transition-colors">{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">Save Coupon</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#1E0D35] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Coupon?</h3>
            <p className="text-white/50 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white/60 text-sm">Cancel</button>
              <button onClick={() => { deleteCoupon(deleteId); setDeleteId(null) }} className="flex-1 px-4 py-2 bg-red-500/80 rounded-xl text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
