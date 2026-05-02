import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MoreVertical, ShoppingBag, Eye, Calendar, MapPin, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react'

export function AdminOrders() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const initialOrders = [
    { id: '#ORD-8001', customer: 'Emma Watson', date: 'Oct 24, 2026', total: '$145.00', items: 3, payment: 'Paid (UPI)', status: 'Pending', dest: 'Mumbai, MH' },
    { id: '#ORD-8002', customer: 'Liam Smith', date: 'Oct 23, 2026', total: '$89.50', items: 1, payment: 'Paid (Card)', status: 'Processing', dest: 'Delhi, DL' },
    { id: '#ORD-8003', customer: 'Olivia Brown', date: 'Oct 21, 2026', total: '$210.00', items: 5, payment: 'Paid (Wallet)', status: 'Shipped', dest: 'Bangalore, KA' },
    { id: '#ORD-8004', customer: 'Noah Jones', date: 'Oct 20, 2026', total: '$45.00', items: 1, payment: 'Refunded', status: 'Cancelled', dest: 'Pune, MH' },
    { id: '#ORD-8005', customer: 'Ava Garcia', date: 'Oct 18, 2026', total: '$320.00', items: 4, payment: 'Paid (NetBanking)', status: 'Delivered', dest: 'Chennai, TN' },
    { id: '#ORD-8006', customer: 'William Miller', date: 'Oct 15, 2026', total: '$65.00', items: 2, payment: 'Paid (UPI)', status: 'Delivered', dest: 'Kolkata, WB' },
  ]

  const [orders, setOrders] = useState([])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = initialOrders.filter(o => 
        (statusFilter === 'All' || o.status === statusFilter) &&
        (o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
      )
      setOrders(filtered)
      setCurrentPage(1)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [search, statusFilter])

  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const currentOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100'
      case 'Processing': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'Shipped': return 'bg-purple-50 text-[#6651A4] border-purple-100'
      case 'Delivered': return 'bg-green-50 text-green-600 border-green-100'
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Order Command</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Track and manage fulfillment workflows.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03] flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search by Order ID or Customer..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 font-medium text-[13px] transition-all"
          />
        </div>
        
        <div className="relative shrink-0 w-full md:w-60">
          <Filter size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select 
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[10px] md:text-[11px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <motion.div layout className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAEAD3]/30 border-b border-black/[0.03]">
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Info</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer & Destination</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-6"><div className="space-y-2"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse"/><div className="h-3 w-24 bg-gray-100 rounded animate-pulse"/></div></td>
                    <td className="py-4 px-6"><div className="space-y-2"><div className="h-4 w-32 bg-gray-100 rounded animate-pulse"/><div className="h-3 w-24 bg-gray-100 rounded animate-pulse"/></div></td>
                    <td className="py-4 px-6"><div className="space-y-2"><div className="h-4 w-16 bg-gray-100 rounded animate-pulse"/><div className="h-3 w-20 bg-gray-100 rounded animate-pulse"/></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-24 bg-gray-100 rounded-full mx-auto animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto animate-pulse"/></td>
                  </tr>
                ))
              ) : currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Orders Found</p>
                  </td>
                </tr>
              ) : (
                currentOrders.map((order, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    key={order.id} 
                    onClick={() => navigate(`/admin/orders/${order.id.replace('#', '')}`)}
                    className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors group cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <p className="text-[14px] font-bold text-[#6651A4] font-mono">{order.id}</p>
                      <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mt-1"><Calendar size={10}/> {order.date}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-[13px] font-bold text-gray-800">{order.customer}</p>
                      <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 mt-1"><MapPin size={10}/> {order.dest}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-[15px] font-bold font-grandstander text-gray-800">{order.total} <span className="text-[10px] text-gray-400 font-sans ml-1">({order.items} items)</span></p>
                      <p className={`text-[10px] font-bold flex items-center gap-1 mt-1 ${order.payment.includes('Refunded') ? 'text-red-500' : 'text-green-500'}`}><CreditCard size={10}/> {order.payment}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <select 
                        value={order.status}
                        onChange={(e) => {
                          const newOrders = [...orders];
                          newOrders[i].status = e.target.value;
                          setOrders(newOrders);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border appearance-none outline-none cursor-pointer hover:shadow-md transition-all ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#6651A4] bg-white border border-gray-100 hover:border-[#6651A4]/30 hover:bg-[#FAEAD3] rounded-lg transition-all shadow-sm">
                          <Eye size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#6651A4] bg-white border border-gray-100 hover:border-[#6651A4]/30 hover:bg-[#FAEAD3] rounded-lg transition-all shadow-sm">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && orders.length > 0 && (
          <div className="p-4 border-t border-black/[0.03] flex items-center justify-between bg-[#FAEAD3]/10">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {(currentPage-1)*itemsPerPage + 1} to {Math.min(currentPage*itemsPerPage, orders.length)} of {orders.length}
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
