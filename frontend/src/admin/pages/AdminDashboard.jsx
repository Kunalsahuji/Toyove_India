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
    { title: 'Total Revenue', value: '$24,562.00', trend: '+14.5%', isUp: true, icon: <DollarSign size={24} />, color: 'bg-green-500', route: '/admin/finance' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03]"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-grandstander font-bold text-gray-800">Revenue Flow</h2>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Growth over the last 7 days</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6651A4]" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">Sales</span>
            </div>
          </div>
          
          <div className="h-64 relative flex items-end justify-between gap-2 px-2">
            {[45, 60, 40, 85, 55, 95, 75].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                    className="w-full max-w-[40px] bg-[#FAEAD3] rounded-t-2xl group-hover:bg-[#6651A4] transition-colors relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${val * 10}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inventory Mix + Wishlist Trends */}
        <div className="space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]"
          >
            <h2 className="text-lg md:text-xl font-grandstander font-bold text-gray-800 mb-6 md:mb-8">Toy Categories</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center shrink-0 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                  <motion.circle 
                    cx="50%" cy="50%" r="40%" fill="transparent" stroke="#6651A4" strokeWidth="12" 
                    strokeDasharray="251" initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 * 0.4 }} transition={{ duration: 1.5, ease: "easeInOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-xl md:text-3xl font-grandstander font-bold text-gray-800">184</p>
                  <p className="text-[7px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Toys</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4 w-full">
                {[
                  { label: 'Wooden', value: '45%', color: 'bg-[#6651A4]' },
                  { label: 'Educational', value: '30%', color: 'bg-[#F1641E]' },
                  { label: 'Vehicles', value: '15%', color: 'bg-[#E8312A]' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-gray-800">{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: item.value }} className={`h-full ${item.color} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Wishlist Trends */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]"
          >
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg md:text-xl font-grandstander font-bold text-gray-800">Wishlist Trends</h3>
                <span className="px-2 py-0.5 bg-purple-50 text-[#6651A4] rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">Top Favorites</span>
             </div>
             <div className="space-y-3">
                {[
                  { name: 'Wooden Train', count: 245, trend: '+12%' },
                  { name: 'Coding Robot', count: 189, trend: '+5%' }
                ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-[#FDF4E6]/30 rounded-xl md:rounded-2xl border border-black/[0.01]">
                      <div className="min-w-0 flex-1">
                         <p className="text-[12px] md:text-[13px] font-bold text-gray-800 truncate">{item.name}</p>
                         <p className="text-[9px] md:text-[10px] text-gray-400 font-medium truncate">{item.count} saved</p>
                      </div>
                      <span className="text-[10px] md:text-[11px] font-bold text-green-500 shrink-0 ml-2">{item.trend}</span>
                   </div>
                ))}
             </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-black/[0.03] overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-grandstander font-bold text-gray-800">Recent Ledger</h2>
            <button onClick={() => navigate('/admin/transactions')} className="text-[9px] md:text-[11px] font-bold text-[#F1641E] uppercase tracking-widest hover:underline whitespace-nowrap">View All</button>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar -mx-2 px-2">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="py-3 px-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Explorer</th>
                  <th className="py-3 px-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="py-3 px-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2"><div className="h-3 w-12 bg-gray-100 rounded"></div></td>
                      <td className="py-3 px-2"><div className="h-3 w-24 bg-gray-100 rounded"></div></td>
                      <td className="py-3 px-2"><div className="h-3 w-16 bg-gray-100 rounded ml-auto"></div></td>
                      <td className="py-3 px-2"><div className="h-5 w-16 bg-gray-100 rounded-full mx-auto"></div></td>
                    </tr>
                  ))
                ) : (
                  recentOrders.map((order, i) => (
                    <tr 
                      key={i} 
                      onClick={() => navigate(`/admin/transactions/${order.id.replace('#', '')}`)}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-2 font-mono text-[11px] md:text-[13px] font-bold text-[#6651A4]">{order.id}</td>
                      <td className="py-4 px-2 text-[11px] md:text-[13px] font-bold text-gray-700">{order.user}</td>
                      <td className="py-4 px-2 text-[12px] md:text-[14px] font-bold font-grandstander text-gray-800 text-right">{order.amount}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest
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
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
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
