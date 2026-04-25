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

const PROMO = '10% off your next order, use code : TOYOVOINDIA001'
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
  { name: 'Home', href: '/', hideOnDesktop: true },
  { name: 'About', href: '/about', hideOnDesktop: true },
  { 
    name: 'ALL CATEGORIES', 
    href: '/all-categories', 
    mega: [
      { title: 'CLOTHING & ESSENTIALS', items: ['Jhablas', 'Vests', 'Briefs & Boxers', 'Socks', 'Swim Wear', 'Bath Time', 'Athleisure', 'Thermals', 'Sweaters', 'Rainwear'] },
      { title: 'FOOTWEAR', items: ['Flip Flops', 'Clogs', 'Casual Shoes', 'Sandals', 'Sneakers', 'School Shoes', 'LED Shoes'] },
      { title: 'SHOP BY PRICE', items: ['Under 199', 'Under 299', 'Under 399', 'Under 499'] },
      { title: 'SHOP BY BRANDS', items: ['Babyhug', 'Babyoye', 'Pine Kids', 'Carter\'s'] }
    ]
  },
  { 
    name: 'BOY FASHION', 
    href: '/collections/boy-fashion', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          { name: 'Sets & Suits', badge: 'Hot' }, 
          { name: 'T-Shirts' }, 
          { name: 'Shorts' }, 
          { name: 'Onesies' }, 
          { name: 'Nightwear' }, 
          { name: 'Jeans & Trousers' }, 
          { name: 'Ethnic Wear', badge: 'Sale' }, 
          { name: 'Party Wear' },
          { name: 'Shirts' },
          { name: 'Innerwear' }
        ] 
      },
      { 
        title: 'SHOP BY COLLECTION', 
        items: [
          { name: 'Bestsellers', badge: 'New' }, 
          { name: 'Multi-packs' }, 
          { name: 'Swimming Essentials' }, 
          { name: 'Baby Essentials' }
        ],
        extra: {
          title: 'FASHION ACCESSORIES',
          items: ['Sunglasses', 'Watches', 'Smart Watches', 'Ties', 'Bags']
        }
      },
      { 
        title: 'SHOP BY AGE', 
        items: ['0-3 Months', '3-6 Months', '2-4 Years', '4-6 Years', '8+ Years'],
        extra: {
          title: 'SHOP BY PRICE',
          items: ['Under 199', 'Under 299', 'Under 399', 'Under 499']
        }
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'Babyoye', 'Pine Kids', 'Carter\'s', 'Earthy Touch', 'Cute Walk', 'Bonfino'] 
      },
      { banner: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/19629172a.webp' }
    ]
  },
  { 
    name: 'GIRL FASHION', 
    href: '/collections/girl-fashion', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          { name: 'Frocks & Dresses', badge: 'Hot' }, 
          { name: 'Sets & Suits' }, 
          { name: 'Tops & T-shirts' }, 
          { name: 'Shorts & Skirts' }, 
          { name: 'Jumpsuits & Dungarees' }, 
          { name: 'Pajamas & Leggings' },
          { name: 'Ethnic Wear', badge: 'Sale' },
          { name: 'Party Wear' }
        ] 
      },
      { 
        title: 'SHOP BY COLLECTION', 
        items: [
          { name: 'Bestsellers', badge: 'New' }, 
          { name: 'Multi-packs' }, 
          { name: 'Beach Wear' }, 
          { name: 'Birthday Boutique' }
        ],
        extra: {
          title: 'FASHION ACCESSORIES',
          items: ['Hair Bands', 'Hair Clips', 'Jewellery', 'Bags']
        }
      },
      { 
        title: 'SHOP BY AGE', 
        items: ['0-3 Months', '3-6 Months', '2-4 Years', '4-6 Years', '8+ Years'],
        extra: {
          title: 'SHOP BY PRICE',
          items: ['Under 199', 'Under 299', 'Under 399', 'Under 499']
        }
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'Babyoye', 'Pine Kids', 'Carter\'s', 'Hello Kitty', 'Disney'] 
      },
      { banner: 'https://images.pexels.com/photos/32328596/pexels-photo-32328596.jpeg' }
    ]
  },
  { 
    name: 'FOOTWEAR', 
    href: '/collections/footwear', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Flip Flops', 'Clogs', 'Casual Shoes', 'Sandals', 'Booties', 'Sneakers', 'Ballerinas', 'Sports Shoes', 'School Shoes'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Pine Kids', 'Cute Walk', 'Babyhug', 'Crocs', 'Skechers', 'Adidas'] 
      },
      { 
        title: 'DON\'T MISS', 
        items: ['Sock Shoes', 'Stockings & Tights', 'Plush Footwear', 'Jibbitz'] 
      },
      { banner: 'https://images.pexels.com/photos/37052023/pexels-photo-37052023.jpeg' }
    ]
  },
  { 
    name: 'TOYS', 
    href: '/collections/toys', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          { name: 'Musical Toys', badge: 'New' }, 
          { name: 'Learning & Educational', badge: 'Hot' }, 
          { name: 'Soft Toys' }, 
          { name: 'Indoor & Outdoor Play' }, 
          { name: 'Blocks & Construction' }, 
          { name: 'Puzzles' }
        ] 
      },
      { 
        title: 'RIDE-ONS & SCOOTERS', 
        items: ['Battery Operated', 'Manual Push', 'Scooters', 'Tricycles', 'Bicycles'] 
      },
      { 
        title: 'BOARD GAMES', 
        items: ['IQ Games', 'Ludo', 'Snakes & Ladders', 'Monopoly'],
        extra: {
          title: 'SHOP BY AGE',
          items: ['0-2 Years', '2-4 Years', '4-6 Years', '6-8 Years', '8-12 Years']
        }
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Hot Wheels', 'Barbie', 'LEGO', 'Fisher-Price', 'Funskool', 'Nerf'] 
      },
      { banner: 'https://images.pexels.com/photos/27660140/pexels-photo-27660140.jpeg' }
    ]
  },
  { 
    name: 'DIAPERING', 
    href: '/collections/diapering', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Diaper Pants', 'Taped Diapers', 'Wipes', 'Cloth Nappies', 'Bed Protectors', 'Diaper Bags', 'Potty Chairs & Seats'] 
      },
      { 
        title: 'BABY DIAPER BY SIZE', 
        items: ['NB/XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'Huggies', 'Pampers', 'MamyPoko', 'Supples', 'Little\'s'] 
      },
      { 
        title: 'SHOP BY PRICE', 
        items: ['Under 199', 'Under 499', 'Under 999', '1000 & Above'] 
      },
      { banner: 'https://images.pexels.com/photos/32139255/pexels-photo-32139255.jpeg' }
    ]
  },
  { 
    name: 'GEAR', 
    href: '/collections/gear', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: [
          { name: 'Strollers & Prams', badge: 'Hot' }, 
          { name: 'Ride-ons' }, 
          { name: 'Tricycles' }, 
          { name: 'Walkers' }, 
          { name: 'Bouncers & Swings' }, 
          { name: 'High Chairs' }, 
          { name: 'Car Seats' }, 
          { name: 'Baby Carriers' }
        ] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'LuvLap', 'R for Rabbit', 'Mee Mee', 'Chicco', 'Graco', 'Joie'] 
      },
      { 
        title: 'FEATURED', 
        items: ['New Arrivals', 'Best Sellers', 'Deals of the Day'] 
      },
      { banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/11506302a.webp' }
    ]
  },
  { 
    name: 'FEEDING', 
    href: '/collections/feeding', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Baby Food & Formula', 'Feeding Bottles', 'Breast Feeding', 'Sippers & Cups', 'Bibs & Hankies', 'Teethers', 'Sterilizers'] 
      },
      { 
        title: 'KIDS FOODS', 
        items: [
          { name: 'Dry Fruits', badge: 'Sale' }, 
          { name: 'Snacks' }, 
          { name: 'Vitamin Gummies', badge: 'New' }, 
          { name: 'Health Supplements' }
        ] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Cerelac', 'Aptamil', 'Philips Avent', 'Dr. Brown\'s', 'Pigeon'] 
      },
      { banner: 'https://images.pexels.com/photos/36214982/pexels-photo-36214982.jpeg' }
    ]
  },
  { 
    name: 'BATH', 
    href: '/collections/bath', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Lotions', 'Oils & Powders', 'Soaps & Body Wash', 'Shampoos', 'Bath Tubs & Bathers', 'Grooming Essentials', 'Bath Towels'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Mamaearth', 'Himalaya', 'Johnson\'s', 'Sebamed', 'Aveeno', 'Cetaphil'] 
      },
      { banner: 'https://images.pexels.com/photos/35979966/pexels-photo-35979966.jpeg' }
    ]
  },
  { 
    name: 'NURSERY', 
    href: '/collections/nursery', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Cots & Cradles', 'Blankets & Quilts', 'Baby Bedding Sets', 'Wardrobes & Storage', 'Kids Room Furniture', 'Room Decor'] 
      },
      { 
        title: 'SHOP BY BRANDS', 
        items: ['Babyhug', 'Pine Kids', 'Kinder Valley', 'IKEA', 'Lullaby'] 
      },
      { banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/20139636a.webp' }
    ]
  },
  { 
    name: 'MOMS', 
    href: '/collections/moms', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Nursing/Sleep Wear', 'Maternity Dresses', 'Maternity Lingerie', 'Bottom wear', 'Personal Care'] 
      },
      { 
        title: 'NEW MOM ESSENTIALS', 
        items: ['Breast Feeding support', 'Nutrition & Lactation Boosters', 'Body Pillows'] 
      },
      { banner: 'https://cdn.fcglcdn.com/brainbees/images/products/zoom/22333906a.webp' }
    ]
  },
  { 
    name: 'HEALTH', 
    href: '/collections/health', 
    mega: [
      { 
        title: 'SHOP BY CATEGORY', 
        items: ['Cleansers & Detergents', 'Oral Care', 'Childproofing & Safety', 'Medical Care', 'Mosquito Repellents'] 
      },
      { banner: 'https://images.pexels.com/photos/31212340/pexels-photo-31212340.jpeg' }
    ]
  },
  { 
    name: 'BOUTIQUES', 
    href: '/collections/boutiques', 
    mega: [
      { 
        title: 'SECTIONS', 
        items: ['New Today', 'Bestsellers', 'Last Day Sales'] 
      },
      { 
        title: 'BRANDS', 
        items: ['International Brands', 'Mompreneur Brands', 'Top Indian Brands'] 
      },
      { banner: 'https://images.pexels.com/photos/15170532/pexels-photo-15170532.jpeg'}
    ]
  },
  { name: 'Contact', href: '/contact', hideOnDesktop: true },
]

