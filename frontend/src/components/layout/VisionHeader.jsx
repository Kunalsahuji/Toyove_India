import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, ChevronDown, User, Home, LogOut, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { products } from '../../utils/ProductData'

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
const promoMessages = [PROMO, 'Free Shipping On Orders Over ₹999!', 'New Arrivals Every Week — Shop Now']

const countries = [
    { name: 'United States', code: 'US', currency: 'USD' },
    { name: 'India', code: 'IN', currency: 'INR' },
    { name: 'United Kingdom', code: 'GB', currency: 'GBP' },
    { name: 'Canada', code: 'CA', currency: 'CAD' },
    { name: 'Australia', code: 'AU', currency: 'AUD' },
]

const languages = ['English', 'Hindi', 'French', 'Spanish', 'German']

const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Dolls', 
    href: '/collections/dolls', 
    mega: [
      { title: 'Type', items: ['Baby Dolls', 'Fashion Dolls', 'Doll Houses & Accessories', 'Plush / Soft Dolls', 'Interactive / Talking Dolls', 'Cultural / Traditional Dolls', 'Mini Dolls & Collectibles'] },
      { title: 'Age Group', items: ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years'] },
      { title: 'Featured', banner: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop' }
    ]
  },
  { 
    name: 'Educational Toy', 
    href: '/collections/educational-toy', 
    mega: [
      { title: 'Learning Outcomes', items: ['STEM Toys', 'Montessori Toys', 'Brain Development Toys', 'Learning Kits', 'Coding Toys', 'Memory & Skill Development', 'DIY Learning Kits'] },
      { title: 'Interests', items: ['Creative Play', 'Outdoor Play', 'Pretend Play', 'Science & Exploration'] },
      { title: 'New Arrival', banner: 'https://images.unsplash.com/photo-1685358279653-868c0b99fe6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]
  },
  { 
    name: 'Games And Puzzle', 
    href: '/collections/games-and-puzzle', 
    mega: [
      { title: 'Format & Difficulty', items: ['Jigsaw Puzzles', 'Board Games', 'Card Games', 'Strategy Games', '3D Puzzles', 'Brain Teasers', 'Family Games', 'Solo Games'] },
      { title: 'Budget', items: ['Under ₹499', '₹500-₹999', '₹1000-₹1999', '₹2000+'] },
      { title: 'Best Seller', banner: 'https://images.unsplash.com/photo-1637120149073-54319e6f9fc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    ]
  },
  { 
    name: 'Vehicles Toys', 
    href: '/collections/vehicles-toys', 
    mega: [
      { title: 'Mechanism', items: ['Remote Control (RC) Vehicles', 'Die-Cast Models', 'Battery Operated Vehicles', 'Construction Vehicles', 'Racing Cars', 'Trucks & Utility Vehicles', 'Airplanes & Helicopters', 'Train Sets'] },
      { title: 'Quick Links', items: ['New In Vehicles', 'Top Rated RC', 'Vehicles Deals'] },
      { title: 'Speed', banner: 'https://images.unsplash.com/photo-1632435188816-1277a374e696?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
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
import logo from '../../assets/logo.svg'

export function VisionHeader() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [activeMobileSub, setActiveMobileSub] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [countryDropdown, setCountryDropdown] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > 150)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMobileSub(null)
    setSearchOpen(false)
    setActiveMenu(null)
    setProfileDropdown(false)
    setCountryDropdown(false)
    setLangDropdown(false)
    setSearchTerm('')
    setSuggestions([])
  }, [location])

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5)
        setSuggestions(filtered)
    } else {
        setSuggestions([])
    }
  }, [searchTerm])

  const prev = () => setPromoIndex(i => (i - 1 + promoMessages.length) % promoMessages.length)
  const next = () => setPromoIndex(i => (i + 1) % promoMessages.length)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      {/* Top Utility Bar */}
      <div style={{ backgroundColor: C, width: '100%', padding: '7px 0' }} className="relative z-200">
        <div className="ann-desk hdr-inner" style={{ gridTemplateColumns: '1fr 1.5fr 1fr', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {[FbIcon, IgIcon, XIcon, PtIcon].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#FDF3E7', lineHeight: 0, display: 'flex' }} className="hover:opacity-70 transition-opacity"><Icon /></a>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <button onClick={prev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}><ChevronLeft size={13} /></button>
            <div style={{ overflow: 'hidden', height: '16px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.span key={promoIndex} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.22 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FDF3E7', fontSize: '11.5px', fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '10px' }}>⭐</span> {promoMessages[promoIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <button onClick={next} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}><ChevronRight size={13} /></button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'flex-end' }}>
            {/* Country Dropdown */}
            <div className="relative" onMouseEnter={()=>setCountryDropdown(true)} onMouseLeave={()=>setCountryDropdown(false)}>
                <button className="flex items-center gap-1.5 color-[#FDF3E7] text-[11px] font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                    <span className="flex items-center justify-center w-4 h-3 bg-white/20 rounded-sm overflow-hidden text-[8px] font-bold">{selectedCountry.code}</span>
                    <span className="text-white">{selectedCountry.name}</span> <ChevronDown size={10} className="text-white" />
                </button>
                <AnimatePresence>
                    {countryDropdown && (
                        <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute top-full right-0 mt-1 w-48 bg-white shadow-2xl rounded-xl py-2 z-50 border border-gray-100 overflow-hidden">
                            {countries.map(c => (
                                <button key={c.code} onClick={()=>{setSelectedCountry(c); setCountryDropdown(false)}} className={`w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-[#FDF4E6] flex items-center justify-between ${selectedCountry.code === c.code ? 'text-[#E84949]' : 'text-gray-700'}`}>
                                    {c.name} <span className="text-[10px] opacity-40">{c.currency}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Language Dropdown */}
            <div className="relative" onMouseEnter={()=>setLangDropdown(true)} onMouseLeave={()=>setLangDropdown(false)}>
                <button className="flex items-center gap-1 color-[#FDF3E7] text-[11px] font-bold uppercase tracking-wider text-white hover:opacity-80 transition-all cursor-pointer">
                    <Globe size={11} className="text-white"/> <span>{selectedLang}</span> <ChevronDown size={10} className="text-white" />
                </button>
                <AnimatePresence>
                    {langDropdown && (
                        <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute top-full right-0 mt-1 w-32 bg-white shadow-2xl rounded-xl py-2 z-50 border border-gray-100 overflow-hidden">
                            {languages.map(l => (
                                <button key={l} onClick={()=>{setSelectedLang(l); setLangDropdown(false)}} className={`w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-[#FDF4E6] ${selectedLang === l ? 'text-[#E84949]' : 'text-gray-700'}`}>
                                    {l}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <header style={{ backgroundColor: '#FDF3E7', borderBottom: '1px solid #ebebeb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="hdr-inner flex items-center justify-between h-15 md:h-17.5">
          <div className="lg:hidden w-10">
            <button onClick={() => setMobileOpen(true)} className="text-[#333] hover:text-[#E84949] transition-colors"><Menu size={24} /></button>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Toyove" className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105" />
          </Link>

          <nav className="hidden lg:flex items-center gap-0 xl:gap-1">
            {mainNavLinks.map(link => (
              <div key={link.name} className="relative group/nav py-6" onMouseEnter={() => setActiveMenu(link.name)} onMouseLeave={() => setActiveMenu(null)}>
                <Link to={link.href} className={`flex items-center gap-1 px-2.5 text-[12px] font-bold tracking-widest transition-all uppercase ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333] hover:text-[#E84949]'}`}>
                  {link.name} {(link.mega || link.dropdown) && <ChevronDown size={11} className={`${activeMenu === link.name ? 'rotate-180' : ''} transition-transform`} />}
                </Link>
                <AnimatePresence>
                  {activeMenu === link.name && link.mega && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-1/2 -translate-x-1/2 w-200 xl:w-250 bg-[#FDF4E6] shadow-2xl rounded-b-3xl border-t-2 border-[#E84949] p-8 grid grid-cols-4 gap-8 z-50 overflow-hidden">
                      {link.mega.map((col, idx) => (
                        <div key={idx} className="col-span-1">
                          {col.title && <h4 className="font-grandstander font-bold text-[13px] text-[#333] mb-5 border-b border-[#333]/10 pb-2 uppercase tracking-widest">{col.title}</h4>}
                          {col.items && (
                            <ul className="space-y-2">
                              {col.items.map(item => <li key={item}><Link to={`/collections/${item.toLowerCase().replaceAll(' ', '-')}`} className="text-[12px] text-[#555] p-2 -mx-2 rounded-lg hover:text-[#E84949] hover:bg-[#F9EAD3] hover:translate-x-1 transition-all block font-bold capitalize">{item}</Link></li>)}
                            </ul>
                          )}
                          {col.banner && (
                            <Link to={link.href} className="rounded-2xl overflow-hidden aspect-4/5 relative group/banner cursor-pointer shadow-md block">
                              <img src={col.banner} alt={col.title} className="w-full h-full object-cover group-hover/banner:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent p-4 flex flex-col justify-end"><span className="text-white text-[9px] uppercase font-bold tracking-widest">New Collection</span><h5 className="text-white font-grandstander text-[13px] font-bold">Shop {link.name}</h5></div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeMenu === link.name && link.dropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-56 bg-[#FDF4E6] shadow-xl rounded-b-xl border-t-2 border-[#E84949] py-2 z-50">
                      {link.dropdown.map(sub => <Link key={sub.name} to={sub.href} className="block px-5 py-2.5 text-[12px] text-[#555] hover:text-[#E84949] hover:bg-[#F9EAD3] transition-all font-bold uppercase tracking-wider">{sub.name}</Link>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-[#333] hover:text-[#E84949] transition-colors"><Search size={22} /></button>
            <Link to="/cart" className="p-2 text-[#333] hover:text-[#E84949] transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E84949] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </Link>
            <div className="relative" onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
                <Link to={user ? "/account" : "/login"} className="p-2 text-[#333] hover:text-[#E84949] transition-colors flex items-center gap-2 group/user">
                    <User size={22} />
                    {user && <span className="hidden xl:block text-[11px] font-bold uppercase tracking-widest text-[#333] group-hover/user:text-[#E84949]">{user.firstName}</span>}
                </Link>
                <AnimatePresence>
                    {profileDropdown && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 w-56 bg-[#FDF4E6] shadow-2xl rounded-b-3xl border-t-2 border-[#E84949] py-4 z-50 overflow-hidden">
                            {!user ? (
                                <div className="px-4 space-y-3">
                                    <p className="text-[10px] font-bold text-[#666] tracking-widest uppercase mb-2">Welcome back!</p>
                                    <Link to="/login" className="block w-full py-3 bg-[#E84949] text-white text-center text-[11px] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] transition-all shadow-sm">Sign In</Link>
                                    <Link to="/register" className="block w-full py-3 border-2 border-[#333] text-[#333] text-center text-[11px] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] hover:text-white transition-all">Register</Link>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="px-5 pb-4 border-b border-[#333]/10 mb-2"><p className="text-[13px] font-grandstander font-bold text-[#333] mb-0.5">{user.firstName} {user.lastName}</p><p className="text-[11px] text-[#666] truncate">{user.email}</p></div>
                                    <Link to="/account" className="flex items-center gap-3 px-5 py-3 text-[12px] font-bold text-[#333] hover:text-[#E84949] hover:bg-[#F9EAD3] transition-all uppercase tracking-wider"><User size={16}/> My Account</Link>
                                    <button onClick={() => logout()} className="w-full flex items-center gap-3 px-5 py-3 text-[12px] font-bold text-[#E84949] hover:bg-[#E84949] hover:text-white transition-all uppercase tracking-wider"><LogOut size={16}/> Log out</button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#FDF4E6] border-t border-[#333]/10 relative z-200">
               <div className="max-w-350 mx-auto px-4 md:px-10 py-6">
                  <div className="relative" ref={searchRef}>
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for toys..." 
                            className="w-full h-14 bg-[#F9EAD3] border-none rounded-full px-8 text-[16px] outline-none placeholder-[#666]" 
                            autoFocus 
                        />
                        <button type="submit" className="absolute right-2 top-2 bottom-2 w-12 bg-[#E84949] text-white rounded-full flex items-center justify-center hover:bg-[#333] transition-colors"><Search size={20} /></button>
                    </form>

                    {/* Live Search Suggestions (Google-style) */}
                    <AnimatePresence>
                        {suggestions.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white shadow-2xl rounded-3xl border border-gray-100 overflow-hidden z-50 p-4"
                            >
                                <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.2em] px-4 mb-3">Popular Suggestions</p>
                                <div className="space-y-1">
                                    {suggestions.map(p => (
                                        <Link 
                                            key={p.id}
                                            to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`}
                                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FDF4E6] transition-all group"
                                        >
                                            <div className="w-12 h-12 bg-[#F9EAD3] rounded-xl overflow-hidden shrink-0 border border-gray-100 p-0.5">
                                                <img src={p.img} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                                            </div>
                                            <div className="grow">
                                                <h5 className="text-[14px] font-bold text-[#333] group-hover:text-[#E84949] transition-colors leading-tight">{p.name}</h5>
                                                <p className="text-[11px] text-[#999] font-medium capitalize mt-0.5">{p.category.replaceAll('-', ' ')}</p>
                                            </div>
                                            <div className="text-[14px] font-bold text-[#E84949]">${p.price}</div>
                                            <Search size={14} className="text-gray-300 group-hover:text-[#E84949] transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-50 px-4 flex justify-between items-center text-[11px] font-bold text-[#666] tracking-widest uppercase">
                                    <span>{suggestions.length} products found</span>
                                    <button onClick={handleSearchSubmit} className="text-[#E84949] hover:underline">View all results</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/40 z-200" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-[#FDF4E6] z-210 flex flex-col shadow-2xl">
              <div className="p-6 flex items-center justify-between border-b border-[#333]/10"><img src={logo} alt="Toyove" className="h-8 w-auto" /><button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-[#E84949] text-white flex items-center justify-center"><X size={18} /></button></div>
              <div className="overflow-y-auto grow py-4">
                {user && (
                    <div className="px-6 py-4 bg-[#F9EAD3]/50 mb-4 flex items-center gap-4"><div className="w-12 h-12 bg-[#E84949] text-white rounded-full flex items-center justify-center font-grandstander font-bold text-xl uppercase">{user.firstName[0]}</div><div><p className="text-[14px] font-bold text-[#333] capitalize">{user.firstName} {user.lastName}</p><Link to="/account" className="text-[11px] font-bold text-[#E84949] uppercase tracking-widest">My Account</Link></div></div>
                )}
                {mainNavLinks.map(link => (
                  <div key={link.name}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]/5"><Link to={link.href} className={`text-[13px] font-bold tracking-widest uppercase transition-colors ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333]'}`}>{link.name}</Link>{(link.mega || link.dropdown) && (<button onClick={() => setActiveMobileSub(activeMobileSub === link.name ? null : link.name)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${activeMobileSub === link.name ? 'bg-[#E84949] text-white rotate-180' : 'bg-[#F9EAD3] text-[#333]'}`}><ChevronDown size={14} /></button>)}</div>
                    {(link.mega || link.dropdown) && activeMobileSub === link.name && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-[#F9EAD3]/30 px-8 py-4 space-y-4">{link.mega ? link.mega.map((col, cidx) => (<div key={cidx}>{col.title && <h5 className="text-[10px] font-bold text-[#666] uppercase mb-2 tracking-widest">{col.title}</h5>}{col.items && (<div className="flex flex-col gap-2">{col.items.map(i => <Link key={i} to={`/collections/${i.toLowerCase().replaceAll(' ', '-')}`} className="text-[12px] text-[#333] font-bold hover:text-[#E84949] transition-colors">{i}</Link>)}</div>)}</div>)) : link.dropdown.map(sub => (<Link key={sub.name} to={sub.href} className="block text-[12px] text-[#333] font-bold hover:text-[#E84949] transition-colors">{sub.name}</Link>))}</motion.div>)}
                  </div>
                ))}
                {!user && (<div className="px-6 py-8 space-y-3"><Link to="/login" className="block w-full py-4 bg-[#E84949] text-white text-center text-[13px] font-bold rounded-xl tracking-widest uppercase shadow-lg">Sign In</Link><Link to="/register" className="block w-full py-4 border-2 border-[#333] text-[#333] text-center text-[13px] font-bold rounded-xl tracking-widest uppercase">Create Account</Link></div>)}
                {user && (<div className="px-6 py-4"><button onClick={() => logout()} className="w-full flex items-center justify-center gap-3 py-4 text-[13px] font-bold text-[#E84949] uppercase tracking-widest border border-[#E84949]/20 rounded-xl"><LogOut size={18}/> Log out</button></div>)}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isPastHero && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FDF4E6] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] z-150 px-4 py-2 border-t border-[#333]/10 flex items-center justify-between"><Link to="/" className="flex flex-col items-center gap-1 min-w-16"><Home size={18} className={location.pathname === '/' ? 'text-[#E84949]' : 'text-[#666]'} /><span className="text-[9px] font-bold uppercase tracking-widest">Home</span></Link><button onClick={() => setMobileOpen(true)} className="flex flex-col items-center gap-1 min-w-16"><Menu size={18} className="text-[#666]" /><span className="text-[9px] font-bold uppercase tracking-widest">Menu</span></button><div className="relative -top-6"><Link to="/search" className="w-12 h-12 bg-[#E84949] text-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#FDF4E6]"><Search size={20} /></Link></div><Link to="/account" className="flex flex-col items-center gap-1 min-w-16"><User size={18} className={location.pathname === '/account' || location.pathname === '/login' ? 'text-[#E84949]' : 'text-[#666]'} /><span className="text-[9px] font-bold uppercase tracking-widest">User</span></Link><Link to="/cart" className="flex flex-col items-center gap-1 min-w-16"><ShoppingCart size={18} className={location.pathname === '/cart' ? 'text-[#E84949]' : 'text-[#666]'} /><span className="text-[9px] font-bold uppercase tracking-widest">Cart</span></Link></motion.div>
      )}
    </>
  )
}
