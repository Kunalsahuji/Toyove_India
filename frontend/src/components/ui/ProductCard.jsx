import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, ShoppingBag, Heart, Layers } from 'lucide-react'

export function ProductCard({ p, i = 0 }) {
  const navigate = useNavigate()

  const handleAction = (e, action, product) => {
    e.preventDefault()
    e.stopPropagation()
    if (action === 'cart') navigate('/cart')
    if (action === 'wishlist') navigate('/wishlist')
    if (action === 'quickview') navigate(`/product/${product.name.toLowerCase().replaceAll(' ', '-')}`)
    if (action === 'compare') alert('Added to comparison!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.1 }}
      className="group relative flex flex-col transition-all duration-300 w-full"
    >
      {/* Image Container - Full Bleed */}
      <div className="relative aspect-square mb-4 group/img overflow-hidden rounded-[24px] border-[1.5px] border-dashed border-[#333]/15 shadow-sm hover:shadow-xl transition-shadow duration-500">
        <Link 
          to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`} 
          className="relative block w-full h-full overflow-hidden bg-[#F9EAD3]"
        >
          {/* Promo Badge */}
          <span className="absolute top-3 left-3 z-30 bg-[#222] text-white text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            {p.badge || 'Sale'}%
          </span>

          {/* Desktop Action Icons (Slide in) */}
          <div className="hidden lg:flex absolute top-3 -right-12 z-40 flex flex-col gap-2 group-hover/img:right-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover/img:opacity-100">
            {[
              { icon: <Eye size={15} />, label: 'Quick View', act: 'quickview' },
              { icon: <ShoppingBag size={15} />, label: 'Add to Cart', act: 'cart' },
              { icon: <Heart size={15} />, label: 'Wishlist', act: 'wishlist' },
              { icon: <Layers size={15} />, label: 'Compare', act: 'compare' }
            ].map((btn, idx) => (
              <button 
                key={idx} 
                onClick={(e) => handleAction(e, btn.act, p)}
                className="h-9 w-9 bg-[#E84949] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-[#333] transition-all duration-300 hover:scale-110 shrink-0" 
                title={btn.label}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Mobile Action Icons (Always Visible) */}
          <div className="lg:hidden absolute top-2 right-2 z-40 flex flex-col gap-1.5">
            {[
              { icon: <Eye size={13} />, act: 'quickview' },
              { icon: <ShoppingBag size={13} />, act: 'cart' },
              { icon: <Heart size={13} />, act: 'wishlist' },
              { icon: <Layers size={13} />, act: 'compare' }
            ].map((btn, idx) => (
              <button 
                key={idx} 
                onClick={(e) => handleAction(e, btn.act, p)}
                className="h-8 w-8 bg-[#E84949] text-white rounded-lg flex items-center justify-center shadow-md shrink-0"
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Product Images */}
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover/img:opacity-0 absolute inset-0 z-20"
          />
          <img
            src={p.hoverImg || p.img}
            alt={p.name}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-700 ease-in-out z-10"
          />
        </Link>
      </div>

      <div className="text-center px-1">
        <Link to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`}>
          <h3 className="font-grandstander text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#222] mb-2 line-clamp-2 leading-[1.2] group-hover:text-[#E84949] transition-colors duration-300">
            {p.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-3">
          <span className="text-[12px] md:text-[14px] text-[#999] line-through font-medium tracking-tight">
            ${(p.oldPrice || p.price + 30).toFixed(2)} USD
          </span>
          <span className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#E84949] tracking-tight">
            ${p.price.toFixed(2)} USD
          </span>
        </div>
      </div>
    </motion.div>
  )
}
