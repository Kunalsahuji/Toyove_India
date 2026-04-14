import { motion } from 'framer-motion'

const categories = [
  { label: 'Soft Toys', img: 'https://plus.unsplash.com/premium_vector-1732761041055-b5cd5b4a82b7?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Puzzle Game', img: 'https://plus.unsplash.com/premium_vector-1727264696290-c2dd2d226378?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Outdoor Toys', img: 'https://images.unsplash.com/vector-1774596267025-f6aecd37a689?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Medical Toys', img: 'https://plus.unsplash.com/premium_vector-1770403124887-26326dc77452?q=80&w=1151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { label: 'Kids Fashion', img: 'https://plus.unsplash.com/premium_vector-1728402578566-5532c28d45a1?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
]

const marqueeItems = [
  '🔥 UP TO 30% OFF', '⭐ GET A $50 GIFT CARD ON A PURCHASE OF $500+',
  '✈️ LENNY TOY STORE DELIVERS FOR A TABLET $1 FREE ONLY',
  '🎁 GET FREE DELIVERY ON ELIGIBLE ORDERS OVER $100',
  '🚀 TRY A NEW TOY — YOUR KIDS WILL LOVE IT',
]

export function CategorySection() {
  return (
    <div className="bg-brand-cream overflow-hidden ">
      {/* ── Category Cards Row (Dynamic Staggered Layout) ── */}
      <section className="pt-8 pb-14 md:pt-10 md:pb-20">
        <div className="shell">
          {/* 
              FIX: Removed justify-center entirely. 
              In horizontal scroll containers, 'justify-center' causes "Negative Overflow" 
              where the first element is pushed off-screen to the left and became inaccessible.
              'justify-start' is the only safe alignment for overflowing rows.
          */}
          <div className="flex items-start gap-4 md:gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible pt-16 pb-16 justify-start lg:justify-center px-6 md:px-12 lg:px-4 xl:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat, i) => {
              // Odd/Even Stagger Logic: Even indices (0, 2, 4) are high, Odd (1, 3) are shifted down.
              const isStaggered = i % 2 !== 0; 
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    y: -15, 
                    rotate: i % 2 === 0 ? 2 : -2,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 400, damping: 15 }
                  }}
                  className={`dashed-card bg-[#F7EBD5] p-3 cursor-pointer group shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[165px] xl:w-[190px] flex flex-col items-center shadow-sm hover:shadow-2xl ${
                    isStaggered ? 'mt-8 md:mt-12' : 'mt-0'
                  }`}
                >
                  {/* Image Container (Polaroid Style) */}
                  <div className="w-full aspect-[4/3.8] overflow-hidden rounded-xl bg-white mb-4 lg:mb-5 shadow-inner border border-brand-ink/5">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  
                  {/* Label (Enclosed inside dashed boundary) */}
                  <span className="text-[13px] md:text-[15px] font-bold text-brand-ink text-center mb-1 font-playful tracking-tight pb-1">
                    {cat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Orange Marquee Ticker ── */}
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


