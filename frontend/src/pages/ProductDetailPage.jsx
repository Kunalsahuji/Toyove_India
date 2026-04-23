import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Heart, Share2, Eye, ShoppingCart, Search, Repeat, Plus, Minus, CheckCircle, X, ChevronRight, Share } from 'lucide-react'


const productImages = [
  "https://toykio.myshopify.com/cdn/shop/files/product-08_bd7b541b-d749-4444-bdaa-d040b7d4ff0f.jpg?v=1716179376&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-07.jpg?v=1710995380&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-07-02.jpg?v=1710995381&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-06.jpg?v=1710995380&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/product-06-02.jpg?v=1710995381&width=533",
  "https://toykio.myshopify.com/cdn/shop/files/preview_images/85175d99987d4adb9478a6e7912fd6db.thumbnail.0000000000.jpg?v=1711011026&width=533"
]

import { ProductCard } from '../components/ui/ProductCard'

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-[#E5E5E5] py-6">
    <button onClick={onToggle} className="w-full flex justify-between items-center text-left group">
      <span className="font-grandstander font-bold text-[16px] md:text-[18px] text-[#333333] group-hover:text-[#E84949] transition-colors leading-tight tracking-tight">{question}</span>
      <div className={`w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center transition-all shrink-0 ${isOpen ? 'bg-[#E84949] border-[#E84949] text-white' : 'text-gray-400'}`}>
        {isOpen ? <Minus size={12} /> : <Plus size={12} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p className="pt-5 text-[14px] leading-relaxed text-[#666666] font-roboto italic">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

export function ProductDetailPage() {
  const { title } = useParams()
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const navigate = useNavigate()
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
    id: title?.toLowerCase() || 'product-08',
    title: title?.replaceAll('-', ' ') || "KidsKraze Creations",
    price: 89.00,
    oldPrice: 129.00,
    img: productImages[0],
    sku: "Product-08",
    category: "Toys"
  }

  const isWishlisted = wishlist.some(item => item.id === product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    navigate('/checkout')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: 'Check out this amazing toy!',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const related = [
    { id: 1, name: 'Planet Toy Explorer', price: 126, img: productImages[2], hoverImg: productImages[3] },
    { id: 2, name: 'WildHarvests Maker Toy', price: 150, img: productImages[4], hoverImg: productImages[5] },
    { id: 3, name: 'Rainbow Stacker Set', price: 85, img: productImages[6], hoverImg: productImages[7] },
    { id: 4, name: 'JoyfulJamboree Juniors', price: 89, img: productImages[1], hoverImg: productImages[0] },
    { id: 5, name: 'TinyTinker Toys', price: 60, img: productImages[0], hoverImg: productImages[1] },
    { id: 6, name: 'Baby Activity Mat', price: 130, img: productImages[4], hoverImg: productImages[3] },
    { id: 7, name: 'WildHarvests Maker', price: 110, img: productImages[5], hoverImg: productImages[6] },
    { id: 8, name: 'Rainbow Stacker', price: 95, img: productImages[7], hoverImg: productImages[0] }
  ]

  const recentlyViewed = [
    { id: 5, name: 'TinyTinker Toys', price: 60, img: productImages[0], hoverImg: productImages[1] },
    { id: 6, name: 'Baby Activity Mat', price: 130, img: productImages[4], hoverImg: productImages[3] },
    { id: 7, name: 'WildHarvests Maker', price: 110, img: productImages[5], hoverImg: productImages[6] },
    { id: 8, name: 'Rainbow Stacker', price: 95, img: productImages[7], hoverImg: productImages[0] },
    { id: 9, name: 'Joyful Juniors', price: 75, img: productImages[2], hoverImg: productImages[3] }
  ]

  return (
    <div className="bg-[#FDF4E6] pb-24 overflow-x-hidden">

      {/* Sales Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-6 left-4 md:left-6 z-100 bg-[#F9EAD3] rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-dashed border-[#333]/20 min-w-70 sm:min-w-[320px]"
          >
            <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"><X size={14} /></button>
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border-[1.2px] border-dashed border-[#333]/30">
              <img src={productImages[1]} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] text-[#666666]">Jacklin Purchased ! - From USA</p>
              <h4 className="text-[13px] font-bold text-[#333333] my-0.5 font-grandstander tracking-tight">KidsKraze Creations</h4>
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
            className="fixed bottom-0 left-0 w-full z-90 bg-[#F9EAD3] border-t-[1.6px] border-dashed border-[#333333] py-3 shadow-lg"
          >
            <div className="max-w-350 mx-auto px-4 md:px-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-12 h-12 rounded-lg border-[1.2px] border-dashed border-[#333]/30 overflow-hidden bg-white">
                  <img src={product.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#333333] hidden lg:block font-grandstander tracking-tight">{product.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#E84949] font-bold text-[18px]">${product.price.toFixed(2)}</span>
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
                <button onClick={handleAddToCart} className="h-10 px-6 sm:px-10 bg-[#E84949] text-white text-[12px] font-bold rounded-full hover:scale-105 transition-all tracking-widest uppercase">ADD TO CART</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-6 sm:pt-10">
        <div className="max-w-350 mx-auto px-4 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] md:text-[12px] text-[#666] mb-8 tracking-widest font-bold">
            <Link to="/" className="hover:text-[#E84949] transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#333] capitalize">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-20">
            {/* Gallery - Grid Layout for Toyove-India Parity */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-fit">
              {productImages.slice(0, 6).map((img, i) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 group">
                  <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              ))}
            </div>

            {/* Buy Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-[11px] font-medium tracking-[0.25em] text-[#666] font-roboto uppercase">Home Furniture</p>
                <h1 style={{
              fontFamily: 'var(--font-header)',
              textShadow: '0 2px 4px rgba(0,0,0,0.12)',
              lineHeight: 1.05,
              fontSize: 'clamp(32px, 7vw, 68px)',
              letterSpacing: '-0.04em'
            }} className="font-grandstander font-bold text-[#333] tracking-tighter">{product.title}</h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl text-gray-400 line-through font-bold tracking-tighter">${product.oldPrice.toFixed(2)}</span>
                    <span className="text-3xl lg:text-4xl font-bold text-[#E84949] tracking-tighter">${product.price.toFixed(2)} USD</span>
                  </div>
                  <span className="bg-[#333] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Sale</span>
                </div>

                <div className="space-y-4 py-5 border-y border-dashed border-gray-300">
                  <div className="flex items-center gap-3 text-[14px] text-[#333]">
                    <Eye size={18} className="text-[#666]" />
                    <span><strong>21 people</strong> are viewing this right now</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#333]">
                    <div className="w-4.5 h-4.5 rounded-full border border-[#333] flex items-center justify-center text-[10px]"><X size={10} /></div>
                    <span>Sold <strong>25 Product</strong> In last 13 Hours</span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button 
                      onClick={() => { toggleWishlist(product); navigate('/wishlist'); }}
                      className={`w-9 h-9 rounded flex items-center justify-center hover:scale-110 transition-transform ${isWishlisted ? 'bg-[#333] text-white' : 'bg-[#E84949] text-white'}`}
                    >
                      <Heart size={16} fill={isWishlisted ? 'white' : 'none'} />
                    </button>
                    <button onClick={() => navigate('/compare')} className="w-9 h-9 rounded bg-[#E84949] text-white flex items-center justify-center hover:scale-110 transition-transform"><Repeat size={16} /></button>
                  </div>
                  <p className="text-[13px] text-[#666] font-medium">Sku: {product.sku}</p>
                </div>

                <div className="bg-[#F9EAD3] p-4 rounded-[20px] border-[1.2px] border-[#333333]/15 space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-[#666] font-grandstander">Select Size</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Small', 'Medium', 'Large'].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg border transition-all font-grandstander ${selectedSize === size ? 'bg-[#E84949] text-white border-[#E84949]' : 'bg-white text-[#333] border-[#E5E5E5] hover:border-[#E84949]'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-[#666] font-grandstander">Choose Color</p>
                    <div className="flex gap-2">
                      {['Red', 'Yellow'].map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color ? 'border-[#333] scale-105' : 'border-transparent'}`}
                          style={{ backgroundColor: color === 'Red' ? '#FF4E50' : '#FFEB3B' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>


                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[12px] text-green-600 font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Only 20 left in stock!</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="h-12 w-full sm:w-32 bg-white border-[1.6px] border-dashed border-[#333] rounded flex items-center justify-between px-4">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#666] hover:text-[#E84949] transition-colors"><Minus size={14} /></button>
                      <span className="font-grandstander text-[16px] text-[#333] font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="text-[#666] hover:text-[#E84949] transition-colors"><Plus size={14} /></button>
                    </div>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 h-12 bg-[#E84949] text-white rounded font-bold text-[12px] tracking-[0.2em] uppercase hover:scale-[1.01] transition-all py-3"
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <button 
                    onClick={handleBuyNow}
                    className="w-full h-12 bg-[#333] text-white rounded font-bold text-[12px] tracking-[0.2em] uppercase hover:bg-[#E84949] transition-all"
                  >
                    BUY IT NOW
                  </button>
                </div>

                <div className="pt-4 space-y-3 font-roboto text-[14px] text-[#333]">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#E84949]" />
                    <span>Pickup available at Shop location</span>
                  </div>
                  {/* reduce font weight */}
                  <p className="text-[13px] text-[#333] ml-6">Usually ready in 24 hours</p>
                  <button className="ml-6 text-[12px] font-medium underline decoration-solid hover:text-[#E84949]">View store information</button>

                  <div className="pt-4 border-t border-dashed border-gray-300 space-y-2">
                    <p><span className="font-medium text-[11px] text-gray-400 mr-2 font-grandstander">Categories:</span> <Link to="/collections/toys" className="underline hover:text-[#E84949] font-medium">{product.category}</Link></p>
                  </div>

                  <button 
                    onClick={handleShare}
                    className="w-full py-3 bg-[#E84949] text-white rounded font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm"
                  >
                    <Share size={14} /> SHARE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section - Refined for Toyove-India Parity */}
      <div className="py-20 max-w-350 mx-auto px-4 md:px-10">
        <div className="flex flex-wrap gap-0">
          {['Description', 'Additional', 'Variant', 'Custom'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t.toLowerCase())}
              className={`px-8 md:px-10 py-4 text-[12px] font-bold tracking-[0.2em] transition-all border-[#E5E5E5] border  -mr-px -mb-1px relative font-grandstander ${activeTab === t.toLowerCase() ? 'text-[#333] bg-[#FDF4E6] z-10 border-b-[#FDF4E6]' : 'text-[#666] bg-[#FDF4E6]/50 hover:bg-[#FDF4E6]'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="bg-[#FDF4E6] p-10 border  border-[#E5E5E5] text-[#666] leading-relaxed font-roboto text-[16px] relative shadow-sm h-full min-h-75">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
              {activeTab === 'description' && (
                <div className="space-y-6 max-w-5xl">
                  <p>Discover Toyove-India, the ultimate Shopify 2.0 theme meticulously crafted for baby shops and kids' toy stores. Elevate your online presence with Toyove-India’s seamless fusion of aesthetic charm and robust functionality, designed to make your products shine on every device.</p>
                  <p>At the heart of Toyove-India lies its flawless integration with Shopify 2.0, offering advanced features that enhance user experience and propel your store to top search engine rankings. Whether your inventory focuses on educational toys, plush baby essentials, or trendy kids' gadgets, Toyove-India’s responsive design ensures impeccable presentation across desktops, tablets, and smartphones.</p>
                  <p>Customization is effortless with Toyove-India’s intuitive tools. Tailor your store’s appearance effortlessly—adjust colors, fonts, and layouts without touching a single line of code. The drag-and-drop interface empowers you to establish a unique brand identity that resonates deeply with your discerning clientele.</p>
                  <p>Toyove-India excels in showcasing your products attractively. From high-definition images to detailed descriptions and customer reviews, every detail is optimized to drive engagement and conversions. Whether highlighting interactive playsets, eco-friendly nursery items, or imaginative toys, Toyove-India captivates your audience effectively.</p>
                  <p>SEO optimization forms the cornerstone of Toyove-India’s design philosophy. Optimized meta tags, clean code, and swift load times ensure prominent visibility in search results. This strategic approach not only attracts organic traffic but also converts visitors into loyal customers, fostering sustained growth for your baby and kids' toy store.</p>
                  <p>Seamlessly integrate potent marketing tools with Toyove-India. From targeted email campaigns to impactful social media promotions, product badges, and eye-catching banners, amplify your brand’s reach and boost sales effectively. Toyove-India’s secure payment gateways and robust data encryption build trust and loyalty among your customers.</p>
                  <p>Expand your global footprint with Toyove-India’s support for multilingual and multi-currency capabilities. Deliver a personalized shopping experience in customers’ preferred languages and currencies, enhancing accessibility and elevating conversion rates. Toyove-India’s modern design, built with HTML5, CSS3, and Bootstrap, guarantees flawless performance across diverse platforms, optimizing user satisfaction.</p>
                  <p>Customer-centric features such as quick view options, wish lists, and streamlined checkout processes enhance usability and drive sales. Transparent shipping policies and comprehensive FAQs further enhance customer satisfaction, encouraging repeat business and fostering brand loyalty.</p>
                  <p>Benefit from Toyove-India’s comprehensive support and regular updates. Access extensive documentation, tutorials, and responsive customer service to maximize your store’s performance and promptly address inquiries. With continuous improvements and feature updates, Toyove-India ensures your baby shop and kids' toy store remains competitive and innovative in the dynamic ecommerce landscape.</p>
                  <p>Choose Toyove-India - Baby Shop & Kids Toys Store Multipurpose Shopify 2.0 Responsive Theme to transform your online store into a thriving ecommerce destination. Enhance your brand’s online presence, attract a global audience, and drive sustainable growth with Toyove-India’s tailored solutions for baby shops and kids' toy retailers.</p>
                </div>
              )}
              {activeTab === 'additional' &&
                <div className="space-y-6 max-w-5xl">
                  <span className=" whitespace-pre-line">
                    {`1) This information tab works when you add some description in metafield.
 
 2) Settings > Custom Data > Product > Add definition > give name as needed > in key "custom.additional_information" add this code and save the page.
 
 3) Select type "multi-line text"
 
 4) Now go in product, scroll down, and you will see the metafield section. Add your custom information as needed.
 
 EXAMPLE:-
 
 E-Techno: Your Premier Destination for Cutting-Edge Electronics and Gadgets
 
 Welcome to E-Techno, the ultimate haven for tech enthusiasts and gadget aficionados alike. Step into a world where innovation meets convenience, and where the latest advancements in electronics are just a click away.
 
 At E-Techno, we pride ourselves on being more than just a store; we're a gateway to the future. Our vast selection encompasses everything from state-of-the-art smartphones and sleek laptops to immersive VR headsets and smart home devices that streamline your lifestyle. Whether you're a tech-savvy professional seeking productivity tools or a gaming enthusiast in pursuit of the ultimate gaming setup, we have you covered.
 
 With a user-friendly interface and seamless browsing experience, navigating through our extensive catalog is a breeze. Explore our curated collections, stay updated on the newest releases, and take advantage of exclusive deals and promotions. Our commitment to quality ensures that every product we offer is rigorously tested and vetted, guaranteeing satisfaction and reliability.
 
 But E-Techno is more than just a retailer; we're a community of tech enthusiasts united by our passion for innovation. Join us on social media platforms and forums to engage with like-minded individuals, share your insights, and stay informed about the latest trends and developments in the tech world.
 
 Whether you're upgrading your gadgets, seeking the perfect gift for a fellow tech enthusiast, or simply looking to stay ahead of the curve, E-Techno is your one-stop destination for all things electronic. Experience the future today with E-Techno, where innovation knows no bounds.`}
                  </span>
                </div>
              }
              {activeTab === 'variant' &&
                <div className="space-y-6 max-w-5xl">
                  <span className='whitespace-pre-line'>
                    <p>Variant details and specific configuration options for this item.</p>
                    <p>Variant details and specific configuration options for this item.</p>
                  </span>
                </div>
              }
              {activeTab === 'custom' &&
                <div className="space-y-6 max-w-5xl">
                  <span className='whitespace-pre-line'>
                    <p>Custom Field Information</p>
                  </span>
                </div>
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Suggested Products (YOU MAY ALSO LIKE) */}
      <div className="max-w-350 mx-auto px-4 md:px-10 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-grandstander font-bold text-[#333] tracking-tight">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {related.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>

      {/* Recently Viewed Section */}
      <div className="max-w-350 mx-auto px-4 md:px-10 py-16">
        <div className="flex flex-col items-center justify-between mb-12 gap-6">
          <div className="text-center w-full">
            {/* make responsive and text-align center for all devices. */}
            <h2 className="text-3xl md:text-4xl font-grandstander font-bold text-[#333] leading-none tracking-tight text-center">Recently Viewed</h2>
          </div>
          <Link to="/collections/all" className="flex items-center gap-2 font-bold text-[12px] tracking-widest hover:text-[#E84949] transition-colors font-grandstander uppercase">
            View All Products <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {recentlyViewed.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-350 mx-auto px-4 md:px-10 py-24 mb-10 border-t border-[#E5E5E5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-4/3 rounded-4xl overflow-hidden group border-[1.6px] border-[#E5E5E5]">
            <img src="https://toykio.myshopify.com/cdn/shop/files/product-08-02_1ed2d2ac-88dd-401e-a474-8579b20407ff.jpg?v=1716179376&width=950" alt="FAQ" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 p-2 rounded-4xl " />
            <div className="absolute inset-0 bg-[#333]/3 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] mb-12 leading-none tracking-tighter">Frequently Ask Questions</h2>
            <div className="space-y-0">
              {[
                { q: "What Types Of Furniture Can I Showcase With This Theme?", a: "Toyove-India is perfect for all types of kids furniture - from cribs and beds to play tables and storage units." },
                { q: "Is This Theme Mobile-Friendly?", a: "Yes, Toyove-India is engineered with a mobile-first philosophy, providing a lightning-fast and intuitive experience on all mobile devices." },
                { q: "Can I Customize The Color Scheme And Fonts?", a: "Absolutly. With our advanced theme settings, you can customize every color, font, and button style in a few clicks." }
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
          </div>
        </div>
      </div>
    </div>
  )
}