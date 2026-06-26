'use client'
import { useState, useMemo } from 'react'
import { useGlamoraStore, StoreService } from '@/lib/store'
import { Plus, Search, Edit2, Trash2, Star, Eye, EyeOff, Grid, List, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SALON_ID = '1'

const demoStaff = [
  { id: 'st1', name: 'Nour Al-Rashid' },
  { id: 'st2', name: 'Hana Al-Qahtani' },
  { id: 'st3', name: 'Reem Al-Dosari' },
  { id: 'st4', name: 'Dina Al-Harbi' },
]

function formatDuration(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60), m = min % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

type FormData = Omit<StoreService, 'id' | 'salonId' | 'createdAt' | 'updatedAt'>

const emptyForm = (): FormData => ({
  categoryId: '',
  name: '', nameAr: '', description: '', descriptionAr: '',
  coverImage: '', images: [],
  originalPrice: 0, discountedPrice: undefined, duration: 60,
  availableStaffIds: [], isFeatured: false, isAvailable: true,
  displayOrder: 1, status: 'active',
})

export default function ServicesPage() {
  const { services, serviceCategories, addService, updateService, deleteService, toggleServiceAvailability, toggleServiceFeatured } = useGlamoraStore()

  const salonServices = services.filter(s => s.salonId === SALON_ID)
  const salonCategories = serviceCategories.filter(c => c.salonId === SALON_ID)

  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState<FormData>(emptyForm())
  const [newImageUrl, setNewImageUrl] = useState('')

  const filtered = useMemo(() => {
    return salonServices.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.nameAr.includes(search)
      const matchCat = catFilter === 'all' || s.categoryId === catFilter
      const matchStatus = statusFilter === 'all' || s.status === statusFilter
      return matchSearch && matchCat && matchStatus
    })
  }, [salonServices, search, catFilter, statusFilter])

  const openAdd = () => { setForm(emptyForm()); setEditingId(null); setTab(0); setShowModal(true) }
  const openEdit = (s: StoreService) => {
    setForm({ categoryId: s.categoryId, name: s.name, nameAr: s.nameAr, description: s.description, descriptionAr: s.descriptionAr, coverImage: s.coverImage, images: s.images, originalPrice: s.originalPrice, discountedPrice: s.discountedPrice, duration: s.duration, availableStaffIds: s.availableStaffIds, isFeatured: s.isFeatured, isAvailable: s.isAvailable, displayOrder: s.displayOrder, status: s.status })
    setEditingId(s.id); setTab(0); setShowModal(true)
  }
  const handleSave = () => {
    if (editingId) updateService(editingId, { ...form, salonId: SALON_ID })
    else addService({ ...form, salonId: SALON_ID })
    setShowModal(false)
  }
  const confirmDelete = () => { if (deleteId) deleteService(deleteId); setDeleteId(null) }

  const discount = form.discountedPrice && form.originalPrice
    ? Math.round((1 - form.discountedPrice / form.originalPrice) * 100) : null

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-white/50 text-sm mt-0.5">{salonServices.length} services total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gradient-to-r from-[#D4A853] to-[#E91E8C] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D4A853]/50" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4A853]/50">
          <option value="all">All Categories</option>
          {salonCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-[#D4A853]/50">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="disabled">Disabled</option>
        </select>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setView('grid')} className={cn('p-2 transition-colors', view === 'grid' ? 'bg-[#D4A853]/20 text-[#D4A853]' : 'text-white/40 hover:text-white')}><Grid className="w-4 h-4" /></button>
          <button onClick={() => setView('table')} className={cn('p-2 transition-colors', view === 'table' ? 'bg-[#D4A853]/20 text-[#D4A853]' : 'text-white/40 hover:text-white')}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(s => {
            const cat = salonCategories.find(c => c.id === s.categoryId)
            const disc = s.discountedPrice ? Math.round((1 - s.discountedPrice / s.originalPrice) * 100) : null
            return (
              <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#D4A853]/30 transition-all">
                <div className="relative h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.coverImage || 'https://picsum.photos/seed/default/600/400'} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {s.isFeatured && <div className="absolute top-2 left-2 bg-[#D4A853] text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-white" /> Featured</div>}
                  {disc && <div className="absolute top-2 right-2 bg-[#E91E8C] text-white text-xs px-2 py-0.5 rounded-full">{disc}% off</div>}
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(s)} className="flex-1 bg-white/20 backdrop-blur text-white text-xs py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-white/30 transition-colors"><Edit2 className="w-3 h-3" /> Edit</button>
                    <button onClick={() => setDeleteId(s.id)} className="bg-red-500/30 backdrop-blur text-red-300 text-xs px-2 py-1 rounded-lg flex items-center justify-center hover:bg-red-500/50 transition-colors"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{s.name}</p>
                      <p className="text-white/50 text-xs">{s.nameAr}</p>
                    </div>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full flex-shrink-0', s.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : s.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400')}>
                      {s.status}
                    </span>
                  </div>
                  {cat && <p className="text-white/40 text-xs mt-1">{cat.name}</p>}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {s.discountedPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#D4A853] font-bold text-sm">SAR {s.discountedPrice}</span>
                          <span className="text-white/30 text-xs line-through">SAR {s.originalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-[#D4A853] font-bold text-sm">SAR {s.originalPrice}</span>
                      )}
                      <p className="text-white/40 text-xs">{formatDuration(s.duration)}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => toggleServiceFeatured(s.id)} className={cn('w-7 h-7 rounded-lg flex items-center justify-center transition-colors', s.isFeatured ? 'bg-[#D4A853]/20 text-[#D4A853]' : 'bg-white/5 text-white/30 hover:text-white/60')}><Star className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toggleServiceAvailability(s.id)} className={cn('w-7 h-7 rounded-lg flex items-center justify-center transition-colors', s.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/30 hover:text-white/60')}>
                        {s.isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Service', 'Category', 'Price', 'Duration', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-white/40 text-xs font-medium px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(s => {
                  const cat = salonCategories.find(c => c.id === s.categoryId)
                  return (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={s.coverImage || 'https://picsum.photos/seed/default/100/100'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-white text-sm font-medium">{s.name}</p>
                            <p className="text-white/40 text-xs">{s.nameAr}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{cat?.name || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="text-[#D4A853] font-semibold text-sm">SAR {s.discountedPrice || s.originalPrice}</span>
                        {s.discountedPrice && <p className="text-white/30 text-xs line-through">SAR {s.originalPrice}</p>}
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">{formatDuration(s.duration)}</td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs px-2 py-1 rounded-full', s.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : s.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400')}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(s)} className="text-white/40 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteId(s.id)} className="text-white/40 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A0A2E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="text-white font-bold text-lg">{editingId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {['Basic Info', 'Pricing & Duration', 'Media', 'Staff'].map((t, i) => (
                <button key={t} onClick={() => setTab(i)} className={cn('flex-1 py-3 text-sm transition-colors', tab === i ? 'text-[#D4A853] border-b-2 border-[#D4A853]' : 'text-white/40 hover:text-white')}>{t}</button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {tab === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1.5 block">Name (English)</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" placeholder="Hair Cut & Style" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1.5 block">Name (Arabic)</label>
                      <input value={form.nameAr} onChange={e => setForm({...form, nameAr: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 text-right" dir="rtl" placeholder="قص وتسريح" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Category</label>
                    <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50">
                      <option value="">Select category</option>
                      {salonCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Description (English)</label>
                    <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 resize-none" placeholder="Service description..." />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Description (Arabic)</label>
                    <textarea value={form.descriptionAr} onChange={e => setForm({...form, descriptionAr: e.target.value})} rows={3} dir="rtl" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50 resize-none text-right" placeholder="وصف الخدمة..." />
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div onClick={() => setForm({...form, isFeatured: !form.isFeatured})} className={cn('w-10 h-6 rounded-full transition-colors relative', form.isFeatured ? 'bg-[#D4A853]' : 'bg-white/20')}>
                        <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white transition-transform', form.isFeatured ? 'left-5' : 'left-1')} />
                      </div>
                      <span className="text-white/70 text-sm">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div onClick={() => setForm({...form, isAvailable: !form.isAvailable})} className={cn('w-10 h-6 rounded-full transition-colors relative', form.isAvailable ? 'bg-emerald-500' : 'bg-white/20')}>
                        <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white transition-transform', form.isAvailable ? 'left-5' : 'left-1')} />
                      </div>
                      <span className="text-white/70 text-sm">Available</span>
                    </label>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value as StoreService['status']})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50">
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </>
              )}

              {tab === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1.5 block">Original Price (SAR)</label>
                      <input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1.5 block">Discounted Price (SAR) <span className="text-white/30">(optional)</span></label>
                      <input type="number" value={form.discountedPrice || ''} onChange={e => setForm({...form, discountedPrice: e.target.value ? Number(e.target.value) : undefined})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" />
                    </div>
                  </div>
                  {discount && (
                    <div className="bg-[#E91E8C]/10 border border-[#E91E8C]/20 rounded-xl px-4 py-3 text-[#E91E8C] text-sm">
                      {discount}% discount applied
                    </div>
                  )}
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Duration: {formatDuration(form.duration)}</label>
                    <input type="range" min={15} max={360} step={15} value={form.duration} onChange={e => setForm({...form, duration: Number(e.target.value)})} className="w-full accent-[#D4A853]" />
                    <div className="flex justify-between text-white/30 text-xs mt-1">
                      <span>15 min</span><span>3 hr</span><span>6 hr</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Display Order</label>
                    <input type="number" value={form.displayOrder} onChange={e => setForm({...form, displayOrder: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" />
                  </div>
                </>
              )}

              {tab === 2 && (
                <>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Cover Image URL</label>
                    <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" placeholder="https://picsum.photos/..." />
                    {form.coverImage && (
                      <div className="mt-2 h-32 rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={form.coverImage} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Additional Images</label>
                    <div className="flex gap-2">
                      <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4A853]/50" placeholder="Image URL..." />
                      <button onClick={() => { if (newImageUrl) { setForm({...form, images: [...form.images, newImageUrl]}); setNewImageUrl('') } }} className="bg-[#D4A853]/20 text-[#D4A853] px-4 py-2.5 rounded-xl text-sm hover:bg-[#D4A853]/30 transition-colors">Add</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative group h-20 rounded-xl overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button onClick={() => setForm({...form, images: form.images.filter((_, j) => j !== i)})} className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {tab === 3 && (
                <div className="space-y-2">
                  <label className="text-white/60 text-xs mb-3 block">Select available staff</label>
                  {demoStaff.map(staff => (
                    <label key={staff.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                      <input type="checkbox" checked={form.availableStaffIds.includes(staff.id)} onChange={e => {
                        const ids = e.target.checked ? [...form.availableStaffIds, staff.id] : form.availableStaffIds.filter(id => id !== staff.id)
                        setForm({...form, availableStaffIds: ids})
                      }} className="accent-[#D4A853]" />
                      <span className="text-white text-sm">{staff.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 p-5 border-t border-white/10">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-white/10 text-white/60 py-2.5 rounded-full text-sm hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-[#D4A853] to-[#E91E8C] text-white py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                {editingId ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A0A2E] border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-2">Delete Service</h3>
            <p className="text-white/60 text-sm mb-6">Are you sure you want to delete this service? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-white/10 text-white/60 py-2.5 rounded-full text-sm hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
