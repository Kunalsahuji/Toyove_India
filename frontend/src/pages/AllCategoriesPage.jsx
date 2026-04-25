import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronDown, Check, X, ChevronRight } from 'lucide-react'
import { ProductCard } from '../components/ui/ProductCard'

const categories = [
  { id: 'boy-fashion', name: 'BOY FASHION' },
  { id: 'girl-fashion', name: 'GIRL FASHION' },
  { id: 'footwear', name: 'FOOTWEAR' },
  { id: 'toys', name: 'TOYS' },
  { id: 'diapering', name: 'DIAPERING' },
  { id: 'gear', name: 'GEAR' },
  { id: 'feeding', name: 'FEEDING' },
  { id: 'bath', name: 'BATH' },
  { id: 'nursery', name: 'NURSERY' },
  { id: 'moms', name: 'MOMS' },
  { id: 'health', name: 'HEALTH & SAFETY' },
  { id: 'boutiques', name: 'BOUTIQUES' },
]

const SkeletonCard = () => (
  <div className="bg-transparent rounded-[30px] p-2 animate-pulse">
    <div className="aspect-square bg-[#333]/5 rounded-[30px] mb-4 border-[1.5px] border-dashed border-black/5"></div>
    <div className="px-4 pb-4 space-y-3 text-center">
      <div className="h-4 bg-[#333]/5 rounded w-2/3 mx-auto"></div>
      <div className="h-6 bg-[#333]/5 rounded w-full mx-auto"></div>
    </div>
  </div>
)

