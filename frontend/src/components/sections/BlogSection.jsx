import { motion } from 'framer-motion'

const posts = [
  {
    date: 'MARCH 28, 2024',
    author: 'ICHHA RAVAL',
    title: 'The Perfect Toyove India Theme For Baby And Kids',
    excerpt: 'Discover Toyove India, the ultimate theme crafted specifically for baby shops and kids\' toy stores.',
    img: 'https://images.unsplash.com/photo-1519706173010-86ec16353d82?auto=format&fit=crop&q=80&w=500',
  },
  {
    date: 'MARCH 20, 2024',
    author: 'ICHHA RAVAL',
    title: 'Transform Your Online Toy Store With Toyove India',
    excerpt: 'Discover Toyove India, the ultimate Shopify 2.0 theme crafted specifically for baby shops and kids\' toy.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=500',
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
    <section className="py-14 md:py-20 bg-brand-cream">
      <div className="shell">
        <div className="text-center mb-12">
          <p className="text-brand-purple font-bold text-[11px] tracking-[0.25em] uppercase mb-2">Latest News</p>
          <h2 className="font-serif text-[28px] md:text-[42px] font-bold text-brand-ink">From The Blog</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-gray-100">
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-brand-orange text-[10px] font-bold">📅 {post.date}</span>
                <span className="text-brand-muted text-[10px]">• {post.author}</span>
              </div>
              <h3 className="font-serif text-[16px] md:text-[18px] font-bold text-brand-ink mb-2 group-hover:text-brand-purple transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-[12px] text-brand-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
