import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// Localized Font Import to avoid global CSS conflicts
const FontLoader = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    .font-grandstander { font-family: 'Grandstander', sans-serif; }
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}} />
)

const ContactInfoCard = ({ icon: Icon, title, content }) => (
  <div className="group flex gap-5 p-8 bg-[#F9EAD3] border-[1.6px] border-dashed border-[#333333] rounded-[24px] shadow-sm hover:shadow-xl hover:translate-y-[-5px] transition-all duration-500">
    <div className="w-14 h-14 rounded-full bg-white border-[1.6px] border-dashed border-[#E84949] flex items-center justify-center text-[#E84949] flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg]">
      <Icon size={24} />
    </div>
    <div className="font-roboto">
      <h3 className="text-[20px] md:text-[22px] font-grandstander font-black text-[#333333] mb-2 uppercase tracking-tight group-hover:text-[#E84949] transition-colors">{title}</h3>
      <p className="text-[15px] text-[#666] leading-relaxed whitespace-pre-line group-hover:text-[#333] transition-colors">{content}</p>
    </div>
  </div>
)

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] pb-24 overflow-x-hidden">
      <FontLoader />
      
      {/* Map Header */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-200 overflow-hidden relative grayscale-[0.2] border-b-[2px] border-dashed border-[#333333]/20">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716179376123!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Google Map"
        ></iframe>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FDF4E6] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-20 md:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32">
          
          {/* Left Column: Info */}
          <div className="space-y-12">
            <div>
              <span className="text-[#E84949] font-black text-[12px] md:text-[14px] uppercase tracking-[0.4em] mb-4 block font-roboto text-center lg:text-left">Reach Out Anytime</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-grandstander font-black text-[#333333] mb-8 uppercase leading-[1.1] tracking-tighter text-center lg:text-left">Our Information</h2>
              <p className="text-[16px] md:text-[18px] text-[#666] leading-relaxed font-roboto text-center lg:text-left max-w-xl lg:max-w-none mx-auto lg:mx-0">
                Our web company consists of web programmers and designers with extensive experience in the web market. We are dedicated to creating the safest and most joyful experiences for your little ones.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              <ContactInfoCard 
                icon={MapPin} 
                title="Address" 
                content="1010-white street block, usa\nNew York, NY 10001" 
              />
              <ContactInfoCard 
                icon={Phone} 
                title="Phone" 
                content="+01 0123 456 789\n+01 987 654 321" 
              />
              <ContactInfoCard 
                icon={Mail} 
                title="Email" 
                content="support@toyove.com\nadmin@gmail.com" 
              />
              <ContactInfoCard 
                icon={Clock} 
                title="Open Hours" 
                content="Mon - Fri: 10:00 - 17:00\nSat - Sun: 11:00 - 15:00" 
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#F9EAD3] p-10 md:p-16 border-[2px] border-dashed border-[#333333] rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E84949]/5 rounded-bl-full pointer-events-none -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
            <h2 className="text-4xl md:text-6xl font-grandstander font-black text-[#333333] mb-12 uppercase tracking-tighter">Get In Touch</h2>
            <form className="space-y-8 font-roboto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group/input space-y-3">
                  <label className="text-[13px] font-black text-[#333] uppercase ml-1 tracking-widest">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full h-16 bg-white border-[1.6px] border-dashed border-[#333]/20 rounded-2xl px-8 text-[15px] focus:outline-none focus:border-[#E84949] focus:bg-white transition-all shadow-sm focus:shadow-md" 
                  />
                </div>
                <div className="group/input space-y-3">
                  <label className="text-[13px] font-black text-[#333] uppercase ml-1 tracking-widest">Email</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full h-16 bg-white border-[1.6px] border-dashed border-[#333]/20 rounded-2xl px-8 text-[15px] focus:outline-none focus:border-[#E84949] focus:bg-white transition-all shadow-sm focus:shadow-md" 
                  />
                </div>
              </div>
              <div className="group/input space-y-3">
                <label className="text-[13px] font-black text-[#333] uppercase ml-1 tracking-widest">Phone number</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number" 
                  className="w-full h-16 bg-white border-[1.6px] border-dashed border-[#333]/20 rounded-2xl px-8 text-[15px] focus:outline-none focus:border-[#E84949] focus:bg-white transition-all shadow-sm focus:shadow-md" 
                />
              </div>
              <div className="group/input space-y-3">
                <label className="text-[13px] font-black text-[#333] uppercase ml-1 tracking-widest">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Tell us about it..." 
                  className="w-full bg-white border-[1.6px] border-dashed border-[#333]/20 rounded-2xl p-8 text-[15px] focus:outline-none focus:border-[#E84949] focus:bg-white transition-all shadow-sm focus:shadow-md resize-none"
                ></textarea>
              </div>
              <button className="h-16 px-16 bg-[#E84949] text-white rounded-full font-black text-[14px] tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-xl shadow-[#E84949]/30 hover:shadow-[#E84949]/50 font-roboto">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
