import { motion } from 'framer-motion'

const banners = [
  {
    id: 1,
    bg: '#4BBFB8',
    label: 'MUSIC AND SOUNDS',
    title: 'Shop & Glow Toy Cart Orange Car',
    img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=500',
    size: 'large', // spans 2 rows on right
  },
  {
    id: 2,
    bg: '#E8312A',
    label: 'BIG SEASON SALE',
    title: 'Playbox The Builder Wooden Toys',
    img: 'https://images.unsplash.com/photo-1620608639234-984210437435?auto=format&fit=crop&q=80&w=400',
    size: 'small',
  },
  {
    id: 3,
    bg: '#6651A4',
    label: 'SEASON SALE',
    title: 'Plan Toys Pull-Along Musical Bear',
    img: 'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=400',
    size: 'small',
  },
  {
    id: 4,
    bg: '#F1641E',
    label: 'MUSIC AND SOUNDS',
    title: 'Fun And Educational Toy For Babies',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=500',
    size: 'large',
  },
]

export function PromoBanners() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        {/* Layout: [Large Left] [Small Middle (2 stacked)] [Large Right] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr] gap-4">
          {/* Large left */}
          <BannerCard banner={banners[0]} className="sm:row-span-2" tall />

          {/* Middle 2 stacked */}
          <div className="grid grid-rows-2 gap-4">
            <BannerCard banner={banners[1]} />
            <BannerCard banner={banners[2]} />
          </div>

          {/* Large right */}
          <BannerCard banner={banners[3]} className="sm:row-span-2" tall />
        </div>
      </div>
    </section>
  )
}

function BannerCard({ banner, className = '', tall = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
      style={{ backgroundColor: banner.bg, minHeight: tall ? '280px' : '130px' }}
    >
      {/* Text Content */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div>
          <p className="text-white/70 font-bold text-[9px] md:text-[10px] tracking-[0.25em] uppercase mb-2">{banner.label}</p>
          <h3 className="font-serif text-white font-bold text-[16px] md:text-[20px] leading-tight max-w-[180px]">{banner.title}</h3>
        </div>
        <button className="mt-4 self-start h-8 px-5 bg-white text-brand-ink text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-gray-100 transition-colors">
          SHOP NOW
        </button>
      </div>

      {/* Product image — right side */}
      <div className="absolute right-0 bottom-0 top-0 w-[55%] overflow-hidden">
        <img
          src={banner.img}
          alt={banner.title}
          className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-500 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-current to-transparent" style={{ color: banner.bg }} />
      </div>
    </motion.div>
  )
}
