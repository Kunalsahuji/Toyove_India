import { motion } from 'framer-motion'
import shop from '../../assets/shop.png'
import bigsale from '../../assets/wooden-toys.png'
import educationtoys from '../../assets/educational -toys.png'
import musicalbear from '../../assets/musical-bear.png'
const banners = [
  {
    id: 1,
    bg: '#2A9AA6',
    label: 'MUSIC AND SOUNDS',
    title: 'Shop & Glow Toy Cart Orange Car',
    img: shop,
    tall: true,
    gridClass: 'lg:col-start-1 lg:row-span-2',
    layout: 'default',
  },
  {
    id: 4,
    bg: '#ED6D2A',
    label: 'MUSIC AND SOUNDS',
    title: 'Fun And Educational Toy For Babies',
    img: educationtoys,
    tall: true,
    gridClass: 'lg:col-start-3 lg:row-span-2',
    layout: 'default',
  },
  {
    id: 2,
    bg: '#EA4C4E',
    label: 'BIG SEASON SALE',
    title: 'Playbox The Builder Wooden Toys',
    img: bigsale,
    tall: false,
    gridClass: 'lg:col-start-2 lg:row-start-1',
    layout: 'mirrored', // Image Left, Text Right
  },
  {
    id: 3,
    bg: '#6E5BB9',
    label: 'SEASON SALE',
    title: 'Plan Toys Pull-Along Musical Bear',
    img: musicalbear,
    tall: false,
    gridClass: 'lg:col-start-2 lg:row-start-2',
    layout: 'default', // Text Left, Image Right
  },
]

export function PromoBanners() {
  return (
    <section className="py-10 md:py-16 bg-brand-cream overflow-hidden">
      <div className="shell">
        {/* Desktop-optimized height and tight gaps to match reference Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-5 lg:h-[480px]">
          {banners.map((banner) => (
            <div key={banner.id} 
                 className={`${banner.gridClass} ${banner.tall ? 'h-[380px] md:h-[450px] lg:h-full' : 'h-[240px] md:h-[220px] lg:h-auto'}`}>
              <BannerCard banner={banner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BannerCard({ banner }) {
  const isMirrored = banner.layout === 'mirrored'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative h-full overflow-hidden rounded-[20px] cursor-pointer group flex shadow-sm hover:shadow-lg transition-all duration-300
                 ${isMirrored ? 'justify-end' : 'justify-start'}`}
      style={{ backgroundColor: banner.bg }}
    >
      {/* Content Layer: Compressed with tight margins and bold fonts */}
      <div className={`relative z-20 p-8 lg:p-10 flex flex-col pointer-events-none w-full
                      ${isMirrored ? 'items-end' : 'items-start'}`}>
        <p className="text-white/95 font-bold text-[10px] lg:text-[11px] tracking-[0.15em] uppercase mb-1">
          {banner.label}
        </p>
        <h3 className={`font-playful text-white font-bold text-[24px] lg:text-[28px] leading-[1.05] mb-4 drop-shadow-sm max-w-[180px] lg:max-w-[210px]
                       ${isMirrored ? 'text-right' : 'text-left'}`} 
            style={{ fontFamily: 'var(--font-playful)' }}>
          {banner.title}
        </h3>
        
        <button className="h-9 px-6 bg-white text-black text-[12px] font-black uppercase tracking-wider rounded-[6px] border-2 border-transparent hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-sm">
          SHOP NOW
        </button>
      </div>

      {/* Hero Image Positioning: Filling the space to act as background */}
      <div className={`absolute bottom-0 overflow-visible pointer-events-none z-10 transition-transform duration-700 group-hover:scale-[1.04] flex items-end
                      ${isMirrored ? 'left-[-4%] right-auto justify-start' : 'right-[-4%] left-auto justify-end'} 
                      ${banner.tall ? 'w-[85%] lg:w-[90%] h-[75%] lg:h-[80%]' : 'w-[55%] lg:w-[60%] h-[90%] lg:h-[105%]'}`}>
        <img
          src={banner.img}
          alt={banner.title}
          className={`w-full h-full object-contain ${isMirrored ? 'object-left-bottom' : 'object-right-bottom'} drop-shadow-2xl`}
        />
      </div>
      
      {/* Interaction Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
