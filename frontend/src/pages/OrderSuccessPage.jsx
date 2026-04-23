import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Package, Truck, ShoppingBag, ArrowRight, ChevronRight, MapPin, ExternalLink, Calendar, Heart } from 'lucide-react'

const TrackingStep = ({ icon: Icon, label, status, active }) => (
  <div className="flex flex-col items-center gap-2 relative z-10">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${active ? 'bg-[#6651A4] text-white shadow-lg' : 'bg-white text-gray-300 border border-gray-100'}`}>
       <Icon size={20} />
    </div>
    <div className="text-center">
       <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-[#333]' : 'text-gray-300'}`}>{label}</p>
       <p className="text-[9px] text-gray-400 font-medium mt-0.5">{status}</p>
    </div>
  </div>
)

export function OrderSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!order) {
      navigate('/')
    }
  }, [order, navigate])

  if (!order) return null

  return (
    <div className="bg-[#FDF4E6] min-h-screen font-roboto overflow-hidden relative">
      {/* Toyove Magic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0 }}
             animate={{ 
               opacity: [0, 0.1, 0], 
               scale: [0, 1.5, 0],
               x: [Math.random() * 1000, Math.random() * 1000],
               y: [Math.random() * 1000, Math.random() * 1000]
             }}
             transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
             className="absolute"
           >
              <ShoppingBag size={100 + i * 20} className="text-[#6651A4]" />
           </motion.div>
         ))}
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-10 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Success Confirmation & Tracking */}
          <div className="lg:col-span-8 space-y-8">
             <motion.div 
               initial={{opacity:0, y:30}} 
               animate={{opacity:1, y:0}}
               className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl shadow-[#6651A4]/10 relative overflow-hidden"
             >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDF4E6]/50 rounded-full -mr-32 -mt-32 blur-3xl" />
                
                <div className="relative z-10 text-center md:text-left">
                   <motion.div 
                     initial={{scale:0}} animate={{scale:1}} transition={{type:'spring', damping:12}}
                     className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-sm border border-green-100"
                   >
                      <CheckCircle2 size={40} className="text-green-500" />
                   </motion.div>
                   <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] mb-4">Order Confirmed!</h1>
                   <p className="text-[14px] text-gray-500 font-medium max-w-md leading-relaxed">
                     Hooray! Your toy adventure has officially begun. We've sent a confirmation email to <span className="text-[#6651A4] font-bold">{order.customerEmail}</span> with all the details.
                   </p>
                </div>

                {/* Live Tracking Simulator */}
                <div className="mt-16 relative">
                   <div className="absolute top-6 left-[10%] right-[10%] h-[2px] bg-gray-100" />
                   <div className="absolute top-6 left-[10%] w-[25%] h-[2px] bg-[#6651A4] transition-all duration-1000" />
                   <div className="grid grid-cols-4 gap-4">
                      <TrackingStep icon={ShoppingBag} label="Ordered" status="Confirmed" active={true} />
                      <TrackingStep icon={Package} label="Processing" status="In Progress" active={true} />
                      <TrackingStep icon={Truck} label="Shipped" status="Pending" active={false} />
                      <TrackingStep icon={CheckCircle2} label="Delivered" status="Pending" active={false} />
                   </div>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <h4 className="text-[13px] font-bold text-[#333] uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={16} className="text-[#E84949]"/> Shipping To
                      </h4>
                      <div className="p-6 bg-[#FDF4E6]/50 rounded-3xl border border-[#333]/5">
                         <p className="text-[14px] font-bold text-[#333] mb-1">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                         <p className="text-[13px] text-gray-500 leading-relaxed">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                         <p className="text-[13px] text-gray-500 mt-2 font-medium">Contact: {order.shippingAddress.phone}</p>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[13px] font-bold text-[#333] uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={16} className="text-[#E84949]"/> Delivery Estimate
                      </h4>
                      <div className="p-6 bg-[#FDF4E6]/50 rounded-3xl border border-[#333]/5 flex flex-col justify-center h-full">
                         <p className="text-3xl font-bold font-grandstander text-[#6651A4]">{order.deliveryDate}</p>
                         <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-2">Standard Shipping (3-5 Days)</p>
                      </div>
                   </div>
                </div>
             </motion.div>

             <div className="flex flex-col md:flex-row gap-6">
                <Link to="/account" state={{ activeTab: 'orders' }} className="flex-1 py-6 bg-[#333] text-white rounded-3xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[13px] hover:bg-[#6651A4] transition-all shadow-xl group">
                   Go to My Orders <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                </Link>
                <Link to="/" className="flex-1 py-6 bg-white border-2 border-[#333] text-[#333] rounded-3xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[13px] hover:bg-[#333] hover:text-white transition-all">
                   Continue Shopping <ArrowRight size={18}/>
                </Link>
             </div>
          </div>

          {/* Right Column: Order Summary Portal */}
          <div className="lg:col-span-4 space-y-8">
             <motion.div 
               initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} transition={{delay:0.3}}
               className="bg-[#F9EAD3] p-8 md:p-10 rounded-[50px] border-[2px] border-dashed border-[#333]/15 sticky top-28"
             >
                <div className="flex items-center justify-between border-b border-[#333]/10 pb-6 mb-8">
                   <h3 className="text-xl font-bold text-[#333] font-grandstander">Summary</h3>
                   <span className="px-4 py-1.5 bg-white text-[#333] text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">#{order.id}</span>
                </div>

                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden shrink-0 border border-black/5 relative">
                           <img src={item.img} className="w-full h-full object-cover" />
                           <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#333] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{item.qty}</span>
                        </div>
                        <div className="grow">
                           <h4 className="text-[13px] font-bold text-[#333] font-grandstander line-clamp-1">{item.title}</h4>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price: ${item.price}</p>
                        </div>
                        <span className="text-[14px] font-bold text-[#333] tracking-tighter">${(item.price * item.qty).toFixed(2)}</span>
                     </div>
                   ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#333]/10 space-y-4">
                   <div className="flex justify-between text-[14px] font-medium text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#333]">${order.subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[14px] font-medium text-gray-500">
                      <span>Shipping</span>
                      <span className="font-bold text-[#333]">${order.shipping.toFixed(2)}</span>
                   </div>
                   {order.discount > 0 && (
                     <div className="flex justify-between text-[14px] font-bold text-green-600">
                        <span>Discount</span>
                        <span className="tracking-tighter">-${order.discount.toFixed(2)}</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#333]/10">
                      <span className="text-[18px] font-bold font-grandstander text-[#333]">Total Paid</span>
                      <div className="text-right">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">VIA {order.paymentMethod}</span>
                         <span className="text-3xl font-bold font-grandstander text-[#E84949] tracking-tighter">${order.total.toFixed(2)}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-10 p-5 bg-white/40 rounded-3xl border border-[#333]/5 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <Heart size={20} className="text-[#E84949]"/>
                   </div>
                   <p className="text-[11px] text-[#333] font-bold uppercase tracking-widest leading-relaxed">
                      Thank you for choosing Toyove!
                   </p>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
