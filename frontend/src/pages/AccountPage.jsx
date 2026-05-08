import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePayment } from '../context/PaymentContext'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Package, MapPin, LogOut, ChevronRight, Wallet, History, CreditCard, 
  Plus, ArrowUpRight, ArrowDownLeft, Check, Smartphone, Landmark, Truck, 
  AlertCircle, X, Search, Lock, Loader2, ShieldCheck, Home, Edit2, Save, 
  Trash2, HelpCircle, Shield, FileText, ChevronLeft, Star, ShoppingBag, Gift, Heart, Menu, RefreshCw, Box, ExternalLink, Building, Map, ChevronDown
} from 'lucide-react'
import { indianStates, commonCities, addressTypes } from '../utils/indiaData'
import { cancelMyOrder, getMyOrders } from '../services/orderApi'
import { useToast } from '../context/ToastContext'

const upiLogos = {
  'Google Pay': (
    <svg viewBox="0 0 48 48" className="h-6 w-auto">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  ),
  'PhonePe': (
    <svg viewBox="0 0 120 120" className="h-6 w-auto">
      <rect width="120" height="120" rx="20" fill="#5f259f"/>
      <circle cx="60" cy="60" r="25" fill="white"/>
      <path d="M60 45v30M45 60h30" stroke="#5f259f" strokeWidth="8"/>
    </svg>
  ),
  'Paytm': (
    <svg viewBox="0 0 100 100" className="h-6 w-auto">
      <rect width="100" height="100" rx="10" fill="#00baf2"/>
      <text x="50" y="65" fontSize="26" fontWeight="bold" fill="white" textAnchor="middle">Paytm</text>
    </svg>
  )
}

const states = ["Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"];
const citiesByState = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Zirakpur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"]
};

// Indian Banks List
const indianBanks = [
  "HDFC Bank", "State Bank of India (SBI)", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
  "Punjab National Bank (PNB)", "Bank of Baroda", "Canara Bank", "Union Bank of India",
  "IndusInd Bank", "Yes Bank", "IDFC First Bank", "Standard Chartered", "Federal Bank"
];

// Enhanced Payment Method Modal
const AddPaymentMethodModal = ({ isOpen, type, onComplete, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => { 
    if (!isOpen) {
      setFormData({});
      setErrors({});
    } 
  }, [isOpen]);

  const handleNumericChange = (e, field, length) => {
    const value = e.target.value.replace(/\D/g, '');
    if (length && value.length > length) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'bankAccounts' && (!formData.bankName || !formData.accNo || !formData.ifsc)) {
      setErrors({ msg: 'All bank fields are required' });
      return;
    }
    if (type === 'upiIds' && (!formData.upiId || !formData.upiId.includes('@'))) {
      setErrors({ msg: 'Please enter a valid UPI ID (e.g. user@upi)' });
      return;
    }
    if (type === 'cards' && (!formData.cardNo || formData.cardNo.length < 16 || !formData.exp || !formData.cvv)) {
      setErrors({ msg: 'Please enter valid card details' });
      return;
    }
    onComplete(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300000] flex items-center justify-center p-4 bg-[#333]/60 backdrop-blur-md font-roboto">
       <motion.div initial={{scale: 0.95, opacity:0}} animate={{scale: 1, opacity:1}} className="bg-[#FAEAD3] w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl border border-white/40">
          <div className="bg-[#E84949] p-6 text-white flex justify-between items-center shadow-lg">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Plus size={18}/></div>
               <div>
                 <h3 className="font-grandstander text-lg font-bold leading-tight">Secure Addition</h3>
                 <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Registering {type === 'bankAccounts' ? 'Bank' : type === 'upiIds' ? 'UPI' : 'Card'}</p>
               </div>
             </div>
             <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20}/></button>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-6">
             {type === 'bankAccounts' && (
               <>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Bank</label>
                   <div className="relative group">
                     <select value={formData.bankName || ''} onChange={e=>setFormData({...formData, bankName: e.target.value})} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold appearance-none transition-all cursor-pointer">
                        <option value="">Choose your bank</option>
                        {indianBanks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                     </select>
                     <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Account Number</label>
                   <input type="text" placeholder="XXXX XXXX XXXX" value={formData.accNo || ''} onChange={e=>handleNumericChange(e, 'accNo', 18)} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold tracking-widest" />
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">IFSC Code</label>
                   <input type="text" placeholder="HDFC0001234" maxLength="11" value={formData.ifsc || ''} onChange={e=>setFormData({...formData, ifsc: e.target.value.toUpperCase()})} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold uppercase tracking-widest" />
                 </div>
               </>
             )}

             {type === 'upiIds' && (
               <div className="space-y-1.5">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">UPI ID (VPA)</label>
                 <input type="text" placeholder="username@upi" value={formData.upiId || ''} onChange={e=>setFormData({...formData, upiId: e.target.value})} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold lowercase" />
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 ml-1 flex items-center gap-1"><ShieldCheck size={10}/> Verified VPA only</p>
               </div>
             )}

             {type === 'cards' && (
               <>
                 <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Card Number</label>
                   <div className="relative">
                     <input type="text" placeholder="XXXX XXXX XXXX XXXX" value={formData.cardNo || ''} onChange={e=>handleNumericChange(e, 'cardNo', 16)} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold font-mono tracking-widest" />
                     <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20}/>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Expiry Date</label>
                     <input type="text" placeholder="MM/YY" maxLength="5" value={formData.exp || ''} onChange={e=>{
                       let v = e.target.value.replace(/\D/g, '');
                       if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2,4);
                       setFormData({...formData, exp: v});
                     }} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold text-center" />
                   </div>
                   <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">CVV</label>
                     <input type="password" placeholder="***" value={formData.cvv || ''} onChange={e=>handleNumericChange(e, 'cvv', 3)} className="w-full h-14 px-5 bg-[#FDF4E6] border-2 border-transparent focus:border-[#E84949] rounded-2xl outline-none text-sm font-bold text-center" />
                   </div>
                 </div>
               </>
             )}

             {errors.msg && (
               <motion.div initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                 <AlertCircle className="text-red-500" size={14}/>
                 <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">{errors.msg}</p>
               </motion.div>
             )}

             <div className="pt-4">
                <button type="submit" className="w-full h-16 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-[#E84949] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                   <ShieldCheck size={16}/> Securely Save Details
                </button>
             </div>
          </form>
       </motion.div>
    </div>
  )
}

