import { motion } from 'framer-motion'
import heroImg from '../../assets/hero.png'

const Decorations = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute right-[-15%] top-[-10%] w-[70%] h-[120%] bg-[#5B4694] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-90 hidden md:block" />
    
    <svg className="absolute left-[5%] bottom-[8%] w-[45%] h-[25%] opacity-50 hidden md:block" viewBox="0 0 400 150" preserveAspectRatio="none">
      <path d="M 0 120 Q 150 150 250 80 T 400 30" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
    </svg>
    
    <span className="float-a absolute top-[10%] left-[4%] text-[16px] md:text-[20px]">⭐</span>
    <span className="float-b absolute top-[14%] left-[8%] text-[18px] md:text-[24px]" style={{ filter: 'hue-rotate(300deg)' }}>⭐</span>
    <span className="float-a absolute top-[8%] left-[28%] text-[24px] md:text-[34px] hidden sm:block">☁️</span>
    
    {/* Sun perfectly centered above text block on Mobile */}
    <span className="float-b absolute top-[8%] left-[20%] md:top-[12%] md:left-[48%] text-[36px] md:text-[46px]">☀️</span>
    
    <span className="float-a absolute top-[6%] right-[5%] md:right-[10%] text-[24px] md:text-[28px]">☁️</span>

    <span className="float-a absolute bottom-[22%] right-[5%] text-[32px] md:text-[40px] hidden md:block">🌈</span>
    <span className="float-b absolute bottom-[10%] left-[10%] md:left-[40%] text-[26px] md:text-[32px] transform -rotate-12">🚀</span>
    
    <div className="absolute bottom-[5%] md:bottom-[8%] left-[50%] md:left-[46%] transform -translate-x-1/2 md:translate-x-0 flex gap-[6px] items-center">
      <div className="w-[16px] md:w-[20px] h-[3px] bg-[#E84040] rounded-sm"></div>
      <div className="w-[8px] md:w-[12px] h-[3px] bg-white/60 rounded-sm"></div>
    </div>
  </div>
)

export function HeroSection() {
  return (
    <section className="relative bg-[#6651A4] overflow-hidden h-[calc(40vh-104px)] sm:h-[calc(45vh-104px)] md:h-[calc(55vh-104px)] lg:h-[calc(100vh-104px)] lg:min-h-[650px] min-h-[320px] w-full flex items-center">
      
      <Decorations />

      <div className="hdr-inner relative z-10 w-full h-full flex items-center">
        
        {/* TEXT CONTENT LAYER */}
        <div className="w-[100%] sm:w-[80%] md:w-[60%] lg:w-[50%] relative z-20 flex flex-col items-start text-left pointer-events-auto mt-[-15%] md:mt-0">
          
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white font-medium text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-[0.1em] mb-3 md:mb-4"
          >
            SELECTED ITEMS ONLINE ONLY.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-white font-bold mb-5 sm:mb-6 lg:mb-8 whitespace-nowrap"
            style={{ 
              fontFamily: 'var(--font-playful)', 
              textShadow: '0 3px 6px rgba(0,0,0,0.15)',
              lineHeight: 1.15,
              fontSize: 'clamp(34px, 8vw, 64px)',
              letterSpacing: '-0.02em'
            }}
          >
            Find The Best Toys<br />
            For Your Kids
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="w-fit"
          >
            <button className="py-3 px-8 md:py-4 md:px-12 lg:py-5 lg:px-16 bg-white text-[#222] font-[800] text-xs md:text-sm lg:text-base uppercase rounded-lg lg:rounded-md hover:bg-gray-50 transition-colors shadow-md cursor-pointer">
              SHOP NOW
            </button>
          </motion.div>
        </div>

        {/* ABSOLUTE IMAGE OVERLAY LAYER */}
        <div className="absolute bottom-[-1%] right-[-25%] sm:right-[-10%] md:right-[-5%] lg:right-[0%] w-[125%] sm:w-[95%] md:w-[70%] lg:w-[60%] z-10 pointer-events-none flex justify-end items-end">
          <motion.img 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            src={heroImg} 
            alt="Hero Graphic" 
            className="w-full h-auto max-w-none object-contain object-right-bottom drop-shadow-[0_25px_25px_rgba(0,0,0,0.4)]"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800"
            }}
          />
        </div>

      </div>
    </section>
  )
}
