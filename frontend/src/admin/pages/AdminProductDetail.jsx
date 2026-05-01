import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Package, Tag, DollarSign, Box, 
  Image as ImageIcon, Save, X, Plus, Trash2, 
  Eye, ToggleLeft as Toggle, LayoutGrid, List, Edit2
} from 'lucide-react'

export function AdminProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [isEditing, setIsEditing] = useState(isNew)

  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    stock: '',
    category: 'Wooden Toys',
    status: 'Active',
    description: '',
    images: []
  })

  useEffect(() => {
    if (!isNew) {
      setLoading(true)
      setTimeout(() => {
        setProduct({
          id: id || 'PRD-101',
          title: 'Playbox The Builder Wooden Toys',
          price: '45.00',
          stock: '120',
          category: 'Wooden Toys',
          status: 'Active',
          description: 'A beautiful wooden building set designed to stimulate creativity and fine motor skills in young explorers. Made from sustainably sourced timber.',
          images: [
            'https://placehold.co/600x600/FDF4E6/6651A4?text=Toy+Front',
            'https://placehold.co/600x600/FDF4E6/F1641E?text=Toy+Side'
          ]
        })
        setLoading(false)
      }, 800)
    }
  }, [id, isNew])

  const handleSave = () => {
    setIsEditing(false)
    if (isNew) navigate('/admin/products')
  }

  if (loading) {
    return (
      <div className="shell flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#6651A4] rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Retrieving Toy Blueprint...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shell space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.05] pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-[#6651A4] hover:bg-[#FAEAD3] shadow-sm transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-grandstander font-bold text-gray-800 flex items-center gap-3">
              {isNew ? 'New Toy Addition' : 'Toy Configuration'}
              {!isNew && (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {product.status}
                </span>
              )}
            </h1>
            <p className="text-gray-500 font-medium text-sm font-mono mt-1">{isNew ? 'Catalog Draft' : product.id}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              {!isNew && (
                <button onClick={() => setIsEditing(false)} className="h-10 px-4 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-gray-50 flex items-center gap-2">
                  <X size={14} /> Discard
                </button>
              )}
              <button onClick={handleSave} className="h-10 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#5a4892] flex items-center gap-2 transition-all">
                <Save size={14} /> {isNew ? 'Launch Toy' : 'Commit Changes'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="h-10 px-6 bg-white border border-[#6651A4]/20 text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#FAEAD3] flex items-center gap-2">
                <Edit2 size={14} /> Edit Blueprint
              </button>
              <button className="h-10 px-4 bg-red-50 text-[#E8312A] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#E8312A] hover:text-white transition-all flex items-center gap-2">
                <Trash2 size={14} /> Remove
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Image Upload */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] p-6 shadow-sm border border-black/[0.03]">
            <h3 className="text-lg font-grandstander font-bold text-gray-800 mb-6 flex items-center gap-2"><ImageIcon size={18}/> Toy Imagery</h3>
            
            <div className="space-y-4">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-[#FDF4E6] rounded-2xl overflow-hidden border border-black/[0.02] group">
                  <img src={img} className="w-full h-full object-cover mix-blend-multiply" alt="Toy Preview" />
                  {isEditing && (
                    <button className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14}/>
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button className="w-full aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-[#FDF4E6]/50 hover:border-[#6651A4]/30 transition-all gap-2">
                  <Plus size={32} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Add Snapshot</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Center/Right - Form */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/[0.03] space-y-8">
            <h3 className="text-xl font-grandstander font-bold text-gray-800">Toy Specifications</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Toy Name</label>
                <input 
                  disabled={!isEditing}
                  type="text" 
                  value={product.title} 
                  onChange={(e) => setProduct({...product, title: e.target.value})}
                  placeholder="e.g. Playbox The Builder"
                  className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Category</label>
                  <select 
                    disabled={!isEditing}
                    value={product.category}
                    onChange={(e) => setProduct({...product, category: e.target.value})}
                    className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all appearance-none disabled:opacity-60"
                  >
                    <option>Wooden Toys</option>
                    <option>Cars</option>
                    <option>Educational</option>
                    <option>Musical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Inventory Status</label>
                  <select 
                    disabled={!isEditing}
                    value={product.status}
                    onChange={(e) => setProduct({...product, status: e.target.value})}
                    className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all appearance-none disabled:opacity-60"
                  >
                    <option>Active</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Price ($)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      disabled={!isEditing}
                      type="number" 
                      value={product.price} 
                      onChange={(e) => setProduct({...product, price: e.target.value})}
                      className="w-full h-14 pl-12 pr-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-grandstander font-bold text-xl text-gray-700 transition-all disabled:opacity-60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Units in Storage</label>
                  <div className="relative">
                    <Box size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      disabled={!isEditing}
                      type="number" 
                      value={product.stock} 
                      onChange={(e) => setProduct({...product, stock: e.target.value})}
                      className="w-full h-14 pl-12 pr-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Description</label>
                <textarea 
                  disabled={!isEditing}
                  value={product.description} 
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  rows={4}
                  className="w-full p-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-medium text-gray-700 transition-all resize-none disabled:opacity-60"
                  placeholder="Describe the joy this toy brings..."
                />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#FAEAD3] rounded-[32px] p-8 shadow-sm border border-[#F1641E]/10">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-lg font-grandstander font-bold text-gray-800">Public Visibility</h3>
                   <p className="text-[11px] text-gray-500 font-medium mt-1">Control if this toy is visible to explorers in the shop.</p>
                </div>
                <button disabled={!isEditing} className={`w-14 h-8 rounded-full transition-all flex items-center p-1 ${product.status === 'Active' ? 'bg-[#6651A4] justify-end' : 'bg-gray-300 justify-start'}`}>
                   <div className="w-6 h-6 bg-white rounded-full shadow-md" />
                </button>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
