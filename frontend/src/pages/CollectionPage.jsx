import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, SlidersHorizontal, Check, X, Search, ArrowUpDown, ChevronDown } from 'lucide-react'
import { categoryData } from '../data/navigationData'
import { ProductCard } from '../components/ui/ProductCard'

// Shared Skeleton Loader
const SkeletonCard = () => (
  <div className="bg-transparent rounded-[40px] p-2 animate-pulse">
    <div className="aspect-[4/5] bg-[#333]/5 rounded-[35px] mb-4 border-2 border-dashed border-black/5"></div>
    <div className="px-4 pb-4 space-y-3 text-center">
      <div className="h-4 bg-[#333]/5 rounded w-2/3 mx-auto"></div>
      <div className="h-6 bg-[#333]/5 rounded w-full mx-auto"></div>
    </div>
  </div>
)

// Dynamic Mock Product Generator for Collection
const generateMockProducts = (catId, subCatId, count = 100) => {
  const brands = ['Babyhug', 'Toykio', 'Pine Kids', 'Carter\'s', 'Lego', 'Pampers']
  const materials = ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone']
  const sizes = ['Small', 'Medium', 'Large', 'XL']
  const ages = ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years']
  const genders = ['Boy', 'Girl', 'Unisex']

  return Array.from({ length: count }, (_, i) => ({
    id: `${catId}-${subCatId || 'all'}-${i}`,
    name: `${(subCatId || catId).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - Item ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 10,
    oldPrice: Math.floor(Math.random() * 300) + 50,
    img: `https://picsum.photos/seed/${catId}-${subCatId}-${i}/600/700`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    material: materials[Math.floor(Math.random() * materials.length)],
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

export function CollectionPage() {
  const { category, subcategory } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const itemsPerPage = 12

  // Multi-Filter State
  const [filters, setFilters] = useState({
    availability: [],
    price: [0, 500],
    brand: [],
    age: [],
    gender: [],
    material: [],
    size: []
  })

  // Lookup Category Data
  const catKey = category?.toUpperCase().replaceAll('-', ' ')
  const currentCatData = categoryData[catKey] || categoryData['BOY FASHION']
  const displayTitle = (subcategory || category || 'Collection').replaceAll('-', ' ')
  const bannerImg = currentCatData?.banner

  // Reset logic when route changes
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(1)
    return () => clearTimeout(timer)
  }, [category, subcategory])

  const allProducts = useMemo(() => generateMockProducts(category, subcategory, 120), [category, subcategory])

  const processedProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchAvailability = filters.availability.length === 0 || filters.availability.includes(p.availability)
      const matchPrice = p.price >= filters.price[0] && p.price <= filters.price[1]
      const matchBrand = filters.brand.length === 0 || filters.brand.includes(p.brand)
      const matchAge = filters.age.length === 0 || filters.age.includes(p.age)
      const matchGender = filters.gender.length === 0 || filters.gender.includes(p.gender)
      return matchAvailability && matchPrice && matchBrand && matchAge && matchGender
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date)
      if (sortBy === 'best-selling') return b.rating - a.rating
      return 0
    })
  }, [allProducts, sortBy, filters])

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage)
  const paginatedProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }))
    setCurrentPage(1)
  }

  const getVisiblePages = () => {
    const pages = []
    const range = window.innerWidth < 768 ? 1 : 2
    const start = Math.max(1, currentPage - range)
    const end = Math.min(totalPages, currentPage + range)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  const FilterContent = () => (
    <div className="space-y-1">
      {[
        { id: 'availability', title: 'availability', items: ['in stock', 'out of stock'] },
        { id: 'brand', title: 'brands', items: ['Babyhug', 'Toykio', 'Carter\'s', 'Lego', 'Pampers'] },
        { id: 'gender', title: 'gender', items: ['Boy', 'Girl', 'Unisex'] },
        { id: 'age', title: 'age', items: ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8+ Years'] },
        { id: 'size', title: 'size', items: ['Small', 'Medium', 'Large', 'XL'] },
        { id: 'material', title: 'material', items: ['Cotton', 'Wool', 'Plastic', 'Wood', 'Silicone'] },
      ].map(f => (
        <FilterSection key={f.id} title={f.title} defaultOpen={f.id === 'availability'}>
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
      <div className="pt-6">
        <button onClick={() => setFilters({ availability: [], price: [0, 500], brand: [], age: [], gender: [], material: [], size: [] })} className="w-full h-12 bg-white border-2 border-[#E84949] text-[#E84949] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E84949] hover:text-white transition-all">Reset All</button>
      </div>
    </div>
  )

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-grandstander overflow-x-hidden">
      {/* Dynamic Hero Section */}
      <div className="relative h-[250px] md:h-[400px] overflow-hidden flex items-center justify-center">
        <img src={bannerImg} alt={displayTitle} className="absolute inset-0 w-full h-full object-cover brightness-[0.5] scale-105" />
        <div className="relative z-10 text-center shell">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <p className="text-[#E84949] text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] mb-4">Premium Collection</p>
             <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">{displayTitle}</h1>
          </motion.div>
        </div>
      </div>

      <div className="shell pb-24 mt-10">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-black/30 mb-10 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-[#E84949]">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/collections/${category}`} className="hover:text-[#E84949]">{category?.replaceAll('-', ' ')}</Link>
          {subcategory && (
            <>
              <ChevronRight size={12} />
              <span className="text-[#333]">{subcategory?.replaceAll('-', ' ')}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-[1400px] mx-auto">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28 max-h-[80vh] overflow-y-auto custom-scrollbar pr-4">
             <div className="border-2 border-dashed border-black/10 rounded-[35px] p-8">
                <FilterContent />
             </div>
          </aside>

          <main className="flex-1 w-full space-y-6">
            {/* Mobile Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden w-full bg-transparent border-2 border-dashed border-black/10 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={18} className="text-[#E84949]" />
                  <span className="text-[14px] font-black uppercase tracking-widest text-[#333]">Filter and sort</span>
                </div>
                <span className="text-[12px] font-bold text-black/40">{processedProducts.length} items</span>
              </button>

              <div className="hidden lg:flex items-center justify-between w-full bg-white/20 p-4 rounded-2xl border-2 border-dashed border-black/5">
                <span className="text-[12px] font-black uppercase tracking-widest text-black/20">{processedProducts.length} items found</span>
                <div className="flex items-center gap-3">
                   <ArrowUpDown size={14} className="text-[#E84949]" />
                   <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-[12px] font-black outline-none cursor-pointer">
                      <option value="relevance">Sort: Most Relevant</option>
                      <option value="best-selling">Sort: Best Selling</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">New Arrivals</option>
                   </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <ProductCard p={p} i={i} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center">
                    <Search size={48} className="mx-auto text-black/5 mb-4" />
                    <h3 className="text-2xl font-black text-[#333]">No products match.</h3>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 md:gap-3 pt-12">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-dashed border-black/10 flex items-center justify-center text-[#333] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronLeft size={20} />
                </button>
                {getVisiblePages().map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl font-black text-[13px] md:text-[14px] transition-all ${currentPage === page ? 'bg-[#E84949] text-white shadow-lg' : 'bg-transparent border-2 border-dashed border-black/10 text-[#333] hover:border-[#E84949]'}`}>
                    {page}
                  </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-dashed border-black/10 flex items-center justify-center text-[#333] disabled:opacity-10 hover:border-[#E84949] transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
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
