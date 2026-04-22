import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight, ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export function CheckoutPage() {
  const { cartItems, subtotal } = useCart()
  const [step, setStep] = useState(1) 
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })
  const navigate = useNavigate()
  const shipping = 15.00
  const total = subtotal + shipping

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF4E6] flex flex-col items-center justify-center p-4">
        <ShoppingCart size={64} className="text-[#E84949] mb-6 opacity-20" />
        <h2 className="text-2xl font-bold text-[#333] font-grandstander mb-4">Your cart is empty</h2>
        <p className="text-[#666] mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Head back to the shop to find something amazing!</p>
        <Link to="/" className="px-10 py-4 bg-[#E84949] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-roboto pb-20">
      {/* Checkout Header - Toykio Style */}
      <header className="bg-white border-b border-black/5 py-6">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
             <span className="text-3xl font-grandstander font-bold text-[#333] tracking-tighter">Toyove</span>
          </Link>
          <Link to="/cart" className="p-2 text-[#333] hover:text-[#E84949] transition-colors relative group">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E84949] text-white text-[10px] font-bold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">3</span>
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 mt-10 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#999] mb-8">
              <span className={step >= 1 ? 'text-[#333]' : ''}>Information</span>
              <ChevronRight size={14} />
              <span className={step >= 2 ? 'text-[#333]' : ''}>Shipping</span>
              <ChevronRight size={14} />
              <span className={step >= 3 ? 'text-[#333]' : ''}>Payment</span>
            </nav>

            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-black/5 space-y-10">
              {step === 1 && (
                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-[#333] font-grandstander">Contact</h2>
                      <Link to="/login" className="text-[12px] font-bold text-[#E84949] underline uppercase tracking-wider">Log in</Link>
                    </div>
                    <input 
                      type="email" name="email" placeholder="Email or mobile phone number"
                      className="w-full h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all"
                      value={formData.email} onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#333] font-grandstander">Shipping address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="firstName" placeholder="First name" className="h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.firstName} onChange={handleInputChange} />
                      <input type="text" name="lastName" placeholder="Last name" className="h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                    <input type="text" name="address" placeholder="Address" className="w-full h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.address} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" name="city" placeholder="City" className="h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.city} onChange={handleInputChange} />
                      <input type="text" name="postalCode" placeholder="Postal code" className="h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.postalCode} onChange={handleInputChange} />
                    </div>
                    <input type="tel" name="phone" placeholder="Phone" className="w-full h-12 px-4 rounded-xl border border-black/10 outline-none focus:border-[#E84949] transition-all" value={formData.phone} onChange={handleInputChange} />
                  </div>

                  <button onClick={() => setStep(2)} className="w-full h-14 bg-[#333] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#E84949] transition-all shadow-lg active:scale-95">
                    Continue to shipping
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-8">
                  <div className="border border-black/10 rounded-2xl overflow-hidden divide-y divide-black/5">
                    <div className="p-4 flex gap-4 text-[13px]">
                      <span className="text-[#999] w-20 shrink-0">Contact</span>
                      <span className="grow text-[#333]">{formData.email}</span>
                    </div>
                    <div className="p-4 flex gap-4 text-[13px]">
                      <span className="text-[#999] w-20 shrink-0">Ship to</span>
                      <span className="grow text-[#333]">{formData.address}, {formData.city}, {formData.postalCode}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#333] font-grandstander">Shipping method</h2>
                    <div className="p-5 bg-[#F9EAD3]/30 border-2 border-[#E84949] rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Truck className="text-[#E84949]" size={20} />
                        <div>
                          <p className="font-bold text-[#333] text-[14px]">Standard Shipping</p>
                          <p className="text-[12px] text-[#666]">3-5 Business Days</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#333]">$15.00</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 text-[12px] font-bold text-[#999] hover:text-[#333] uppercase tracking-widest">
                      <ChevronLeft size={16} /> Return to info
                    </button>
                    <button onClick={() => setStep(3)} className="grow h-14 bg-[#333] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#E84949] transition-all shadow-lg active:scale-95">
                      Continue to payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-8">
                   <div className="border border-black/10 rounded-2xl overflow-hidden divide-y divide-black/5">
                    <div className="p-4 flex gap-4 text-[13px]">
                      <span className="text-[#999] w-20 shrink-0">Contact</span>
                      <span className="grow text-[#333]">{formData.email}</span>
                    </div>
                    <div className="p-4 flex gap-4 text-[13px]">
                      <span className="text-[#999] w-20 shrink-0">Ship to</span>
                      <span className="grow text-[#333]">{formData.address}, {formData.city}</span>
                    </div>
                    <div className="p-4 flex gap-4 text-[13px]">
                      <span className="text-[#999] w-20 shrink-0">Method</span>
                      <span className="grow text-[#333]">Standard Shipping · $15.00</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-[#333] font-grandstander">Payment</h2>
                      <ShieldCheck size={20} className="text-green-600" />
                    </div>
                    <p className="text-[12px] text-[#666]">All transactions are secure and encrypted.</p>
                    
                    <div className="p-6 bg-white border border-black/10 rounded-2xl space-y-6">
                      <div className="flex items-center justify-between border-b border-black/5 pb-4">
                        <span className="font-bold text-[14px]">Credit Card</span>
                        <div className="flex gap-1">
                          <CreditCard size={20} className="text-[#999]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <input type="text" placeholder="Card number" className="w-full h-12 px-4 rounded-xl border border-black/10 outline-none" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Expiration (MM/YY)" className="h-12 px-4 rounded-xl border border-black/10 outline-none" />
                          <input type="text" placeholder="Security code" className="h-12 px-4 rounded-xl border border-black/10 outline-none" />
                        </div>
                        <input type="text" placeholder="Name on card" className="w-full h-12 px-4 rounded-xl border border-black/10 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => setStep(2)} className="flex items-center justify-center gap-2 text-[12px] font-bold text-[#999] hover:text-[#333] uppercase tracking-widest">
                      <ChevronLeft size={16} /> Return to shipping
                    </button>
                    <button onClick={() => navigate('/')} className="grow h-14 bg-[#E84949] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg active:scale-95">
                      Pay now
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[40px] p-8 md:p-10 sticky top-28 space-y-8">
              <h2 className="text-xl font-bold text-[#333] font-grandstander border-b border-black/5 pb-4">Order Summary</h2>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 relative">
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shrink-0 border border-black/5 relative shadow-sm">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#333] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.qty}</span>
                    </div>
                    <div className="grow">
                      <h4 className="text-[13px] font-bold text-[#333] line-clamp-1 font-grandstander">{item.title}</h4>
                      <p className="text-[10px] text-[#666] uppercase tracking-widest font-bold">SKU: {item.sku || 'TOY-001'}</p>
                    </div>
                    <span className="font-bold text-[#333] text-[14px]">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#666]">Subtotal</span>
                  <span className="font-bold text-[#333]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#666]">Shipping</span>
                  <span className="font-bold text-[#333]">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-black/10">
                  <span className="text-[18px] font-bold font-grandstander">Total</span>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-[#999] uppercase mr-2">USD</span>
                    <span className="text-2xl font-bold font-grandstander text-[#E84949]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4 text-[11px] text-[#999] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1"><ShieldCheck size={14}/> Secure Checkout</div>
                <div className="flex items-center gap-1"><ShoppingBag size={14}/> Verified Shop</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
