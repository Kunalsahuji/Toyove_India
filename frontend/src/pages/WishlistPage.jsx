import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function WishlistPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 md:p-24 bg-white rounded-[48px] border-[1.6px] border-dashed border-[#333333]/15 shadow-xl"
        >
          <div className="w-24 h-24 rounded-full bg-[#F9EAD3] border-[1.6px] border-dashed border-[#E84949] flex items-center justify-center text-[#E84949] mb-10">
            <Heart size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] mb-6 tracking-tighter">Your Wishlist is Empty</h1>
          <p className="max-w-xl mx-auto font-roboto text-[16px] md:text-[18px] text-[#666] leading-relaxed mb-12">
            Looks like you haven't added any favorite toys yet. Browse our collection and click the heart icon to save items you love for later!
          </p>
          <Link 
            to="/" 
            className="h-14 px-12 bg-[#E84949] text-white rounded-full font-bold text-[13px] tracking-[0.2em] uppercase hover:bg-[#333] transition-all flex items-center gap-3 shadow-lg"
          >
            <ShoppingBag size={18} /> START SHOPPING
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
