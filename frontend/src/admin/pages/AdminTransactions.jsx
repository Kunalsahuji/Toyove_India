import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ArrowUpRight, ArrowDownRight, CreditCard, ChevronLeft, ChevronRight, FileSpreadsheet, RefreshCw, Tag, Activity, ArrowUpDown } from 'lucide-react'

export function AdminTransactions() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [methodFilter, setMethodFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const initialTxns = [
    { id: 'TXN-9021', user: 'Emma Watson', type: 'Credit', category: 'Wallet Top-up', amount: '$500.00', method: 'UPI (GPay)', status: 'Success', date: '2026-04-24 14:30' },
    { id: 'TXN-9022', user: 'Liam Smith', type: 'Debit', category: 'Order Payment', amount: '$89.50', method: 'Wallet Balance', status: 'Success', date: '2026-04-24 12:15' },
    { id: 'TXN-9023', user: 'Olivia Brown', type: 'Credit', category: 'Refund', amount: '$45.00', method: 'Credit Card', status: 'Processing', date: '2026-04-23 09:10' },
    { id: 'TXN-9024', user: 'Noah Jones', type: 'Debit', category: 'Order Payment', amount: '$210.00', method: 'NetBanking (HDFC)', status: 'Failed', date: '2026-04-22 18:45' },
    { id: 'TXN-9025', user: 'Ava Garcia', type: 'Credit', category: 'Wallet Top-up', amount: '$100.00', method: 'Card (Visa)', status: 'Success', date: '2026-04-21 11:20' },
    { id: 'TXN-9026', user: 'William Miller', type: 'Debit', category: 'Order Payment', amount: '$65.00', method: 'UPI (PhonePe)', status: 'Success', date: '2026-04-20 16:05' },
    { id: 'TXN-9027', user: 'Sophia Davis', type: 'Credit', category: 'Refund', amount: '$15.00', method: 'Wallet Balance', status: 'Success', date: '2026-04-19 10:00' },
    { id: 'TXN-9028', user: 'James Wilson', type: 'Debit', category: 'Order Payment', amount: '$320.00', method: 'Card (Mastercard)', status: 'Success', date: '2026-04-18 14:55' },
    { id: 'TXN-9029', user: 'Isabella Moore', type: 'Credit', category: 'Wallet Top-up', amount: '$50.00', method: 'UPI (Paytm)', status: 'Success', date: '2026-04-17 08:30' },
  ]

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = initialTxns.filter(t => 
        (typeFilter === 'All' || t.type === typeFilter) &&
        (methodFilter === 'All' || t.method.includes(methodFilter)) &&
        (statusFilter === 'All' || t.status === statusFilter) &&
        (categoryFilter === 'All' || t.category === categoryFilter) &&
        (t.id.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase()))
      )
      setTransactions(filtered)
      setCurrentPage(1)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [search, typeFilter, methodFilter, statusFilter, categoryFilter])

  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const currentTxns = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Financial Ledger</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Monitor all incoming and outgoing Joy (Funds).</p>
        </div>
        <button className="h-11 px-6 bg-white text-[#6651A4] border border-[#6651A4]/20 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-sm hover:bg-[#FAEAD3] hover:border-[#6651A4] transition-all w-max flex items-center gap-2">
          <FileSpreadsheet size={16} /> Export CSV
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><ArrowDownRight size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Inflow</p><p className="text-2xl font-grandstander font-bold text-gray-800">$45,210.00</p></div>
        </div>
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><ArrowUpRight size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Outflow (Refunds)</p><p className="text-2xl font-grandstander font-bold text-gray-800">$1,450.00</p></div>
        </div>
        <div className="bg-[#6651A4] p-6 rounded-[24px] shadow-md flex items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"/>
          <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center backdrop-blur-sm relative z-10"><RefreshCw size={24}/></div>
          <div className="relative z-10"><p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Wallet Liability</p><p className="text-2xl font-grandstander font-bold text-white">$8,945.50</p></div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03] flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[300px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search TXN ID or Explorer..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 font-medium text-[13px] transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Category Filter */}
          <div className="relative shrink-0">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-12 pl-9 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[11px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Wallet Top-up">Wallet Top-up</option>
              <option value="Order Payment">Order Payments</option>
              <option value="Refund">Refunds</option>
            </select>
          </div>

          {/* Method Filter */}
          <div className="relative shrink-0">
            <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}
              className="h-12 pl-9 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[11px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Methods</option>
              <option value="UPI">UPI</option>
              <option value="Card">Cards</option>
              <option value="Wallet">Wallet</option>
              <option value="NetBanking">NetBanking</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative shrink-0">
            <Activity size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 pl-9 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[11px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative shrink-0">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 pl-9 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[11px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Types</option>
              <option value="Credit">Credit (In)</option>
              <option value="Debit">Debit (Out)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <motion.div layout className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#FAEAD3]/30 border-b border-black/[0.03]">
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction details</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explorer</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Method</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse"/><div className="space-y-2"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse"/><div className="h-3 w-32 bg-gray-100 rounded animate-pulse"/></div></div></td>
                    <td className="py-4 px-6"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-5 w-16 bg-gray-100 rounded ml-auto animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-6 w-20 bg-gray-100 rounded-full mx-auto animate-pulse"/></td>
                  </tr>
                ))
              ) : currentTxns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <CreditCard size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Transactions Found</p>
                  </td>
                </tr>
              ) : (
                currentTxns.map((txn, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    key={txn.id} 
                    onClick={() => navigate(`/admin/transactions/${txn.id}`)}
                    className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${txn.type === 'Credit' ? 'bg-green-400' : 'bg-[#E8312A]'}`}>
                          {txn.type === 'Credit' ? <ArrowDownRight size={16}/> : <ArrowUpRight size={16}/>}
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-gray-800">{txn.category}</p>
                          <p className="text-[10px] text-gray-400 font-medium font-mono mt-0.5">{txn.id} • {txn.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[13px] font-bold text-gray-700">{txn.user}</td>
                    <td className="py-4 px-6 text-[12px] text-gray-500 font-medium">{txn.method}</td>
                    <td className="py-4 px-6 text-right">
                      <p className={`text-[15px] font-bold font-grandstander ${txn.type === 'Credit' ? 'text-green-500' : 'text-gray-800'}`}>
                        {txn.type === 'Credit' ? '+' : '-'}{txn.amount}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest
                        ${txn.status === 'Success' ? 'bg-green-50 text-green-600' : 
                          txn.status === 'Processing' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}
                      >
                        {txn.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && transactions.length > 0 && (
          <div className="p-4 border-t border-black/[0.03] flex items-center justify-between bg-[#FAEAD3]/10">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {(currentPage-1)*itemsPerPage + 1} to {Math.min(currentPage*itemsPerPage, transactions.length)} of {transactions.length}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#6651A4] hover:text-white hover:border-[#6651A4] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#6651A4] hover:text-white hover:border-[#6651A4] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
