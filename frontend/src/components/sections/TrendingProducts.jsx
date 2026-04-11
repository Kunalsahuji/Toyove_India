import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const products = [
  { id: 1, name: 'FlipTinker Toys', price: 120, oldPrice: 200, badge: -40, img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'ZepLifetimeline Junctions', price: 89, oldPrice: 349, badge: -74, img: 'https://images.unsplash.com/photo-1620608639234-984210437435?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'LittleSaint Legends Cars', price: 126, oldPrice: 194, badge: -35, img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'WildHarvests Maker Toy', price: 100, oldPrice: 154, badge: -35, img: 'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=400' },
]

export function TrendingProducts() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        {/* Section Label */}
        <div className="text-center mb-10">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Shop Collection</p>
          <h2 className="font-serif text-[28px] md:text-[40px] font-bold text-brand-ink">Trending Products</h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="dashed-card card-3d group relative overflow-hidden cursor-pointer"
            >
              {/* Badge */}
              <span className="absolute top-3 left-3 z-10 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                {p.badge}%
              </span>
              {/* Wishlist */}
              <button className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <Heart className="h-4 w-4 text-brand-red" />
              </button>

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-xl">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-brand-ink mb-2 line-clamp-2">{p.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-brand-muted line-through">${p.oldPrice.toFixed(2)} USD</span>
                  <span className="text-[14px] font-bold text-brand-ink">${p.price.toFixed(2)} USD</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
