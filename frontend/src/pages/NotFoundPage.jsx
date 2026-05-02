import { motion } from 'framer-motion'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ChevronRight, Ghost } from 'lucide-react'

export function NotFoundPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-[#FDF4E6] flex flex-col">
      
      {/* Breadcrumbs */}
      {!isAdmin && (
        <div className="bg-[#FAEAD3]/30 py-4 border-b border-[#6651A4]/5">
          <div className="shell flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-[#6651A4] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#6651A4]">404 Not Found</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 pb-20">
        <div className="max-w-xl w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Premium Animated Illustration */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-64 md:h-64 bg-white rounded-[40px] shadow-2xl border-4 border-white flex items-center justify-center text-[#E8312A] relative"
              >
                {/* Decoration Circles */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FAEAD3] rounded-full blur-sm opacity-50" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#6651A4]/10 rounded-full blur-md" />
                
                <Ghost size={80} className="md:w-32 md:h-32" strokeWidth={1.5} />
                
                {/* Confused Dots */}
                <div className="absolute top-10 right-10 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-[#6651A4] rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-grandstander font-black text-[#222222]">
                Oops !!
              </h1>
              <p className="text-gray-500 font-bold text-sm md:text-base uppercase tracking-widest px-4">
                Sorry! Page You Are Looking Can’t Be Found.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto h-14 px-10 bg-[#E8312A] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate(isAdmin ? '/admin' : '/')}
                className="w-full sm:w-auto h-14 px-10 bg-[#E8312A] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-red-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Back To Homepage
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Admin Specific Footer if in admin context */}
      {isAdmin && (
        <div className="p-8 text-center opacity-30">
          <span className="font-grandstander font-bold text-xl text-[#6651A4]">Toyovo Admin Control</span>
        </div>
      )}
    </div>
  )
}
