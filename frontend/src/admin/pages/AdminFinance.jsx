import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, Wallet, CreditCard, ArrowUpRight, 
  ArrowDownRight, Search, Filter, RefreshCcw, 
  Settings as SettingsIcon, ShieldCheck, User,
  ChevronRight, Download, Plus, Minus, Landmark, Smartphone, X
} from 'lucide-react'
import { useToast } from '../../context/ToastContext'
export function AdminFinance() {
  const { success } = useToast()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [activeTab])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <DollarSign size={18} /> },
    { id: 'ledger', label: 'Ledger', icon: <CreditCard size={18} /> },
    { id: 'accounts', label: 'Account Hub', icon: <Landmark size={18} /> },
    { id: 'gateway', label: 'Gateway', icon: <SettingsIcon size={18} /> },
  ]

  const [showPayoutModal, setShowPayoutModal] = useState(false)

  return (
    <div className="shell space-y-8 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Financial Hub</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Centralized command for Toyovo India's economy.</p>
        </div>
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-black/[0.03] overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#6651A4] text-white shadow-md' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="shrink-0">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-[50vh] flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E84949] rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Syncing Vault...</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <FinanceOverview onProcessPayout={() => setShowPayoutModal(true)} />}
            {activeTab === 'ledger' && <FinanceLedger />}
            {activeTab === 'accounts' && <AccountHub />}
            {activeTab === 'gateway' && <GatewayConfig />}
          </motion.div>
        )}
      </AnimatePresence>

      <ProcessPayoutModal isOpen={showPayoutModal} onClose={() => setShowPayoutModal(false)} />
    </div>
  )
}

