import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [openIndex, setOpenIndex] = useState(2); // 3rd one open by default

  return (
    <section className="py-16 md:py-24 bg-brand-cream overflow-hidden">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image (Natural Aspect Ratio) */}
          <div className="w-full order-1 lg:order-1">
             <div className="w-full aspect-[4/3] md:aspect-[4/4.2] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-brand-ink/5">
                <img 
                  src="https://cdn.cdnparenting.com/articles/2022/04/07114528/227386435-768x525.webp" 
                  alt="Child with educational toys" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Right Column: Editorial Format */}
          <div className="w-full flex flex-col justify-start order-2 lg:order-2 h-full">
             
             {/* Precisely Sized & Wrapped Title */}
             <h2 
               className="font-playful text-[24px] sm:text-[28px] md:text-[34px] font-black text-brand-ink leading-[1.2] mb-8 lg:mb-10 tracking-tight"
               style={{ letterSpacing: '-0.02em' }}
             >
               We Have Always Tried To Focus On The People Who <br className="hidden md:block" /> Were Going To Use The Products
             </h2>

             {/* Accordion Group */}
             <div className="space-y-4 lg:space-y-6 mb-8 xl:mb-10">
               {accordionData.map((item, i) => {
                 const isOpen = openIndex === i;
                 return (
                   <div key={i} className="border-b-[1.5px] border-dashed border-[#dcd2c6] pb-4">
                     <button
                       onClick={() => setOpenIndex(isOpen ? -1 : i)}
                       className="w-full flex items-center justify-between text-left group cursor-pointer"
                     >
                       <span className={`font-bold text-[14px] md:text-[15px] transition-colors duration-300 ${isOpen ? 'text-brand-purple' : 'text-brand-ink group-hover:text-brand-purple'}`}>
                         {item.title}
                       </span>
                       
                       {/* Thin Minimalist Circle Icon (No Solid Background) */}
                       <div className={`h-[24px] w-[24px] rounded-full border-[1.5px] transition-all duration-300 flex items-center justify-center shrink-0 
                         ${isOpen ? 'border-brand-purple' : 'border-[#dcd2c6] group-hover:border-brand-purple'}`}>
                         <div className="relative w-3 h-3 flex items-center justify-center">
                           {/* Horizontal minus line */}
                           <span className={`absolute w-full h-[1.5px] bg-current transition-colors ${isOpen ? 'text-brand-purple' : 'text-brand-ink'}`}></span>
                           {/* Vertical plus line */}
                           {!isOpen && (
                             <span className="absolute h-full w-[1.5px] bg-brand-ink"></span>
                           )}
                         </div>
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
                           <p className="pt-4 text-[13px] md:text-[13px] text-brand-muted leading-[1.8] lg:w-[95%]">
                             {item.content}
                           </p>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 )
               })}
             </div>

             {/* Static Bottom Gallery (Moved outside accordion) */}
             <div className="grid grid-cols-2 gap-4 lg:gap-5 mt-auto pb-4">
               <div className="w-full aspect-[4/3.5] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-brand-ink/5">
                 <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400" alt="Detail product view" className="w-full h-full object-cover" />
               </div>
               <div className="w-full aspect-[4/3.5] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-brand-ink/5">
                 <img src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=400" alt="Child using product" className="w-full h-full object-cover" />
               </div>
             </div>

          </div>
          
        </div>
      </div>
    </section>
  )
}



