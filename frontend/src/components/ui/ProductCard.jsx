import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, Eye, Layers } from 'lucide-react'

export function ProductCard({ p, i, isGridOne = false }) {
  const finalPrice = (p.price || 0).toFixed(0)
  const finalOldPrice = p.oldPrice ? p.oldPrice.toFixed(0) : null
  const discountPercent = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className={`group relative flex flex-col bg-transparent mx-auto w-full ${isGridOne ? 'max-w-md md:max-w-lg' : ''}`}
    >
      {/* Dashed Box Container (Image only, NO padding) */}
      <div className="relative aspect-square rounded-[25px] border-[1.5px] border-dashed border-black/15 group-hover:border-[#E84949] transition-all duration-300 bg-[#F9EAD3] overflow-hidden">
        <Link to={`/product/${p.id}`} className="block w-full h-full relative z-10">
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Action Icons - Red Background, white icons */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 transition-all duration-500 transform translate-x-2 opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 lg:opacity-0 md:opacity-100 md:translate-x-0 opacity-100">
          {[
            { icon: <Eye size={16} />, label: 'Quick View' },
            { icon: <ShoppingBag size={16} />, label: 'Add to Cart' },
            { icon: <Heart size={16} />, label: 'Wishlist' },
            { icon: <Layers size={16} />, label: 'Compare' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="w-8 h-8 md:w-9 md:h-9 bg-[#E84949] text-white rounded-xl flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 border border-white/10"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>

        {/* Promo Badge */}
        {discountPercent && (
          <span className="absolute top-3 left-3 z-20 bg-[#222] text-white text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Details Section (OUTSIDE the box) */}
      <div className="mt-4 text-center px-2">
        <Link to={`/product/${p.id}`}>
          <h3 className="text-[13px] md:text-[15px] font-bold text-[#444] group-hover:text-[#E84949] transition-colors duration-300 uppercase tracking-tight truncate mb-1">
            {p.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2">
          {finalOldPrice && (
            <span className="text-[10px] md:text-[11px] text-[#444]/20 line-through font-bold tracking-tight whitespace-nowrap">
              ₹{finalOldPrice}
            </span>
          )}
          <span className="text-[13px] md:text-[15px] font-black text-[#444] group-hover:text-[#E84949] transition-colors tracking-tight whitespace-nowrap">
            ₹{finalPrice}
          </span>
        </div>
      </div>
      
      {/* Mobile persistent icons override */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .group .transform.translate-x-2 {
            transform: translateX(0) !important;
            opacity: 1 !important;
          }
        }
      `}} />
    </motion.div>
  )
}
