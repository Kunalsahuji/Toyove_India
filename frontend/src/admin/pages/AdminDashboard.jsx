import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Users, DollarSign, Package, ShoppingCart, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { getAdminUsers } from '../../services/adminUserApi'
import { getAdminProducts } from '../../services/adminCatalogApi'
import { getAdminOrders } from '../../services/orderApi'

const buildRevenueSeries = (orders, timeframe) => {
  const dayCount = timeframe === 'month' ? 30 : 7
  const map = new Map()
  const today = new Date()

  for (let index = dayCount - 1; index >= 0; index -= 1) {
    const date = new Date(today)
    date.setHours(0, 0, 0, 0)
    date.setDate(today.getDate() - index)
    map.set(date.toISOString().slice(0, 10), 0)
  }

  orders.forEach((order) => {
    const createdAt = new Date(order.createdAt || Date.now())
    createdAt.setHours(0, 0, 0, 0)
    const key = createdAt.toISOString().slice(0, 10)
    if (map.has(key)) {
      map.set(key, map.get(key) + Number(order.total || 0))
    }
  })

  const max = Math.max(...map.values(), 1)
  return Array.from(map.entries()).map(([key, amount]) => ({
    key,
    amount,
    height: Math.max((amount / max) * 100, amount > 0 ? 8 : 0),
    label: new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short' }).format(new Date(key)),
  }))
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [timeframe, setTimeframe] = useState('week')
  const navigate = useNavigate()
  const { error: showError } = useToast()

  useEffect(() => {
    let isMounted = true

    const loadDashboard = async () => {
      setLoading(true)
      try {
        const [{ users, meta: userMeta }, { products, meta: productMeta }, { orders, meta: orderMeta }] = await Promise.all([
          getAdminUsers({ limit: 200 }),
          getAdminProducts({ limit: 200 }),
          getAdminOrders({ limit: 200 }),
        ])

        if (!isMounted) return

        const paidOrders = orders.filter((order) => order.paymentStatus === 'paid')
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0)

        setAllUsers(users)
        setAllProducts(products)
        setAllOrders(orders)
        setStats([
          { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, trend: `${paidOrders.length} paid`, isUp: true, icon: <DollarSign size={24} />, color: 'bg-green-500', route: '/admin/finance' },
          { title: 'Active Explorers', value: (userMeta?.total || 0).toLocaleString('en-IN'), trend: 'live users', isUp: true, icon: <Users size={24} />, color: 'bg-[#6651A4]', route: '/admin/users' },
          { title: 'Total Orders', value: (orderMeta?.total || 0).toLocaleString('en-IN'), trend: `${orders.filter((order) => order.status === 'processing').length} processing`, isUp: true, icon: <ShoppingCart size={24} />, color: 'bg-[#F1641E]', route: '/admin/orders' },
          { title: 'Products in Catalog', value: (productMeta?.total || 0).toLocaleString('en-IN'), trend: 'live catalog', isUp: true, icon: <Package size={24} />, color: 'bg-[#E8312A]', route: '/admin/products' },
        ])
        setRecentOrders(
          orders.slice(0, 4).map((order) => ({
            id: `#${order.orderNumber}`,
            user: order.customerName || 'Customer',
            amount: `₹${order.total.toFixed(2)}`,
            status: order.statusLabel,
            orderId: order.id,
          }))
        )
      } catch (err) {
        if (isMounted) {
          setStats([])
          setRecentOrders([])
          setAllUsers([])
          setAllProducts([])
          setAllOrders([])
          showError(err.message || 'Dashboard data could not be loaded')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboard()
    return () => {
      isMounted = false
    }
  }, [showError])

  const paidOrders = useMemo(() => allOrders.filter((order) => order.paymentStatus === 'paid'), [allOrders])
  const revenueSeries = useMemo(() => buildRevenueSeries(paidOrders, timeframe), [paidOrders, timeframe])

  const categoryBreakdown = useMemo(() => {
    const categoryCountMap = new Map()
    allProducts.forEach((product) => {
      const name = product.category?.name || product.categoryName || 'Uncategorized'
      categoryCountMap.set(name, (categoryCountMap.get(name) || 0) + 1)
    })
    const totalProducts = Math.max(allProducts.length, 1)
    return Array.from(categoryCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([label, count], index) => ({
        label,
        count,
        value: `${Math.round((count / totalProducts) * 100)}%`,
        color: ['bg-[#6651A4]', 'bg-[#F1641E]', 'bg-[#E8312A]'][index] || 'bg-gray-400',
      }))
  }, [allProducts])

  const wishlistTrends = useMemo(() => {
    const wishlistCountMap = new Map()
    allUsers.forEach((user) => {
      ;(user.preferences?.wishlist || []).forEach((item) => {
        const name = item.title || item.name || item.slug || 'Wishlist Item'
        wishlistCountMap.set(name, (wishlistCountMap.get(name) || 0) + 1)
      })
    })
    return Array.from(wishlistCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }))
  }, [allUsers])

  const systemHealth = useMemo(() => {
    const totalProducts = Math.max(allProducts.length, 1)
    const lowStockProducts = allProducts.filter((product) => Number(product.stock || 0) <= Number(product.lowStockThreshold || 5))
    const activeProducts = allProducts.filter((product) => product.status === 'active')
    const completedPayments = allOrders.filter((order) => ['paid', 'refunded', 'failed'].includes(order.paymentStatus))
    const successfulPayments = allOrders.filter((order) => ['paid', 'refunded'].includes(order.paymentStatus))
    return {
      paymentSuccessRate: completedPayments.length ? Math.round((successfulPayments.length / completedPayments.length) * 100) : 100,
      lowStockRate: Math.round((lowStockProducts.length / totalProducts) * 100),
      activeCatalogRate: Math.round((activeProducts.length / totalProducts) * 100),
    }
  }, [allOrders, allProducts])

  return (
    <div className="shell space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Command Center</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Here&apos;s what&apos;s happening in Toyovo today.</p>
        </div>
        <button onClick={() => navigate('/admin/reports')} className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] hover:-translate-y-0.5 transition-all w-max flex items-center gap-2">
          <Activity size={16} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} onClick={() => navigate(stat.route)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-xl transition-all border border-black/[0.03] group relative overflow-hidden cursor-pointer">
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
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${stat.color}`}>{stat.icon}</div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-grandstander font-bold text-gray-800">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <span className={`flex items-center text-[11px] font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium ml-1">vs last period</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-grandstander font-bold text-gray-800">Revenue Flow</h2>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Dynamic revenue analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setTimeframe('week')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${timeframe === 'week' ? 'bg-[#6651A4] text-white' : 'bg-gray-100 text-gray-500'}`}>Week</button>
              <button onClick={() => setTimeframe('month')} className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${timeframe === 'month' ? 'bg-[#6651A4] text-white' : 'bg-gray-100 text-gray-500'}`}>Month</button>
            </div>
          </div>
          <div className="h-64 relative flex items-end justify-between gap-2 px-2">
            {revenueSeries.map((entry) => (
              <div key={entry.key} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${entry.height}%` }} transition={{ duration: 1, delay: 0.2, ease: 'circOut' }} className="w-full max-w-[36px] bg-[#6651A4] rounded-t-2xl group-hover:bg-[#F1641E] transition-colors relative shadow-sm">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap shadow-xl z-20">
                      ₹{entry.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{entry.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]">
            <h2 className="text-lg md:text-xl font-grandstander font-bold text-gray-800 mb-6 md:mb-8">Toy Categories</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center shrink-0 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                  <motion.circle cx="50%" cy="50%" r="40%" fill="transparent" stroke="#6651A4" strokeWidth="12" strokeDasharray="251" initial={{ strokeDashoffset: 251 }} animate={{ strokeDashoffset: 251 * 0.4 }} transition={{ duration: 1.5, ease: 'easeInOut' }} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <p className="text-xl md:text-3xl font-grandstander font-bold text-gray-800">{allProducts.length}</p>
                  <p className="text-[7px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Toys</p>
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                {categoryBreakdown.map((item) => (
                  <div key={item.label} className="space-y-1.5">
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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm border border-black/[0.03]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-grandstander font-bold text-gray-800">Wishlist Trends</h3>
              <span className="px-2 py-0.5 bg-purple-50 text-[#6651A4] rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">Top Favorites</span>
            </div>
            <div className="space-y-3">
              {wishlistTrends.length === 0 ? (
                <div className="p-4 bg-[#FDF4E6]/30 rounded-xl text-[11px] font-bold text-gray-400 uppercase tracking-widest">No wishlist data yet</div>
              ) : wishlistTrends.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 md:p-4 bg-[#FDF4E6]/30 rounded-xl md:rounded-2xl border border-black/[0.01]">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] md:text-[13px] font-bold text-gray-800 truncate">{item.name}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-medium truncate">{item.count} saved</p>
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold text-green-500 shrink-0 ml-2">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2 bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 shadow-sm border border-black/[0.03] overflow-hidden">
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
                ) : recentOrders.length === 0 ? (
                  <tr><td colSpan="4" className="py-10 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">No live orders found</td></tr>
                ) : recentOrders.map((order, i) => (
                  <tr key={i} onClick={() => navigate(`/admin/orders/${order.orderId}`)} className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors cursor-pointer group">
                    <td className="py-4 px-2 font-mono text-[11px] md:text-[13px] font-bold text-[#6651A4]">{order.id}</td>
                    <td className="py-4 px-2 text-[11px] md:text-[13px] font-bold text-gray-700">{order.user}</td>
                    <td className="py-4 px-2 text-[12px] md:text-[14px] font-bold font-grandstander text-gray-800 text-right">{order.amount}</td>
                    <td className="py-4 px-2 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#6651A4] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#F1641E]/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-2xl font-grandstander font-bold mb-2">System Health</h2>
            <p className="text-white/60 text-sm mb-8">Live platform metrics based on payments and catalog status.</p>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                  <span>Payment Success</span>
                  <span className="text-green-300">{systemHealth.paymentSuccessRate}%</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div style={{ width: `${systemHealth.paymentSuccessRate}%` }} className="h-full bg-green-400 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                  <span>Active Catalog</span>
                  <span className="text-blue-200">{systemHealth.activeCatalogRate}%</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div style={{ width: `${systemHealth.activeCatalogRate}%` }} className="h-full bg-blue-300 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-2">
                  <span>Low Stock Exposure</span>
                  <span className="text-yellow-300">{systemHealth.lowStockRate}%</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div style={{ width: `${systemHealth.lowStockRate}%` }} className="h-full bg-yellow-400 rounded-full" />
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
