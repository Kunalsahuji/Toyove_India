import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'

export function ProductCard({ product }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative flex flex-col gap-3 cursor-pointer"
    >
      {/* 1. Portrait Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f4f4f4] border border-black/5">
        <img 
          src={product.img} 
          alt={product.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform active:scale-95 group-hover:opacity-100 md:opacity-0">
          <Heart className="h-5 w-5 text-brand-ink" />
        </button>

        {/* Badge (Sale/Best Seller) */}
        {product.sale && (
          <div className="absolute top-3 left-3 bg-brand-orange text-white px-3 py-1 rounded-full text-[12px] font-bold shadow-sm">
            SALE
          </div>
        )}
      </div>

      {/* 2. Product Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[14px] md:text-[15px] font-medium text-brand-ink line-clamp-1 group-hover:underline">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center text-brand-ink">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[12px] font-bold ml-1">{product.rating}</span>
          </div>
          <span className="text-[12px] text-brand-muted">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[16px] font-bold text-brand-ink">${product.price}</span>
          {product.oldPrice && (
            <span className="text-[14px] text-brand-muted line-through">${product.oldPrice}</span>
          )}
        </div>

        {product.shipping === 'free' && (
          <span className="text-[12px] font-bold text-green-700 mt-1 uppercase tracking-tight">FREE shipping</span>
        )}
      </div>
    </motion.div>
  )
}

export function ProductGrid({ title, products }) {
  return (
    <section className="py-12 bg-white">
      <div className="container-shell">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] md:text-[24px] font-bold text-brand-ink">{title}</h2>
          <button className="text-[14px] font-bold text-brand-purple hover:underline underline-offset-4">See more</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 6) * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
