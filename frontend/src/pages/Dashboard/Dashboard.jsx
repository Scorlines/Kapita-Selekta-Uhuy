import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import logoImage from '../../assets/logo pojok kanan .png'
import { reportStorage } from '../../utils/reportStorage'
import { getAllChats, getChatByCode, addMessage, createChat } from '../../utils/chatStorage'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const PIE_COLORS = ['#6FCF97', '#56CCF2', '#F2C94C', '#EB5757', '#BB6BD9', '#2F80ED']

export default function Dashboard() {
  const navigate = useNavigate()

  // ringkasan
  const [stats, setStats] = useState({ total: 0, thirtyDays: 0, completed: 0, new: 0 })
  // antrian dan filter
  const [reports, setReports] = useState([])
  const [expandedReport, setExpandedReport] = useState(null)
  const [selectedReportId, setSelectedReportId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')
  // notifikasi
  const [lastReportCount, setLastReportCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  // analitik
  const [analytics, setAnalytics] = useState({ byLocation: [], byCategory: [] })
  // chat admin
  const [chats, setChats] = useState({})
  const [chatInput, setChatInput] = useState('')
  const [statusInput, setStatusInput] = useState('')

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(() => {
      loadDashboardData()
      // Refresh chat messages jika ada report yang dipilih
      if (selectedReportId) {
        const chatCode = selectedReportId.toString()
        const chatData = getChatByCode(chatCode)
        if (chatData && chatData.messages) {
          const formattedMessages = chatData.messages.map(msg => ({
            from: msg.sender === 'student' ? 'pelapor' : msg.sender,
            text: msg.text
          }))
          setChats(prev => ({ ...prev, [selectedReportId]: formattedMessages }))
        }
      }
    }, 3000) // Refresh setiap 3 detik
    return () => clearInterval(interval)
  }, [selectedReportId])

  const loadDashboardData = () => {
    const all = reportStorage.getAllReports()
    const hasReports = all.length > 0

    // hitung ringkasan
    const total = all.length
    const completed = all.filter(r => r.status === 'Selesai').length
    const newReports = all.filter(r => r.status === 'Baru').length
    const thirtyDays = all.filter(r => {
      const diff = (Date.now() - new Date(r.timestamp)) / (1000 * 60 * 60 * 24)
      return diff <= 30
    }).length
    setStats(hasReports ? { total, thirtyDays, completed, new: newReports } : { total: 0, thirtyDays: 0, completed: 0, new: 0 })

    // notifikasi laporan baru
    if (lastReportCount > 0 && total > lastReportCount) {
      setShowNotification(true)
      playNotificationSound()
      setTimeout(() => setShowNotification(false), 5000)
    }
    setLastReportCount(total)

    // analitik
    const locMap = new Map()
    const catMap = new Map()
    all.forEach(r => {
      const loc = (r.where || r.details?.where || 'Lainnya').trim()
      const cat = (r.type || r.kategori || 'Lainnya').trim()
      locMap.set(loc, (locMap.get(loc) || 0) + 1)
      catMap.set(cat, (catMap.get(cat) || 0) + 1)
    })
    setAnalytics({
      byLocation: Array.from(locMap, ([name, value]) => ({ name, value })),
      byCategory: Array.from(catMap, ([name, value]) => ({ name, value }))
    })

    // urutkan laporan: Baru → Diproses → Selesai
    const sorted = [...all].sort((a, b) => {
      const order = { 'Baru': 1, 'Diproses': 2, 'Selesai': 3 }
      return order[a.status] - order[b.status]
    })

    const mapped = sorted.map(r => ({
      id: r.id,
      date: r.date || reportStorage.formatDate(r.timestamp),
      type: r.type || 'Laporan',
      student: r.student || '',
      reporterName: r.name || 'Anonim',
      status: r.status || 'Baru',
      urgency: r.urgency || 'Sedang',
      details: {
        name: r.name || 'Anonim',
        what: r.detail || r.what,
        when: r.waktu || r.when,
        who: r.who || 'Tidak disebutkan',
        where: r.tempat || r.where
      }
    }))
    setReports(mapped)
  }

  const playNotificationSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = 800; osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5)
  }

  const playSound = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = 600; osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2)
  }

  const handleMenuClick = (menu) => { playSound(); setTimeout(() => navigate(menu), 100) }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Baru': return '#FF6B6B'
      case 'Diproses': return '#4ECDC4'
      case 'Selesai': return '#45B7D1'
      default: return '#95A5A6'
    }
  }

  const onSelectReport = (id) => {
    playSound()
    const next = expandedReport === id ? null : id
    setExpandedReport(next)
    setSelectedReportId(next)
    
    // Load chat messages dari chatStorage berdasarkan report ID
    if (next) {
      const chatCode = next.toString()
      const chatData = getChatByCode(chatCode)
      
      if (chatData && chatData.messages) {
        // Convert chat messages ke format yang sesuai
        const formattedMessages = chatData.messages.map(msg => ({
          from: msg.sender === 'student' ? 'pelapor' : msg.sender,
          text: msg.text
        }))
        setChats(prev => ({ ...prev, [next]: formattedMessages }))
      } else {
        // Jika belum ada chat, tampilkan pesan sistem
        setChats(prev => ({ 
          ...prev, 
          [next]: [{ from: 'system', text: 'Belum ada pesan. Kirim sapaan pertama kepada pelapor.' }] 
        }))
      }
    }
    
    const sel = reports.find(r => r.id === id)
    if (sel) setStatusInput(sel.status)
  }

  const handleStatusChange = (reportId, newStatus) => {
    reportStorage.updateReportStatus(reportId, newStatus)
    setStatusInput(newStatus)
    loadDashboardData()
    playSound()
  }

  const sendChat = () => {
    if (!selectedReportId || !chatInput.trim()) return
    playSound()
    
    const chatCode = selectedReportId.toString()
    
    // Pastikan chat session sudah ada, jika belum buat dulu
    let chatData = getChatByCode(chatCode)
    if (!chatData) {
      const report = reports.find(r => r.id === selectedReportId)
      chatData = createChat(chatCode, report?.type || 'Umum')
    }
    
    // Simpan pesan ke chatStorage
    const success = addMessage(chatCode, chatInput.trim(), 'admin')
    
    if (success) {
      // Update tampilan lokal - muat ulang dari storage untuk konsistensi
      const updatedChatData = getChatByCode(chatCode)
      if (updatedChatData && updatedChatData.messages) {
        const formattedMessages = updatedChatData.messages.map(msg => ({
          from: msg.sender === 'student' ? 'pelapor' : msg.sender,
          text: msg.text
        }))
        setChats(prev => ({ ...prev, [selectedReportId]: formattedMessages }))
      }
    }
    
    setChatInput('')
  }

  const handleDeleteReport = () => {
    if (!selectedReportId) return
    if (window.confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      reportStorage.deleteReport(selectedReportId)
      playSound()
      setSelectedReportId(null)
      setExpandedReport(null)
      loadDashboardData()
    }
  }

  const handleMarkAsProcessing = () => {
    if (!selectedReportId) return
    handleStatusChange(selectedReportId, 'Diproses')
  }

  const handleMarkAsComplete = () => {
    if (!selectedReportId) return
    handleStatusChange(selectedReportId, 'Selesai')
  }

  const selectedReport = reports.find(r => r.id === selectedReportId) || null

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-btn nav-btn--admin" onClick={() => handleMenuClick('/dashboard')}>Admin</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/chat-management')}>Chat</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/laporkan')}>Laporkan</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/edukasi')}>Edukasi</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/login')}>Logout</button>
        </nav>
      </header>

      {/* Notification */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span className="notification-icon">🚨</span>
            <span className="notification-text">Laporan baru telah diterima!</span>
            <button className="notification-close" onClick={() => setShowNotification(false)}>✕</button>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard Analytics</h1>

        {/* Ringkasan */}
        <div className="summary-section">
          <h2 className="section-title">Ringkasan</h2>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-label">Total</div><div className="stat-value">{stats.total}</div></div>
            <div className="stat-card"><div className="stat-label">30 Hari</div><div className="stat-value">{stats.thirtyDays}</div></div>
            <div className="stat-card"><div className="stat-label">Selesai</div><div className="stat-value">{stats.completed}</div></div>
            <div className="stat-card"><div className="stat-label">Baru</div><div className="stat-value">{stats.new}</div></div>
          </div>
        </div>

        {/* Antrian */}
        <section className="queue-section">
          <h2 className="section-title">Antrian</h2>

          {/* Filter */}
          <div className="filter-bar">
            <label>Filter status: </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="">Semua</option>
              <option value="Baru">Baru</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="queue-frame">
            {reports
              .filter(r => !statusFilter || r.status === statusFilter)
              .map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`queue-item ${selectedReportId === r.id ? 'active' : ''}`}
                  onClick={() => onSelectReport(r.id)}
                >
                  <div className="qi-line-1">
                    <span className="qi-type">{r.details.what?.slice(0, 22) || r.type}</span>
                    <span className="qi-date">{r.date}</span>
                  </div>
                  <div className="qi-line-2">{r.details.who || r.student}</div>
                  <div className="qi-line-3">
                    <span className="qi-status" style={{ backgroundColor: getStatusColor(r.status) }}>
                      Status: {r.status}
                    </span>
                    <span className="qi-urgency">Urgensi: {r.urgency}</span>
                  </div>
                </button>
              ))}
          </div>
        </section>

        {/* Chat Admin */}
        <section className="chat-admin">
          <h2 className="section-title chat-title">Chat Admin</h2>
          <div className="chat-meta">
            <div>Kategori: <b>{selectedReport?.type || '-'}</b></div>
            <div>Lokasi: <b>{selectedReport?.details.where || '-'}</b></div>
            <div>Waktu: <b>{selectedReport?.date || '-'}</b></div>
          </div>
          <div className="chat-card">
            {!selectedReport ? (
              <>
                <div className="chat-banner">Belum ada pesan. Pilih laporan untuk mulai chat.</div>
              </>
            ) : (
              <>
                <div className="chat-window">
                  {(chats[selectedReportId] || []).map((m, i) => (
                    <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
                  ))}
                </div>
                <div className="chat-actions">
                  <input className="chat-input" placeholder="Ketik balasan..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} />
                  <button className="btn-kirim" onClick={sendChat}>Kirim</button>
                </div>
                <div className="report-actions">
                  <button className="btn-action btn-delete" onClick={handleDeleteReport}>Hapus</button>
                  <button className="btn-action btn-process" onClick={handleMarkAsProcessing}>Diproses</button>
                  <button className="btn-action btn-complete" onClick={handleMarkAsComplete}>Selesai</button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Analitik */}
        <div className="analytics-section">
          <h2 className="section-title">Analitik Sekolah</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3 className="analytics-title">Lokasi Kejadian</h3>
              <div className="pie-box">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analytics.byLocation} dataKey="value" nameKey="name" outerRadius={70}>
                      {analytics.byLocation.map((_, i) => (
                        <Cell key={`loc-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="analytics-card">
              <h3 className="analytics-title">Kategori</h3>
              <div className="pie-box">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analytics.byCategory} dataKey="value" nameKey="name" innerRadius={35} outerRadius={70}>
                      {analytics.byCategory.map((_, i) => (
                        <Cell key={`cat-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
