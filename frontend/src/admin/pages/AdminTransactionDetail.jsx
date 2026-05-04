import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowUpRight, ArrowDownRight, CreditCard, User, Clock, FileText, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react'

export function AdminTransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Mock data for the specific transaction
  const [txn, setTxn] = useState(null)

  useEffect(() => {
    // Simulate API fetch based on ID
    setLoading(true)
    setTimeout(() => {
      // Dummy logic to determine type based on ID for demo purposes
      const isCredit = !id.includes('7826') && !id.includes('9024') // Just making some failed/debit for variety
      
      setTxn({
        id: id || 'TXN-0000',
        type: isCredit ? 'Credit' : 'Debit',
        category: isCredit ? 'Bank Deposit' : 'Order Payment',
        amount: isCredit ? '$145.00' : '$45.00',
        method: isCredit ? 'UPI (GPay)' : 'Credit Card (**** 4242)',
        status: id.includes('7826') ? 'Failed' : 'Success',
        date: '2026-04-29 10:30 AM',
        user: {
          name: 'Emma Watson',
          email: 'emma@example.com',
          id: 'USR-001'
        },
        reference: 'REF-892374982374',
        timeline: [
          { time: '10:30 AM', desc: 'Transaction initiated by user.', status: 'pending' },
          { time: '10:31 AM', desc: 'Payment gateway processing.', status: 'processing' },
          { time: '10:31 AM', desc: id.includes('7826') ? 'Payment declined by bank.' : 'Payment successful. Funds verified & processed.', status: id.includes('7826') ? 'failed' : 'success' }
        ]
      })
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return (
      <div className="shell flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#6651A4] rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Ledger Entry...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shell space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.05] pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-[#6651A4] hover:bg-[#FAEAD3] shadow-sm transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-grandstander font-bold text-gray-800 flex items-center gap-3">
              Ledger Entry
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${txn.status === 'Success' ? 'bg-green-50 text-green-600' : txn.status === 'Failed' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>
                {txn.status}
              </span>
            </h1>
            <p className="text-gray-500 font-medium text-sm font-mono mt-1">{txn.id}</p>
          </div>
        </div>
        
        {txn.status === 'Failed' && (
          <button className="h-10 px-4 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-gray-50 flex items-center gap-2">
            <RefreshCcw size={14} /> Retry Sync
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Amount Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md ${txn.type === 'Credit' ? 'bg-green-400' : 'bg-[#E8312A]'}`}>
                {txn.type === 'Credit' ? <ArrowDownRight size={32}/> : <ArrowUpRight size={32}/>}
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{txn.category}</p>
                <h2 className={`text-5xl font-grandstander font-bold ${txn.type === 'Credit' ? 'text-green-500' : 'text-gray-800'}`}>
                  {txn.type === 'Credit' ? '+' : '-'}{txn.amount}
                </h2>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date & Time</p>
              <p className="text-[15px] font-bold text-gray-700">{txn.date}</p>
            </div>
          </motion.div>

          {/* Details Grid */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03] space-y-8">
            <h3 className="text-xl font-grandstander font-bold text-gray-800">Transaction Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"><CreditCard size={14}/> Payment Method</p>
                  <p className="text-[14px] font-bold text-gray-700">{txn.method}</p>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"><FileText size={14}/> Reference No.</p>
                  <p className="text-[14px] font-mono font-bold text-gray-700">{txn.reference}</p>
                </div>
              </div>
              
              <div className="space-y-6 p-5 bg-[#FDF4E6]/50 rounded-2xl border border-black/[0.02]">
                <p className="flex items-center gap-2 text-[10px] font-bold text-[#6651A4] uppercase tracking-widest mb-2"><User size={14}/> Explorer Info</p>
                <div>
                  <p className="text-[15px] font-bold text-gray-800">{txn.user.name}</p>
                  <p className="text-[12px] text-gray-500 mt-1">{txn.user.email}</p>
                  <p className="text-[10px] font-mono text-gray-400 mt-2">ID: {txn.user.id}</p>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-[#F1641E] hover:underline">View Full Profile</button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Timeline */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[32px] p-6 shadow-sm border border-black/[0.03]">
            <h3 className="text-lg font-grandstander font-bold text-gray-800 mb-6 flex items-center gap-2"><Clock size={18}/> Processing Timeline</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100 pl-10 md:pl-0">
              {txn.timeline.map((event, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-[-40px] md:static ${event.status === 'success' ? 'bg-green-500 text-white' : event.status === 'failed' ? 'bg-red-500 text-white' : 'bg-[#6651A4] text-white'}`}>
                    {event.status === 'success' ? <CheckCircle size={14}/> : event.status === 'failed' ? <AlertCircle size={14}/> : <Clock size={14}/>}
                  </div>
                  <div className="w-full md:w-[calc(50%-2.5rem)] bg-[#FDF4E6]/50 p-4 rounded-xl border border-black/[0.02] shadow-sm">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{event.time}</p>
                    <p className="text-[12px] font-medium text-gray-700">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Admin Actions */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#FAEAD3] rounded-[32px] p-6 shadow-sm border border-[#F1641E]/10">
            <h3 className="text-lg font-grandstander font-bold text-gray-800 mb-4">Admin Actions</h3>
            <div className="space-y-3">
              <button className="w-full h-11 bg-white text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#6651A4] hover:text-white transition-all">Download Receipt</button>
              {txn.status === 'Success' && txn.type === 'Credit' && (
                <button className="w-full h-11 bg-[#E8312A] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-red-700 transition-all">Issue Refund</button>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  )
}
