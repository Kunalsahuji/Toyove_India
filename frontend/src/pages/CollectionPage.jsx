import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, Heart, Repeat, LayoutGrid, List, Filter } from 'lucide-react'
import { categoryBanners, defaultBanner } from '../utils/navigationData'

// Mock products for collection
const mockProducts = [
  { id: 1, name: 'Premium Wood Toy', price: 120, oldPrice: 160, img: 'https://toykio.myshopify.com/cdn/shop/files/product-08.jpg?v=1716179376&width=533' },
  { id: 2, name: 'Eco Soft Doll', price: 45, oldPrice: 65, img: 'https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533' },
  { id: 3, name: 'Learning Kit Pro', price: 95, oldPrice: 130, img: 'https://toykio.myshopify.com/cdn/shop/files/product-05.jpg?v=1710995380&width=533' },
  { id: 4, name: 'Robot Vehicle X1', price: 150, oldPrice: 200, img: 'https://toykio.myshopify.com/cdn/shop/files/product-06.jpg?v=1710995380&width=533' },
  { id: 5, name: 'Mini Stacker Set', price: 35, oldPrice: 45, img: 'https://toykio.myshopify.com/cdn/shop/files/product-08-02.jpg?v=1716179376&width=533' },
  { id: 6, name: 'Stuffed Bunny Blue', price: 28, oldPrice: 40, img: 'https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533' },
  { id: 7, name: 'Puzzle Master 3D', price: 55, oldPrice: 75, img: 'https://toykio.myshopify.com/cdn/shop/files/product-05-02.jpg?v=1710995381&width=533' },
  { id: 8, name: 'Classic Truck Wood', price: 65, oldPrice: 90, img: 'https://toykio.myshopify.com/cdn/shop/files/product-06-02.jpg?v=1710995381&width=533' },
]

