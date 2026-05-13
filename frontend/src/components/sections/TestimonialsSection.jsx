import { useState, useEffect, useRef } from 'react'
import { motion, animate, useMotionValue } from 'framer-motion'
import { getRecentReviews } from '../../services/reviewApi'

// Fallback data in case DB is empty initially
const fallbackReviews = [
  {
    _id: 'f1',
    comment: "The quality of the toys is exceptional. My kids love the soft toys, especially the panda plush!",
    userName: "JEMIS P",
    role: "Verified Parent",
    rating: 5,
  },
  {
    _id: 'f2',
    comment: "Fast delivery and great customer support. The musical duck is the best gift for toddlers.",
    userName: "SARAH L",
    role: "Happy Customer",
    rating: 5,
  }
]

export function TestimonialsSection() {
  const [reviews, setReviews] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getRecentReviews()
        if (data && data.length > 0) {
          // Double/Triple for infinite scroll
          setReviews([...data, ...data, ...data])
        } else {
          setReviews([...fallbackReviews, ...fallbackReviews, ...fallbackReviews])
        }
      } catch (err) {
        setReviews([...fallbackReviews, ...fallbackReviews, ...fallbackReviews])
      }
    }
    loadReviews()

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initial Position Logic
  useEffect(() => {
    if (containerRef.current && reviews.length > 0) {
        const itemWidth = containerRef.current.offsetWidth / (isMobile ? 1 : 2)
        const initialX = -(itemWidth * (reviews.length / 3))
        x.set(initialX)
    }
  }, [isMobile, reviews])

  const handleDragEnd = (event, info) => {
    if (reviews.length === 0) return
    const itemWidth = containerRef.current.offsetWidth / (isMobile ? 1 : 2)
    const threshold = itemWidth / 4
    const offset = info.offset.x
    const velocity = info.velocity.x

    let direction = 0
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      direction = offset > 0 ? -1 : 1
    }

    const currentX = x.get()
    const targetX = Math.round(currentX / itemWidth - direction) * itemWidth

    animate(x, targetX, {
      type: "spring",
      bounce: 0.15,
      duration: 0.6,
      onComplete: () => {
        const originalCount = reviews.length / 3
        const totalWidth = itemWidth * originalCount
        if (targetX <= -(totalWidth * 2)) {
            x.set(targetX + totalWidth)
        } else if (targetX >= -totalWidth / 2) {
            x.set(targetX - totalWidth)
        }
      }
    })
  }

  if (reviews.length === 0) return null

  return (
    <section className="bg-[#6449A4] relative overflow-hidden border-y border-dashed border-white/20 select-none">
      <div 
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing h-full"
      >
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          onDragEnd={handleDragEnd}
          className="flex h-full"
        >
          {reviews.map((t, i) => (
            <div 
              key={`${t._id}-${i}`}
              className="flex-shrink-0 w-full md:w-1/2 px-8 md:px-16 lg:px-24 py-14 md:py-20 flex flex-col gap-6 border-r border-dashed border-white/30 last:border-r-0 h-full"
            >
              {/* Quote Icon */}
              <div className="text-white/40">
                 <svg width="45" height="32" viewBox="0 0 45 35" fill="currentColor">
                    <path d="M13.5 0C6 0 0 6 0 13.5C0 21 4.5 31.5 13.5 34.5V27C9 25.5 7.5 21 7.5 18H13.5V0H13.5ZM39 0C31.5 0 25.5 6 25.5 13.5C25.5 21 30 31.5 39 34.5V27C34.5 25.5 33 21 33 18H39V0H39Z" />
                 </svg>
              </div>

              <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] font-medium tracking-tight">
                {t.comment}
              </p>

              <div className="flex flex-col gap-4 mt-auto">
                {/* Stars */}
                <div className="flex gap-1.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-white text-[16px]">
                      {j < t.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 text-white font-bold text-[13px] tracking-[0.2em] uppercase">
                  <span>{t.userName}</span>
                  <span className="opacity-40">-</span>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
