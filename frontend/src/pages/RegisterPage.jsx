import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import registerImage from '../assets/toyove_auth_banner.webp'

export function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.email && formData.password) {
      const res = register({
        ...formData,
        username: formData.firstName.toLowerCase()
      })
      
      if (res.success) {
        navigate('/login')
      } else {
        setError(res.message)
      }
    }
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      {/* Hero Banner Style from Screenshot */}
      <div className="max-w-350 mx-auto px-4 md:px-10 pt-10">
        <div className="relative h-[250px] md:h-[400px] rounded-[40px] overflow-hidden shadow-lg mb-[-120px] z-0">
          <img 
            src={registerImage}
            alt="Toyove India Register" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#333]/10" />
        </div>

        {/* Register Form Container - Dashed Border Style */}
        <div className="max-w-[750px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[48px] p-10 md:p-12 lg:p-20 shadow-xl"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] tracking-tighter">Create account</h1>
              {error && <p className="mt-4 text-[#E84949] text-[13px] font-bold uppercase tracking-wider">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="First name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Last name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                  required
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                required
              />

              <div className="space-y-6 pt-4 text-center">
                <button 
                  type="submit" 
                  className="w-full h-15 bg-[#E84949] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-xl hover:bg-[#333] transition-all shadow-md active:scale-95"
                >
                  CREATE
                </button>
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] text-[#666]">Already have an account?</p>
                    <Link to="/login" className="text-[13px] font-bold text-[#333] underline hover:text-[#E84949] uppercase tracking-widest">Login here</Link>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
