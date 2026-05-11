import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import loginImage from '../assets/TOYOVOINIDIA_auth_banner.webp'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const nextPath = new URLSearchParams(location.search).get('next')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    if (email && password) {
      const res = await login(email, password)
      if (res.success) {
        const fallbackPath = ['admin', 'super_admin'].includes(res.user?.role) ? '/admin' : '/'
        navigate(nextPath || fallbackPath, { replace: true })
      } else {
        setError(res.message)
      }
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      {/* Hero Banner Style from Screenshot */}
      <div className="max-w-350 mx-auto px-4 md:px-10 pt-10">
        <div className="relative h-[250px] md:h-[400px] rounded-[40px] overflow-hidden shadow-lg mb-[-120px] z-0">
          <img 
            src={loginImage}
            alt="TOYOVOINDIA India Login" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#333]/10" />
        </div>

        {/* Login Form Container - Dashed Border Style */}
        <div className="max-w-[650px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[48px] p-10 md:p-12 lg:p-20 shadow-xl"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] tracking-tighter">Login</h1>
              {location.state?.registrationSuccess && (
                <p className="mt-4 text-green-600 text-[13px] font-bold uppercase tracking-wider">
                  Account created. Please log in to continue.
                </p>
              )}
              {error && <p className="mt-4 text-[#E84949] text-[13px] font-bold uppercase tracking-wider">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                  required
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-xl px-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40"
                  required
                />
                <div className="flex justify-between items-center px-1">
                    <button type="button" className="text-[12px] text-[#666] hover:text-[#E84949] font-medium underline">Forgot your password?</button>
                    <Link to="/" className="text-[12px] text-[#666] hover:text-[#E84949] font-medium flex items-center gap-1">Back to store</Link>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#E84949] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-xl hover:bg-[#333] transition-all shadow-md active:scale-95"
                >
                  {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
                <Link 
                  to={`/register${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''}`}
                  className="w-full h-14 bg-[#333] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-xl hover:bg-[#E84949] transition-all shadow-md flex items-center justify-center"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
