import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, LayoutGrid, Filter, Tag, Zap, Heart, Star, SlidersHorizontal, ArrowUpDown, ChevronLeft, Loader2, ChevronDown, Check, X } from 'lucide-react'
import { ProductCard } from '../components/ui/ProductCard'
const categories = [
  { id: 'boy-fashion', name: 'BOY FASHION', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/19629172a.webp' },
  { id: 'girl-fashion', name: 'GIRL FASHION', banner: 'https://images.pexels.com/photos/32328596/pexels-photo-32328596.jpeg' },
  { id: 'footwear', name: 'FOOTWEAR', banner: 'https://images.pexels.com/photos/37052023/pexels-photo-37052023.jpeg' },
  { id: 'toys', name: 'TOYS', banner: 'https://images.pexels.com/photos/27660140/pexels-photo-27660140.jpeg' },
  { id: 'diapering', name: 'DIAPERING', banner: 'https://images.pexels.com/photos/3845493/pexels-photo-3845493.jpeg' },
  { id: 'gear', name: 'GEAR', banner: 'https://images.pexels.com/photos/3958519/pexels-photo-3958519.jpeg' },
  { id: 'feeding', name: 'FEEDING', banner: 'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg' },
  { id: 'bath', name: 'BATH', banner: 'https://images.pexels.com/photos/35979966/pexels-photo-35979966.jpeg' },
  { id: 'nursery', name: 'NURSERY', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/20139636a.webp' },
  { id: 'moms', name: 'MOMS', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/22333906a.webp' },
  { id: 'health', name: 'HEALTH & SAFETY', banner: 'https://images.pexels.com/photos/31212340/pexels-photo-31212340.jpeg' },
  { id: 'boutiques', name: 'BOUTIQUES', banner: 'https://images.pexels.com/photos/15170532/pexels-photo-15170532.jpeg' },
]

// Advanced Skeleton Loader
const SkeletonCard = () => (
  <div className="bg-transparent rounded-[40px] p-2 animate-pulse">
    <div className="aspect-[4/5] bg-[#333]/5 rounded-[35px] mb-4 border-2 border-dashed border-black/5"></div>
    <div className="px-4 pb-4 space-y-3 text-center">
      <div className="h-4 bg-[#333]/5 rounded w-2/3 mx-auto"></div>
      <div className="h-6 bg-[#333]/5 rounded w-full mx-auto"></div>
    </div>
  </div>
)

const generateMockProducts = (catId, count = 100) => {
  const brands = ['Babyhug', 'Mark & Mia', 'Pine Kids', 'Carter\'s', 'Toykio', 'Lego', 'Hot Wheels', 'Pampers']
  const materials = ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone', 'Rubber', 'Denim']
  const types = ['Apparel', 'Toy', 'Footwear', 'Gear', 'Feeding', 'Bath']
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'White', 'Black']
  const sizes = ['Small', 'Medium', 'Large', 'XL']
  const ages = ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years']
  const genders = ['Boy', 'Girl', 'Unisex']

  return Array.from({ length: count }, (_, i) => ({
    id: `${catId}-${i}`,
    name: `${catId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Item ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 10,
    oldPrice: Math.floor(Math.random() * 300) + 50,
    img: `https://picsum.photos/seed/${catId}-${i}/600/700`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    type: types[Math.floor(Math.random() * types.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    age: ages[Math.floor(Math.random() * ages.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    rating: (Math.random() * 2 + 3).toFixed(1),
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    availability: Math.random() > 0.1 ? 'in stock' : 'out of stock',
    discount: Math.floor(Math.random() * 50) + 5
  }))
}

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-black/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-[13px] font-black uppercase tracking-widest text-[#333] hover:text-[#E84949] transition-colors"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? '' : '-rotate-90 opacity-40'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2 mt-4">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AllCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [innerSearch, setInnerSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 12

  const [filters, setFilters] = useState({
    availability: [],
    price: [0, 500],
    type: [],
    brand: [],
    discount: [],
    age: [],
    gender: [],
    material: [],
    size: [],
    color: []
  })

  const allProducts = useMemo(() => generateMockProducts(activeCategory.id, 150), [activeCategory.id])

  const processedProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(innerSearch.toLowerCase())
      const matchAvailability = filters.availability.length === 0 || filters.availability.includes(p.availability)
      const matchPrice = p.price >= filters.price[0] && p.price <= filters.price[1]
      const matchBrand = filters.brand.length === 0 || filters.brand.includes(p.brand)
      const matchType = filters.type.length === 0 || filters.type.includes(p.type)
      const matchAge = filters.age.length === 0 || filters.age.includes(p.age)
      const matchGender = filters.gender.length === 0 || filters.gender.includes(p.gender)
      const matchSize = filters.size.length === 0 || filters.size.includes(p.size)
      const matchColor = filters.color.length === 0 || filters.color.includes(p.color)
      const matchMaterial = filters.material.length === 0 || filters.material.includes(p.material)
      
      return matchSearch && matchAvailability && matchPrice && matchBrand && matchType && matchAge && matchGender && matchSize && matchColor && matchMaterial
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'best-selling') return b.rating - a.rating
      return 0
    })
  }, [allProducts, innerSearch, sortBy, filters])

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage)
  const paginatedProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(1)
    return () => clearTimeout(timer)
  }, [activeCategory])

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }))
    setCurrentPage(1)
  }

  // Helper for Responsive Pagination
  const getVisiblePages = () => {
    const pages = []
    const range = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
    const start = Math.max(1, currentPage - range)
    const end = Math.min(totalPages, currentPage + range)

    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  const FilterContent = () => (
    <div className="space-y-1">
      <FilterSection title="Categories">
        <div className="space-y-1">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold transition-all lowercase ${activeCategory.id === cat.id ? 'bg-[#E84949] text-white shadow-lg' : 'text-[#333] hover:bg-black/5'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {[
        { id: 'availability', title: 'availability', items: ['in stock', 'out of stock'] },
        { id: 'type', title: 'product type', items: ['Apparel', 'Toy', 'Footwear', 'Gear', 'Feeding'] },
        { id: 'brand', title: 'brands', items: ['Babyhug', 'Toykio', 'Carter\'s', 'Lego', 'Pampers'] },
        { id: 'gender', title: 'gender', items: ['Boy', 'Girl', 'Unisex'] },
        { id: 'age', title: 'age', items: ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years'] },
        { id: 'size', title: 'size', items: ['Small', 'Medium', 'Large', 'XL'] },
        { id: 'color', title: 'colors', items: ['Red', 'Blue', 'Green', 'Yellow', 'Pink'] },
        { id: 'material', title: 'material', items: ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone'] },
      ].map(f => (
        <FilterSection key={f.id} title={f.title} defaultOpen={false}>
          <div className="space-y-2">
            {f.items.map(v => (
              <label key={v} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${filters[f.id].includes(v) ? 'bg-[#E84949] border-[#E84949]' : 'border-black/10'}`}>
                  {filters[f.id].includes(v) && <Check size={10} className="text-white" />}
                  <input type="checkbox" className="sr-only" checked={filters[f.id].includes(v)} onChange={() => toggleFilter(f.id, v)} />
                </div>
                <span className="text-[12px] font-bold text-[#666] lowercase">{v}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      ))}

      <div className="pt-6 space-y-3">
        <button onClick={() => { setFilters({ availability: [], price: [0, 500], type: [], brand: [], discount: [], age: [], gender: [], material: [], size: [], color: [] }); setIsFilterOpen(false); }} className="w-full h-12 bg-white border-2 border-[#E84949] text-[#E84949] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E84949] hover:text-white transition-all">
          Remove All
        </button>
        <button onClick={() => setIsFilterOpen(false)} className="w-full h-12 bg-[#E84949] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95">
          Apply
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-grandstander overflow-x-hidden">
      {/* Dynamic Header */}
      <div className="pt-8 pb-8 text-center shell">
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl md:text-6xl lg:text-7xl font-black text-[#333] tracking-tighter">
          Toyoveindia <span className="text-[#E84949]">Collection</span>
        </motion.h1>
      </div>

      <div className="shell pb-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-[1400px] mx-auto">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 max-h-[80vh] overflow-y-auto custom-scrollbar pr-4">
            <div className="border-2 border-dashed border-black/10 rounded-[35px] p-6 xl:p-8">
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1 w-full space-y-6">
            
            {/* Control Bar & Mobile Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="w-full lg:hidden bg-transparent border-2 border-dashed border-black/10 rounded-2xl p-5 flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={18} className="text-[#E84949]" />
                  <span className="text-[14px] font-black uppercase tracking-widest text-[#333]">Filter and sort</span>
                </div>
                <span className="text-[12px] font-bold text-black/40">{processedProducts.length} items</span>
              </button>

              <div className="hidden lg:flex items-center gap-4 w-full justify-between bg-white/30 rounded-2xl p-4 border-2 border-dashed border-black/5">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-black/20" />
                  <span className="text-[13px] font-bold text-[#333]/40 uppercase tracking-widest">{processedProducts.length} items found</span>
                </div>
                <div className="flex items-center gap-3 bg-white/50 rounded-xl px-4 py-2">
                   <ArrowUpDown size={14} className="text-[#E84949]" />
                   <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-[12px] font-black outline-none cursor-pointer">
                      <option value="relevance">Most relevant</option>
                      <option value="best-selling">Best selling</option>
                      <option value="alpha-asc">A - Z</option>
                      <option value="alpha-desc">Z - A</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                   </select>
                </div>
              </div>
            </div>

            {/* Main Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <ProductCard p={p} i={i} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center">
                    <Search size={48} className="mx-auto text-black/5 mb-4" />
                    <h3 className="text-2xl font-black text-[#333]">Nothing matched!</h3>
                    <p className="text-[#333]/40 font-bold">Try changing your filters.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* High-Fidelity Responsive Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 md:gap-3 pt-12">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-transparent border-2 border-dashed border-black/10 flex items-center justify-center text-[#333] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronLeft size={20} />
                </button>
                
                {currentPage > 3 && <span className="text-[#333]/30 font-bold hidden md:block">...</span>}
                
                {getVisiblePages().map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl font-black text-[13px] md:text-[14px] transition-all ${currentPage === page ? 'bg-[#E84949] text-white shadow-lg' : 'bg-transparent border-2 border-dashed border-black/10 text-[#333] hover:border-[#E84949]'}`}>
                    {page}
                  </button>
                ))}

                {currentPage < totalPages - 2 && <span className="text-[#333]/30 font-bold hidden md:block">...</span>}

                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-transparent border-2 border-dashed border-black/10 flex items-center justify-center text-[#333] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Weekly Trending with Snap Scrolling */}
            <section className="mt-20 border-4 border-dashed border-black/5 p-6 md:p-12 lg:p-16 rounded-[50px] md:rounded-[60px]">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#222] text-white text-[9px] font-black uppercase tracking-widest rounded-md mb-4">Trending Now</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#333] tracking-tighter">
                      Weekly <span className="text-[#E84949]">Trending</span>
                    </h2>
                  </div>
                  <p className="text-[#333]/40 font-bold max-w-xs text-[12px] md:text-right">Top picks handpicked for you.</p>
               </div>

               <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 custom-scrollbar">
                  {allProducts.slice(0, 10).map((p, i) => (
                    <div key={`trend-${p.id}`} className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] xl:min-w-[calc(25%-18px)] snap-center">
                      <ProductCard p={p} i={i} />
                    </div>
                  ))}
               </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile Drawer (Left Slide) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/50 z-[2000] backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-[#FDF4E6] z-[2100] shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h3 className="text-xl font-black text-[#333] tracking-tight">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-[#333]"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
