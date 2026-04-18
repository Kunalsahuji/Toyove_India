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
    <section className="pb-10 md:pb-12 bg-[#FDF3E7] pt-0 md:pt-0">
      <div className="shell">
        <div className="dashed-card overflow-hidden bg-[#FDF3E7]/20 border-brand-ink/40" style={{ borderWidth: '1.5px' }}>
          <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
            {benefits.map((b, i) => {
              const borderClasses = `
                border-brand-ink/55 border-dotted
                border-2 rounded-lg 
                ${i !== benefits.length - 1 ? 'border-r-[2px]' : 'border-r-2'}
              `;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`w-full sm:w-[50%] lg:w-auto shrink-0 snap-start p-6 md:p-8 flex flex-col gap-4 hover:bg-[#F7EBD5] transition-colors duration-300 cursor-default ${borderClasses}`}
                >
                  <div className="h-10 w-10 flex items-center justify-start mb-1 text-brand-ink">
                    <b.icon className="h-9 w-9 stroke-[1.2]" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-grandstander font-bold text-[15px] md:text-[17px] text-brand-ink tracking-tight">{b.title}</h4>
                    <p className="font-roboto text-[13px] md:text-[14px] text-brand-muted leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
