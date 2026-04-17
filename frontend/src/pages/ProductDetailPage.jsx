import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, Share2, Eye, ShoppingCart, Search, Repeat, Plus, Minus, CheckCircle, X, ChevronRight, Share } from 'lucide-react'

// Localized Font Import to avoid global CSS conflicts
const FontLoader = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    .font-grandstander { font-family: 'Grandstander', sans-serif; }
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}} />
)

const productImages = [
  "https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-06.jpg?v=1710995380&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-06-02.jpg?v=1710995381&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-05.jpg?v=1710995380&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-05-02.jpg?v=1710995381&width=533"
]

const ProductCard = ({ p, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: (i % 4) * 0.1 }}
    className="group flex flex-col cursor-pointer"
  >
    <div className="border-[1.6px] border-dashed border-[#333333] rounded-[16px] p-2 relative overflow-hidden aspect-square mb-4 bg-[#F9EAD3] transition-all duration-300 hover:shadow-lg">
      <span className="absolute top-3 left-3 z-30 bg-[#FF4E50] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
        SALE
      </span>
      {/* Dynamic Action Stack from Trending Products */}
      <div className="absolute top-3 -right-12 z-40 flex flex-col gap-2 group-hover:right-3 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
        <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><ShoppingCart size={15} /></button>
        <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Search size={15} /></button>
        <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Heart size={15} /></button>
        <button className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E84949] hover:text-white transition-colors border border-transparent hover:border-[#E84949]"><Repeat size={15} /></button>
      </div>
      {/* Hover Image Swap */}
      <img src={p.img} alt={p.name} className="w-full h-full object-cover rounded-[10px] transition-opacity duration-700 ease-in-out group-hover:opacity-0 absolute inset-0 p-2" />
      <img src={p.hoverImg || p.img} alt={p.name} className="w-full h-full object-cover rounded-[10px] absolute inset-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-110" />
    </div>
    <div className="text-center px-1">
      <h3 className="text-[14px] md:text-[15px] font-grandstander font-bold text-[#333333] mb-1 group-hover:text-[#E84949] transition-colors line-clamp-2 uppercase leading-tight">{p.name}</h3>
      <div className="flex items-center justify-center gap-2">
        <span className="text-[12px] text-gray-400 line-through">${(p.price + 20).toFixed(2)}</span>
        <span className="text-[14px] font-black text-[#FF4E50]">${p.price.toFixed(2)}</span>
      </div>
    </div>
  </motion.div>
)

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b-[1px] border-dashed border-gray-300 py-5">
    <button onClick={onToggle} className="w-full flex justify-between items-center text-left group">
      <span className="font-grandstander text-[16px] md:text-[18px] text-[#333333] group-hover:text-[#E84949] transition-colors uppercase leading-tight tracking-tight">{question}</span>
      <div className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all flex-shrink-0 ${isOpen ? 'bg-[#E84949] border-[#E84949] text-white' : 'text-gray-400'}`}>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p className="pt-4 text-[14px] leading-relaxed text-[#666666] font-roboto">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export function ProductDetailPage() {
  const { title } = useParams()
  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [openFAQ, setOpenFAQ] = useState(null)
  const [showSticky, setShowSticky] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedSize, setSelectedSize] = useState('Small')
  const [selectedColor, setSelectedColor] = useState('Red')

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setShowToast(true), 3000)
    const handleScroll = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [title])

  const product = {
    title: title?.replaceAll('-', ' ') || "KidsKraze Creations",
    price: 89.00,
    oldPrice: 129.00,
    img: productImages[0],
    sku: "Product-08",
    category: "Toys"
  }

  const related = [
    { id: 1, name: 'Planet Toy Explorer', price: 126, img: productImages[2], hoverImg: productImages[3] },
    { id: 2, name: 'WildHarvests Maker Toy', price: 150, img: productImages[4], hoverImg: productImages[5] },
    { id: 3, name: 'Rainbow Stacker Set', price: 85, img: productImages[6], hoverImg: productImages[7] },
    { id: 4, name: 'JoyfulJamboree Juniors', price: 89, img: productImages[1], hoverImg: productImages[0] }
  ]

  const recentlyViewed = [
    { id: 5, name: 'TinyTinker Toys', price: 60, img: productImages[0], hoverImg: productImages[1] },
    { id: 6, name: 'Baby Activity Mat', price: 130, img: productImages[4], hoverImg: productImages[3] }
  ]

  return (
    <div className="bg-[#FDF4E6] pb-20 overflow-x-hidden font-roboto">
      <FontLoader />
      
      {/* Sales Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-6 left-4 md:left-6 z-[100] bg-[#F9EAD3] rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-dashed border-[#333]/20 min-w-[280px] sm:min-w-[320px]"
          >
            <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"><X size={14} /></button>
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex-shrink-0 border-[1.2px] border-dashed border-[#333]/30">
               <img src={productImages[1]} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] text-[#666666]">Jacklin Purchased ! - From USA</p>
              <h4 className="text-[13px] font-black text-[#333333] my-0.5 font-grandstander uppercase tracking-tight">KidsKraze Creations</h4>
              <div className="flex items-center gap-1.5 text-[10px]">
                 <span className="text-gray-400">5 minute ago</span>
                 <span className="flex items-center gap-1 text-green-600 font-bold"><CheckCircle size={10} /> Verified</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Add-to-Cart Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full z-[90] bg-[#F9EAD3] border-t-[1.6px] border-dashed border-[#333333] py-3 shadow-lg"
          >
            <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-12 h-12 rounded-lg border-[1.2px] border-dashed border-[#333]/30 overflow-hidden bg-white">
                  <img src={product.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-[#333333] hidden lg:block uppercase font-grandstander tracking-tight">{product.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E84949] font-black text-[18px]">${product.price.toFixed(2)}</span>
                    <span className="text-[12px] text-gray-400 line-through font-bold">${product.oldPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center h-10 border border-[#333]/20 rounded-full px-2 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 text-[#666] hover:text-[#E84949]"><Minus size={14} /></button>
                  <span className="w-6 text-center font-bold text-[13px] text-[#333]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 text-[#666] hover:text-[#E84949]"><Plus size={14} /></button>
                </div>
                <button className="h-10 px-6 sm:px-10 bg-[#E84949] text-white text-[12px] font-black rounded-full hover:scale-105 transition-all uppercase tracking-widest">Add To Cart</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-6 sm:pt-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] text-[#666] mb-8 uppercase tracking-widest font-black">
            <Link to="/" className="hover:text-[#E84949] transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#333] capitalize">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
            {/* Gallery */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
              <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto scrollbar-hide md:w-20 lg:w-24 shrink-0">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative w-20 md:w-full aspect-square rounded-[16px] overflow-hidden border-[1.6px] transition-all shrink-0 ${selectedImg === i ? 'border-[#E84949] scale-95 shadow-md' : 'border-dashed border-[#333]/20 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </button>
                ))}
              </div>
              <div className="order-1 md:order-2 flex-1 relative aspect-square rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#F9EAD3] border-[2px] border-dashed border-[#333333] group">
                <img src={productImages[selectedImg]} alt={product.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  <span className="bg-[#E84949] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg">SALE 32%</span>
                </div>
              </div>
            </div>

            {/* Buy Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="space-y-5">
                <p className="text-[11px] font-black tracking-[0.2em] text-[#666] uppercase">Home Furniture</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-grandstander font-black text-[#333] leading-[1.1] capitalize uppercase tracking-tighter">{product.title}</h1>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-black text-[#E84949] tracking-tighter">${product.price.toFixed(2)}</span>
                    <span className="text-xl text-gray-400 line-through font-bold tracking-tighter">${product.oldPrice.toFixed(2)}</span>
                  </div>
                  <span className="bg-[#333] text-white text-[11px] font-black px-3 py-1 rounded-lg uppercase shadow-sm">Sale</span>
                </div>

                <div className="space-y-4 py-6 border-y-[1px] border-dashed border-gray-300">
                  <div className="flex items-center gap-3 text-[14px] text-[#333]">
                    <Eye size={18} className="text-[#666]" />
                    <span><strong>11 people</strong> are viewing this right now</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#333]">
                    <div className="w-[18px] h-[18px] rounded-full border border-[#333] flex items-center justify-center text-[10px]"><X size={10} /></div>
                    <span>Sold <strong>24 Product</strong> In last 13 Hours</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                     <button className="w-10 h-10 rounded-lg bg-[#E84949] text-white flex items-center justify-center shadow-lg shadow-[#E84949]/30 hover:scale-110 transition-transform"><Heart size={20}/></button>
                     <button className="w-10 h-10 rounded-lg bg-[#F9EAD3] text-[#333] border-[1.6px] border-dashed border-[#333] flex items-center justify-center hover:scale-110 transition-transform"><Repeat size={20}/></button>
                  </div>
                </div>

                {/* Variants Section from Toykio */}
                <div className="bg-[#F9EAD3] p-6 rounded-[24px] border-[1.6px] border-dashed border-[#333333] space-y-6 shadow-sm">
                   <div className="space-y-3">
                      <p className="text-[12px] font-black text-[#333] uppercase">Size</p>
                      <div className="flex flex-wrap gap-2">
                         {['Small', 'Medium', 'Large'].map(size => (
                            <button 
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 text-[12px] font-black rounded-lg border-[1.6px] transition-all ${selectedSize === size ? 'bg-[#333] text-white border-[#333]' : 'bg-white text-[#333] border-dashed border-[#333]/30 hover:border-[#333]'}`}
                            >
                               {size}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[12px] font-black text-[#333] uppercase">Color</p>
                      <div className="flex gap-3">
                         {['Red', 'Yellow'].map(color => (
                            <button 
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-125 ${selectedColor === color ? 'border-[#333] scale-110' : 'border-transparent'}`}
                              style={{ backgroundColor: color === 'Red' ? '#FF4E50' : '#FFEB3B' }}
                            />
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[13px] text-green-600 font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Only 20 left in stock!</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-dashed border-[#333]/10 p-[1px]">
                    <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-[#E84949] rounded-full" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="h-14 w-full sm:w-36 bg-white border-[1.6px] border-dashed border-[#333] rounded-[16px] flex items-center justify-between px-6">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#666] hover:text-[#E84949] transition-colors"><Minus size={18} /></button>
                      <span className="font-grandstander text-[18px] text-[#333] font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="text-[#666] hover:text-[#E84949] transition-colors"><Plus size={18} /></button>
                    </div>
                    <button className="flex-1 h-14 bg-[#E84949] text-white rounded-[16px] font-black text-[13px] tracking-[0.2em] uppercase hover:scale-[1.02] shadow-xl transition-all shadow-[#E84949]/20 hover:shadow-[#E84949]/30">Add To Cart</button>
                  </div>
                  <button className="w-full h-14 bg-[#333] text-white rounded-[16px] font-black text-[13px] tracking-[0.2em] uppercase hover:bg-[#E84949] transition-all shadow-xl hover:shadow-[#E84949]/20">Buy It Now</button>
                </div>

                {/* Additional Details from Toykio */}
                <div className="pt-6 space-y-4 font-roboto text-[14px] text-[#333]">
                   <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[#E84949]" />
                      <span>Pickup available at Shop location</span>
                   </div>
                   <p className="text-[13px] text-[#666] ml-6">Usually ready in 24 hours</p>
                   <button className="ml-6 text-[13px] font-bold underline decoration-dashed hover:text-[#E84949]">View store information</button>
                   
                   <div className="pt-6 border-t border-dashed border-gray-300 space-y-3">
                      <p><span className="font-black uppercase text-[11px] text-gray-400 mr-2">SKU:</span> {product.sku}</p>
                      <p><span className="font-black uppercase text-[11px] text-gray-400 mr-2">Categories:</span> <Link className="underline hover:text-[#E84949]">{product.category}</Link></p>
                   </div>
                   
                   <button className="w-full py-4 bg-[#E84949] text-white rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                      <Share size={16} /> SHARE
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="py-20 md:py-28 max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex flex-wrap gap-1 md:gap-2">
          {['description', 'additional', 'variant', 'custom'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-8 md:px-12 py-4 md:py-5 text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] transition-all rounded-t-[24px] border-t-[1.6px] border-x-[1.6px] border-[#333]/10 relative ${activeTab === t ? 'text-[#333] bg-[#F9EAD3] border-[#333]/30 !border-b-[#F9EAD3] z-20' : 'text-[#666] hover:text-[#333] bg-white/50'}`}
            >
              {t.replace('-', ' ')}
              {activeTab === t && <div className="absolute -bottom-[2px] left-0 w-full h-[6px] bg-[#F9EAD3] z-10" />}
            </button>
          ))}
        </div>
        <div className="bg-[#F9EAD3] p-8 md:p-14 border-[1.6px] border-dashed border-[#333333] rounded-b-[40px] rounded-tr-[40px] text-[#666] leading-relaxed font-roboto text-[16px] relative shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {activeTab === 'description' && (
                <div className="space-y-6 max-w-5xl">
                  <p>Discover Toykio, the ultimate Shopify 2.0 theme meticulously crafted for baby shops and kids' toy stores. Elevate your online presence with Toykio's seamless fusion of aesthetic charm and robust functionality.</p>
                  <p>At the heart of Toykio lies its flawless integration with Shopify 2.0, offering advanced features that enhance user experience and propel your store to top search engine rankings. Whether your inventory focuses on educational toys, plush baby essentials, or trendy kids' gadgets, Toykio's responsive design ensures impeccable presentation across desktops, tablets, and smartphones.</p>
                  <p>Toykio excels in showcasing your products attractively. From high-definition images to detailed descriptions and customer reviews, every detail is optimized to drive engagement and conversions.</p>
                </div>
              )}
              {activeTab === 'additional' && <p className="font-bold">Additional information about shipping, dimensions, and materials will be displayed here.</p>}
              {activeTab === 'variant' && <p className="font-bold">Variant details and specific configuration options for this item.</p>}
              {activeTab === 'custom' && <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#333]/10 rounded-2xl">Custom Field Placeholder</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 pb-20">
        <div className="bg-[#F9EAD3] rounded-[48px] border-[1.6px] border-dashed border-[#333333] grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-md">
          <div className="relative aspect-[4/3] md:aspect-auto group overflow-hidden">
            <img src="https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=950" alt="FAQ" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[#333]/5 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-grandstander font-black text-[#333] mb-12 uppercase leading-none tracking-tight">Frequently Ask Questions</h2>
            <div className="space-y-1">
              {[
                { q: "What Types Of Furniture Can I Showcase With This Theme?", a: "Toykio is perfect for all types of kids furniture - from cribs and beds to play tables and storage units." },
                { q: "Is This Theme Mobile-Friendly?", a: "Yes, Toykio is engineered with a mobile-first philosophy, providing a lightning-fast and intuitive experience on all mobile devices." },
                { q: "Can I Customize The Color Scheme And Fonts?", a: "Absolutely. With our advanced theme settings, you can customize every color, font, and button style in a few clicks." }
              ].map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
            <p className="mt-10 text-[13px] italic text-[#666] font-roboto border-l-2 border-[#E84949] pl-4">"Absolutely. You can easily adjust colors, fonts, and layout elements through the theme settings to match your brand's style."</p>
          </div>
        </div>
      </div>

      {/* Suggested Products (YOU MAY ALSO LIKE) */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 bg-[#F9EAD3] rounded-[48px] border-[1.6px] border-dashed border-[#333333] my-10 shadow-sm">
        <div className="text-center mb-16">
          <p className="text-[#E84949] font-black text-[12px] tracking-[0.4em] uppercase mb-4 font-roboto">Shop Collection</p>
          <h2 className="text-4xl md:text-6xl font-grandstander font-black text-[#333] uppercase leading-none tracking-tight">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {related.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
           <div>
              <p className="text-[#E84949] font-black text-[12px] tracking-[0.4em] uppercase mb-3 font-roboto">Flash Sale</p>
              <h2 className="text-4xl md:text-5xl font-grandstander font-black text-[#333] uppercase leading-none tracking-tight">Recently Viewed</h2>
           </div>
           <Link className="flex items-center gap-2 font-black text-[13px] uppercase tracking-widest hover:text-[#E84949] transition-colors">
              View All Products <ChevronRight size={18} />
           </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {/* We reuse the ProductCard with the 5-column layout */}
          {recentlyViewed.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          {/* Placeholders to fill the grid if needed */}
          {related.slice(0, 3).map((p, i) => <ProductCard key={p.id+10} p={p} i={i+2} />)}
        </div>
      </div>
    </div>
  )
}
