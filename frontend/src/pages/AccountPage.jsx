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
  Trash2, HelpCircle, Shield, FileText, ChevronLeft, Star, ShoppingBag, Gift, Heart, Menu, RefreshCw, Box, ExternalLink, Building, Map
} from 'lucide-react'
import { indianStates, commonCities, addressTypes } from '../utils/indiaData'

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

// Enhanced Gateway with Simulation Step
const TopUpGateway = ({ isOpen, method, amount, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedSub, setSelectedSub] = useState('');
  const [vpa, setVpa] = useState('');
  const [cardDetails, setCardDetails] = useState({ no: '', exp: '', cvv: '', type: 'Credit Card' });

  useEffect(() => { if (!isOpen) { setStep(1); setVpa(''); setSelectedSub(''); } }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300000] flex items-center justify-center p-4 bg-[#333]/40 backdrop-blur-md">
       <motion.div initial={{scale: 0.95, opacity:0}} animate={{scale: 1, opacity:1}} className="bg-[#FDF4E6] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
          <div className="bg-[#6651A4] p-5 text-white flex justify-between items-center">
             <div className="flex items-center gap-2"><Lock size={14}/><h3 className="font-grandstander text-xs font-bold uppercase tracking-widest">Secure Gateway</h3></div>
             <button onClick={onCancel} className="p-1.5 hover:bg-white/10 rounded-full transition-all"><X size={16}/></button>
          </div>

          <div className="p-8 space-y-6">
             <div className="text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Payable</p>
                <h4 className="text-3xl font-bold font-grandstander text-gray-700">${parseFloat(amount).toFixed(2)}</h4>
             </div>

             <div className="space-y-4">
                {method === 'upi' && (
                  <div className="space-y-4">
                    {step === 1 ? (
                      <div className="grid grid-cols-3 gap-2">
                         {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                           <button key={app} onClick={() => { setSelectedSub(app); setStep(2); }} className="p-3 bg-white hover:bg-[#FAEAD3]/50 rounded-xl border border-gray-100 transition-all flex flex-col items-center gap-2">
                              <div className="h-6 flex items-center">{upiLogos[app]}</div>
                              <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400 mt-1">{app}</span>
                           </button>
                         ))}
                      </div>
                    ) : step === 2 ? (
                      <div className="space-y-4">
                         <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
                            {upiLogos[selectedSub]}
                            <span className="text-[10px] font-bold text-gray-500 uppercase">{selectedSub}</span>
                         </div>
                         <input type="text" placeholder="enter your vpa (e.g. user@upi)" value={vpa} onChange={e=>setVpa(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-[#6651A4] text-center font-bold text-gray-600 text-sm" />
                         <button onClick={() => setStep(3)} disabled={!vpa} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all">Verify & Pay</button>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                         <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"><Check size={24}/></div>
                         <div>
                            <h5 className="font-bold text-gray-700">Approve Request</h5>
                            <p className="text-[11px] text-gray-500 font-medium px-4 mt-1">Please open your <b>{selectedSub}</b> app and approve the payment of ${amount}</p>
                         </div>
                         <button onClick={() => onComplete(`UPI (${selectedSub})`)} className="w-full h-11 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#5a4892]">Simulate App Approval</button>
                      </div>
                    )}
                  </div>
                )}

                {method === 'card' && (
                  <div className="space-y-4">
                    {step === 1 ? (
                      <div className="space-y-3">
                         <select value={cardDetails.type} onChange={e=>setCardDetails({...cardDetails, type: e.target.value})} className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl text-[11px] font-bold outline-none">
                            <option>Credit Card</option><option>Debit Card</option>
                         </select>
                         <div className="relative">
                            <input type="text" placeholder="Card Number" maxLength="16" value={cardDetails.no} onChange={e=>setCardDetails({...cardDetails, no: e.target.value})} className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none font-mono text-[13px]" />
                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16}/>
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                            <input placeholder="MM/YY" className="h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none text-[11px]" />
                            <input placeholder="CVV" maxLength="3" type="password" className="h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none text-[11px]" />
                         </div>
                         <button onClick={() => setStep(2)} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-all">Continue</button>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                         <div className="p-5 bg-white rounded-2xl border border-dashed border-gray-200">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Authorization</p>
                            <p className="text-sm font-bold text-gray-600 mt-2 font-mono">**** **** **** {cardDetails.no.slice(-4) || '0000'}</p>
                            <div className="mt-4 space-y-2">
                               <p className="text-[10px] font-bold text-gray-300">Enter OTP sent to your phone</p>
                               <div className="flex justify-center gap-2"><div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-md"/><div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-md"/><div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-md"/><div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-md"/></div>
                            </div>
                         </div>
                         <button onClick={() => onComplete(cardDetails.type)} className="w-full h-11 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#5a4892]">Verify OTP & Pay</button>
                      </div>
                    )}
                  </div>
                )}

                {method === 'netbanking' && (
                   <div className="space-y-4 text-center">
                      <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar p-1">
                         {['HDFC Bank', 'SBI Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'PNB Bank', 'BOI', 'Canara Bank'].map(bank => (
                           <button key={bank} onClick={() => setSelectedSub(bank)} className={`p-3 rounded-xl border text-[9px] font-bold uppercase transition-all flex items-center justify-center gap-2 ${selectedSub === bank ? 'bg-[#6651A4] text-white border-[#6651A4]' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                              <Landmark size={12}/> {bank}
                           </button>
                         ))}
                      </div>
                      <button disabled={!selectedSub} onClick={() => onComplete(`Bank (${selectedSub})`)} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] disabled:opacity-30 active:scale-95 transition-all">Login to {selectedSub || 'Bank'}</button>
                   </div>
                )}
             </div>
          </div>
       </motion.div>
    </div>
  )
}

export function AccountPage() {
  const { user, logout, updateUser, addresses, addAddress, deleteAddress, updateAddress, setAsDefaultAddress } = useAuth()
  const { walletBalance, transactions, topUpWallet, orders, cancelOrder } = usePayment()
  const { wishlist } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard')
  const [viewMode, setViewMode] = useState(location.state?.activeTab ? 'content' : 'menu')
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [profileForm, setProfileForm] = useState(user || {})
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [addressForm, setAddressForm] = useState({ type: 'Home', firstName: '', lastName: '', address: '', apartment: '', city: '', state: '', postalCode: '', phone: '', district: '' })

  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpMethod, setTopUpMethod] = useState('upi')
  const [showTopUpGateway, setShowTopUpGateway] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  const handleTabChange = (id) => {
    setActiveTab(id); setViewMode('content'); window.scrollTo(0, 0);
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Star size={16}/>, color: 'text-yellow-500/60' },
    { id: 'orders', label: 'Order History', icon: <Box size={16}/>, color: 'text-[#6651A4]/60' },
    { id: 'wallet', label: 'Wallet & Bank', icon: <Wallet size={16}/>, color: 'text-[#E84949]/60' },
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
      
      {/* Simulation OK Gateway */}
      <TopUpGateway isOpen={showTopUpGateway} method={topUpMethod} amount={topUpAmount} onCancel={() => setShowTopUpGateway(false)} onComplete={(m) => { setShowTopUpGateway(false); setIsProcessing(true); setTimeout(() => { topUpWallet(topUpAmount,m); setTopUpAmount(''); setIsProcessing(false); }, 1500); }} />

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
                         <div><h3 className="text-lg font-grandstander font-bold">Order #{selectedOrder.id}</h3><p className="text-[10px] text-gray-400 font-bold uppercase">{selectedOrder.date}</p></div>
                      </div>
                      <button onClick={()=>setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
                   </div>
                   <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex gap-4 p-3 bg-white/50 rounded-2xl border border-black/[0.03]">
                           <img src={item.img} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                           <div><h4 className="text-[12px] font-bold line-clamp-1">{item.title}</h4><p className="text-[10px] text-gray-400 mt-1">${item.price} · Qty {item.qty}</p></div>
                        </div>
                      ))}
                   </div>
                   <div className="flex justify-between items-center p-5 bg-[#FAEAD3] rounded-2xl">
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Value</p><p className="text-2xl font-bold font-grandstander text-gray-700">${selectedOrder.total.toFixed(2)}</p></div>
                      <div className="text-right"><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Current Status</p><p className="text-[12px] font-bold text-green-500 uppercase tracking-widest">{selectedOrder.status}</p></div>
                   </div>
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
                          <button onClick={() => handleTabChange('wallet')} className="absolute top-4 right-4 p-2 bg-white rounded-xl text-gray-400 hover:text-[#6651A4] shadow-sm transition-all"><ExternalLink size={14}/></button>
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-all"><Wallet size={20}/></div>
                          <div><p className="text-3xl font-bold font-grandstander text-gray-700">${walletBalance.toFixed(2)}</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Funds</p></div>
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
                           <p className="text-[15px]">At Toyove-India, our operations are governed by the Companies Act, 2013. Incorporated on {corporateInfo.incDate}, we strive to maintain the highest standards of transparency for our explorers.</p>
                           <p className="text-[15px]">Your engagement with our platform, including orders, returns, and wallet usage, is protected under the laws of the Ministry of Corporate Affairs, Government of India.</p>
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* Other Tabs (Wallet, Orders, Profile, etc.) continue below */}
               {activeTab === 'orders' && (
                 <motion.div key="orders" initial={{opacity:0}} animate={{opacity:1}} className="space-y-0.5">
                    {orders.length === 0 ? (
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
                             <div><p className="text-[13px] font-bold text-gray-700">Order #{order.id}</p><p className="text-[10px] text-gray-400 font-medium">{order.date} · {order.items.length} Items</p></div>
                          </div>
                          <div className="text-right flex items-center gap-4 md:gap-6">
                             <div><p className="text-lg md:text-xl font-bold font-grandstander text-gray-700">${order.total.toFixed(2)}</p><p className={`text-[9px] font-bold uppercase ${order.status==='Cancelled'?'text-red-400':'text-green-500'}`}>{order.status}</p></div>
                             <ChevronRight size={18} className="text-[#333]/40 group-hover:text-[#333] translate-x-0 group-hover:translate-x-1 transition-all"/>
                          </div>
                       </div>
                    ))}
                 </motion.div>
               )}

               {activeTab === 'wallet' && (
                 <motion.div key="wallet" initial={{opacity:0}} animate={{opacity:1}} className="space-y-12">
                    <div className="text-center space-y-8">
                       <div><p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Toy Treasury</p><h2 className="text-7xl font-bold font-grandstander text-gray-700 tracking-tight leading-none">${walletBalance.toFixed(2)}</h2></div>
                       <div className="max-w-xs mx-auto space-y-6">
                          <input type="number" placeholder="Add Joy ($)" value={topUpAmount} onChange={(e)=>setTopUpAmount(e.target.value)} className="w-full h-11 px-6 bg-transparent border-b border-gray-200 focus:border-[#6651A4] font-grandstander font-bold text-2xl text-center outline-none transition-all" />
                          <div className="flex justify-center gap-2">
                             {['upi', 'card', 'netbanking'].map(m => <button key={m} onClick={()=>setTopUpMethod(m)} className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${topUpMethod===m?'bg-[#333] text-white border-[#333]':'text-gray-400 border-gray-200'}`}>{m}</button>)}
                          </div>
                          <button onClick={() => setShowTopUpGateway(true)} className="w-full h-12 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#E84949] transition-all shadow-lg active:scale-95">Proceed to Recharge</button>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[12px] font-bold uppercase tracking-widest px-4 text-gray-400">Activity Logs</h4>
                       <div className="space-y-0.5">
                          {transactions.map(txn => (
                             <div key={txn.id} className="p-4 flex items-center justify-between border-b border-black/[0.02] hover:bg-[#FAEAD3]/30 transition-all">
                                <div className="flex items-center gap-4">
                                   <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${txn.type==='Credit'?'bg-green-400/60':'bg-[#E84949]/60'}`}>{txn.type==='Credit'?<ArrowDownLeft size={16}/>:<ArrowUpRight size={16}/>}</div>
                                   <div><p className="text-[13px] font-bold text-gray-700">{txn.method}</p><p className="text-[10px] text-gray-400 font-medium">{txn.date}</p></div>
                                </div>
                                <p className={`text-xl font-bold font-grandstander ${txn.type==='Credit'?'text-green-500':'text-gray-700'}`}>{txn.type==='Credit'?'+':'-'}${txn.amount.toFixed(2)}</p>
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
                            className="p-8 bg-[#FAEAD3]/50 rounded-[40px] space-y-5 overflow-hidden border border-black/[0.02]"
                          >
                             <div className="flex gap-2 mb-2">
                                {addressTypes.map(t => (
                                   <button key={t} type="button" onClick={() => setAddressForm({...addressForm, type: t})} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${addressForm.type === t ? 'bg-[#333] text-white border-[#333]' : 'bg-white border-gray-100 text-gray-400'}`}>
                                      {t}
                                   </button>
                                ))}
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <input required placeholder="First Name" value={addressForm.firstName} onChange={e=>setAddressForm({...addressForm, firstName: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none border border-transparent focus:border-[#6651A4]" />
                                <input required placeholder="Last Name" value={addressForm.lastName} onChange={e=>setAddressForm({...addressForm, lastName: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none border border-transparent focus:border-[#6651A4]" />
                             </div>
                             <input required placeholder="Street Address" value={addressForm.address} onChange={e=>setAddressForm({...addressForm, address: e.target.value})} className="w-full h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                             <div className="grid grid-cols-2 gap-4">
                                <input placeholder="Apartment, Suite (Optional)" value={addressForm.apartment} onChange={e=>setAddressForm({...addressForm, apartment: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                                <select required value={addressForm.state} onChange={e=>setAddressForm({...addressForm, state: e.target.value, city: ''})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none">
                                   <option value="">Select State</option>
                                   {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <select required value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none">
                                   <option value="">Select City</option>
                                   {(commonCities[addressForm.state] || []).map(c => <option key={c} value={c}>{c}</option>)}
                                   <option value="Other">Other (Manual Entry)</option>
                                </select>
                                {addressForm.city === 'Other' && (
                                   <input required placeholder="Enter City/District" value={addressForm.district} onChange={e=>setAddressForm({...addressForm, district: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none border border-[#6651A4]" />
                                )}
                                <input required placeholder="ZIP Code" value={addressForm.postalCode} onChange={e=>setAddressForm({...addressForm, postalCode: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                             </div>
                             <input required placeholder="Phone Number" value={addressForm.phone} onChange={e=>setAddressForm({...addressForm, phone: e.target.value})} className="w-full h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                             
                             <button type="submit" className="w-full h-12 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#E84949] transition-all shadow-lg active:scale-95">
                                {editingAddressId ? 'Update Shipping Base' : 'Secure This Base'}
                             </button>
                          </motion.form>
                        )}
                     </AnimatePresence>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                        {addresses.map(addr => (
                           <div key={addr.id} className={`p-6 rounded-[32px] border transition-all relative group ${addr.isDefault ? 'bg-white border-[#6651A4]/30 shadow-md' : 'bg-[#FAEAD3]/30 border-black/[0.03] hover:bg-white hover:shadow-md'}`}>
                              <div className="flex justify-between items-start mb-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FAEAD3] rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#6651A4] transition-all">
                                       {addr.type === 'Home' ? <Home size={18}/> : addr.type === 'Office' ? <Building size={18}/> : <MapPin size={18}/>}
                                    </div>
                                    <div>
                                       <p className="text-[13px] font-bold text-gray-700">{addr.firstName} {addr.lastName}</p>
                                       <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{addr.type} Base</p>
                                    </div>
                                 </div>
                                 <div className="flex gap-2">
                                    <button onClick={() => { 
                                       setEditingAddressId(addr.id); 
                                       setAddressForm(addr); 
                                       setShowAddAddress(true); 
                                       window.scrollTo({top: 0, behavior: 'smooth'}); 
                                    }} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-[#6651A4] hover:bg-[#6651A4]/5 transition-all"><Edit2 size={14}/></button>
                                    {!addr.isDefault && (
                                       <button onClick={() => deleteAddress(addr.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-[#E84949] hover:bg-red-50 transition-all"><Trash2 size={14}/></button>
                                    )}
                                 </div>
                              </div>
                              <div className="space-y-1 text-[13px] text-gray-500 mb-6 pl-1">
                                 <p>{addr.address}</p>
                                 {addr.apartment && <p>{addr.apartment}</p>}
                                 <p>{addr.city === 'Other' ? addr.district : addr.city}, {addr.state} {addr.postalCode}</p>
                                 <p className="text-[11px] font-medium text-gray-400">T: {addr.phone}</p>
                              </div>
                              <div className="flex items-center justify-between mt-auto">
                                 {!addr.isDefault ? (
                                    <button onClick={() => setAsDefaultAddress(addr.id)} className="text-[9px] font-bold uppercase tracking-widest text-[#6651A4] hover:underline transition-all">Set as Primary</button>
                                 ) : (
                                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5"><Check size={10}/> Primary Base</span>
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
