import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MoreVertical, Shield, UserX, Mail, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

export function AdminUsers() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('recent')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const initialUsers = [
    { id: 'USR-001', name: 'Emma Watson', email: 'emma@example.com', orders: 12, spent: '$1,245.00', status: 'Active', date: '2026-04-10' },
    { id: 'USR-002', name: 'Liam Smith', email: 'liam@example.com', orders: 3, spent: '$145.50', status: 'Active', date: '2026-04-12' },
    { id: 'USR-003', name: 'Olivia Brown', email: 'olivia@example.com', orders: 0, spent: '$0.00', status: 'Inactive', date: '2026-04-15' },
    { id: 'USR-004', name: 'Noah Jones', email: 'noah@example.com', orders: 5, spent: '$430.00', status: 'Banned', date: '2026-04-18' },
    { id: 'USR-005', name: 'Ava Garcia', email: 'ava@example.com', orders: 8, spent: '$890.00', status: 'Active', date: '2026-04-20' },
    { id: 'USR-006', name: 'William Miller', email: 'william@example.com', orders: 1, spent: '$45.00', status: 'Active', date: '2026-04-21' },
    { id: 'USR-007', name: 'Sophia Davis', email: 'sophia@example.com', orders: 2, spent: '$110.00', status: 'Inactive', date: '2026-04-25' },
  ]

  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      // Simulate API filtering/sorting
      let filtered = initialUsers.filter(u => 
        (statusFilter === 'All' || u.status === statusFilter) &&
        (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
      )
      
      if (sortBy === 'recent') filtered.sort((a,b) => new Date(b.date) - new Date(a.date))
      if (sortBy === 'spentDesc') filtered.sort((a,b) => parseFloat(b.spent.replace('$','').replace(',','')) - parseFloat(a.spent.replace('$','').replace(',','')))
      if (sortBy === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name))

      setUsers(filtered)
      setCurrentPage(1) // Reset to first page on filter change
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [search, statusFilter, sortBy])

  const [menuOpenUserId, setMenuOpenUserId] = useState(null)

  // Close menu on click outside
  useEffect(() => {
    const handleClick = () => setMenuOpenUserId(null)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Explorer Directory</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Manage user identities and access levels.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/users/new')}
          className="h-11 px-6 bg-[#E8312A] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg hover:bg-red-700 transition-all w-full md:w-max"
        >
          + Add Explorer
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03] space-y-4">
        <div className="relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search by name or email..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 font-medium text-[13px] transition-all"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-1">
          <div className="relative shrink-0 min-w-[120px]">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select 
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-11 pl-9 pr-6 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[10px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          <div className="relative shrink-0 min-w-[140px]">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select 
              value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 pl-9 pr-6 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[10px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="recent">Recently Joined</option>
              <option value="spentDesc">Highest Spenders</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <motion.div layout className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAEAD3]/30 border-b border-black/[0.03]">
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explorer</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Orders</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Total Spent</th>
                <th className="py-5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-6"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"/><div className="space-y-2"><div className="h-4 w-32 bg-gray-100 rounded animate-pulse"/><div className="h-3 w-24 bg-gray-100 rounded animate-pulse"/></div></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-20 bg-gray-100 rounded-full mx-auto animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-4 w-8 bg-gray-100 rounded mx-auto animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-4 w-16 bg-gray-100 rounded ml-auto animate-pulse"/></td>
                    <td className="py-4 px-6"><div className="h-8 w-8 bg-gray-100 rounded-lg ml-auto animate-pulse"/></td>
                  </tr>
                ))
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <UserX size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Explorers Found</p>
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    key={user.id} 
                    className="border-b border-gray-50 last:border-0 hover:bg-[#FDF4E6]/50 transition-colors group relative"
                  >
                    <td className="py-4 px-6" onClick={() => navigate(`/admin/users/${user.id}`)}>
                      <div className="flex items-center gap-4 cursor-pointer">
                        <div className="w-10 h-10 bg-[#6651A4]/10 text-[#6651A4] rounded-full flex items-center justify-center font-grandstander font-bold text-lg group-hover:scale-110 transition-transform border border-[#6651A4]/20">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-gray-800">{user.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1"><Mail size={10}/> {user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest
                        ${user.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 
                          user.status === 'Inactive' ? 'bg-gray-50 text-gray-500 border border-gray-200' : 'bg-red-50 text-red-600 border border-red-100'}`}
                      >
                        {user.status === 'Active' && <Shield size={10}/>}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-[13px] font-bold text-gray-600">{user.orders}</td>
                    <td className="py-4 px-6 text-right">
                      <p className="text-[15px] font-bold font-grandstander text-gray-800">{user.spent}</p>
                    </td>
                    <td 
                      className="py-4 px-6 text-right relative"
                      onMouseEnter={() => setMenuOpenUserId(user.id)}
                      onMouseLeave={() => setMenuOpenUserId(null)}
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setMenuOpenUserId(menuOpenUserId === user.id ? null : user.id)
                        }}
                        className={`p-2 rounded-lg transition-all ml-auto block ${menuOpenUserId === user.id ? 'bg-[#6651A4] text-white shadow-md' : 'text-gray-400 hover:text-[#6651A4] hover:bg-[#FAEAD3]'}`}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Action Dropdown */}
                      <AnimatePresence>
                        {menuOpenUserId === user.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-6 top-[60%] z-[200] w-48 bg-white rounded-2xl shadow-xl border border-black/[0.05] py-2 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button 
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                              className="w-full px-5 py-3 text-left text-[12px] font-bold text-gray-600 hover:bg-[#FDF4E6]/50 hover:text-[#6651A4] flex items-center gap-3 transition-colors"
                            >
                              <Shield size={14} className="text-[#6651A4]" /> View Profile
                            </button>
                            <button 
                              onClick={() => navigate(`/admin/users/${user.id}`)}
                              className="w-full px-5 py-3 text-left text-[12px] font-bold text-gray-600 hover:bg-[#FDF4E6]/50 hover:text-[#6651A4] flex items-center gap-3 transition-colors"
                            >
                              <Mail size={14} /> Send Message
                            </button>
                            <div className="h-[1px] bg-gray-100 my-1" />
                            <button 
                              className="w-full px-5 py-3 text-left text-[12px] font-bold text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
                            >
                              <UserX size={14} /> Suspend User
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className="p-4 border-t border-black/[0.03] flex items-center justify-between bg-[#FAEAD3]/10">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {(currentPage-1)*itemsPerPage + 1} to {Math.min(currentPage*itemsPerPage, users.length)} of {users.length}
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
