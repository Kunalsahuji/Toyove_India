import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Floating 3D Toy SVG icons (matching the image's illustrated style)
const RocketIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill="#F1641E" fillOpacity="0.12" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="36">🚀</text>
  </svg>
)
const RainbowIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill="#6651A4" fillOpacity="0.10" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="36">🌈</text>
  </svg>
)
const StarIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill="#FFD700" fillOpacity="0.15" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="36">⭐</text>
  </svg>
)

export function VisionHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yRocket  = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yRainbow = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yStar    = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yImg     = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={ref} className="relative bg-brand-cream overflow-hidden min-h-[580px] md:min-h-[700px] flex items-center">
      <div className="container-shell w-full py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── LEFT: Text Block ── */}
          <div className="flex-1 z-10 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-brand-orange font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4"
            >
              Selected Items Online Only
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[46px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.0] font-black text-brand-purple mb-8"
            >
              Find The<br />
              Best Toys<br />
              For Your Kids
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button className="h-14 px-10 bg-brand-purple text-white font-bold text-[14px] uppercase tracking-widest rounded-full hover:bg-brand-orange transition-all duration-300 shadow-lg shadow-brand-purple/30 hover:shadow-brand-orange/30 hover:scale-105 active:scale-95">
                Shop Now
              </button>
              <button className="h-14 px-10 border-2 border-brand-purple text-brand-purple font-bold text-[14px] uppercase tracking-widest rounded-full hover:bg-brand-purple hover:text-white transition-all duration-300">
                View Collection
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Layered Image + Floating Icons ── */}
          <div className="flex-1 relative flex items-center justify-center w-full min-h-[380px] md:min-h-[500px]">

            {/* Main Product Image with parallax */}
            <motion.div
              style={{ y: yImg }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="perspective-wrapper relative z-10 w-[280px] sm:w-[340px] md:w-[420px]"
            >
              <motion.div
                whileHover={{ rotateY: 8, rotateX: -5, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="rounded-[48px] overflow-hidden shadow-2xl shadow-brand-purple/20 border-[8px] border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800"
                  alt="Premium Toys For Kids"
                  className="w-full h-full object-cover aspect-[3/4]"
                />
              </motion.div>

              {/* 3D Overlay Badge */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="absolute -bottom-6 -right-6 bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-[11px] font-bold text-brand-purple uppercase tracking-wider">Best Seller</p>
                  <p className="text-[10px] text-brand-muted">Loved by 12k+ parents</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Rocket (Top Right) */}
            <motion.div
              style={{ y: yRocket }}
              className="float-1 absolute top-0 right-0 md:-top-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 z-20"
            >
              <RocketIcon />
            </motion.div>

            {/* Floating Rainbow (Bottom Left) */}
            <motion.div
              style={{ y: yRainbow }}
              className="float-2 absolute bottom-0 left-0 md:-bottom-4 md:-left-8 w-24 h-24 md:w-32 md:h-32 z-20"
            >
              <RainbowIcon />
            </motion.div>

            {/* Floating Star (Middle Left) */}
            <motion.div
              style={{ y: yStar }}
              className="float-1 absolute top-1/2 -left-4 md:-left-10 w-14 h-14 md:w-20 md:h-20 z-20"
            >
              <StarIcon />
            </motion.div>

            {/* Background Blob */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[90%] h-[90%] bg-brand-purple/6 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
