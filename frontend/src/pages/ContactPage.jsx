import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

// Localized Font Import to avoid global CSS conflicts
const FontLoader = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    .font-grandstander { font-family: 'Grandstander', sans-serif; }
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}} />
)

const ContactInfoItem = ({ icon: Icon, title, content }) => (
  <div className="flex items-start gap-4 py-4 group">
    <div className="text-[#333333] mt-1 group-hover:text-[#E84949] transition-colors">
      <Icon size={20} strokeWidth={1.5} />
    </div>
    <div className="font-roboto">
      <h3 className="text-[17px] font-grandstander font-black text-[#333333] mb-1 uppercase tracking-tight group-hover:text-[#E84949] transition-colors">{title}</h3>
      <p className="text-[15px] text-[#666] leading-relaxed whitespace-pre-line">{content}</p>
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
      
      {/* Map Header - Full Width */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-200 overflow-hidden relative grayscale-[0.2] border-b-[1px] border-[#E5E5E5]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716179376123!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-20 md:mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-32">
          
          {/* Left Column: Our Information */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[32px] md:text-[42px] font-grandstander font-black text-[#333333] uppercase leading-tight tracking-tight">Our Information</h2>
            <p className="text-[15px] text-[#666] leading-relaxed font-roboto">
              Our web company consists of web programmers and designers with extensive experience in the web market. Each of us worked as hired worker to create templates for Magento, Shopify, Wordpress and others.
            </p>
            
            <div className="mt-4 flex flex-col gap-2">
              <ContactInfoItem 
                icon={MapPin} 
                title="Address" 
                content="1010-white street block, usa" 
              />
              <ContactInfoItem 
                icon={Phone} 
                title="Phone" 
                content="+01 0123 456 789" 
              />
              <ContactInfoItem 
                icon={Mail} 
                title="Email" 
                content="admin@gmail.com" 
              />
              <ContactInfoItem 
                icon={Clock} 
                title="Open Hours" 
                content="Monday to friday 09:30 - 18:30 saturday & sunday 10:00 - 17:00" 
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[32px] md:text-[42px] font-grandstander font-black text-[#333333] uppercase leading-tight tracking-tight">Contact Form</h2>
            
            <form className="space-y-6 font-roboto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full h-[54px] bg-[#F9EAD3] border-[1.2px] border-[#333333]/20 rounded-md px-6 text-[14px] font-roboto focus:outline-none focus:border-[#333333] transition-all" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full h-[54px] bg-[#F9EAD3] border-[1.2px] border-[#333333]/20 rounded-md px-6 text-[14px] font-roboto focus:outline-none focus:border-[#333333] transition-all" 
                />
              </div>
              <input 
                type="tel" 
                placeholder="Phone number" 
                className="w-full h-[54px] bg-[#F9EAD3] border-[1.2px] border-[#333333]/20 rounded-md px-6 text-[14px] font-roboto focus:outline-none focus:border-[#333333] transition-all" 
              />
              <textarea 
                rows="6" 
                placeholder="Comment" 
                className="w-full bg-[#F9EAD3] border-[1.2px] border-[#333333]/20 rounded-md p-6 text-[14px] font-roboto focus:outline-none focus:border-[#333333] transition-all resize-none"
              ></textarea>
              
              <div className="pt-4">
                <button className="h-[54px] px-12 bg-[#E84949] text-white rounded-md font-black text-[13px] tracking-[0.2em] uppercase hover:bg-[#333333] transition-all shadow-md">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
