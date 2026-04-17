import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Star, Users, Trophy } from 'lucide-react'

// Localized Font Import to avoid global CSS conflicts
const FontLoader = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @import url('https://fonts.googleapis.com/css2?family=Grandstander:wght@600;700;800;900&family=Roboto:wght@400;500;700;900&display=swap');
    .font-grandstander { font-family: 'Grandstander', sans-serif; }
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}} />
)

const TeamMemberCard = ({ name, role, img }) => (
  <div className="group relative">
    <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border border-gray-100">
      <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
    <div className="mt-[-20px] relative z-10 mx-3 md:mx-4 bg-[#E84949] p-3 md:p-4 rounded-xl text-center shadow-lg shadow-[#E84949]/20 group-hover:-translate-y-1 transition-transform duration-300 font-roboto">
      <h4 className="text-white font-black text-[13px] md:text-[15px] uppercase tracking-wider">{name}</h4>
      <p className="text-white/80 text-[10px] font-bold uppercase tracking-tight">{role}</p>
    </div>
  </div>
)

const MetricCard = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center text-center p-6 md:p-8 bg-white border-[1.6px] border-dashed border-[#333333] rounded-[24px] shadow-sm">
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#F9EAD3] flex items-center justify-center text-[#E84949] mb-6 flex-shrink-0">
      <Icon size={24} />
    </div>
    <h3 className="text-3xl md:text-4xl font-grandstander font-black text-[#333333] mb-2">{value}</h3>
    <p className="text-[12px] md:text-[13px] font-bold text-[#666] uppercase tracking-[0.2em] font-roboto">{label}</p>
  </div>
)

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#FDF4E6] pb-20 overflow-x-hidden">
      <FontLoader />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#333]/20 z-10" />
        <img src="https://toykio.myshopify.com/cdn/shop/files/about-us.webp?v=1711002747" alt="About Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 w-full">
          <p className="text-[#E84949] font-black text-[12px] md:text-[14px] tracking-[0.4em] uppercase mb-4 drop-shadow-sm font-roboto">About Toyove India</p>
          <h1 className="text-4xl md:text-7xl font-grandstander font-black text-white drop-shadow-2xl leading-none">OUR STORY</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 mt-16 md:mt-32">
        {/* Story Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-center">
          <div className="text-center lg:text-left">
            <span className="text-[#E84949] font-black text-[11px] md:text-[13px] uppercase tracking-[0.3em] mb-4 block font-roboto">Toyove Vision</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-grandstander font-black text-[#333333] leading-[1.1] mb-8 uppercase tracking-tight">Every Toy Tells a Adventure Story</h2>
            <div className="space-y-6 text-[15px] md:text-[16px] text-[#666] leading-relaxed font-roboto max-w-2xl mx-auto lg:mx-0">
              <p>Welcome to Toyove, where innovation meets the timeless magic of play. Our journey began with a simple mission: to create toys that don't just entertain, but inspire children to explore the world around them.</p>
              <p>At Toyove, we believe that toys are the building blocks of childhood memories. That’s why we meticulously design each product to ensure the highest standards of safety, quality, and creative potential.</p>
            </div>
          </div>
          <div className="relative group p-4">
            <div className="aspect-[4/3] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl skew-x-[-1deg] group-hover:skew-x-0 transition-all duration-700">
              <img src="https://toykio.myshopify.com/cdn/shop/files/about-us.webp?v=1711002747" alt="Story" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-left-10 w-40 h-40 md:w-48 md:h-48 bg-[#E84949] rounded-[24px] md:rounded-[32px] flex items-center justify-center p-6 md:p-8 -rotate-6 shadow-xl hidden sm:flex">
              <p className="text-white font-grandstander font-black text-[18px] md:text-2xl text-center leading-tight uppercase">10+ Years of Quality</p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-32 md:mt-48">
          <MetricCard icon={Users} value="50K+" label="Happy Kids" />
          <MetricCard icon={Star} value="4.9" label="Avg Rating" />
          <MetricCard icon={CheckCircle2} value="200+" label="Safe Designs" />
          <MetricCard icon={Trophy} value="12" label="Global Awards" />
        </div>

        {/* Meet Our Team Section */}
        <div className="mt-32 md:mt-48 mb-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-grandstander font-black text-[#333333] mb-4 uppercase tracking-tight">Meet Our Team</h2>
            <p className="text-[#666] font-bold tracking-[0.3em] uppercase text-[11px] md:text-[12px] font-roboto">The Minds Behind the Magic</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <TeamMemberCard name="David K" role="Founder & CEO" img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" />
            <TeamMemberCard name="John Doe" role="Head of Design" img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" />
            <TeamMemberCard name="Jemis P" role="Product Expert" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" />
            <TeamMemberCard name="Michel R" role="Quality Assurance" img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" />
          </div>
        </div>
      </div>
    </div>
  )
}
