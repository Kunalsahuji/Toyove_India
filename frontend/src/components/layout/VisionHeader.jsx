import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, ChevronDown, User, Home, LogOut, Globe } from 'lucide-react'
import CartDrawer from '../cart/CartDrawer'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
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

import { countries, languages, mainNavLinks, categoryData } from '../../data/navigationData'
import { getCategoryTree, getNavbarCategories } from '../../services/catalogApi'
import { getStorefrontSettings } from '../../services/siteApi'

const C = '#FF4E50'  
import logo from '../../assets/toyovo.webp'

export function VisionHeader() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [activeMobileSub, setActiveMobileSub] = useState(null)
  
  const [activeMasterCat, setActiveMasterCat] = useState('Musical Toys')
  const [activeMenu, setActiveMenu] = useState(null)
  const [navLinks, setNavLinks] = useState(mainNavLinks)
  const [megaCategoryData, setMegaCategoryData] = useState(categoryData)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({ name: 'India', code: 'IN', currency: 'INR' })
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [promoMessages, setPromoMessages] = useState([
    'Free Shipping On Orders Over ₹999!',
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const buildDynamicNav = async () => {
      try {
        const [navbarPayload, tree] = await Promise.all([
          getNavbarCategories(),
          getCategoryTree(),
        ])

        if (!isMounted) return

        const treeData = {}
        tree.forEach(category => {
          treeData[category.name] = {
            content: [{
              title: 'SHOP BY TYPE',
              items: category.children?.length ? category.children.map(child => child.name) : [category.name],
            }],
            banner: category.bannerImage?.url,
          }
        })

        const navbarCategories = (navbarPayload.categories || []).slice(0, 7)
        const dynamicLinks = [
          { name: 'Home', href: '/', hideOnDesktop: true },
          {
            name: 'ALL CATEGORIES',
            href: '/all-categories',
            mega: {
              type: 'master',
              sidebar: tree.map(category => ({ name: category.name, id: category.slug })),
            },
          },
          ...navbarCategories.map(category => ({
            name: category.name.toUpperCase(),
            href: `/collections/${category.slug}`,
            mega: treeData[category.name] || { content: [{ title: 'SHOP BY TYPE', items: [category.name] }] },
          })),
          { name: 'Contact', href: '/contact', hideOnDesktop: true },
        ]

        setMegaCategoryData({ ...categoryData, ...treeData })
        setNavLinks(dynamicLinks)
        if (tree[0]?.name) setActiveMasterCat(tree[0].name)
      } catch (error) {
        console.warn('Falling back to static navigation data:', error.message)
      }
    }

    buildDynamicNav()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadStorefront = async () => {
      try {
        const data = await getStorefrontSettings()
        if (!isMounted) return
        if (Array.isArray(data.announcementMessages) && data.announcementMessages.length > 0) {
          setPromoMessages(data.announcementMessages)
          setPromoIndex(0)
        }
      } catch {
        // keep fallback header copy
      }
    }

    loadStorefront()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsPastHero(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (mobileOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMobileSub(null)
    setSearchOpen(false)
    setActiveMenu(null)
    setProfileDropdown(false)
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

  const prev = () => {
    setDirection(-1)
    setPromoIndex(i => (i - 1 + promoMessages.length) % promoMessages.length)
  }
  const next = () => {
    setDirection(1)
    setPromoIndex(i => (i + 1) % promoMessages.length)
  }

  // Auto-cycle promo messages
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`)
      setSearchOpen(false)
    }
  }

  const handleLinkClick = () => {
    setActiveMenu(null)
    setMobileOpen(false)
  }

  return (
    <div 
      id="vision-header-root"
      className="relative z-[1100]"
    >
      <div style={{ backgroundColor: C, width: '100%', padding: '7px 0' }} className="relative z-[1300]">
        {/* Desktop Utility Bar (1024px+) */}
        <div className="ann-desk hdr-inner" style={{ gridTemplateColumns: '1fr 1.5fr 1fr', alignItems: 'center' }}>
          <div className="flex items-center gap-4">
            {[FbIcon, IgIcon, XIcon, PtIcon].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#FDF3E7', lineHeight: 0, display: 'flex' }} className="hover:opacity-70 transition-opacity"><Icon /></a>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <button onClick={prev} className="text-white/60 hover:text-white transition-colors z-10"><ChevronLeft size={14} /></button>
            <div className="overflow-hidden h-4 flex items-center min-w-[350px] justify-center relative">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div 
                  key={promoIndex} 
                  custom={direction}
                  variants={{
                    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="flex items-center gap-2 text-[#FDF3E7] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap absolute"
                >
                  <span>⭐</span> {promoMessages[promoIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <button onClick={next} className="text-white/60 hover:text-white transition-colors z-10"><ChevronRight size={14} /></button>
          </div>

          <div className="flex items-center gap-6 justify-end">
            <div className="flex items-center gap-1.5 px-0 py-1 bg-transparent cursor-default">
                <span className="flex items-center justify-center w-5 h-4 bg-[#FF4E50]/10 rounded-sm text-[9px] font-black text-[#FF4E50]">IN</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-white">India</span>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse ml-0.5"></div>
            </div>
            <div className="relative" onMouseEnter={()=>setLangDropdown(true)} onMouseLeave={()=>setLangDropdown(false)}>
                <button className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white hover:opacity-80 transition-all cursor-pointer">
                    <Globe size={11}/> <span>{selectedLang}</span> <ChevronDown size={10} />
                </button>
                <AnimatePresence>
                    {langDropdown && (
                        <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute top-full right-0 mt-1 w-32 bg-[#FDF4E6] shadow-2xl rounded-xl py-2 z-50 border border-black/5 overflow-hidden">
                            {languages.map(l => (
                                <button key={l} onClick={()=>{setSelectedLang(l); setLangDropdown(false)}} className={`w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-white whitespace-nowrap ${selectedLang === l ? 'text-[#E84949]' : 'text-gray-700'}`}>
                                    {l}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Tablet Utility Bar (768px - 1023px) */}
        <div className="ann-tab hdr-inner flex items-center justify-between">
           <div className="flex-1"></div>
           <div className="flex items-center gap-4">
              <button onClick={prev} className="text-[#FDF3E7]/60 hover:text-white transition-colors"><ChevronLeft size={14} /></button>
              <div className="overflow-hidden h-4 flex items-center min-w-[280px] justify-center relative">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div 
                    key={promoIndex} 
                    custom={direction}
                    variants={{
                      enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="flex items-center gap-2 text-[#FDF3E7] text-[11px] font-bold uppercase tracking-wider whitespace-nowrap absolute"
                  >
                    {promoMessages[promoIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button onClick={next} className="text-[#FDF3E7]/60 hover:text-white transition-colors"><ChevronRight size={14} /></button>
           </div>
           <div className="flex-1 flex items-center gap-4 text-white justify-end">
                <Globe size={14}/>
                <span className="text-[11px] font-bold uppercase tracking-widest">IN | {selectedLang.substring(0,3)}</span>
           </div>
        </div>

        {/* Mobile Utility Bar (0 - 767px) */}
        <div className="ann-mob hdr-inner flex items-center justify-center h-[25px]">
            <button onClick={prev} className="w-10 h-full flex items-center justify-start text-[#FDF3E7]/70 hover:text-white transition-colors shrink-0">
              <ChevronLeft size={14} />
            </button>
            <div className="grow overflow-hidden h-full flex items-center justify-center relative">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div 
                  key={promoIndex} 
                  custom={direction}
                  variants={{
                    enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (direction) => ({ x: direction < 0 ? 30 : -30, opacity: 0 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="flex items-center justify-center text-[#FDF3E7] text-[10px] font-bold uppercase tracking-wide text-center absolute w-full px-2"
                >
                  {promoMessages[promoIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
            <button onClick={next} className="w-10 h-full flex items-center justify-end text-[#FDF3E7]/70 hover:text-white transition-colors shrink-0">
              <ChevronRight size={14} />
            </button>
        </div>
      </div>

      <header style={{ backgroundColor: '#FDF3E7', borderBottom: '1px solid #ebebeb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1200 }}>
        <div className="hdr-inner flex items-center h-15 md:h-17.5 relative">
          {/* Mobile Burger: Left-aligned, hidden on 1024px+ */}
          <div className="lg:hidden flex-1 flex items-center">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="p-2 -ml-2 text-[#333] hover:text-[#E84949] transition-colors relative z-[1200]"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="lg:static absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex items-center shrink-0 lg:mr-1 xl:mr-4 z-10">
            <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
              <img src={logo} alt="TOYOVOINDIA" className="h-10 md:h-12 lg:h-11 xl:h-14 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation: Only visible on 1024px+, strictly follows Logo */}
          <nav className="hidden lg:flex items-center justify-center gap-0 xl:gap-0 2xl:gap-0.5 flex-grow h-full px-1 xl:px-1.5">
            {navLinks.filter(l => !l.hideOnDesktop).map(link => (
              <div key={link.name} className={`group/nav py-6 ${link.dropdown ? 'relative' : ''}`} onMouseEnter={() => { setActiveMenu(link.name); if(link.name === 'ALL CATEGORIES') setActiveMasterCat('Musical Toys'); }} onMouseLeave={() => setActiveMenu(null)}>
                <Link to={link.href} onClick={handleLinkClick} className={`flex items-center gap-0.5 px-0.5 xl:px-1 2xl:px-1.5 text-[10px] xl:text-[11px] 2xl:text-[12.5px] font-bold tracking-widest transition-all uppercase whitespace-nowrap font-grandstander ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333] hover:text-[#E84949]'}`}>
                  {link.name} {(link.mega || link.dropdown) && <ChevronDown size={7} className={`${activeMenu === link.name ? 'rotate-180' : ''} transition-transform`} />}
                </Link>
                <AnimatePresence>
                  {activeMenu === link.name && link.mega && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-screen bg-[#FDF4E6] shadow-[0_40px_100px_rgba(0,0,0,0.12)] border-t border-[#ebebeb] flex justify-center z-[1000]"
                      >
                        <div className="w-full max-w-[1400px] flex h-[420px]">
                          {/* Sidebar (Optional) */}
                          {link.mega.type === 'master' ? (
                            <div className="w-72 bg-[#F9EAD3] border-x border-black/5 p-8 space-y-1.5 h-full overflow-y-auto custom-scrollbar shrink-0">
                               {link.mega.sidebar.map(s => (
                                 <button 
                                  key={s.name} 
                                  onClick={() => setActiveMasterCat(s.name)}
                                  className={`w-full text-left px-5 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${activeMasterCat === s.name ? 'bg-[#E84949] text-white shadow-xl shadow-[#E84949]/20' : 'text-[#333] hover:bg-[#FDF4E6] hover:text-[#E84949]'}`}
                                 >
                                   {s.name}
                                 </button>
                               ))}
                            </div>
                          ) : link.mega.sidebar ? (
                            <div className="w-64 bg-[#F9EAD3] border-x border-black/5 p-6 space-y-2 h-full overflow-y-auto shrink-0">
                               {link.mega.sidebar.map(s => (
                                 <button key={s.name} className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${s.active ? 'bg-[#E84949] text-white shadow-lg shadow-[#E84949]/20' : 'text-[#333] hover:bg-[#FDF4E6]'}`}>
                                   {s.name}
                                 </button>
                               ))}
                            </div>
                          ) : null}

                          {/* Main Content Area */}
                          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FDF4E6]">
                            {/* Master Top Header (Optional) */}
                            {link.mega.type === 'master' && (
                              <div className="px-10 pt-8 pb-4 border-b border-black/5 bg-[#FDF4E6]/95 backdrop-blur-md sticky top-0 z-10">
                                <h3 className="text-[#E84949] font-black text-xs tracking-[0.3em] uppercase mb-1">ALL</h3>
                                <div className="w-10 h-[1.5px] bg-[#E84949] rounded-full"></div>
                              </div>
                            )}

                            <div className="flex-1 p-8 xl:p-10 grid grid-cols-4 gap-8 overflow-y-auto custom-scrollbar">
                              <div className="col-span-3 grid grid-cols-3 gap-8 h-max">
                                {(link.mega.type === 'master' ? (megaCategoryData[activeMasterCat]?.content || []) : (Array.isArray(link.mega) ? link.mega : link.mega.content)).map((col, idx) => {
                                  let parentSlug = '';
                                  if (link.name === 'ALL CATEGORIES') {
                                    parentSlug = activeMasterCat?.toLowerCase().replaceAll(' ', '-');
                                  } else {
                                    parentSlug = link.href.split('/').pop();
                                  }
                                  
                                  return (
                                    <div key={idx} className="space-y-6">
                                      {col.title && (
                                        <h4 className="font-grandstander font-black text-[13px] text-[#333] border-b-2 border-dashed border-[#E84949]/20 pb-2 uppercase tracking-[0.2em]">
                                          {col.title}
                                        </h4>
                                      )}
                                      
                                      {col.items && (
                                        <ul className="space-y-2.5">
                                          {col.items.map(item => {
                                            const name = typeof item === 'object' ? item.name : item;
                                            const badge = typeof item === 'object' ? item.badge : null;
                                            const type = typeof item === 'object' ? item.type : 'normal';
                                            const itemSlug = name.toLowerCase().replaceAll(' ', '-');
                                            const finalHref = type === 'link' 
                                              ? `/product/${itemSlug}` 
                                              : `/collections/${parentSlug}/${itemSlug}`;
                                            
                                            return (
                                              <li key={name}>
                                                <Link 
                                                  to={finalHref}
                                                  onClick={handleLinkClick} 
                                                  className={`group/link flex items-center gap-2 text-[11px] transition-all font-bold uppercase tracking-wider ${type === 'link' ? 'text-[#E84949]' : 'text-[#666] hover:text-[#E84949]'}`}
                                                >
                                                  {type !== 'link' && <span className="w-1 h-1 bg-[#E84949]/0 group-hover/link:bg-[#E84949] group-hover/link:w-2 transition-all rounded-full"></span>}
                                                  {name}
                                                  {badge && (
                                                    <span className={`text-[7px] px-1.5 py-0.5 rounded-full text-white font-black uppercase ${badge === 'Hot' ? 'bg-orange-500' : badge === 'Sale' ? 'bg-[#E84949]' : 'bg-blue-500'}`}>
                                                      {badge}
                                                    </span>
                                                  )}
                                                </Link>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      )}

                                      {col.extra && (
                                        <div className="pt-4">
                                          <h4 className="font-grandstander font-black text-[13px] text-[#333] mb-4 border-b-2 border-dashed border-[#E84949]/20 pb-2 uppercase tracking-[0.2em]">
                                            {col.extra.title}
                                          </h4>
                                          <ul className="space-y-2.5">
                                            {col.extra.items.map(i => {
                                              const itemSlug = i.toLowerCase().replaceAll(' ', '-');
                                              return (
                                                <li key={i}>
                                                  <Link to={`/collections/${parentSlug}/${itemSlug}`} className="group/link flex items-center gap-2 text-[11px] text-[#666] hover:text-[#E84949] transition-all font-bold uppercase tracking-wider">
                                                    <span className="w-1 h-1 bg-[#E84949]/0 group-hover/link:bg-[#E84949] group-hover/link:w-2 transition-all rounded-full"></span>
                                                    {i}
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Visual Banner (Optional) */}
                              {(link.mega.type === 'master' ? megaCategoryData[activeMasterCat]?.banner : link.mega.banner) && (
                                <div className="col-span-1 flex flex-col items-center justify-start pt-2">
                                  <div className="rounded-[35px] overflow-hidden aspect-[4/5] relative group/banner cursor-pointer shadow-2xl border-4 border-[#F9EAD3] transform hover:-translate-y-2 transition-all duration-700 w-full">
                                      <img src={link.mega.type === 'master' ? megaCategoryData[activeMasterCat]?.banner : link.mega.banner} alt={link.name} className="w-full h-full object-cover group-hover/banner:scale-110 transition-transform duration-1000" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent p-6 flex flex-col justify-end">
                                        <span className="text-[#E84949] text-[9px] uppercase font-black tracking-[0.3em] mb-1">Featured</span>
                                        <h5 className="text-white font-grandstander text-[15px] font-black uppercase">Collection 2026</h5>
                                      </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  {activeMenu === link.name && link.dropdown && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 w-56 bg-[#FDF4E6] shadow-xl rounded-b-xl border-t border-[#ebebeb] py-2 z-[1000]">
                      {link.dropdown.map(sub => <Link key={sub.name} to={sub.href} onClick={handleLinkClick} className="block px-5 py-2.5 text-[12px] text-[#555] hover:text-[#E84949] hover:bg-[#F9EAD3] transition-all font-bold uppercase tracking-wider">{sub.name}</Link>)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Icons Section: Floated right, maintains spacing on all devices */}
          <div className="flex-1 lg:flex-none flex items-center justify-end gap-1 md:gap-2 shrink-0 ml-auto">
            {/* Desktop Search Bar (Static only on LG+) */}
            <div className="hidden lg:block mr-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-16 xl:w-28 2xl:w-36 h-8 bg-[#F9EAD3] border border-dashed border-[#333]/25 rounded-xl px-2 xl:px-4 py-1.5 text-[9px] xl:text-[11px] 2xl:text-[12px] font-medium outline-none focus:border-[#E84949] transition-all placeholder:text-[#333]/40"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#333]/40"><Search size={13} /></button>
              </form>
            </div>

            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 lg:hidden text-[#333] hover:text-[#E84949] transition-colors"><Search size={22} /></button>
            
            <button 
              onClick={() => setCartOpen(true)} 
              className="p-2 text-[#333] hover:text-[#E84949] transition-colors relative"
            >
              <ShoppingCart size={22} />
              {/* Dynamic Badge Synchronized with Cart Logic */}
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E84949] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Account Icon: Shown only on desktops LG+ */}
            <div className="relative hidden lg:block" onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
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
                                    <Link to="/login" onClick={handleLinkClick} className="block w-full py-3 bg-[#E84949] text-white text-center text-[11px] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] transition-all shadow-sm">Sign In</Link>
                                    <Link to="/register" onClick={handleLinkClick} className="block w-full py-3 border-2 border-[#333] text-[#333] text-center text-[11px] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] hover:text-white transition-all">Register</Link>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="px-5 pb-4 border-b border-[#333]/10 mb-2"><p className="text-[13px] font-grandstander font-bold text-[#333] mb-0.5">{user.firstName} {user.lastName}</p><p className="text-[11px] text-[#666] truncate">{user.email}</p></div>
                                    <Link to="/account" onClick={handleLinkClick} className="flex items-center gap-3 px-5 py-3 text-[12px] font-bold text-[#333] hover:text-[#E84949] hover:bg-[#F9EAD3] transition-all uppercase tracking-wider"><User size={16}/> My Account</Link>
                                    <button onClick={() => { logout(); handleLinkClick(); }} className="w-full flex items-center gap-3 px-5 py-3 text-[12px] font-bold text-[#E84949] hover:bg-[#E84949] hover:text-white transition-all uppercase tracking-wider"><LogOut size={16}/> Log out</button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Search Overlay (Limited Height) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }} 
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 right-0 bg-[#FDF4E6] z-[900] shadow-2xl border-t border-black/5 overflow-hidden"
            >
               <div className="p-4 md:p-6 lg:hidden">
                  <div className="flex justify-end mb-2">
                    <button onClick={() => setSearchOpen(false)} className="p-2"><X size={24} className="text-brand-ink/40" /></button>
                  </div>
                  
                  <div className="relative">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder="Search" 
                            className="w-full h-11 bg-[#F9EAD3] border-2 border-dashed border-[#333]/15 rounded-xl px-4 pr-12 text-[15px] font-medium outline-none focus:border-[#E84949] transition-all" 
                            autoFocus 
                          />
                          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-ink/40 shadow-none"><Search size={19} /></button>
                        </div>
                    </form>

                    <div className="mt-4 flex flex-wrap items-baseline gap-2">
                       <p className="text-[14px] font-bold text-brand-ink border-b-2 border-brand-ink leading-tight">Popular Search:</p>
                       <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {['Toys', 'Games'].map(tag => (
                            <button 
                              key={tag}
                              onClick={() => { setSearchTerm(tag); navigate(`/search?q=${tag}`); setSearchOpen(false); }}
                              className="text-[14px] font-medium text-brand-ink/60 hover:text-[#E84949] transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                       </div>
                    </div>

                    <AnimatePresence>
                        {suggestions.length > 0 && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} 
                              animate={{ opacity: 1, y: 0 }} 
                              className="mt-6 space-y-3 pb-4"
                            >
                                {suggestions.map(p => (
                                    <Link key={p.id} to={`/product/${p.name.toLowerCase().replaceAll(' ', '-')}`} onClick={handleLinkClick} className="flex items-center gap-3 p-2 rounded-xl bg-white/30 hover:bg-white transition-all shadow-xs">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-black/5"><img src={p.img} alt={p.name} className="w-full h-full object-cover" /></div>
                                        <div className="grow"><h5 className="text-[14px] font-bold text-[#333] tracking-tight">{p.name}</h5><p className="text-[11px] text-[#999] mt-0.5 font-bold">${p.price}</p></div>
                                        <Search size={14} className="text-gray-300 mr-2" />
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Cart Drawer - Moved outside header stacking context to prevent header poke-through */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/40 z-[1000]" />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed top-[calc(25px+60px)] md:top-[calc(25px+70px)] left-0 bottom-0 w-[85%] max-w-[320px] bg-[#FDF4E6] z-[1050] flex flex-col shadow-2xl border-t border-black/5"
            >
              <div className="overflow-y-auto grow">
                <div className="py-4">
                  {user && (
                      <div className="px-6 py-4 bg-[#F9EAD3]/50 mb-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#E84949] text-white rounded-full flex items-center justify-center font-grandstander font-bold text-xl uppercase">{user.firstName[0]}</div>
                        <div>
                          <p className="text-[14px] font-bold text-[#333] capitalize">{user.firstName} {user.lastName}</p>
                          <Link to="/account" onClick={handleLinkClick} className="text-[11px] font-bold text-[#E84949] uppercase tracking-widest">My Account</Link>
                        </div>
                      </div>
                  )}
                  
                  {navLinks.map(link => (
                    <div key={link.name}>
                      <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]/5">
                        <Link to={link.href} onClick={handleLinkClick} className={`text-[13px] font-bold tracking-widest uppercase transition-colors ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333]'}`}>{link.name}</Link>
                        {(link.name === 'Contact' ? false : (link.mega || link.dropdown)) && (
                          <button onClick={() => setActiveMobileSub(activeMobileSub === link.name ? null : link.name)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${activeMobileSub === link.name ? 'bg-[#E84949] text-white rotate-180' : 'bg-[#F9EAD3] text-[#333]'}`}>
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                      {(link.mega || link.dropdown) && activeMobileSub === link.name && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-[#F9EAD3]/30 px-8 py-4 space-y-4">
                          {link.mega ? (
                            link.mega.type === 'master' ? (
                              <div className="flex flex-col gap-3">
                                {link.mega.sidebar.map(item => (
                                  <Link 
                                    key={item.id} 
                                    to={`/collections/${item.id || item.name.toLowerCase().replaceAll(' ', '-')}`} 
                                    onClick={handleLinkClick} 
                                    className="flex items-center justify-between text-[13px] text-[#333] font-bold hover:text-[#E84949] transition-colors py-1"
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={12} className="opacity-30" />
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              (Array.isArray(link.mega) ? link.mega : (link.mega.content || [])).map((col, cidx) => (
                                <div key={cidx}>
                                  {col.title && <h5 className="text-[10px] font-bold text-[#666] uppercase mb-2 tracking-widest">{col.title}</h5>}
                                  {col.items && (
                                    <div className="flex flex-col gap-2">
                                      {col.items.map(item => {
                                        const name = typeof item === 'object' ? item.name : item;
                                        const badge = typeof item === 'object' ? item.badge : null;
                                        const type = typeof item === 'object' ? item.type : 'normal';
                                        return (
                                          <Link 
                                            key={name} 
                                            to={type === 'link' ? `/product/${name.toLowerCase().replaceAll(' ', '-')}` : `/collections/${name.toLowerCase().replaceAll(' ', '-')}`} 
                                            onClick={handleLinkClick} 
                                            className="flex items-center justify-between text-[12px] text-[#333] font-bold hover:text-[#E84949] transition-colors"
                                          >
                                            <span>{name}</span>
                                            {badge && (
                                              <span className={`text-[7px] px-1.5 py-0.5 rounded-full text-white font-black uppercase ${badge === 'Hot' ? 'bg-orange-500' : badge === 'Sale' ? 'bg-[#E84949]' : 'bg-blue-500'}`}>
                                                {badge}
                                              </span>
                                            )}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              ))
                            )
                          ) : (
                            (link.dropdown || []).map(sub => (
                              <Link key={sub.name} to={sub.href} onClick={handleLinkClick} className="block text-[12px] text-[#333] font-bold hover:text-[#E84949] transition-colors">{sub.name}</Link>
                            ))
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Menu Footer Content Integrated into Single Scroll */}
                <div className="bg-[#FDF3E7]">
                  <div className="px-6 py-5 border-b border-[#333]/5">
                    <Link to={user ? "/account" : "/login"} onClick={handleLinkClick} className="flex items-center gap-3 text-[13px] font-bold text-[#333] uppercase tracking-widest">
                      <User size={18} className="text-[#333]" />
                      <span>{user ? 'My Account' : 'Log in'}</span>
                    </Link>
                  </div>
                  <div className="px-6 py-5 border-b border-[#333]/5 flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#333]/5 rounded-lg border border-[#333]/10">
                      <span className="flex items-center justify-center w-5 h-4 bg-[#FF4E50]/10 rounded-sm text-[9px] font-black text-[#FF4E50]">IN</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-[#333]">India</span>
                    </div>

                    
                    <div className="relative">
                      <button onClick={() => setLangDropdown(!langDropdown)} className="flex items-center gap-1.5 text-[10px] font-bold text-[#333] uppercase tracking-wider">
                        <Globe size={12} className="opacity-40" />
                        <span className="whitespace-nowrap">{selectedLang}</span>
                        <ChevronDown size={12} className="opacity-40" />
                      </button>
                      <AnimatePresence>
                          {langDropdown && (
                              <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute bottom-full left-0 mb-2 w-32 bg-white shadow-2xl rounded-xl py-2 z-50 border border-black/5 overflow-hidden">
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

                  <div className="px-6 py-8 flex items-center gap-6">
                    {[FbIcon, IgIcon, XIcon, PtIcon].map((Icon, i) => (
                      <a key={i} href="#" className="text-[#333] hover:text-[#E84949] transition-colors">
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
