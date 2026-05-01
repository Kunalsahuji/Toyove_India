import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Server, Database, AlertCircle, CheckCircle, Clock, RefreshCw, Terminal } from 'lucide-react'

export function AdminSystemLogs() {
  const [logs, setLogs] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const generateLogs = () => {
    const types = ['INFO', 'WARN', 'ERROR', 'SUCCESS']
    const messages = [
      'Database connection established.',
      'User authenticated successfully.',
      'Payment gateway timeout detected.',
      'Failed to load high-res image optimized cache.',
      'Order #ORD-8002 processed successfully.',
      'High CPU usage detected on Node instance.',
      'Cache memory cleared.',
      'Unauthorized access attempt blocked from IP 192.168.x.x',
      'API rate limit warning for client.',
    ]
    
    return Array.from({ length: 15 }).map((_, i) => {
      const type = types[Math.floor(Math.random() * types.length)]
      const msg = messages[Math.floor(Math.random() * messages.length)]
      const date = new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
      return { id: `log-${i}`, type, message: msg, timestamp: date }
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  useEffect(() => {
    setLogs(generateLogs())
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLogs(generateLogs())
      setIsRefreshing(false)
    }, 1000)
  }

  const getLogColor = (type) => {
    switch(type) {
      case 'INFO': return 'text-blue-400'
      case 'WARN': return 'text-yellow-400'
      case 'ERROR': return 'text-red-400'
      case 'SUCCESS': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="shell space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-grandstander font-bold text-gray-800">System Core Health</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Live diagnostic data and server logs.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><Server size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Server Load</p><p className="text-2xl font-grandstander font-bold text-gray-800">32%</p></div>
        </div>
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center"><Database size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">DB Capacity</p><p className="text-2xl font-grandstander font-bold text-gray-800">78%</p></div>
        </div>
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Clock size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Uptime</p><p className="text-2xl font-grandstander font-bold text-gray-800">99.9%</p></div>
        </div>
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-black/[0.03] flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><AlertCircle size={24}/></div>
          <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Errors</p><p className="text-2xl font-grandstander font-bold text-gray-800">2</p></div>
        </div>
      </div>

      {/* Terminal View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1E1E] rounded-[32px] overflow-hidden shadow-2xl border border-gray-800"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#2D2D2D] border-b border-black/20">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-gray-400" />
            <h3 className="text-sm font-bold text-gray-300 tracking-widest uppercase">Live Terminal Logs</h3>
          </div>
          <button 
            onClick={handleRefresh}
            className={`text-gray-400 hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar font-mono text-[13px] leading-relaxed">
          {isRefreshing ? (
            <div className="flex items-center justify-center h-full text-gray-500">Fetching latest logs...</div>
          ) : (
            <div className="space-y-2">
              {logs.map(log => (
                <div key={log.id} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 hover:bg-white/5 p-1 rounded transition-colors">
                  <span className="text-gray-500 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span className={`font-bold w-16 shrink-0 ${getLogColor(log.type)}`}>{log.type}</span>
                  <span className="text-gray-300 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

    </div>
  )
}
