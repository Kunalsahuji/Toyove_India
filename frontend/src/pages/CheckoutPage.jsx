import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ChevronRight, ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingCart, Smartphone, Check, ChevronDown, ChevronUp, Tag, AlertCircle, X, Landmark } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { usePayment } from '../context/PaymentContext'
import { useAuth } from '../context/AuthContext'
import { validateCouponCode } from '../services/couponApi'
import { createRazorpayPaymentOrder, verifyRazorpayPayment } from '../services/orderApi'

const countries = ["India"]
import { indianStates, commonCities } from '../utils/indiaData'

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

const loadRazorpayScript = () => new Promise((resolve) => {
  if (window.Razorpay) {
    resolve(true)
    return
  }

  const script = document.createElement('script')
  script.src = 'https://checkout.razorpay.com/v1/checkout.js'
  script.onload = () => resolve(true)
  script.onerror = () => resolve(false)
  document.body.appendChild(script)
})

// Stable component outside to prevent focus loss on re-renders
const CouponSection = ({ 
  discountCode, 
  setDiscountCode, 
  applyDiscount, 
  isApplyingCoupon, 
  couponError, 
  isDiscountApplied, 
  couponState,
  compact = false 
}) => (
  <div className={compact ? 'mt-5 pt-5 border-t border-gray-100' : 'mt-10'}>
    <div className="flex gap-3">
      <div className="relative grow">
        <input
          type="text"
          placeholder="Discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
          className="w-full h-12 px-4 pr-10 bg-white border border-gray-300 rounded-xl outline-none focus:border-[#E84949] font-bold text-[13px] shadow-sm transition-all"
        />
        <Tag size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <button 
        onClick={applyDiscount} 
        disabled={isApplyingCoupon || !discountCode.trim()} 
        className="h-12 px-6 bg-[#333] text-white font-bold rounded-xl text-[12px] uppercase tracking-widest hover:bg-[#E84949] transition-all disabled:opacity-50 whitespace-nowrap shadow-sm"
      >
        {isApplyingCoupon ? '...' : 'Apply'}
      </button>
    </div>
    {couponError && <p className="mt-3 text-[11px] font-bold text-[#E84949] flex items-center gap-1"><AlertCircle size={12}/> {couponError}</p>}
    {isDiscountApplied && <p className="mt-3 text-[11px] font-bold text-green-600 flex items-center gap-1"><Check size={12}/> {couponState?.coupon?.code} applied successfully.</p>}
  </div>
)

