import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Phone, MapPin, Mail, Clock } from 'lucide-react'

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
        <h4 className="font-grandstander font-bold text-[16px] md:text-[14px] tracking-widest text-white uppercase">{title}</h4>
        <ChevronDown className={`w-4 h-4 md:hidden text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:max-h-none! md:h-auto! md:opacity-100! ${isOpen ? 'max-h-75 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-3 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  )
}

const PaymentBadges = () => (
  <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end opacity-80 hover:opacity-100 transition-opacity">
    <div className="bg-white rounded px-2 w-10 h-6.5 flex items-center justify-center font-bold italic text-[#1434CB] text-[15px] leading-none shrink-0" style={{ letterSpacing: '-0.5px' }}>VISA</div>
    <div className="bg-white rounded px-2 w-10 h-6.5 flex items-center justify-center shrink-0">
      <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] relative z-10 opacity-90 -mr-1"></div>
      <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] relative z-20 opacity-90 -ml-1"></div>
    </div>
    <div className="bg-[#257CBB] rounded px-1 w-10 h-6.5 flex items-center justify-center text-white font-bold text-[9px] leading-none text-center font-sans shrink-0">AM<br/>EX</div>
    <div className="bg-white rounded px-2 w-10 h-6.5 flex items-center justify-center text-[#003087] font-bold italic text-[12px] leading-none shrink-0" style={{ fontFamily: 'Arial, sans-serif' }}><span className="text-[#0079C1]">P</span>P</div>
    <div className="bg-white rounded w-10.5 h-6.5 flex items-center justify-center text-[#005CA9] font-bold text-[14px] leading-none shrink-0 tracking-tighter">D</div>
    <div className="bg-white rounded w-10.5 h-6.5 flex items-center justify-center shrink-0"><span className="font-bold text-black text-[8px] tracking-tight ml-0.5">DISC<span className="text-[#F68121]">O</span>VER</span></div>
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
    <footer className="bg-[#6449A4] text-white overflow-hidden relative border-t-[3px] border-dashed border-white/5">
      <div className="max-w-350 mx-auto px-4 md:px-10 relative">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] gap-6 md:gap-10 py-12 md:py-20">

          <div className="flex flex-col gap-6 lg:pr-10 md:col-span-1">
            <h3 className="font-grandstander font-bold text-[22px] md:text-[26px] leading-tight tracking-tight">
              Sign Up For News, Updates & 10% Off Your First Order.
            </h3>
            <div className="relative flex items-center h-13.5 w-full max-w-112.5 bg-white rounded-full overflow-hidden shadow-lg border-[1.2px] border-transparent focus-within:border-[#E84949] transition-all">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full h-full pl-6 pr-32.5 text-[14px] text-[#333] outline-none bg-transparent"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#333] text-white text-[11px] font-bold tracking-widest rounded-full hover:bg-[#E84949] transition-colors shrink-0 uppercase">
                SUBSCRIBE
              </button>
            </div>
            
            <div className="flex gap-4 mt-2">
              {[{ Icon: FB, bg: '#1877F2' }, { Icon: IG, bg: '#E1306C' }, { Icon: TW, bg: '#000000' }, { Icon: PT, bg: '#E60023' }].map(({ Icon, bg }, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all shadow-md" style={{ backgroundColor: bg }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <FooterAccordion title="My Account">
              <ul className="flex flex-col gap-4">
                {[
                  { name: 'Return & Exchange', href: '/pages/return-exchange' },
                  { name: 'Shipping Policy', href: '/pages/shipping-policy' },
                  { name: 'Terms & Conditions', href: '/pages/terms-conditions' },
                  { name: 'Wishlist', href: '/wishlist' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/70 text-[14px] font-medium hover:text-white hover:translate-x-1 transition-all inline-block">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="md:col-span-1">
            <FooterAccordion title="Customer Service">
              <ul className="flex flex-col gap-4">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'FAQ', href: '/pages/faq' },
                  { name: 'Privacy Policy', href: '/pages/privacy-policy' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/70 text-[14px] font-medium hover:text-white hover:translate-x-1 transition-all inline-block">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="md:col-span-1">
            <FooterAccordion title="Contact Info">
              <ul className="flex flex-col gap-5 text-[14px] text-white/70 font-medium">
                <li className="flex gap-4 items-start group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-[#E84949] transition-colors"><Phone size={14} className="text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Call Us</span>
                    <span>+01 0123 456 789</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-[#E84949] transition-colors"><MapPin size={14} className="text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Visit Us</span>
                    <span>1010 White Street Block, USA</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-[#E84949] transition-colors"><Mail size={14} className="text-white" /></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Email Us</span>
                    <a href="mailto:admin@gmail.com" className="hover:text-white">admin@gmail.com</a>
                  </div>
                </li>
              </ul>
            </FooterAccordion>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[13px] md:text-[14px] text-white/60 text-center sm:text-left font-medium">
            © 2026, <span className="text-white font-bold">Toyove-India</span> Powered by Appzeto
          </p>
          <PaymentBadges />
        </div>
      </div>

      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTopBtn ? 1 : 0, y: showTopBtn ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-6 bottom-24 md:bottom-10 bg-white text-[#333] w-12 h-12 flex items-center justify-center rounded-2xl shadow-2xl hover:bg-[#E84949] hover:text-white transition-all z-[200] group ${showTopBtn ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <ChevronDown size={24} className="rotate-180 group-hover:translate-y-[-2px] transition-transform" />
      </motion.button>
    </footer>
  )
}
