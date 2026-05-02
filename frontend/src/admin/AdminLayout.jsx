import { useState, useEffect, Suspense } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, Users, Package, ShoppingCart, 
  Settings, LogOut, Menu, X, Bell, Search, 
  ChevronRight, CircleUser, Wallet, PackageOpen
} from 'lucide-react'

// --- Skeleton Component for Seamless Loading ---
function AdminContentSkeleton() {
  return (
    <div className="shell space-y-8 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-gray-200 rounded-2xl" />
          <div className="h-4 w-48 bg-gray-100 rounded-xl" />
        </div>
        <div className="h-12 w-40 bg-gray-200 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-white rounded-[24px] border border-black/[0.03]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 bg-white rounded-[32px] border border-black/[0.03]" />
        <div className="lg:col-span-1 h-96 bg-white rounded-[32px] border border-black/[0.03]" />
      </div>
    </div>
  )
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/users', label: 'Users Hub', icon: <Users size={20} /> },
    { path: '/admin/products', label: 'Toy Catalog', icon: <Package size={20} /> },
    { path: '/admin/orders', label: 'Order Command', icon: <ShoppingCart size={20} /> },
    { path: '/admin/finance', label: 'Financial Hub', icon: <Wallet size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  return (
    <div className="min-h-screen bg-[#FDF4E6] text-[#222222] font-roboto flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#222222]/50 z-[100] lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : (mobileMenuOpen ? 280 : 0),
          x: mobileMenuOpen ? 0 : (sidebarOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0))
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className={`fixed lg:relative z-[101] h-screen bg-white border-r border-black/[0.05] flex flex-col shrink-0 shadow-xl lg:shadow-none overflow-hidden`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-black/[0.05] shrink-0">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
               <img src="/favicon.webp" alt="Toyovo Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-grandstander font-bold text-[26px] text-[#6651A4] tracking-tight -ml-1">Toyovo<span className="text-[#F1641E]">Admin</span></span>
          </div>
          <button className="lg:hidden p-2 text-gray-400 hover:text-[#E8312A] transition-colors" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-2 overflow-x-hidden">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4 whitespace-nowrap">Core Modules</p>
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-[16px] transition-all group relative overflow-hidden ${
                  isActive ? 'bg-[#6651A4] text-white shadow-md' : 'text-gray-500 hover:bg-[#FAEAD3]/50 hover:text-[#222222]'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-0 bottom-0 w-1 bg-[#F1641E]" />
                )}
                <span className={`shrink-0 ${isActive ? 'text-[#F1641E]' : 'text-gray-400 group-hover:text-[#6651A4]'}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-[13px] tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </div>

        <div className="p-4 border-t border-black/[0.05] shrink-0">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[16px] text-gray-500 hover:bg-red-50 hover:text-[#E8312A] transition-all group overflow-hidden">
            <LogOut size={20} className="text-gray-400 group-hover:text-[#E8312A] shrink-0" />
            <span className="font-bold text-[13px] tracking-wide whitespace-nowrap">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-black/[0.05] flex items-center justify-between px-4 md:px-8 shrink-0 z-50 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-[#FAEAD3]/50 rounded-xl text-gray-600 hover:bg-[#FAEAD3] transition-colors"
            >
              <Menu size={20} />
            </button>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2.5 bg-[#FAEAD3]/50 rounded-xl text-gray-600 hover:bg-[#FAEAD3] transition-colors"
            >
              <Menu size={20} />
            </button>
            
            {/* Global Search */}
            <div className="hidden md:flex items-center bg-[#FDF4E6] rounded-full px-4 py-2.5 w-64 lg:w-96 border border-transparent focus-within:border-[#6651A4]/30 focus-within:bg-white transition-all shadow-sm">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, users, toys..." 
                className="bg-transparent border-none outline-none ml-3 w-full text-[13px] font-medium text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2.5 text-gray-400 hover:text-[#6651A4] transition-colors bg-[#FAEAD3]/30 hover:bg-[#FAEAD3] rounded-full"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#E8312A] rounded-full animate-pulse" />
            </button>
            <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />
            <div 
              onClick={() => navigate('/admin/settings')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right hidden md:block">
                <p className="text-[13px] font-bold text-gray-800 leading-tight">Admin User</p>
                <p className="text-[10px] font-bold text-[#F1641E] uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-[#FAEAD3] rounded-full flex items-center justify-center text-[#6651A4] border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                <CircleUser size={24} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport with Internal Suspense */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative">
          <Suspense fallback={<AdminContentSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
