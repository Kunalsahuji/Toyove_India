import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import first from '../../assets/first.png'
import second from '../../assets/second.png'
import third from '../../assets/third.png'

import fourth from '../../assets/fourth.png'

// Using exact products from the user's reference screenshot + 4 more to make 8
const products = [
  { id: 1, name: 'Shape Sorting Cube Classic Toy', price: 60, oldPrice: 100, badge: -40, img: first },
  { id: 2, name: 'Hammer Ball Knock Pounding Bench', price: 120, oldPrice: 180, badge: -33, img: second },
  { id: 3, name: 'Green Plush Stuffed Dinosaur Soft Toy', price: 59, oldPrice: 99, badge: -40, img: third },
  { id: 4, name: 'Fisher Price Chatter Telephone', price: 150, oldPrice: 200, badge: -25, img: fourth },
  { id: 5, name: 'Classic Wooden Tool Box Set', price: 85, oldPrice: 110, badge: -22, img: fourth },
  { id: 6, name: 'Creative Rainbow Stacker Toy', price: 45, oldPrice: 65, badge: -30, img: third },
  { id: 7, name: 'Baby Activity Gym Play Mat', price: 130, oldPrice: 175, badge: -25, img: second },
  { id: 8, name: 'Plush Rabbit Sleeping Soft Toy', price: 35, oldPrice: 50, badge: -30, img: first },
]

export function TrendingProducts() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        {/* Section Label */}
        <div className="text-center mb-10">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Shop Collection</p>
          <h2 className="font-serif text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Trending Products</h2>
        </div>

        {/* Product Grid - 8 Items */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 gap-y-10 md:gap-y-12">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Image box with dashed border and requested background color */}
              <div className="dashed-card bg-[#F7EBD5] p-4 relative overflow-hidden flex items-center justify-center aspect-[4/3.5] md:aspect-[4/3.2] mb-4 shadow-sm hover:shadow-md transition-shadow">

                {/* Badge (Black background with white text per reference) */}
                <span className="absolute top-4 left-4 z-10 bg-brand-red text-white text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
                  {p.badge}%
                </span>
                {/* Wishlist */}
                <button className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Heart className="h-4 w-4 text-brand-red" />
                </button>
                {/* Product Image */}
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
                  <span className="text-[12px] md:text-[13px] font-bold text-[#444444] text-brand-purple">
                    ${p.price.toFixed(2)} USD
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
