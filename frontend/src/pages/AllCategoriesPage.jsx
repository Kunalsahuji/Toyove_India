import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, LayoutGrid, Filter, Tag, Zap, Heart, Star, SlidersHorizontal, ArrowUpDown, ChevronLeft, Loader2 } from 'lucide-react'
import { ProductCard } from '../components/ui/ProductCard'

// Comprehensive category list mapping from navigationData
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
  <div className="bg-white rounded-[40px] p-2 shadow-xl animate-pulse">
    <div className="aspect-[4/5] bg-gray-100 rounded-[35px] mb-4"></div>
    <div className="px-4 pb-4 space-y-3">
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      <div className="h-6 bg-gray-100 rounded w-full"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-100 rounded w-1/3"></div>
        <div className="h-8 bg-gray-100 rounded-xl w-10"></div>
      </div>
    </div>
  </div>
)

// Dynamic Product Generator for Scalability Testing (Simulating 1000-2000 items)
const generateMockProducts = (catId, count = 100) => {
  const brands = ['Babyhug', 'Mark & Mia', 'Pine Kids', 'Carter\'s', 'UCB', 'Adidas', 'Lego', 'Hot Wheels']
  return Array.from({ length: count }, (_, i) => ({
    id: `${catId}-${i}`,
    name: `${catId.toUpperCase().replace('-', ' ')} - Premium Item ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 199,
    oldPrice: Math.floor(Math.random() * 3000) + 500,
    img: `https://picsum.photos/seed/${catId}-${i}/400/500`,
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: (Math.random() * 2 + 3).toFixed(1),
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }))
}

