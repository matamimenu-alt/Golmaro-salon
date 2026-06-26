'use client'
import { useState } from 'react'
import { Plus, Trash2, Star, Upload, X, Image as ImageIcon } from 'lucide-react'
import { useGlamoraStore, GalleryPhoto } from '@/lib/store'

const SALON_ID = '1'
const CATEGORIES = ['All', 'interior', 'services', 'before-after', 'other']
const CATEGORY_LABELS: Record<string, string> = { All: 'All', interior: 'Interior', services: 'Services', 'before-after': 'Before & After', other: 'Other' }

export default function GalleryPage() {
  const { galleryPhotos, addPhoto, deletePhoto, setPhotoCover } = useGlamoraStore()
  const photos = galleryPhotos.filter(p => p.salonId === SALON_ID)
  const [catFilter, setCatFilter] = useState('All')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '', category: 'interior' as 'interior' | 'services' | 'before-after' | 'other' })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = catFilter === 'All' ? photos : photos.filter(p => p.category === catFilter)

  const save = () => {
    if (!form.url.trim()) return
    addPhoto({ salonId: SALON_ID, url: form.url, caption: form.caption, category: form.category as 'interior' | 'services' | 'before-after' | 'other', isCover: false })
    setForm({ url: '', caption: '', category: 'interior' })
    setModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="text-white/50 text-sm mt-1">{photos.length} photos</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-glamora-gold to-glamora-pink text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              catFilter === c ? 'bg-glamora-gold/20 border-glamora-gold/40 text-glamora-gold' : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white'
            }`}>
            {CATEGORY_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      {/* Upload zone */}
      <button onClick={() => setModal(true)} className="w-full border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-glamora-gold/30 hover:bg-glamora-gold/5 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-glamora-gold/10 transition-colors">
          <Upload className="w-6 h-6 text-white/30 group-hover:text-glamora-gold transition-colors" />
        </div>
        <div>
          <p className="text-white/50 text-sm text-center">Click to add photo URL</p>
          <p className="text-white/30 text-xs text-center mt-0.5">PNG, JPG, WebP accepted</p>
        </div>
      </button>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No photos in this category</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map(photo => (
            <div key={photo.id} className="relative group break-inside-avoid rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <img src={photo.url} alt={photo.caption} className="w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end gap-1.5">
                  <button onClick={() => setPhotoCover(photo.id)} title="Set as cover"
                    className={`p-1.5 rounded-lg transition-all ${photo.isCover ? 'bg-glamora-gold text-black' : 'bg-white/20 text-white hover:bg-glamora-gold/80'}`}>
                    <Star className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setDeleteId(photo.id)} className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  {photo.isCover && <span className="text-xs bg-glamora-gold text-black px-2 py-0.5 rounded-full font-semibold">Cover</span>}
                  {photo.caption && <p className="text-white text-xs mt-1">{photo.caption}</p>}
                  <p className="text-white/50 text-xs">{photo.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(false)} />
          <div className="relative bg-[#1E0D35] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-5">Add Photo</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-xs mb-1 block">Image URL</label>
                <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" placeholder="https://..." />
                {form.url && <img src={form.url} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl" onError={e => (e.currentTarget.style.display='none')} />}
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Caption (optional)</label>
                <input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as 'interior' | 'services' | 'before-after' | 'other' }))}
                  className="w-full bg-[#12071F] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-glamora-gold/50">
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all text-sm">Cancel</button>
              <button onClick={save} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-glamora-gold to-glamora-pink rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">Add Photo</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#1E0D35] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-2">Delete Photo?</h3>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-white/10 rounded-xl text-white/60 text-sm">Cancel</button>
              <button onClick={() => { deletePhoto(deleteId); setDeleteId(null) }} className="flex-1 px-4 py-2 bg-red-500/80 rounded-xl text-white text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
