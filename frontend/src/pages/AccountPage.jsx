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
  Trash2, HelpCircle, Shield, FileText, ChevronLeft, Star, ShoppingBag, Gift, Heart, Menu, RefreshCw, Box, ExternalLink
} from 'lucide-react'

// Enhanced Gateway with Simulation Step
const TopUpGateway = ({ isOpen, method, amount, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedSub, setSelectedSub] = useState('');
  const [vpa, setVpa] = useState('');
  const [cardDetails, setCardDetails] = useState({ no: '', exp: '', cvv: '', type: 'Credit Card' });

  useEffect(() => { if (!isOpen) { setStep(1); setVpa(''); setSelectedSub(''); } }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300000] flex items-center justify-center p-4 bg-[#333]/20 backdrop-blur-md">
       <motion.div initial={{scale: 0.95, opacity:0}} animate={{scale: 1, opacity:1}} className="bg-[#FDF4E6] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
          <div className="bg-[#6651A4] p-5 text-white flex justify-between items-center">
             <div className="flex items-center gap-2"><Lock size={14}/><h3 className="font-grandstander text-xs font-bold uppercase tracking-widest">Toyove Security</h3></div>
             <button onClick={onCancel} className="p-1.5 hover:bg-white/10 rounded-full transition-all"><X size={16}/></button>
          </div>

          <div className="p-8 space-y-6">
             <div className="text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recharge Balance</p>
                <h4 className="text-3xl font-bold font-grandstander text-gray-700">${parseFloat(amount).toFixed(2)}</h4>
             </div>

             <div className="space-y-4">
                {method === 'upi' && (
                  <div className="space-y-4">
                    {step === 1 ? (
                      <div className="grid grid-cols-3 gap-2">
                         {['Google Pay', 'PhonePe', 'Paytm'].map(app => (
                           <button key={app} onClick={() => { setSelectedSub(app); setStep(2); }} className="p-3 bg-[#FAEAD3]/50 hover:bg-white rounded-xl border border-transparent transition-all flex flex-col items-center gap-2">
                              <Smartphone size={16} className="text-[#6651A4]/60"/>
                              <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{app}</span>
                           </button>
                         ))}
                      </div>
                    ) : step === 2 ? (
                      <div className="space-y-4">
                         <input type="text" placeholder="yourname@upi" value={vpa} onChange={e=>setVpa(e.target.value)} className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none focus:border-[#6651A4] text-center font-bold text-gray-600 text-sm" />
                         <button onClick={() => setStep(3)} disabled={!vpa} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">Verify Method</button>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                         <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"><Check size={24}/></div>
                         <p className="text-[11px] text-gray-500 font-medium">Verify the request on your {selectedSub} app.</p>
                         <button onClick={() => onComplete(`UPI (${selectedSub})`)} className="w-full h-11 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">Simulate OK</button>
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
                         <input type="text" placeholder="Card Number" maxLength="16" value={cardDetails.no} onChange={e=>setCardDetails({...cardDetails, no: e.target.value})} className="w-full h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none font-mono text-[13px]" />
                         <div className="grid grid-cols-2 gap-2">
                            <input placeholder="MM/YY" className="h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none text-[11px]" />
                            <input placeholder="CVV" maxLength="3" className="h-11 px-4 bg-white border border-gray-100 rounded-xl outline-none text-[11px]" />
                         </div>
                         <button onClick={() => setStep(2)} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px]">Review & Pay</button>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                         <div className="p-4 bg-white rounded-xl border border-dashed border-gray-200">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Process ${amount} on Card</p>
                            <p className="text-sm font-bold text-gray-600 mt-1">**** **** **** {cardDetails.no.slice(-4) || '0000'}</p>
                         </div>
                         <button onClick={() => onComplete(cardDetails.type)} className="w-full h-11 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">Process Simulation</button>
                      </div>
                    )}
                  </div>
                )}

                {method === 'netbanking' && (
                   <div className="space-y-4 text-center">
                      <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar p-1">
                         {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                           <button key={bank} onClick={() => setSelectedSub(bank)} className={`p-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${selectedSub === bank ? 'bg-[#6651A4] text-white border-[#6651A4]' : 'bg-white border-gray-100 text-gray-400'}`}>{bank}</button>
                         ))}
                      </div>
                      <button disabled={!selectedSub} onClick={() => onComplete(`Bank (${selectedSub})`)} className="w-full h-11 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] disabled:opacity-30">Simulate Bank Login</button>
                   </div>
                )}
             </div>
          </div>
       </motion.div>
    </div>
  )
}

