import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// Localized Font Import to avoid global CSS conflicts
const FontLoader = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    .font-grandstander { font-family: 'Grandstander', sans-serif; }
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}} />
)

const ContactInfoCard = ({ icon: Icon, title, content }) => (
  <div className="flex gap-4 p-6 md:p-8 bg-white border-[1.6px] border-dashed border-[#333333] rounded-[16px]">
    <div className="w-12 h-12 rounded-full bg-[#F9EAD3] flex items-center justify-center text-[#E84949] flex-shrink-0">
      <Icon size={20} />
    </div>
    <div className="font-roboto">
      <h3 className="text-[18px] md:text-[20px] font-grandstander font-black text-[#333333] mb-1 uppercase tracking-tight">{title}</h3>
      <p className="text-[14px] text-[#666] leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  </div>
)

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] pb-20 overflow-x-hidden">
      <FontLoader />

      {/* Map Header */}
      <div className="w-full h-[350px] md:h-[450px] bg-gray-200 overflow-hidden relative grayscale-[0.3]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716179376123!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">

          {/* Left Column: Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-grandstander font-black text-[#333333] mb-6 uppercase leading-[1.1] tracking-tight text-center lg:text-left">Our Information</h2>
              <p className="text-[15px] md:text-[16px] text-[#666] leading-relaxed font-roboto text-center lg:text-left max-w-xl lg:max-w-none mx-auto lg:mx-0">
                Our web company consists of web programmers and designers with extensive experience in the web market. Each of us worked as hired worker to create templates for Magento, Shopify, Wordpress and others.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <ContactInfoCard
                icon={MapPin}
                title="Address"
                content="1010-white street block, usa"
              />
              <ContactInfoCard
                icon={Phone}
                title="Phone"
                content="+01 0123 456 789"
              />
              <ContactInfoCard
                icon={Mail}
                title="Email"
                content="admin@gmail.com"
              />
              <ContactInfoCard
                icon={Clock}
                title="Open Hours"
                content="Daily 10:00 - 17:00"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-14 lg:p-16 border-[1.6px] border-dashed border-[#333333] rounded-[24px] md:rounded-[40px] shadow-sm">
            <h2 className="text-3xl md:text-5xl font-grandstander font-black text-[#333333] mb-10 uppercase tracking-tight">Contact Form</h2>
            <form className="space-y-6 font-roboto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#333] uppercase ml-1 tracking-widest">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-14 bg-[#F9EAD3] border-[1.2px] border-dashed border-[#333] rounded-[10px] px-6 text-[14px] focus:outline-none focus:border-[#E84949] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-[#333] uppercase ml-1 tracking-widest">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 bg-[#F9EAD3] border-[1.2px] border-dashed border-[#333] rounded-[10px] px-6 text-[14px] focus:outline-none focus:border-[#E84949] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#333] uppercase ml-1 tracking-widest">Phone number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full h-14 bg-[#F9EAD3] border-[1.2px] border-dashed border-[#333] rounded-[10px] px-6 text-[14px] focus:outline-none focus:border-[#E84949] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#333] uppercase ml-1 tracking-widest">Comment</label>
                <textarea
                  rows="4"
                  placeholder="Your message here..."
                  className="w-full bg-[#F9EAD3] border-[1.2px] border-dashed border-[#333] rounded-[10px] p-6 text-[14px] focus:outline-none focus:border-[#E84949] transition-all resize-none"
                ></textarea>
              </div>
              <button className="h-14 px-12 bg-[#E84949] text-white rounded-full font-black text-[13px] tracking-[0.2em] uppercase hover:opacity-90 shadow-xl transition-all shadow-[#E84949]/20 font-roboto">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
