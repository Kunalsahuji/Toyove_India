import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, User, Mail, Shield, ShieldAlert, 
  MapPin, ShoppingBag, Wallet, Clock, Edit2, 
  Trash2, Ban, CheckCircle, Save, X, RefreshCcw
} from 'lucide-react'

export function AdminUserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Mock data for the specific user
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setUser({
        id: id || 'USR-001',
        name: 'Emma Watson',
        email: 'emma@example.com',
        phone: '+91 98765 43210',
        status: 'Active',
        joinedDate: '2026-04-10',
        walletBalance: '$1,245.00',
        totalSpent: '$4,562.00',
        totalOrders: 12,
        address: '7th Floor, Unit 703, Mayagarden, Zirakpur, Punjab - 140603',
        recentOrders: [
          { id: '#ORD-8001', date: '2026-04-24', total: '$145.00', status: 'Delivered' },
          { id: '#ORD-7952', date: '2026-04-15', total: '$210.00', status: 'Delivered' },
        ],
        recentTransactions: [
          { id: 'TXN-9021', type: 'Credit', amount: '$500.00', date: '2026-04-24' },
          { id: 'TXN-8845', type: 'Debit', amount: '$145.00', date: '2026-04-24' },
        ]
      })
      setLoading(false)
    }, 800)
  }, [id])

  const handleSave = () => {
    setIsEditing(false)
    // Add toast notification logic here if needed
  }

  if (loading) {
    return (
      <div className="shell flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#6651A4] rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Explorer Profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shell space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-[#6651A4] hover:bg-[#FAEAD3] shadow-sm transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-grandstander font-bold text-gray-800 flex items-center gap-3">
              Explorer Profile
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {user.status}
              </span>
            </h1>
            <p className="text-gray-500 font-medium text-sm font-mono mt-1">{user.id}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="h-10 px-4 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all">
                <X size={14} /> Cancel
              </button>
              <button onClick={handleSave} className="h-10 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#5a4892] flex items-center gap-2 transition-all">
                <Save size={14} /> Save Changes
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="h-10 px-6 bg-white border border-[#6651A4]/20 text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#FAEAD3] flex items-center gap-2 transition-all">
                <Edit2 size={14} /> Edit Identity
              </button>
              <button className="h-10 px-4 bg-red-50 text-[#E8312A] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#E8312A] hover:text-white transition-all flex items-center gap-2">
                <Ban size={14} /> Suspend
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Identity & Wallet */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03] text-center">
            <div className="w-24 h-24 bg-[#FAEAD3] rounded-full flex items-center justify-center border-4 border-white shadow-md text-4xl font-bold font-grandstander text-[#6651A4] mx-auto mb-4">
              {user.name.charAt(0)}
            </div>
            {isEditing ? (
              <input 
                type="text" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="w-full text-center text-xl font-bold font-grandstander text-gray-800 bg-[#FDF4E6]/50 rounded-lg p-1 border-b-2 border-[#6651A4] outline-none"
              />
            ) : (
              <h2 className="text-2xl font-grandstander font-bold text-gray-800">{user.name}</h2>
            )}
            <p className="text-gray-400 font-medium text-sm mt-1">{user.email}</p>
            <div className="mt-6 flex justify-center gap-2">
              <span className="px-3 py-1 bg-[#6651A4]/5 text-[#6651A4] rounded-full text-[9px] font-bold uppercase tracking-widest border border-[#6651A4]/10">Loyal Explorer</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#6651A4] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  <Wallet size={14} /> Wallet Balance
                </div>
                <button 
                  onClick={() => navigate('/admin/finance')}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all"
                >
                  + Top Up
                </button>
              </div>
              <h3 className="text-4xl font-grandstander font-bold mb-6">{user.walletBalance}</h3>
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="cursor-pointer" onClick={() => navigate('/admin/finance')}>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Total Spent</p>
                  <p className="text-lg font-bold font-grandstander">{user.totalSpent}</p>
                </div>
                <div className="cursor-pointer" onClick={() => navigate('/admin/orders')}>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Orders</p>
                  <p className="text-lg font-bold font-grandstander">{user.totalOrders}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Details & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03]">
            <h3 className="text-xl font-grandstander font-bold text-gray-800 mb-6">Contact & Shipping</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"><Mail size={14}/> Explorer Email</p>
                  {isEditing ? (
                    <input 
                      type="email" 
                      value={user.email} 
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="w-full text-sm font-bold text-gray-700 bg-[#FDF4E6]/50 rounded-lg p-2 outline-none"
                    />
                  ) : (
                    <p className="text-[14px] font-bold text-gray-700">{user.email}</p>
                  )}
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"><Clock size={14}/> Explorer Since</p>
                  <p className="text-[14px] font-bold text-gray-700">{user.joinedDate}</p>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"><MapPin size={14}/> Primary Base</p>
                <p className="text-[14px] font-medium text-gray-600 leading-relaxed">{user.address}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-grandstander font-bold text-gray-800">Saved Bases</h3>
                <MapPin size={18} className="text-gray-300" />
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, type: 'Home', address: '7th Floor, Unit 703, Mayagarden, Zirakpur, Punjab - 140603', primary: true },
                  { id: 2, type: 'Office', address: 'Sector 62, Noida, Uttar Pradesh - 201301', primary: false }
                ].map(base => (
                  <div 
                    key={base.id} 
                    className={`p-4 rounded-2xl border transition-all ${base.primary ? 'bg-[#FAEAD3]/40 border-[#6651A4]/20' : 'bg-white border-black/[0.03] hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${base.primary ? 'bg-[#6651A4] text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {base.type} {base.primary && '• Primary'}
                      </span>
                      <button className="text-gray-400 hover:text-[#6651A4]"><Edit2 size={12}/></button>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-relaxed">{base.address}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-grandstander font-bold text-gray-800">Recent Hauls</h3>
                <ShoppingBag size={18} className="text-gray-300" />
              </div>
              <div className="space-y-4">
                {user.recentOrders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => navigate('/admin/orders')}
                    className="flex justify-between items-center p-4 bg-[#FDF4E6]/30 rounded-2xl border border-black/[0.02] hover:bg-[#FAEAD3]/50 transition-all cursor-pointer"
                  >
                    <div>
                      <p className="text-[12px] font-bold text-[#6651A4]">{order.id}</p>
                      <p className="text-[10px] text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-bold font-grandstander text-gray-700">{order.total}</p>
                      <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03] md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-grandstander font-bold text-gray-800">Funds History</h3>
                <RefreshCcw size={18} className="text-gray-300" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.recentTransactions.map(txn => (
                  <div 
                    key={txn.id} 
                    onClick={() => navigate(`/admin/transactions/${txn.id}`)}
                    className="flex justify-between items-center p-4 bg-[#FDF4E6]/30 rounded-2xl border border-black/[0.02] hover:bg-[#FAEAD3]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs ${txn.type === 'Credit' ? 'bg-green-400' : 'bg-[#E8312A]'}`}>
                        {txn.type === 'Credit' ? '+' : '-'}
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-gray-700">{txn.id}</p>
                        <p className="text-[10px] text-gray-400">{txn.date}</p>
                      </div>
                    </div>
                    <p className={`text-[14px] font-bold font-grandstander ${txn.type === 'Credit' ? 'text-green-500' : 'text-gray-700'}`}>{txn.amount}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
