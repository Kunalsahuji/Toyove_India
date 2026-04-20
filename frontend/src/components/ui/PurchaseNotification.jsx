import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import { products } from '../../utils/ProductData'

const mockPurchases = [
  {
    id: 1,
    name: 'Aarav',
    location: 'Mumbai, India',
    productId: 1,
    time: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Sarah',
    location: 'London, UK',
    productId: 2,
    time: '5 minutes ago'
  },
  {
    id: 3,
    name: 'Emily',
    location: 'New York, USA',
    productId: 4,
    time: '12 minutes ago'
  },
  {
    id: 4,
    name: 'Ishaan',
    location: 'Bangalore, India',
    productId: 7,
    time: '8 minutes ago'
  }
]

export function PurchaseNotification() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    if (hasBeenClosed) return

    // Initial delay before first popup
    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 4000)

    return () => clearTimeout(initialTimeout)
  }, [hasBeenClosed])

  useEffect(() => {
    if (hasBeenClosed || !isVisible) return

    // Hide after 6 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
      
      // Show next after 8 seconds of being hidden
      const nextTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockPurchases.length)
        setIsVisible(true)
      }, 8000)

      return () => clearTimeout(nextTimeout)
    }, 6000)

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
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-[9999] w-[320px] md:w-[360px]"
        >
          <div className="bg-[#FDF4E6] border-[1.6px] border-dashed border-[#333]/15 rounded-[24px] p-4 shadow-xl shadow-black/5 relative group">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-[#333]/30 hover:text-[#E84949] transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-[1.2px] border-dashed border-[#333]/15 shrink-0 bg-white p-0.5">
                <img 
                  src={product?.img} 
                  alt={product?.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="text-[11px] md:text-[12px] text-gray-500 font-medium truncate">
                  {currentPurchase.name} Purchased! - From {currentPurchase.location.split(',')[1]}
                </div>
                <h4 className="text-[13px] md:text-[14px] font-grandstander font-bold text-[#333] leading-tight truncate mt-0.5">
                  {product?.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] md:text-[11px] text-gray-400 font-medium">
                    {currentPurchase.time}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-[#4CAF50]">
                    <CheckCircle2 size={12} strokeWidth={3} />
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
