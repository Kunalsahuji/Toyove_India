import { motion } from 'framer-motion'
import { Heart, Search, ShoppingCart, Repeat } from 'lucide-react'

const toy1 = 'https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533'
const toy1_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533'

const toy2 = 'https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533'
const toy2_hover = 'https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533'
const products = [
  { id: 1, name: 'TinyTinker Toys', price: 120, oldPrice: 286, badge: -52, img: toy1, hoverImg: toy1_hover },
  { id: 2, name: 'JoyfulJamboree Juniors', price: 89, oldPrice: 129, badge: -41, img: toy2, hoverImg: toy2_hover },
  { id: 3, name: 'Planet Toy Explorer', price: 126, oldPrice: 168, badge: -35, img: toy1, hoverImg: toy1_hover },
  { id: 4, name: 'WildHarvests Maker Toy', price: 150, oldPrice: 200, badge: -25, img: toy2, hoverImg: toy2_hover },
  { id: 5, name: 'Rainbow Stacker Set', price: 85, oldPrice: 110, badge: -22, img: toy1, hoverImg: toy1_hover },
  { id: 6, name: 'Creative Rainbow Stacker Toy', price: 45, oldPrice: 65, badge: -30, img: toy2, hoverImg: toy2_hover },
  { id: 7, name: 'Baby Activity Gym Play Mat', price: 130, oldPrice: 175, badge: -25, img: toy1, hoverImg: toy1_hover },
  { id: 8, name: 'Plush Rabbit Sleeping Soft Toy', price: 35, oldPrice: 50, badge: -30, img: toy2, hoverImg: toy2_hover },
]

export function TrendingProducts() {
  return (
    <section className="py-10 md:py-14 bg-brand-cream">
      <div className="shell">
        <div className="text-center mb-10">
          <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Shop Collection</p>
          <h2 className="font-serif text-[28px] md:text-[40px] font-bold text-brand-ink tracking-tight">Trending Products</h2>
        </div>

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
                <h3 className="font-playful text-[13px] md:text-[15px] font-bold text-[#2A2A2A] mb-1.5 line-clamp-2 leading-[1.3] group-hover:text-[#E32C2B] transition-colors duration-300">
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
        </div>
      </div>
    </section>
  )
}