export function AllCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [innerSearch, setInnerSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const scrollContainerRef = useRef(null)

  // Simulation of large dataset
  const allProducts = useMemo(() => generateMockProducts(activeCategory.id, 120), [activeCategory.id])

  // Advanced Filtering & Sorting Logic
  const processedProducts = useMemo(() => {
    let result = allProducts.filter(p => 
      p.name.toLowerCase().includes(innerSearch.toLowerCase()) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.date) - new Date(a.date))

    return result
  }, [allProducts, innerSearch, sortBy, priceRange])

  // Pagination Slice
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage)
  const paginatedProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(1)
    return () => clearTimeout(timer)
  }, [activeCategory])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-grandstander">
      {/* Optimized Header (Reduced Padding) */}
      <div className="relative pt-12 pb-10 overflow-hidden">
        <div className="shell relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#333] mb-6 tracking-tighter"
          >
            Toyoveindia <span className="text-[#E84949]">Collection</span>
          </motion.h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#333]/30" size={20} />
            <input 
              type="text" 
              placeholder="Search category..."
              className="w-full h-14 bg-white border-4 border-white rounded-2xl px-14 text-[16px] text-[#333] placeholder:text-[#333]/20 outline-none focus:border-[#E84949] transition-all shadow-lg font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="shell pb-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sticky & Fixed Sidebar (Desktop+Tab) */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-28">
            <div className="bg-[#F9EAD3] p-2 rounded-[35px] border-4 border-white shadow-xl max-h-[80vh] flex flex-col">
              <div className="px-6 py-5 border-b-2 border-dashed border-white flex items-center justify-between">
                <h3 className="text-xl font-black text-[#333] tracking-tight">Categories</h3>
                <Tag size={18} className="text-[#E84949] opacity-30" />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border-2 ${
                      activeCategory.id === cat.id 
                        ? 'bg-[#E84949] text-white border-transparent shadow-lg' 
                        : 'bg-white text-[#333] border-white hover:border-[#E84949]/20 shadow-sm'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${activeCategory.id === cat.id ? 'bg-white animate-pulse' : 'bg-[#E84949]/20'}`}></div>
                    <span className="font-bold text-[13px] uppercase tracking-wider">{cat.name}</span>
                    <ChevronRight size={14} className={`ml-auto transition-transform ${activeCategory.id === cat.id ? 'rotate-90' : 'opacity-20'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Sticky Block */}
            <div className="mt-4 bg-white p-6 rounded-3xl border-4 border-white shadow-lg">
              <h4 className="font-black text-[14px] text-[#333] mb-4 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-[#E84949]" /> Price Filter
              </h4>
              <div className="space-y-4">
                 {[ 
                   { label: 'Under ₹500', range: [0, 500] },
                   { label: '₹500 - ₹1000', range: [500, 1000] },
                   { label: '₹1000 - ₹2000', range: [1000, 2000] },
                   { label: 'Above ₹2000', range: [2000, 5000] },
                 ].map(f => (
                   <button 
                    key={f.label}
                    onClick={() => setPriceRange(f.range)}
                    className={`block w-full text-left px-4 py-2 rounded-xl text-[12px] font-bold transition-all ${priceRange[0] === f.range[0] && priceRange[1] === f.range[1] ? 'bg-[#FDF4E6] text-[#E84949]' : 'text-[#666] hover:bg-gray-50'}`}
                   >
                     {f.label}
                   </button>
                 ))}
                 <button onClick={() => setPriceRange([0, 5000])} className="w-full pt-2 text-[11px] font-black text-[#E84949] uppercase tracking-widest text-center border-t border-dashed">Reset All</button>
              </div>
            </div>
          </aside>

          {/* Optimized Product Area */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Control Bar */}
            <div className="bg-white p-4 rounded-[30px] shadow-lg border-4 border-white flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333]/20" size={16} />
                <input 
                  type="text" 
                  placeholder={`Search in ${activeCategory.name}...`}
                  className="w-full h-11 bg-[#FDF4E6]/50 rounded-2xl pl-10 pr-4 text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949]/30"
                  value={innerSearch}
                  onChange={(e) => setInnerSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                  <ArrowUpDown size={14} className="text-[#E84949]" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-[12px] font-bold outline-none cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Product Grid with Loading States */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <motion.div key={`skel-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p, i) => (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-[40px] p-2 shadow-xl border-4 border-white hover:-translate-y-2 transition-all duration-500 group"
                    >
                      <ProductCard p={p} i={i} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-black text-[#333]">No products found</h3>
                    <p className="text-gray-400 font-bold">Try adjusting your filters or search term</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#333] disabled:opacity-30 hover:bg-[#E84949] hover:text-white transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black text-[13px] transition-all ${currentPage === i + 1 ? 'bg-[#E84949] text-white shadow-lg' : 'bg-white text-[#333] hover:bg-[#FDF4E6]'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-[#333] disabled:opacity-30 hover:bg-[#E84949] hover:text-white transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Weekly Trending Overhaul */}
            <section className="mt-16 bg-[#333] p-10 md:p-16 rounded-[60px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#E84949]/20 rounded-full blur-[100px]"></div>
               <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="inline-block px-4 py-1 bg-[#E84949] text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full mb-4">Hot This Week</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                      Weekly <span className="text-[#E84949]">Trending</span>
                    </h2>
                  </div>
                  <p className="text-white/40 font-bold max-w-xs text-[12px] md:text-right">Explore the most loved products by parents this week in {activeCategory.name}.</p>
               </div>

               <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
                  {allProducts.slice(0, 10).map((p, i) => (
                    <motion.div 
                      key={`trending-${p.id}`}
                      className="min-w-[280px] md:min-w-[320px] bg-white rounded-[45px] p-2 shadow-2xl"
                    >
                      <ProductCard p={p} i={i} />
                    </motion.div>
                  ))}
               </div>
            </section>
          </main>
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="fixed bottom-10 right-10 z-0 pointer-events-none opacity-20 hidden 2xl:block">
        <div className="w-64 h-64 border-[40px] border-[#E84949] rounded-full"></div>
      </div>
    </div>
  )
}
