import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layers, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ComparePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] min-h-screen py-24 font-roboto">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-16 md:p-24 bg-[#FAEAD3] rounded-[48px] border-[1.6px] border-dashed border-[#333]/15 shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#6651A4] mx-auto mb-8 shadow-sm">
            <Layers size={32} />
          </div>
          <h1 className="text-4xl font-grandstander font-bold text-[#333] mb-6">Product Comparison</h1>
          <p className="text-[16px] md:text-[18px] text-[#666] mb-12 max-w-xl mx-auto leading-relaxed">
            Choose your favorite toys and compare them side-by-side to find the perfect adventure partner for your child!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-12 py-4 bg-[#E84949] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg active:scale-95"
          >
            <ShoppingBag size={18} /> BACK TO SHOP
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
