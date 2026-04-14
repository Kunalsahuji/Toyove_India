import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import first from '../../assets/first.png'
import second from '../../assets/second.png'
import third from '../../assets/third.png'
import fourth from '../../assets/fourth.png'
import car from '../../assets/car.png'
import doremon from '../../assets/doremon.png'
import fish from '../../assets/fish.png'
import fog from '../../assets/fog.png'
const tabs = ['Featured', 'Arrival', 'Trending']

// Using safe Unsplash IDs from parity checks
const products = {
  Featured: [
    { id: 1, name: 'TotTrays Toys', price: 120, oldPrice: 286, badge: -35, img: first },
    { id: 2, name: 'KidArena Creations', price: 89, oldPrice: 129, badge: -41, img: second},
    { id: 3, name: 'Living Littles Lineup Doll', price: 126, oldPrice: 168, badge: -35, img: third},
    { id: 4, name: 'WildHarvests Maker Toy', price: 100, oldPrice: 145, badge: -30, img: fourth },
  ],
  Arrival: [
    { id: 5, name: 'Rainbow Stacker Set', price: 55, oldPrice: 80, badge: -31, img: car },
    { id: 6, name: 'Wooden Car Fleet', price: 74, oldPrice: 110, badge: -33, img: fog },
    { id: 7, name: 'Soft Bear Companion', price: 38, oldPrice: 52, badge: -27, img: fish },
    { id: 8, name: 'Musical Drum Kit Jr.', price: 95, oldPrice: 130, badge: -27, img: doremon },
  ],
  Trending: [
    { id: 9, name: 'Dino Puzzle Master', price: 42, oldPrice: 68, badge: -38, img: second },
    { id: 10, name: 'Baby Sensory Kit', price: 67, oldPrice: 95, badge: -29, img: first },
    { id: 11, name: 'Color Mix Art Set', price: 30, oldPrice: 45, badge: -33, img: third },
    { id: 12, name: 'Planet Explorer Toy', price: 110, oldPrice: 150, badge: -27, img: fourth },
  ],
}

export function SpecialProducts() {
  const [activeTab, setActiveTab] = useState('Featured')

  return (
    // reduce padding form top and bottom for desktop 
    <section className="pt-14 pb-4 md:pt-20 md:pb-8 bg-brand-cream">
      <div className="shell">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Shop Collection</p>
          <h2 className="font-serif text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Special Products</h2>
          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`h-9 px-6 rounded-md text-[13px] font-bold transition-all duration-200 shadow-md ${activeTab === tab
                    ? 'bg-[#F1641E] text-white border border-[#F1641E]'
                    : 'bg-[#1A1A1A] text-white border border-[#1A1A1A] hover:bg-brand-purple hover:border-brand-purple'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
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
                {/* Image box with dashed border and requested background color */}
                <div className="dashed-card bg-[#F7EBD5] p-4 relative overflow-hidden flex items-center justify-center aspect-[4/3.5] md:aspect-[4/3.2] mb-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* Badge */}
                  <span className="absolute top-4 left-4 z-10 bg-brand-red text-white text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
                    {p.badge}%
                  </span>
                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Heart className="h-4 w-4 text-brand-red" />
                  </button>

                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Text Details (Outside the dashed box, centered) */}
                <div className="text-center px-1">
                  <h3 className="font-playful text-[13px] md:text-[15px] font-bold text-[#2A2A2A] mb-1.5 line-clamp-2 leading-[1.3] tracking-tight">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] md:text-[12px] text-[#888888] line-through font-medium">
                      ${p.oldPrice.toFixed(2)} USD
                    </span>
                    <span className="text-[12px] md:text-[13px] font-bold text-brand-purple">
                      ${p.price.toFixed(2)} USD
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
