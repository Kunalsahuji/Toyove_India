import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2, Trash } from 'lucide-react'

import { useCart } from '../context/CartContext'

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FDF4E6] min-h-screen py-24 flex flex-col items-center justify-center font-roboto">
        <div className="p-12 bg-[#FAEAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[40px] text-center max-w-lg mx-4 shadow-xl">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShoppingBag size={32} className="text-[#E84949]" />
            </div>
            <h1 className="text-3xl font-grandstander font-bold text-[#333] mb-4 tracking-tight">Your Cart is Empty</h1>
            <p className="text-[#666] mb-8 font-medium italic leading-relaxed">It looks like you haven't added any magic to your cart yet. Browse our collections to find the perfect joy for your child!</p>
            <Link to="/" className="inline-flex items-center gap-3 px-12 py-4 bg-[#E84949] text-white font-bold rounded-full tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg active:scale-95">
                START SHOPPING <ArrowRight size={18}/>
            </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen py-16 font-roboto">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#333]/40 mb-6">
            <Link to="/" className="hover:text-[#E84949] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#333]">Your Shopping Cart</span>
        </nav>

        <h1 className="text-5xl md:text-6xl font-grandstander font-bold text-[#333] text-center mb-16 tracking-tighter">Main Cart</h1>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4 mb-10">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white/60 rounded-[28px] border border-black/10 p-4 shadow-sm">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0 border border-black/5">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link to={`/product/${item.title?.toLowerCase().replaceAll(' ', '-')}`} className="font-grandstander font-bold text-[#333] hover:text-[#E84949] text-[16px] tracking-tight line-clamp-2 break-words">
                    {item.title}
                  </Link>
                  <p className="text-[15px] font-bold text-[#E84949] mt-1">₹{item.price.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 break-words">SKU: {item.sku || 'N/A'}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-[#333]/40 hover:text-[#E84949] hover:bg-red-50 transition-all shrink-0">
                  <Trash size={16} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center h-11 w-32 border border-black/20 rounded-xl bg-[#FDF4E6] overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, -1)} className="flex-1 h-full flex items-center justify-center hover:text-[#E84949]"><Minus size={14} /></button>
                  <span className="w-8 text-center font-bold text-[15px]">{item.qty}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="flex-1 h-full flex items-center justify-center hover:text-[#E84949]"><Plus size={14} /></button>
                </div>
                <span className="font-grandstander font-bold text-[20px] text-[#333] tracking-tighter">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-lg overflow-x-auto custom-scrollbar mb-12 shadow-sm">
           <table className="w-full min-w-[900px] border-collapse">
              <thead>
                 <tr className="border-b border-dashed border-[#333]/20 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333]/60">
                    <th className="p-6 text-center w-24 border-r border-dashed border-[#333]/20">Remove</th>
                    <th className="p-6 text-center w-48 border-r border-dashed border-[#333]/20">Product Image</th>
                    <th className="p-6 text-left border-r border-dashed border-[#333]/20">Product</th>
                    <th className="p-6 text-center w-48 border-r border-dashed border-[#333]/20">Quantity</th>
                    <th className="p-6 text-right w-48">Total</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-[#333]/20">
                 {cartItems.map((item) => (
                    <tr key={item.id} className="group">
                       <td className="p-6 text-center border-r border-dashed border-[#333]/20">
                          <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-full flex items-center justify-center mx-auto text-[#333]/40 hover:text-[#E84949] hover:bg-red-50 transition-all">
                             <Trash size={18} />
                          </button>
                       </td>
                       <td className="p-6 border-r border-dashed border-[#333]/20">
                          <div className="w-32 h-32 bg-white rounded-2xl overflow-hidden mx-auto shadow-inner group-hover:scale-105 transition-transform">
                             <img src={item.img} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                       </td>
                       <td className="p-6 border-r border-dashed border-[#333]/20">
                          <div className="space-y-1">
                             <Link to={`/product/${item.title?.toLowerCase().replaceAll(' ', '-')}`} className="font-grandstander font-bold text-[#333] hover:text-[#E84949] text-[18px] tracking-tight">{item.title}</Link>
                             <p className="text-[16px] font-bold text-[#E84949]">₹{item.price.toFixed(2)}</p>
                             <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest">SKU: {item.sku || 'N/A'}</p>
                          </div>
                       </td>
                       <td className="p-6 border-r border-dashed border-[#333]/20">
                          <div className="flex items-center justify-center h-12 w-32 bg-white border border-[#333]/20 rounded-xl mx-auto">
                             <button onClick={() => updateQuantity(item.id, -1)} className="flex-1 h-full flex items-center justify-center hover:text-[#E84949]"><Minus size={14} /></button>
                             <span className="w-8 text-center font-bold text-[15px]">{item.qty}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="flex-1 h-full flex items-center justify-center hover:text-[#E84949]"><Plus size={14} /></button>
                          </div>
                       </td>
                       <td className="p-6 text-right">
                          <span className="font-grandstander font-bold text-[20px] text-[#333] tracking-tighter">₹{(item.price * item.qty).toFixed(2)}</span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
           {/* Order Message Box */}
           <div className="p-8 border-[1.2px] border-dashed border-[#333]/20 rounded-2xl space-y-4">
              <h3 className="font-grandstander font-bold text-xl text-[#333]">Order message</h3>
              <textarea 
                className="w-full h-32 bg-transparent border border-[#333]/10 rounded-xl p-4 text-[14px] outline-none focus:border-[#E84949] font-roboto italic text-[#666]" 
                placeholder="Order message"
              />
           </div>

           {/* Totals and Buttons */}
           <div className="flex flex-col items-stretch lg:items-end space-y-6">
              <div className="text-left lg:text-right space-y-2">
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-6">
                    <span className="text-[16px] font-bold text-[#333]/60 uppercase tracking-widest">Estimated total:</span>
                    <span className="text-3xl font-grandstander font-bold text-[#333] tracking-tighter">₹{subtotal.toFixed(2)} INR</span>
                 </div>
                 <p className="text-[12px] text-gray-400 font-medium italic">Taxes, discounts and shipping calculated at checkout</p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-[400px]">
                 <Link to="/checkout" className="w-full h-14 bg-[#E84949] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] flex items-center justify-center hover:scale-[1.01] transition-all shadow-xl shadow-[#E84949]/20">Check Out</Link>
                 <Link to="/" className="w-full h-14 bg-[#333] text-white rounded-xl font-bold uppercase tracking-widest text-[12px] flex items-center justify-center hover:scale-[1.01] transition-all shadow-lg">Continue Shopping</Link>
              </div>
           </div>
        </div>

        {/* Gift Wrap and Coupon Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
           <div className="p-6 md:p-8 border-[1.2px] border-dashed border-[#333]/20 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="grow space-y-4 w-full">
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-[#E84949]" />
                    <span className="text-[14px] font-bold text-[#333]">Do you want a gift wrap?</span>
                 </label>
                 <textarea className="w-full h-24 bg-transparent border border-[#333]/10 rounded-xl p-4 text-[13px] outline-none italic" placeholder="Gift message" />
              </div>
              <button className="h-12 px-10 bg-[#E84949] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shrink-0 mt-0 sm:mt-8 w-full sm:w-auto">Submit</button>
           </div>

           <div className="p-6 md:p-8 border-[1.2px] border-dashed border-[#333]/20 rounded-2xl space-y-4">
              <p className="text-[13px] font-bold text-[#333]/60 uppercase tracking-widest">Enter coupon or discount code:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input type="text" placeholder="Coupon code" className="grow h-14 bg-transparent border border-[#333]/10 rounded-xl px-4 outline-none font-bold text-[14px]" />
                 <button className="h-14 px-10 bg-[#E84949] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] w-full sm:w-auto">Submit</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
