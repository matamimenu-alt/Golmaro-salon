"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Star, Heart, ChevronDown, Grid3X3, Map, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { salons, categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const priceRanges = ["$$", "$$$", "$$$$"];
const features = [
  { id: "home", label: "Home Service" },
  { id: "luxury", label: "Luxury" },
  { id: "offers", label: "Has Offers" },
];

export default function SalonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  const filtered = useMemo(() => {
    let result = [...salons];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.en.toLowerCase().includes(q) ||
        s.neighborhood.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(s => s.category === selectedCategory);
    }

    if (selectedRating) {
      result = result.filter(s => s.rating >= selectedRating);
    }

    if (selectedPrices.length > 0) {
      result = result.filter(s => selectedPrices.includes(s.priceRange));
    }

    if (selectedFeatures.includes("home")) result = result.filter(s => s.hasHomeService);
    if (selectedFeatures.includes("luxury")) result = result.filter(s => s.isLuxury);
    if (selectedFeatures.includes("offers")) result = result.filter(s => s.offers.length > 0);

    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviewsCount - a.reviewsCount); break;
      case "price-low": result.sort((a, b) => a.priceRange.length - b.priceRange.length); break;
      case "price-high": result.sort((a, b) => b.priceRange.length - a.priceRange.length); break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedRating, selectedPrices, selectedFeatures, sortBy]);

  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const togglePrice = (p: string) => setSelectedPrices(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const toggleFeature = (f: string) => setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const FilterSidebar = () => (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-6">
      <h3 className="font-semibold text-white">Filters</h3>

      {/* Categories */}
      <div>
        <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Category</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedCategory(null)} className={cn("px-3 py-1.5 rounded-full text-xs transition-all", !selectedCategory ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white")}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)} className={cn("px-3 py-1.5 rounded-full text-xs transition-all", selectedCategory === cat.id ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white")}>
              {cat.name.en}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Minimum Rating</p>
        <div className="flex gap-2">
          {[4, 4.5, 5].map(r => (
            <button key={r} onClick={() => setSelectedRating(selectedRating === r ? null : r)} className={cn("px-3 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all", selectedRating === r ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white")}>
              <Star className="w-3 h-3" />{r}+
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Price Range</p>
        <div className="flex gap-2">
          {priceRanges.map(p => (
            <button key={p} onClick={() => togglePrice(p)} className={cn("px-3 py-1.5 rounded-full text-xs font-mono transition-all", selectedPrices.includes(p) ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white")}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Features</p>
        <div className="space-y-2">
          {features.map(f => (
            <label key={f.id} className="flex items-center gap-3 cursor-pointer group">
              <div onClick={() => toggleFeature(f.id)} className={cn("w-4 h-4 rounded border transition-all flex items-center justify-center", selectedFeatures.includes(f.id) ? "bg-glamora-gold border-glamora-gold" : "border-white/30 group-hover:border-glamora-gold/60")}>
                {selectedFeatures.includes(f.id) && <span className="text-white text-xs">✓</span>}
              </div>
              <span className="text-white/70 text-sm">{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      {(selectedCategory || selectedRating || selectedPrices.length > 0 || selectedFeatures.length > 0) && (
        <button
          onClick={() => { setSelectedCategory(null); setSelectedRating(null); setSelectedPrices([]); setSelectedFeatures([]); }}
          className="w-full text-red-400 text-sm hover:text-red-300 flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-glamora-dark pt-16">
      {/* Hero Search */}
      <div className="bg-glamora-dark-2 border-b border-white/10 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Find Your <span className="text-gold-gradient">Perfect Salon</span>
          </h1>
          <p className="text-white/50 mb-6">Browse 30+ beauty salons in Riyadh</p>
          <div className="flex flex-col sm:flex-row gap-2 bg-white/5 border border-white/10 rounded-2xl p-2">
            <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-glamora-gold flex-shrink-0" />
              <input
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search salons, services..."
                className="bg-transparent text-white placeholder:text-white/30 text-sm outline-none w-full"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-4 py-3">
              <MapPin className="w-4 h-4 text-glamora-gold flex-shrink-0" />
              <input placeholder="Neighborhood..." className="bg-transparent text-white placeholder:text-white/30 text-sm outline-none w-full" />
            </div>
            <Button className="flex-shrink-0">Search</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-white/60 text-sm">
                <span className="text-white font-semibold">{filtered.length}</span> salons found
              </p>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white/70 hover:text-white">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white/70 focus:outline-none focus:ring-2 focus:ring-glamora-gold/50 pr-8 cursor-pointer"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value} className="bg-glamora-dark">{o.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>

                {/* View toggle */}
                <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode("grid")} className={cn("p-2 transition-all", viewMode === "grid" ? "bg-glamora-gold text-white" : "text-white/50 hover:text-white")}>
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode("map")} className={cn("p-2 transition-all", viewMode === "map" ? "bg-glamora-gold text-white" : "text-white/50 hover:text-white")}>
                    <Map className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filters */}
            {filtersOpen && (
              <div className="lg:hidden mb-6">
                <FilterSidebar />
              </div>
            )}

            {/* Grid */}
            {paginated.length === 0 ? (
              <div className="text-center py-20 text-white/40">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No salons found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map((salon, i) => (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-glamora-gold/30 transition-all duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image src={salon.cover} alt={salon.name.en} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-glamora-dark/80 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {salon.isLuxury && <Badge variant="gold">✨ Luxury</Badge>}
                        {salon.offers.length > 0 && <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">🔥 Offers</Badge>}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-glamora-gold/50">
                          <Image src={salon.logo} alt={salon.name.en} width={36} height={36} className="object-cover" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-white text-sm">{salon.name.en}</h3>
                          <p className="text-white/40 text-xs" dir="rtl">{salon.name.ar}</p>
                        </div>
                        <span className="text-white/40 text-xs font-mono flex-shrink-0">{salon.priceRange}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Rating value={salon.rating} size="sm" />
                        <span className="text-glamora-gold text-xs font-semibold">{salon.rating}</span>
                        <span className="text-white/40 text-xs">({salon.reviewsCount})</span>
                      </div>
                      <p className="text-white/50 text-xs flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" />{salon.location.en}
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/salons/${salon.id}`} className="flex-1">
                          <Button size="sm" className="w-full">Book Now</Button>
                        </Link>
                        <Link href={`/salons/${salon.id}`}>
                          <Button variant="dark" size="icon" className="w-9 h-9">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button variant="dark" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-9 h-9 rounded-full text-sm transition-all",
                      page === currentPage ? "bg-glamora-gold text-white" : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {page}
                  </button>
                ))}
                <Button variant="dark" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