export function CollectionPage() {
  const { category } = useParams()
  const displayTitle = (category || 'Collection').replaceAll('-', ' ')
  const [viewMode, setViewMode] = useState('grid')

  // Get dynamic banner based on category slug
  const currentBanner = categoryBanners[category?.toLowerCase()] || defaultBanner

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      {/* Dynamic Collection Hero with Unique Image Mapping */}
      <div className="relative h-[250px] md:h-[350px] overflow-hidden flex items-center justify-center">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <img 
            key={currentBanner}
            src={currentBanner} 
            alt={displayTitle} 
            className="w-full h-full object-cover brightness-[0.45] transition-all duration-1000"
          />
        </div>
        
        {/* Colorful Shapes Overlay (Parity with Toyove-India aesthetic) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[120%] bg-[#6449A4]/35 rounded-[40%_60%_70%_30%] blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-[#FF4E50]/25 rounded-[60%_40%_30%_70%] blur-3xl" />
        </div>

        <div className="shell relative z-20 text-center">
          <motion.div
            key={displayTitle}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#FF4E50] font-bold text-[11px] md:text-[13px] uppercase tracking-[0.4em] mb-4 drop-shadow-md">
                Discover Premium {linkName(category)}
            </p>
            <h1 className="text-4xl md:text-6xl font-grandstander font-bold text-white leading-tight tracking-tighter capitalize drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {displayTitle}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="shell mt-10 md:mt-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-[11px] text-[#666] mb-8 tracking-[0.2em] font-bold uppercase">
          <Link to="/" className="hover:text-[#FF4E50] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#333]">{displayTitle}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            <div className="space-y-6">
              <h3 className="font-grandstander font-bold text-[18px] text-[#333] border-b-[1.6px] border-dashed border-[#333]/15 pb-2">Availability</h3>
              <div className="space-y-3 font-roboto">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-[#333]/20 appearance-none checked:bg-[#E84949] checked:border-[#E84949] border-2 transition-all relative after:content-['✓'] after:absolute after:text-white after:text-[12px] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100" />
                  <span className="text-[14px] font-medium text-[#666] group-hover:text-[#333] transition-colors">In Stock (12)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-[#333]/20 appearance-none checked:bg-[#E84949] checked:border-[#E84949] border-2 transition-all relative after:content-['✓'] after:absolute after:text-white after:text-[12px] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100" />
                  <span className="text-[14px] font-medium text-[#666] group-hover:text-[#333] transition-colors">Out of Stock (2)</span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-grandstander font-bold text-[18px] text-[#333] border-b-[1.6px] border-dashed border-[#333]/15 pb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] text-[#999] uppercase font-bold tracking-widest mb-1 block">Min</span>
                    <input type="number" placeholder="₹" className="w-full h-11 bg-white border border-[#333]/10 rounded-lg px-4 outline-none focus:border-[#E84949] text-[14px]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-[#999] uppercase font-bold tracking-widest mb-1 block">Max</span>
                    <input type="number" placeholder="₹" className="w-full h-11 bg-white border border-[#333]/10 rounded-lg px-4 outline-none focus:border-[#E84949] text-[14px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden relative group aspect-[4/5] shadow-lg border-[1.6px] border-dashed border-[#333]/10">
              <img src="https://images.unsplash.com/photo-1556012018-50c5c0da73bf?q=80&w=400&auto=format&fit=crop" alt="Promo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6449A4]/90 to-transparent p-6 flex flex-col justify-end text-white">
                <p className="text-[10px] font-bold tracking-[0.2em] mb-2 uppercase text-[#FF4E50]">Seasonal Offers</p>
                <h4 className="font-grandstander text-[20px] font-bold leading-tight">Flash Sale Live!<br/>Special Collection</h4>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
              <div className="flex items-center gap-6">
                <button className="lg:hidden flex items-center gap-2 text-[12px] font-bold text-[#333] bg-white px-4 py-2 rounded-lg border border-[#333]/10 tracking-widest uppercase"><Filter size={16}/> Filters</button>
                <div className="hidden md:flex items-center gap-1">
                  <button onClick={()=>setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#333] text-white' : 'hover:bg-white/50 text-[#666]'}`}><LayoutGrid size={18}/></button>
                  <button onClick={()=>setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#333] text-white' : 'hover:bg-white/50 text-[#666]'}`}><List size={18}/></button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-[12px] font-bold text-[#666] tracking-widest uppercase">Sort:</span>
                <select className="h-10 bg-white border border-[#333]/10 rounded-lg px-4 text-[13px] font-bold text-[#333] outline-none cursor-pointer focus:border-[#E84949]">
                  <option>Alphabetically, A-Z</option>
                  <option>Price, low to high</option>
                  <option>Price, high to low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {mockProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className={`group relative flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row gap-6 bg-[#F9EAD3] p-4 rounded-3xl border-[1.2px] border-dashed border-[#333]/10'}`}
                >
                  <Link to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`} className={`dashed-card relative overflow-hidden flex items-center justify-center bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${viewMode === 'grid' ? 'p-2 aspect-square mb-4' : 'w-48 h-48 p-2 shrink-0'}`}>
                    <span className="absolute top-3 left-3 z-30 bg-[#FF4E50] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Sale</span>
                    <div className="absolute top-3 -right-12 z-40 flex flex-col gap-2 group-hover:right-3 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                      <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><ShoppingCart size={15} /></button>
                      <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Search size={15} /></button>
                      <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Heart size={15} /></button>
                      <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Repeat size={15} /></button>
                    </div>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover rounded-[10px] transition-transform duration-1000 group-hover:scale-110" />
                  </Link>

                  <div className={`${viewMode === 'grid' ? 'text-center' : 'text-left flex flex-col justify-center gap-2'}`}>
                    <Link to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`}>
                      <h3 className="font-grandstander text-[14px] md:text-[17px] font-bold text-[#333] group-hover:text-[#E84949] transition-colors leading-tight tracking-tight capitalize">{p.name}</h3>
                    </Link>
                    <div className={`flex items-center gap-3 ${viewMode === 'grid' ? 'justify-center' : 'justify-start'}`}>
                      <span className="text-[12px] text-gray-400 line-through font-bold">${p.oldPrice.toFixed(2)}</span>
                      <span className="text-[15px] font-bold text-[#FF4E50] font-grandstander tracking-tight">${p.price.toFixed(2)}</span>
                    </div>
                    {viewMode === 'list' && (
                      <p className="text-[14px] text-[#666] line-clamp-3 font-roboto mt-2 max-w-xl italic">Experience the ultimate in quality and fun with our latest addition. Meticulously designed for safety and engagement, this toy is a favorite among parents and kids alike.</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function linkName(slug) {
    if(!slug) return "";
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
