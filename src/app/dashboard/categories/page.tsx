'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Scissors, Sparkles, Hand, Eye, Smile, Heart, Zap, Star } from 'lucide-react'
import { useGlamoraStore, ServiceCategory } from '@/lib/store'

const ICONS = ['Scissors', 'Sparkles', 'Hand', 'Eye', 'Smile', 'Heart', 'Zap', 'Star']
const COLORS = ['#D4A853', '#E91E8C', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#3B82F6']
const SALON_ID = '1'

const iconMap: Record<string, React.ElementType> = { Scissors, Sparkles, Hand, Eye, Smile, Heart, Zap, Star }

const empty = (): Omit<ServiceCategory, 'id'> => ({
  salonId: SALON_ID, name: '', nameAr: '', icon: 'Scissors', color: '#D4A853', displayOrder: 0
})

export default function CategoriesPage() {
  const { serviceCategories, services, addCategory, updateCategory, deleteCategory } = useGlamoraStore()
  const cats = serviceCategories.filter(c => c.salonId === SALON_ID).sort((a, b) => a.displayOrder - b.displayOrder)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<ServiceCategory | null>(null)
  const [form, setForm] = useState(empty())
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const openAdd = () => { setForm(empty()); setEditing(null); setModal('add') }
  const openEdit = (cat: ServiceCategory) => { setForm({ ...cat }); setEditing(cat); setModal('edit') }

  const save = () => {
    if (!form.name.trim()) return
    if (modal === 'add') addCategory(form)
    else if (editing) updateCategory(editing.id, form)
    setModal(null)
  }

  const confirmDelete = (id: string) => {
    const hasServices = services.some(s => s.salonId === SALON_ID && s.categoryId === id)
    if (hasServices) { alert('Cannot delete — this category has services. Remove services first.'); return }
    deleteCategory(id)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Categories</h1>
          <p className="text-white/50 text-sm mt-1">{cats.length} categories</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map(cat => {
          const Icon = iconMap[cat.icon] ?? Scissors
          const svcCount = services.filter(s => s.salonId === SALON_ID && s.categoryId === cat.id).length
          return (
            <div key={cat.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: cat.color + '20', border: `1px solid ${cat.color}40` }}>
                  <Icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-white/40 hover:text-glamora-gold hover:bg-glamora-gold/10 transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(cat.id)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="text-white font-semibold">{cat.name}</div>
              <div className="text-white/40 text-sm mt-0.5">{cat.nameAr}</div>
              <div className="mt-3 text-xs text-white/30">{svcCount} {svcCount === 1 ? 'service' : 'services'}</div>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-5">{modal === 'add' ? 'Add Category' : 'Edit Category'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Name (English)</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="e.g. Hair Services" />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Name (Arabic)</label>
                <input value={form.nameAr} onChange={e => setForm(f => ({ ...f, nameAr: e.target.value }))} dir="rtl"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="خدمات الشعر" />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {ICONS.map(i => {
                    const Ic = iconMap[i]
                    return (
                      <button key={i} onClick={() => setForm(f => ({ ...f, icon: i }))}
                        className={`p-3 rounded-xl flex items-center justify-center transition-all ${form.icon === i ? 'bg-glamora-gold/20 border border-glamora-gold/50' : 'bg-white/5 border border-white/10 hover:border-white/20'}`}>
                        <Ic className={`w-5 h-5 ${form.icon === i ? 'text-glamora-gold' : 'text-white/60'}`} />
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-2 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1E0D35] scale-110' : ''}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Display Order</label>
                <input type="number" value={form.displayOrder} onChange={e => setForm(f => ({ ...f, displayOrder: +e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 transition-all text-sm">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#1E0D35] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Category?</h3>
            <p className="text-white/50 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white/60 text-sm hover:text-white transition-all">Cancel</button>
              <button onClick={() => confirmDelete(deleteId)} className="flex-1 px-4 py-2 bg-red-500/80 rounded-xl text-white text-sm font-semibold hover:bg-red-500 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
