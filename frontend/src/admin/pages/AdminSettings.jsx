import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 flex flex-col gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] md:text-[13px] font-bold uppercase tracking-widest transition-all ${
                activeSection === section.id 
                ? 'bg-[#6651A4] text-white shadow-lg translate-x-2' 
                : 'bg-white text-gray-400 hover:bg-[#FAEAD3]/50 hover:text-gray-800 border border-black/[0.03]'
              }`}
            >
              <span className={`shrink-0 ${activeSection === section.id ? 'text-white' : 'text-[#F1641E]'}`}>{section.icon}</span> 
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[32px] p-6 md:p-12 shadow-sm border border-black/[0.03] min-h-[500px]"
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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 bg-[#FAEAD3] rounded-full flex items-center justify-center text-[#6651A4] border-4 border-white shadow-xl overflow-hidden relative">
            <User size={64} className="opacity-20 absolute" />
            <span className="text-4xl font-grandstander font-bold">SA</span>
          </div>
          <button className="absolute bottom-2 right-2 w-11 h-11 bg-[#6651A4] text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-white">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-grandstander font-bold text-gray-800">Admin Identity</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 justify-center sm:justify-start font-medium">
            <Shield size={16} className="text-[#F1641E]" /> Super Admin • Privilege Level: 10
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Display Name</label>
          <input type="text" defaultValue="Super Admin User" className="w-full h-14 px-6 bg-[#FDF4E6]/50 rounded-2xl outline-none border-2 border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all" />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">System Email</label>
          <div className="relative">
            <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" defaultValue="admin@toyovoindia.com" className="w-full h-14 pl-14 pr-6 bg-[#FDF4E6]/50 rounded-2xl outline-none border-2 border-transparent focus:border-[#6651A4]/30 font-bold text-gray-700 transition-all" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-black/[0.03] flex justify-end">
        <button 
          onClick={handleUpdate}
          disabled={saving}
          className="h-14 px-12 bg-[#6651A4] text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-xl hover:bg-[#5a4892] disabled:opacity-50 transition-all flex items-center gap-3"
        >
          {saving ? <RefreshCcw size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Syncing...' : 'Commit Identity'}
        </button>
      </div>
    </div>
  )
}

function SiteSettings({ maintenanceMode, setMaintenanceMode, registrationsOpen, setRegistrationsOpen }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between border-b border-black/[0.03] pb-6">
        <div>
           <h3 className="text-2xl font-grandstander font-bold text-gray-800">Platform Config</h3>
           <p className="text-sm text-gray-500 font-medium">Control the global state of Toyovo India.</p>
        </div>
        <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
           Live
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-8 rounded-[32px] border-2 transition-all flex flex-col justify-between h-48 ${maintenanceMode ? 'bg-orange-50 border-[#F1641E]/20' : 'bg-[#FDF4E6]/50 border-black/[0.02]'}`}>
          <div>
            <p className="font-bold text-gray-800 text-lg flex items-center gap-3">
               Maintenance Mode
               {maintenanceMode && <div className="w-2 h-2 bg-[#F1641E] rounded-full animate-ping" />}
            </p>
            <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">Instantly lock the storefront for scheduled technical upgrades. Admins remain unaffected.</p>
          </div>
          <div className="flex justify-end">
             <button 
               onClick={() => setMaintenanceMode(!maintenanceMode)}
               className={`w-16 h-8 rounded-full relative transition-all flex items-center px-1 shrink-0 ${maintenanceMode ? 'bg-[#F1641E]' : 'bg-gray-200'}`}
             >
               <motion.div animate={{ x: maintenanceMode ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" />
             </button>
          </div>
        </div>

        <div className={`p-8 rounded-[32px] border-2 transition-all flex flex-col justify-between h-48 ${registrationsOpen ? 'bg-green-50 border-green-200/50' : 'bg-red-50 border-red-200/50'}`}>
          <div>
            <p className="font-bold text-gray-800 text-lg">Explorer Registrations</p>
            <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">Toggle the ability for new customers to create accounts and join the community.</p>
          </div>
          <div className="flex justify-end">
             <button 
               onClick={() => setRegistrationsOpen(!registrationsOpen)}
               className={`w-16 h-8 rounded-full relative transition-all flex items-center px-1 shrink-0 ${registrationsOpen ? 'bg-green-500' : 'bg-gray-300'}`}
             >
               <motion.div animate={{ x: registrationsOpen ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" />
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const [showReset, setShowReset] = useState(false)
  const [tfaEnabled, setTfaEnabled] = useState(false)

  return (
    <div className="space-y-12">
      <div className="border-b border-black/[0.03] pb-6">
         <h3 className="text-2xl font-grandstander font-bold text-gray-800">Security & Access</h3>
         <p className="text-sm text-gray-500 font-medium">Protect the admin command center with modern protocols.</p>
      </div>

      <div className="space-y-8">
         {/* Reset Password Form UI */}
         <div className="bg-white rounded-3xl border-2 border-black/[0.02] shadow-sm overflow-hidden flex flex-col items-center text-center p-8 space-y-6">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-xl">
               <Lock size={32} />
            </div>
            <div>
               <p className="font-bold text-gray-800 text-xl">Admin Credentials</p>
               <p className="text-[13px] text-gray-500 mt-2 max-w-sm">Regularly rotate your password for maximum security and platform integrity.</p>
            </div>
            
            <button 
               onClick={() => setShowReset(!showReset)}
               className="h-12 px-10 bg-white text-red-500 border border-red-100 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-red-500 hover:text-white transition-all shadow-md"
            >
               {showReset ? 'Discard Changes' : 'Setup New Key'}
            </button>
            
            <AnimatePresence>
               {showReset && (
                  <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="w-full space-y-6 overflow-hidden pt-4"
                  >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Current Key</label>
                           <input type="password" placeholder="••••••••" className="w-full h-12 px-5 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-red-500/30 font-bold transition-all" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">New Security Key</label>
                           <input type="password" placeholder="••••••••" className="w-full h-12 px-5 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-red-500/30 font-bold transition-all" />
                        </div>
                     </div>
                     <button className="h-12 w-full bg-[#E8312A] text-white rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg hover:bg-red-700 transition-all">Commit New Key</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* 2FA UI */}
         <div className="bg-white rounded-3xl border-2 border-black/[0.02] shadow-sm overflow-hidden flex flex-col items-center text-center p-8 space-y-6">
            <div className="w-16 h-16 bg-[#6651A4]/10 rounded-2xl flex items-center justify-center text-[#6651A4] shadow-xl">
               <Shield size={32} />
            </div>
            <div>
               <p className="font-bold text-gray-800 text-xl">Two-Factor Authentication (2FA)</p>
               <p className="text-[13px] text-gray-500 mt-2 max-w-sm">Verify your identity via mobile app before accessing sensitive command panels. (Recommended)</p>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
               <button 
                  onClick={() => setTfaEnabled(!tfaEnabled)}
                  className={`h-12 px-10 rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all shadow-md w-full sm:w-auto ${
                     tfaEnabled ? 'bg-green-500 text-white' : 'bg-white text-[#6651A4] border border-[#6651A4]/20 hover:bg-[#6651A4] hover:text-white'
                  }`}
               >
                  {tfaEnabled ? 'Enabled' : 'Setup 2FA'}
               </button>
               {tfaEnabled && <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest animate-pulse">Account Secure</p>}
            </div>
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
