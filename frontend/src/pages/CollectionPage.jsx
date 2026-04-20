import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutGrid, List, Filter } from 'lucide-react'
import { categoryBanners, defaultBanner } from '../utils/navigationData'
import { ProductCard } from '../components/ui/ProductCard'

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

  const currentBanner = categoryBanners[category?.toLowerCase()] || defaultBanner

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      {/* Dynamic Collection Hero */}
      <div className="relative h-[250px] md:h-[350px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={currentBanner} alt={displayTitle} className="w-full h-full object-cover brightness-[0.45]" />
        </div>
        <div className="shell relative z-20 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#E84949] font-bold text-[11px] md:text-[13px] uppercase tracking-[0.4em] mb-4">Discover Premium {linkName(category)}</p>
            <h1 className="text-4xl md:text-6xl font-grandstander font-bold tracking-tighter capitalize drop-shadow-lg">{displayTitle}</h1>
          </motion.div>
        </div>
      </div>

      <div className="shell mt-10 md:mt-16">
        <nav className="flex items-center gap-2 text-[10px] md:text-[11px] text-[#666] mb-8 tracking-[0.2em] font-bold uppercase">
          <Link to="/" className="hover:text-[#E84949] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#333]">{displayTitle}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
             {/* Availability Filter */}
             <div className="space-y-6">
              <h3 className="font-grandstander font-bold text-[18px] text-[#333] border-b-[1.6px] border-dashed border-[#333]/15 pb-2">Availability</h3>
              <div className="space-y-3">
                {['In Stock (12)', 'Out of Stock (2)'].map((label, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-[#333]/20 appearance-none checked:bg-[#E84949] checked:border-[#E84949] border-2" />
                    <span className="text-[14px] font-medium text-[#666] group-hover:text-[#333]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-6">
              <h3 className="font-grandstander font-bold text-[18px] text-[#333] border-b-[1.6px] border-dashed border-[#333]/15 pb-2">Price Range</h3>
              <div className="flex gap-3">
                <input type="number" placeholder="Min" className="w-full h-11 bg-white border border-[#333]/10 rounded-lg px-4 text-[14px]" />
                <input type="number" placeholder="Max" className="w-full h-11 bg-white border border-[#333]/10 rounded-lg px-4 text-[14px]" />
              </div>
            </div>

            {/* Promo Banner */}
            <div className="rounded-3xl overflow-hidden relative group aspect-[4/5] shadow-lg border-[1.6px] border-dashed border-[#333]/10">
              <img src="https://images.unsplash.com/photo-1556012018-50c5c0da73bf?q=80&w=400&auto=format&fit=crop" alt="Promo" className="w-full h-full object-cover group-hover:scale-110 transition-duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E84949]/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h4 className="font-grandstander text-[20px] font-bold">Special Collection</h4>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <button className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#333] text-white' : 'text-[#666]'}`} onClick={() => setViewMode('grid')}><LayoutGrid size={18}/></button>
                <button className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#333] text-white' : 'text-[#666]'}`} onClick={() => setViewMode('list')}><List size={18}/></button>
              </div>
              <select className="h-10 bg-white border border-[#333]/10 rounded-lg px-4 text-[13px] font-bold text-[#333] outline-none">
                <option>Newest Arrivals</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-x-6 gap-y-10 ${viewMode === 'grid' ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {mockProducts.map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} />
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
