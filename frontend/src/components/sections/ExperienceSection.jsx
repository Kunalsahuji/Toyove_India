import { motion } from 'framer-motion'
import { CheckCircle2, Zap, ShieldCheck, Clock } from 'lucide-react'

export function ExperienceSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-shell">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Left Side: Editorial Context */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
               <span className="text-brand-orange font-bold text-[13px] tracking-[0.2em] uppercase">
                  Premium Experience
               </span>
               <h2 className="font-serif-display text-[32px] md:text-[54px] text-brand-purple leading-tight font-bold">
                  Designed for <br /> modern parents.
               </h2>
               <p className="text-brand-muted text-[16px] leading-relaxed max-w-[500px]">
                  Toyove India isn’t just about products; it’s about the experience. From 3D visuals to lightning-fast checkouts, we’ve built every detail for you.
               </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {[
                 { icon: ShieldCheck, title: "Verified Items", desc: "Every toy is hand-checked for quality." },
                 { icon: Zap, title: "Fast Checkout", desc: "Slide-out Ajax cart for ultimate speed." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <item.icon className="h-6 w-6 text-brand-orange shrink-0" />
                    <div>
                       <h4 className="font-bold text-brand-purple mb-1 uppercase text-[12px]">{item.title}</h4>
                       <p className="text-[13px] text-brand-muted">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Side: Stacked UI Widgets (Exact Copy of Vision Assets) */}
          <div className="flex-1 relative w-full pt-10">
            {/* The Main "Hurry Up" Widget */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-gray-100 relative z-20"
            >
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-red-500" />
                     </div>
                     <div>
                        <p className="text-red-500 font-bold text-[14px]">Hurry Up!</p>
                        <p className="text-brand-muted text-[12px]">Only 20 items left in stock</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-serif-display font-bold text-brand-purple text-[24px]">$45.00</p>
                     <p className="text-[11px] text-brand-muted line-through">$60.00</p>
                  </div>
               </div>

               {/* Quality Badge Widget */}
               <div className="p-4 bg-brand-purple/5 rounded-3xl flex items-center gap-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-purple" />
                  <span className="text-[13px] font-bold text-brand-purple uppercase tracking-wider">
                     High-Fidelity Product Guaranteed
                  </span>
               </div>
            </motion.div>

            {/* Background Decorative "Floating" elements */}
            <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 right-0 h-40 w-40 bg-brand-orange/5 rounded-full blur-3xl"
            />
            <motion.div
               animate={{ x: [0, 20, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 -left-10 h-60 w-60 bg-brand-purple/5 rounded-full blur-3xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
