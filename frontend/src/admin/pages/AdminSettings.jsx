import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Shield, Bell, Palette, Globe, 
  Save, RefreshCcw, Camera, Mail, Lock
} from 'lucide-react'

export function AdminSettings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationsOpen, setRegistrationsOpen] = useState(true)
  
  const sections = [
    { id: 'profile', label: 'Admin Identity', icon: <User size={18} /> },
    { id: 'site', label: 'Platform Config', icon: <Globe size={18} /> },
    { id: 'security', label: 'Security & Access', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Alert Center', icon: <Bell size={18} /> },
  ]

  return (
    <div className="shell space-y-6 md:space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Configure your workspace and platform preferences.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar px-1">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-5 py-3 md:py-4 rounded-2xl text-[9px] md:text-[12px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeSection === section.id 
                ? 'bg-[#6651A4] text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-[#FAEAD3]/50 hover:text-gray-800 border border-black/[0.03]'
              }`}
            >
              <span className="shrink-0">{section.icon}</span> {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-black/[0.03] min-h-[400px] md:min-h-[500px]"
          >
            {activeSection === 'profile' && <ProfileSettings />}
            {activeSection === 'site' && (
              <SiteSettings 
                maintenanceMode={maintenanceMode} 
                setMaintenanceMode={setMaintenanceMode}
                registrationsOpen={registrationsOpen}
                setRegistrationsOpen={setRegistrationsOpen}
              />
            )}
            {activeSection === 'security' && <SecuritySettings />}
            {activeSection === 'notifications' && <NotificationSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  const [saving, setSaving] = useState(false)
  
  const handleUpdate = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1500)
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-center sm:text-left">
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FAEAD3] rounded-full flex items-center justify-center text-[#6651A4] border-4 border-white shadow-md overflow-hidden relative">
            <User size={64} className="opacity-20 absolute" />
            <span className="text-3xl font-grandstander font-bold">SA</span>
          </div>
          <button className="absolute bottom-1 right-1 w-10 h-10 bg-[#6651A4] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-white">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-grandstander font-bold text-gray-800">Admin Identity</h3>
          <p className="text-[12px] md:text-sm text-gray-500 mt-1 flex items-center gap-2 justify-center sm:justify-start">
            <Shield size={14} className="text-[#F1641E]" /> Super Admin • Last login: 2 hours ago
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Full Name</label>
          <input type="text" defaultValue="Super Admin User" className="w-full h-14 px-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" defaultValue="admin@toyovoindia.com" className="w-full h-14 pl-12 pr-5 bg-[#FDF4E6]/50 rounded-2xl outline-none border border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all text-sm" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-black/[0.03]">
        <button 
          onClick={handleUpdate}
          disabled={saving}
          className="w-full sm:w-auto h-12 px-10 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-[#5a4892] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
        >
          {saving ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Update Profile'}
        </button>
      </div>
    </div>
  )
}

function SiteSettings({ maintenanceMode, setMaintenanceMode, registrationsOpen, setRegistrationsOpen }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-grandstander font-bold text-gray-800">Platform Configuration</h3>
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-bold uppercase tracking-widest">System Online</span>
      </div>
      
      <div className="space-y-4 md:space-y-6">
        <div className={`flex items-center justify-between p-6 rounded-[24px] border transition-all ${maintenanceMode ? 'bg-orange-50 border-orange-100' : 'bg-[#FDF4E6]/50 border-black/[0.02]'}`}>
          <div className="pr-4">
            <p className="font-bold text-gray-800 text-[14px]">Maintenance Mode</p>
            <p className="text-[11px] text-gray-500 mt-1">Temporarily disable the storefront for maintenance.</p>
          </div>
          <button 
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-14 h-7 rounded-full relative transition-all flex items-center px-1 shrink-0 ${maintenanceMode ? 'bg-[#F1641E]' : 'bg-gray-200'}`}
          >
            <motion.div 
              animate={{ x: maintenanceMode ? 28 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md" 
            />
          </button>
        </div>

        <div className={`flex items-center justify-between p-6 rounded-[24px] border transition-all ${registrationsOpen ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
          <div className="pr-4">
            <p className="font-bold text-gray-800 text-[14px]">User Registrations</p>
            <p className="text-[11px] text-gray-500 mt-1">Allow new explorers to join the marketplace.</p>
          </div>
          <button 
            onClick={() => setRegistrationsOpen(!registrationsOpen)}
            className={`w-14 h-7 rounded-full relative transition-all flex items-center px-1 shrink-0 ${registrationsOpen ? 'bg-green-500' : 'bg-gray-400'}`}
          >
            <motion.div 
              animate={{ x: registrationsOpen ? 28 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md" 
            />
          </button>
        </div>
      </div>

      <div className="p-6 bg-[#6651A4]/5 rounded-2xl border border-[#6651A4]/10">
         <div className="flex items-center gap-3 text-[#6651A4] mb-2">
            <Globe size={18} />
            <p className="text-[13px] font-bold">SEO & Metadata</p>
         </div>
         <p className="text-[11px] text-gray-500 leading-relaxed">System is currently indexing 1.2k toys for search engines. All meta tags are optimized for 'Toykio' organic reach.</p>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-grandstander font-bold text-gray-800">Security & Authentication</h3>
      <div className="grid grid-cols-1 gap-6">
         <div className="p-6 md:p-8 bg-red-50 rounded-[24px] border border-red-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                  <Lock size={24} />
               </div>
               <div>
                  <p className="font-bold text-gray-800 text-[15px]">Change Security Key</p>
                  <p className="text-[12px] text-gray-500 mt-1">Ensure your admin password is rotated frequently.</p>
               </div>
            </div>
            <button className="h-11 px-8 bg-white text-red-500 border border-red-200 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm">Reset Password</button>
         </div>

         <div className="p-6 md:p-8 bg-[#FDF4E6]/50 rounded-[24px] border border-black/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6651A4] shadow-sm">
                  <Shield size={24} />
               </div>
               <div>
                  <p className="font-bold text-gray-800 text-[15px]">Two-Factor Auth</p>
                  <p className="text-[12px] text-gray-500 mt-1">Add an extra layer of protection to your account.</p>
               </div>
            </div>
            <button className="text-[11px] font-bold text-[#6651A4] uppercase tracking-widest hover:underline">Enable</button>
         </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    sms: false
  })

  return (
    <div className="space-y-8">
      <div>
         <h3 className="text-xl font-grandstander font-bold text-gray-800">Alert Center</h3>
         <p className="text-[12px] text-gray-500 mt-1">Stay informed about orders and system health.</p>
      </div>

      <div className="space-y-2">
         {[
           { id: 'email', label: 'Email Alerts', sub: 'Receive daily summary of sales.' },
           { id: 'push', label: 'Browser Push', sub: 'Instant alerts for new orders.' },
           { id: 'sms', label: 'SMS Gateway', sub: 'Critical system failure alerts.' }
         ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-5 hover:bg-[#FDF4E6]/30 rounded-2xl transition-all">
               <div>
                  <p className="text-[14px] font-bold text-gray-800">{item.label}</p>
                  <p className="text-[11px] text-gray-400">{item.sub}</p>
               </div>
               <button 
                  onClick={() => setPrefs({...prefs, [item.id]: !prefs[item.id]})}
                  className={`w-12 h-6 rounded-full relative transition-all flex items-center px-1 ${prefs[item.id] ? 'bg-[#6651A4]' : 'bg-gray-200'}`}
               >
                  <motion.div 
                    animate={{ x: prefs[item.id] ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full shadow-md" 
                  />
               </button>
            </div>
         ))}
      </div>
    </div>
  )
}
