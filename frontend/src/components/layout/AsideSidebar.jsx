import { motion } from 'framer-motion'
import { Heart, Layers, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AsideSidebar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const items = [
    { id: 'heart', icon: <Heart size={19} />, label: 'Wishlist', path: '/wishlist', badge: 1 },
    { id: 'layers', icon: <Layers size={19} />, label: 'Compare', badge: 1, isAction: true },
    { id: 'up', icon: <ArrowUp size={22} />, label: 'Scroll To Top', isScroll: true }
  ]

  return (
    /* Persistent visibility for Tablet (md) and Desktop large devices. No scroll threshold. */
    <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[1000] flex-col bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.06)] border-l border-y border-dashed border-[#333]/20 rounded-l-[18px] overflow-hidden">
      {items.map((item, idx) => (
        <div key={item.id} className="relative group">
          {item.isScroll ? (
            <button 
              onClick={scrollToTop}
              className="w-13 h-13 flex items-center justify-center transition-all duration-300 hover:bg-[#E84949] text-[#333] hover:text-white"
            >
              {item.icon}
            </button>
          ) : item.isAction ? (
            <button 
              onClick={() => alert('Added to comparison')}
              className={`w-13 h-13 flex items-center justify-center transition-all duration-300 hover:bg-[#E84949] text-[#333] hover:text-white ${idx < items.length - 1 ? 'border-b border-dashed border-[#333]/15' : ''}`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 h-4.5 w-4.5 bg-[#222] text-[9px] font-bold text-white flex items-center justify-center rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          ) : (
            <Link 
              to={item.path}
              className={`w-13 h-13 flex items-center justify-center transition-all duration-300 hover:bg-[#E84949] text-[#333] hover:text-white ${idx < items.length - 1 ? 'border-b border-dashed border-[#333]/15' : ''}`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 h-4.5 w-4.5 bg-[#222] text-[9px] font-bold text-white flex items-center justify-center rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          )}

          {/* High-Fidelity Slide-out Tooltip */}
          <div className="absolute right-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#333] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
              {item.label}
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-[#333] rotate-45" />
          </div>
        </div>
      ))}
    </div>
  )
}