export function AccountPage() {
  const { user, authLoading, logout, updateUser, addresses, addAddress, deleteAddress, updateAddress, setAsDefaultAddress } = useAuth()
  const { paymentHistory, savedMethods, addSavedMethod, deleteSavedMethod } = usePayment()
  const { wishlist } = useCart()
  const { success, error: showError } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard')
  const [viewMode, setViewMode] = useState(location.state?.activeTab ? 'content' : 'menu')
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [profileForm, setProfileForm] = useState(user || {})
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [addressForm, setAddressForm] = useState({ type: 'Home', firstName: '', lastName: '', address: '', apartment: '', city: '', state: '', postalCode: '', phone: '', district: '' })

  const [showAddPayment, setShowAddPayment] = useState(false)
  const [paymentTypeToAdd, setPaymentTypeToAdd] = useState('bankAccounts')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const canCancelOrder = (order) => ['pending', 'processing'].includes(order?.status)

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return

    setIsProcessing(true)
    try {
      const updatedOrder = await cancelMyOrder(orderId)
      setOrders((prev) => prev.map((order) => order.id === orderId ? updatedOrder : order))
      setSelectedOrder((prev) => (prev?.id === orderId ? updatedOrder : prev))
      success(`Order ${updatedOrder.orderNumber} cancelled.`)
    } catch (err) {
      showError(err.message || 'Order cancellation failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // Corporate Info based on Image
  const corporateInfo = {
    name: "TOYOVO INDIA (OPC) PRIVATE LIMITED",
    cin: "U47912PB2026OPC068091",
    pan: "AANCT0674K",
    tan: "PTLT16619B",
    incDate: "22nd April 2026",
    address: "UNIT 703, 7th FLOOR, BLOCK 1 MAYAGARDEN, Zirakpur, Rajpura, Mohali- 140603, Punjab"
  }

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'account-page-overrides';
    style.innerHTML = `header, .announcement-bar, footer { display: none !important; } body { overflow: hidden; }`;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('account-page-overrides');
      if (el) el.remove();
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!authLoading && !user) navigate('/login')
  }, [authLoading, user, navigate])

  useEffect(() => {
    if (!user) return

    let isMounted = true
    const loadOrders = async () => {
      setOrdersLoading(true)
      try {
        const { orders: data } = await getMyOrders({ limit: 50 })
        if (isMounted) setOrders(data)
      } catch {
        if (isMounted) setOrders([])
      } finally {
        if (isMounted) setOrdersLoading(false)
      }
    }

    loadOrders()
    return () => {
      isMounted = false
    }
  }, [user])

  if (authLoading) return null
  if (!user) return null

  const handleTabChange = (id) => {
    setActiveTab(id); setViewMode('content'); window.scrollTo(0, 0);
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Star size={16}/>, color: 'text-yellow-500/60' },
    { id: 'orders', label: 'Order History', icon: <Box size={16}/>, color: 'text-[#6651A4]/60' },
    { id: 'payments', label: 'Bank & Cards', icon: <CreditCard size={16}/>, color: 'text-[#E84949]/60' },
    { id: 'addresses', label: 'Saved Bases', icon: <MapPin size={16}/>, color: 'text-green-500/60' },
    { id: 'wishlist', label: 'My Wishlist', icon: <Heart size={16}/>, color: 'text-pink-500/60', isLink: true, path: '/wishlist' },
    { id: 'profile', label: 'Settings', icon: <User size={16}/>, color: 'text-blue-500/60' },
  ]

  const legalItems = [
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={14}/> },
    { id: 'returns', label: 'Returns & Exchange', icon: <RefreshCw size={14}/> },
    { id: 'shipping', label: 'Shipping Policy', icon: <Truck size={14}/> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={14}/> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText size={14}/> },
  ]

  return (
    <div className="fixed inset-0 z-[200000] bg-[#FDF4E6] flex flex-col lg:flex-row overflow-hidden text-gray-600 font-roboto">
      
      {/* Add Payment Method Modal */}
      <AddPaymentMethodModal 
        isOpen={showAddPayment} 
        type={paymentTypeToAdd} 
        onCancel={() => setShowAddPayment(false)} 
        onComplete={(data) => { 
          setShowAddPayment(false); 
          setIsProcessing(true); 
          setTimeout(() => { 
            addSavedMethod(paymentTypeToAdd, data); 
            setIsProcessing(false); 
          }, 1000); 
        }} 
      />

      {isProcessing && (
        <div className="fixed inset-0 z-[1000000] bg-[#FDF4E6]/95 backdrop-blur-md flex flex-col items-center justify-center">
           <div className="w-8 h-8 border-2 border-gray-100 border-t-[#6651A4] rounded-full animate-spin mb-3" />
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Authenticating...</p>
        </div>
      )}

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[300000] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
             <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="bg-[#FDF4E6] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
                <div className="p-8 space-y-6">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6651A4] shadow-sm"><Box size={24}/></div>
                         <div><h3 className="text-lg font-grandstander font-bold">Order #{selectedOrder.orderNumber}</h3><p className="text-[10px] text-gray-400 font-bold uppercase">{selectedOrder.date}</p></div>
                      </div>
                      <button onClick={()=>setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                   </div>
                   <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex gap-4 p-3 bg-white/50 rounded-2xl border border-black/[0.03]">
                           <img src={item.img} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                           <div><h4 className="text-[12px] font-bold line-clamp-1">{item.title}</h4><p className="text-[10px] text-gray-400 mt-1">₹{item.price.toFixed(2)} · Qty {item.qty}</p></div>
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between items-center p-5 bg-[#FAEAD3] rounded-2xl">
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Value</p><p className="text-2xl font-bold font-grandstander text-gray-700">₹{selectedOrder.total.toFixed(2)}</p></div>
                      <div className="text-right"><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Current Status</p><p className="text-[12px] font-bold text-green-500 uppercase tracking-widest">{selectedOrder.statusLabel}</p></div>
                    </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     <div className="p-4 bg-white/60 rounded-2xl border border-black/[0.03]">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Expected Delivery</p>
                       <p className="mt-2 text-[13px] font-bold text-gray-700">{selectedOrder.deliveryDate || '-'}</p>
                     </div>
                     <div className="p-4 bg-white/60 rounded-2xl border border-black/[0.03]">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tracking Number</p>
                       <p className="mt-2 text-[13px] font-bold text-gray-700">{selectedOrder.trackingNumber || '-'}</p>
                     </div>
                   </div>
                   {selectedOrder.deliveryDelayReason && (
                     <div className="p-4 bg-white/60 rounded-2xl border border-black/[0.03]">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Delivery Update</p>
                       <p className="mt-2 text-[12px] font-medium text-gray-600">{selectedOrder.deliveryDelayReason}</p>
                     </div>
                   )}
                   {canCancelOrder(selectedOrder) && (
                     <button
                       onClick={() => handleCancelOrder(selectedOrder.id)}
                       className="w-full h-12 bg-[#E84949] text-white rounded-2xl font-bold uppercase tracking-[0.18em] text-[10px] hover:bg-[#333] transition-all"
                     >
                       Cancel Order
                     </button>
                   )}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LEFT PANEL - Fixed Sidebar */}
      <div className={`w-full lg:w-[320px] bg-[#FAEAD3] h-screen lg:flex flex-col border-r border-black/[0.03] transition-transform duration-300 shrink-0 ${viewMode === 'content' ? 'hidden lg:flex' : 'flex'}`}>
         
         <div className="bg-[#6651A4] h-[200px] relative shrink-0 rounded-b-[60px] overflow-hidden flex flex-col items-center justify-center">
            {/* Geometric Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E84949]/10 rounded-full -ml-24 -mb-24 blur-2xl" />
            
            <Link to="/" className="absolute top-6 left-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 shadow-sm z-20">
               <Home size={18} className="text-white" />
            </Link>

            <div className="relative z-10 flex flex-col items-center gap-3">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-[4px] border-[#FAEAD3] shadow-xl text-3xl font-bold font-grandstander text-[#6651A4]">
                  {user.firstName.charAt(0)}
               </div>
               <div className="text-center">
                  <h2 className="text-2xl font-grandstander font-bold tracking-tight text-white">{user.firstName} {user.lastName}</h2>
                  <p className="text-[8px] font-bold text-white/40 uppercase tracking-[0.4em] mt-1">{user.email}</p>
               </div>
            </div>
         </div>

         <div className="grow overflow-y-auto custom-scrollbar p-5 flex flex-col">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Quick Navigation</p>
            <div className="space-y-0.5 mb-10">
               {menuItems.map(item => (
                 <button key={item.id} onClick={() => item.isLink ? navigate(item.path) : handleTabChange(item.id)} className={`w-full p-3.5 rounded-xl flex items-center gap-4 transition-all border-b border-black/[0.03] last:border-b-0 ${activeTab === item.id ? 'bg-white shadow-sm' : 'hover:bg-white/40'}`}>
                    <span className={item.color}>{item.icon}</span>
                    <span className={`text-[12px] font-bold ${activeTab === item.id ? 'text-[#333]' : 'text-gray-500'}`}>{item.label}</span>
                    {activeTab === item.id && <ChevronRight size={14} className="ml-auto text-[#6651A4]/40"/>}
                 </button>
               ))}
            </div>

            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Help & Policy</p>
            <div className="space-y-0.5">
               {legalItems.map(item => (
                 <button key={item.id} onClick={() => {
                    if (item.id === 'returns') navigate('/pages/return-exchange');
                    else if (item.id === 'shipping') navigate('/pages/shipping-policy');
                    else if (item.id === 'privacy') navigate('/pages/privacy-policy');
                    else if (item.id === 'terms') navigate('/pages/terms-conditions');
                    else if (item.id === 'help') navigate('/pages/faq');
                    else handleTabChange(item.id);
                 }} className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all border-b border-black/[0.02] last:border-b-0 ${activeTab === item.id ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                    <span className="opacity-60">{item.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                 </button>
               ))}
            </div>

            <div className="mt-auto pt-10 pb-6">
               <button 
                 onClick={logout}
                 className="w-full bg-white border border-[#E84949]/5 py-4 rounded-full flex items-center justify-center gap-3 group hover:shadow-xl hover:shadow-[#E84949]/5 transition-all active:scale-95 shadow-sm"
               >
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-[#E84949] group-hover:text-white transition-all text-[#E84949]">
                     <LogOut size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E84949]">Logout</span>
               </button>
            </div>
         </div>
      </div>

      {/* RIGHT PANEL - Content Area */}
      <div className={`grow h-full overflow-y-auto custom-scrollbar flex flex-col bg-[#FDF4E6] ${viewMode === 'menu' ? 'hidden lg:flex' : 'flex'}`}>
         
         <div className="sticky top-0 z-50 bg-[#FDF4E6]/90 backdrop-blur-md px-6 py-5 border-b border-black/[0.03] flex items-center gap-4">
            <button onClick={() => setViewMode('menu')} className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#333] shadow-sm lg:hidden"><Menu size={18}/></button>
            <h3 className="font-grandstander font-bold text-[16px] text-gray-700 capitalize tracking-tight">{activeTab}</h3>
         </div>

         <div className="p-4 md:p-8 lg:p-10 w-full space-y-12 pb-32">
            <AnimatePresence mode="wait">
               
               {activeTab === 'dashboard' && (
                 <motion.div key="dashboard" initial={{opacity:0}} animate={{opacity:1}} className="space-y-10">
                    <div className="flex justify-between items-end border-b border-black/[0.03] pb-10">
                       <div><h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Hello, {user.firstName}!</h1><p className="text-gray-400 font-medium text-xs mt-1">Ready to explore more toys?</p></div>
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#E84949] shadow-sm border border-white"><Star size={32} fill="#E84949" className="opacity-30"/></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="p-8 bg-[#FAEAD3] rounded-3xl space-y-4 hover:shadow-md transition-all group relative">
                          <button onClick={() => handleTabChange('orders')} className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-400 hover:text-[#6651A4] shadow-sm transition-all"><ExternalLink size={14}/></button>
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6651A4] group-hover:scale-110 transition-all"><Package size={20}/></div>
                          <div><p className="text-3xl font-bold font-grandstander text-gray-700">{orders.length}</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Hauls</p></div>
                       </div>
                       <div className="p-8 bg-[#FAEAD3] rounded-3xl space-y-4 hover:shadow-md transition-all group relative">
                          <button onClick={() => handleTabChange('wishlist')} className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-400 hover:text-[#6651A4] shadow-sm transition-all"><ExternalLink size={14}/></button>
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pink-500 group-hover:scale-110 transition-all"><Heart size={20}/></div>
                          <div><p className="text-3xl font-bold font-grandstander text-gray-700">{wishlist.length}</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved Joy</p></div>
                       </div>
                       <div className="p-8 bg-[#FAEAD3] rounded-3xl space-y-4 hover:shadow-md transition-all group relative">
                          <button onClick={() => handleTabChange('payments')} className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-400 hover:text-[#6651A4] shadow-sm transition-all"><ExternalLink size={14}/></button>
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-all"><Landmark size={20}/></div>
                          <div><p className="text-3xl font-bold font-grandstander text-gray-700">{savedMethods.bankAccounts.length + savedMethods.upiIds.length + savedMethods.cards.length}</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Accounts</p></div>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* Legal/Support Content Mapping with Image Details */}
               {['help', 'returns', 'shipping', 'privacy', 'terms'].includes(activeTab) && (
                  <motion.div key={activeTab} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-12">
                     <div className="space-y-4">
                        <h3 className="text-4xl font-grandstander font-bold text-gray-700 uppercase tracking-tight">{activeTab}</h3>
                        <p className="text-gray-400 font-medium italic">Official Statement of {corporateInfo.name}</p>
                     </div>

                     <div className="space-y-8 text-gray-600 leading-relaxed">
                        <div className="p-10 bg-[#FAEAD3] rounded-[40px] border border-black/[0.03] space-y-6">
                           <div className="flex items-center gap-4 text-[#6651A4] font-bold text-sm uppercase tracking-[0.2em] mb-4">
                              <Building size={20}/> Corporate Identity
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] font-medium">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entity Name</p>
                                 <p>{corporateInfo.name}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CIN Number</p>
                                 <p>{corporateInfo.cin}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registered Office</p>
                                 <p className="leading-relaxed">{corporateInfo.address}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tax Identifiers</p>
                                 <p>PAN: {corporateInfo.pan} · TAN: {corporateInfo.tan}</p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 px-4">
                           <h4 className="text-xl font-grandstander font-bold text-gray-700">Detailed Policies</h4>
                           <p className="text-[15px]">At TOYOVOINDIA, our operations are governed by the Companies Act, 2013. Incorporated on {corporateInfo.incDate}, we strive to maintain the highest standards of transparency for our explorers.</p>
                           <p className="text-[15px]">Your engagement with our platform, including orders, returns, and wallet usage, is protected under the laws of the Ministry of Corporate Affairs, Government of India.</p>
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* Other Tabs (Wallet, Orders, Profile, etc.) continue below */}
               {activeTab === 'orders' && (
                 <motion.div key="orders" initial={{opacity:0}} animate={{opacity:1}} className="space-y-0.5">
                    {ordersLoading ? (
                       <div className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-[9px]">Loading Orders...</div>
                    ) : orders.length === 0 ? (
                       <div className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-[9px]">Empty Haul History</div>
                    ) : orders.map(order => (
                       <div key={order.id} onClick={()=>setSelectedOrder(order)} className="p-4 md:p-5 hover:bg-[#FAEAD3]/40 border-b border-black/[0.02] flex items-center justify-between cursor-pointer group transition-all">
                          <div className="flex items-center gap-4 md:gap-5">
                             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-black/5 shadow-sm">
                                {order.items?.[0]?.img ? (
                                   <img src={order.items[0].img} className="w-full h-full object-cover" />
                                ) : (
                                   <Box size={20} className="text-[#6651A4] opacity-20"/>
                                )}
                             </div>
                             <div><p className="text-[13px] font-bold text-gray-700">Order #{order.orderNumber}</p><p className="text-[10px] text-gray-400 font-medium">{order.date} · {order.items.length} Items · ETA {order.deliveryDate || '-'}</p></div>
                          </div>
                          <div className="text-right flex items-center gap-4 md:gap-6">
                             <div>
                               <p className="text-lg md:text-xl font-bold font-grandstander text-gray-700">₹{order.total.toFixed(2)}</p>
                               <p className={`text-[9px] font-bold uppercase ${order.status==='cancelled'?'text-red-400':'text-green-500'}`}>{order.statusLabel}</p>
                               {canCancelOrder(order) && (
                                 <button
                                   onClick={(event) => {
                                     event.stopPropagation()
                                     handleCancelOrder(order.id)
                                   }}
                                   className="mt-2 text-[9px] font-bold uppercase tracking-widest text-[#E84949] hover:text-[#333] transition-colors"
                                 >
                                   Cancel
                                 </button>
                               )}
                             </div>
                             <ChevronRight size={18} className="text-[#333]/40 group-hover:text-[#333] translate-x-0 group-hover:translate-x-1 transition-all"/>
                          </div>
                       </div>
                    ))}
                 </motion.div>
               )}

               {activeTab === 'payments' && (
                 <motion.div key="payments" initial={{opacity:0}} animate={{opacity:1}} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                       {[
                         { id: 'bankAccounts', label: 'Linked Banks', icon: <Landmark size={24}/>, items: savedMethods.bankAccounts, theme: 'bg-[#FAEAD3]' },
                         { id: 'upiIds', label: 'UPI Addresses', icon: <Smartphone size={24}/>, items: savedMethods.upiIds, theme: 'bg-[#FAEAD3]' },
                         { id: 'cards', label: 'Vaulted Cards', icon: <CreditCard size={24}/>, items: savedMethods.cards, theme: 'bg-[#FAEAD3]' }
                       ].map(section => (
                         <div key={section.id} className={`p-6 md:p-10 ${section.theme} border border-white/20 rounded-[50px] space-y-6 md:space-y-8 shadow-sm hover:shadow-xl transition-all duration-500 group/card relative overflow-hidden`}>
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E84949]/5 rounded-full blur-3xl group-hover/card:bg-[#E84949]/10 transition-colors" />
                            
                            <div className="flex justify-between items-start">
                               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E84949] shadow-inner group-hover/card:scale-110 transition-all duration-500">{section.icon}</div>
                               <button onClick={() => { setPaymentTypeToAdd(section.id); setShowAddPayment(true); }} className="relative z-20 w-10 h-10 bg-[#333] text-white rounded-xl flex items-center justify-center hover:bg-[#E84949] transition-all shadow-lg active:scale-90"><Plus size={20}/></button>
                            </div>
                            
                            <div>
                               <h4 className="text-[14px] font-bold uppercase tracking-widest text-[#333] mb-1 font-grandstander">{section.label}</h4>
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em]">{section.items.length} Active Records</p>
                            </div>

                            <div className="space-y-4">
                               {section.items.map(item => (
                                 <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} key={item.id} className="p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-[24px] flex justify-between items-center group/item hover:bg-white/60 transition-all cursor-default">
                                    <div className="truncate pr-4">
                                       <p className="text-[12px] font-bold text-gray-700 truncate font-grandstander">{item.bankName || item.upiId || `Card • ${item.cardNo.slice(-4)}`}</p>
                                       <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{item.accNo ? `A/C: ${item.accNo.slice(-4)}` : item.exp ? `Exp: ${item.exp}` : 'Primary VPA'}</p>
                                    </div>
                                    <button onClick={() => deleteSavedMethod(section.id, item.id)} className="w-8 h-8 rounded-xl bg-red-50 text-[#E84949] flex items-center justify-center opacity-0 group-hover/item:opacity-100 hover:bg-[#E84949] hover:text-white transition-all transform hover:rotate-12"><Trash2 size={14}/></button>
                                 </motion.div>
                               ))}
                               {section.items.length === 0 && (
                                 <button 
                                   onClick={() => { setPaymentTypeToAdd(section.id); setShowAddPayment(true); }}
                                   className="w-full py-12 flex flex-col items-center gap-3 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all group/empty"
                                 >
                                    <div className="w-12 h-12 border-2 border-dashed border-[#E84949] rounded-2xl flex items-center justify-center group-hover/empty:scale-110 transition-all"><Plus size={16} className="text-[#E84949]"/></div>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Safe & Encrypted</p>
                                 </button>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="space-y-8">
                       <div className="flex items-center justify-between px-6">
                          <h4 className="text-[13px] font-bold uppercase tracking-[0.3em] text-gray-400 font-grandstander">Ledger Records</h4>
                          <History size={16} className="text-gray-300"/>
                       </div>
                       <div className="bg-[#FAEAD3]/30 rounded-[40px] border border-white/20 overflow-hidden">
                          {paymentHistory.length === 0 ? (
                            <div className="py-24 text-center">
                               <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px]">No transaction trail found</p>
                            </div>
                          ) : paymentHistory.map((txn, idx) => (
                             <div key={txn.id} className={`p-6 flex items-center justify-between hover:bg-white/40 transition-all border-b border-white/20 last:border-0 ${idx % 2 === 0 ? 'bg-white/10' : ''}`}>
                                <div className="flex items-center gap-6">
                                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${txn.type==='Refund'?'bg-emerald-400':'bg-[#333]'}`}>{txn.type==='Refund'?<ArrowDownLeft size={20}/>:<ArrowUpRight size={20}/>}</div>
                                   <div>
                                      <p className="text-[14px] font-bold text-gray-700 font-grandstander uppercase tracking-wider">{txn.method}</p>
                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{txn.date} • {txn.id}</p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <p className={`text-2xl font-bold font-grandstander ${txn.type==='Refund'?'text-emerald-500':'text-[#E84949]'}`}>{txn.type==='Refund'?'+':'-'}₹{txn.amount.toFixed(2)}</p>
                                   <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-1">Authorized</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'addresses' && (
                  <motion.div key="addresses" initial={{opacity:0}} animate={{opacity:1}} className="space-y-10">
                     <div className="flex justify-between items-center px-4">
                        <h3 className="text-2xl font-grandstander font-bold text-gray-700">Shipping Bases</h3>
                        <button onClick={() => { 
                           setEditingAddressId(null); 
                           setAddressForm({ type: 'Home', firstName: user.firstName || '', lastName: user.lastName || '', address: '', apartment: '', city: '', state: '', postalCode: '', phone: '', district: '' });
                           setShowAddAddress(!showAddAddress); 
                        }} className="text-[11px] font-bold text-[#6651A4] uppercase flex items-center gap-2 hover:underline transition-all">
                           {showAddAddress ? <X size={18}/> : <Plus size={18}/>} {showAddAddress ? 'Cancel' : 'New Base'}
                        </button>
                     </div>

                     <AnimatePresence>
                        {showAddAddress && (
                          <motion.form 
                            initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} 
                            onSubmit={(e) => { 
                               e.preventDefault(); 
                               if (editingAddressId) {
                                  updateAddress(editingAddressId, addressForm);
                               } else {
                                  addAddress(addressForm);
                               }
                               setShowAddAddress(false); 
                               setEditingAddressId(null);
                            }} 
                            className="p-10 bg-[#FAEAD3] rounded-[50px] space-y-6 overflow-hidden border border-white/40 shadow-xl"
                          >
                             <div className="flex gap-3 mb-4">
                                {addressTypes.map(t => (
                                   <button key={t} type="button" onClick={() => setAddressForm({...addressForm, type: t})} className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${addressForm.type === t ? 'bg-[#333] text-white border-[#333]' : 'bg-[#FDF4E6] border-transparent text-gray-400 hover:border-gray-200'}`}>
                                      {t}
                                   </button>
                                ))}
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="First Name" value={addressForm.firstName} onChange={e=>setAddressForm({...addressForm, firstName: e.target.value})} className="h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                                <input required placeholder="Last Name" value={addressForm.lastName} onChange={e=>setAddressForm({...addressForm, lastName: e.target.value})} className="h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                             </div>
                             <input required placeholder="Street Address" value={addressForm.address} onChange={e=>setAddressForm({...addressForm, address: e.target.value})} className="w-full h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                             <div className="grid grid-cols-2 gap-4">
                                <input placeholder="Apartment, Suite (Optional)" value={addressForm.apartment} onChange={e=>setAddressForm({...addressForm, apartment: e.target.value})} className="h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                                <div className="relative">
                                  <select required value={addressForm.state} onChange={e=>setAddressForm({...addressForm, state: e.target.value, city: ''})} className="w-full h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] appearance-none cursor-pointer">
                                     <option value="">Select State</option>
                                     {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                                  </select>
                                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                </div>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                  <select required value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city: e.target.value})} className="w-full h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] appearance-none cursor-pointer">
                                     <option value="">Select City</option>
                                     {(commonCities[addressForm.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                                     <option value="Other">Other (Manual Entry)</option>
                                  </select>
                                  <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                </div>
                                {addressForm.city === 'Other' && (
                                   <input required placeholder="Enter City/District" value={addressForm.district} onChange={e=>setAddressForm({...addressForm, district: e.target.value})} className="h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-[#E84949]" />
                                )}
                                <input required placeholder="ZIP Code" value={addressForm.postalCode} onChange={e=>setAddressForm({...addressForm, postalCode: e.target.value})} className="h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                             </div>
                             <input required placeholder="Phone Number" value={addressForm.phone} onChange={e=>setAddressForm({...addressForm, phone: e.target.value})} className="w-full h-14 px-6 bg-[#FDF4E6] rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:border-[#E84949] transition-all" />
                             
                             <button type="submit" className="w-full h-16 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#E84949] transition-all shadow-xl active:scale-[0.98] mt-4 flex items-center justify-center gap-3">
                                <ShieldCheck size={18}/> {editingAddressId ? 'Apply Base Modifications' : 'Encrypt & Save This Base'}
                             </button>
                          </motion.form>
                        )}
                     </AnimatePresence>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                        {addresses.map(addr => (
                           <div key={addr.id} className={`p-8 rounded-[40px] border transition-all relative group overflow-hidden ${addr.isDefault ? 'bg-[#FAEAD3] border-[#E84949]/30 shadow-lg' : 'bg-[#FDF4E6] border-white/40 hover:bg-[#FAEAD3] hover:shadow-xl'}`}>
                              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E84949]/5 rounded-full blur-3xl group-hover:bg-[#E84949]/10 transition-colors" />
                              
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                 <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#E84949] transition-all shadow-inner group-hover:scale-110 duration-500">
                                       {addr.type === 'Home' ? <Home size={24}/> : addr.type === 'Office' ? <Building size={24}/> : <MapPin size={24}/>}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-bold text-gray-700 font-grandstander">{addr.firstName} {addr.lastName}</p>
                                       <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{addr.type} Station</p>
                                    </div>
                                 </div>
                                 <div className="flex gap-2">
                                    <button onClick={() => { 
                                       setEditingAddressId(addr.id); 
                                       setAddressForm(addr); 
                                       setShowAddAddress(true); 
                                       window.scrollTo({top: 0, behavior: 'smooth'}); 
                                    }} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-[#6651A4] hover:bg-white transition-all shadow-sm"><Edit2 size={16}/></button>
                                    {!addr.isDefault && (
                                       <button onClick={() => deleteAddress(addr.id)} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-[#E84949] hover:bg-white transition-all shadow-sm"><Trash2 size={16}/></button>
                                    )}
                                 </div>
                              </div>
                              <div className="space-y-1.5 text-[14px] font-medium text-gray-500 mb-8 pl-1 relative z-10 leading-relaxed">
                                 <p className="text-[#333] font-bold">{addr.address}</p>
                                 {addr.apartment && <p>{addr.apartment}</p>}
                                 <p>{addr.city === 'Other' ? addr.district : addr.city}, {addr.state} {addr.postalCode}</p>
                                 <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                                    <Smartphone size={12}/> {addr.phone}
                                 </div>
                              </div>
                              <div className="flex items-center justify-between mt-auto relative z-10 pt-4 border-t border-black/[0.03]">
                                 {!addr.isDefault ? (
                                    <button onClick={() => setAsDefaultAddress(addr.id)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6651A4] hover:text-[#E84949] transition-all">Set as Primary Base</button>
                                 ) : (
                                    <span className="px-4 py-1.5 bg-[#E84949] text-white rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#E84949]/20"><Check size={12}/> Established Primary</span>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}

               {activeTab === 'wishlist' && (
                  <motion.div key="wishlist" initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
                     <h3 className="text-2xl font-grandstander font-bold text-gray-700">My Saved Joy</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {wishlist.length === 0 ? (
                           <div className="col-span-full py-24 text-center border-2 border-dashed border-black/[0.03] rounded-[40px] space-y-6">
                              <Heart className="mx-auto text-gray-100" size={48}/>
                              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">No toys in your wishlist yet</p>
                              <Link to="/" className="inline-block px-10 py-3 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">Start Exploring</Link>
                           </div>
                        ) : wishlist.map(item => (
                           <div key={item.id} className="bg-white/40 p-4 rounded-[32px] border border-black/[0.02] hover:shadow-md transition-all group">
                              <img src={item.img} className="w-full aspect-square object-cover rounded-[24px] mb-4 group-hover:scale-[1.02] transition-transform" />
                              <h4 className="text-[13px] font-bold text-gray-700 line-clamp-1">{item.title}</h4>
                              <p className="text-xl font-bold font-grandstander text-[#E84949] mt-1">${item.price}</p>
                           </div>
                        ))}
                     </div>
                  </motion.div>
               )}

               {activeTab === 'profile' && (
                  <motion.div key="profile" initial={{opacity:0}} animate={{opacity:1}} className="max-w-xl mx-auto space-y-12">
                     <h3 className="text-3xl font-grandstander font-bold text-gray-700 text-center">Identity Hub</h3>
                     <form onSubmit={(e)=>{e.preventDefault(); setIsProcessing(true); setTimeout(()=>{updateUser(profileForm); setIsProcessing(false); alert("Profile Updated!");},1000);}} className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">First Name</label>
                              <input value={profileForm.firstName} onChange={e=>setProfileForm({...profileForm, firstName:e.target.value})} className="w-full h-12 px-6 bg-[#FAEAD3]/50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#6651A4] font-bold text-gray-600" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Last Name</label>
                              <input value={profileForm.lastName} onChange={e=>setProfileForm({...profileForm, lastName:e.target.value})} className="w-full h-12 px-6 bg-[#FAEAD3]/50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#6651A4] font-bold text-gray-600" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Explorer Email</label>
                           <input value={profileForm.email} onChange={e=>setProfileForm({...profileForm, email:e.target.value})} className="w-full h-12 px-6 bg-[#FAEAD3]/50 rounded-2xl outline-none border-b-2 border-transparent focus:border-[#6651A4] font-bold text-gray-600" />
                        </div>
                        <button type="submit" className="w-full h-16 bg-[#333] text-white rounded-[25px] font-grandstander font-bold uppercase tracking-widest text-[13px] hover:bg-[#6651A4] transition-all shadow-xl">Update Explorer ID</button>
                     </form>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
