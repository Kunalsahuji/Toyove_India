import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight, ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingCart, Smartphone, Wallet, Check, ChevronDown, ChevronUp, Tag, AlertCircle, X, Lock, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { usePayment } from '../context/PaymentContext'
import { useAuth } from '../context/AuthContext'

const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France"]
const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "Punjab", "Kerala", "West Bengal"]

const FloatingInput = ({ label, name, type = 'text', value, onChange, placeholder = ' ' }) => (
  <div className="relative group w-full mb-4">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="peer w-full h-14 px-4 pt-4 bg-white border border-gray-300 rounded-xl outline-none transition-all focus:border-[#E84949] focus:ring-1 focus:ring-[#E84949] placeholder-transparent"
    />
    <label className="absolute left-4 top-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-[13px] peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-[#E84949] pointer-events-none">
      {label}
    </label>
  </div>
)

const FloatingSelect = ({ label, name, value, onChange, options }) => (
  <div className="relative group w-full mb-4">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="peer w-full h-14 px-4 pt-4 bg-white border border-gray-300 rounded-xl outline-none transition-all focus:border-[#E84949] appearance-none"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <label className="absolute left-4 top-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest pointer-events-none">
      {label}
    </label>
    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
)

const UPIIcon = ({ type, selected }) => {
  const logos = {
    gpay: (
      <svg viewBox="0 0 48 48" className="h-6 w-auto">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    ),
    phonepe: (
      <svg viewBox="0 0 120 120" className="h-6 w-auto">
        <rect width="120" height="120" rx="20" fill="#5f259f"/>
        <path d="M40 30h40v60H40z" fill="none" stroke="white" strokeWidth="8"/>
        <circle cx="60" cy="60" r="15" fill="white"/>
      </svg>
    ),
    paytm: (
      <svg viewBox="0 0 100 100" className="h-6 w-auto">
        <rect width="100" height="100" rx="10" fill="#00baf2"/>
        <text x="50" y="65" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">Paytm</text>
      </svg>
    )
  }

  return (
    <div className={`w-full flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${selected ? 'border-[#E84949] bg-[#FDF4E6]' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
       {logos[type]}
       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{type}</span>
    </div>
  )
}

const GatewayOverlay = ({ isOpen, method, amount, upiApp, onComplete, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Initial, 2: Processing, 3: Success
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (isOpen && method === 'upi') {
      const timer = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, method]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
       <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl border border-white/20">
          <div className="bg-[#6651A4] p-8 text-white flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Lock size={18}/></div>
                <div><h3 className="font-bold text-lg leading-none">Toyove Secure Pay</h3><p className="text-[10px] opacity-60 uppercase tracking-widest font-bold mt-1">Order #TP-{Math.floor(Math.random()*9000)}</p></div>
             </div>
             <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20}/></button>
          </div>

          <div className="p-10 space-y-8">
             <div className="text-center">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Total Payable</p>
                <h4 className="text-5xl font-bold font-grandstander text-[#333]">${amount.toFixed(2)}</h4>
             </div>

             {method === 'upi' && (
               <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-[#FDF4E6] rounded-full flex items-center justify-center mx-auto animate-pulse">
                     <Smartphone className="text-[#E84949]" size={32}/>
                  </div>
                  <div>
                     <h5 className="font-bold text-[#333] mb-1 capitalize">Pay using {upiApp}</h5>
                     <p className="text-[13px] text-gray-500 leading-relaxed px-10">Please open your {upiApp} app and approve the payment request of <b>${amount.toFixed(2)}</b></p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                     <div className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#E84949] animate-spin" />
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Time Remaining: {countdown}s</p>
                  </div>
                  <button onClick={onComplete} className="w-full h-14 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] hover:bg-[#E84949] transition-all">Simulate Approval</button>
               </div>
             )}

             {method === 'card' && (
               <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                     <CreditCard className="text-gray-400" />
                     <span className="font-mono text-gray-600">XXXX XXXX XXXX 9901</span>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Enter OTP sent to your mobile</p>
                     <div className="flex justify-between gap-3">
                        {[1,2,3,4,5,6].map(i => <input key={i} type="text" maxLength="1" className="w-full h-14 bg-white border border-gray-200 rounded-xl text-center font-bold text-xl outline-none focus:border-[#E84949]" />)}
                     </div>
                  </div>
                  <button onClick={onComplete} className="w-full h-14 bg-[#E84949] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] hover:bg-[#333] transition-all shadow-lg shadow-[#E84949]/20">Confirm & Pay</button>
                  <p className="text-[11px] text-center text-gray-400 font-bold uppercase tracking-widest">Resend OTP in 54s</p>
               </div>
             )}

             {method === 'wallet' && (
               <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                     <Wallet className="text-green-600" size={32}/>
                  </div>
                  <div>
                     <h5 className="font-bold text-[#333] mb-1">Confirm Wallet Payment</h5>
                     <p className="text-[13px] text-gray-500 leading-relaxed px-6">You are about to pay using your Toyove Wallet balance. This is instant and secure.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-200">
                     <div className="flex justify-between py-2 text-[13px]"><span className="text-gray-500">Order Amount</span><span className="font-bold text-[#333]">${amount.toFixed(2)}</span></div>
                     <div className="flex justify-between py-2 text-[13px]"><span className="text-gray-500">Wallet Balance</span><span className="font-bold text-green-600">-${amount.toFixed(2)}</span></div>
                  </div>
                  <button onClick={onComplete} className="w-full h-14 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] hover:bg-green-600 transition-all">Complete Purchase</button>
               </div>
             )}

             <div className="flex items-center justify-center gap-2 pt-4">
                <ShieldCheck size={14} className="text-gray-400"/>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PCI-DSS Compliant Gateway</span>
             </div>
          </div>
       </motion.div>
    </div>
  )
}

export function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart()
  const { walletBalance, payWithWallet, simulatePayment, topUpWallet, addOrder } = usePayment()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) 
  const [showSummary, setShowSummary] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [selectedUpi, setSelectedUpi] = useState('gpay')
  const [showGateway, setShowGateway] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('standard')
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    apartment: '',
    city: 'Mumbai',
    country: 'India',
    state: 'Maharashtra',
    postalCode: '',
    phone: '',
    upiId: ''
  })

  const shippingRates = { standard: 15.00, express: 45.00 }
  const shippingCharge = shippingRates[shippingMethod]
  const discountAmount = isDiscountApplied ? subtotal * 0.1 : 0
  const total = subtotal + shippingCharge - discountAmount
  
  const isInsufficient = paymentMethod === 'wallet' && walletBalance < total
  const topUpRequired = isInsufficient ? total - walletBalance : 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'toyove10') {
      setIsDiscountApplied(true)
      alert('Discount applied successfully!')
    } else {
      alert('Invalid discount code')
    }
  }

  const startPayment = () => {
    setShowGateway(true);
  }

  const completeOrder = async () => {
    setShowGateway(false);
    setIsProcessing(true);
    
    // Final logic execution
    let success = false;
    if (paymentMethod === 'wallet') {
      success = payWithWallet(total);
    } else {
      success = await simulatePayment(total, paymentMethod === 'upi' ? `UPI (${selectedUpi})` : 'CARD');
    }

    if (success) {
      const order = addOrder({
        items: [...cartItems],
        subtotal,
        shipping: shippingCharge,
        discount: discountAmount,
        total,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: { ...formData },
        customerEmail: formData.email
      });
      
      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order } });
    } else {
      setIsProcessing(false);
      alert('Payment Failed');
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF4E6] flex flex-col items-center justify-center p-4 font-roboto">
        <ShoppingCart size={64} className="text-[#E84949] mb-6 opacity-20" />
        <h2 className="text-3xl font-bold text-[#333] font-grandstander mb-4">Your cart is empty</h2>
        <Link to="/" className="px-10 py-4 bg-[#E84949] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col lg:flex-row">
      <GatewayOverlay 
        isOpen={showGateway} 
        method={paymentMethod} 
        amount={total} 
        upiApp={selectedUpi} 
        onCancel={() => setShowGateway(false)} 
        onComplete={completeOrder}
      />

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[2000] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-10">
           <div className="relative mb-10">
              <div className="w-24 h-24 border-8 border-gray-100 border-t-[#E84949] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center"><ShoppingBag className="text-[#E84949] animate-bounce" size={32}/></div>
           </div>
           <h2 className="text-3xl font-grandstander font-bold text-[#333] mb-4">Confirming Order...</h2>
           <p className="text-gray-500 max-w-sm font-medium">Please do not refresh or close this window. We are finalizing your toy adventure!</p>
        </div>
      )}
      
      {/* Mobile/Tablet Header & Summary Bar */}
      <div className="lg:hidden w-full bg-[#F5F5F5] border-b border-gray-200 sticky top-0 z-[100]">
        <div className="px-4 py-4 flex items-center justify-between">
           <Link to="/" className="text-2xl font-grandstander font-bold text-[#333] tracking-tighter">Toyove</Link>
           <button onClick={() => setShowSummary(!showSummary)} className="flex items-center gap-2 text-[13px] font-bold text-[#E84949] uppercase tracking-wider">
             {showSummary ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
             Summary <span className="ml-2 text-[#333]">${total.toFixed(2)}</span>
           </button>
        </div>
        <AnimatePresence>
          {showSummary && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-4 pb-6 overflow-hidden border-t border-gray-200">
               <div className="space-y-4 pt-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden relative bg-white"><img src={item.img} className="w-full h-full object-cover" /><span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-[10px] rounded-full flex items-center justify-center">{item.qty}</span></div>
                      <div className="grow"><h4 className="text-[13px] font-bold">{item.title}</h4></div>
                      <span className="text-[14px] font-bold">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
               </div>
               <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-[14px]"><span className="text-gray-500">Subtotal</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
                  {isDiscountApplied && <div className="flex justify-between text-[14px] text-green-600"><span>Discount (10%)</span><span>-${discountAmount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-[18px] font-bold pt-4"><span>Total</span><span className="text-[#E84949]">${total.toFixed(2)}</span></div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left Side: Delivery/Payment Forms */}
      <div className="w-full lg:w-[60%] px-4 md:px-10 lg:px-20 py-10 lg:py-16">
        <header className="hidden lg:block mb-12">
           <Link to="/" className="text-4xl font-grandstander font-bold text-[#333] tracking-tighter">Toyove</Link>
        </header>

        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-10">
           <Link to="/cart" className="text-[#E84949]">Cart</Link>
           <ChevronRight size={14} />
           <span className={step === 1 ? 'text-[#333]' : 'text-gray-400'}>Information</span>
           <ChevronRight size={14} />
           <span className={step === 2 ? 'text-[#333]' : 'text-gray-400'}>Payment</span>
        </nav>

        {step === 1 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-10">
            <section className="space-y-6">
               <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold text-[#333] font-grandstander">Contact</h2>
                 {!user ? (
                   <Link to="/login" className="text-[13px] text-[#E84949] underline font-bold">Log in</Link>
                 ) : (
                   <p className="text-[13px] text-green-600 font-bold">Logged in as {user.firstName}</p>
                 )}
               </div>
               <FloatingInput label="Email or mobile phone number" name="email" value={formData.email} onChange={handleInputChange} />
            </section>

            <section className="space-y-6">
               <h2 className="text-xl font-bold text-[#333] font-grandstander">Delivery</h2>
               <FloatingSelect label="Country/Region" name="country" value={formData.country} onChange={handleInputChange} options={countries} />
               <div className="grid grid-cols-2 gap-4">
                 <FloatingInput label="First name (optional)" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                 <FloatingInput label="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
               </div>
               <FloatingInput label="Address" name="address" value={formData.address} onChange={handleInputChange} />
               <FloatingInput label="Apartment, suite, etc. (optional)" name="apartment" value={formData.apartment} onChange={handleInputChange} />
               <div className="grid grid-cols-3 gap-4">
                 <FloatingInput label="City" name="city" value={formData.city} onChange={handleInputChange} />
                 <FloatingSelect label="State" name="state" value={formData.state} onChange={handleInputChange} options={states} />
                 <FloatingInput label="ZIP code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
               </div>
            </section>

            <section className="space-y-6">
               <h2 className="text-xl font-bold text-[#333] font-grandstander">Shipping method</h2>
               <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  <label className={`p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'standard' ? 'bg-[#FDF4E6]' : 'bg-white'}`}>
                     <div className="flex items-center gap-4">
                        <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="w-4 h-4 accent-[#E84949]" />
                        <span className="text-[14px] font-medium text-[#333]">Standard Shipping (3-5 days)</span>
                     </div>
                     <span className="font-bold text-[14px]">$15.00</span>
                  </label>
                  <label className={`p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'express' ? 'bg-[#FDF4E6]' : 'bg-white'}`}>
                     <div className="flex items-center gap-4">
                        <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="w-4 h-4 accent-[#E84949]" />
                        <span className="text-[14px] font-medium text-[#333]">Express Delivery (1-2 days)</span>
                     </div>
                     <span className="font-bold text-[14px]">$45.00</span>
                  </label>
               </div>
            </section>

            <button onClick={() => setStep(2)} className="w-full h-16 bg-[#333] text-white font-bold rounded-xl tracking-widest uppercase hover:bg-[#E84949] transition-all shadow-xl active:scale-95">Continue to payment</button>
          </motion.div>
        ) : (
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-10">
             <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-[13px] bg-gray-50/50">
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Contact</span><span className="grow font-medium">{formData.email}</span><button onClick={() => setStep(1)} className="text-[#E84949] font-bold">Change</button></div>
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Ship to</span><span className="grow font-medium">{formData.address}, {formData.city}, {formData.state}</span><button onClick={() => setStep(1)} className="text-[#E84949] font-bold">Change</button></div>
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Method</span><span className="grow font-medium text-capitalize">{shippingMethod} Shipping · ${shippingCharge.toFixed(2)}</span></div>
             </div>

             <section className="space-y-6">
                <h2 className="text-xl font-bold text-[#333] font-grandstander">Payment</h2>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                   
                   {/* Wallet Option */}
                   <div className={`p-5 transition-all ${paymentMethod === 'wallet' ? 'bg-[#FDF4E6]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('wallet')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'wallet'} onChange={() => {}} className="w-4 h-4 accent-[#E84949]" />
                            <span className="font-bold text-[#333] text-[14px] flex items-center gap-2"><Wallet size={16}/> Toyove Wallet</span>
                         </div>
                         <span className="text-[12px] font-bold text-gray-500">BALANCE: ${walletBalance.toFixed(2)}</span>
                      </div>
                      {paymentMethod === 'wallet' && (
                        <motion.div initial={{height:0}} animate={{height:'auto'}} className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                           {isInsufficient ? (
                             <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex flex-col gap-3">
                                <p className="text-[12px] text-red-600 font-bold flex items-center gap-2"><AlertCircle size={14}/> Insufficient Balance! Need ${topUpRequired.toFixed(2)} more.</p>
                                <button onClick={() => topUpWallet(topUpRequired + 10)} className="w-full py-3 bg-[#E84949] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest hover:opacity-90">Top up & Pay Now</button>
                             </div>
                           ) : (
                             <p className="text-[12px] text-gray-600 font-medium italic">Your current balance is enough for this order.</p>
                           )}
                        </motion.div>
                      )}
                   </div>

                   {/* Card Option */}
                   <div className={`p-5 transition-all ${paymentMethod === 'card' ? 'bg-[#FDF4E6]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('card')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'card'} onChange={() => {}} className="w-4 h-4 accent-[#E84949]" />
                            <span className="font-bold text-[#333] text-[14px] flex items-center gap-2"><CreditCard size={16}/> Credit Card</span>
                         </div>
                      </div>
                      {paymentMethod === 'card' && (
                        <motion.div initial={{height:0}} animate={{height:'auto'}} className="mt-4 space-y-4 pt-4 border-t border-gray-200">
                           <FloatingInput label="Card number" name="cardNo" />
                           <div className="grid grid-cols-2 gap-4"><FloatingInput label="Expiration (MM/YY)" name="exp" /><FloatingInput label="Security code" name="cvv" /></div>
                        </motion.div>
                      )}
                   </div>

                   {/* UPI Option */}
                   <div className={`p-5 transition-all ${paymentMethod === 'upi' ? 'bg-[#FDF4E6]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('upi')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'upi'} onChange={() => {}} className="w-4 h-4 accent-[#E84949]" />
                            <span className="font-bold text-[#333] text-[14px] flex items-center gap-2"><Smartphone size={16}/> UPI</span>
                         </div>
                      </div>
                      {paymentMethod === 'upi' && (
                        <motion.div initial={{height:0}} animate={{height:'auto'}} className="mt-4 pt-4 border-t border-gray-200 space-y-6">
                           <div className="grid grid-cols-3 gap-4">
                              <button onClick={() => setSelectedUpi('gpay')}><UPIIcon type="gpay" selected={selectedUpi === 'gpay'} /></button>
                              <button onClick={() => setSelectedUpi('phonepe')}><UPIIcon type="phonepe" selected={selectedUpi === 'phonepe'} /></button>
                              <button onClick={() => setSelectedUpi('paytm')}><UPIIcon type="paytm" selected={selectedUpi === 'paytm'} /></button>
                           </div>
                           <FloatingInput label="Enter UPI ID" name="upiId" value={formData.upiId} onChange={handleInputChange} />
                        </motion.div>
                      )}
                   </div>
                </div>
             </section>

             <div className="flex flex-col gap-4">
                <button onClick={startPayment} disabled={isProcessing || (paymentMethod === 'wallet' && isInsufficient)} className="w-full h-16 bg-[#333] text-white font-bold rounded-xl tracking-widest uppercase hover:bg-[#E84949] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl">
                   Secure Payment — ${total.toFixed(2)}
                </button>
                <button onClick={() => setStep(1)} className="text-[12px] font-bold text-gray-400 hover:text-[#333] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"><ChevronLeft size={16} /> Return to information</button>
             </div>
          </motion.div>
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className="hidden lg:block w-full lg:w-[40%] bg-[#F5F5F5] border-l border-gray-200 min-h-screen px-4 md:px-10 py-16 sticky top-0">
        <div className="max-w-[420px]">
          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 group">
                <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden relative bg-white shadow-sm group-hover:shadow-md transition-all"><img src={item.img} className="w-full h-full object-cover" /><span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-[11px] rounded-full flex items-center justify-center font-bold">{item.qty}</span></div>
                <div className="grow"><h4 className="text-[13px] font-bold text-[#333] font-grandstander">{item.title}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {item.sku || 'TOY-001'}</p></div>
                <span className="text-[15px] font-bold text-[#333] tracking-tighter">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
             <div className="relative grow">
                <input type="text" placeholder="Discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="w-full h-12 px-4 bg-white border border-gray-300 rounded-xl outline-none focus:border-[#E84949] font-bold text-[13px]" />
                <Tag size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
             </div>
             <button onClick={applyDiscount} className="h-12 px-6 bg-[#333] text-white font-bold rounded-xl text-[12px] uppercase tracking-widest hover:bg-[#E84949] transition-colors">Apply</button>
          </div>

          <div className="mt-10 pt-10 border-t border-gray-200 space-y-4 text-[14px]">
             <div className="flex justify-between"><span className="text-gray-500 font-medium">Subtotal</span><span className="font-bold tracking-tighter text-[#333]">${subtotal.toFixed(2)}</span></div>
             <div className="flex justify-between"><span className="text-gray-500 font-medium">Shipping</span><span className="font-bold tracking-tighter text-[#333]">${shippingCharge.toFixed(2)}</span></div>
             {isDiscountApplied && <div className="flex justify-between text-green-600 font-bold"><span>Discount (TOYOVE10)</span><span className="tracking-tighter">-${discountAmount.toFixed(2)}</span></div>}
             <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
               <span className="text-[20px] font-bold font-grandstander text-[#333]">Total</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">USD</span>
                  <span className="text-4xl font-bold font-grandstander text-[#E84949] tracking-tighter">${total.toFixed(2)}</span>
               </div>
             </div>
          </div>
          
          <div className="mt-12 p-6 rounded-3xl bg-[#FDF4E6] border border-dashed border-gray-300 flex items-center gap-5">
             <ShieldCheck className="text-green-600 shrink-0" size={24}/>
             <p className="text-[11px] text-gray-500 leading-relaxed font-medium uppercase tracking-widest">Secure Checkout Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
