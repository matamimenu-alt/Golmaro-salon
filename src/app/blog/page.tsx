"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, Mail, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const extraPosts = [
  { id: "blog4", title: { en: "Nail Art Trends 2025: What's Hot Right Now", ar: "" }, excerpt: { en: "From chrome nails to 3D art, discover the nail trends taking over Saudi salons.", ar: "" }, image: "https://picsum.photos/seed/blog4/800/500", category: "Nails", date: "2024-12-01", readTime: 4, author: "Nour Al-Rashid" },
  { id: "blog5", title: { en: "The Art of Bridal Makeup: Tips from the Pros", ar: "" }, excerpt: { en: "Expert makeup artists share their secrets for a flawless bridal look that lasts all day.", ar: "" }, image: "https://picsum.photos/seed/blog5/800/500", category: "Bridal", date: "2024-11-25", readTime: 8, author: "Hana Al-Qahtani" },
  { id: "blog6", title: { en: "Winter Skincare: Protecting Your Skin in the GCC", ar: "" }, excerpt: { en: "How to adjust your skincare routine for the cooler winter months in Saudi Arabia.", ar: "" }, image: "https://picsum.photos/seed/blog6/800/500", category: "Skincare", date: "2024-11-20", readTime: 5, author: "Reem Al-Dosari" },
];

const allPosts = [...blogPosts.map(p => ({ ...p, author: "Glamora Editorial" })), ...extraPosts];
const CATEGORIES = ["All", "Hair", "Skincare", "Bridal", "Nails", "Makeup", "Tips"];
const TAGS = ["Riyadh", "2025 Trends", "Skincare Tips", "Bridal", "Nail Art", "Hair Color", "Summer", "Winter", "GCC Beauty", "Luxury"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");

  const featured = allPosts[0];
  const filtered = allPosts.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Featured Post Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image src={featured.image} alt={featured.title.en} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark via-glamora-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="gold" className="mb-3">{featured.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-2xl">{featured.title.en}</h1>
            <p className="text-white/70 text-lg mb-4 max-w-xl line-clamp-2">{featured.excerpt.en}</p>
            <div className="flex items-center gap-4 text-white/50 text-sm mb-5">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featured.readTime} min read</span>
              <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <Link href={`/blog/${featured.id}`}><Button size="lg">Read Article</Button></Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-gradient-to-r from-glamora-gold to-glamora-pink text-white" : "backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all group">
              <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3"><Badge variant="gold">{post.category}</Badge></div>
                </div>
                <div className="p-5">
                  <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-glamora-gold transition-colors">{post.title.en}</h2>
                  <p className="text-white/50 text-sm mb-4 line-clamp-2">{post.excerpt.en}</p>
                  <div className="flex items-center justify-between text-white/40 text-xs">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
                    <span>{"author" in post ? post.author : "Glamora Editorial"}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Tags Cloud */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
            <Tag className="w-6 h-6 text-glamora-gold" /> Popular Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {TAGS.map(tag => (
              <span key={tag} className="backdrop-blur-md bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-sm cursor-pointer hover:border-glamora-gold/50 hover:text-glamora-gold transition-all">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="backdrop-blur-md bg-glamora-gold/10 border border-glamora-gold/30 rounded-3xl p-8 text-center">
          <Mail className="w-12 h-12 text-glamora-gold mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Stay in the Loop</h2>
          <p className="text-white/60 mb-6">Get weekly beauty tips, trends, and exclusive deals delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
            <Button size="md">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
