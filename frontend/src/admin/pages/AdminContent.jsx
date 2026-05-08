import { useEffect, useState } from 'react'
import { Image, Megaphone, Save, Star } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { getAdminStorefrontSettings, updateAdminStorefrontSettings } from '../../services/siteApi'

const emptyMessages = ['', '', '']

export function AdminContent() {
  const { success, error: showError } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [messages, setMessages] = useState(emptyMessages)

  useEffect(() => {
    let isMounted = true

    const loadStorefront = async () => {
      try {
        const data = await getAdminStorefrontSettings()
        if (!isMounted) return
        const nextMessages = [...(data.announcementMessages || []), '', '', ''].slice(0, 3)
        setMessages(nextMessages)
      } catch (error) {
        if (isMounted) showError(error.message || 'Storefront settings could not be loaded')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadStorefront()
    return () => {
      isMounted = false
    }
  }, [showError])

  const handleSave = async () => {
    const announcementMessages = messages.map((item) => item.trim()).filter(Boolean)
    if (announcementMessages.length === 0) {
      showError('At least one announcement message is required.')
      return
    }

    setSaving(true)
    try {
      const data = await updateAdminStorefrontSettings({ announcementMessages })
      setMessages([...(data.announcementMessages || []), '', '', ''].slice(0, 3))
      success('Storefront messages updated.')
    } catch (error) {
      showError(error.message || 'Storefront messages could not be updated')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div>
        <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Storefront</h1>
        <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Control the announcement bar and storefront messaging.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-[32px] p-6 md:p-8 border border-black/[0.03] shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-grandstander font-bold text-gray-800">Announcement Bar</h2>
              <p className="text-[12px] text-gray-400 font-medium mt-1">These messages rotate in the top header.</p>
            </div>
            <Megaphone className="text-[#F1641E]" />
          </div>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <input
                key={index}
                value={message}
                onChange={(event) => setMessages((prev) => prev.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
                disabled={loading}
                placeholder={`Announcement ${index + 1}`}
                className="w-full h-13 px-5 bg-[#FDF4E6]/60 rounded-2xl border border-transparent focus:border-[#F1641E]/30 outline-none text-[13px] font-bold text-gray-700 disabled:opacity-60"
              />
            ))}
          </div>
          <button onClick={handleSave} disabled={loading || saving} className="mt-6 h-12 px-8 bg-[#6651A4] text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-lg flex items-center gap-3 disabled:opacity-60">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Messages'}
          </button>
        </div>

        <div className="bg-[#6651A4] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full" />
          <Star size={28} className="text-[#F1641E] mb-8" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Featured Rules</p>
          <h3 className="text-3xl font-grandstander font-bold mt-2">Homepage Slots</h3>
          <p className="text-sm text-white/70 mt-3 leading-relaxed">Announcements now persist in the database and update the live storefront header after deployment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {['Hero Banner', 'Promo Banners', 'Brand Logos'].map((item) => (
          <div key={item} className="bg-white rounded-[28px] p-6 border border-black/[0.03] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center mb-5"><Image size={20} /></div>
            <h3 className="font-grandstander font-bold text-lg text-gray-800">{item}</h3>
            <p className="text-[12px] text-gray-400 mt-1">Media slots stay catalog-driven for now. Upload-backed controls can be added once Cloudinary admin uploads are wired.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
