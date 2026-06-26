"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { reviews } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const displayReviews = reviews.slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % displayReviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayReviews.length]);

  const review = displayReviews[current];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-glamora-gold font-semibold uppercase tracking-wider text-sm mb-3">What Our Customers Say</p>
          <h2 className="text-4xl font-bold text-white">Real <span className="text-gold-gradient">Reviews</span></h2>
        </div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <Quote className="w-10 h-10 text-glamora-gold/30 mx-auto mb-6" />
              <p className="text-white/80 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                &ldquo;{review.comment.en}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-glamora-gold/40">
                  <Image src={review.customerAvatar} alt={review.customerName} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="text-white font-bold">{review.customerName}</p>
                  <p className="text-glamora-gold text-sm">{review.service}</p>
                </div>
                <Rating value={review.rating} showValue />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {displayReviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-glamora-gold" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
