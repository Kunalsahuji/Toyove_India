import { motion } from 'framer-motion'
import { Box, AlignJustify, SlidersHorizontal, Palette, ShoppingCart, Heart } from 'lucide-react'

const features = [
  {
    icon: Box,
    title: '3D Model & Video',
    desc: 'Include 3D model and video sections for all products on Toyove India to give buyers a full view before they purchase.'
  },
  {
    icon: AlignJustify,
    title: 'Mega Menu',
    desc: 'Built-in mega menu with support for columns, images, and links. Fully customizable to any navigation structure.'
  },
  {
    icon: SlidersHorizontal,
    title: 'Dynamic Filtering',
    desc: 'Advanced AJAX-powered filtering on collection pages. Multi-select, price range, and availability filters included.'
  },
  {
    icon: Palette,
    title: 'Product Swatches',
    desc: 'Display color and image swatches on product and collection pages. Variant-linked images supported.'
  },
  {
    icon: ShoppingCart,
    title: 'Ajax Cart',
    desc: 'Slide-out cart with free shipping progress bar, upsell prompts, and one-click checkout for faster conversions.'
  },
  {
    icon: Heart,
    title: 'Wishlist & Compare',
    desc: 'Let customers save products to a wishlist or compare multiple products side-by-side before deciding.'
  }
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export function FeatureGrid() {
  return (
    <section className="py-24 md:py-32 bg-brand-purple relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-shell relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-brand-orange font-bold text-[11px] tracking-[0.25em] uppercase mb-4"
          >
            What's Inside
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif text-[32px] md:text-[52px] text-white font-bold mb-6 leading-tight"
          >
            Everything you need, <br className="hidden md:block" />nothing you don't.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/60 text-[14px] md:text-[16px] max-w-[580px] mx-auto leading-relaxed"
          >
            The theme is suitable for any business type because you can create whatever you want — toys, clothes, accessories, and more.
          </motion.p>
        </div>

        {/* 3×2 Card Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 perspective-wrapper"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item} className="vision-card group">
              <div className="h-14 w-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors duration-300">
                <f.icon className="h-7 w-7 text-brand-purple group-hover:text-brand-orange transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-[20px] font-bold text-brand-purple mb-3">{f.title}</h3>
              <p className="text-brand-muted text-[13px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
