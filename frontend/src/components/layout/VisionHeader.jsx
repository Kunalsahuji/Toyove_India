import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, ChevronDown, User, Heart, Home, Repeat } from 'lucide-react'

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const PtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
)

const PROMO = '10% off your next order, use code : TOYOVE001'

const promoMessages = [
  PROMO,
  'Free Shipping On Orders Over ₹999!',
  'New Arrivals Every Week — Shop Now',
]

const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Dolls', 
    href: '/product/dolls', 
    mega: [
      { title: 'Type', items: ['Baby Dolls', 'Fashion Dolls', 'Doll Houses & Accessories', 'Plush / Soft Dolls', 'Interactive / Talking Dolls', 'Cultural / Traditional Dolls', 'Mini Dolls & Collectibles'] },
      { title: 'Age Group', items: ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years'] },
      { title: 'Featured', banner: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  { 
    name: 'Educational Toy', 
    href: '/product/educational', 
    mega: [
      { title: 'Learning Outcomes', items: ['STEM Toys', 'Montessori Toys', 'Brain Development Toys', 'Learning Kits', 'Coding Toys', 'Memory & Skill Development', 'DIY Learning Kits'] },
      { title: 'Interests', items: ['Creative Play', 'Outdoor Play', 'Pretend Play', 'Science & Explora'] },
      { title: 'New Arrival', banner: 'https://images.unsplash.com/photo-1587654780291-39c940c174ad?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  { 
    name: 'Games And Puzzle', 
    href: '/product/games', 
    mega: [
      { title: 'Format & Difficulty', items: ['Jigsaw Puzzles', 'Board Games', 'Card Games', 'Strategy Games', '3D Puzzles', 'Brain Teasers', 'Family Games', 'Solo Games'] },
      { title: 'Budget', items: ['Under ₹499', '₹500-₹999', '₹1000-₹1999', '₹2000+'] },
      { title: 'Best Seller', banner: 'https://images.unsplash.com/photo-1611996591259-77aed21af86a?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  { 
    name: 'Vehicles Toys', 
    href: '/product/vehicles', 
    mega: [
      { title: 'Mechanism', items: ['Remote Control (RC) Vehicles', 'Die-Cast Models', 'Battery Operated Vehicles', 'Construction Vehicles', 'Racing Cars', 'Trucks & Utility Vehicles', 'Airplanes & Helicopters', 'Train Sets'] },
      { title: 'Quick Links', items: ['New In Vehicles', 'Top Rated RC', 'Vehicles Deals'] },
      { title: 'Speed', banner: 'https://images.unsplash.com/photo-1581235720704-06d3acfc1c6f?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  { 
    name: 'Pages', 
    href: '#', 
    dropdown: [
      { name: 'FAQ', href: '/pages/faq' },
      { name: 'Privacy Policy', href: '/pages/privacy-policy' },
      { name: 'Shipping Policy', href: '/pages/shipping-policy' },
      { name: 'Terms & Conditions', href: '/pages/terms-conditions' },
      { name: 'Return & Exchange', href: '/pages/return-exchange' }
    ]
  },
  { name: 'Contact', href: '/contact' },
]

const C = '#FF4E50'  
const P = '#6651A4'  

import logo from '../../assets/logo.svg'

export function VisionHeader() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [activeMobileSub, setActiveMobileSub] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const prev = () => setPromoIndex(i => (i - 1 + promoMessages.length) % promoMessages.length)
  const next = () => setPromoIndex(i => (i + 1) % promoMessages.length)

  return (
    <>
      <div style={{ backgroundColor: C, width: '100%', padding: '7px 0' }}>
        <div className="ann-desk hdr-inner" style={{ gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {[FbIcon, IgIcon, XIcon, PtIcon].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#FDF3E7', lineHeight: 0, display: 'flex' }} className="hover:opacity-70 transition-opacity"><Icon /></a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <button onClick={prev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}>
              <ChevronLeft size={13} />
            </button>
            <div style={{ overflow: 'hidden', height: '16px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.span key={promoIndex} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.22 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FDF3E7', fontSize: '11.5px', fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '10px' }}>⭐</span> {promoMessages[promoIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <button onClick={next} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}>
              <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'flex-end' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', color: '#FDF3E7', fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>
              United States <ChevronDown size={11} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', color: '#FDF3E7', fontSize: '11px', fontWeight: 500 }}>
              English <ChevronDown size={11} />
            </button>
          </div>
        </div>
        <div className="md:hidden flex justify-center py-0.5">
           <p className="text-[#FDF3E7] text-[10px] font-medium tracking-wider uppercase">⭐ {PROMO} ⭐</p>
        </div>
      </div>

      <header style={{ backgroundColor: '#FDF3E7', borderBottom: '1px solid #ebebeb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="hdr-inner flex items-center justify-between h-[60px] md:h-[76px]">
          {/* Mobile hamburger */}
          <div className="lg:hidden w-[40px]">
            <button onClick={() => setMobileOpen(true)} className="text-[#333] hover:text-[#E84949] transition-colors"><Menu size={24} /></button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Toyove" className="h-8 md:h-11 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Nav - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavLinks.map(link => (
              <div key={link.name} className="relative group/nav py-6">
                <Link to={link.href} className={`flex items-center gap-1 px-3 text-[13px] font-bold tracking-widest transition-all uppercase ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333] hover:text-[#E84949]'}`}>
                  {link.name} {(link.mega || link.dropdown) && <ChevronDown size={12} className="group-hover/nav:rotate-180 transition-transform" />}
                </Link>

                {/* Mega Menu */}
                {link.mega && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] xl:w-[1000px] bg-white shadow-2xl rounded-b-[24px] border-t-[2px] border-[#E84949] opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 p-8 grid grid-cols-4 gap-8 pointer-events-auto">
                    {link.mega.map((col, idx) => (
                      <div key={idx} className={col.banner ? "col-span-1" : "col-span-1"}>
                        {col.title && <h4 className="font-grandstander font-bold text-[14px] text-[#333] mb-5 border-b border-gray-100 pb-2 uppercase tracking-widest">{col.title}</h4>}
                        {col.items && (
                          <ul className="space-y-3">
                            {col.items.map(item => (
                              <li key={item}>
                                <Link to="/" className="text-[13px] text-[#666] hover:text-[#E84949] hover:translate-x-1 transition-all block font-medium">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {col.banner && (
                          <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group/banner cursor-pointer shadow-md">
                            <img src={col.banner} alt={col.title} className="w-full h-full object-cover group-hover/banner:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                              <span className="text-white text-[10px] uppercase font-bold tracking-widest">New Collection</span>
                              <h5 className="text-white font-grandstander text-[14px] font-bold">Shop {link.name}</h5>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Simple Dropdown */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-xl border-t-2 border-[#E84949] opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 py-2">
                    {link.dropdown.map(sub => (
                      <Link key={sub.name} to={sub.href} className="block px-5 py-2.5 text-[13px] text-[#666] hover:text-[#E84949] hover:bg-[#FDF4E6] transition-all font-medium">{sub.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#333] hover:text-[#E84949] transition-colors"><Search size={22} /></button>
            <Link to="/wishlist" className="p-2 text-[#333] hover:text-[#E84949] transition-colors relative">
              <Heart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E84949] text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
            </Link>
            <button className="p-2 text-[#333] hover:text-[#E84949] transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E84949] text-white text-[9px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <Link to="/account" className="hidden md:block p-2 text-[#333] hover:text-[#E84949] transition-colors"><User size={22} /></Link>
          </div>
        </div>

        {/* Desktop Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white border-t border-gray-100">
               <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-6">
                  <div className="relative">
                    <input type="text" placeholder="Search for toys..." className="w-full h-14 bg-[#F9EAD3] border-none rounded-full px-8 text-[16px] outline-none" autoFocus />
                    <button className="absolute right-2 top-2 bottom-2 w-12 bg-[#E84949] text-white rounded-full flex items-center justify-center hover:bg-[#333] transition-colors"><Search size={20} /></button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/40 z-[200]" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-[#FDF4E6] z-[210] flex flex-col shadow-2xl">
              <div className="p-6 flex items-center justify-between border-b border-[#333]/10">
                <img src={logo} alt="Toyove" className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-[#E84949] text-white flex items-center justify-center"><X size={18} /></button>
              </div>
              <div className="overflow-y-auto flex-grow py-4">
                {mainNavLinks.map(link => (
                  <div key={link.name}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]/5 group">
                      <Link to={link.href} className={`text-[14px] font-bold tracking-widest uppercase transition-colors ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333]'}`}>{link.name}</Link>
                      {(link.mega || link.dropdown) && (
                        <button onClick={() => setActiveMobileSub(activeMobileSub === link.name ? null : link.name)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${activeMobileSub === link.name ? 'bg-[#E84949] text-white rotate-180' : 'bg-[#F9EAD3] text-[#333]'}`}>
                          <ChevronDown size={16} />
                        </button>
                      )}
                    </div>
                    {(link.mega || link.dropdown) && activeMobileSub === link.name && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-white/50 px-8 py-4 space-y-4">
                        {link.mega ? link.mega.map((col, cidx) => (
                           <div key={cidx}>
                             {col.title && <h5 className="text-[11px] font-bold text-[#666] uppercase mb-2 tracking-widest">{col.title}</h5>}
                             {col.items && (
                               <div className="flex flex-col gap-2">
                                 {col.items.map(i => <Link key={i} to="/" className="text-[13px] text-[#333] font-medium">{i}</Link>)}
                               </div>
                             )}
                           </div>
                        )) : link.dropdown.map(sub => (
                           <Link key={sub.name} to={sub.href} className="block text-[13px] text-[#333] font-medium">{sub.name}</Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-[#333]/10 bg-white">
                 <div className="flex gap-4">
                   <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#333] hover:bg-[#E84949] hover:text-white transition-all"><FbIcon /></a>
                   <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#333] hover:bg-[#E84949] hover:text-white transition-all"><IgIcon /></a>
                   <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#333] hover:bg-[#E84949] hover:text-white transition-all"><XIcon /></a>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Mobile Dock */}
      {isPastHero && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)] z-[150] px-4 py-2 border-t border-gray-100 flex items-center justify-between">
           <Link to="/" className="flex flex-col items-center gap-1 min-w-[64px]">
             <Home size={20} className={location.pathname === '/' ? 'text-[#E84949]' : 'text-[#666]'} />
             <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Home</span>
           </Link>
           <button onClick={() => setMobileOpen(true)} className="flex flex-col items-center gap-1 min-w-[64px]">
             <Menu size={20} className="text-[#666]" />
             <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Menu</span>
           </button>
           <div className="relative -top-6">
              <Link to="/search" className="w-14 h-14 bg-[#E84949] text-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#FDF4E6]">
                 <Search size={22} />
              </Link>
           </div>
           <Link to="/wishlist" className="flex flex-col items-center gap-1 min-w-[64px]">
             <Heart size={20} className={location.pathname === '/wishlist' ? 'text-[#E84949]' : 'text-[#666]'} />
             <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Wish</span>
           </Link>
           <button className="flex flex-col items-center gap-1 min-w-[64px]">
             <ShoppingCart size={20} className="text-[#666]" />
             <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Cart</span>
           </button>
        </motion.div>
      )}
    </>
  )
}
