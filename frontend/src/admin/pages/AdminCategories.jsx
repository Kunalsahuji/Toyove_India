import { useEffect, useMemo, useState } from 'react'
import { Archive, Check, Eye, EyeOff, GripVertical, Plus, Search, Tags } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { deleteAdminCategory, getAdminCategories, toggleAdminCategoryNavbar } from '../../services/adminCatalogApi'

export function AdminCategories() {
  const { success, error: showError } = useToast()
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCategories = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAdminCategories()
      setCategories(data)
    } catch (err) {
      setError(err.message || 'Categories could not be loaded')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const tree = useMemo(() => {
    const byId = new Map(categories.map(category => [category.id, { ...category, children: [] }]))
    const roots = []
    byId.forEach(category => {
      const parentId = category.parentCategory?._id || category.parentCategory
      if (parentId && byId.has(parentId)) byId.get(parentId).children.push(category)
      else roots.push(category)
    })
    return roots
  }, [categories])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return tree
    return tree.filter(category => (
      category.name.toLowerCase().includes(term) ||
      category.children.some(child => child.name.toLowerCase().includes(term))
    ))
  }, [tree, search])

  const navbarCount = categories.filter(category => category.showInNavbar && !category.parentCategory && category.isActive).length

  const toggleNavbar = async (category) => {
    if (!category.showInNavbar && navbarCount >= 7) {
      showError('Navbar can show only 7 categories.')
      return
    }

    const nextValue = !category.showInNavbar
    setCategories(prev => prev.map(item => item.id === category.id ? { ...item, showInNavbar: nextValue } : item))
    try {
      await toggleAdminCategoryNavbar(category.id, nextValue)
      success(`${category.name} navbar visibility updated.`)
    } catch (err) {
      setCategories(prev => prev.map(item => item.id === category.id ? { ...item, showInNavbar: category.showInNavbar } : item))
      showError(err.message || 'Navbar update failed')
    }
  }

  const handleArchive = async (category) => {
    if (!window.confirm(`Archive ${category.name}?`)) return

    try {
      const archived = await deleteAdminCategory(category.id)
      setCategories(prev => prev.map(item => item.id === category.id ? archived : item))
      success(`${category.name} archived.`)
    } catch (err) {
      showError(err.message || 'Category archive failed')
    }
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Control storefront collections, mega menu, and all-categories navigation.</p>
        </div>
        <button className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg hover:bg-[#5a4892] transition-all w-full md:w-max flex items-center justify-center gap-2">
          <Plus size={16} /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['Total Categories', categories.filter(category => category.isActive).length],
          ['Navbar Slots Used', `${navbarCount}/7`],
          ['Subcategories', categories.filter(category => category.parentCategory && category.isActive).length],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-grandstander font-bold text-[#6651A4] mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories or subcategories..."
            className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-black/[0.03] overflow-hidden">
        <div className="divide-y divide-gray-50">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-6 animate-pulse">
                <div className="h-14 bg-gray-100 rounded-2xl" />
              </div>
            ))
          ) : error ? (
            <div className="p-10 text-center">
              <p className="text-[#E8312A] font-bold text-sm">{error}</p>
              <button onClick={loadCategories} className="mt-4 h-10 px-5 bg-[#6651A4] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">Retry</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest text-[11px]">No categories found</div>
          ) : filtered.map((category) => (
            <div key={category.id} className="p-4 md:p-6 hover:bg-[#FDF4E6]/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <button className="mt-1 text-gray-300 hover:text-[#6651A4]"><GripVertical size={18} /></button>
                  <div className="w-11 h-11 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center shrink-0"><Tags size={18} /></div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[14px] md:text-[16px] font-bold text-gray-800">{category.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${category.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{category.status}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono mt-1">/{category.slug}</p>
                    {category.children.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {category.children.map(child => (
                          <span key={child.id} className="px-3 py-1 bg-[#FDF4E6] border border-dashed border-black/5 rounded-full text-[10px] font-bold text-gray-500">{child.name}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-3">
                  <button
                    disabled={!category.isActive}
                    onClick={() => toggleNavbar(category)}
                    className={`h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-40 ${category.showInNavbar ? 'bg-[#6651A4] text-white' : 'bg-[#FDF4E6] text-gray-400 hover:text-[#6651A4]'}`}
                  >
                    {category.showInNavbar ? <Eye size={14} /> : <EyeOff size={14} />}
                    Navbar
                  </button>
                  <button
                    disabled={!category.isActive}
                    onClick={() => handleArchive(category)}
                    className="h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-red-50 text-[#E8312A] hover:bg-[#E8312A] hover:text-white transition-all disabled:opacity-40"
                  >
                    <Archive size={14} /> Archive
                  </button>
                  <span className="hidden md:flex w-10 h-10 rounded-xl bg-green-50 text-green-600 items-center justify-center"><Check size={16} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
