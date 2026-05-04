import { useMemo, useState } from 'react'
import { Calendar, Plus, Search, TicketPercent, ToggleLeft, ToggleRight } from 'lucide-react'

const initialCoupons = [
  { id: 'CPN-101', code: 'TOYOVO10', title: 'Storewide Launch Offer', type: 'Percentage', value: '10%', min: '₹499', used: 24, status: 'Active', expires: '30 Jun 2026' },
  { id: 'CPN-102', code: 'WELCOME100', title: 'First Order Reward', type: 'Fixed', value: '₹100', min: '₹999', used: 11, status: 'Active', expires: '31 Jul 2026' },
  { id: 'CPN-103', code: 'FREESHIP999', title: 'Free Shipping Unlock', type: 'Shipping', value: 'Free', min: '₹999', used: 44, status: 'Active', expires: '31 Dec 2026' },
  { id: 'CPN-104', code: 'BOARD20', title: 'Board Games Campaign', type: 'Category', value: '20%', min: '₹699', used: 8, status: 'Paused', expires: '15 Aug 2026' },
]

export function AdminCoupons() {
  const [search, setSearch] = useState('')
  const [coupons, setCoupons] = useState(initialCoupons)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return coupons.filter(coupon => !term || coupon.code.toLowerCase().includes(term) || coupon.title.toLowerCase().includes(term))
  }, [coupons, search])

  const toggleStatus = (id) => {
    setCoupons(prev => prev.map(coupon => coupon.id === id ? { ...coupon, status: coupon.status === 'Active' ? 'Paused' : 'Active' } : coupon))
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Coupons</h1>
          <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Create controlled discounts for checkout, categories, and shipping.</p>
        </div>
        <button className="h-11 px-6 bg-[#6651A4] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-[11px] shadow-lg hover:bg-[#5a4892] transition-all w-full md:w-max flex items-center justify-center gap-2">
          <Plus size={16} /> New Coupon
        </button>
      </div>

      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search coupon code..." className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((coupon) => (
          <div key={coupon.id} className="bg-white rounded-[32px] p-6 border border-black/[0.03] shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center shrink-0"><TicketPercent size={22} /></div>
              <button onClick={() => toggleStatus(coupon.id)} className={coupon.status === 'Active' ? 'text-green-500' : 'text-gray-300'}>
                {coupon.status === 'Active' ? <ToggleRight size={30} /> : <ToggleLeft size={30} />}
              </button>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{coupon.type} Discount</p>
              <h3 className="text-2xl font-grandstander font-bold text-gray-800 mt-1">{coupon.code}</h3>
              <p className="text-[12px] text-gray-500 font-medium mt-1">{coupon.title}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-[#FDF4E6]/70 rounded-2xl p-3">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Value</p>
                <p className="text-lg font-grandstander font-bold text-[#E8312A]">{coupon.value}</p>
              </div>
              <div className="bg-[#FDF4E6]/70 rounded-2xl p-3">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Minimum</p>
                <p className="text-lg font-grandstander font-bold text-gray-700">{coupon.min}</p>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
              <span>{coupon.used} used</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {coupon.expires}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
