import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'

import { useCart } from '../context/CartContext'

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FDF4E6] min-h-screen py-24 flex flex-col items-center justify-center font-roboto">
        <div className="p-12 bg-[#FAEAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[40px] text-center max-w-lg mx-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShoppingBag size={32} className="text-[#333]/20" />
            </div>
            <h1 className="text-3xl font-grandstander font-bold text-[#333] mb-4">Your cart is empty</h1>
            <p className="text-[#666] mb-8">Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-10 py-4 bg-[#E84949] text-white font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] transition-all shadow-lg active:scale-95">
                Start Shopping <ArrowRight size={18}/>
            </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      {/* Hero */}
      <div className="bg-[#E84949] py-16 text-center text-white">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
              <h1 className="text-4xl md:text-5xl font-grandstander font-bold mb-2">Shopping Cart</h1>
              <div className="flex items-center justify-center gap-2 text-[12px] font-bold tracking-widest uppercase opacity-80">
                  <Link to="/" className="hover:text-white underline">Home</Link>
                  <span>/</span>
                  <span>Your Shopping Cart</span>
              </div>
          </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-[#333]/10 text-[11px] font-bold text-[#999] uppercase tracking-widest px-4">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
            </div>

            {cartItems.map((item) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{opacity:0}} animate={{opacity:1}}
                className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center bg-white p-4 md:p-6 rounded-[32px] shadow-sm border border-[#333]/5 relative group"
              >
                <div className="col-span-1 md:col-span-3 flex items-center gap-6">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-[#FAEAD3] rounded-2xl overflow-hidden p-1 shrink-0 border border-[#333]/5">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                        <Link to={`/product/${item.title?.toLowerCase().replaceAll(' ', '-')}`} className="text-[16px] md:text-[18px] font-grandstander font-bold text-[#333] hover:text-[#E84949] transition-colors leading-tight block mb-1">
                            {item.title}
                        </Link>
                        <p className="text-[12px] text-[#999] font-medium lowercase">SKU: {item.sku || 'TOY-001'}</p>
                        <button onClick={() => removeFromCart(item.id)} className="md:hidden mt-2 text-[#E84949] flex items-center gap-1 text-[12px] font-bold uppercase tracking-widest">
                            <Trash2 size={14}/> Remove
                        </button>
                    </div>
                </div>

                <div className="hidden md:block text-center font-bold text-[#333]">${item.price.toFixed(2)}</div>

                <div className="flex justify-center">
                    <div className="flex items-center bg-[#FDF4E6] rounded-xl border border-[#333]/10 p-1">
                        <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center hover:text-[#E84949] transition-colors"
                        >
                            <Minus size={16}/>
                        </button>
                        <span className="w-10 text-center font-bold text-[15px]">{item.qty}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center hover:text-[#E84949] transition-colors"
                        >
                            <Plus size={16}/>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center md:block text-right">
                    <span className="md:hidden text-[13px] font-bold text-[#999] uppercase tracking-widest">Total:</span>
                    <span className="font-grandstander font-bold text-[18px] text-[#E84949]">${(item.price * item.qty).toFixed(2)}</span>
                </div>

                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white text-[#333] rounded-full shadow-lg items-center justify-center hidden group-hover:flex hover:bg-[#E84949] hover:text-white transition-all border border-[#333]/10"
                >
                    <X size={16}/>
                </button>
              </motion.div>
            ))}

            <div className="pt-4 flex flex-col md:flex-row justify-between gap-4">
                <Link to="/" className="px-8 py-4 bg-[#FAEAD3] text-[#333] font-bold rounded-xl tracking-widest uppercase hover:bg-[#E84949] hover:text-white transition-all text-center">
                    Continue Shopping
                </Link>
                <button 
                    onClick={clearCart}
                    className="px-8 py-4 bg-white border-2 border-[#333] text-[#333] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] hover:text-white transition-all text-center"
                >
                    Clear Cart
                </button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1">
            <div className="bg-[#FAEAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[40px] p-8 space-y-8 sticky top-32">
                <h3 className="text-2xl font-grandstander font-bold text-[#333] border-b border-[#333]/10 pb-4">Cart Totals</h3>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="text-[#666] font-medium uppercase tracking-widest text-[13px]">Subtotal</span>
                        <span className="font-bold text-[#333]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                        <span className="text-[#666] font-medium uppercase tracking-widest text-[13px]">Shipping</span>
                        <span className="text-[#666] text-[13px]">Calculated at checkout</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#333]/10 flex justify-between items-center">
                    <span className="text-[18px] font-grandstander font-bold text-[#333]">Order Total</span>
                    <span className="text-2xl font-grandstander font-bold text-[#E84949]">${subtotal.toFixed(2)}</span>
                </div>

                <p className="text-[13px] text-[#666] text-center italic">Tax included and shipping calculated at checkout</p>

                <Link 
                    to="/checkout"
                    className="w-full h-16 bg-[#E84949] text-white font-bold text-[14px] tracking-[0.2em] uppercase rounded-xl hover:bg-[#333] transition-all shadow-xl active:scale-95 flex items-center justify-center"
                >
                    Proceed to Checkout
                </Link>

                <div className="grid grid-cols-4 gap-2 pt-2">
                    {['visa', 'mastercard', 'paypal', 'applepay'].map(p => (
                        <div key={p} className="h-8 bg-white/50 rounded flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                            <span className="text-[9px] font-bold uppercase">{p}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
