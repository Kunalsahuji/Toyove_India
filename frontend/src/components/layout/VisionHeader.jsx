import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Menu, X, ChevronLeft, ChevronRight, ChevronDown, User } from 'lucide-react'

// ─── Social Icons ─────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROMO = '10% off your next order, use code : TOYOVE001'

const promoMessages = [
  PROMO,
  'Free Shipping On Orders Over ₹999!',
  'New Arrivals Every Week — Shop Now',
]

const navLinks = [
  { name: 'HOME',                 href: '#' },
  { name: 'ABOUT',                href: '#' },
  { name: 'DOLLS',                href: '#' },
  { name: 'EDUCATIONAL TOY',      href: '#' },
  { name: 'GAMES AND PUZZLE',     href: '#' },
  { name: 'VEHICLES TOYS',        href: '#' },
  { name: 'CONTACT',              href: '#' },
]

// ─── Shared style constants ────────────────────────────────────────────────────
const C = '#E84040'  // coral red
const P = '#6651A4'  // brand purple

import logo from '../../assets/logo.svg'

export function VisionHeader() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const prev = () => setPromoIndex(i => (i - 1 + promoMessages.length) % promoMessages.length)
  const next = () => setPromoIndex(i => (i + 1) % promoMessages.length)

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          ANNOUNCEMENT BAR  —  3 responsive variants
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ backgroundColor: C, width: '100%', padding: '7px 0' }}>

        {/* ── MOBILE: promo only, centered, no icons, tiny padding ── */}
        <div className="ann-mob items-center justify-center"
             style={{ padding: '0 12px' }}>
          <p style={{ color: '#FDF3E7', fontSize: '10.5px', fontWeight: 500,
                      letterSpacing: '0.02em', whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis', overflow: 'hidden',
                      textAlign: 'center', maxWidth: '100%' }}>
            ⭐ {PROMO}
          </p>
        </div>

        {/* ── TABLET (768–1023px): promo centered with visible side space ── */}
        <div className="ann-tab items-center justify-center"
             style={{ padding: '0 32px' }}>
          <p style={{ color: '#FDF3E7', fontSize: '11.5px', fontWeight: 500,
                      letterSpacing: '0.04em', whiteSpace: 'nowrap',
                      textAlign: 'center' }}>
            ⭐ {PROMO}
          </p>
        </div>

        {/* ── DESKTOP (≥1024px): 3-col grid — social|promo|country ── */}
        <div className="ann-desk hdr-inner"
             style={{ gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>

          {/* Social icons — left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {[FbIcon, IgIcon, XIcon, PtIcon].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#FDF3E7', lineHeight: 0, display: 'flex' }}
                className="hover:opacity-70 transition-opacity"><Icon /></a>
            ))}
          </div>

          {/* Rotating promo — center */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <button onClick={prev} style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}>
              <ChevronLeft size={13} />
            </button>
            <div style={{ overflow: 'hidden', height: '16px', display: 'flex', alignItems: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.span key={promoIndex}
                  initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.22 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#FDF3E7',
                           fontSize: '11.5px', fontWeight: 500, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '10px' }}>⭐</span>
                  {promoMessages[promoIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <button onClick={next} style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: '#FDF3E7', padding: 0, lineHeight: 0, display: 'flex' }}>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Country / Language — right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', justifyContent: 'flex-end' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: '3px', color: '#FDF3E7', fontSize: '11px',
                    fontWeight: 500, whiteSpace: 'nowrap' }}>
              United States <ChevronDown size={11} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: '3px', color: '#FDF3E7', fontSize: '11px', fontWeight: 500 }}>
              English <ChevronDown size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN NAVBAR
          ═══════════════════════════════════════════════════════════════════ */}
      <header style={{ backgroundColor: '#FDF3E7', borderBottom: '1px solid #ebebeb',
                       boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                       position: 'sticky', top: 0, zIndex: 50 }}>

        {/* ── MOBILE + TABLET (<1024px): [burger][Toyove][search][cart] ── */}
        <div className="hdr-mob"
             style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                      alignItems: 'center', height: '56px', padding: '0 12px' }}>

          {/* Left: hamburger */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer',
                       padding: '6px', lineHeight: 0, color: '#222' }}>
              <Menu size={22} />
            </button>
          </div>

          {/* Center: logo — truly centered because it's "auto" column */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Toyove Logo" 
              style={{ height: '36px', width: 'auto', objectContain: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
                if(e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }}
            />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif",
                           fontWeight: 700, fontSize: '22px', color: P, lineHeight: 1, display: 'none' }}>
              Toyove
            </span>
          </a>

          {/* Right: search + cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
            <button onClick={() => setSearchOpen(v => !v)}
              style={{ padding: '6px', background: 'none', border: 'none',
                       cursor: 'pointer', lineHeight: 0, color: '#222' }}>
              <Search size={20} />
            </button>
            <button style={{ padding: '6px', background: 'none', border: 'none',
                             cursor: 'pointer', lineHeight: 0, color: '#222', position: 'relative' }}>
              <ShoppingCart size={20} />
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '15px', height: '15px',
                             background: C, color: '#FDF3E7', fontSize: '9px', fontWeight: 700,
                             borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search expand */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden hdr-mob" style={{ display: 'block' }}>
              <div style={{ padding: '8px 12px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5',
                              borderRadius: '6px', height: '36px', padding: '0 14px', gap: '8px', background: '#F8EAD4' }}>
                  <Search size={14} style={{ color: '#222' }} />
                  <input type="text" placeholder="Search products..." autoFocus
                    style={{ flex: 1, background: 'transparent', outline: 'none', fontSize: '13px', color: '#222' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DESKTOP (≥1024px): [Toyove + NavLinks ............ icons] ── */}
        <div className="hdr-desk hdr-inner"
             style={{ alignItems: 'center', height: '68px' }}>

          <a href="#" style={{ flexShrink: 0, textDecoration: 'none', marginRight: '40px', display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Toyove Logo" 
              style={{ height: '44px', width: 'auto', objectContain: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
                if(e.target.nextSibling) e.target.nextSibling.style.display = 'block';
              }}
            />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif",
                           fontWeight: 700, fontSize: '24px', color: P, lineHeight: 1, display: 'none' }}>
              Toyove
            </span>
          </a>

          {/* Nav links — covering all central space cleanly spaced */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flex: 1, paddingRight: '30px' }}>
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="group"
                style={{ fontSize: '13px', fontWeight: 600, color: '#222',
                         textDecoration: 'none', whiteSpace: 'nowrap', position: 'relative' }}>
                {link.name}
                <span className="absolute -bottom-[2px] left-0 h-[2px] w-0 rounded-full bg-brand-purple group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right icons — pushed to far right by nav's flex:1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5',
                          borderRadius: '6px', height: '34px', padding: '0 12px', gap: '7px', background: '#F8EAD4' }}>
              <input type="text" placeholder="Search products..."
                style={{ background: 'transparent', outline: 'none', fontSize: '12px', color: '#222', width: '140px' }} />
              <Search size={14} style={{ color: '#222', flexShrink: 0 }} />
            </div>
            <button style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer',
                             lineHeight: 0, color: '#222' }}
                    className="hover:text-brand-purple rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} />
            </button>
            <button style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer',
                             lineHeight: 0, color: '#222', position: 'relative' }}
                    className="hover:text-brand-purple rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart size={20} />
              <span style={{ position: 'absolute', top: '2px', right: '2px', width: '15px', height: '15px',
                             background: C, color: '#FDF3E7', fontSize: '9px', fontWeight: 700,
                             borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                0
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 199, background: 'rgba(0,0,0,0.4)' }} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 200,
                         width: '75vw', maxWidth: '300px', background: '#FDF3E7',
                         display: 'flex', flexDirection: 'column',
                         boxShadow: '4px 0 24px rgba(0,0,0,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={logo} 
                      alt="Toyove Logo" 
                      style={{ height: '28px', width: 'auto', objectContain: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if(e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif",
                                   fontWeight: 700, fontSize: '22px', color: P, display: 'none' }}>Toyove</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0 }}>
                    <X size={24} />
                  </button>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                  {navLinks.map((link, i) => (
                    <motion.a key={link.name} href={link.href}
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setMobileOpen(false)}
                      style={{ padding: '15px 24px', fontSize: '15px', fontWeight: 600,
                               color: '#222', textDecoration: 'none', borderBottom: '1px solid #f5f5f5',
                               display: 'block' }}
                      className="hover:text-brand-purple hover:bg-gray-50 transition-colors">
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
