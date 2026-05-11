import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { apiRequest } from '../services/api'
import { useToast } from '../context/ToastContext'
import loginImage from '../assets/TOYOVOINIDIA_auth_banner.webp'
import { Lock, Mail, KeyRound, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1) // 1: Email, 2: OTP & Password, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success: showSuccess, error: showError } = useToast()
  const navigate = useNavigate()

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    try {
      const res = await apiRequest('/auth/forgot-password', { 
        method: 'POST',
        body: JSON.stringify({ email }) 
      })
      showSuccess(res.message)
      setStep(2)
    } catch (err) {
      showError(err.message || 'Failed to send OTP')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!otp || !password) return
    setIsSubmitting(true)
    try {
      const res = await apiRequest('/auth/reset-password', { 
        method: 'POST',
        body: JSON.stringify({ email, otp, password }) 
      })
      showSuccess(res.message)
      setStep(3)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      showError(err.message || 'Invalid OTP or reset failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FDF4E6] min-h-screen pb-24 font-roboto">
      <div className="max-w-350 mx-auto px-4 md:px-10 pt-10">
        <div className="relative h-[250px] md:h-[400px] rounded-[40px] overflow-hidden shadow-lg mb-[-120px] z-0">
          <img 
            src={loginImage}
            alt="TOYOVOINDIA Auth" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#333]/10" />
        </div>

        <div className="max-w-[650px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333]/15 rounded-[48px] p-10 md:p-12 lg:p-20 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] tracking-tighter">Reset your password</h1>
                    <p className="mt-4 text-gray-500 text-sm font-medium">We will send you an OTP to reset your password</p>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#333]/30" size={18} />
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-16 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-2xl pl-14 pr-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40 font-bold text-sm"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-16 bg-[#E84949] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-2xl hover:bg-[#333] transition-all shadow-md active:scale-95 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                      </button>
                      <Link 
                        to="/login"
                        className="w-full h-16 bg-[#333] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-2xl hover:bg-[#E84949] transition-all shadow-md flex items-center justify-center gap-3"
                      >
                        CANCEL
                      </Link>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-grandstander font-bold text-[#333] tracking-tighter">Verify OTP</h1>
                    <p className="mt-4 text-gray-500 text-sm font-medium">Enter the 6-digit code sent to {email}</p>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="relative">
                      <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-[#333]/30" size={18} />
                      <input 
                        type="text" 
                        placeholder="6-Digit OTP" 
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full h-16 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-2xl pl-14 pr-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40 font-bold text-lg tracking-[0.5em]"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#333]/30" size={18} />
                      <input 
                        type="password" 
                        placeholder="New Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-16 bg-transparent border-[1.2px] border-dashed border-[#333]/20 rounded-2xl pl-14 pr-6 outline-none focus:border-[#E84949] transition-all placeholder-[#333]/40 font-bold text-sm"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-16 bg-[#E84949] text-white font-bold text-[13px] tracking-[0.2em] uppercase rounded-2xl hover:bg-[#333] transition-all shadow-md active:scale-95 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? 'RESETTING...' : 'UPDATE PASSWORD'}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full h-16 bg-transparent border-[1.2px] border-[#333]/10 text-[#333] font-bold text-[11px] tracking-[0.2em] uppercase rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft size={14} /> Back to Email
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8 py-10"
                >
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={48} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-grandstander font-bold text-[#333]">Success!</h2>
                    <p className="mt-4 text-gray-500 text-sm font-medium">Your password has been reset successfully.</p>
                    <p className="text-gray-400 text-[11px] mt-1">Redirecting to login page...</p>
                  </div>
                  <Link 
                    to="/login"
                    className="inline-block px-10 h-14 bg-[#333] text-white font-bold text-[12px] tracking-[0.2em] uppercase rounded-xl hover:bg-[#E84949] transition-all flex items-center justify-center gap-3"
                  >
                    LOGIN NOW
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
