import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const posts = [
  {
    date: 'March 28, 2024',
    author: 'Ichha Raval',
    title: 'The Perfect TOYOVOINDIA India Theme For Baby And Kids',
    excerpt: 'Discover TOYOVOINDIA India, the ultimate theme crafted specifically for baby shops and kids\' toy stores.',
    img: 'https://plus.unsplash.com/premium_photo-1701984401558-d314227bb38f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    date: 'March 20, 2024',
    author: 'Ichha Raval',
    title: 'Transform Your Online Toy Store With TOYOVOINDIA India',
    excerpt: 'Discover TOYOVOINDIA India, the ultimate Shopify 2.0 theme crafted specifically for baby shops and kids\' toy.',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=500',
  },
  {
    date: 'March 18, 2024',
    author: 'Ichha Raval',
    title: 'Why TOYOVOINDIA India Is the Best Theme For Baby Stores',
    excerpt: 'Discover TOYOVOINDIA India, the ultimate theme crafted specifically for baby shops and kids\' toy stores.',
    img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=500',
  },
]

const allPosts = [...posts, ...posts] // 6 elements creating 2 distinct pages

export function BlogSection() {
  const scrollRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Fluid physics-based Mouse Dragging logic strictly mimicking native browser swiping
  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.scrollBehavior = 'auto' // Instant 1:1 mapping while pushing
    scrollRef.current.style.scrollSnapType = 'none'
  }

  const handleMouseOut = () => {
    if (!isDragging.current) return
    isDragging.current = false
    scrollRef.current.style.scrollSnapType = 'x mandatory'
    scrollRef.current.style.scrollBehavior = 'smooth'
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    scrollRef.current.style.scrollSnapType = 'x mandatory'
    scrollRef.current.style.scrollBehavior = 'smooth'
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // 1.5 velocity offset scaling
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  // Interval Native Scroll Automated Playback
  useEffect(() => {
    const timer = setInterval(() => {
      if (!scrollRef.current || isDragging.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const maxScroll = scrollWidth - clientWidth
      const itemWidth = scrollRef.current.children[0]?.clientWidth || 300 // Grabs literal component width structurally

      let nextScroll = scrollLeft + itemWidth

      if (nextScroll >= maxScroll - 10) {
        nextScroll = 0 // Instant linear smooth backwards rewind precisely mirroring expectations
      }

      scrollRef.current.style.scrollBehavior = 'smooth'
      scrollRef.current.scrollTo({ left: nextScroll })
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-10 md:py-12 border-t border-gray-100 bg-[#FDF3E7]">
      <div className="shell overflow-hidden">
        <div className="text-center mb-12">
          <p className="text-[#FF4E50] font-medium text-[11px] tracking-[0.25em] mb-2 font-roboto uppercase">Latest News</p>
          <h2 className="font-grandstander text-[28px] md:text-[42px] font-bold text-[#222] tracking-tight">From The Blog</h2>
        </div>

        <div className="relative w-full">
          {/* Natively controlled Scroll Container with structural boundaries */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide select-none cursor-grab active:cursor-grabbing w-full pb-4 items-stretch"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseOut}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {allPosts.map((post, i) => (
              <div key={i} className="flex-none snap-start snap-always w-full md:w-1/2 lg:w-1/3 px-3 md:px-4 lg:px-5">
                <article className="group flex flex-col h-full">
                  <div className="dashed-card bg-white p-0 overflow-hidden mb-5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg shadow-sm border border-dashed border-gray-300 rounded-lg hover:p-0 hover:m-0 hover:border-0 hover:shadow-none hover:rounded-none hover:bg-white">
                    <div className="aspect-[4/2.5] md:aspect-4/3 bg-gray-100 w-full relative overflow-hidden rounded-[4px]">
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5 }}
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover pointer-events-none " // Hard disables native browser ghost-dragging
                      />
                    </div>
                  </div>

                  <div className="px-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#FF4E50] text-[10px] font-semibold flex items-center gap-1 font-roboto uppercase tracking-wider">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {post.date}
                      </span>
                      <span className="text-gray-400 text-[10px] font-medium tracking-wide">• {post.author}</span>
                    </div>
                    <h3 className="font-grandstander text-[17px] md:text-[19px] font-bold text-[#222] mb-3 group-hover:text-[#FF4E50] transition-colors leading-[1.2] tracking-tight">
                      {post.title}
                    </h3>
                    <p className="font-roboto text-[13px] text-gray-500 leading-[1.6] line-clamp-2 md:line-clamp-3 italic opacity-90">{post.excerpt}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
