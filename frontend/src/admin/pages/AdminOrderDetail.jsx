import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Package, Truck, CreditCard, 
  User, Mail, Phone, MapPin, Calendar, 
  ExternalLink, Printer, CheckCircle, Clock
} from 'lucide-react'

export function AdminOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Mock data for the specific order
  const [order, setOrder] = useState(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setOrder({
        id: id || 'ORD-8001',
        date: '2026-04-24 14:30',
        status: 'Shipped',
        total: '$145.00',
        paymentMethod: 'Credit Card (Ending 4242)',
        paymentStatus: 'Paid',
        customer: {
          name: 'Emma Watson',
          email: 'emma@example.com',
          phone: '+91 98765 43210',
          address: '7th Floor, Unit 703, Mayagarden, Zirakpur, Punjab - 140603'
        },
        items: [
          { id: 101, name: 'Eco-Friendly Wooden Train', price: '$45.00', qty: 2, total: '$90.00', img: '🚂' },
          { id: 102, name: 'Smart Coding Robot', price: '$55.00', qty: 1, total: '$55.00', img: '🤖' }
        ],
        timeline: [
          { status: 'Order Placed', time: '24 Apr, 14:30', desc: 'Order received by the system', done: true },
          { status: 'Payment Verified', time: '24 Apr, 14:35', desc: 'Transaction TXN-9021 confirmed', done: true },
          { status: 'Processing', time: '24 Apr, 16:20', desc: 'Items being packed at warehouse', done: true },
          { status: 'Shipped', time: '25 Apr, 09:15', desc: 'Carrier: BlueDart - AWB: 88291022', done: true },
          { status: 'Out for Delivery', time: 'Pending', desc: 'Package reaching local hub', done: false },
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
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Scanning Blueprint...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shell space-y-6 md:space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] pb-6 md:pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#6651A4] hover:bg-[#FAEAD3] shadow-sm transition-all shrink-0">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-grandstander font-bold text-gray-800 flex flex-wrap items-center gap-3">
              Order {order.id}
              <span className={`px-3 py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600`}>
                {order.status}
              </span>
            </h1>
            <p className="text-gray-500 font-medium text-[12px] md:text-sm flex items-center gap-2 mt-1">
              <Calendar size={14} /> Placed on {order.date}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
          <button className="h-10 md:h-12 px-5 bg-white border border-black/[0.05] text-gray-600 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all whitespace-nowrap">
            <Printer size={16} /> Print Invoice
          </button>
          <button className="h-10 md:h-12 px-6 bg-[#6651A4] text-white rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] shadow-lg hover:bg-[#5a4892] flex items-center gap-2 transition-all whitespace-nowrap">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]">
            <h3 className="text-lg md:text-xl font-grandstander font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Package size={20} className="text-[#6651A4]" /> Package Contents
            </h3>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[#FDF4E6]/30 rounded-[24px] border border-black/[0.02] hover:bg-[#FAEAD3]/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                      {item.img}
                    </div>
                    <div>
                      <p className="text-[14px] md:text-[15px] font-bold text-gray-800">{item.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">QTY: {item.qty} × {item.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] md:text-[16px] font-bold font-grandstander text-[#6651A4]">{item.total}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-dashed border-gray-200 space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">$145.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping Fee</span>
                <span className="font-bold text-green-500">FREE</span>
              </div>
              <div className="flex justify-between text-xl md:text-2xl font-grandstander font-bold text-gray-800 pt-2">
                <span>Total Amount</span>
                <span className="text-[#F1641E]">{order.total}</span>
              </div>
            </div>
          </motion.div>

          {/* Logistics Timeline */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]">
            <h3 className="text-lg md:text-xl font-grandstander font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Truck size={20} className="text-[#6651A4]" /> Journey Tracker
            </h3>
            <div className="space-y-8 relative before:absolute before:left-4 md:before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {order.timeline.map((step, i) => (
                <div key={i} className="relative pl-12 md:pl-16">
                  <div className={`absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 ${step.done ? 'bg-[#6651A4] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {step.done ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-[14px] md:text-[15px] font-bold ${step.done ? 'text-gray-800' : 'text-gray-400'}`}>{step.status}</h4>
                      <span className="text-[10px] md:text-[11px] font-medium text-gray-400">{step.time}</span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Customer Hub */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-grandstander font-bold text-gray-800">Explorer Info</h3>
              <button onClick={() => navigate('/admin/users/USR-001')} className="text-[#F1641E] hover:scale-110 transition-transform"><ExternalLink size={18} /></button>
            </div>
            <div className="flex items-center gap-4 mb-6 p-4 bg-[#FDF4E6]/50 rounded-[24px]">
              <div className="w-12 h-12 bg-[#FAEAD3] rounded-full flex items-center justify-center text-xl font-bold font-grandstander text-[#6651A4]">
                {order.customer.name.charAt(0)}
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-800">{order.customer.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">Joined 2 months ago</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[13px] text-gray-600">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{order.customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-gray-600">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <span>{order.customer.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-[13px] text-gray-600 border-t border-black/[0.03] pt-4">
                <MapPin size={16} className="text-gray-400 shrink-0 mt-1" />
                <span className="leading-relaxed">{order.customer.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Hub */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#6651A4] rounded-[32px] p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <h3 className="text-lg font-grandstander font-bold mb-6 flex items-center gap-2">
                <CreditCard size={20} /> Transaction Hub
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Payment Method</p>
                  <p className="text-[14px] font-bold">{order.paymentMethod}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
                    <span className="px-2 py-0.5 bg-green-400 text-[#222222] rounded-md text-[9px] font-bold uppercase tracking-widest">{order.paymentStatus}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Paid Amount</p>
                    <p className="text-xl font-bold font-grandstander">{order.total}</p>
                  </div>
                </div>
                <button className="w-full h-11 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all mt-2 flex items-center justify-center gap-2">
                   View Receipt <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
