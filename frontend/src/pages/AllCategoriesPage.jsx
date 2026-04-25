import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, LayoutGrid, Filter, Tag, Zap, Heart, Star } from 'lucide-react'
import { ProductCard } from '../components/ui/ProductCard'

const categories = [
  { 
    id: 'boy-fashion', 
    name: 'BOY FASHION', 
    banner: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/19629172a.webp',
    sections: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Sets & Suits', 'T-Shirts', 'Shorts', 'Onesies', 'Nightwear', 'Jeans & Trousers', 'Ethnic Wear', 'Party Wear', 'Shirts', 'Innerwear'] 
      },
      { 
        title: 'SHOP BY COLLECTION', 
        items: ['Bestsellers', 'Multi-packs', 'Swimming Essentials', 'Baby Essentials'] 
      },
      { 
        title: 'FASHION ACCESSORIES', 
        items: ['Sunglasses', 'Watches', 'Smart Watches', 'Ties', 'Bags'] 
      },
      { 
        title: 'SHOP BY AGE', 
        items: ['0-3 Months', '3-6 Months', '2-4 Years', '4-6 Years', '8+ Years'] 
      }
    ],
    products: [
      { id: 101, name: 'Mark & Mia Striped Polo T-Shirt & Shorts Set', price: 704, oldPrice: 849, img: 'https://cdn.fcglcdn.com/brainbees/images/products/438x531/16900445a.webp', brand: 'Mark & Mia', rating: 4.5 },
      { id: 102, name: 'CUCUMBER Dino Print T-Shirt & Shorts Set', price: 427, oldPrice: 470, img: 'https://cdn.fcglcdn.com/brainbees/images/products/438x531/1700445a.webp', brand: 'CUCUMBER', rating: 4.3 },
      { id: 103, name: 'Simply Animal Print Bloomers (Pack of 3)', price: 204, oldPrice: 225, img: 'https://cdn.fcglcdn.com/brainbees/images/products/438x531/1654445a.webp', brand: 'Simply', rating: 4.7 }
    ]
  },
  { 
    id: 'girl-fashion', 
    name: 'GIRL FASHION', 
    banner: 'https://images.pexels.com/photos/32328596/pexels-photo-32328596.jpeg',
    sections: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Frocks & Dresses', 'Sets & Suits', 'Tops & T-shirts', 'Shorts & Skirts', 'Jumpsuits & Dungarees', 'Pajamas & Leggings', 'Ethnic Wear', 'Party Wear'] 
      },
      { 
        title: 'FASHION ACCESSORIES', 
        items: ['Hair Bands', 'Hair Clips', 'Jewellery', 'Sunglasses', 'Bags'] 
      }
    ],
    products: [
      { id: 201, name: 'Babyhug Floral Cotton Dress', price: 599, oldPrice: 899, img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=400&auto=format&fit=crop', brand: 'Babyhug', rating: 4.6 }
    ]
  },
  { 
    id: 'toys', 
    name: 'TOYS', 
    banner: 'https://images.pexels.com/photos/27660140/pexels-photo-27660140.jpeg',
    sections: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Musical Toys', 'Learning & Educational', 'Soft Toys', 'Indoor & Outdoor Play', 'Blocks & Construction', 'Puzzles'] 
      },
      { 
        title: 'RIDE-ONS & SCOOTERS', 
        items: ['Battery Operated', 'Manual Push', 'Scooters', 'Tricycles', 'Bicycles'] 
      }
    ],
    products: [
      { id: 301, name: 'Babyhug Premium Reversible Play Mat', price: 1999, oldPrice: 2499, img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=400&auto=format&fit=crop', brand: 'Babyhug', rating: 4.3 }
    ]
  },
  { 
    id: 'diapering', 
    name: 'DIAPERING', 
    banner: 'https://images.pexels.com/photos/32139255/pexels-photo-32139255.jpeg',
    sections: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Diaper Pants', 'Taped Diapers', 'Wipes', 'Cloth Nappies', 'Bed Protectors', 'Diaper Bags', 'Potty Chairs & Seats'] 
      },
      { 
        title: 'BABY DIAPER BY SIZE', 
        items: ['NB/XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'] 
      }
    ],
    products: [
      { id: 401, name: 'Babyhug Advanced Pant Style Diapers (Large, 128 pcs)', price: 2579, oldPrice: 3200, img: 'https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=400&auto=format&fit=crop', brand: 'Babyhug', rating: 4.5 }
    ]
  },
  { id: 'footwear', name: 'FOOTWEAR', banner: 'https://images.pexels.com/photos/37052023/pexels-photo-37052023.jpeg', sections: [] },
  { id: 'gear', name: 'GEAR', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/11506302a.webp', sections: [] },
  { id: 'feeding', name: 'FEEDING', banner: 'https://images.pexels.com/photos/36214982/pexels-photo-36214982.jpeg', sections: [] },
  { id: 'bath', name: 'BATH', banner: 'https://images.pexels.com/photos/35979966/pexels-photo-35979966.jpeg', sections: [] },
  { id: 'nursery', name: 'NURSERY', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/20139636a.webp', sections: [] },
  { id: 'moms', name: 'MOMS', banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/22333906a.webp', sections: [] },
  { id: 'health', name: 'HEALTH & SAFETY', banner: 'https://images.pexels.com/photos/31212340/pexels-photo-31212340.jpeg', sections: [] },
  { id: 'boutiques', name: 'BOUTIQUES', banner: 'https://images.pexels.com/photos/15170532/pexels-photo-15170532.jpeg', sections: [] },
]

export function AllCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-grandstander overflow-hidden">
      {/* Playful Header Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#E84949]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="shell relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-8 py-2 bg-yellow-400 rounded-full text-[#333] text-[12px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border-2 border-white"
          >
            Directory Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#333] mb-8 tracking-tighter"
          >
            Explore <span className="text-[#E84949]">Everything</span>
          </motion.h1>
          
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-[#E84949]/10 rounded-[30px] blur-xl group-focus-within:blur-2xl transition-all"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#333]/30" size={24} />
              <input 
                type="text" 
                placeholder="What are you looking for today?"
                className="w-full h-16 md:h-20 bg-white border-4 border-white rounded-[30px] px-16 text-[18px] text-[#333] placeholder:text-[#333]/20 outline-none focus:border-[#E84949] transition-all shadow-xl font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 h-12 px-8 bg-[#333] text-white rounded-2xl font-bold hover:bg-[#E84949] transition-all shadow-lg active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="shell pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticker-Style Sidebar */}
          <aside className="w-full lg:w-85 shrink-0">
            <div className="bg-[#F9EAD3] p-4 rounded-[40px] border-4 border-white shadow-xl sticky top-24">
              <div className="px-6 py-6 border-b-4 border-dashed border-white mb-4">
                <h3 className="text-2xl font-black text-[#333] tracking-tight">Categories</h3>
              </div>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCategories.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl transition-all border-2 ${
                      activeCategory.id === cat.id 
                        ? 'bg-[#E84949] text-white border-transparent shadow-lg shadow-[#E84949]/30' 
                        : 'bg-white text-[#333] border-white hover:border-[#E84949]/20 shadow-md'
                    }`}
                  >
                    <span className="font-bold text-[15px] uppercase tracking-wider">{cat.name}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeCategory.id === cat.id ? 'bg-white text-[#E84949]' : 'bg-[#FDF4E6] text-[#333]/20'
                    }`}>
                      <ChevronRight size={16} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Magical Content Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, type: 'spring', damping: 20 }}
                className="space-y-12"
              >
                {/* Hero Banner with Curvy Mask */}
                <div className="relative h-[300px] md:h-[450px] rounded-[50px] overflow-hidden shadow-2xl border-[10px] border-white group">
                  <img 
                    src={activeCategory.banner} 
                    alt={activeCategory.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-10 md:p-16">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="inline-block px-4 py-1 bg-yellow-400 text-[#333] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">
                        Premium Store
                      </span>
                      <h2 className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tighter leading-none mb-2">
                        {activeCategory.name}
                      </h2>
                      <p className="text-white/80 text-[16px] font-medium max-w-lg leading-relaxed">
                        Explore our curated selection of high-quality products designed specifically for your little ones.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Grid of Sections - Sticker Board Aesthetic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeCategory.sections?.map((section, sidx) => (
                    <motion.div 
                      key={sidx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * sidx }}
                      className="bg-white p-10 rounded-[45px] shadow-xl border-4 border-dashed border-[#F9EAD3] hover:border-[#E84949]/30 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-[#FDF4E6] rounded-2xl flex items-center justify-center text-[#E84949] group-hover:rotate-12 transition-transform shadow-inner">
                          <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-[#333] tracking-tight">{section.title}</h3>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        {section.items.map(item => (
                          <li key={item}>
                            <Link 
                              to={`/collections/${item.toLowerCase().replaceAll(' ', '-')}`}
                              className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF4E6]/50 hover:bg-[#E84949] text-[#666] hover:text-white transition-all font-bold group/item"
                            >
                              <div className="w-2 h-2 rounded-full bg-[#E84949] group-hover/item:bg-white"></div>
                              <span className="text-[14px] uppercase tracking-wide">{item}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Featured Products Showcase */}
                {activeCategory.products && activeCategory.products.length > 0 && (
                  <div className="bg-[#333] p-12 rounded-[60px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#E84949]/20 rounded-full blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                          Weekly <span className="text-[#E84949]">Trending</span>
                        </h2>
                        <p className="text-white/50 font-bold uppercase tracking-widest text-[12px]">Top picks from this category</p>
                      </div>
                      <Link to={`/collections/${activeCategory.id}`} className="px-8 py-4 bg-white text-[#333] rounded-2xl font-black uppercase tracking-widest text-[12px] hover:bg-[#E84949] hover:text-white transition-all shadow-xl active:scale-95">
                        Shop All Products
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
                      {activeCategory.products.map((p, i) => (
                        <div key={p.id} className="bg-white rounded-[40px] p-2 shadow-xl hover:-translate-y-2 transition-transform duration-500">
                          <ProductCard p={p} i={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
