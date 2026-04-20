import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const categories = [
  { label: 'Soft Toys', img: 'https://plus.unsplash.com/premium_vector-1732761041055-b5cd5b4a82b7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Puzzle Game', img: 'https://plus.unsplash.com/premium_vector-1727264696290-c2dd2d226378?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Outdoor Toys', img: 'https://images.unsplash.com/vector-1774596267025-f6aecd37a689?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Medical Toys', img: 'https://plus.unsplash.com/premium_vector-1770403124887-26326dc77452?q=80&w=1151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Kids Fashion', img: 'https://plus.unsplash.com/premium_vector-1728402578566-5532c28d45a1?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
]

const marqueeItems = [
  'Up to 30% Off Everything', '⭐ Get a $50 Gift Card on purchase of $500+',
  '✈️ Lenny Toy Store Delivers For A Tablet $1 Free Only',
  '🎁 Get Free Delivery On Eligible Orders Over $100',
  '🚀 Try A New Toy — Your Kids Will Love It',
]

export function CategorySection() {
  return (
    <div className="bg-brand-cream overflow-hidden">
      <section className="pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="shell">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-10 pt-4 pb-8 md:pt-6 md:pb-12">
            {categories.map((cat, i) => {
              const isStaggered = i % 2 !== 0; 
              
              return (
                <Link 
                  key={i}
                  to={`/collections/${cat.label.toLowerCase().replaceAll(' ', '-')}`}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      y: isStaggered ? 12 : -15, 
                      rotate: i % 2 === 0 ? 2 : -2,
                      scale: 1.05,
                      transition: { type: 'spring', stiffness: 400, damping: 15 }
                    }}
                    className={`dashed-card bg-[#F7EBD5] p-3.5 md:p-5 cursor-pointer w-full flex flex-col items-center shadow-sm group-hover:shadow-2xl transition-all duration-300 ${
                      isStaggered ? 'md:mt-10 lg:mt-16' : 'mt-0'
                    }`}
                  >
                    <div className="w-full aspect-square overflow-hidden rounded-xl bg-white mb-5 md:mb-6 shadow-inner border border-brand-ink/5">
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                    
                    <span className="text-[14px] md:text-[18px] font-bold text-brand-ink text-center mb-1.5 font-grandstander tracking-tight pb-1 group-hover:text-[#E84949] transition-colors">
                      {cat.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-brand-orange py-3 md:py-4 overflow-hidden flex items-center border-y border-white/10 shadow-lg relative z-20">
        <div className="marquee-inner flex whitespace-nowrap gap-12 md:gap-16 items-center">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-bold text-[11px] md:text-[13px] tracking-wide flex items-center gap-3 shrink-0 uppercase">
              <span className="text-[14px]">✦</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
