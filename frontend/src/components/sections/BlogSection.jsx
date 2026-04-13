import { motion } from 'framer-motion'

const posts = [
  {
    date: 'MARCH 28, 2024',
    author: 'ICHHA RAVAL',
    title: 'The Perfect Toyove India Theme For Baby And Kids',
    excerpt: 'Discover Toyove India, the ultimate theme crafted specifically for baby shops and kids\' toy stores.',
    img: 'https://plus.unsplash.com/premium_photo-1701984401558-d314227bb38f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    date: 'MARCH 20, 2024',
    author: 'ICHHA RAVAL',
    title: 'Transform Your Online Toy Store With Toyove India',
    excerpt: 'Discover Toyove India, the ultimate Shopify 2.0 theme crafted specifically for baby shops and kids\' toy.',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=500',
  },
  {
    date: 'MARCH 18, 2024',
    author: 'ICHHA RAVAL',
    title: 'Why Toyove India Is the Best Theme For Baby Stores',
    excerpt: 'Discover Toyove India, the ultimate theme crafted specifically for baby shops and kids\' toy stores.',
    img: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?auto=format&fit=crop&q=80&w=500',
  },
]

export function BlogSection() {
  return (
    <section className="py-14 md:py-20 bg-brand-cream border-t border-brand-ink/5">
      <div className="shell">
        <div className="text-center mb-12">
          <p className="text-brand-purple font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Latest News</p>
          <h2 className="font-serif text-[28px] md:text-[42px] font-bold text-brand-ink tracking-tight">From The Blog</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image wrapped in Dashed Box */}
              <div className="dashed-card p-2 md:p-3 mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg">
                <div className="aspect-[4/2.5] md:aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Text content floating below */}
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-brand-orange text-[10px] font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {post.date}
                  </span>
                  <span className="text-brand-muted text-[10px] font-medium tracking-wide">• {post.author}</span>
                </div>
                <h3 className="font-playful text-[17px] md:text-[19px] font-bold text-brand-ink mb-3 group-hover:text-brand-purple transition-colors leading-[1.2] tracking-tight">
                  {post.title}
                </h3>
                <p className="text-[13px] text-brand-muted leading-[1.6] line-clamp-2 md:line-clamp-3">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
