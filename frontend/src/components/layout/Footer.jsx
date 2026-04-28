import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Headset } from 'lucide-react'

const FB = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IG = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const TW = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const PT = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0a12 12 0 0 0-4.373 23.178c-.01-.937-.002-2.063.232-3.083l1.693-7.174s-.432-.864-.432-2.142c0-2.009 1.164-3.51 2.61-3.51 1.232 0 1.828.925 1.828 2.034 0 1.24-.79 3.095-1.197 4.812-.341 1.438.72 2.608 2.137 2.608 2.565 0 4.292-3.291 4.292-7.183 0-2.961-1.997-5.17-5.614-5.17-4.09 0-6.627 3.048-6.627 6.44 0 1.17.342 1.994.878 2.636a.35.35 0 0 1 .08.337c-.09.37-.289 1.44-.329 1.642-.052.26-.213.316-.49.19-1.816-.84-2.666-3.1-2.666-5.638 0-4.189 3.544-9.234 10.617-9.234 5.712 0 9.488 4.133 9.488 8.572 0 5.884-3.269 10.294-8.071 10.294-1.619 0-3.143-.878-3.664-1.87l-1.026 3.82c-.318 1.183-1.14 2.668-1.727 3.591A12 12 0 1 0 12 0z"/></svg>

const FooterAccordion = ({ title, children, isNewsletter = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center group lg:pointer-events-none ${isNewsletter ? 'py-3 lg:py-0 lg:mb-6' : 'py-4 lg:py-0 lg:mb-6'}`}
      >
        <h4 className={`font-bold tracking-wide text-white text-left ${isNewsletter ? 'text-[17px] sm:text-[20px] lg:text-[28px] capitalize leading-snug pr-2 lg:pr-0' : 'text-[15px] lg:text-[16px] capitalize'}`}>{title}</h4>
        <div className="lg:hidden flex items-center justify-center text-white shrink-0">
           <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 lg:max-h-none! lg:h-auto! lg:opacity-100! ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-6 lg:pb-0">
          {children}
        </div>
      </div>
    </div>
  )
}

const PaymentBadges = () => (
  <div className="flex items-center gap-1.5 flex-wrap justify-center lg:justify-end">
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

  return (
    <footer className="bg-[#6449A4] text-white">
      <div className="shell">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.6fr_auto_0.7fr_0.7fr_0.9fr] xl:grid-cols-[1.8fr_auto_0.7fr_0.7fr_1fr] gap-x-4 lg:gap-x-8 gap-y-0">

          {/* Newsletter Column */}
          <div className="lg:pr-0 py-6 lg:py-16">
            <FooterAccordion title="Sign Up For News, Updates & 10% Off Your First Order." isNewsletter={true}>
              <div className="flex flex-row gap-2 w-full max-w-xl mt-2 lg:mt-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full flex-1 h-11 px-3 sm:px-4 text-[14px] text-[#333] outline-none bg-white rounded-md placeholder:text-gray-500"
                />
                <button className="h-11 px-4 sm:px-6 bg-white text-[#333] text-[12px] sm:text-[13px] font-bold rounded-md hover:bg-[#E84949] hover:text-white transition-colors uppercase whitespace-nowrap">
                  SUBSCRIBE
                </button>
              </div>
              
              <div className="flex gap-2.5 mt-8">
                <a href="#" className="h-9 w-9 rounded-md bg-[#3B5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <FB />
                </a>
                <a href="#" className="h-9 w-9 rounded-md bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <IG />
                </a>
                <a href="#" className="h-9 w-9 rounded-md bg-[#00ACEE] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <TW />
                </a>
                <a href="#" className="h-9 w-9 rounded-md bg-[#E60023] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <PT />
                </a>
              </div>
            </FooterAccordion>
          </div>

          {/* Vertical Dotted Divider (Desktop only) */}
          <div className="hidden lg:block w-px border-r border-dotted border-white/80 h-full"></div>

          {/* My Account */}
          <div className="lg:pl-8 py-2 lg:py-16">
            <FooterAccordion title="My Account">
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'Return & exchange', href: '/pages/return-exchange' },
                  { name: 'Shipping policy', href: '/pages/shipping-policy' },
                  { name: 'Terms & condition', href: '/pages/terms-conditions' },
                  { name: 'Wishlist', href: '/wishlist' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/80 text-[14px] hover:text-[#E84949] transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          {/* Customer Service */}
          <div className="py-2 lg:py-16">
            <FooterAccordion title="Customer Service">
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'About us', href: '/about' },
                  { name: 'Contact us', href: '/contact' },
                  { name: 'Faq\'s', href: '/pages/faq' },
                  { name: 'Privacy policy', href: '/pages/privacy-policy' }
                ].map((item) => (
                  <li key={item.name}><Link to={item.href} className="text-white/80 text-[14px] hover:text-[#E84949] transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          {/* Contact Info */}
          <div className="py-2 lg:py-16">
            <FooterAccordion title="Contact Info">
              <div className="flex flex-col gap-5 text-[14px] text-white">
                <div className="flex gap-4 items-start">
                  <Headset size={32} strokeWidth={1} className="text-white shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-white/90">Hotline free 24/7:</span>
                    <span className="font-bold text-[18px] leading-none">+91 98765 43210</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-bold uppercase text-[13px]">ADDRESS: </span>
                  <span className="text-white/90 text-[14px]">Unit 703, 7th Floor, Block 1 Mayagarden, Zirakpur, Rajpura, Mohali- 140603, Punjab</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-[13px]">EMAIL: </span>
                  <a href="mailto:hello@toyovoindia.com" className="text-white/90 text-[14px] hover:text-white">hello@toyovoindia.com</a>
                </div>
              </div>
            </FooterAccordion>
          </div>

        </div>
      </div>

      {/* Bottom Bar Full Width */}
      <div className="w-full border-t border-dotted border-white/80">
        <div className="shell py-6 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <p className="text-[13px] md:text-[14px] text-white/80">
                © 2026, TOYOVO INDIA (OPC) PRIVATE LIMITED Powered by Appzeto
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] font-medium text-white/60">
                <span>CIN: U47912PB2026OPC068091</span>
                <span>PAN: AANCT0674K</span>
                <span>TAN: PTLT16619B</span>
              </div>
            </div>
            <PaymentBadges />
          </div>
          <p className="text-center text-[11px] text-white/50">
            Incorporated Under The Companies Act, 2013 | Ministry of Corporate Affairs, India
          </p>
        </div>
      </div>
    </footer>
  )
}
