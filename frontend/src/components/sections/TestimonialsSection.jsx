import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Customers can't always tell you what they can't always tell you went but they can always tell you what's wrong. Can't always tell you what your most un happy customers.",
    name: 'JONES P.',
    role: 'MANAGER',
    stars: 4,
  },
  {
    quote: "Customers can't always tell you what they can't always tell you went but they can always tell you what's wrong. Can't always tell you what your most un happy customers.",
    name: 'SARAH L.',
    role: 'MANAGER',
    stars: 4,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-brand-purple py-16 md:py-20">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-dashed divide-white/30">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`py-8 md:py-4 flex flex-col gap-6 ${i === 0 ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'}`}
            >
              <span className="font-serif text-[60px] text-white/30 leading-none select-none">"</span>
              <p className="text-white/80 text-[13px] md:text-[14px] leading-relaxed -mt-8">{t.quote}</p>
              <div className="flex items-center gap-3 mt-2">
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-[14px] ${j < t.stars ? 'text-yellow-400' : 'text-white/20'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-white font-bold text-[12px] tracking-wider">{t.name}</p>
                  <p className="text-white/50 text-[10px] tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