export function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart()
  const { addPaymentLog } = usePayment()
  const { user, addresses } = useAuth()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1) 
  const [showSummary, setShowSummary] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [selectedUpi, setSelectedUpi] = useState('gpay')
  const [isLaunchingPayment, setIsLaunchingPayment] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)
  const [couponState, setCouponState] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [shippingMethod, setShippingMethod] = useState('standard')
  
  // Address Management
  const defaultAddress = addresses?.find(a => a.isDefault) || (addresses?.length > 0 ? addresses[0] : null);
  const [useSavedAddress, setUseSavedAddress] = useState(addresses?.length > 0)
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || null)

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: defaultAddress?.firstName || user?.firstName || '',
    lastName: defaultAddress?.lastName || user?.lastName || '',
    address: defaultAddress?.address || '',
    apartment: defaultAddress?.apartment || '',
    city: defaultAddress?.city || '',
    country: 'India',
    state: defaultAddress?.state || '',
    postalCode: defaultAddress?.postalCode || '',
    phone: defaultAddress?.phone || '',
    upiId: '',
    district: defaultAddress?.district || ''
  })

  const shippingRates = { standard: 15.00, express: 45.00 }
  const shippingCharge = shippingRates[shippingMethod]
  const discountAmount = couponState?.discountAmount || 0
  const total = subtotal + shippingCharge - discountAmount

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setIsDiscountApplied(false)
    setCouponState(null)
    setCouponError('')
  }, [shippingMethod, subtotal, cartItems])

  const applyDiscount = async () => {
    if (!discountCode.trim()) return
    setCouponError('')
    setIsApplyingCoupon(true)
    try {
      const result = await validateCouponCode({
        code: discountCode.trim(),
        subtotal,
        shippingAmount: shippingCharge,
        categorySlugs: [...new Set(cartItems.map((item) => item.category).filter(Boolean))],
      })
      setCouponState(result)
      setIsDiscountApplied(true)
    } catch (error) {
      setCouponState(null)
      setIsDiscountApplied(false)
      setCouponError(error.message || 'Invalid discount code')
    } finally {
      setIsApplyingCoupon(false)
    }
  }


  const checkoutData = {
    customer: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    },
    shippingAddress: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      apartment: formData.apartment,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      country: formData.country,
      postalCode: formData.postalCode,
      phone: formData.phone,
    },
    items: cartItems.map((item) => ({
      productId: item._id || undefined,
      slug: item.slug || item.id,
      quantity: item.qty,
    })),
    shippingMethod,
    paymentMethod: 'razorpay',
    couponCode: couponState?.coupon?.code || '',
  }

  const getPaymentMethodLabel = () => {
    if (paymentMethod === 'upi') {
      return `UPI (${selectedUpi.toUpperCase()})`
    }
    if (paymentMethod === 'netbanking') {
      return 'NET BANKING'
    }
    return 'CARD'
  }

  const startPayment = async () => {
    setIsLaunchingPayment(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Razorpay checkout could not be loaded. Check your internet connection and try again.')
      }

      const razorpayOrder = await createRazorpayPaymentOrder(checkoutData)

      const options = {
        key: razorpayOrder.keyId,
        amount: razorpayOrder.amountInPaise,
        currency: razorpayOrder.currency,
        name: 'TOYOVOINDIA',
        description: 'Toyovo India Checkout',
        order_id: razorpayOrder.razorpayOrderId,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          shipping_method: shippingMethod,
          preferred_method: paymentMethod,
        },
        theme: {
          color: '#6651A4',
        },
        handler: async (response) => {
          setIsProcessing(true)
          try {
            const order = await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              checkoutData,
              paymentMethodLabel: getPaymentMethodLabel(),
            })

            addPaymentLog({
              type: 'Debit',
              amount: order.total,
              method: getPaymentMethodLabel(),
            })

            sessionStorage.setItem('TOYOVOINDIA_last_order', JSON.stringify({
              orderNumber: order.orderNumber,
              email: order.customerEmail,
            }))

            clearCart()
            navigate('/order-success', { state: { order } })
          } catch (error) {
            alert(error.message || 'Payment verification failed')
          } finally {
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      if (paymentMethod === 'upi') {
        options.config = {
          display: {
            blocks: {
              preferred: {
                name: 'Pay using UPI',
                instruments: [{ method: 'upi' }],
              },
            },
            sequence: ['block.preferred'],
            preferences: { show_default_blocks: true },
          },
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', (response) => {
        setIsLaunchingPayment(false)
        setIsProcessing(false)
        alert(response.error?.description || 'Payment failed')
      })
      setIsLaunchingPayment(false)
      razorpay.open()
    } catch (error) {
      setIsLaunchingPayment(false)
      setIsProcessing(false)
      alert(error.message || 'Unable to start payment')
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

      {isLaunchingPayment && (
        <div className="fixed inset-0 z-[1900] bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10">
           <div className="relative mb-8">
              <div className="w-20 h-20 border-8 border-gray-100 border-t-[#6651A4] rounded-full animate-spin" />
           </div>
           <h2 className="text-2xl font-grandstander font-bold text-[#333] mb-3">Opening Secure Payment...</h2>
           <p className="text-gray-500 max-w-sm font-medium">We are connecting with Razorpay. Please wait a moment.</p>
        </div>
      )}
      
      {/* Mobile/Tablet Header */}
      <div className="lg:hidden w-full bg-white border-b border-gray-100 sticky top-0 z-[100] px-4 py-4 flex items-center justify-between">
         <Link to="/" className="text-2xl font-grandstander font-bold text-[#333] tracking-tighter">TOYOVOINDIA</Link>
         <Link to="/cart" className="w-10 h-10 bg-[#FDF4E6] rounded-xl flex items-center justify-center text-[#E84949]">
            <ShoppingCart size={20} />
         </Link>
      </div>

      {/* Left Side: Delivery/Payment Forms */}
      <div className="w-full lg:w-[60%] px-4 md:px-10 lg:px-20 py-10 lg:py-16">
        <header className="hidden lg:block mb-12">
           <Link to="/" className="text-4xl font-grandstander font-bold text-[#333] tracking-tighter">TOYOVOINDIA</Link>
        </header>

        <nav className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8">
           <Link to="/cart" className="text-[#E84949]">Cart</Link>
           <ChevronRight size={14} className="text-gray-300" />
           <span className={step === 1 ? 'text-[#333]' : 'text-gray-400'}>Information</span>
           <ChevronRight size={14} className="text-gray-300" />
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
               <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-[#333] font-grandstander">Delivery</h2>
                  {addresses?.length > 0 && (
                     <button onClick={() => setUseSavedAddress(!useSavedAddress)} className="text-[11px] font-bold text-[#005BD1] uppercase underline">
                        {useSavedAddress ? 'Enter New Address' : 'Use Saved Address'}
                     </button>
                  )}
               </div>

               {useSavedAddress && addresses?.length > 0 ? (
                  <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(addr => (
                           <div 
                              key={addr.id} 
                              onClick={() => {
                                 setSelectedAddressId(addr.id);
                                 setFormData(prev => ({
                                    ...prev,
                                    firstName: addr.firstName,
                                    lastName: addr.lastName,
                                    address: addr.address,
                                    apartment: addr.apartment,
                                    city: addr.city,
                                    state: addr.state,
                                    postalCode: addr.postalCode,
                                    phone: addr.phone,
                                    district: addr.district
                                 }));
                              }}
                              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${selectedAddressId === addr.id ? 'border-[#005BD1] bg-[#F4F4F4]' : 'border-gray-100 bg-[#F4F4F4] hover:border-gray-200'}`}
                           >
                              <div className="flex justify-between items-start mb-2">
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#005BD1] bg-blue-50 px-2 py-0.5 rounded">{addr.type}</span>
                                 {selectedAddressId === addr.id && <Check size={16} className="text-[#005BD1]"/>}
                              </div>
                              <p className="text-[13px] font-bold text-[#333]">{addr.firstName} {addr.lastName}</p>
                              <p className="text-[12px] text-gray-500 line-clamp-2">{addr.address}, {addr.city === 'Other' ? addr.district : addr.city}, {addr.state}</p>
                              <p className="text-[11px] font-bold text-gray-400 mt-2">T: {addr.phone}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               ) : (
                  <div className="space-y-4">
                     <FloatingSelect label="Country/Region" name="country" value={formData.country} onChange={handleInputChange} options={countries} />
                     <div className="grid grid-cols-2 gap-4">
                        <FloatingInput label="First name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        <FloatingInput label="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                     </div>
                     <FloatingInput label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                     <FloatingInput label="Apartment, suite, etc. (optional)" name="apartment" value={formData.apartment} onChange={handleInputChange} />
                     <div className="grid grid-cols-2 gap-4">
                        <FloatingSelect label="State" name="state" value={formData.state} onChange={handleInputChange} options={["", ...indianStates]} />
                        <FloatingSelect label="City" name="city" value={formData.city} onChange={handleInputChange} options={["", ...(commonCities[formData.state] || []), "Other"]} />
                     </div>
                     {formData.city === 'Other' && (
                        <FloatingInput label="Enter City/District" name="district" value={formData.district} onChange={handleInputChange} />
                     )}
                     <div className="grid grid-cols-2 gap-4">
                        <FloatingInput label="ZIP code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                        <FloatingInput label="Phone number" name="phone" value={formData.phone} onChange={handleInputChange} />
                     </div>
                  </div>
               )}
            </section>

            <section className="space-y-6">
               <h2 className="text-xl font-bold text-[#333] font-grandstander">Shipping method</h2>
               <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  <label className={`p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'standard' ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                     <div className="flex items-center gap-4">
                        <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="w-4 h-4 accent-[#005BD1]" />
                        <span className="text-[14px] font-medium text-[#333]">Standard Shipping (3-5 days)</span>
                     </div>
                     <span className="font-bold text-[14px]">₹15.00</span>
                  </label>
                  <label className={`p-4 flex items-center justify-between cursor-pointer transition-all ${shippingMethod === 'express' ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                     <div className="flex items-center gap-4">
                        <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="w-4 h-4 accent-[#005BD1]" />
                        <span className="text-[14px] font-medium text-[#333]">Express Delivery (1-2 days)</span>
                     </div>
                     <span className="font-bold text-[14px]">₹45.00</span>
                  </label>
               </div>
            </section>

            <button onClick={() => setStep(2)} className="w-full h-16 bg-[#005BD1] text-white font-bold rounded-xl tracking-widest uppercase hover:bg-[#00459E] transition-all shadow-xl active:scale-95">Continue to payment</button>
          </motion.div>
        ) : (
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-10">
             <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-[13px] bg-gray-50/50">
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Contact</span><span className="grow font-medium">{formData.email}</span><button onClick={() => setStep(1)} className="text-[#005BD1] font-bold">Change</button></div>
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Ship to</span><span className="grow font-medium">{formData.address}, {formData.city}, {formData.state}</span><button onClick={() => setStep(1)} className="text-[#005BD1] font-bold">Change</button></div>
                <div className="p-4 flex gap-4"><span className="text-gray-400 w-20">Method</span><span className="grow font-medium text-capitalize">{shippingMethod} Shipping · ₹{shippingCharge.toFixed(2)}</span></div>
             </div>

             <section className="space-y-6">
                <div>
                   <h2 className="text-xl font-bold text-[#333] font-grandstander">Payment</h2>
                   <p className="text-[12px] text-gray-500 font-medium">All transactions are secure and encrypted.</p>
                   <p className="text-[11px] text-[#005BD1] font-bold mt-1">✓ Secure Payment Gateway</p>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                   
                   {/* Card Option */}
                   <div className={`p-5 transition-all ${paymentMethod === 'card' ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('card')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'card'} onChange={() => {}} className="w-4 h-4 accent-[#005BD1]" />
                            <span className="font-bold text-[#333] text-[14px] flex items-center gap-2"><CreditCard size={16}/> Credit/Debit Card</span>
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
                   <div className={`p-5 transition-all ${paymentMethod === 'upi' ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('upi')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'upi'} onChange={() => {}} className="w-4 h-4 accent-[#005BD1]" />
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

                   {/* Net Banking Option */}
                   <div className={`p-5 transition-all ${paymentMethod === 'netbanking' ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setPaymentMethod('netbanking')}>
                         <div className="flex items-center gap-4">
                            <input type="radio" checked={paymentMethod === 'netbanking'} onChange={() => {}} className="w-4 h-4 accent-[#005BD1]" />
                            <span className="font-bold text-[#333] text-[14px] flex items-center gap-2"><Landmark size={16}/> Net Banking</span>
                         </div>
                      </div>
                      {paymentMethod === 'netbanking' && (
                        <motion.div initial={{height:0}} animate={{height:'auto'}} className="mt-4 pt-4 border-t border-gray-200">
                           <FloatingSelect label="Select Bank" name="bank" options={["", "HDFC Bank", "SBI Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra"]} />
                        </motion.div>
                      )}
                   </div>
                </div>
             </section>

             {/* Mobile/Tablet Reimagined Summary (Screenshot 1 & 2) */}
             <div className="lg:hidden space-y-6">
                <button 
                  onClick={() => setShowSummary(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-[12px] font-bold text-[#333] hover:bg-gray-50 transition-all shadow-sm"
                >
                   <Tag size={14} className="text-gray-400" /> Add discount
                </button>

                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                   <AnimatePresence mode="wait">
                      {!showSummary ? (
                         <motion.button
                            key="collapsed"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowSummary(true)}
                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-all"
                         >
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden p-1">
                                  <img src={cartItems[0]?.img} className="w-full h-full object-contain" />
                               </div>
                               <div className="text-left">
                                  <span className="block text-[14px] font-bold text-[#333]">Total</span>
                                  <span className="block text-[11px] text-gray-400 font-medium">{cartItems.reduce((acc, i) => acc + i.qty, 0)} items</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <div className="flex items-baseline gap-1">
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">INR</span>
                                  <span className="text-[16px] font-bold text-[#333]">₹{total.toFixed(2)}</span>
                               </div>
                               <ChevronDown size={16} className="text-gray-400" />
                            </div>
                         </motion.button>
                      ) : (
                         <motion.div
                            key="expanded"
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="bg-[#F9F9F9]"
                         >
                            <button 
                               onClick={() => setShowSummary(false)}
                               className="w-full flex items-center justify-between p-5 border-b border-gray-100 bg-white"
                            >
                               <span className="text-[15px] font-bold text-[#005BD1]">Order summary</span>
                               <ChevronUp size={18} className="text-[#005BD1]" />
                            </button>
                            
                            <div className="p-6 space-y-6">
                               <div className="space-y-5 max-h-[40vh] overflow-y-auto px-2 pt-2 custom-scrollbar">
                                  {cartItems.map(item => (
                                     <div key={item.id} className="flex items-center gap-4 pt-1 pr-1">
                                        <div className="w-16 h-16 rounded-2xl border border-gray-200 relative bg-white shadow-sm shrink-0">
                                           <img src={item.img} className="w-full h-full object-cover rounded-2xl" />
                                           <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#333] text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm z-10">{item.qty}</span>
                                        </div>
                                        <div className="grow min-w-0">
                                           <h4 className="text-[13px] font-bold text-[#333] truncate leading-tight">{item.title}</h4>
                                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">SKU: {item.sku || 'TOY-001'}</p>
                                        </div>
                                        <span className="text-[15px] font-bold text-[#333] shrink-0">₹{(item.price * item.qty).toFixed(2)}</span>
                                     </div>
                                  ))}
                               </div>

                               <CouponSection 
                                  discountCode={discountCode}
                                  setDiscountCode={setDiscountCode}
                                  applyDiscount={applyDiscount}
                                  isApplyingCoupon={isApplyingCoupon}
                                  couponError={couponError}
                                  isDiscountApplied={isDiscountApplied}
                                  couponState={couponState}
                                  compact
                               />

                               <div className="pt-6 border-t border-gray-200 space-y-3 text-[14px]">
                                  <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Subtotal</span><span className="font-bold text-[#333]">₹{subtotal.toFixed(2)}</span></div>
                                  <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Shipping</span><span className="font-bold text-[#333]">₹{shippingCharge.toFixed(2)}</span></div>
                                  {isDiscountApplied && <div className="flex justify-between items-center text-green-600 font-bold"><span>Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>}
                                  <div className="flex justify-between items-center pt-5 mt-2 border-t border-gray-200">
                                     <span className="text-[18px] font-bold text-[#333]">Total</span>
                                     <div className="flex items-baseline gap-1.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">INR</span>
                                        <span className="text-[26px] font-bold text-[#333]">₹{total.toFixed(2)}</span>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             <div className="flex flex-col gap-4">
                <button onClick={startPayment} disabled={isProcessing || isLaunchingPayment} className="w-full h-16 bg-[#005BD1] text-white font-bold rounded-xl tracking-widest uppercase hover:bg-[#00459E] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl">
                   Pay Now — ₹{total.toFixed(2)}
                </button>
                <button onClick={() => setStep(1)} className="text-[12px] font-bold text-gray-400 hover:text-[#333] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"><ChevronLeft size={16} /> Return to information</button>
             </div>
          </motion.div>
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className="hidden lg:block w-full lg:w-[40%] bg-[#F5F5F5] border-l border-gray-200 min-h-screen px-4 md:px-10 py-16 sticky top-0">
        <div className="max-w-[420px]">
          <div className="space-y-6 max-h-[50vh] overflow-y-auto px-2 py-4 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 group pt-2 pr-2">
                <div className="w-16 h-16 rounded-xl border border-gray-200 relative bg-white shadow-sm group-hover:shadow-md transition-all">
                  <img src={item.img} className="w-full h-full object-cover rounded-xl" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#333] text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm z-10">{item.qty}</span>
                </div>
                <div className="grow"><h4 className="text-[13px] font-bold text-[#333] font-grandstander">{item.title}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {item.sku || 'TOY-001'}</p></div>
                <span className="text-[15px] font-bold text-[#333] tracking-tighter">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <CouponSection 
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            applyDiscount={applyDiscount}
            isApplyingCoupon={isApplyingCoupon}
            couponError={couponError}
            isDiscountApplied={isDiscountApplied}
            couponState={couponState}
          />

          <div className="mt-10 pt-10 border-t border-gray-200 space-y-4 text-[14px]">
             <div className="flex justify-between"><span className="text-gray-500 font-medium">Subtotal</span><span className="font-bold tracking-tighter text-[#333]">₹{subtotal.toFixed(2)}</span></div>
             <div className="flex justify-between"><span className="text-gray-500 font-medium">Shipping</span><span className="font-bold tracking-tighter text-[#333]">₹{shippingCharge.toFixed(2)}</span></div>
             {isDiscountApplied && <div className="flex justify-between text-green-600 font-bold"><span>Discount ({couponState?.coupon?.code})</span><span className="tracking-tighter">-₹{discountAmount.toFixed(2)}</span></div>}
             <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
               <span className="text-[20px] font-bold font-grandstander text-[#333]">Total</span>
               <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">INR</span>
                  <span className="text-4xl font-bold font-grandstander text-[#333] tracking-tighter">₹{total.toFixed(2)}</span>
               </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
