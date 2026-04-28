import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function PolicyPageLayout({ title, subtitle, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-roboto">
      {/* Header Section */}
      <div className="relative h-[250px] md:h-[350px] w-full overflow-hidden flex items-center justify-center text-center group bg-blend-overlay rounded-[0.3em] ">
        <div className="absolute inset-0 bg-[#333]/40 z-10 transition-opacity duration-700 group-hover:opacity-60" />
        <img 
          src="https://toykio.myshopify.com/cdn/shop/files/faq.webp?v=1711002747" 
          alt="Header Background" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shell relative z-20"
        >
          <p className="text-[#e84949] font-bold text-[12px] md:text-[14px] uppercase tracking-[0.3em] mb-4">
            {subtitle || "Legal & Information"}
          </p>
          <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-white leading-none tracking-tight drop-shadow-md">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="shell">
        <div className="text-[#444] text-[15px] md:text-[16px] leading-[1.8] space-y-6 py-10 md:py-20">
          {children}
        </div>
      </div>
    </div>
  )
}
