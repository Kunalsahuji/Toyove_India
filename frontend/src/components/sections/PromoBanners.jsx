import { motion } from 'framer-motion'

const banners = [
  {
    id: 1,
    bg: '#4BBFB8',
    label: 'MUSIC AND SOUNDS',
    title: 'Shop & Glow Toy Cart Orange Car',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400',
    tall: true,
  },
  {
    id: 2,
    bg: '#E84040', // Brighter red
    label: 'BIG SEASON SALE',
    title: 'Playbox The Builder Wooden Toys',
    img: 'https://images.unsplash.com/photo-1592017246891-f512c9bf8edd?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    bg: '#6651A4',
    label: 'SEASON SALE',
    title: 'Plan Toys Pull-Along Musical Bear',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    bg: '#F1641E',
    label: 'MUSIC AND SOUNDS',
    title: 'Fun And Educational Toy For Babies',
    img: 'https://plus.unsplash.com/premium_photo-1702498664869-47f37ff07088?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tall: true,
  },
]

export function PromoBanners() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr] gap-5">
          <BannerCard banner={banners[0]} className="sm:row-span-2" />
          
          <div className="grid grid-rows-2 gap-5 flex-col">
            <BannerCard banner={banners[1]} />
            <BannerCard banner={banners[2]} />
          </div>

          <BannerCard banner={banners[3]} className="sm:row-span-2" />
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
      className={`relative overflow-hidden rounded-[20px] cursor-pointer group flex flex-col justify-between ${className}`}
      style={{ backgroundColor: banner.bg, minHeight: banner.tall ? '360px' : '220px' }}
    >
      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full w-full pointer-events-none">
        <div>
          <p className="text-white/80 font-bold text-[10px] md:text-[11px] tracking-widest uppercase mb-3">
            {banner.label}
          </p>
          <h3 className="font-playful text-white font-bold text-[20px] md:text-[24px] leading-[1.05] max-w-[200px]" style={{ fontFamily: 'var(--font-playful)' }}>
            {banner.title}
          </h3>
        </div>
        
        <div className="mt-6">
          <button className="h-10 px-6 bg-white text-brand-ink text-[12px] font-bold uppercase tracking-wider rounded border-2 border-transparent hover:border-brand-ink transition-all pointer-events-auto shadow-md">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Floating Image to the right/bottom */}
      <div className="absolute right-0 bottom-[-10%] w-[65%] h-[80%] z-10 pointer-events-none flex justify-end items-end">
        <img
          src={banner.img}
          alt={banner.title}
          className="w-full h-full object-contain object-right-bottom group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
          style={{ mixBlendMode: 'luminosity', filter: 'contrast(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--bg)] opacity-30" style={{ '--bg': banner.bg }} />
      </div>
    </motion.div>
  )
}
