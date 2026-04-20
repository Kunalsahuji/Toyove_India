import { motion } from 'framer-motion'

const brandImages = [
  'https://toykio.myshopify.com/cdn/shop/files/brand-01.png?v=1710995380&width=120',
  'https://toykio.myshopify.com/cdn/shop/files/brand-02.png?v=1710995380&width=120',
  'https://toykio.myshopify.com/cdn/shop/files/brand-03.png?v=1710995380&width=120',
  'https://toykio.myshopify.com/cdn/shop/files/brand-04.png?v=1710995380&width=120',
  'https://toykio.myshopify.com/cdn/shop/files/brand-05.png?v=1710995380&width=120',
  'https://toykio.myshopify.com/cdn/shop/files/brand-06.png?v=1710995380&width=120',
]

// Duplicate for seamless loop
const marqueeImages = [...brandImages, ...brandImages, ...brandImages]

export function BrandLogos() {
  return (
    <section className="py-6 md:py-10 bg-brand-cream overflow-hidden">
      <div className="shell">
        <div className="dashed-card p-6 md:p-10 relative overflow-hidden bg-[#FDF4E6]/50">
          <div className="relative w-full">
            <motion.div 
              className="flex items-center gap-10 md:gap-20"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {marqueeImages.map((src, i) => (
                <div 
                  key={i} 
                  className="w-[100px] md:w-[140px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100 cursor-pointer"
                >
                  <img 
                    src={src} 
                    alt={`Brand ${i}`} 
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
