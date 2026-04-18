import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] min-h-screen py-24">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] mb-8 tracking-tighter">Search Results</h1>
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search for toys, games, and more..." 
              className="w-full h-16 bg-white border-[1.6px] border-dashed border-[#333]/20 rounded-full px-10 pr-20 text-[16px] outline-none focus:border-[#E84949] transition-all shadow-sm"
              autoFocus
            />
            <button className="absolute right-2 top-2 bottom-2 w-12 bg-[#E84949] text-white rounded-full flex items-center justify-center hover:bg-[#333] transition-all">
              <Search size={20} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 md:p-24 bg-white rounded-[48px] border-[1.6px] border-dashed border-[#333333]/15 shadow-xl text-center"
        >
          <div className="w-24 h-24 rounded-full bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/30 flex items-center justify-center text-[#666] mb-10">
            <Search size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-grandstander font-bold text-[#333] mb-6 tracking-tighter">No results found</h2>
          <p className="max-w-xl mx-auto font-roboto text-[16px] md:text-[18px] text-[#666] leading-relaxed mb-12">
            We couldn't find anything matching your search. Try using different keywords or explore our most popular categories!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Dolls', 'Soft Toys', 'STEM Kits', 'Board Games'].map(cat => (
              <Link 
                key={cat} 
                to="/" 
                className="px-6 py-2 bg-[#F9EAD3] border border-dashed border-[#333]/20 rounded-full font-bold text-[12px] tracking-widest text-[#333] hover:bg-[#E84949] hover:text-white transition-all uppercase"
              >
                {cat}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
