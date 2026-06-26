"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, X, Map, List, Star } from "lucide-react";
import { salons, categories } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";

const CITIES = ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Makkah", "Madinah", "Abha", "Tabuk"];
const SUGGESTIONS = ["Hair salon Riyadh", "Bridal makeup", "Gel manicure", "HydraFacial", "Lash extensions", "Hot stone massage"];

type FilterState = {
  cities: string[];
  cats: string[];
  rating: number;
  today: boolean;
  homeService: boolean;
  parking: boolean;
  femaleStaff: boolean;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [filters, setFilters] = useState<FilterState>({
    cities: [], cats: [], rating: 0, today: false, homeService: false, parking: false, femaleStaff: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = SUGGESTIONS.filter(s => query.length > 0 && s.toLowerCase().includes(query.toLowerCase()));

  const filtered = salons.filter(s => {
    if (query && !s.name.en.toLowerCase().includes(query.toLowerCase()) && !s.category.toLowerCase().includes(query.toLowerCase())) return false;
    if (filters.cities.length && !filters.cities.some(c => s.location.en.includes(c))) return false;
    if (filters.cats.length && !filters.cats.includes(s.category)) return false;
    if (filters.rating && s.rating < filters.rating) return false;
    if (filters.homeService && !s.hasHomeService) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price") return (a.priceRange.length - b.priceRange.length);
    return 0;
  });

  const activeChips: { label: string; remove: () => void }[] = [
    ...filters.cities.map(c => ({ label: c, remove: () => setFilters(f => ({ ...f, cities: f.cities.filter(x => x !== c) })) })),
    ...filters.cats.map(c => ({ label: c, remove: () => setFilters(f => ({ ...f, cats: f.cats.filter(x => x !== c) })) })),
    ...(filters.homeService ? [{ label: "Home Service", remove: () => setFilters(f => ({ ...f, homeService: false })) }] : []),
    ...(filters.rating ? [{ label: `${filters.rating}+ stars`, remove: () => setFilters(f => ({ ...f, rating: 0 })) }] : []),
  ];

  const toggleCity = (c: string) => setFilters(f => ({ ...f, cities: f.cities.includes(c) ? f.cities.filter(x => x !== c) : [...f.cities, c] }));
  const toggleCat = (c: string) => setFilters(f => ({ ...f, cats: f.cats.includes(c) ? f.cats.filter(x => x !== c) : [...f.cats, c] }));

  return (
    <div className="min-h-screen pt-6">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Search salons, services, categories..."
            className="w-full bg-white/5 border border-white/20 rounded-full pl-12 pr-12 py-4 text-white placeholder-white/40 focus:outline-none focus:border-glamora-gold text-lg" />
          {query && <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-5 h-5 text-white/40 hover:text-white" /></button>}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-md bg-glamora-dark-2 border border-white/10 rounded-2xl overflow-hidden z-10">
              {filteredSuggestions.map(s => (
                <button key={s} onMouseDown={() => { setQuery(s); setShowSuggestions(false); }}
                  className="w-full text-left px-5 py-3 text-white/80 hover:bg-white/5 hover:text-glamora-gold flex items-center gap-3 text-sm">
                  <Search className="w-4 h-4 text-white/30" />{s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/70 hover:text-white text-sm transition-colors">
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeChips.length > 0 && <span className="bg-glamora-gold text-glamora-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{activeChips.length}</span>}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white/70 text-sm focus:outline-none focus:border-glamora-gold">
            <option value="relevance" className="bg-glamora-dark">Sort: Relevance</option>
            <option value="rating" className="bg-glamora-dark">Sort: Rating</option>
            <option value="price" className="bg-glamora-dark">Sort: Price</option>
          </select>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setMapView(false)} className={`p-2 rounded-lg ${!mapView ? "bg-glamora-gold/20 text-glamora-gold" : "text-white/40 hover:text-white"}`}><List className="w-5 h-5" /></button>
            <button onClick={() => setMapView(true)} className={`p-2 rounded-lg ${mapView ? "bg-glamora-gold/20 text-glamora-gold" : "text-white/40 hover:text-white"}`}><Map className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeChips.map(chip => (
              <button key={chip.label} onClick={chip.remove}
                className="flex items-center gap-1.5 bg-glamora-gold/20 border border-glamora-gold/30 text-glamora-gold px-3 py-1 rounded-full text-sm hover:bg-glamora-gold/30 transition-colors">
                {chip.label} <X className="w-3.5 h-3.5" />
              </button>
            ))}
            <button onClick={() => setFilters({ cities: [], cats: [], rating: 0, today: false, homeService: false, parking: false, femaleStaff: false })}
              className="text-white/40 text-sm hover:text-white">Clear all</button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Panel */}
          {showFilters && (
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="w-64 shrink-0">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-24 space-y-6">
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3">City</h4>
                  {CITIES.map(city => (
                    <label key={city} className="flex items-center gap-2 cursor-pointer mb-2">
                      <input type="checkbox" checked={filters.cities.includes(city)} onChange={() => toggleCity(city)} className="accent-glamora-gold" />
                      <span className="text-white/70 text-sm">{city}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3">Category</h4>
                  {categories.map(c => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer mb-2">
                      <input type="checkbox" checked={filters.cats.includes(c.id)} onChange={() => toggleCat(c.id)} className="accent-glamora-gold" />
                      <span className="text-white/70 text-sm">{c.name.en}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3">Min. Rating</h4>
                  {[4.5, 4.0, 3.5, 0].map(r => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                      <input type="radio" name="rating" checked={filters.rating === r} onChange={() => setFilters(f => ({ ...f, rating: r }))} className="accent-glamora-gold" />
                      <span className="text-white/70 text-sm">{r > 0 ? `${r}+` : "Any"}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3">Features</h4>
                  {[
                    { label: "Home Service", key: "homeService" as keyof FilterState },
                    { label: "Female Staff", key: "femaleStaff" as keyof FilterState },
                    { label: "Parking", key: "parking" as keyof FilterState },
                  ].map(({ label, key }) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer mb-2">
                      <input type="checkbox" checked={!!filters[key]} onChange={() => setFilters(f => ({ ...f, [key]: !f[key] }))} className="accent-glamora-gold" />
                      <span className="text-white/70 text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}

          {/* Results */}
          <div className="flex-1">
            <p className="text-white/50 text-sm mb-5">{filtered.length} salons found</p>

            {mapView ? (
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl h-96 flex flex-col items-center justify-center gap-3">
                <Map className="w-12 h-12 text-glamora-gold" />
                <p className="text-white/50 font-medium">Map View</p>
                <p className="text-white/30 text-sm">Interactive map coming soon</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-white font-bold text-xl mb-2">No salons found</h3>
                <p className="text-white/50 mb-4">Try adjusting your filters or search query</p>
                <Button variant="outline" onClick={() => { setQuery(""); setFilters({ cities: [], cats: [], rating: 0, today: false, homeService: false, parking: false, femaleStaff: false }); }}>Clear All</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((salon, i) => (
                  <motion.div key={salon.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-glamora-gold/20 transition-all">
                    <div className="relative h-40">
                      <Image src={salon.cover} alt={salon.name.en} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {salon.isLuxury && <div className="absolute top-2 left-2"><Badge variant="gold">Luxury</Badge></div>}
                      {salon.hasHomeService && <div className="absolute top-2 right-2"><Badge variant="pink">Home</Badge></div>}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-1 line-clamp-1">{salon.name.en}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Rating value={salon.rating} size="sm" />
                        <span className="text-glamora-gold text-sm font-medium">{salon.rating}</span>
                        <span className="text-white/40 text-xs">({salon.reviewsCount})</span>
                        <span className="ml-auto text-white/50 text-xs">{salon.priceRange}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
                        <MapPin className="w-3 h-3" /><span className="truncate">{salon.location.en}</span>
                      </div>
                      <Link href={`/salons/${salon.id}`}><Button size="sm" className="w-full">View Salon</Button></Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
