import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '../ui/ProductCard'

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
    <section className="pt-4 pb-4 md:pt-6 md:pb-8 bg-brand-cream border-t border-dashed border-gray-200">
      <div className="shell">
        <div className="text-center mb-8">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] mb-2 font-roboto uppercase">Shop Collection</p>
          <h2 className="font-grandstander text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Special Products</h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab);
                }}
                className={`h-9 px-6 rounded-md text-[13px] font-bold transition-all duration-200 shadow-md font-grandstander ${activeTab === tab
                    ? 'bg-[#F1641E] text-white border border-[#F1641E]'
                    : 'bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-[#6651A4] hover:border-[#6651A4]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[600px] md:min-h-[800px] lg:min-h-[1000px] bg-red-500">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {products[activeTab].map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
