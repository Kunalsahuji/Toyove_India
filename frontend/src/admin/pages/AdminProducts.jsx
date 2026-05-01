import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MoreVertical, PackageOpen, Plus, Tag, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react'

export function AdminProducts() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const initialProducts = [
    { id: 'PRD-101', title: 'Playbox The Builder Wooden Toys', price: '$45.00', stock: 120, category: 'Wooden Toys', status: 'Active', img: 'https://placehold.co/100x100/FDF4E6/6651A4?text=Toy+1' },
    { id: 'PRD-102', title: 'Shop & Glow Toy Cart Orange Car', price: '$89.00', stock: 15, category: 'Cars', status: 'Low Stock', img: 'https://placehold.co/100x100/FDF4E6/F1641E?text=Toy+2' },
    { id: 'PRD-103', title: 'Fun And Educational Toy For Babies', price: '$35.50', stock: 0, category: 'Educational', status: 'Out of Stock', img: 'https://placehold.co/100x100/FDF4E6/E8312A?text=Toy+3' },
    { id: 'PRD-104', title: 'Plan Toys Pull-Along Musical Bear', price: '$55.00', stock: 85, category: 'Musical', status: 'Active', img: 'https://placehold.co/100x100/FDF4E6/6651A4?text=Toy+4' },
    { id: 'PRD-105', title: 'Classic Rainbow Stacker', price: '$25.00', stock: 200, category: 'Educational', status: 'Active', img: 'https://placehold.co/100x100/FDF4E6/F1641E?text=Toy+5' },
  ]

  const [products, setProducts] = useState([])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      let filtered = initialProducts.filter(p => 
        (categoryFilter === 'All' || p.category === categoryFilter) &&
        p.title.toLowerCase().includes(search.toLowerCase())
      )
      setProducts(filtered)
      setCurrentPage(1)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [search, categoryFilter])

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Toy Catalog</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage inventory, prices, and visibility.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/products/new')}
          className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] hover:-translate-y-0.5 transition-all w-max flex items-center gap-2"
        >
          <Plus size={16} /> Add New Toy
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" placeholder="Search toys..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all"
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <div className="relative shrink-0">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-12 pl-9 pr-8 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 text-[12px] font-bold text-gray-600 uppercase tracking-widest appearance-none cursor-pointer transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Wooden Toys">Wooden Toys</option>
              <option value="Cars">Cars</option>
              <option value="Educational">Educational</option>
              <option value="Musical">Musical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-[32px] border border-black/[0.03] animate-pulse">
              <div className="w-full aspect-square bg-gray-100 rounded-[24px] mb-4" />
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
              <div className="h-6 w-1/3 bg-gray-100 rounded mb-4" />
              <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                <div className="h-4 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-20 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : currentProducts.length === 0 ? (
        <div className="bg-white rounded-[32px] py-32 text-center border border-black/[0.03]">
          <PackageOpen size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Toys Found in Inventory</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {currentProducts.map((product, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              key={product.id} 
              onClick={() => navigate(`/admin/products/${product.id}`)}
              className="bg-white p-4 rounded-[32px] border border-black/[0.03] shadow-sm hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative w-full aspect-square bg-[#FDF4E6] rounded-[24px] mb-4 overflow-hidden">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-600 shadow-sm flex items-center gap-1">
                  <Tag size={10} /> {product.category}
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-500 shadow-sm">
                  {product.id}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6651A4] hover:bg-[#6651A4] hover:text-white transition-all shadow-lg active:scale-95"><Edit2 size={18} /></button>
                  <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#E8312A] hover:bg-[#E8312A] hover:text-white transition-all shadow-lg active:scale-95"><Trash2 size={18} /></button>
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1 mb-1">{product.title}</h3>
                <p className="text-2xl font-grandstander font-bold text-[#F1641E] mb-4">{product.price}</p>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="text-[11px] font-bold text-gray-500">Stock: {product.stock}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest
                    ${product.status === 'Active' ? 'bg-green-50 text-green-600' : 
                      product.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#6651A4] hover:text-white hover:border-[#6651A4] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#6651A4] hover:text-white hover:border-[#6651A4] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-200 transition-all shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

    </div>
  )
}
