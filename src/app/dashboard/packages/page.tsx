'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Package, CheckSquare, Square, ToggleLeft, ToggleRight } from 'lucide-react'
import { useGlamoraStore, StorePackage } from '@/lib/store'

const SALON_ID = '1'

const emptyPkg = (): Omit<StorePackage, 'id'> => ({
  salonId: SALON_ID, name: '', nameAr: '', description: '',
  services: [], originalPrice: 0, packagePrice: 0,
  coverImage: '', isActive: true, status: 'active'
})

export default function PackagesPage() {
  const { packages, services, addPackage, updatePackage, deletePackage } = useGlamoraStore()
  const myPkgs = packages.filter(p => p.salonId === SALON_ID)
  const myServices = services.filter(s => s.salonId === SALON_ID && s.isAvailable && s.status === 'active')

  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<StorePackage | null>(null)
  const [form, setForm] = useState(emptyPkg())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openAdd = () => { setForm(emptyPkg()); setEditing(null); setModal('add') }
  const openEdit = (p: StorePackage) => { setForm({ ...p }); setEditing(p); setModal('edit') }

  const toggleService = (id: string) => {
    setForm(f => {
      const selected = f.services.includes(id) ? f.services.filter(s => s !== id) : [...f.services, id]
      const total = selected.reduce((acc, sid) => {
        const svc = myServices.find(s => s.id === sid)
        return acc + (svc?.discountedPrice ?? svc?.originalPrice ?? 0)
      }, 0)
      return { ...f, services: selected, originalPrice: total }
    })
  }

  const save = () => {
    if (!form.name.trim() || form.services.length === 0) return
    if (modal === 'add') addPackage(form)
    else if (editing) updatePackage(editing.id, form)
    setModal(null)
  }

  const savings = (pkg: StorePackage) => pkg.originalPrice - pkg.packagePrice
  const savingsPct = (pkg: StorePackage) => pkg.originalPrice > 0 ? Math.round((savings(pkg) / pkg.originalPrice) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Packages</h1>
          <p className="text-white/50 text-sm mt-1">{myPkgs.length} packages</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Package
        </button>
      </div>

      {myPkgs.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No packages yet. Create your first package!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {myPkgs.map(pkg => {
            const included = myServices.filter(s => pkg.services.includes(s.id))
            return (
              <div key={pkg.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                {pkg.coverImage ? (
                  <img src={pkg.coverImage} alt={pkg.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-glamora-gold/20 to-glamora-pink/20 flex items-center justify-center">
                    <Package className="w-12 h-12 text-glamora-gold/40" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{pkg.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{pkg.nameAr}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${pkg.isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white/40'}`}>
                      {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1">
                    {included.slice(0, 3).map(s => (
                      <div key={s.id} className="flex items-center gap-2 text-xs text-white/50">
                        <span className="w-1 h-1 rounded-full bg-glamora-gold/60" />
                        {s.name}
                      </div>
                    ))}
                    {included.length > 3 && <div className="text-xs text-white/30">+{included.length - 3} more services</div>}
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-white/40 text-xs line-through">SAR {pkg.originalPrice}</div>
                      <div className="text-glamora-gold font-bold text-lg">SAR {pkg.packagePrice}</div>
                    </div>
                    {savingsPct(pkg) > 0 && (
                      <span className="text-xs bg-glamora-pink/20 text-glamora-pink border border-glamora-pink/30 px-2 py-0.5 rounded-full">
                        Save {savingsPct(pkg)}%
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button onClick={() => openEdit(pkg)} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all text-xs">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => updatePackage(pkg.id, { isActive: !pkg.isActive })} className="p-2 border border-white/10 rounded-xl text-white/40 hover:text-glamora-gold hover:border-glamora-gold/30 transition-all">
                      {pkg.isActive ? <ToggleRight className="w-4 h-4 text-green-400" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setDeleteId(pkg.id)} className="p-2 border border-white/10 rounded-xl text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white mb-5">{modal === 'add' ? 'Create Package' : 'Edit Package'}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Name (EN)</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="Package name" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Name (AR)</label>
                  <input value={form.nameAr} onChange={e => setForm(f => ({ ...f, nameAr: e.target.value }))} dir="rtl"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="اسم الباقة" />
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50 resize-none" />
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Cover Image URL</label>
                <input value={form.coverImage} onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="https://..." />
              </div>

              <div>
                <label className="text-white/60 text-xs mb-2 block">Select Services ({form.services.length} selected)</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {myServices.map(s => (
                    <button key={s.id} onClick={() => toggleService(s.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${form.services.includes(s.id) ? 'border-glamora-gold/40 bg-glamora-gold/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                      {form.services.includes(s.id) ? <CheckSquare className="w-4 h-4 text-glamora-gold shrink-0" /> : <Square className="w-4 h-4 text-white/30 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm truncate">{s.name}</div>
                      </div>
                      <div className="text-glamora-gold text-sm font-semibold shrink-0">SAR {s.discountedPrice ?? s.originalPrice}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/50">Original Total</span>
                  <span className="text-white/70">SAR {form.originalPrice}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <label className="text-white/60">Package Price (SAR)</label>
                  <input type="number" value={form.packagePrice} onChange={e => setForm(f => ({ ...f, packagePrice: +e.target.value }))}
                    className="w-24 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-glamora-gold text-sm text-right focus:outline-none focus:border-glamora-gold/50" />
                </div>
                {form.originalPrice > form.packagePrice && form.packagePrice > 0 && (
                  <div className="text-glamora-pink text-xs mt-2 text-center">
                    Customer saves SAR {form.originalPrice - form.packagePrice} ({Math.round(((form.originalPrice - form.packagePrice) / form.originalPrice) * 100)}% off)
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="text-white/60 text-sm">Active</label>
                <button onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  className={`w-11 h-6 rounded-full transition-colors ${form.isActive ? 'bg-glamora-gold' : 'bg-white/20'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow mx-0.5 transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">Save Package</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#1E0D35] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Package?</h3>
            <p className="text-white/50 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white/60 text-sm">Cancel</button>
              <button onClick={() => { deletePackage(deleteId); setDeleteId(null) }} className="flex-1 px-4 py-2 bg-red-500/80 rounded-xl text-white text-sm font-semibold hover:bg-red-500 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
