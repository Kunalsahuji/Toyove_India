import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Box, 
  Image as ImageIcon, Save, X, Plus, Trash2, 
  Edit2
} from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { createAdminProduct, deleteAdminProduct, getAdminCategories, getAdminProduct, updateAdminProduct, uploadAdminMedia } from '../../services/adminCatalogApi'
import { ConfirmationModal } from '../components/ConfirmationModal'

const emptyProduct = {
  _id: '',
  name: '',
  brand: '',
  price: '',
  oldPrice: '',
  stock: '',
  category: '',
  status: 'draft',
  description: '',
  ageGroup: '',
  gender: 'Unisex',
  material: '',
  color: [],
  size: [],
  isFeatured: false,
  isTrending: false,
  isNewArrival: false,
  isBestSeller: false,
  images: [],
}

const imageUrlToObject = (url, index, productName) => ({
  url,
  alt: productName || `Toy image ${index + 1}`,
  sortOrder: index,
})

export function AdminProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { success, error: showError } = useToast()
  const isNew = id === 'new'
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(isNew)
  const [categories, setCategories] = useState([])
  const [loadError, setLoadError] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [product, setProduct] = useState(emptyProduct)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      setLoadError('')
      try {
        const categoryData = await getAdminCategories()
        const activeCategories = categoryData.filter(category => category.isActive && !category.parentCategory)
        if (!isMounted) return
        setCategories(activeCategories)

        if (isNew) {
          setProduct({ ...emptyProduct, category: activeCategories[0]?.id || '' })
          setLoading(false)
          return
        }

        const data = await getAdminProduct(id)
        if (!isMounted) return
        setProduct({
          ...data,
          category: data.categoryId || data.category?._id || data.category || '',
          price: String(data.price ?? ''),
          oldPrice: data.oldPrice ? String(data.oldPrice) : '',
          stock: String(data.stock ?? ''),
          images: data.images || [],
          brand: data.brand || '',
          ageGroup: data.ageGroup || '',
          gender: data.gender || 'Unisex',
          material: data.material || '',
          color: data.color || [],
          size: data.size || [],
          isFeatured: !!data.isFeatured,
          isTrending: !!data.isTrending,
          isNewArrival: !!data.isNewArrival,
          isBestSeller: !!data.isBestSeller,
        })
      } catch (err) {
        if (isMounted) setLoadError(err.message || 'Product could not be loaded')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [id, isNew])

  const handleSave = async () => {
    if (!product.name.trim()) {
      showError('Toy name is required.')
      return
    }
    if (!product.category) {
      showError('Category is required.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        name: product.name.trim(),
        description: product.description || '',
        category: product.category,
        brand: product.brand || '',
        price: Number(product.price || 0),
        ...(product.oldPrice !== '' && { oldPrice: Number(product.oldPrice) }),
        stock: Number(product.stock || 0),
        status: product.status,
        ageGroup: product.ageGroup || '',
        gender: product.gender || 'Unisex',
        material: product.material || '',
        color: product.color || [],
        size: product.size || [],
        isFeatured: product.isFeatured,
        isTrending: product.isTrending,
        isNewArrival: product.isNewArrival,
        isBestSeller: product.isBestSeller,
        images: product.images.map((image, index) => ({
          url: image.url || image,
          alt: image.alt || product.name,
          sortOrder: index,
        })),
        thumbnail: product.images[0]?.url ? { url: product.images[0].url, alt: product.name } : undefined,
      }

      const saved = isNew
        ? await createAdminProduct(payload)
        : await updateAdminProduct(id, payload)

      success(isNew ? 'Toy created successfully.' : 'Toy updated successfully.')
      setIsEditing(false)
      if (isNew) navigate(`/admin/products/${saved._id}`)
    } catch (err) {
      showError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = () => {
    if (isNew) return
    setShowConfirmDelete(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteAdminProduct(id)
      success(`${product.name} archived.`)
      navigate('/admin/products')
    } catch (err) {
      showError(err.message || 'Archive failed')
    }
  }

  const addImageUrl = () => {
    const url = imageUrl.trim()
    if (!url) return
    try {
      new URL(url)
    } catch {
      showError('Enter a valid image URL.')
      return
    }
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, imageUrlToObject(url, prev.images.length, prev.name)],
    }))
    setImageUrl('')
  }

  const removeImage = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const addTag = (field, value, setValue) => {
    const tag = value.trim()
    if (!tag) return
    if (!product[field].includes(tag)) {
      setProduct(prev => ({ ...prev, [field]: [...prev[field], tag] }))
    }
    setValue('')
  }

  const removeTag = (field, tag) => {
    setProduct(prev => ({ ...prev, [field]: prev[field].filter(t => t !== tag) }))
  }

  const handleImageFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const uploaded = await uploadAdminMedia(file, 'products')
      setProduct((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            url: uploaded.url,
            publicId: uploaded.publicId,
            alt: prev.name || uploaded.originalFilename || 'Toy image',
            sortOrder: prev.images.length,
          },
        ],
      }))
      success('Image uploaded successfully.')
    } catch (err) {
      showError(err.message || 'Image upload failed')
    } finally {
      setUploadingImage(false)
      if (event.target) event.target.value = ''
    }
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

  if (loadError) {
    return (
      <div className="shell flex items-center justify-center h-[60vh]">
        <div className="bg-white rounded-[32px] p-10 text-center border border-black/[0.03] shadow-sm">
          <p className="text-[#E8312A] font-bold text-sm">{loadError}</p>
          <button onClick={() => navigate('/admin/products')} className="mt-5 h-10 px-6 bg-[#6651A4] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">
            Back to Products
          </button>
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
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {product.status}
                </span>
              )}
            </h1>
            <p className="text-gray-500 font-medium text-sm font-mono mt-1">{isNew ? 'Catalog Draft' : product._id}</p>
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
              <button disabled={saving} onClick={handleSave} className="h-10 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#5a4892] flex items-center gap-2 transition-all disabled:opacity-60">
                <Save size={14} /> {saving ? 'Saving...' : isNew ? 'Launch Toy' : 'Commit Changes'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="h-10 px-6 bg-white border border-[#6651A4]/20 text-[#6651A4] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#FAEAD3] flex items-center gap-2">
                <Edit2 size={14} /> Edit Blueprint
              </button>
              <button onClick={handleDelete} className="h-10 px-4 bg-red-50 text-[#E8312A] rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hover:bg-[#E8312A] hover:text-white transition-all flex items-center gap-2">
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
                  <img src={img.url || img} className="w-full h-full object-cover mix-blend-multiply" alt="Toy Preview" />
                  {isEditing && (
                    <button onClick={() => removeImage(i)} className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14}/>
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-full h-12 bg-[#6651A4] text-white rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest disabled:opacity-60"
                  >
                    <Plus size={18} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload via Cloudinary'}</span>
                  </button>
                  <input
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    placeholder="Or paste an image URL"
                    className="w-full h-12 px-4 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 text-[12px] font-medium"
                  />
                  <button onClick={addImageUrl} className="w-full h-12 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-[#FDF4E6]/50 hover:border-[#6651A4]/30 transition-all gap-2">
                    <Plus size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Add Snapshot</span>
                  </button>
                </div>
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
                  value={product.name} 
                  onChange={(e) => setProduct({...product, name: e.target.value})}
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
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
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
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">₹</span>
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

              <div className="pt-4 border-t border-gray-50 space-y-8">
                <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#6651A4]/60">Advanced Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Brand</label>
                    <input 
                      disabled={!isEditing}
                      type="text" value={product.brand} onChange={(e) => setProduct({...product, brand: e.target.value})}
                      placeholder="e.g. Babyhug"
                      className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Age Group</label>
                    <input 
                      disabled={!isEditing}
                      type="text" value={product.ageGroup} onChange={(e) => setProduct({...product, ageGroup: e.target.value})}
                      placeholder="e.g. 3 Years+"
                      className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Gender Focus</label>
                    <select 
                      disabled={!isEditing}
                      value={product.gender}
                      onChange={(e) => setProduct({...product, gender: e.target.value})}
                      className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all appearance-none disabled:opacity-60"
                    >
                      <option value="Boy">Boy</option>
                      <option value="Girl">Girl</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Material</label>
                    <input 
                      disabled={!isEditing}
                      type="text" value={product.material} onChange={(e) => setProduct({...product, material: e.target.value})}
                      placeholder="e.g. Wood, Plastic"
                      className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Available Colors</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.color.map(c => (
                        <span key={c} className="px-3 py-1.5 bg-[#6651A4]/10 text-[#6651A4] rounded-lg text-[11px] font-bold flex items-center gap-2">
                          {c} {isEditing && <X size={12} className="cursor-pointer" onClick={() => removeTag('color', c)}/>}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <input 
                          value={newColor} onChange={(e) => setNewColor(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('color', newColor, setNewColor))}
                          placeholder="Add color..."
                          className="flex-1 h-12 px-4 bg-[#FDF4E6]/50 rounded-xl outline-none text-xs font-bold"
                        />
                        <button onClick={() => addTag('color', newColor, setNewColor)} className="w-12 h-12 bg-[#6651A4] text-white rounded-xl flex items-center justify-center"><Plus size={18}/></button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Available Sizes</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.size.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-[#F1641E]/10 text-[#F1641E] rounded-lg text-[11px] font-bold flex items-center gap-2">
                          {s} {isEditing && <X size={12} className="cursor-pointer" onClick={() => removeTag('size', s)}/>}
                        </span>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <input 
                          value={newSize} onChange={(e) => setNewSize(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('size', newSize, setNewSize))}
                          placeholder="Add size..."
                          className="flex-1 h-12 px-4 bg-[#FDF4E6]/50 rounded-xl outline-none text-xs font-bold"
                        />
                        <button onClick={() => addTag('size', newSize, setNewSize)} className="w-12 h-12 bg-[#F1641E] text-white rounded-xl flex items-center justify-center"><Plus size={18}/></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#FAEAD3] rounded-[32px] p-8 shadow-sm border border-[#F1641E]/10 space-y-8">
            <div>
              <h3 className="text-xl font-grandstander font-bold text-gray-800">Visibility & Status</h3>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Control how this toy appears on the storefront.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-bold text-gray-700">Public Live</p>
                  <p className="text-[10px] text-gray-500">Visible to all users</p>
                </div>
                <button
                  disabled={!isEditing}
                  onClick={() => setProduct(prev => ({ ...prev, status: prev.status === 'active' ? 'draft' : 'active' }))}
                  className={`w-12 h-7 rounded-full transition-all flex items-center p-1 ${product.status === 'active' ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </button>
              </div>

              {[
                { id: 'isFeatured', label: 'Featured Toy', sub: 'Shows in home sliders' },
                { id: 'isTrending', label: 'Trending Now', sub: 'Popularity badge' },
                { id: 'isNewArrival', label: 'New Arrival', sub: 'Just launched tag' },
                { id: 'isBestSeller', label: 'Best Seller', sub: 'Highest sales badge' }
              ].map(badge => (
                <div key={badge.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-bold text-gray-700">{badge.label}</p>
                    <p className="text-[10px] text-gray-500">{badge.sub}</p>
                  </div>
                  <button
                    disabled={!isEditing}
                    onClick={() => setProduct(prev => ({ ...prev, [badge.id]: !prev[badge.id] }))}
                    className={`w-12 h-7 rounded-full transition-all flex items-center p-1 ${product[badge.id] ? 'bg-[#6651A4] justify-end' : 'bg-gray-300 justify-start'}`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={confirmDelete}
        title="Archive Toy?"
        message={`Are you sure you want to archive "${product.name}"? This will hide it from the storefront.`}
        confirmText="Archive"
      />
    </div>
  )
}
