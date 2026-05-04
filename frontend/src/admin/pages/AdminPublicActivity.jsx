import { useState } from 'react'
import { Activity, Clock, Eye, EyeOff, MapPin, TimerReset } from 'lucide-react'

const initialActivities = [
  { id: 'ACT-1001', message: 'Someone from Mumbai purchased Soft Toy', city: 'Mumbai', delay: '2-5 min', status: 'Public', product: 'Soft Toy' },
  { id: 'ACT-1002', message: 'A customer from Pune ordered Board Game', city: 'Pune', delay: '2-5 min', status: 'Public', product: 'Board Game' },
  { id: 'ACT-1003', message: 'Priya S. from Delhi bought Musical Toy', city: 'Delhi', delay: '2-5 min', status: 'Hidden', product: 'Musical Toy' },
]

export function AdminPublicActivity() {
  const [activities, setActivities] = useState(initialActivities)

  const toggle = (id) => {
    setActivities(prev => prev.map(activity => activity.id === id ? { ...activity, status: activity.status === 'Public' ? 'Hidden' : 'Public' } : activity))
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div>
        <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Live Popups</h1>
        <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Control real purchase popups without annoying repeat behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['First Popup', '10-20 sec', <Clock size={20} />],
          ['Next Popup', '2-5 min', <TimerReset size={20} />],
          ['Privacy', 'Masked names', <EyeOff size={20} />],
        ].map(([label, value, icon]) => (
          <div key={label} className="bg-white rounded-[24px] p-5 border border-black/[0.03] shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FAEAD3] text-[#F1641E] rounded-2xl flex items-center justify-center">{icon}</div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
              <p className="text-xl font-grandstander font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm divide-y divide-gray-50 overflow-hidden">
        {activities.map(activity => (
          <div key={activity.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FDF4E6]/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#6651A4] flex items-center justify-center shrink-0"><Activity size={20} /></div>
              <div>
                <h3 className="font-bold text-gray-800 text-[14px] md:text-[16px]">{activity.message}</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {activity.city}</span>
                  <span>{activity.product}</span>
                  <span>Interval {activity.delay}</span>
                </p>
              </div>
            </div>
            <button onClick={() => toggle(activity.id)} className={`h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activity.status === 'Public' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {activity.status === 'Public' ? <Eye size={14} /> : <EyeOff size={14} />}
              {activity.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
