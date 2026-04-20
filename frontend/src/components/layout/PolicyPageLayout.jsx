import { useEffect } from 'react'
import { motion } from 'framer-motion'

export function PolicyPageLayout({ title, subtitle, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] pb-24 min-h-screen">
      {/* Header Section */}
      <div className="bg-[#6449A4] py-16 md:py-24 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-350 mx-auto"
        >
          <p className="text-[#FF4E50] font-bold text-[12px] md:text-[14px] uppercase tracking-[0.4em] mb-4 font-roboto">
            {subtitle || "Toyove India Information"}
          </p>
          <h1 className="text-4xl md:text-6xl font-grandstander font-bold text-white leading-none tracking-tighter">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Content Section - Removed bg-white */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-10 -mt-10 md:-mt-14 relative z-10">
        <div className="bg-[#F9EAD3] rounded-4xl p-8 md:p-16 shadow-xl border-[1.2px] border-[#333333]/15">
          <div className="prose prose-lg max-w-none font-roboto text-[#333] leading-relaxed space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
