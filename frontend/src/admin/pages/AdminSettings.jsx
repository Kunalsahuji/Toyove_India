import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Shield, Bell, Palette, Globe, 
  Save, RefreshCcw, Camera, Mail, Lock
} from 'lucide-react'

export function AdminSettings() {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    { id: 'profile', label: 'Admin Profile', icon: <User size={18} /> },
    { id: 'site', label: 'Site Config', icon: <Globe size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  ]

  return (
    <div className="shell space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Configure your workspace and platform preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest transition-all ${
                activeSection === section.id 
                ? 'bg-[#6651A4] text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-[#FAEAD3]/50 hover:text-gray-800 border border-black/[0.03]'
              }`}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-black/[0.03] min-h-[500px]"
          >
            {activeSection === 'profile' && <ProfileSettings />}
            {activeSection === 'site' && <SiteSettings />}
            {activeSection === 'security' && <SecuritySettings />}
            {activeSection === 'notifications' && <NotificationSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="w-24 h-24 bg-[#FAEAD3] rounded-full flex items-center justify-center text-[#6651A4] border-4 border-white shadow-md">
            <User size={40} />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#6651A4] text-white rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-grandstander font-bold text-gray-800">Admin Identity</h3>
          <p className="text-sm text-gray-500">Super Admin • Last login: 2 hours ago</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Full Name</label>
          <input type="text" defaultValue="Super Admin User" className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Email Address</label>
          <input type="email" defaultValue="admin@toyovoindia.com" className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all" />
        </div>
      </div>

      <div className="pt-6 border-t border-black/[0.03]">
        <button className="h-12 px-8 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] transition-all flex items-center gap-2">
          <Save size={16} /> Update Profile
        </button>
      </div>
    </div>
  )
}

function SiteSettings() {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-grandstander font-bold text-gray-800">Platform Configuration</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-6 bg-[#FDF4E6]/50 rounded-2xl border border-black/[0.02]">
          <div>
            <p className="font-bold text-gray-800 text-[14px]">Maintenance Mode</p>
            <p className="text-[11px] text-gray-500">Disable the storefront for all users during updates.</p>
          </div>
          <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-all flex items-center p-1">
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </button>
        </div>

        <div className="flex items-center justify-between p-6 bg-[#FDF4E6]/50 rounded-2xl border border-black/[0.02]">
          <div>
            <p className="font-bold text-gray-800 text-[14px]">User Registrations</p>
            <p className="text-[11px] text-gray-500">Allow new explorers to create accounts.</p>
          </div>
          <button className="w-12 h-6 bg-green-500 rounded-full relative transition-all flex items-center justify-end p-1">
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </button>
        </div>
      </div>

      <div className="pt-6 border-t border-black/[0.03]">
        <button className="h-12 px-8 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] transition-all flex items-center gap-2">
          <RefreshCcw size={16} /> Sync All Changes
        </button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-grandstander font-bold text-gray-800">Security & Authentication</h3>
      <div className="grid grid-cols-1 gap-6">
         <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Lock className="text-red-500" />
               <div>
                  <p className="font-bold text-gray-800 text-[14px]">Change Password</p>
                  <p className="text-[11px] text-gray-500">Last updated 3 months ago.</p>
               </div>
            </div>
            <button className="h-10 px-6 bg-white text-red-500 border border-red-100 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all">Reset</button>
         </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-grandstander font-bold text-gray-800">Notification Preferences</h3>
      <p className="text-sm text-gray-500 italic">Configure how you receive system alerts and order updates.</p>
      <div className="space-y-4">
         {['Email Alerts', 'Browser Push', 'Order SMS Notifications'].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-black/[0.03] last:border-0">
               <span className="text-[14px] font-medium text-gray-700">{item}</span>
               <button className="w-12 h-6 bg-[#6651A4] rounded-full relative transition-all flex items-center justify-end p-1">
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
               </button>
            </div>
         ))}
      </div>
    </div>
  )
}
