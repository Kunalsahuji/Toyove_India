import { motion } from 'framer-motion'
import { Truck, RotateCcw, Headphones, Gift } from 'lucide-react'

const benefits = [
  { 
    icon: Truck, 
    title: 'Free Shipping & Returns', 
    desc: 'Shop with confidence and have your favorite toys delivered right to your doorstep without any additional cost.' 
  },
  { 
    icon: RotateCcw, 
    title: 'Money Back Guarantee', 
    desc: 'We guarantee to rectify any unsatisfactory experience you may have with your purchase. No queries posed.' 
  },
  { 
    icon: Headphones, 
    title: 'Online Support 24/7', 
    desc: "Need help with your electronics? Get in touch with us anytime, anywhere, and let's get your tech sorted." 
  },
  { 
    icon: Gift, 
    title: 'Regular Gifts', 
    desc: 'We offer regular gifts and surprises for our loyal customers. Stay tuned for our seasonal toy giveaways.' 
  },
]

export function BenefitsSection() {
  return (
    <section className="pb-20 md:pb-28 bg-[#FDF3E7] md:pt-0 pt-0">
      <div className="shell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="dashed-card bg-[#FDF3E7]/40 p-6 md:p-8 flex flex-col gap-5 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div className="h-10 w-10 flex items-center justify-start">
                <b.icon className="h-9 w-9 text-brand-ink stroke-[1]" />
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-[15px] md:text-[16px] text-brand-ink tracking-tight">{b.title}</h4>
                <p className="text-[12px] md:text-[13px] text-brand-muted leading-[1.6]">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

