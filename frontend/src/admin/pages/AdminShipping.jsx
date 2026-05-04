import { Plus, Route, Truck } from 'lucide-react'

const methods = [
  { id: 'SHP-STD', name: 'Standard Shipping', eta: '3-5 days', charge: '₹15', rule: 'Default India-wide shipping', status: 'Active' },
  { id: 'SHP-EXP', name: 'Express Delivery', eta: '1-2 days', charge: '₹45', rule: 'Metro and serviceable pincodes', status: 'Active' },
  { id: 'SHP-FREE', name: 'Free Shipping', eta: '3-5 days', charge: '₹0', rule: 'Above ₹999 or coupon based', status: 'Active' },
]

export function AdminShipping() {
  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Shipping</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Manage delivery methods, rate rules, and future logistics integrations.</p>
        </div>
        <button className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg hover:bg-[#5a4892] transition-all w-full md:w-max flex items-center justify-center gap-2">
          <Plus size={16} /> New Rate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {methods.map(method => (
          <div key={method.id} className="bg-white rounded-[32px] p-6 border border-black/[0.03] shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center"><Truck size={22} /></div>
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest">{method.status}</span>
            </div>
            <h3 className="text-xl font-grandstander font-bold text-gray-800 mt-6">{method.name}</h3>
            <p className="text-[12px] text-gray-500 mt-1">{method.rule}</p>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest"><Route size={13} /> {method.eta}</span>
              <span className="text-2xl font-grandstander font-bold text-[#E8312A]">{method.charge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
