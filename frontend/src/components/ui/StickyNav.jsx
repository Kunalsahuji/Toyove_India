import { motion } from 'framer-motion'
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react'

export function StickyNav() {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search' },
    { icon: Heart, label: 'Wishlist' },
    { icon: ShoppingBag, label: 'Bag' },
    { icon: User, label: 'Log In' }
  ]

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: 'spring', damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] md:hidden w-[90%] max-w-[400px]"
    >
      <div className="bg-brand-ink/90 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border border-white/10">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center gap-1 group relative transition-transform active:scale-90"
          >
            <item.icon 
              className={`h-5 w-5 ${item.active ? 'text-brand-orange' : 'text-white/60 group-hover:text-white'}`} 
            />
            <span className={`text-[10px] font-medium ${item.active ? 'text-white' : 'text-white/40'}`}>
              {item.label}
            </span>
            
            {item.active && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -top-1 h-1 w-1 bg-brand-orange rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