export function AccountPage() {
  const { user, logout, updateUser, addresses, addAddress, deleteAddress, setAsDefaultAddress } = useAuth()
  const { walletBalance, transactions, topUpWallet, orders, cancelOrder } = usePayment()
  const { wishlist } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'dashboard')
  const [viewMode, setViewMode] = useState(location.state?.activeTab ? 'content' : 'menu')
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [profileForm, setProfileForm] = useState(user || {})
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [addressForm, setAddressForm] = useState({ type: 'Home', firstName: '', lastName: '', address: '', apartment: '', city: '', state: 'Maharashtra', postalCode: '', phone: '' })

  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpMethod, setTopUpMethod] = useState('upi')
  const [showTopUpGateway, setShowTopUpGateway] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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
    { id: 'wishlist', label: 'My Wishlist', icon: <Heart size={16}/>, color: 'text-pink-500/60' },
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
         
         <div className="p-8 bg-[#6651A4] text-white relative shrink-0">
            <div className="relative z-10 flex flex-col gap-6">
               <div className="flex justify-between items-start">
                  <Link to="/" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"><Home size={18}/></Link>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 text-xl font-bold font-grandstander">{user.firstName.charAt(0)}</div>
               </div>
               <div><h2 className="text-xl font-grandstander font-bold">{user.firstName} {user.lastName}</h2><p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">{user.email}</p></div>
            </div>
         </div>

         <div className="grow overflow-y-auto custom-scrollbar p-5">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-3">Quick Navigation</p>
            <div className="space-y-0.5">
               {menuItems.map(item => (
                 <button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full p-3.5 rounded-xl flex items-center gap-4 transition-all border-b border-black/[0.03] last:border-b-0 ${activeTab === item.id ? 'bg-white shadow-sm' : 'hover:bg-white/40'}`}>
                    <span className={item.color}>{item.icon}</span>
                    <span className={`text-[12px] font-bold ${activeTab === item.id ? 'text-[#333]' : 'text-gray-500'}`}>{item.label}</span>
                    {activeTab === item.id && <ChevronRight size={14} className="ml-auto text-[#6651A4]/40"/>}
                 </button>
               ))}
            </div>

            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-10 mb-4 px-3">Help & Policy</p>
            <div className="space-y-0.5">
               {legalItems.map(item => (
                 <button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all border-b border-black/[0.02] last:border-b-0 ${activeTab === item.id ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                    <span className="opacity-60">{item.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                 </button>
               ))}
            </div>

            <button onClick={() => { logout(); navigate('/login'); }} className="w-full h-11 mt-8 border border-gray-200 text-gray-400 rounded-xl font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all">
               <LogOut size={16}/> Terminate
            </button>
         </div>
      </div>

      {/* RIGHT PANEL - Content Area */}
      <div className={`grow h-full overflow-y-auto custom-scrollbar flex flex-col bg-[#FDF4E6] ${viewMode === 'menu' ? 'hidden lg:flex' : 'flex'}`}>
         
         <div className="sticky top-0 z-50 bg-[#FDF4E6]/90 backdrop-blur-md px-6 py-5 border-b border-black/[0.03] flex items-center gap-4">
            <button onClick={() => setViewMode('menu')} className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#333] shadow-sm lg:hidden"><Menu size={18}/></button>
            <h3 className="font-grandstander font-bold text-[16px] text-gray-700 capitalize tracking-tight">{activeTab}</h3>
         </div>

         <div className="p-6 md:p-12 lg:p-16 max-w-4xl mx-auto w-full space-y-12 pb-32">
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

               {activeTab === 'orders' && (
                 <motion.div key="orders" initial={{opacity:0}} animate={{opacity:1}} className="space-y-0.5">
                    {orders.length === 0 ? (
                       <div className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-[9px]">Empty Haul History</div>
                    ) : orders.map(order => (
                       <div key={order.id} onClick={()=>setSelectedOrder(order)} className="p-5 hover:bg-[#FAEAD3]/40 border-b border-black/[0.02] flex items-center justify-between cursor-pointer group transition-all">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-200 group-hover:text-[#6651A4] transition-all"><Package size={20}/></div>
                             <div><p className="text-[13px] font-bold text-gray-700">Order #{order.id}</p><p className="text-[10px] text-gray-400 font-medium">{order.date} · {order.items.length} Items</p></div>
                          </div>
                          <div className="text-right flex items-center gap-6">
                             <div><p className="text-xl font-bold font-grandstander text-gray-700">${order.total.toFixed(2)}</p><p className={`text-[9px] font-bold uppercase ${order.status==='Cancelled'?'text-red-400':'text-green-500'}`}>{order.status}</p></div>
                             <ChevronRight size={16} className="text-gray-200 group-hover:text-[#333] translate-x-0 group-hover:translate-x-1 transition-all"/>
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
                       <button onClick={() => setShowAddAddress(!showAddAddress)} className="text-[11px] font-bold text-[#6651A4] uppercase flex items-center gap-2 hover:underline transition-all"><Plus size={18}/> New Base</button>
                    </div>

                    <AnimatePresence>
                       {showAddAddress && (
                         <motion.form initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} onSubmit={(e) => { e.preventDefault(); addAddress(addressForm); setShowAddAddress(false); }} className="p-8 bg-[#FAEAD3]/50 rounded-[40px] space-y-5 overflow-hidden border border-black/[0.02]">
                            <div className="grid grid-cols-2 gap-4">
                               <input required placeholder="First Name" value={addressForm.firstName} onChange={e=>setAddressForm({...addressForm, firstName: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none border border-transparent focus:border-[#6651A4]" />
                               <input required placeholder="Last Name" value={addressForm.lastName} onChange={e=>setAddressForm({...addressForm, lastName: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none border border-transparent focus:border-[#6651A4]" />
                            </div>
                            <input required placeholder="Street Address" value={addressForm.address} onChange={e=>setAddressForm({...addressForm, address: e.target.value})} className="w-full h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                               <input placeholder="Apartment, Suite (Optional)" value={addressForm.apartment} onChange={e=>setAddressForm({...addressForm, apartment: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                               <input required placeholder="City" value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                               <input required placeholder="State" value={addressForm.state} onChange={e=>setAddressForm({...addressForm, state: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                               <input required placeholder="ZIP Code" value={addressForm.postalCode} onChange={e=>setAddressForm({...addressForm, postalCode: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                               <input required placeholder="Phone" value={addressForm.phone} onChange={e=>setAddressForm({...addressForm, phone: e.target.value})} className="h-12 px-5 bg-white rounded-2xl text-[13px] outline-none" />
                            </div>
                            <button type="submit" className="w-full h-12 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg">Establish Base</button>
                         </motion.form>
                       )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {addresses.map(addr => (
                          <div key={addr.id} className="p-8 border-b md:border border-black/[0.02] hover:bg-[#FAEAD3]/50 transition-all relative group">
                             <div className="flex justify-between items-start mb-6">
                                <div><h4 className="text-[16px] font-bold text-gray-700">{addr.firstName} {addr.lastName}</h4><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{addr.type} Point</p></div>
                                {addr.isDefault && <span className="px-3 py-1 bg-[#6651A4] text-white text-[8px] font-bold rounded-full uppercase tracking-[0.2em] shadow-lg">Primary</span>}
                             </div>
                             <div className="space-y-1 text-[14px] text-gray-500 font-medium mb-10 leading-relaxed">
                                <p>{addr.address}{addr.apartment && `, ${addr.apartment}`}</p>
                                <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                                <p className="pt-3 text-[11px] font-bold text-[#6651A4]/60 flex items-center gap-2"><Smartphone size={12}/> {addr.phone}</p>
                             </div>
                             <div className="flex gap-6 pt-6">
                                {!addr.isDefault && <button onClick={()=>setAsDefaultAddress(addr.id)} className="text-[10px] font-bold text-[#6651A4] uppercase hover:underline">Set Primary</button>}
                                <button onClick={()=>deleteAddress(addr.id)} className="text-[10px] font-bold text-red-300 uppercase hover:text-red-500">Delete</button>
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

               {['help', 'returns', 'shipping', 'privacy', 'terms'].includes(activeTab) && (
                  <motion.div key={activeTab} initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
                     <h3 className="text-4xl font-grandstander font-bold text-gray-700 uppercase tracking-tight">{activeTab}</h3>
                     <div className="space-y-6 text-gray-500 leading-relaxed text-[15px]">
                        <p>At Toyove-India, our {activeTab} policy is built on the foundation of trust and transparency. We ensure every explorer feels secure.</p>
                        <div className="p-10 bg-[#FAEAD3]/50 rounded-[40px] border border-black/[0.02] italic font-medium text-center">
                           "Your adventure is our priority. We are here to support every step of your toy journey."
                        </div>
                        <p>For detailed queries, our 24/7 support is always available at support@toyove.com.</p>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