const generateMockProducts = (catId, count = 150) => {
  const brands = ['Babyhug', 'Toykio', 'Carter\'s', 'Lego', 'Pampers']
  const materials = ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone']
  const colors = ['Red', 'Blue', 'Pink', 'Yellow', 'White', 'Black']
  const ages = ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years']
  const genders = ['Boy', 'Girl', 'Unisex']
  const sizes = ['Small', 'Medium', 'Large', 'XL']
  const discounts = ['10% OFF', '20% OFF', '30% OFF', '50% OFF']

  return Array.from({ length: count }, (_, i) => ({
    id: `${catId}-${i}`,
    name: `${catId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Item ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 100,
    oldPrice: Math.floor(Math.random() * 3000) + 500,
    img: `https://picsum.photos/seed/${catId}-${i}/600/600`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    age: ages[Math.floor(Math.random() * ages.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    size: sizes[Math.floor(Math.random() * sizes.length)],
    discount: discounts[Math.floor(Math.random() * discounts.length)],
    availability: Math.random() > 0.1 ? 'in stock' : 'out of stock',
    rating: (Math.random() * 2 + 3).toFixed(1),
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }))
}

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-black/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-[13px] font-black uppercase tracking-widest text-[#444] hover:text-[#E84949] transition-colors"
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
  const [gridCols, setGridCols] = useState(3)
  const itemsPerPage = 12

  const [filters, setFilters] = useState({
    availability: [],
    price: [0, 5000],
    brand: [],
    age: [],
    gender: [],
    material: [],
    size: [],
    color: [],
    discount: [],
    type: []
  })

  const allProducts = useMemo(() => generateMockProducts(activeCategory.id, 150), [activeCategory.id])

  const processedProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(innerSearch.toLowerCase())
      const matchAvailability = filters.availability.length === 0 || filters.availability.includes(p.availability)
      const matchBrand = filters.brand.length === 0 || filters.brand.includes(p.brand)
      const matchAge = filters.age.length === 0 || filters.age.includes(p.age)
      const matchGender = filters.gender.length === 0 || filters.gender.includes(p.gender)
      return matchSearch && matchAvailability && matchBrand && matchAge && matchGender
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date)
      if (sortBy === 'best-selling') return b.rating - a.rating
      return 0
    })
  }, [allProducts, innerSearch, sortBy, filters])

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage)
  const paginatedProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    if (isFilterOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isFilterOpen])

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

  const getVisiblePages = () => {
    const pages = []
    let range = 2 // Default for desktop (approx 5 pages)
    if (window.innerWidth < 768) range = 1 // Mobile (3 pages)
    else if (window.innerWidth < 1024) range = 2 // Tablet (5 pages)
    else range = 3 // Desktop (7 pages)

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
            <button key={cat.id} onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold transition-all lowercase ${activeCategory.id === cat.id ? 'bg-[#E84949] text-white shadow-lg' : 'text-[#444] hover:bg-black/5'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {[
        { id: 'availability', title: 'availability', items: ['in stock', 'out of stock'] },
        { id: 'brand', title: 'brands', items: ['Babyhug', 'Toykio', 'Carter\'s', 'Lego', 'Pampers'] },
        { id: 'gender', title: 'gender', items: ['Boy', 'Girl', 'Unisex'] },
        { id: 'age', title: 'age', items: ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years'] },
        { id: 'size', title: 'size', items: ['Small', 'Medium', 'Large', 'XL'] },
        { id: 'color', title: 'colors', items: ['Red', 'Blue', 'Pink', 'Yellow', 'White', 'Black'] },
        { id: 'material', title: 'material', items: ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone'] },
        { id: 'discount', title: 'discounts', items: ['10% OFF', '20% OFF', '30% OFF', '50% OFF'] }
      ].map(f => (
        <FilterSection key={f.id} title={f.title} defaultOpen={false}>
          <div className="space-y-2">
            {f.items.map(v => (
              <label key={v} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${filters[f.id].includes(v) ? 'bg-[#E84949] border-[#E84949]' : 'border-black/10'}`}>
                  {filters[f.id].includes(v) && <Check size={10} className="text-white" />}
                  <input type="checkbox" className="sr-only" checked={filters[f.id].includes(v)} onChange={() => toggleFilter(f.id, v)} />
                </div>
                <span className="text-[12px] font-bold text-[#444] lowercase">{v}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      ))}

      <div className="pt-6 space-y-3">
        <button onClick={() => setFilters({ availability: [], price: [0, 5000], brand: [], age: [], gender: [], material: [], size: [], color: [], discount: [], type: [] })} className="w-full h-12 bg-white border-[1.5px] border-dashed border-black/10 text-[#444] rounded-xl text-[11px] font-black uppercase tracking-widest hover:border-[#E84949] hover:text-[#E84949] transition-all">
          Remove All
        </button>
        <button onClick={() => setIsFilterOpen(false)} className="w-full h-12 bg-[#E84949] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
          Apply
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-grandstander overflow-x-hidden">
      <div className="shell pt-12 pb-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#444] tracking-tighter mb-8 uppercase">
          Toyoveindia <span className="text-[#E84949]">Collection</span>
        </motion.h1>

        <div className="max-w-2xl mx-auto relative group">
          <input 
            type="text"
            value={innerSearch}
            onChange={(e) => setInnerSearch(e.target.value)}
            placeholder="Search within this category..."
            className="w-full h-14 md:h-16 bg-white/50 border-2 border-dashed border-black/10 rounded-[25px] px-8 pl-14 text-[14px] md:text-[16px] font-bold outline-none focus:border-[#E84949] focus:bg-white transition-all shadow-sm"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-[#E84949] transition-colors" size={24} />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28">
            <div className="border-[1.5px] border-dashed border-black/10 rounded-[35px] p-8">
               <h3 className="text-[14px] font-black uppercase tracking-widest text-[#444] mb-6 flex items-center gap-2">
                 <SlidersHorizontal size={16} className="text-[#E84949]" /> Filter:
               </h3>
               <FilterContent />
            </div>
          </aside>

          <main className="flex-1 w-full space-y-8 overflow-hidden">
            
            {/* Toolbar */}
            <div className="bg-[#F9EAD3] border-[1.5px] border-dashed border-black/10 rounded-[25px] p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsFilterOpen(true)} className="lg:hidden p-2 rounded-lg bg-white/50 border border-dashed border-black/10"><SlidersHorizontal size={18}/></button>
                
                {/* Desktop Grid Toggles */}
                <div className="hidden lg:flex items-center gap-2">
                  <button onClick={() => setGridCols(3)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${gridCols === 3 ? 'bg-[#E84949] text-white shadow-lg' : 'bg-transparent text-[#444] hover:bg-black/5'}`}>
                    <div className="flex gap-[2px] items-center">
                      <div className="w-[3px] h-3 bg-current rounded-full"/>
                      <div className="w-[3px] h-3 bg-current rounded-full"/>
                      <div className="w-[3px] h-3 bg-current rounded-full"/>
                    </div>
                  </button>
                  <button onClick={() => setGridCols(2)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${gridCols === 2 ? 'bg-[#E84949] text-white shadow-lg' : 'bg-transparent text-[#444] hover:bg-black/5'}`}>
                    <div className="flex gap-[2px] items-center">
                      <div className="w-[3px] h-3 bg-current rounded-full"/>
                      <div className="w-[3px] h-3 bg-current rounded-full"/>
                    </div>
                  </button>
                  <button onClick={() => setGridCols(1)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${gridCols === 1 ? 'bg-[#E84949] text-white shadow-lg' : 'bg-transparent text-[#444] hover:bg-black/5'}`}>
                    <div className="w-[3px] h-3 bg-current rounded-full"/>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-3">
                   <span className="text-[11px] font-black uppercase tracking-widest text-[#444]/40">Sort by:</span>
                   <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-[12px] font-black outline-none cursor-pointer text-[#444]">
                      <option value="relevance">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="alpha-asc">Alphabetically, A-Z</option>
                      <option value="alpha-desc">Alphabetically, Z-A</option>
                      <option value="price-asc">Price, Low to high</option>
                      <option value="price-desc">Price, high to low</option>
                      <option value="oldest">Date, old to new</option>
                      <option value="newest">Date, new to old</option>
                   </select>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border border-dashed border-black/10 text-[11px] font-black text-[#444]">
                  {processedProducts.length} products
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-8 ${
              gridCols === 3 ? 'grid-cols-2 xl:grid-cols-3' : 
              gridCols === 2 ? 'grid-cols-2' : 
              'grid-cols-1'
            }`}>
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  paginatedProducts.map((p, i) => (
                    <ProductCard key={p.id} p={p} i={i} isGridOne={gridCols === 1} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Pagination (Refined Responsive) */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-12">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-12 h-12 rounded-2xl border-2 border-dashed border-black/10 flex items-center justify-center text-[#444] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {getVisiblePages().map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`w-12 h-12 rounded-2xl font-black text-[14px] transition-all ${currentPage === page ? 'bg-[#E84949] text-white shadow-lg scale-110' : 'bg-transparent border-2 border-dashed border-black/10 text-[#444] hover:border-[#E84949]'}`}>
                      {page}
                    </button>
                  ))}
                </div>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-12 h-12 rounded-2xl border-2 border-dashed border-black/10 flex items-center justify-center text-[#444] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Weekly Trending Section (Refined Card Scale) */}
            <section className="mt-24 border-[1.5px] border-dashed border-black/10 p-8 md:p-12 rounded-[50px] bg-white/10 overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl md:text-4xl font-black text-[#444] uppercase tracking-tighter">Weekly <span className="text-[#E84949]">Trending</span></h2>
                  <Link to="/all-categories" className="text-[11px] font-black uppercase tracking-widest text-[#E84949] border-b-2 border-[#E84949]">View All</Link>
               </div>
               <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
                  {allProducts.slice(0, 10).map((p, i) => (
                    <div key={`trend-${p.id}`} className="min-w-[85%] md:min-w-[45%] lg:min-w-[22%] snap-center shrink-0">
                      <div className="scale-95 hover:scale-100 transition-transform duration-500">
                        <ProductCard p={p} i={i} />
                      </div>
                    </div>
                  ))}
               </div>
            </section>
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFilterOpen(false)} className="fixed inset-0 bg-black/40 z-[2000] backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[85%] max-w-[340px] bg-[#FDF4E6] z-[2100] p-6 overflow-y-auto custom-scrollbar shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-[#444] uppercase tracking-tight">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center"><X size={20}/></button>
              </div>
              <div className="flex-1">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
