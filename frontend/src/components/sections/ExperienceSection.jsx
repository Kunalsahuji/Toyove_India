import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const accordionData = [
  {
    title: "Safety Packaging",
    content: "All our toys are packed with eco-friendly and child-safe materials, ensuring a hazard-free unboxing experience for your little ones."
  },
  {
    title: "100% Warranty Product",
    content: "We stand by our quality. Every product comes with a full 1-year warranty against any manufacturing defects to give you peace of mind."
  },
  {
    title: "Premium Product",
    content: "Ingredients undergo a rigorous scientific evaluation to meet our strict standards for purity, potency, and efficacy. We bring together the best of nature and science to create a truly harmonious and safe toy."
  }
]

export function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState(2);

  return (
    <section className="py-10 md:py-14 bg-brand-cream overflow-hidden">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          <div className="w-full order-1 lg:order-1">
            <div className="w-full aspect-4/3 md:aspect-[4/4.2] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-[#333]/5">
              <img
                src="https://cdn.cdnparenting.com/articles/2022/04/07114528/227386435-768x525.webp"
                alt="Child with educational toys"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-start order-2 lg:order-2 h-full">

            <h2
              className="
    font-grandstander 
    text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]
    font-bold 
    text-[#333] 
    leading-tight 
    mb-6 sm:mb-8 md:mb-10 lg:mb-12
    tracking-tight
  "
              style={{ letterSpacing: '-0.02em' }}
            >
              We Have Always Tried To Focus On The People Who Were Going To Use The Products
            </h2>

            <div className="space-y-4 lg:space-y-6 mb-8 xl:mb-10 font-roboto">
              {accordionData.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b-[1.5px] border-dashed border-[#dcd2c6] pb-4">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between text-left group cursor-pointer"
                    >
                      <span className={`font-grandstander font-bold text-[14px] md:text-[17px] transition-colors duration-300 tracking-tight ${isOpen ? 'text-[#E84949]' : 'text-[#333] group-hover:text-[#E84949]'}`}>
                        {item.title}
                      </span>

                      <div className={`h-[24px] w-[24px] rounded-full border-[1.5px] transition-all duration-300 flex items-center justify-center shrink-0 
                         ${isOpen ? 'border-[#E84949] bg-[#E84949] text-white' : 'border-[#dcd2c6] group-hover:border-[#E84949]'}`}>
                         {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-[14px] text-brand-muted leading-relaxed lg:w-[95%] italic">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 lg:gap-5 mt-auto pb-4">
              <div className="w-full aspect-[4/3.5] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-[#333]/5">
                <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400" alt="Detail product view" className="w-full h-full object-cover" />
              </div>
              <div className="w-full aspect-[4/3.5] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-[#333]/5">
                <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400" alt="Child using product" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
