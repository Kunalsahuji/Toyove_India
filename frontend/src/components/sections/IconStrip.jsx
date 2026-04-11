import { motion } from 'framer-motion'

const icons = [
  { emoji: '🚀', label: 'Fast Delivery' },
  { emoji: '🛡️', label: 'Safe & Certified' },
  { emoji: '🌈', label: 'Premium Quality' },
  { emoji: '🎁', label: 'Gift Ready' },
  { emoji: '♻️', label: 'Eco Friendly' },
]

export function IconStrip() {
  return (
    <section className="py-16 bg-brand-cream border-t border-brand-purple/10">
      <div className="container-shell">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {icons.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex flex-col items-center gap-3 cursor-default group"
            >
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-brand-purple/20 flex items-center justify-center bg-white shadow-md group-hover:border-brand-orange group-hover:shadow-lg transition-all duration-300">
                <span className="text-3xl md:text-4xl">{icon.emoji}</span>
              </div>
              <span className="text-[11px] md:text-[12px] font-bold text-brand-purple uppercase tracking-wider group-hover:text-brand-orange transition-colors">
                {icon.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
