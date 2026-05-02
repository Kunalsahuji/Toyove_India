import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, Wallet, CreditCard, ArrowUpRight, 
  ArrowDownRight, Search, Filter, RefreshCcw, 
  Settings as SettingsIcon, ShieldCheck, User,
  ChevronRight, Download, Plus, Minus
} from 'lucide-react'

export function AdminFinance() {
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
    { id: 'wallets', label: 'Wallets', icon: <Wallet size={18} /> },
    { id: 'gateway', label: 'Gateway', icon: <SettingsIcon size={18} /> },
  ]

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
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#F1641E] rounded-full animate-spin" />
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
            {activeTab === 'overview' && <FinanceOverview />}
            {activeTab === 'ledger' && <FinanceLedger />}
            {activeTab === 'wallets' && <WalletManagement />}
            {activeTab === 'gateway' && <GatewayConfig />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2">Wallet Liability</p>
          <h3 className="text-4xl font-grandstander font-bold">$9,210.50</h3>
          <p className="mt-4 text-white/40 text-[10px] font-medium italic">Total Joy held by Explorers</p>
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
              { name: 'Razorpay (UPI)', amount: '$12,450.00', share: '68%' },
              { name: 'Razorpay (Card)', amount: '$4,120.00', share: '22%' },
              { name: 'Wallet Credits', amount: '$1,882.00', share: '10%' },
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
  const [search, setSearch] = useState('')
  const txns = [
    { id: 'TXN-9021', explorer: 'Emma Watson', type: 'Credit', amount: '+$500.00', method: 'UPI', status: 'Success' },
    { id: 'TXN-9022', explorer: 'Liam Smith', type: 'Debit', amount: '-$89.50', method: 'Wallet', status: 'Success' },
    { id: 'TXN-9023', explorer: 'Olivia Brown', type: 'Credit', amount: '+$45.00', method: 'Card', status: 'Processing' },
  ]

  return (
    <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/[0.03] flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search ID or Explorer..." 
            className="w-full h-11 pl-11 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[13px] font-medium"
          />
        </div>
        <button className="h-11 px-6 bg-white border border-gray-200 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 flex items-center gap-2">
          <Filter size={16} /> Advanced Filter
        </button>
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
            {txns.map(t => (
              <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-[13px] font-bold text-[#6651A4] font-mono">{t.id}</td>
                <td className="py-4 px-6 text-[13px] font-bold text-gray-700">{t.explorer}</td>
                <td className={`py-4 px-6 text-[14px] font-bold font-grandstander ${t.type === 'Credit' ? 'text-green-500' : 'text-gray-800'}`}>{t.amount}</td>
                <td className="py-4 px-6 text-[12px] text-gray-400 font-medium">{t.method}</td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${t.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WalletManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-[32px] border border-black/[0.03] shadow-sm">
          <h3 className="text-lg font-grandstander font-bold text-gray-800 mb-6">Manage Explorer Balances</h3>
          <div className="space-y-4">
            {[
              { name: 'Emma Watson', balance: '$1,245.00', id: 'USR-001' },
              { name: 'Liam Smith', balance: '$89.50', id: 'USR-002' },
              { name: 'Olivia Brown', balance: '$210.00', id: 'USR-003' },
            ].map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-[#FDF4E6]/50 rounded-2xl border border-black/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-[#6651A4] shadow-sm">{user.name.charAt(0)}</div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-800">{user.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{user.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <p className="text-[16px] font-grandstander font-bold text-[#6651A4]">{user.balance}</p>
                   <div className="flex gap-2">
                      <button className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"><Plus size={16}/></button>
                      <button className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><Minus size={16}/></button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
         <div className="bg-[#FAEAD3] p-8 rounded-[32px] border border-[#F1641E]/10 space-y-6">
            <h3 className="text-xl font-grandstander font-bold text-gray-800">Wallet Logs</h3>
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-200">
               <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-orange-400 rounded-full border-4 border-white shadow-sm" />
                  <p className="text-[12px] font-bold text-gray-800">Deducted $45.00</p>
                  <p className="text-[10px] text-gray-500">Explorer: Liam Smith • 2m ago</p>
               </div>
               <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 bg-[#6651A4] rounded-full border-4 border-white shadow-sm" />
                  <p className="text-[12px] font-bold text-gray-800">Added $500.00</p>
                  <p className="text-[10px] text-gray-500">Explorer: Emma Watson • 1h ago</p>
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
