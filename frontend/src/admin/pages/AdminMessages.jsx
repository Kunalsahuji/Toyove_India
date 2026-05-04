import { Mail, MessageSquare, Search, UserRound } from 'lucide-react'

const messages = [
  { id: 'MSG-101', name: 'Aarav Mehta', email: 'aarav@example.com', type: 'Contact', subject: 'Bulk order for school toys', status: 'Unread' },
  { id: 'MSG-102', name: 'Neha Singh', email: 'neha@example.com', type: 'Newsletter', subject: 'Subscribed to weekly offers', status: 'Read' },
  { id: 'MSG-103', name: 'Rohan Gupta', email: 'rohan@example.com', type: 'Support', subject: 'Need help with order tracking', status: 'Unread' },
]

export function AdminMessages() {
  return (
    <div className="shell space-y-6 pb-10">
      <div>
        <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Contact forms, newsletter leads, and customer support entry points.</p>
      </div>

      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search messages..." className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all" />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm divide-y divide-gray-50 overflow-hidden">
        {messages.map(message => (
          <div key={message.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FDF4E6]/40 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center shrink-0">
                {message.type === 'Newsletter' ? <Mail size={20} /> : <MessageSquare size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-[14px] md:text-[16px]">{message.subject}</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2"><UserRound size={12} /> {message.name} - {message.email}</p>
              </div>
            </div>
            <span className={`h-8 px-3 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center ${message.status === 'Unread' ? 'bg-[#E8312A]/10 text-[#E8312A]' : 'bg-gray-100 text-gray-400'}`}>{message.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
