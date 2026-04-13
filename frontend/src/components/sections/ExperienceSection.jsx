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
  const [openIndex, setOpenIndex] = useState(2); // The 3rd one is open by default to match reference

  return (
    <section className="py-16 md:py-24 bg-brand-cream">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          
          {/* Left Side: Child Portrait (Height parity with right side content) */}
          <div className="w-full h-full">
             <div className="h-full w-full rounded-2xl overflow-hidden bg-white shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1544435253-f0ead4f638fa?auto=format&fit=crop&q=80&w=800" 
                  alt="Child with wooden toy" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Right Side: Accordion & Text */}
          <div className="w-full flex flex-col justify-center">
             <h2 
               className="font-playful text-[28px] md:text-[38px] lg:text-[44px] font-black text-brand-ink leading-[1.05] mb-10 tracking-tight"
               style={{ letterSpacing: '-0.04em' }}
             >
               We Have Always Tried To Focus On The People Who Were Going To Use The Products
             </h2>

             <div className="space-y-6">
               {accordionData.map((item, i) => {
                 const isOpen = openIndex === i;
                 return (
                   <div key={i} className="border-b-2 border-dashed border-brand-ink/10 pb-5">
                     <button
                       onClick={() => setOpenIndex(isOpen ? -1 : i)}
                       className="w-full flex items-center justify-between text-left group cursor-pointer"
                     >
                       <span className={`font-bold text-[15px] md:text-[16px] transition-colors duration-300 ${isOpen ? 'text-brand-purple' : 'text-brand-ink hover:text-brand-purple'}`}>
                         {item.title}
                       </span>
                       <div className={`h-[24px] w-[24px] rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-brand-purple border-brand-purple' : 'border-brand-ink/20 group-hover:border-brand-purple'}`}>
                         {isOpen ? <Minus className="h-[12px] w-[12px] text-white" /> : <Plus className="h-[12px] w-[12px] text-brand-muted" />}
                       </div>
                     </button>
                     
                     <AnimatePresence>
                       {isOpen && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.35, ease: 'easeOut' }}
                           className="overflow-hidden"
                         >
                           <p className="pt-4 text-[12px] md:text-[13px] text-brand-muted leading-[1.6] w-[95%]">
                             {item.content}
                           </p>

                           {/* Inner gallery - only for the active item to match reference */}
                           <div className="grid grid-cols-2 gap-4 mt-6">
                             <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm border border-brand-ink/5">
                               <img src="https://images.unsplash.com/photo-1596461390812-706f9d45e43c?auto=format&fit=crop&q=80&w=400" alt="Detail view 1" className="w-full h-full object-cover" />
                             </div>
                             <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm border border-brand-ink/5">
                               <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400" alt="Detail view 2" className="w-full h-full object-cover" />
                             </div>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 )
               })}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