const C = '#FF4E50'  
import logo from '../../assets/toyovo.webp'

export function VisionHeader() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [activeMobileSub, setActiveMobileSub] = useState(null)
  
  const [activeMenu, setActiveMenu] = useState(null)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [countryDropdown, setCountryDropdown] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

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
            <div className="relative" onMouseEnter={()=>setCountryDropdown(true)} onMouseLeave={()=>setCountryDropdown(false)}>
                <button className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                    <span className="flex items-center justify-center w-4 h-3 bg-white/20 rounded-sm text-[8px] font-bold">{selectedCountry.code}</span>
                    <span>{selectedCountry.name}</span> <ChevronDown size={10} />
                </button>
                <AnimatePresence>
                    {countryDropdown && (
                        <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute top-full right-0 mt-1 w-48 bg-[#FDF3E7] shadow-2xl rounded-xl py-2 z-50 border border-black/5 overflow-hidden">
                            {countries.map(c => (
                                <button key={c.code} onClick={()=>{setSelectedCountry(c); setCountryDropdown(false)}} className={`w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-white flex items-center justify-between whitespace-nowrap ${selectedCountry.code === c.code ? 'text-[#E84949]' : 'text-gray-700'}`}>
                                    {c.name} <span className="text-[10px] opacity-40 ml-2">{c.currency}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
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
                <span className="text-[11px] font-bold uppercase">{selectedCountry.code} | {selectedLang.substring(0,3)}</span>
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
            {mainNavLinks.filter(l => !l.hideOnDesktop).map(link => (
              <div key={link.name} className="group/nav py-6" onMouseEnter={() => setActiveMenu(link.name)} onMouseLeave={() => setActiveMenu(null)}>
                <Link to={link.href} onClick={handleLinkClick} className={`flex items-center gap-0.5 px-0.5 xl:px-0.5 2xl:px-2 text-[8.5px] xl:text-[9px] 2xl:text-[10.5px] font-bold tracking-widest transition-all uppercase whitespace-nowrap font-grandstander ${location.pathname === link.href ? 'text-[#E84949]' : 'text-[#333] hover:text-[#E84949]'}`}>
                  {link.name} {(link.mega || link.dropdown) && <ChevronDown size={6} className={`${activeMenu === link.name ? 'rotate-180' : ''} transition-transform`} />}
                </Link>
                <AnimatePresence>
                  {activeMenu === link.name && link.mega && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 15 }} 
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[1100px] xl:w-[1200px] 2xl:w-[1300px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.2)] rounded-b-3xl border-t-4 border-[#E84949] p-10 grid grid-cols-5 gap-8 z-[1000]"
                      >
                      {link.mega.map((col, idx) => (
                        <div key={idx} className="col-span-1">
                          {col.title && (
                            <h4 className="font-grandstander font-extrabold text-[12px] text-[#333] mb-6 border-b-2 border-dashed border-[#E84949]/20 pb-2 uppercase tracking-[0.2em]">
                              {col.title}
                            </h4>
                          )}
                          
                          {col.items && (
                            <ul className="space-y-3 mb-8">
                              {col.items.map(item => {
                                const name = typeof item === 'object' ? item.name : item;
                                const badge = typeof item === 'object' ? item.badge : null;
                                return (
                                  <li key={name}>
                                    <Link 
                                      to={`/collections/${name.toLowerCase().replaceAll(' ', '-')}`} 
                                      onClick={handleLinkClick} 
                                      className="group/link flex items-center gap-2 text-[11px] text-[#666] hover:text-[#E84949] transition-all font-bold uppercase tracking-wider"
                                    >
                                      <span className="w-1 h-1 bg-[#E84949]/0 group-hover/link:bg-[#E84949] group-hover/link:w-2 transition-all rounded-full"></span>
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
                            <div className="mt-6">
                              <h4 className="font-grandstander font-extrabold text-[12px] text-[#333] mb-5 border-b-2 border-dashed border-[#E84949]/20 pb-2 uppercase tracking-[0.2em]">
                                {col.extra.title}
                              </h4>
                              <ul className="space-y-3">
                                {col.extra.items.map(i => (
                                  <li key={i}>
                                    <Link to={`/collections/${i.toLowerCase().replaceAll(' ', '-')}`} className="group/link flex items-center gap-2 text-[11px] text-[#666] hover:text-[#E84949] transition-all font-bold uppercase tracking-wider">
                                      <span className="w-1 h-1 bg-[#E84949]/0 group-hover/link:bg-[#E84949] group-hover/link:w-2 transition-all rounded-full"></span>
                                      {i}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {col.banner && (
                            <Link to={link.href} onClick={handleLinkClick} className="rounded-3xl overflow-hidden aspect-[3/4] relative group/banner cursor-pointer shadow-xl border-4 border-white block transform hover:-translate-y-2 transition-all duration-500">
                              <img src={col.banner} alt={col.title} className="w-full h-full object-cover group-hover/banner:scale-110 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <span className="text-[#E84949] text-[10px] uppercase font-black tracking-[0.2em] mb-1 drop-shadow-md">Exclusive</span>
                                <h5 className="text-white font-grandstander text-[16px] font-black leading-tight">Trending Now</h5>
                              </div>
                            </Link>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeMenu === link.name && link.dropdown && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-56 bg-[#FDF4E6] shadow-xl rounded-b-xl border-t-2 border-[#E84949] py-2 z-[1000]">
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
                    {user && <span className="hidden xxl:block text-[11px] font-bold uppercase tracking-widest text-[#333] group-hover/user:text-[#E84949]">{user.firstName}</span>}
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
                  
                  {mainNavLinks.map(link => (
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
                          {link.mega ? link.mega.map((col, cidx) => (
                            <div key={cidx}>
                              {col.title && <h5 className="text-[10px] font-bold text-[#666] uppercase mb-2 tracking-widest">{col.title}</h5>}
                              {col.items && (
                                <div className="flex flex-col gap-2">
                                  {col.items.map(item => {
                                    const name = typeof item === 'object' ? item.name : item;
                                    const badge = typeof item === 'object' ? item.badge : null;
                                    return (
                                      <Link 
                                        key={name} 
                                        to={`/collections/${name.toLowerCase().replaceAll(' ', '-')}`} 
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
                          )) : link.dropdown.map(sub => (
                            <Link key={sub.name} to={sub.href} onClick={handleLinkClick} className="block text-[12px] text-[#333] font-bold hover:text-[#E84949] transition-colors">{sub.name}</Link>
                          ))}
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
                    <div className="relative">
                      <button onClick={() => setCountryDropdown(!countryDropdown)} className="flex items-center gap-1.5 text-[10px] font-bold text-[#333] uppercase tracking-wider">
                        <span className="flex items-center justify-center w-5 h-4 bg-[#333]/10 rounded-sm text-[8px]">{selectedCountry.code}</span>
                        <span className="whitespace-nowrap truncate max-w-[80px]">{selectedCountry.name}</span>
                        <ChevronDown size={12} className="opacity-40" />
                      </button>
                      <AnimatePresence>
                          {countryDropdown && (
                              <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0, y:5}} className="absolute bottom-full left-0 mb-2 w-48 bg-white shadow-2xl rounded-xl py-2 z-50 border border-black/5 overflow-hidden">
                                  {countries.map(c => (
                                      <button key={c.code} onClick={()=>{setSelectedCountry(c); setCountryDropdown(false)}} className={`w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-[#FDF4E6] flex items-center justify-between ${selectedCountry.code === c.code ? 'text-[#E84949]' : 'text-gray-700'}`}>
                                          {c.name}
                                      </button>
                                  ))}
                              </motion.div>
                          )}
                      </AnimatePresence>
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
