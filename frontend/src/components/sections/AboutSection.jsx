import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Safety Packaging',
    a: 'All products undergo a rigorous scientific evaluation to meet our strict standards for purity, potency, and efficacy via being together the best of nature and science to create a truly harmonious experience.'
  },
  {
    q: '100% Warranty Product',
    a: 'Every single product sold on Toyove India comes with a 100% satisfaction guarantee. If you are not happy, we will make it right — no questions asked.'
  },
  {
    q: 'Premium Product',
    a: 'All products undergo a rigorous scientific evaluation to meet our strict standards for purity, potency, and efficacy via being together the best of nature and science to create a truly harmonious experience.'
  },
]

const bottomImages = [
  'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1559447414-d84cd9d75baf?auto=format&fit=crop&q=80&w=400',
]

export function AboutSection() {
  const [open, setOpen] = useState(2)

  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Large image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=700"
              alt="Baby playing with toys"
              className="w-full h-full object-cover aspect-[4/5] md:aspect-auto md:h-[520px]"
            />
          </motion.div>

          {/* Right — Text + Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-8"
          >
            <h2 className="font-serif text-[26px] md:text-[36px] lg:text-[40px] text-brand-ink font-bold leading-tight">
              We Have Always Tried To Focus On The People Who Were Going To Use The Products
            </h2>

            {/* Accordion */}
            <div className="flex flex-col divide-y divide-dashed divide-gray-300">
              {faqs.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <span className={`text-[14px] md:text-[15px] font-semibold ${open === i ? 'text-brand-purple' : 'text-brand-ink'}`}>
                      {item.q}
                    </span>
                    {open === i
                      ? <Minus className="h-4 w-4 text-brand-purple shrink-0" />
                      : <Plus className="h-4 w-4 text-brand-muted shrink-0" />
                    }
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.p
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden text-[13px] text-brand-muted leading-relaxed pb-4"
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bottom 3 small product images */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {bottomImages.map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={src} alt="Product" className="w-full h-full object-cover hover:scale-105 transition-transform duration-400" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
