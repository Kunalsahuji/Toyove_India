import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Clock } from 'lucide-react'
import { products } from '../../utils/ProductData'

const mockPurchases = [
  {
    id: 1,
    name: 'Jacklin',
    location: 'USA',
    productId: 1,
    time: '5 minute ago'
  },
  {
    id: 2,
    name: 'Sarah',
    location: 'India',
    productId: 3,
    time: '2 minute ago'
  },
  {
    id: 3,
    name: 'Emily',
    location: 'London',
    productId: 5,
    time: '12 minute ago'
  }
]

export function PurchaseNotification() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    if (hasBeenClosed) return

    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(initialTimeout)
  }, [hasBeenClosed])

  useEffect(() => {
    if (hasBeenClosed || !isVisible) return

    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
      
      const nextTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockPurchases.length)
        setIsVisible(true)
      }, 10000)

      return () => clearTimeout(nextTimeout)
    }, 7000)

    return () => clearTimeout(hideTimeout)
  }, [isVisible, hasBeenClosed])

  const handleClose = () => {
    setIsVisible(false)
    setHasBeenClosed(true)
  }

  const currentPurchase = mockPurchases[currentIndex]
  const product = products.find(p => p.id === currentPurchase.productId)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          /* Positioned above the mobile bottom bar (bottom-[84px]) on small screens, and at bottom-6 on large screens */
          className="fixed bottom-[84px] md:bottom-6 left-5 md:left-6 z-[1001] w-[280px] md:w-[350px]"
        >
          <div className="bg-[#FFF8EE] border border-[#333]/10 rounded-2xl p-3 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative group ">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#E84949] text-white flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-all z-50"
            >
              <X size={14} strokeWidth={3} />
            </button>

            <div className="flex items-center gap-3 md:gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F9EAD3] rounded-2xl flex-shrink-0 p-1.5 overflow-hidden">
                <img 
                  src={product?.img} 
                  alt={product?.name} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[12px] md:text-[14px] text-[#64748B] font-medium leading-none border-b border-dashed border-[#333]/10 pb-2 mb-2 flex items-center justify-between pr-2">
                   {currentPurchase.name} Purchased ! - From {currentPurchase.location}
                </div>
                
                <h4 className="text-[14px] md:text-[16px] font-grandstander font-bold text-[#333] truncate">
                  {product?.name}
                </h4>

                <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] md:text-[12px] text-[#666]">
                    <Clock size={13} className="opacity-60" />
                    <span>{currentPurchase.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] md:text-[12px] font-bold text-[#E84949]">
                    <div className="w-4 h-4 rounded-full bg-[#E84949]/10 flex items-center justify-center">
                        <CheckCircle2 size={11} strokeWidth={3} />
                    </div>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
