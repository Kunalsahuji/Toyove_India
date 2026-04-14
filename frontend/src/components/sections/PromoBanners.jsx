import { motion } from 'framer-motion'
import dance from '../../assets/dance.png'
import bigsale from '../../assets/big-sale.png'
import educationtoys from '../../assets/educational-toy.png'
import musicalbear from '../../assets/musical-bear.png'
const banners = [
  {
    id: 1,
    bg: '#2A9AA6', // Teal
    label: 'MUSIC AND SOUNDS',
    title: 'Shop & Glow Toy Cart Orange Car',
    img: dance, // Reusing high-quality local transparent PNGs
    tall: true,
    mixBlendMode: 'screen',
  },
  {
    id: 2,
    bg: '#EA4C4E', // Brighter red
    label: 'BIG SEASON SALE',
    title: 'Playbox The Builder Wooden Toys',
    img: bigsale,
    tall: true,
  },
  {
    id: 3,
    bg: '#6E5BB9', // Purple
    label: 'SEASON SALE',
    title: 'Plan Toys Pull-Along Musical Bear',
    img: musicalbear,
    tall: true,
  },
  {
    id: 4,
    bg: '#ED6D2A', // Vibrant Orange
    label: 'MUSIC AND SOUNDS',
    title: 'Fun And Educational Toy For Babies',
    img: educationtoys,
    tall: true,
  },
]

export function PromoBanners() {
  return (
    <section className="py-4 md:py-6 bg-brand-cream overflow-hidden">
      <div className="shell">

        {/* Responsive Grid with strict DOM ordering for mobile parity */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.1fr] gap-4 md:gap-5 auto-rows-fr">

          {/* Teal Banner - Mobile Order 1 | Desktop Order 1 */}
          <div className="order-1 lg:order-1 lg:h-full h-[380px] md:h-[450px]">
            <BannerCard banner={banners[0]} className="h-full" />
          </div>

          {/* Center Stack (Red/Purple) - Mobile Order 3 | Desktop Order 2 */}
          <div className="order-3 lg:order-2 flex flex-col gap-4 md:gap-5 h-full">
            <div className="flex-1 h-[240px] lg:h-auto">
              <BannerCard banner={banners[1]} className="h-full" />
            </div>
            <div className="flex-1 h-[240px] lg:h-auto">
              <BannerCard banner={banners[2]} className="h-full" />
            </div>
          </div>

          {/* Orange Banner - Mobile Order 2 | Desktop Order 3 */}
          <div className="order-2 lg:order-3 lg:h-full h-[380px] md:h-[450px]">
            <BannerCard banner={banners[3]} className="h-full" />
          </div>

        </div>

      </div>
    </section>
  )
}

function BannerCard({ banner, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-[20px] cursor-pointer group flex flex-col shadow-sm hover:shadow-lg ${className}`}
      style={{ backgroundColor: banner.bg }}
    >
      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full w-full pointer-events-none">

        {/* Typographic Block */}
        <div>
          <p className="text-white/90 font-bold text-[10px] md:text-[11px] tracking-widest uppercase mb-3">
            {banner.label}
          </p>
          <h3 className="font-playful text-white font-bold text-[22px] md:text-[25px] leading-[1.1] max-w-[180px] md:max-w-[210px] drop-shadow-sm" style={{ fontFamily: 'var(--font-playful)' }}>
            {banner.title}
          </h3>
        </div>

        {/* Action Button */}
        <div className="mt-8 relative z-30">
          <button className="h-10 px-6 bg-white text-[#1A1A1A] text-[12px] font-black uppercase tracking-wider rounded border-2 border-transparent hover:border-white hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-md cursor-pointer">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Floating 3D Transparent Image */}
      <div className={`absolute right-[-2%] bottom-[-5%] overflow-visible pointer-events-none flex justify-end items-end z-10 transition-transform duration-500 group-hover:scale-[1.08] origin-bottom-right
                      ${banner.tall ? 'w-[85%] md:w-[85%] h-[85%]' : 'w-[55%] md:w-[50%] h-[90%]'}`}>
        <img
          src={banner.img}
          alt={banner.title}
          className={`w-full h-full object-contain ${banner.tall ? 'object-right-bottom' : 'object-center md:object-right-bottom'} drop-shadow-2xl opacity-100`}
        />
      </div>

    </motion.div>
  )
}
