import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "Toyove-India has been a game-changer for our nursery. The quality of the sustainable toys is unmatched, and the design aesthetic perfectly complements our modern home.",
    name: "EMMA RICHARDSON",
    role: "Happy parent",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    quote: "The interactive learning kits we purchased have sparked so much curiosity in our toddlers. Fast shipping and excellent customer support every single time!",
    name: "DAVID MILLER",
    role: "Preschool Educator",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    quote: "I was looking for unique baby shower gifts and found the most adorable plush collection here. The dashboard navigation made shopping so easy and delightful.",
    name: "SOPHIA CHEN",
    role: "Regular Customer",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 4,
    quote: "Enterprise-level quality for children's toys. The attention to detail in the wooden vehicle series is superior. Highly recommended for collectors too!",
    name: "MARCUS THOMPSON",
    role: "Toy Collector",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
]

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    if (isMobile) {
      setIndex((prev) => (prev + 1) % testimonials.length)
    } else {
      setIndex((prev) => (prev + 2 < testimonials.length ? prev + 2 : 0))
    }
  }

  const prevSlide = () => {
    if (isMobile) {
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    } else {
      setIndex((prev) => (prev - 2 >= 0 ? prev - 2 : testimonials.length - 2))
    }
  }

  const visibleTestimonials = isMobile 
    ? [testimonials[index]] 
    : [testimonials[index], testimonials[(index + 1) % testimonials.length]]

  return (
    <section className="bg-brand-cream py-20 relative overflow-hidden font-roboto border-t border-dashed border-[#333]/10">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

      <div className="shell relative z-10">
        <div className="text-center mb-12">
            <p className="text-brand-orange font-bold text-[11px] tracking-[0.25em] mb-3 uppercase">World Of Customers</p>
            <h2 className="font-grandstander text-[32px] md:text-[45px] font-bold text-brand-ink leading-tight">What They're Saying</h2>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-12">
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-[-10px] md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-orange hover:text-white transition-all z-20 border border-dashed border-[#333]/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-[-10px] md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-orange hover:text-white transition-all z-20 border border-dashed border-[#333]/10"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden">
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {visibleTestimonials.map((t, i) => (
                <div 
                  key={`${t.id}-${i}`}
                  className="bg-white p-8 md:p-10 rounded-[32px] border-[1.5px] border-dashed border-[#333]/15 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
                >
                  <div className="absolute top-6 right-8 text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors">
                    <Quote size={60} fill="currentColor" stroke="none" />
                  </div>

                  <div className="flex gap-0.5 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} className={`${j < t.stars ? 'text-brand-orange fill-brand-orange' : 'text-gray-200'}`} />
                    ))}
                  </div>

                  <p className="text-[#555] text-[15px] md:text-[17px] leading-[1.7] font-medium mb-8 italic relative z-10">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-dashed border-gray-100 pt-6">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-brand-orange/20 p-1 bg-white">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                      <h4 className="font-grandstander font-bold text-[16px] text-brand-ink uppercase tracking-wider">{t.name}</h4>
                      <p className="text-[12px] font-bold text-brand-orange/70 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: isMobile ? testimonials.length : Math.ceil(testimonials.length / 2) }).map((_, i) => (
               <button 
                key={i} 
                onClick={() => setIndex(isMobile ? i : i * 2)}
                className={`h-2 transition-all duration-300 rounded-full ${index === (isMobile ? i : i * 2) ? 'w-8 bg-brand-orange' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
               />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
