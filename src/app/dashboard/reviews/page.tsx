'use client'
import { useState } from 'react'
import { Star, MessageSquare, Filter } from 'lucide-react'
import { useGlamoraStore } from '@/lib/store'

const SALON_ID = '1'

const demoReviews = [
  { id: 'r1', customerName: 'Sarah Al-Ahmad', customerId: 'c1', rating: 5, serviceName: 'Hair Color', date: '2026-06-20', text: 'Absolutely amazing experience! The staff was professional and the results exceeded my expectations. Will definitely come back!', reply: '' },
  { id: 'r2', customerName: 'Nora Al-Rashid', customerId: 'c2', rating: 4, serviceName: 'Manicure', date: '2026-06-18', text: 'Great service and lovely atmosphere. The nail tech was very skilled. Just a tiny wait time but worth it.', reply: 'Thank you Nora! We\'re so glad you enjoyed your visit. We\'re working on reducing wait times. See you soon!' },
  { id: 'r3', customerName: 'Lama Al-Ghamdi', customerId: 'c3', rating: 5, serviceName: 'Keratin Treatment', date: '2026-06-15', text: 'Best keratin treatment I\'ve ever had in Riyadh. My hair feels silky smooth. Highly recommend!', reply: '' },
  { id: 'r4', customerName: 'Reem Al-Saud', customerId: 'c4', rating: 3, serviceName: 'Facial', date: '2026-06-12', text: 'Service was okay but I expected more for the price. The ambiance was nice though.', reply: '' },
  { id: 'r5', customerName: 'Hessa Al-Mubarak', customerId: 'c5', rating: 5, serviceName: 'Bridal Package', date: '2026-06-10', text: 'Made my wedding day perfect! The team was so attentive and the makeup was flawless. Cannot thank you enough!', reply: 'Congratulations on your wedding! It was our honor to be part of your special day. Wishing you a lifetime of happiness! 💕' },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(demoReviews)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const filtered = reviews.filter(r => ratingFilter === 0 || r.rating === ratingFilter)
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
  const counts = [5, 4, 3, 2, 1].map(s => ({ stars: s, count: reviews.filter(r => r.rating === s).length }))

  const submitReply = (id: string) => {
    if (!replyText.trim()) return
    setReviews(rs => rs.map(r => r.id === id ? { ...r, reply: replyText } : r))
    setReplyingTo(null)
    setReplyText('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reviews</h1>
        <p className="text-white/50 text-sm mt-1">{reviews.length} customer reviews</p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-5xl font-bold text-glamora-gold">{avg.toFixed(1)}</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(avg) ? 'text-glamora-gold fill-glamora-gold' : 'text-white/20'}`} />)}
            </div>
            <div className="text-white/40 text-xs mt-1">{reviews.length} reviews</div>
          </div>
          <div className="flex-1 space-y-2 min-w-48">
            {counts.map(c => (
              <div key={c.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-white/50 text-xs">{c.stars}</span>
                  <Star className="w-3 h-3 text-glamora-gold fill-glamora-gold" />
                </div>
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="bg-glamora-gold h-2 rounded-full" style={{ width: `${reviews.length ? (c.count / reviews.length) * 100 : 0}%` }} />
                </div>
                <span className="text-white/40 text-xs w-4">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 items-center">
        <Filter className="w-4 h-4 text-white/40" />
        <div className="flex gap-1">
          {[0, 5, 4, 3, 2, 1].map(r => (
            <button key={r} onClick={() => setRatingFilter(r)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all ${ratingFilter === r ? 'bg-glamora-gold/20 border border-glamora-gold/40 text-glamora-gold' : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white'}`}>
              {r === 0 ? 'All' : <><Star className="w-3 h-3" />{r}</>}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filtered.map(review => (
          <div key={review.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${review.customerId}/40/40`} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-white font-semibold text-sm">{review.customerName}</div>
                  <div className="text-white/40 text-xs">{review.serviceName} · {review.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-glamora-gold fill-glamora-gold' : 'text-white/20'}`} />)}
              </div>
            </div>

            <p className="text-white/70 text-sm mt-3 leading-relaxed">{review.text}</p>

            {review.reply && (
              <div className="mt-3 ml-4 pl-4 border-l-2 border-glamora-gold/30">
                <div className="text-glamora-gold text-xs font-semibold mb-1">Your Reply</div>
                <p className="text-white/60 text-sm">{review.reply}</p>
              </div>
            )}

            {!review.reply && (
              replyingTo === review.id ? (
                <div className="mt-3 flex gap-2">
                  <input value={replyText} onChange={e => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-glamora-gold/50" />
                  <button onClick={() => submitReply(review.id)} className="px-4 py-2 bg-glamora-gold/20 border border-glamora-gold/30 text-glamora-gold rounded-xl text-sm hover:bg-glamora-gold/30 transition-all">
                    Reply
                  </button>
                  <button onClick={() => setReplyingTo(null)} className="px-3 py-2 border border-white/10 text-white/40 rounded-xl text-sm hover:text-white transition-all">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => { setReplyingTo(review.id); setReplyText('') }}
                  className="mt-3 flex items-center gap-1.5 text-xs text-white/40 hover:text-glamora-gold transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Reply to review
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
