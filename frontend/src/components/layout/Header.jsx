import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

import logo from '../../assets/toyovo.webp'
import { Link } from 'react-router-dom'

export function Header({ cartCount }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)

  const navItems = [
    { name: 'Jewellery & Accessories', subItems: ['Necklaces', 'Earrings', 'Bags & Purses'] },
    { name: 'Clothing & Shoes', subItems: ['Dresses', 'T-shirts', 'Shoes'] },
    { name: 'Home & Living', subItems: ['Decor', 'Wall Art', 'Lighting'] },
    { name: 'Toys & Entertainment', subItems: ['Toys', 'Games', 'Books'] },
    { name: 'Art & Collectibles', subItems: ['Prints', 'Sculptures'] }
  ]

  return (
    <header className="w-full z-50 bg-white border-b border-gray-100 ">
      {/* 1. Announcement Bar (Animated) */}
      <div className="bg-brand-purple text-white py-2 text-center text-[13px] font-medium tracking-wide">
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hurry up! Save 20% on all orders over $100.
        </motion.p>
      </div>

      <div className="container-shell">
        {/* 2. Main Navbar Row */}
        <div className="flex items-center justify-between py-4 gap-4 md:gap-8">

          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-1 hover:bg-[#FDF4E6] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-brand-ink" />
            </button>
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="TOYOVOINDIA Logo"
                className="h-8 md:h-10 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-brand-orange font-serif-display font-bold text-[24px] md:text-[28px] tracking-tight">
                TOYOVOINDIA
              </span>
            </Link>
          </div>

          {/* Search Pill (Centered) */}
          <div className="flex-grow max-w-[600px] hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full h-11 bg-gray-100 border-2 border-transparent rounded-full px-12 text-[15px] outline-none transition-all focus:bg-white focus:border-brand-purple focus:shadow-lg focus:shadow-brand-purple/5"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted group-focus-within:text-brand-purple transition-colors" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-brand-orange text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all active:scale-95">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
              <User className="h-6 w-6 text-brand-ink" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="h-6 w-6 text-brand-ink" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-brand-orange rounded-full" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="h-6 w-6 text-brand-ink" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-brand-orange text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Desktop Navigation (MegaMenu Style) */}
        <nav className="hidden md:flex items-center justify-center gap-6 pb-2 relative">
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className="group py-2"
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="flex items-center gap-1.5 text-[14px] font-medium text-brand-ink hover:text-brand-purple transition-colors">
                {item.name}
              </button>

              {/* Simple Animated Underline */}
              <motion.div
                className="h-0.5 bg-brand-purple rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </div>
          ))}
        </nav>
      </div>

      {/* 4. Mobile Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white md:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-brand-orange font-serif-display font-bold text-[24px]">TOYOVOINDIA</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-7 w-7 text-brand-ink" />
                </button>
              </div>

              <div className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button className="flex items-center justify-between w-full text-[18px] font-bold text-brand-ink">
                      {item.name}
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
