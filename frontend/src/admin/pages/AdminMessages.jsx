import { useEffect, useMemo, useState } from 'react'
import { Mail, MessageSquare, Search, UserRound } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { getAdminMessages, updateAdminMessageStatus } from '../../services/messageApi'

export function AdminMessages() {
  const { success, error: showError } = useToast()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    let isMounted = true

    const loadMessages = async () => {
      try {
        const data = await getAdminMessages()
        if (!isMounted) return
        setMessages(data)
      } catch (error) {
        if (isMounted) showError(error.message || 'Messages could not be loaded')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMessages()
    return () => {
      isMounted = false
    }
  }, [showError])

  const filteredMessages = useMemo(() => messages.filter((message) => {
    const query = search.trim().toLowerCase()
    if (!query) return true
    return [message.name, message.email, message.subject, message.message, message.typeLabel]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query))
  }), [messages, search])

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateAdminMessageStatus(id, status)
      setMessages((prev) => prev.map((message) => (message.id === id ? updated : message)))
      success('Message status updated.')
    } catch (error) {
      showError(error.message || 'Message status could not be updated')
    }
  }

  return (
    <div className="shell space-y-6 pb-10">
      <div>
        <h1 className="text-2xl md:text-4xl font-grandstander font-bold text-gray-800">Messages</h1>
        <p className="text-gray-500 font-medium text-[12px] md:text-sm mt-1">Contact forms and customer support messages.</p>
      </div>

      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-black/[0.03]">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." className="w-full h-12 pl-12 pr-4 bg-[#FDF4E6]/50 rounded-xl outline-none border border-transparent focus:border-[#F1641E]/30 font-medium text-[13px] transition-all" />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-black/[0.03] shadow-sm divide-y divide-gray-50 overflow-hidden">
        {loading ? (
          <div className="p-6 text-[12px] font-bold text-gray-400 uppercase tracking-widest">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-6 text-[12px] font-bold text-gray-400 uppercase tracking-widest">No messages found.</div>
        ) : filteredMessages.map((message) => (
          <div key={message.id} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FDF4E6]/40 transition-colors">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[#FAEAD3] text-[#F1641E] flex items-center justify-center shrink-0">
                {message.type === 'newsletter' ? <Mail size={20} /> : <MessageSquare size={20} />}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-800 text-[14px] md:text-[16px]">{message.subject}</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2 flex-wrap"><UserRound size={12} /> {message.name} • {message.email} • {message.typeLabel}</p>
                <p className="text-[12px] text-gray-500 mt-2 line-clamp-2">{message.message}</p>
              </div>
            </div>
            <select value={message.status} onChange={(e) => handleStatusChange(message.id, e.target.value)} className="h-10 px-4 rounded-xl border border-black/[0.05] bg-white text-[10px] font-bold uppercase tracking-widest text-gray-700 outline-none">
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
