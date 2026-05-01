import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Users, DollarSign, Package, ShoppingCart, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'

export function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Simulate API load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { title: 'Total Revenue', value: '$24,562.00', trend: '+14.5%', isUp: true, icon: <DollarSign size={24} />, color: 'bg-green-500', route: '/admin/transactions' },
    { title: 'Active Explorers', value: '1,245', trend: '+5.2%', isUp: true, icon: <Users size={24} />, color: 'bg-[#6651A4]', route: '/admin/users' },
    { title: 'Total Orders', value: '458', trend: '-2.4%', isUp: false, icon: <ShoppingCart size={24} />, color: 'bg-[#F1641E]', route: '/admin/orders' },
    { title: 'Products in Catalog', value: '184', trend: '+12 new', isUp: true, icon: <Package size={24} />, color: 'bg-[#E8312A]', route: '/admin/products' },
  ]

  const recentOrders = [
    { id: '#ORD-7829', user: 'Emma Watson', date: '2 Mins ago', amount: '$145.00', status: 'Pending' },
    { id: '#ORD-7828', user: 'Liam Smith', date: '1 Hour ago', amount: '$89.50', status: 'Shipped' },
    { id: '#ORD-7827', user: 'Olivia Brown', date: '3 Hours ago', amount: '$210.00', status: 'Delivered' },
    { id: '#ORD-7826', user: 'Noah Jones', date: '5 Hours ago', amount: '$45.00', status: 'Cancelled' },
  ]

  return (
    <div className="shell space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Command Center</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Here's what's happening in Toyovo today.</p>
        </div>
        <button onClick={() => navigate('/admin/reports')} className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] hover:-translate-y-0.5 transition-all w-max flex items-center gap-2">
          <Activity size={16} /> Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            onClick={() => navigate(stat.route)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all border border-black/[0.03] group relative overflow-hidden cursor-pointer"
          >
            {/* Background decoration */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${stat.color}`} />
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="flex justify-between items-start">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-12 w-12 bg-gray-200 rounded-2xl"></div>
                </div>
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.title}</p>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-grandstander font-bold text-gray-800">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`flex items-center text-[11px] font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium ml-1">vs last month</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[32px] p-6 shadow-sm border border-black/[0.03]"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-grandstander font-bold text-gray-800">Recent Transactions</h2>
            <button onClick={() => navigate('/admin/transactions')} className="text-[11px] font-bold text-[#F1641E] uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explorer</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-50 last:border-0">
                      <td className="py-4 px-4"><div className="h-4 w-20 bg-gray-100 rounded"></div></td>
                      <td className="py-4 px-4"><div className="h-4 w-32 bg-gray-100 rounded"></div></td>
                      <td className="py-4 px-4"><div className="h-4 w-24 bg-gray-100 rounded"></div></td>
                      <td className="py-4 px-4"><div className="h-4 w-16 bg-gray-100 rounded ml-auto"></div></td>
                      <td className="py-4 px-4"><div className="h-6 w-20 bg-gray-100 rounded-full mx-auto"></div></td>
                    </tr>
                  ))
                ) : (
                  recentOrders.map((order, i) => (
                    <tr 
                      key={i} 
                      onClick={() => navigate(`/admin/transactions/${order.id.replace('#', '')}`)}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 font-mono text-[13px] font-bold text-[#6651A4]">{order.id}</td>
                      <td className="py-4 px-4 text-[13px] font-bold text-gray-700">{order.user}</td>
                      <td className="py-4 px-4 text-[12px] text-gray-500 font-medium">{order.date}</td>
                      <td className="py-4 px-4 text-[14px] font-bold font-grandstander text-gray-800 text-right">{order.amount}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest
                          ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 
                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 
                            order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / System Health */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-[#6651A4] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl"
        >
          {/* Decorations */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#F1641E]/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-grandstander font-bold mb-2">System Health</h2>
            <p className="text-white/60 text-sm mb-8">All services are running smoothly.</p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                  <span>Server Load</span>
                  <span className="text-green-300">Normal (32%)</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="w-[32%] h-full bg-green-400 rounded-full" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                  <span>Database Capacity</span>
                  <span className="text-yellow-300">Warning (78%)</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-yellow-400 rounded-full" />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button onClick={() => navigate('/admin/system-logs')} className="w-full h-12 bg-white text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#FAEAD3] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                  View Full Logs <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  )
}
