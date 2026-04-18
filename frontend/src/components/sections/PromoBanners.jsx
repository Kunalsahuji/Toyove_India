import { motion } from 'framer-motion'
import shop from '../../assets/shop.png'
import bigsale from '../../assets/wooden-toys.png'
import educationtoys from '../../assets/educational -toys.png'
import musicalbear from '../../assets/musical-bear.png'
const banners = [
  {
    id: 1,
    bg: '#2A9AA6',
    label: 'Music And Sounds',
    title: 'Shop & Glow Toy Cart Orange Car',
    img: shop,
    tall: true,
    gridClass: 'lg:col-start-1 lg:row-span-2',
    layout: 'default',
    mobileHeight: 'h-[420px]',
    mobileTextPos: 'top',
  },
  {
    id: 2,
    bg: '#EA4C4E',
    label: 'Big Season Sale',
    title: 'Playbox The Builder Wooden Toys',
    img: bigsale,
    tall: false,
    gridClass: 'lg:col-start-2 lg:row-start-1',
    layout: 'mirrored',
    mobileHeight: 'h-[210px]',
    mobileTextPos: 'center',
  },
  {
    id: 3,
    bg: '#6E5BB9',
    label: 'Season Sale',
    title: 'Plan Toys Pull-Along Musical Bear',
    img: musicalbear,
    tall: false,
    gridClass: 'lg:col-start-2 lg:row-start-2',
    layout: 'default',
    mobileHeight: 'h-[210px]',
    mobileTextPos: 'center',
  },
  {
    id: 4,
    bg: '#ED6D2A',
    label: 'Music And Sounds',
    title: 'Fun And Educational Toy For Babies',
    img: educationtoys,
    tall: true,
    gridClass: 'lg:col-start-3 lg:row-span-2',
    layout: 'default',
    mobileHeight: 'h-[420px]',
    mobileTextPos: 'top',
  },
]

export function PromoBanners() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-[#FDF3E7] overflow-hidden">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-5 lg:h-[500px]">
          {banners.map((banner) => (
            <div key={banner.id}
              className={`${banner.gridClass} ${banner.mobileHeight} md:h-[420px] lg:h-full transition-all duration-300`}>
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
  const isMobileCentered = banner.mobileTextPos === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative h-full overflow-hidden rounded-[24px] cursor-pointer group flex shadow-sm hover:shadow-lg transition-all duration-300
                 ${isMirrored ? 'justify-end' : 'justify-start'}
                 ${isMobileCentered ? 'items-center md:items-start' : 'items-start'}`}
      style={{ backgroundColor: banner.bg }}
    >
      <div className={`relative z-20 p-8 lg:p-10 flex flex-col pointer-events-none w-full
                      ${isMirrored ? 'items-end' : 'items-start'}
                      ${isMobileCentered ? 'justify-center md:justify-start' : 'justify-start'}`}>
        <p className="text-white font-medium text-[10px] lg:text-[11px] tracking-[0.25em] mb-1 md:mb-2 lg:mt-2 font-roboto uppercase">
          {banner.label}
        </p>
        <p className={`font-grandstander text-white font-bold text-[18px] md:text-[20px] lg:text-[24px] leading-[1.08] mb-6 md:mb-7 drop-shadow-sm max-w-[220px] md:max-w-[240px]
                       ${isMirrored ? 'text-right' : 'text-left'}`}>
          {banner.title}
        </p>
        
        <button className="h-9 px-7 bg-white text-black text-[12px] font-bold uppercase tracking-[0.16em] rounded-[6px] border-2 border-transparent hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-sm">
          SHOP NOW
        </button>
      </div>

      <div className={`absolute bottom-0 overflow-visible pointer-events-none z-10 transition-transform duration-700 group-hover:scale-[1.04] flex items-end
                      ${isMirrored ? 'left-[-5%] right-auto justify-start' : 'right-[-5%] left-auto justify-end'} 
                      ${banner.tall ? 'w-[90%] md:w-[100%] h-[75%] md:h-[80%]' : 'w-[65%] md:w-[75%] lg:w-[60%] h-[85%] md:h-[90%] lg:h-[110%]'}`}>
        <img
          src={banner.img}
          alt={banner.title}
          className={`w-full h-full object-contain ${isMirrored ? 'object-left-bottom' : 'object-right-bottom'} drop-shadow-2xl`}
        />
      </div>
      
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
