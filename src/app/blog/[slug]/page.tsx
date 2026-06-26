"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Share2, ArrowLeft, MessageSquare, Send } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// generateStaticParams removed — page uses client-side routing via useParams

const extraPosts = [
  { id: "blog4", title: { en: "Nail Art Trends 2025: What's Hot Right Now", ar: "" }, excerpt: { en: "From chrome nails to 3D art, discover the nail trends taking over Saudi salons.", ar: "" }, image: "https://picsum.photos/seed/blog4/800/500", category: "Nails", date: "2024-12-01", readTime: 4, author: "Nour Al-Rashid" },
  { id: "blog5", title: { en: "The Art of Bridal Makeup: Tips from the Pros", ar: "" }, excerpt: { en: "Expert makeup artists share their secrets for a flawless bridal look that lasts all day.", ar: "" }, image: "https://picsum.photos/seed/blog5/800/500", category: "Bridal", date: "2024-11-25", readTime: 8, author: "Hana Al-Qahtani" },
  { id: "blog6", title: { en: "Winter Skincare: Protecting Your Skin in the GCC", ar: "" }, excerpt: { en: "How to adjust your skincare routine for the cooler winter months in Saudi Arabia.", ar: "" }, image: "https://picsum.photos/seed/blog6/800/500", category: "Skincare", date: "2024-11-20", readTime: 5, author: "Reem Al-Dosari" },
];

const allPosts = [...blogPosts.map(p => ({ ...p, author: "Glamora Editorial" })), ...extraPosts];

const MOCK_CONTENT = [
  "Saudi Arabia's beauty industry is evolving at an unprecedented pace. With world-class salons opening across Riyadh, Jeddah, and beyond, the standards for luxury beauty services have never been higher. Women across the Kingdom are embracing international trends while staying true to their cultural identity.",
  "Our experts have curated the most sought-after treatments of 2025. From the viral glazed donut nails that swept social media to the timeless balayage technique adapted for Middle Eastern hair textures, every woman can find something that speaks to her personal style.",
  "Choosing the right salon is about more than just price. It's about finding a team that understands your vision, works with your natural features, and uses premium products that respect your skin and hair health. Glamora's vetted salons all meet strict quality standards so you can book with confidence.",
  "Whether you're preparing for a wedding, a special event, or simply investing in self-care, the journey to looking and feeling your best starts with a single booking. Explore our curated selection of top-rated salons and discover your perfect beauty match today.",
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = allPosts.find(p => p.id === slug);
  const [readProgress, setReadProgress] = useState(0);
  const [comment, setComment] = useState("");
  const [commentName, setCommentName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/50">Post not found</p>
      </div>
    );
  }

  const relatedPosts = allPosts.filter(p => p.id !== slug).slice(0, 3);
  const author = "author" in post ? (post as { author: string }).author : "Glamora Editorial";

  const handleShare = (platform: string) => {
    const url = window.location.href;
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(post.title.en + " " + url)}`);
    if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title.en)}&url=${encodeURIComponent(url)}`);
    if (platform === "copy") navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-glamora-gold to-glamora-pink transition-all duration-100"
        style={{ width: `${readProgress}%` }} />

      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <Image src={post.image} alt={post.title.en} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark via-glamora-dark/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <Badge variant="gold" className="mb-3">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{post.title.en}</h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span>{author}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} min read</span>
            <span>·</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="flex items-center gap-2 text-white/50 hover:text-glamora-gold mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          {MOCK_CONTENT.map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-white/80 leading-relaxed mb-6 text-lg">{para}</motion.p>
          ))}
        </article>

        {/* Share Buttons */}
        <div className="flex items-center gap-3 mb-12 p-5 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl">
          <Share2 className="w-5 h-5 text-glamora-gold" />
          <span className="text-white/70 font-medium">Share this article:</span>
          <button onClick={() => handleShare("whatsapp")} className="bg-green-600/20 border border-green-600/30 text-green-400 px-4 py-2 rounded-full text-sm hover:bg-green-600/30 transition-colors">WhatsApp</button>
          <button onClick={() => handleShare("twitter")} className="bg-sky-500/20 border border-sky-500/30 text-sky-400 px-4 py-2 rounded-full text-sm hover:bg-sky-500/30 transition-colors">Twitter</button>
          <button onClick={() => handleShare("copy")} className="backdrop-blur-md bg-white/5 border border-white/10 text-white/70 px-4 py-2 rounded-full text-sm hover:border-glamora-gold/50 transition-colors">Copy Link</button>
        </div>

        {/* Author Bio */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0">
              <Image src={`https://picsum.photos/seed/${slug}author/100/100`} alt={author} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{author}</h3>
              <p className="text-glamora-gold text-sm">Beauty Editor at Glamora</p>
              <p className="text-white/50 text-sm mt-1">Passionate about beauty, wellness, and empowering women to look and feel their best across Saudi Arabia and the GCC.</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-glamora-gold" /> Leave a Comment
          </h2>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input value={commentName} onChange={e => setCommentName(e.target.value)}
                placeholder="Your name"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
              <input placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold" />
            </div>
            <textarea value={comment} onChange={e => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold mb-4 resize-none" />
            <Button size="md" className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Post Comment
            </Button>
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPosts.map(related => (
              <Link key={related.id} href={`/blog/${related.id}`}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all group">
                <div className="relative h-36 overflow-hidden">
                  <Image src={related.image} alt={related.title.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <Badge variant="gold" className="mb-2 text-xs">{related.category}</Badge>
                  <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-glamora-gold transition-colors">{related.title.en}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
