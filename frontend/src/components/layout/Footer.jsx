import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FB = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IG = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const TW = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const PT = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0a12 12 0 0 0-4.373 23.178c-.01-.937-.002-2.063.232-3.083l1.693-7.174s-.432-.864-.432-2.142c0-2.009 1.164-3.51 2.61-3.51 1.232 0 1.828.925 1.828 2.034 0 1.24-.79 3.095-1.197 4.812-.341 1.438.72 2.608 2.137 2.608 2.565 0 4.292-3.291 4.292-7.183 0-2.961-1.997-5.17-5.614-5.17-4.09 0-6.627 3.048-6.627 6.44 0 1.17.342 1.994.878 2.636a.35.35 0 0 1 .08.337c-.09.37-.289 1.44-.329 1.642-.052.26-.213.316-.49.19-1.816-.84-2.666-3.1-2.666-5.638 0-4.189 3.544-9.234 10.617-9.234 5.712 0 9.488 4.133 9.488 8.572 0 5.884-3.269 10.294-8.071 10.294-1.619 0-3.143-.878-3.664-1.87l-1.026 3.82c-.318 1.183-1.14 2.668-1.727 3.591A12 12 0 1 0 12 0z"/></svg>

const FooterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 md:py-0 md:mb-5 group md:pointer-events-none"
      >
        <h4 className="font-bold text-[16px] md:text-[14px] tracking-wide text-white font-sans">{title}</h4>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 md:hidden text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!h-auto md:!opacity-100 ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-3 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  )
}

const PaymentBadges = () => (
  <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
    {/* Visa */}
    <div className="bg-white rounded px-2 w-[40px] h-[26px] flex items-center justify-center font-bold italic text-[#1434CB] text-[15px] leading-none shrink-0" style={{ letterSpacing: '-0.5px' }}>
      VISA
    </div>
    {/* Mastercard */}
    <div className="bg-white rounded px-2 w-[40px] h-[26px] flex items-center justify-center shrink-0">
      <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] relative z-10 opacity-90 -mr-1"></div>
      <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] relative z-20 opacity-90 -ml-1"></div>
    </div>
    {/* Amex */}
    <div className="bg-[#257CBB] rounded px-1 w-[40px] h-[26px] flex items-center justify-center text-white font-bold text-[9px] leading-[1] text-center font-sans shrink-0">
      AM<br/>EX
    </div>
    {/* PayPal */}
    <div className="bg-white rounded px-2 w-[40px] h-[26px] flex items-center justify-center text-[#003087] font-bold italic text-[12px] leading-none shrink-0" style={{ fontFamily: 'Arial, sans-serif' }}>
      <span className="text-[#0079C1]">P</span>P
    </div>
    {/* Diners */}
    <div className="bg-white rounded w-[40px] h-[26px] flex items-center justify-center text-[#005CA9] font-bold text-[14px] leading-none shrink-0 tracking-tighter">
      D
    </div>
    {/* Discover */}
    <div className="bg-white rounded w-[40px] h-[26px] flex items-center justify-center shrink-0">
      <div className="w-full h-full relative flex items-center justify-center">
        <span className="font-bold text-black text-[8px] tracking-tight ml-0.5">DISC<span className="text-[#F68121]">O</span>VER</span>
      </div>
    </div>
  </div>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer className="bg-[#6449A4] text-white overflow-hidden relative">
      <div className="shell relative">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] gap-6 md:gap-10 py-10 md:py-16">

          <div className="flex flex-col gap-5 lg:pr-6 md:col-span-1 border-b border-white/10 pb-6 md:border-none md:pb-0">
            <h3 className="font-bold text-[19px] md:text-[20px] leading-[1.4] tracking-wider font-sans">
              Sign Up For News, Updates & 10% Off Your <br className="hidden md:block" /> First Order.
            </h3>
            <div className="relative flex items-center h-[46px] w-full max-w-[400px] bg-white rounded-full overflow-hidden shadow-md mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full h-full pl-5 pr-[120px] text-[13px] text-brand-ink outline-none border-2 border-transparent focus:border-[#FF4E50] rounded-full bg-transparent transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 w-[105px] bg-[#222222] text-white text-[11px] font-bold tracking-widest rounded-full hover:bg-[#FF4E50] transition-colors shrink-0 flex items-center justify-center">
                SUBSCRIBE
              </button>
            </div>
            
            <div className="flex gap-3 mt-2">
              {[{ Icon: FB, bg: '#1877F2' }, { Icon: IG, bg: '#E1306C' }, { Icon: TW, bg: '#000000' }, { Icon: PT, bg: '#E60023' }].map(({ Icon, bg }, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ backgroundColor: bg }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <FooterAccordion title="My Account">
              <ul className="flex flex-col gap-3.5">
                {[
                  { name: 'Return & exchanges', href: '#' },
                  { name: 'Shipping policy', href: '#' },
                  { name: 'Terms & Conditions', href: '#' },
                  { name: 'Wishlist', href: '#' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/80 text-[14px] hover:text-white transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="md:col-span-1 border-t border-white/10 pt-3 md:pt-0 md:border-none">
            <FooterAccordion title="Customer Service">
              <ul className="flex flex-col gap-3.5">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'FAQ', href: '#' },
                  { name: 'Privacy Policy', href: '#' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/80 text-[14px] hover:text-white transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="md:col-span-1 border-t border-white/10 pt-3 md:pt-0 md:border-none">
            <FooterAccordion title="Contact Info">
              <ul className="flex flex-col gap-4 text-[14px] text-white/80">
                <li className="flex gap-3 items-start">
                  <svg className="w-3.5 h-3.5 text-[#FF4E50] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>+01 0123 456 789</span>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-4 h-4 text-[#FF4E50] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>1678 White House Road, USK</span>
                </li>
                <li className="flex gap-3 items-start">
                  <svg className="w-4 h-4 text-white mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <a href="mailto:email@jkl.elo" className="hover:text-white">email@jkl.elo</a>
                </li>
              </ul>
            </FooterAccordion>
          </div>
        </div>

        {/* Global Footer Baseline */}
        {/* add for Toyove India */}
        <div className="border-t border-dashed border-white/40 pt-6 pb-[90px] md:pb-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 overflow-hidden">
          <p className="text-[13px] md:text-[14px] text-[#D2C5EA] text-center sm:text-left tracking-wide">
            © 2026, Toyove-India Powered by Appzeto
          </p>
          <div className="mr-0 md:mr-[60px]">
             <PaymentBadges />
          </div>
        </div>
      </div>

      {/* Persistent Floating Back To Top Component matching exact bounds */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTopBtn ? 1 : 0, y: showTopBtn ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-4 md:right-8 bg-white border border-gray-200 text-black w-[42px] h-[42px] flex flex-col items-center justify-center rounded-[6px] shadow-lg hover:bg-gray-50 z-[250] ${showTopBtn ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ bottom: "110px" }} // Pushed above mobile layout dock constraints globally
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 -mt-0.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
      </motion.button>
    </footer>
  )
}
