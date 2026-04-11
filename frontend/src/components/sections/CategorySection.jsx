import { motion } from 'framer-motion'

const categories = [
  { label: 'Outdoor Toys', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300&h=300' },
  { label: 'Medical Toys', img: 'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=300&h=300' },
  { label: 'Kids Fashion', img: 'https://images.unsplash.com/photo-1519706173010-86ec16353d82?auto=format&fit=crop&q=80&w=300&h=300' },
  { label: 'Outdoor Toys', img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=300&h=300' },
  { label: 'Soft Toys',    img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=300&h=300' },
]

const marqueeItems = [
  '🔥 UP TO 30% OFF', '⭐ GET A $50 GIFT CARD ON A PURCHASE OF $500+',
  '✈️ LENNY TOY STORE DELIVERS FOR A TABLET $1 FREE ONLY',
  '🎁 GET FREE DELIVERY ON ELIGIBLE ORDERS OVER $100',
  '🚀 TRY A NEW TOY — YOUR KIDS WILL LOVE IT',
]

export function CategorySection() {
  return (
    <div className="bg-brand-cream">
      {/* ── Category Cards Row ── */}
      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="flex items-start gap-4 md:gap-6 overflow-x-auto pb-2 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="dashed-card card-3d flex flex-col items-center gap-3 p-3 cursor-pointer group shrink-0 w-[130px] sm:w-[150px] md:w-[170px]"
              >
                <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>
                <span className="text-[12px] md:text-[13px] font-semibold text-brand-ink text-center">
                  {cat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orange Marquee Ticker ── */}
      <div className="bg-brand-orange py-3 overflow-hidden flex items-center">
        <div className="marquee-inner flex whitespace-nowrap gap-12 items-center">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-bold text-[12px] md:text-[13px] tracking-wide flex items-center gap-2 shrink-0">
              <span>➤</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
