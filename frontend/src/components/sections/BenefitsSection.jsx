import { motion } from 'framer-motion'
import { Truck, RotateCcw, Headphones, Tag } from 'lucide-react'

const benefits = [
  { icon: Truck, title: 'Free Shipping & Returns', desc: 'Shop with confidence and have your favorite toys delivered right to your doorstep without any additional cost.' },
  { icon: RotateCcw, title: 'Money Back Guarantee', desc: 'We guarantee to rectify any unsatisfactory experience you may have with your purchase. No questions asked.' },
  { icon: Headphones, title: 'Online Support 24/7', desc: 'Need help with your order/products? Get in touch with us anytime, anywhere, and let\'s get your tech unstuck.' },
  { icon: Tag, title: 'Regular Sales', desc: 'Regular sales don\'t make cuts on our amazing deals with regular sales on our top-of-the-line kids toys and games.' },
]

export function BenefitsSection() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="dashed-card card-3d p-6 flex flex-col gap-4"
            >
              <div className="h-12 w-12 flex items-center justify-center">
                <b.icon className="h-8 w-8 text-brand-ink stroke-[1.5]" />
              </div>
              <h4 className="font-bold text-[14px] text-brand-ink">{b.title}</h4>
              <p className="text-[12px] text-brand-muted leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
