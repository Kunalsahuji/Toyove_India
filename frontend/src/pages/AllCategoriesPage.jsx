import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, LayoutGrid, Filter, Tag, Zap, Heart, Star } from 'lucide-react'
import { ProductCard } from '../components/ui/ProductCard'

const categories = [
  { 
    id: 'boy-fashion', 
    name: 'BOY FASHION', 
    banner: 'https://cdn.fcglcdn.com/brainbees/images/cattemplate/370_270_summer2_rhs_banner_boy_fashion_170426.webp',
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
    banner: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop',
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
    banner: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=600&auto=format&fit=crop',
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
    banner: 'https://images.unsplash.com/photo-1555008882-d4000a6e0df3?q=80&w=600&auto=format&fit=crop',
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
  { id: 'footwear', name: 'FOOTWEAR', banner: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'gear', name: 'GEAR', banner: 'https://images.unsplash.com/photo-1594913785162-e6786b42dea3?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'feeding', name: 'FEEDING', banner: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'bath', name: 'BATH', banner: 'https://images.unsplash.com/photo-1559591937-e6205809867c?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'nursery', name: 'NURSERY', banner: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'moms', name: 'MOMS', banner: 'https://images.unsplash.com/photo-1531198341253-1f49a365ffed?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'health', name: 'HEALTH & SAFETY', banner: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop', sections: [] },
  { id: 'boutiques', name: 'BOUTIQUES', banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop', sections: [] },
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
    <div className="bg-[#FDF4E6] min-h-screen">
      {/* Header Section */}
      <div className="bg-[#E84949] text-white py-12">
        <div className="shell">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-grandstander font-bold text-center mb-6"
          >
            All Categories Directory
          </motion.h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
            <input 
              type="text" 
              placeholder="Search for categories, brands, or products..."
              className="w-full h-14 bg-white/20 border-2 border-white/30 rounded-2xl px-12 text-white placeholder:text-white/60 outline-none focus:bg-white/30 focus:border-white transition-all font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="shell py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24 border-2 border-dashed border-[#333]/10">
              <div className="p-6 bg-[#333] text-white font-grandstander font-bold text-lg uppercase tracking-widest">
                Main Categories
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {filteredCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-6 py-4 border-b border-gray-50 transition-all font-bold text-[13px] uppercase tracking-wider ${
                      activeCategory.id === cat.id 
                        ? 'bg-[#FDF4E6] text-[#E84949] pl-8' 
                        : 'text-[#333] hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight size={16} className={activeCategory.id === cat.id ? 'opacity-100' : 'opacity-20'} />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Category Banner */}
                <div className="relative h-[250px] md:h-[350px] rounded-[40px] overflow-hidden shadow-2xl group border-4 border-white">
                  <img 
                    src={activeCategory.banner} 
                    alt={activeCategory.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <span className="text-[#E84949] font-black uppercase tracking-[0.4em] text-[12px] mb-2">Collection 2026</span>
                    <h2 className="text-white text-4xl md:text-6xl font-grandstander font-bold drop-shadow-xl">
                      {activeCategory.name}
                    </h2>
                  </div>
                </div>

                {/* Subcategory Grid */}
                <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 border-2 border-dashed border-[#333]/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                    {activeCategory.sections?.map((section, sidx) => (
                      <div key={sidx} className="space-y-6">
                        <h3 className="font-grandstander font-black text-[18px] text-[#333] border-b-2 border-dashed border-[#E84949]/20 pb-3 flex items-center gap-3">
                          <Zap className="text-[#E84949]" size={20} />
                          {section.title}
                        </h3>
                        <ul className="grid grid-cols-1 gap-3">
                          {section.items.map(item => (
                            <li key={item}>
                              <Link 
                                to={`/collections/${item.toLowerCase().replaceAll(' ', '-')}`}
                                className="group flex items-center gap-3 text-[14px] font-bold text-[#666] hover:text-[#E84949] transition-all"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#E84949] group-hover:scale-125 transition-all"></span>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {(!activeCategory.sections || activeCategory.sections.length === 0) && (
                      <div className="col-span-full py-12 text-center">
                        <p className="text-gray-400 font-bold italic">No subcategories listed for this section yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trending Products in this Category */}
                {activeCategory.products && activeCategory.products.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl md:text-3xl font-grandstander font-bold text-[#333] flex items-center gap-4">
                        <Star className="text-yellow-500 fill-yellow-500" />
                        Trending in {activeCategory.name}
                      </h2>
                      <Link to={`/collections/${activeCategory.id}`} className="text-[#E84949] font-bold uppercase tracking-widest text-[12px] hover:underline">View All Products</Link>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                      {activeCategory.products.map((p, i) => (
                        <ProductCard key={p.id} p={p} i={i} />
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
