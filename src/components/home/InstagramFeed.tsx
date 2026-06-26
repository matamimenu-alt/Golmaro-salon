"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Camera } from "lucide-react";

const PHOTOS = Array.from({ length: 9 }, (_, i) => ({
  seed: `insta${i + 1}`,
  likes: Math.floor(Math.random() * 900) + 100,
  comments: Math.floor(Math.random() * 80) + 10,
}));

export default function InstagramFeed() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">@glamora.sa</h2>
              <p className="text-white/50 text-sm">Follow us for daily beauty inspiration</p>
            </div>
          </div>
          <a href="#" className="text-glamora-gold hover:text-glamora-gold-light text-sm font-medium transition-colors">
            Follow Us →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {PHOTOS.map((photo, i) => (
            <motion.a key={photo.seed} href="#"
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="relative aspect-square rounded-xl overflow-hidden group">
              <Image src={`https://picsum.photos/seed/${photo.seed}/400/400`} alt={`Instagram post ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 33vw, 25vw" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-5 text-white font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white" />{photo.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-white" />{photo.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
