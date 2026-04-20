import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { User, Package, MapPin, LogOut, ChevronRight } from 'lucide-react'

export function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      <div className="bg-[#6651A4] py-16 text-center text-white">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
              <h1 className="text-4xl md:text-5xl font-grandstander font-bold mb-2">My Account</h1>
              <p className="text-[13px] font-bold tracking-widest uppercase opacity-80">Welcome back, {user.firstName}!</p>
          </motion.div>
      </div>

      <div className="shell mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 border-[1.6px] border-dashed border-[#333]/15 rounded-[32px] p-6 bg-[#F9EAD3]/50">
            <nav className="flex flex-col gap-2">
              <button className="flex items-center justify-between p-4 bg-white rounded-2xl text-[13px] font-bold text-[#E84949] shadow-sm">
                <span className="flex items-center gap-3"><User size={18}/> Dashboard</span>
                <ChevronRight size={16}/>
              </button>
              <button className="flex items-center justify-between p-4 hover:bg-white rounded-2xl text-[13px] font-bold text-[#333] transition-all">
                <span className="flex items-center gap-3"><Package size={18}/> My Orders</span>
                <ChevronRight size={16}/>
              </button>
              <button className="flex items-center justify-between p-4 hover:bg-white rounded-2xl text-[13px] font-bold text-[#333] transition-all">
                <span className="flex items-center gap-3"><MapPin size={18}/> Addresses</span>
                <ChevronRight size={16}/>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-between p-4 hover:bg-[#E84949] hover:text-white rounded-2xl text-[13px] font-bold text-[#E84949] transition-all mt-4 border border-[#E84949]/20"
              >
                <span className="flex items-center gap-3"><LogOut size={18}/> Log out</span>
              </button>
            </nav>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="bg-white p-8 rounded-[32px] shadow-sm border border-[#333]/5">
                    <h2 className="text-[20px] font-grandstander font-bold text-[#333] mb-6 flex items-center gap-2">Account Details</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[11px] font-bold text-[#999] uppercase tracking-widest mb-1">Name</p>
                            <p className="text-[15px] font-bold text-[#333]">{user.firstName} {user.lastName}</p>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-[#999] uppercase tracking-widest mb-1">Email</p>
                            <p className="text-[15px] font-bold text-[#333]">{user.email}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="bg-white p-8 rounded-[32px] shadow-sm border border-[#333]/5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-[20px] font-grandstander font-bold text-[#333] mb-2 flex items-center gap-2">Order History</h2>
                        <p className="text-[14px] text-[#666]">You haven't placed any orders yet.</p>
                    </div>
                    <Link to="/collections/dolls" className="inline-block mt-6 px-6 py-3 bg-[#E84949] text-white text-[12px] font-bold rounded-xl tracking-widest uppercase hover:bg-[#333] transition-all text-center">Start Shopping</Link>
                </motion.div>
            </div>

            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[32px] p-10 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <MapPin className="text-[#E84949]" size={28}/>
                    </div>
                    <h3 className="text-[22px] font-grandstander font-bold text-[#333] mb-2">Default Address</h3>
                    <p className="text-[15px] text-[#666] mb-6">No addresses have been added to your profile reaching your toy collection.</p>
                    <button className="border-2 border-[#333] text-[#333] px-8 py-3 rounded-xl text-[12px] font-bold tracking-widest uppercase hover:bg-[#333] hover:text-white transition-all">View Addresses (0)</button>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
