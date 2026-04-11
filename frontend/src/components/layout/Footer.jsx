import { useState } from 'react'

const FB = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IG = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const TW = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const PT = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0a12 12 0 0 0-4.373 23.178c-.01-.937-.002-2.063.232-3.083l1.693-7.174s-.432-.864-.432-2.142c0-2.009 1.164-3.51 2.61-3.51 1.232 0 1.828.925 1.828 2.034 0 1.24-.79 3.095-1.197 4.812-.341 1.438.72 2.608 2.137 2.608 2.565 0 4.292-3.291 4.292-7.183 0-2.961-1.997-5.17-5.614-5.17-4.09 0-6.627 3.048-6.627 6.44 0 1.17.342 1.994.878 2.636a.35.35 0 0 1 .08.337c-.09.37-.289 1.44-.329 1.642-.052.26-.213.316-.49.19-1.816-.84-2.666-3.1-2.666-5.638 0-4.189 3.544-9.234 10.617-9.234 5.712 0 9.488 4.133 9.488 8.572 0 5.884-3.269 10.294-8.071 10.294-1.619 0-3.143-.878-3.664-1.87l-1.026 3.82c-.318 1.183-1.14 2.668-1.727 3.591A12 12 0 1 0 12 0z"/></svg>

const socialIcons = [
  { Icon: FB, bg: '#1877F2' },
  { Icon: IG, bg: '#E1306C' },
  { Icon: TW, bg: '#000000' },
  { Icon: PT, bg: '#E60023' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-brand-purple text-white">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 py-14 md:py-16">

          {/* Newsletter Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-[20px] md:text-[22px] font-bold leading-snug">
              Sign Up For News, Updates & 10% Off Your First Order.
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 h-10 px-4 text-[13px] text-brand-ink outline-none rounded-sm bg-white"
              />
              <button className="h-10 px-5 bg-brand-orange text-white text-[11px] font-bold uppercase tracking-wider rounded-sm hover:bg-orange-600 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialIcons.map(({ Icon, bg }, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: bg }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* My Account */}
          <div>
            <h4 className="font-bold text-[13px] tracking-wider uppercase mb-5">My Account</h4>
            <ul className="flex flex-col gap-3">
              {['Return & exchanges', 'Shipping policy', 'Terms & Conditions', 'Wishlist'].map((item) => (
                <li key={item}><a href="#" className="text-white/60 text-[13px] hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-[13px] tracking-wider uppercase mb-5">Customer Service</h4>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Contact Us', 'FAQ', 'Privacy Policy'].map((item) => (
                <li key={item}><a href="#" className="text-white/60 text-[13px] hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-[13px] tracking-wider uppercase mb-5">Contact Info</h4>
            <ul className="flex flex-col gap-4 text-[13px] text-white/60">
              <li className="flex gap-2 items-start">
                <span className="text-white mt-0.5">📞</span>
                <span>+01 0123 456 789</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-white mt-0.5">📍</span>
                <span>1678 White House Road, USK</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-white mt-0.5">✉️</span>
                <a href="mailto:email@jkl.elo" className="hover:text-white">email@jkl.elo</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <p>© 2024, Toyove India | <a href="#" className="hover:text-white">Privacy</a></p>
          <p>Powered By Toyove India</p>
        </div>
      </div>
    </footer>
  )
}
