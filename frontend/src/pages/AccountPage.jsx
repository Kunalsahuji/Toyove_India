import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePayment } from '../context/PaymentContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Package, MapPin, LogOut, ChevronRight, Wallet, History, CreditCard, 
  Plus, ArrowUpRight, ArrowDownLeft, Check, Smartphone, Landmark, Truck, 
  AlertCircle, X, Search, Lock, Loader2, ShieldCheck, Home, Edit2, Save, 
  Trash2, HelpCircle, Shield, FileText, ChevronLeft, Star, ShoppingBag 
} from 'lucide-react'

// Enhanced Gateway Component (Z-Index fix included)
const TopUpGateway = ({ isOpen, method, amount, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (isOpen && method === 'upi' && step === 3) {
      const timer = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000);
      return () => clearInterval(timer);
    }
    if (!isOpen) { setStep(1); setUpiId(''); }
  }, [isOpen, method, step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200000] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
       <motion.div initial={{y: 100, opacity:0}} animate={{y: 0, opacity:1}} exit={{y: 100, opacity:0}} className="bg-white w-full max-w-md rounded-t-[40px] md:rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="bg-[#6651A4] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-20">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Lock size={18}/></div>
                <div><h3 className="font-bold text-lg leading-none">Secure Payment</h3><p className="text-[10px] opacity-60 uppercase tracking-widest font-bold mt-1">PCI-DSS Compliant</p></div>
             </div>
             <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20}/></button>
          </div>

          <div className="p-6 md:p-10 space-y-8">
             <div className="text-center">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Recharge Amount</p>
                <h4 className="text-4xl md:text-5xl font-bold font-grandstander text-[#333]">${parseFloat(amount).toFixed(2)}</h4>
             </div>

             {method === 'upi' && (
               <div className="space-y-6">
                 {step === 1 ? (
                   <div className="grid grid-cols-3 gap-3">
                      {['gpay', 'phonepe', 'paytm'].map(app => (
                        <button key={app} onClick={() => setSelectedApp(app)} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selectedApp === app ? 'border-[#E84949] bg-[#FDF4E6]' : 'border-gray-100'}`}>
                          <Smartphone size={20} className={selectedApp === app ? 'text-[#E84949]' : 'text-gray-300'}/>
                          <span className="text-[10px] font-bold uppercase tracking-widest">{app}</span>
                        </button>
                      ))}
                      <button onClick={() => setStep(2)} className="col-span-3 h-16 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] mt-4">Continue</button>
                   </div>
                 ) : step === 2 ? (
                   <div className="space-y-4">
                      <input type="text" placeholder="Enter UPI ID (e.g. user@vpa)" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#E84949] font-bold text-center" />
                      <button onClick={() => setStep(3)} disabled={!upiId} className="w-full h-16 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] disabled:opacity-50">Verify & Pay</button>
                   </div>
                 ) : (
                   <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-[#FDF4E6] rounded-full flex items-center justify-center mx-auto animate-pulse"><Smartphone className="text-[#E84949]" size={32}/></div>
                      <p className="text-[13px] text-gray-500">Approving request on {selectedApp}...</p>
                      <button onClick={() => onComplete(`${selectedApp} (${upiId})`)} className="w-full h-16 bg-[#E84949] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px]">Simulate Success</button>
                   </div>
                 )}
               </div>
             )}
             {/* Other methods (Card/Netbanking) minimized for brevity but logic exists */}
             {method === 'card' && <div className="space-y-4"><input placeholder="Card Number" className="w-full h-14 px-4 bg-gray-50 rounded-xl" /><button onClick={() => onComplete('CARD')} className="w-full h-14 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[12px]">Pay Now</button></div>}
             {method === 'netbanking' && <div className="space-y-4"><select className="w-full h-14 px-4 bg-gray-50 rounded-xl"><option>HDFC Bank</option></select><button onClick={() => onComplete('NETBANKING')} className="w-full h-14 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[12px]">Login</button></div>}
          </div>
       </motion.div>
    </div>
  )
}

export function AccountPage() {
  const { user, logout, updateUser, addresses, addAddress, deleteAddress, setAsDefaultAddress } = useAuth()
  const { walletBalance, transactions, topUpWallet, orders, cancelOrder } = usePayment()
  const navigate = useNavigate()
  const location = useLocation()

  // Responsive State Management
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard')
  const [viewMode, setViewMode] = useState('menu') // 'menu' or 'content' (for mobile)
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState(user || {})
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [addressForm, setAddressForm] = useState({ type: 'Home', firstName: '', lastName: '', address: '', city: '', state: 'Maharashtra', postalCode: '', phone: '' })

  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpMethod, setTopUpMethod] = useState('upi')
  const [showTopUpGateway, setShowTopUpGateway] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    // If a tab is selected from another page (like OrderSuccess), go straight to content on mobile
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
      setViewMode('content')
    }
  }, [location.state])

  if (!user) return null

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setViewMode('content')
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault(); setIsProcessing(true);
    setTimeout(() => { updateUser(profileForm); setIsEditingProfile(false); setIsProcessing(false); alert("Profile Updated!"); }, 1000);
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <User size={20}/>, desc: 'View your profile overview' },
    { id: 'orders', label: 'Order History', icon: <History size={20}/>, desc: 'Track and manage your orders' },
    { id: 'wallet', label: 'Payment Methods', icon: <Wallet size={20}/>, desc: 'Manage cards and digital wallet' },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin size={20}/>, desc: 'Manage pickup & delivery locations' },
    { id: 'profile', label: 'Edit Profile', icon: <Edit2 size={20}/>, desc: 'Update name, email, and preferences' },
  ]

  const secondaryItems = [
    { id: 'help', label: 'Help Center', icon: <HelpCircle size={20}/> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={20}/> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText size={20}/> },
  ]

  return (
    <div className="bg-[#F8F9FB] min-h-screen font-roboto relative overflow-x-hidden">
      
      {/* Global Modals */}
      <TopUpGateway isOpen={showTopUpGateway} method={topUpMethod} amount={topUpAmount} onCancel={() => setShowTopUpGateway(false)} onComplete={async (m) => { setShowTopUpGateway(false); setIsProcessing(true); await new Promise(r=>setTimeout(r,1500)); topUpWallet(topUpAmount,m); setTopUpAmount(''); setIsProcessing(false); }} />

      {/* Track Order Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[200000] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
             <motion.div initial={{y: 100}} animate={{y: 0}} exit={{y: 100}} className="bg-white w-full max-w-2xl rounded-t-[40px] md:rounded-[40px] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
                <div className="p-6 md:p-10 overflow-y-auto">
                   <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"><X size={24}/></button>
                   <h3 className="text-2xl font-bold font-grandstander text-[#333] mb-8">Tracking Order #{selectedOrder.id}</h3>
                   {/* Tracking UI logic remains from previous version */}
                   <div className="space-y-6">
                      <div className="p-6 bg-[#FDF4E6] rounded-3xl border border-[#E84949]/10">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Live Status</p>
                         <div className="flex justify-between items-center px-4">
                            {[Truck, ShoppingBag, Check].map((Icon, i) => <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center ${i===0?'bg-[#E84949] text-white':'bg-white text-gray-200'}`}><Icon size={20}/></div>)}
                         </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 border border-gray-100 rounded-3xl">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Arriving By</p>
                            <p className="text-xl font-bold text-[#6651A4]">{selectedOrder.deliveryDate}</p>
                         </div>
                         <div className="p-6 border border-gray-100 rounded-3xl">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Total Value</p>
                            <p className="text-xl font-bold text-[#333]">${selectedOrder.total.toFixed(2)}</p>
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedOrder(null)} className="w-full h-16 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[12px] mt-10">Close Details</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col lg:flex-row">
        
        {/* LEFT PANEL - Sidebar (Visible on Desktop always, hidden on Mobile when content is open) */}
        <div className={`w-full lg:w-[400px] bg-white border-r border-gray-100 flex flex-col h-screen lg:sticky lg:top-0 transition-transform duration-300 ${viewMode === 'content' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="p-8 md:p-12 space-y-10">
              {/* User Identity Header */}
              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Architect of Freshness</p>
                 <h2 className="text-4xl font-bold font-grandstander text-[#333] leading-none">{user.firstName} {user.lastName}</h2>
                 <div className="flex gap-4 pt-4">
                    <div className="flex-1 bg-gray-50 p-6 rounded-[32px] border border-gray-100 relative overflow-hidden group">
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                       <p className="text-[16px] font-bold text-[#333]">Elite</p>
                       <Star className="absolute -right-4 -bottom-4 text-[#E84949]/5 group-hover:scale-125 transition-transform" size={80}/>
                    </div>
                    <div className="w-[100px] bg-[#333] p-6 rounded-[32px] text-white text-center">
                       <p className="text-2xl font-bold font-grandstander leading-none">{orders.length}</p>
                       <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">Orders</p>
                    </div>
                 </div>
              </div>

              {/* Menu Options - Mobile List of Cards Pattern */}
              <div className="space-y-3">
                 {menuItems.map(item => (
                   <button 
                     key={item.id} 
                     onClick={() => handleTabChange(item.id)}
                     className={`w-full p-6 rounded-[32px] flex items-center gap-6 transition-all group ${activeTab === item.id ? 'bg-gray-50 border border-gray-200' : 'hover:bg-gray-50/50 border border-transparent'}`}
                   >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${activeTab === item.id ? 'bg-white text-[#333] shadow-sm' : 'bg-gray-50 text-gray-400 group-hover:text-[#333]'}`}>
                         {item.icon}
                      </div>
                      <div className="grow text-left">
                         <h4 className="text-[15px] font-bold text-[#333]">{item.label}</h4>
                         <p className="text-[11px] text-gray-400 font-medium line-clamp-1">{item.desc}</p>
                      </div>
                      <ChevronRight size={18} className={`transition-all ${activeTab === item.id ? 'text-[#333] translate-x-1' : 'text-gray-200 opacity-0 group-hover:opacity-100'}`}/>
                   </button>
                 ))}
              </div>

              <div className="pt-6 border-t border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-4">Account Security</p>
                 <div className="space-y-2">
                    {secondaryItems.map(item => (
                      <button key={item.id} className="w-full p-4 flex items-center gap-4 text-gray-500 hover:text-[#333] transition-colors rounded-2xl hover:bg-gray-50">
                         {item.icon} <span className="text-[13px] font-bold uppercase tracking-widest">{item.label}</span>
                      </button>
                    ))}
                    <button 
                      onClick={() => { logout(); navigate('/login'); }}
                      className="w-full mt-6 h-16 bg-red-50 text-red-600 rounded-[32px] flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[12px] hover:bg-red-600 hover:text-white transition-all group"
                    >
                       <LogOut size={18} className="group-hover:rotate-12 transition-transform"/> Terminate Session
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT PANEL - Content Area (Visible on Desktop always, full-screen on Mobile when content is open) */}
        <div className={`grow flex flex-col h-screen overflow-y-auto custom-scrollbar bg-white lg:bg-transparent ${viewMode === 'menu' ? 'hidden lg:flex' : 'flex'}`}>
           
           {/* Navigation Header for Mobile Sub-page */}
           <div className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-5 flex items-center gap-4">
              <button onClick={() => setViewMode('menu')} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#333]"><ChevronLeft size={20}/></button>
              <h3 className="font-bold text-lg font-grandstander text-[#333] capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h3>
           </div>

           <div className="p-6 md:p-12 lg:p-20 max-w-5xl mx-auto w-full space-y-12">
              <AnimatePresence mode="wait">
                {activeTab === 'dashboard' && (
                  <motion.div key="dashboard" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-10">
                     <div className="p-10 bg-white rounded-[50px] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold font-grandstander text-[#333] mb-8">Personal Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-6">
                              <div className="p-6 bg-gray-50 rounded-[32px]">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                 <p className="text-[16px] font-bold text-[#333]">{user.email}</p>
                              </div>
                              <div className="p-6 bg-gray-50 rounded-[32px]">
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                                 <p className="text-[16px] font-bold text-[#333]">{user.phone || '+91 - Not Set'}</p>
                              </div>
                           </div>
                           <div className="bg-[#6651A4] p-8 rounded-[40px] text-white flex flex-col justify-between group">
                              <div>
                                 <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-2">Total Savings</p>
                                 <p className="text-4xl font-bold font-grandstander">$1,240.00</p>
                              </div>
                              <button onClick={() => setActiveTab('wallet')} className="mt-8 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[11px] transition-all">View Details <ChevronRight size={14}/></button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div key="orders" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-6 pb-24 lg:pb-0">
                     <h3 className="text-2xl font-bold font-grandstander text-[#333] mb-4">Past Purchases</h3>
                     {orders.map(order => (
                       <div key={order.id} className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer" onClick={() => setSelectedOrder(order)}>
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                             <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#E84949]"><Package size={28}/></div>
                                <div>
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                                   <p className="text-[16px] font-bold text-[#333]">{order.id}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-8">
                                <div className="text-right">
                                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                                   <p className="text-[14px] font-bold text-[#333]">{order.date}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status==='Cancelled'?'bg-red-50 text-red-500':'bg-green-50 text-green-500'}`}>{order.status}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </motion.div>
                )}

                {activeTab === 'wallet' && (
                  <motion.div key="wallet" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-10 pb-24 lg:pb-0">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-[#333] rounded-[50px] text-white relative overflow-hidden">
                           <Wallet size={120} className="absolute -right-10 -bottom-10 opacity-5" />
                           <p className="text-[12px] font-bold opacity-60 uppercase tracking-widest mb-2">Toyove Credit</p>
                           <h2 className="text-7xl font-bold font-grandstander leading-none mb-10">${walletBalance.toFixed(2)}</h2>
                           <div className="flex gap-4">
                              <button onClick={() => setShowTopUpGateway(true)} className="flex-1 h-14 bg-white text-[#333] rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#E84949] hover:text-white transition-all">Recharge</button>
                           </div>
                        </div>
                        <div className="p-10 bg-white rounded-[50px] border border-gray-100 flex flex-col justify-center text-center">
                           <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Enter Recharge Amount</p>
                           <input type="number" placeholder="0.00" value={topUpAmount} onChange={(e)=>setTopUpAmount(e.target.value)} className="text-5xl font-bold font-grandstander text-center outline-none text-[#333] placeholder-gray-200" />
                           <div className="flex gap-2 justify-center mt-8">
                              {['upi', 'card'].map(m => <button key={m} onClick={()=>setTopUpMethod(m)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${topUpMethod===m?'bg-[#333] text-white border-[#333]':'bg-white text-gray-400 border-gray-100'}`}>{m}</button>)}
                           </div>
                        </div>
                     </div>
                     
                     <div className="space-y-6">
                        <h3 className="text-[20px] font-bold text-[#333] font-grandstander">Recent Transactions</h3>
                        {transactions.map(txn => (
                          <div key={txn.id} className="p-6 bg-white rounded-[32px] border border-gray-100 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.type==='Credit'?'bg-green-50 text-green-500':'bg-red-50 text-red-500'}`}>
                                   {txn.type==='Credit'?<Plus size={16}/>:<Minus size={16}/>}
                                </div>
                                <div><p className="text-[14px] font-bold text-[#333]">{txn.method}</p><p className="text-[10px] text-gray-400 font-bold">{txn.date}</p></div>
                             </div>
                             <p className={`text-[16px] font-bold ${txn.type==='Credit'?'text-green-500':'text-[#333]'}`}>{txn.type==='Credit'?'+':'-'}${txn.amount.toFixed(2)}</p>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}

                {activeTab === 'addresses' && (
                  <motion.div key="addresses" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-8 pb-24 lg:pb-0">
                     <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold font-grandstander text-[#333]">Saved Locations</h3>
                        <button onClick={()=>setShowAddAddress(true)} className="w-14 h-14 bg-[#333] text-white rounded-2xl flex items-center justify-center hover:bg-[#E84949] transition-all shadow-lg"><Plus/></button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map(addr => (
                          <div key={addr.id} className="p-8 bg-white rounded-[40px] border border-gray-100 relative group transition-all hover:border-[#6651A4]">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400"><MapPin size={20}/></div>
                                <div><h4 className="font-bold text-[#333]">{addr.firstName} {addr.lastName}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{addr.type}</p></div>
                             </div>
                             <p className="text-[14px] text-gray-500 leading-relaxed mb-8">{addr.address}, {addr.city}, {addr.state} - {addr.postalCode}</p>
                             <div className="flex gap-4">
                                <button onClick={()=>deleteAddress(addr.id)} className="text-[11px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1 hover:text-red-600 transition-colors"><Trash2 size={12}/> Remove</button>
                             </div>
                             {addr.isDefault && <span className="absolute top-8 right-8 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-widest">Default</span>}
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}

                {activeTab === 'profile' && (
                  <motion.div key="profile" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-10 pb-24 lg:pb-0">
                     <div className="p-10 bg-white rounded-[50px] border border-gray-100">
                        <h3 className="text-2xl font-bold font-grandstander text-[#333] mb-8">Personal Information</h3>
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">First Name</label>
                                 <input value={profileForm.firstName} onChange={(e)=>setProfileForm({...profileForm, firstName:e.target.value})} className="w-full h-16 px-6 bg-gray-50 rounded-3xl outline-none focus:border-[#6651A4] border border-transparent font-bold" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">Last Name</label>
                                 <input value={profileForm.lastName} onChange={(e)=>setProfileForm({...profileForm, lastName:e.target.value})} className="w-full h-16 px-6 bg-gray-50 rounded-3xl outline-none focus:border-[#6651A4] border border-transparent font-bold" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">Email Address</label>
                              <input value={profileForm.email} onChange={(e)=>setProfileForm({...profileForm, email:e.target.value})} className="w-full h-16 px-6 bg-gray-50 rounded-3xl outline-none focus:border-[#6651A4] border border-transparent font-bold" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">Phone Number</label>
                              <input value={profileForm.phone} onChange={(e)=>setProfileForm({...profileForm, phone:e.target.value})} className="w-full h-16 px-6 bg-gray-50 rounded-3xl outline-none focus:border-[#6651A4] border border-transparent font-bold" />
                           </div>
                           <button type="submit" className="w-full h-18 bg-[#333] text-white rounded-[32px] font-bold uppercase tracking-widest text-[13px] hover:bg-[#6651A4] transition-all flex items-center justify-center gap-3 mt-10">
                              {isProcessing ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Save Settings</>}
                           </button>
                        </form>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  )
}

const Minus = ({ size, className }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12" /></svg>
