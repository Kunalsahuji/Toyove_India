import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, ShoppingBag, Package, Users, 
  Wallet, AlertCircle, CheckCircle, Info,
  Trash2, Filter, Search, ChevronRight, Clock
} from 'lucide-react'

export function AdminNotifications() {
  const [filter, setFilter] = useState('All')
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Order', title: 'New Haul Received', desc: 'Emma Watson placed order #ORD-8001 for 3 toys.', time: '2 mins ago', status: 'unread', icon: <ShoppingBag size={18} />, color: 'bg-blue-500' },
    { id: 2, type: 'Stock', title: 'Inventory Alert', desc: 'Shop & Glow Toy Cart Orange Car is running low (5 left).', time: '15 mins ago', status: 'unread', icon: <AlertCircle size={18} />, color: 'bg-[#F1641E]' },
    { id: 3, type: 'Finance', title: 'Wallet Recharge', desc: 'Liam Smith added $500.00 Joy to their wallet.', time: '1 hour ago', status: 'read', icon: <Wallet size={18} />, color: 'bg-green-500' },
    { id: 4, type: 'User', title: 'New Explorer Joined', desc: 'Noah Jones just signed up for Toyovo India.', time: '3 hours ago', status: 'read', icon: <Users size={18} />, color: 'bg-[#6651A4]' },
    { id: 5, type: 'Product', title: 'Blueprint Updated', desc: 'Playbox The Builder Wooden Toys specifications were modified.', time: '5 hours ago', status: 'read', icon: <Package size={18} />, color: 'bg-purple-500' },
    { id: 6, type: 'Finance', title: 'Payment Failed', desc: 'Transaction TXN-9024 for $210.00 was declined by bank.', time: '8 hours ago', status: 'read', icon: <AlertCircle size={18} />, color: 'bg-[#E8312A]' },
    { id: 7, type: 'Admin', title: 'Security Alert', desc: 'Maintenance Mode was toggled OFF by Super Admin.', time: '12 hours ago', status: 'read', icon: <Info size={18} />, color: 'bg-gray-500' },
    { id: 8, type: 'Stock', title: 'Out of Stock', desc: 'Fun And Educational Toy For Babies is now out of stock.', time: '1 day ago', status: 'read', icon: <Trash2 size={18} />, color: 'bg-red-600' },
  ])

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const categories = ['All', 'Order', 'Stock', 'Finance', 'User', 'Product', 'Admin']

  return (
    <div className="shell space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800 flex items-center gap-4">
            Alert Center
            <span className="px-3 py-1 bg-[#F1641E] text-white rounded-full text-[12px] font-bold shadow-sm">
              {notifications.filter(n => n.status === 'unread').length} New
            </span>
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Real-time pulse of all Toyovo India operations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={markAllRead}
            className="h-11 px-6 bg-white border border-[#6651A4]/20 text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#FAEAD3] transition-all flex items-center gap-2"
          >
            <CheckCircle size={16} /> Mark All Read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 border-b border-black/[0.03] flex flex-col md:flex-row gap-6 justify-between items-center bg-[#FAEAD3]/10">
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                  filter === cat 
                  ? 'bg-[#6651A4] text-white shadow-md' 
                  : 'text-gray-500 hover:bg-white hover:text-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search alerts..." className="w-full h-10 pl-11 pr-4 bg-white rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[12px] font-medium" />
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-50">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <motion.div
                  layout
                  key={n.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-6 flex items-start justify-between group transition-all ${n.status === 'unread' ? 'bg-[#FDF4E6]/50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${n.color} shrink-0`}>
                      {n.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className={`text-[15px] font-bold ${n.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded-md text-[9px] font-bold uppercase tracking-widest">{n.type}</span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed max-w-2xl">{n.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                        <Clock size={12} /> {n.time}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-[#6651A4] hover:bg-white rounded-lg transition-all shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                    <button 
                      onClick={() => deleteNotification(n.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center">
                <Bell size={48} className="mx-auto text-gray-100 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No alerts found in this category</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
