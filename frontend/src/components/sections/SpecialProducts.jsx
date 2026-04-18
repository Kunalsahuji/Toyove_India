import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Search, ShoppingCart, Repeat } from 'lucide-react'

const toy1 = 'https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533'
const toy1_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533'

const toy2 = 'https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533'
const toy2_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533'
const tabs = ['Featured', 'Arrival', 'Trending']

const products = {
  Featured: [
    { id: 1, name: 'TinyTinker Toys', price: 120, oldPrice: 286, badge: -52, img: toy1, hoverImg: toy1_hover },
    { id: 2, name: 'JoyfulJamboree Juniors', price: 89, oldPrice: 129, badge: -41, img: toy2, hoverImg: toy2_hover },
    { id: 3, name: 'Planet Toy Explorer', price: 126, oldPrice: 168, badge: -35, img: toy1, hoverImg: toy1_hover },
    { id: 4, name: 'WildHarvests Maker Toy', price: 100, oldPrice: 145, badge: -30, img: toy2, hoverImg: toy2_hover },
  ],
  Arrival: [
    { id: 5, name: 'Rainbow Stacker Set', price: 55, oldPrice: 80, badge: -31, img: toy2, hoverImg: toy2_hover },
    { id: 6, name: 'Wooden Car Fleet', price: 74, oldPrice: 110, badge: -33, img: toy1, hoverImg: toy1_hover },
    { id: 7, name: 'Soft Bear Companion', price: 38, oldPrice: 52, badge: -27, img: toy2, hoverImg: toy2_hover },
    { id: 8, name: 'Musical Drum Kit Jr.', price: 95, oldPrice: 130, badge: -27, img: toy1, hoverImg: toy1_hover },
  ],
  Trending: [
    { id: 9, name: 'Dino Puzzle Master', price: 42, oldPrice: 68, badge: -38, img: toy1, hoverImg: toy1_hover },
    { id: 10, name: 'Baby Sensory Kit', price: 67, oldPrice: 95, badge: -29, img: toy2, hoverImg: toy2_hover },
    { id: 11, name: 'Color Mix Art Set', price: 30, oldPrice: 45, badge: -33, img: toy1, hoverImg: toy1_hover },
    { id: 12, name: 'Planet Explorer Toy', price: 110, oldPrice: 150, badge: -27, img: toy2, hoverImg: toy2_hover },
  ],
}

export function SpecialProducts() {
  const [activeTab, setActiveTab] = useState('Featured')

  return (
    <section className="pt-4 pb-4 md:pt-6 md:pb-8 bg-brand-cream">
      <div className="shell">
        <div className="text-center mb-8">
          <p className="text-brand-orange font-medium text-[11px] tracking-[0.25em] mb-2 font-roboto uppercase">Shop Collection</p>
          <h2 className="font-grandstander text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Special Products</h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-9 px-6 rounded-md text-[13px] font-bold transition-all duration-200 shadow-md font-grandstander ${activeTab === tab
                    ? 'bg-[#F1641E] text-white border border-[#F1641E]'
                    : 'bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-brand-purple hover:border-brand-purple'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[250px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products[activeTab].map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative cursor-pointer flex flex-col transition-all duration-300"
              >
                <div className="dashed-card p-2 relative overflow-hidden flex items-center justify-center aspect-square mb-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                  {/* Promo Badge */}
                  <span className="absolute top-3 left-3 z-30 bg-[#FF4E50] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {p.badge}%
                  </span>

                  <div className="absolute top-3 -right-12 z-30 flex flex-col gap-2 group-hover:right-3 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover:opacity-100 delay-100">
                    <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF4E50] hover:text-white text-[#222] transition-colors border border-transparent hover:border-[#FF4E50]">
                      <ShoppingCart size={15} strokeWidth={2} />
                    </button>
                    <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF4E50] hover:text-white text-[#222] transition-colors border border-transparent hover:border-[#FF4E50]">
                      <Search size={15} strokeWidth={2} />
                    </button>
                    <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF4E50] hover:text-white text-[#222] transition-colors border border-transparent hover:border-[#FF4E50]">
                      <Heart size={15} strokeWidth={2} />
                    </button>
                    <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#FF4E50] hover:text-white text-[#222] transition-colors border border-transparent hover:border-[#FF4E50]">
                      <Repeat size={15} strokeWidth={2} />
                    </button>
                  </div>

                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 absolute inset-0 z-20 rounded-[8px]"
                  />
                  <img
                    src={p.hoverImg}
                    alt={p.name}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out z-10 rounded-[8px]"
                  />
                </div>

                <div className="text-center px-1">
                  <h3 className="font-grandstander text-[13px] md:text-[15px] font-bold text-[#2A2A2A] mb-1.5 line-clamp-2 leading-[1.3] group-hover:text-[#E32C2B] transition-colors duration-300">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[12px] md:text-[13px] text-[#888888] line-through font-medium">
                      ${p.oldPrice.toFixed(2)}
                    </span>
                    <span className="text-[13px] md:text-[14px] font-bold text-[#FF4E50]">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
