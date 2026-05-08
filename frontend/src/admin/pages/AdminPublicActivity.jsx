import { useEffect, useMemo, useState } from 'react'
import { Activity, Clock, EyeOff, Save, TimerReset } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { getAdminPurchasePopupSettings, updateAdminPurchasePopupSettings } from '../../services/siteApi'

export function AdminPublicActivity() {
  const { success, error: showError } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    enabled: true,
    initialDelaySeconds: 60,
    repeatDelaySeconds: 120,
    visibleDurationSeconds: 10,
    maskNames: true,
  })
  const [activities, setActivities] = useState([])

  useEffect(() => {
    let isMounted = true

    const loadPopupSettings = async () => {
      try {
        const data = await getAdminPurchasePopupSettings()
        if (!isMounted) return
        setSettings(data.settings || settings)
        setActivities(data.activities || [])
      } catch (error) {
        if (isMounted) showError(error.message || 'Popup settings could not be loaded')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadPopupSettings()
    return () => {
      isMounted = false
    }
  }, [showError])

  const publicActivities = useMemo(() => activities.slice(0, 10), [activities])

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateAdminPurchasePopupSettings({
        enabled: settings.enabled,
        initialDelaySeconds: Number(settings.initialDelaySeconds),
        repeatDelaySeconds: Number(settings.repeatDelaySeconds),
        visibleDurationSeconds: Number(settings.visibleDurationSeconds),
        maskNames: settings.maskNames,
      })
      setSettings(updated)
      success('Live popup settings updated.')
    } catch (error) {
      showError(error.message || 'Live popup settings could not be updated')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Live Popups</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Control purchase popups and their timing.</p>
        </div>
        <button onClick={handleSave} disabled={loading || saving} className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg flex items-center gap-2 disabled:opacity-60">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#FAEAD3] text-[#F1641E] rounded-2xl flex items-center justify-center"><Clock size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">First Popup</p>
            <input type="number" min="0" max="600" value={settings.initialDelaySeconds} onChange={(e) => setSettings((prev) => ({ ...prev, initialDelaySeconds: e.target.value }))} className="w-20 mt-1 bg-transparent text-xl font-grandstander font-bold text-gray-800 outline-none" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#FAEAD3] text-[#F1641E] rounded-2xl flex items-center justify-center"><TimerReset size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Repeat Gap</p>
            <input type="number" min="30" max="3600" value={settings.repeatDelaySeconds} onChange={(e) => setSettings((prev) => ({ ...prev, repeatDelaySeconds: e.target.value }))} className="w-20 mt-1 bg-transparent text-xl font-grandstander font-bold text-gray-800 outline-none" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 bg-[#FAEAD3] text-[#F1641E] rounded-2xl flex items-center justify-center"><Activity size={20} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visible For</p>
            <input type="number" min="5" max="60" value={settings.visibleDurationSeconds} onChange={(e) => setSettings((prev) => ({ ...prev, visibleDurationSeconds: e.target.value }))} className="w-20 mt-1 bg-transparent text-xl font-grandstander font-bold text-gray-800 outline-none" />
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FAEAD3] text-[#F1641E] rounded-2xl flex items-center justify-center"><EyeOff size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Privacy</p>
              <p className="text-xl font-grandstander font-bold text-gray-800">{settings.maskNames ? 'Masked' : 'Visible'}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <input type="checkbox" checked={settings.enabled} onChange={(e) => setSettings((prev) => ({ ...prev, enabled: e.target.checked }))} />
              Enabled
            </label>
            <label className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
              <input type="checkbox" checked={settings.maskNames} onChange={(e) => setSettings((prev) => ({ ...prev, maskNames: e.target.checked }))} />
              Mask Names
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm divide-y divide-gray-50 overflow-hidden">
        {loading ? (
          <div className="p-6 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Loading recent activity...</div>
        ) : publicActivities.length === 0 ? (
          <div className="p-6 text-[12px] font-bold text-gray-400 uppercase tracking-widest">No paid orders available for live popup activity.</div>
        ) : (
          publicActivities.map((activity) => (
            <div key={activity.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FDF4E6]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#6651A4] flex items-center justify-center shrink-0"><Activity size={20} /></div>
                <div>
                  <h3 className="font-bold text-gray-800 text-[14px] md:text-[16px]">{activity.name} purchased {activity.product}</h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {activity.city || 'India'} • {(new Date(activity.createdAt)).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
              <span className="h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-green-50 text-green-600">
                Public
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
