import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const tabs = ['Featured', 'Arrival', 'Trending']

const products = {
  Featured: [
    { id: 1, name: 'TotTrays Toys', price: 120, oldPrice: 286, badge: -35, img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'KidArena Creations', price: 89, oldPrice: 129, badge: -41, img: 'https://images.unsplash.com/photo-1620608639234-984210437435?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'LivingLittles Lineup Doll', price: 126, oldPrice: 168, badge: -35, img: 'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'WildHarvests Maker Toy', price: 100, oldPrice: 145, badge: -30, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
  ],
  Arrival: [
    { id: 5, name: 'Rainbow Stacker Set', price: 55, oldPrice: 80, badge: -31, img: 'https://images.unsplash.com/photo-1510006780316-2942618fca8c?auto=format&fit=crop&q=80&w=400' },
    { id: 6, name: 'Wooden Car Fleet', price: 74, oldPrice: 110, badge: -33, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
    { id: 7, name: 'Soft Bear Companion', price: 38, oldPrice: 52, badge: -27, img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=400' },
    { id: 8, name: 'Musical Drum Kit Jr.', price: 95, oldPrice: 130, badge: -27, img: 'https://images.unsplash.com/photo-1620608639234-984210437435?auto=format&fit=crop&q=80&w=400' },
  ],
  Trending: [
    { id: 9, name: 'Dino Puzzle Master', price: 42, oldPrice: 68, badge: -38, img: 'https://images.unsplash.com/photo-1460518451285-cd9bf4099b04?auto=format&fit=crop&q=80&w=400' },
    { id: 10, name: 'Baby Sensory Kit', price: 67, oldPrice: 95, badge: -29, img: 'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=400' },
    { id: 11, name: 'Color Mix Art Set', price: 30, oldPrice: 45, badge: -33, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
    { id: 12, name: 'Planet Explorer Toy', price: 110, oldPrice: 150, badge: -27, img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=400' },
  ],
}

export function SpecialProducts() {
  const [activeTab, setActiveTab] = useState('Featured')

  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Shop Collection</p>
          <h2 className="font-serif text-[28px] md:text-[40px] font-bold text-brand-ink">Special Products</h2>
          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-8 px-5 rounded-full text-[12px] font-bold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-brand-orange text-white'
                    : 'border border-brand-muted text-brand-muted hover:border-brand-purple hover:text-brand-purple'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
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
              className="dashed-card card-3d group relative cursor-pointer"
            >
              <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">{p.badge}%</span>
              <button className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <Heart className="h-4 w-4 text-brand-red" />
              </button>
              <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-xl">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-brand-ink mb-2">{p.name}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-brand-muted line-through">${p.oldPrice.toFixed(2)} USD</span>
                  <span className="text-[14px] font-bold text-brand-ink">${p.price.toFixed(2)} USD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