function ProcessPayoutModal({ isOpen, onClose }) {
  const { success } = useToast()
  const [processing, setProcessing] = useState(false)

  const handleProcess = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onClose()
      success('Financial distribution successful. Payouts processed.')
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="absolute inset-0 bg-[#333]/40 backdrop-blur-sm" />
          <motion.div initial={{scale:0.9, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.9, opacity:0, y:20}} className="w-full max-w-md bg-[#FAEAD3] rounded-[40px] p-10 relative z-10 border border-white shadow-2xl overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E84949]/5 rounded-full blur-3xl" />
             <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E84949] shadow-inner"><RefreshCcw className={processing ? 'animate-spin' : ''} size={24}/></div>
                <button onClick={onClose} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-[#E84949] transition-all"><X size={20}/></button>
             </div>
             <h3 className="text-2xl font-grandstander font-bold text-gray-800 mb-2">Process Payouts</h3>
             <p className="text-[13px] text-gray-500 font-medium mb-8">You are about to authorize <span className="font-bold text-gray-800">$1,045.00</span> in pending distributions. This action is irreversible.</p>
             
             <div className="space-y-4 mb-10">
                {[
                  { label: 'Vendor Settlements', amount: '$840.00' },
                  { label: 'Partner Commissions', amount: '$205.00' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between p-4 bg-white/40 rounded-2xl border border-white/50">
                     <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                     <span className="text-[13px] font-bold text-gray-800">{item.amount}</span>
                  </div>
                ))}
             </div>

             <button 
               disabled={processing}
               onClick={handleProcess}
               className="w-full h-14 bg-[#333] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#E84949] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
             >
                {processing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ShieldCheck size={18}/>}
                {processing ? 'Authorizing...' : 'Confirm Distribution'}
             </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function FinanceOverview() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/[0.03] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-500/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Net Cash Flow</p>
          <h3 className="text-4xl font-grandstander font-bold text-gray-800">$18,452.00</h3>
          <div className="mt-4 flex items-center gap-1 text-green-500 font-bold text-[11px]">
            <ArrowDownRight size={14} /> +12% from yesterday
          </div>
        </div>
        <div className="bg-[#6651A4] p-8 rounded-[32px] shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2">Linked Accounts</p>
          <h3 className="text-4xl font-grandstander font-bold">1,842</h3>
          <p className="mt-4 text-white/40 text-[10px] font-medium italic">Active Banks, Cards & UPI IDs</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/[0.03] relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#F1641E]/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pending Payouts</p>
          <h3 className="text-4xl font-grandstander font-bold text-gray-800">$1,045.00</h3>
          <button className="mt-4 text-[#F1641E] font-bold text-[11px] uppercase tracking-widest hover:underline flex items-center gap-1">Process Now <ChevronRight size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-black/[0.03] shadow-sm">
          <h3 className="text-lg font-grandstander font-bold text-gray-800 mb-6 flex items-center gap-2"><CreditCard size={18} className="text-[#6651A4]"/> Gateway Volume</h3>
          <div className="space-y-4">
            {[
              { name: 'Razorpay (UPI)', amount: '$12,450.00', share: '75%' },
              { name: 'Razorpay (Card)', amount: '$4,120.00', share: '20%' },
              { name: 'Net Banking', amount: '$882.00', share: '5%' },
            ].map((gate, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[12px] font-bold">
                  <span className="text-gray-700">{gate.name}</span>
                  <span className="text-gray-900">{gate.amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6651A4]" style={{ width: gate.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FAEAD3]/30 p-8 rounded-[32px] border border-black/[0.02]">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-grandstander font-bold text-gray-800">Quick Actions</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <button className="h-20 bg-white rounded-2xl border border-black/[0.03] shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-[#6651A4] hover:text-white transition-all group">
                <Download size={20} className="text-[#6651A4] group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Taxes</span>
              </button>
              <button className="h-20 bg-white rounded-2xl border border-black/[0.03] shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-[#F1641E] hover:text-white transition-all group">
                <RefreshCcw size={20} className="text-[#F1641E] group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Gateway Refresh</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

function FinanceLedger() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    method: 'All'
  })

  const initialTxns = [
    { id: 'TXN-9021', explorer: 'Emma Watson', type: 'Credit', amount: '+$500.00', method: 'UPI', status: 'Success' },
    { id: 'TXN-9022', explorer: 'Liam Smith', type: 'Debit', amount: '-$89.50', method: 'Bank Transfer', status: 'Success' },
    { id: 'TXN-9023', explorer: 'Olivia Brown', type: 'Credit', amount: '+$45.00', method: 'Card', status: 'Processing' },
    { id: 'TXN-9024', explorer: 'Emma Watson', type: 'Debit', amount: '-$120.00', method: 'UPI', status: 'Failed' },
    { id: 'TXN-9025', explorer: 'Ava Garcia', type: 'Credit', amount: '+$100.00', method: 'Card', status: 'Success' },
    { id: 'TXN-9026', explorer: 'William Miller', type: 'Debit', amount: '-$65.00', method: 'UPI', status: 'Success' },
  ]

  const filteredTxns = initialTxns.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(search.toLowerCase()) || 
                         t.explorer.toLowerCase().includes(search.toLowerCase())
    const matchesType = filters.type === 'All' || t.type === filters.type
    const matchesStatus = filters.status === 'All' || t.status === filters.status
    const matchesMethod = filters.method === 'All' || t.method.includes(filters.method)
    
    return matchesSearch && matchesType && matchesStatus && matchesMethod
  })

  return (
    <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/[0.03] space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ID or Explorer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[13px] font-medium"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`h-11 px-6 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all w-full md:w-auto justify-center ${
                showFilters ? 'bg-[#6651A4] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <Filter size={16} /> Advanced Filter
            </button>
            {(filters.type !== 'All' || filters.status !== 'All' || filters.method !== 'All') && (
               <button 
                onClick={() => setFilters({ type: 'All', status: 'All', method: 'All' })}
                className="h-11 w-11 bg-red-50 text-[#E84949] rounded-xl flex items-center justify-center hover:bg-[#E84949] hover:text-white transition-all shadow-sm"
               >
                  <X size={18} />
               </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-black/[0.03]">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Payment Type</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full h-10 px-4 bg-[#FAEAD3]/30 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/20 text-[11px] font-bold text-gray-700 uppercase"
                  >
                    <option value="All">All Types</option>
                    <option value="Credit">Credit (+)</option>
                    <option value="Debit">Debit (-)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Transaction Status</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full h-10 px-4 bg-[#FAEAD3]/30 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/20 text-[11px] font-bold text-gray-700 uppercase"
                  >
                    <option value="All">All Status</option>
                    <option value="Success">Success</option>
                    <option value="Processing">Processing</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Method Group</label>
                  <select 
                    value={filters.method}
                    onChange={(e) => setFilters({...filters, method: e.target.value})}
                    className="w-full h-10 px-4 bg-[#FAEAD3]/30 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/20 text-[11px] font-bold text-gray-700 uppercase"
                  >
                    <option value="All">All Methods</option>
                    <option value="UPI">UPI Hub</option>
                    <option value="Bank">Bank Wire</option>
                    <option value="Card">Vaulted Card</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#FAEAD3]/30">
            <tr>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">TXN ID</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explorer</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method</th>
              <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length > 0 ? filteredTxns.map(t => (
              <tr 
                key={t.id} 
                onClick={() => navigate(`/admin/transactions/${t.id}`)}
                className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors cursor-pointer group"
              >
                <td className="py-4 px-6 text-[13px] font-bold text-[#6651A4] font-mono group-hover:translate-x-1 transition-transform">{t.id}</td>
                <td className="py-4 px-6 text-[13px] font-bold text-gray-700">{t.explorer}</td>
                <td className={`py-4 px-6 text-[14px] font-bold font-grandstander ${t.type === 'Credit' ? 'text-green-500' : 'text-gray-800'}`}>{t.amount}</td>
                <td className="py-4 px-6 text-[12px] text-gray-400 font-medium">{t.method}</td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${t.status === 'Success' ? 'bg-green-50 text-green-600' : t.status === 'Failed' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>{t.status}</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400 font-medium text-sm italic">No entries found for "{search}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AccountHub() {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-10 rounded-[40px] border border-black/[0.03] shadow-sm">
          <h3 className="text-xl font-grandstander font-bold text-gray-800 mb-8">Financial Profiles</h3>
          <div className="space-y-5">
            {[
              { name: 'Emma Watson', accounts: '4 Linked', id: 'USR-001', details: '2 Banks, 1 Card, 1 UPI' },
              { name: 'Liam Smith', accounts: '1 Linked', id: 'USR-002', details: '1 UPI' },
              { name: 'Olivia Brown', accounts: '2 Linked', id: 'USR-003', details: '1 Bank, 1 Card' },
            ].map(user => (
              <div 
                key={user.id} 
                onClick={() => navigate(`/admin/users/${user.id}`)}
                className="flex items-center justify-between p-6 bg-[#FAEAD3]/30 rounded-3xl border border-white hover:bg-[#FAEAD3]/50 transition-all cursor-pointer group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-bold text-[#6651A4] shadow-inner text-xl group-hover:scale-110 transition-transform duration-500">{user.name.charAt(0)}</div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-800 group-hover:text-[#6651A4] transition-colors">{user.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.id} • {user.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[14px] font-bold text-[#6651A4]">{user.accounts}</p>
                      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Methods</p>
                   </div>
                   <div className="w-10 h-10 bg-white text-gray-400 rounded-xl flex items-center justify-center group-hover:text-[#6651A4] group-hover:shadow-lg transition-all"><ChevronRight size={20}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
         <div className="bg-[#FAEAD3] p-10 rounded-[40px] border border-white shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E84949]/5 rounded-full blur-3xl" />
            <h3 className="text-xl font-grandstander font-bold text-gray-800">Security Pulse</h3>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E84949]/20">
               <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#E84949] rounded-xl border-4 border-white shadow-lg" />
                  <p className="text-[13px] font-bold text-gray-800">Card Vaulted</p>
                  <p className="text-[10px] text-gray-500 font-medium">Olivia Brown linked ICICI • 5m ago</p>
               </div>
               <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#6651A4] rounded-xl border-4 border-white shadow-lg" />
                  <p className="text-[13px] font-bold text-gray-800">UPI Authenticated</p>
                  <p className="text-[10px] text-gray-500 font-medium">Emma Watson verified VPA • 1h ago</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function GatewayConfig() {
  return (
    <div className="max-w-3xl space-y-8">
       <div className="bg-white p-8 rounded-[32px] border border-black/[0.03] shadow-sm space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><ShieldCheck size={24}/></div>
                <div>
                   <h3 className="text-xl font-grandstander font-bold text-gray-800">Razorpay Integration</h3>
                   <p className="text-[12px] text-gray-500 font-medium">Production Environment Active</p>
                </div>
             </div>
             <button className="h-10 px-6 bg-green-50 text-green-600 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Connected
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Merchant ID</label>
                <div className="h-12 px-4 bg-[#FDF4E6] rounded-xl flex items-center text-[13px] font-mono font-bold text-gray-700">MID_8237498237</div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Webhook Status</label>
                <div className="h-12 px-4 bg-[#FDF4E6] rounded-xl flex items-center text-[13px] font-bold text-green-500">Active (Endpoint: /api/v1/payment/webhook)</div>
             </div>
          </div>

          <div className="pt-6 border-t border-black/[0.03] flex items-center justify-between">
             <div>
                <p className="font-bold text-gray-800 text-[14px]">Test Mode</p>
                <p className="text-[11px] text-gray-500">Enable test mode to simulate payments without actual money.</p>
             </div>
             <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-all flex items-center p-1 cursor-not-allowed opacity-50">
                <div className="w-4 h-4 bg-white rounded-full shadow-md" />
             </button>
          </div>
       </div>

       <div className="bg-[#FAEAD3] p-8 rounded-[32px] border border-[#F1641E]/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#F1641E] shadow-sm"><RefreshCcw size={24}/></div>
             <div>
                <h3 className="text-lg font-grandstander font-bold text-gray-800">Clear Payment Cache</h3>
                <p className="text-[11px] text-gray-500">Useful if payment statuses are not syncing in real-time.</p>
             </div>
          </div>
          <button className="h-11 px-6 bg-white text-[#F1641E] rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-sm hover:bg-[#F1641E] hover:text-white transition-all">Clear Now</button>
       </div>
    </div>
  )
}
