import { motion } from 'framer-motion'

const logos = [
  () => <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
    <rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" />
    <circle cx="30" cy="30" r="8" />
  </svg>,
  () => <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
    <polygon points="30,5 55,30 30,55 5,30" />
    <polygon points="30,15 45,30 30,45 15,30" />
  </svg>,
  () => <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
    <rect x="8" y="8" width="44" height="44" rx="4" />
    <line x1="30" y1="8" x2="30" y2="52" />
    <line x1="8" y1="30" x2="52" y2="30" />
    <circle cx="30" cy="30" r="5" />
  </svg>,
  () => <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
    <circle cx="30" cy="30" r="22" />
    <circle cx="30" cy="30" r="10" />
    <line x1="30" y1="8" x2="30" y2="52" />
    <line x1="8" y1="30" x2="52" y2="30" />
  </svg>,
  () => <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
    <rect x="8" y="8" width="44" height="44" rx="3" />
    <rect x="18" y="18" width="24" height="24" />
    <rect x="24" y="24" width="12" height="12" />
  </svg>,
]

export function BrandLogos() {
  return (
    <section className="py-4 md:py-6 bg-brand-cream">
      <div className="shell">
        <div className="dashed-card p-6 md:p-12 overflow-hidden">
          <div className="flex items-center justify-start md:justify-center gap-10 md:gap-16 w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {logos.map((Logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.15, color: '#6651A4' }}
                className="text-brand-muted/50 hover:text-brand-purple transition-colors cursor-pointer shrink-0 snap-center"
              >
                <Logo />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
