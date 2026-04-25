import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, ShoppingBag, Heart, Layers } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export function ProductCard({ p, i = 0 }) {
  const { addToCart, toggleWishlist, wishlist, toggleCompare } = useCart()
  const isWishlisted = wishlist.some(item => item.id === p.id)
  const navigate = useNavigate()

  const handleAction = (e, action, product) => {
    e.preventDefault()
    e.stopPropagation()
    
    const normalizedProduct = {
      id: product.id || product.sku || product.name?.toLowerCase().replaceAll(' ', '-'),
      title: product.name || product.title,
      price: product.price,
      img: product.img,
      sku: product.sku || `TOY-${product.id || '001'}`
    }

    if (action === 'cart') {
      addToCart(normalizedProduct, 1)
      navigate('/cart')
    }
    if (action === 'wishlist') {
      toggleWishlist(normalizedProduct)
      navigate('/wishlist')
    }
    if (action === 'quickview') navigate(`/product/${product.name?.toLowerCase().replaceAll(' ', '-')}`)
    if (action === 'compare') {
      toggleCompare(normalizedProduct)
      navigate('/compare')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.1 }}
      className="group relative flex flex-col transition-all duration-300 w-full bg-transparent"
    >
      {/* Image Container */}
      <div className="relative aspect-square mb-4 group/img overflow-hidden rounded-[24px] border-[1.5px] border-dashed border-[#333]/20 shadow-sm hover:shadow-lg transition-all duration-500 bg-[#F9EAD3]/50">
        <Link 
          to={`/product/${p.name?.toLowerCase().replaceAll(' ', '-')}`} 
          className="relative block w-full h-full overflow-hidden"
        >
          {/* Promo Badge */}
          {p.discount && (
            <span className="absolute top-3 left-3 z-30 bg-[#222] text-white text-[9px] md:text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-wider">
              -{p.discount}%
            </span>
          )}

          {/* Action Icons - Persistent on Mobile, Hover on Desktop */}
          <div className="absolute top-3 right-3 z-40 flex flex-col gap-2 transition-all duration-500 lg:opacity-0 lg:translate-x-4 lg:group-hover/img:opacity-100 lg:group-hover/img:translate-x-0">
            {[
              { icon: <Eye size={15} />, label: 'Quick View', act: 'quickview' },
              { icon: <ShoppingBag size={15} />, label: 'Add to Cart', act: 'cart' },
              { icon: <Heart size={15} fill={isWishlisted ? 'white' : 'none'} />, label: 'Wishlist', act: 'wishlist' },
              { icon: <Layers size={15} />, label: 'Compare', act: 'compare' }
            ].map((btn, idx) => (
              <button 
                key={idx} 
                onClick={(e) => handleAction(e, btn.act, p)}
                className="h-8 w-8 md:h-9 md:w-9 bg-[#E84949] text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-[#333] transition-all duration-300 hover:scale-110 shrink-0" 
                title={btn.label}
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
        <Link to={`/product/${(p.name || p.title || 'toy').toLowerCase().replaceAll(' ', '-')}`}>
          <h3 className="font-grandstander text-[13px] md:text-[15px] font-bold text-[#333] mb-1.5 line-clamp-2 leading-[1.2] group-hover:text-[#E84949] transition-colors duration-300 uppercase tracking-tight">
            {p.name || p.title}
          </h3>
        </Link>
        <div className="flex flex-col items-center gap-1">
          {p.oldPrice && (
            <span className="text-[10px] md:text-[12px] text-[#999] line-through font-medium tracking-tight">
              ${p.oldPrice.toFixed(2)} USD
            </span>
          )}
          <span className="text-[14px] md:text-[16px] font-black text-[#E84949] tracking-tight">
            ${(p.price || 0).toFixed(2)} USD
          </span>
        </div>
      </div>
    </motion.div>
  )
}
