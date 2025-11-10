import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import logoImage from '../../assets/logo pojok kanan .png'
import { reportStorage } from '../../utils/reportStorage'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const PIE_COLORS = ['#6FCF97', '#56CCF2', '#F2C94C', '#EB5757', '#BB6BD9', '#2F80ED']

export default function Dashboard() {
  const navigate = useNavigate()

  // ringkasan: mulai dari nol
  const [stats, setStats] = useState({ total: 0, thirtyDays: 0, completed: 0, new: 0 })

  // antrian/daftar
  const [reports, setReports] = useState([])
  const [expandedReport, setExpandedReport] = useState(null)   // untuk expand kartu
  const [selectedReportId, setSelectedReportId] = useState(null) // untuk chat

  // notifikasi
  const [lastReportCount, setLastReportCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  // analitik
  const [analytics, setAnalytics] = useState({ byLocation: [], byCategory: [] })

  // chat admin
  const [chats, setChats] = useState({})     // { [reportId]: [{from:'admin'|'pelapor'|'system', text}] }
  const [chatInput, setChatInput] = useState('')
  const [statusInput, setStatusInput] = useState('')

  useEffect(() => {
    initializeDummyData()
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initializeDummyData = () => {
    // 🚫 Jangan isi dummy supaya Ringkasan awal = 0
    // Biarkan kosong sampai user beneran kirim laporan.
    // Jika kamu tetap butuh seed lokal, boleh aktifkan block di bawah.
    /*
    const existingReports = reportStorage.getAllReports()
    if (existingReports.length === 0) {
      const dummyReports = [ ... ]
      dummyReports.forEach(report => reportStorage.saveReport(report))
    }
    */
  }

  const loadDashboardData = () => {
    const all = reportStorage.getAllReports()
    const hasReports = all.length > 0

    const newStats = reportStorage.getStats()
    // kalau belum ada laporan, paksa 0 semua
    setStats(hasReports ? newStats : { total: 0, thirtyDays: 0, completed: 0, new: 0 })

    // notifikasi
    if (lastReportCount > 0 && newStats.total > lastReportCount) {
      setShowNotification(true)
      playNotificationSound()
      setTimeout(() => setShowNotification(false), 5000)
    }
    setLastReportCount(newStats.total)

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

    // daftar terbaru (maks 5)
    const recent = all
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map(r => ({
        id: r.id,
        date: reportStorage.formatDate(r.timestamp),
        type: r.type || 'Laporan',
        student: r.student || '',
        reporterName: r.name || 'Anonim',
        status: r.status || 'Baru',
        urgency: r.urgency || 'Sedang',
        details: {
          name: r.name || 'Anonim',
          what: r.what,
          when: r.when,
          who: r.who,
          where: r.where
        }
      }))
    setReports(recent)
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
    // init chat system message jika belum ada
    if (next && !chats[next]) {
      setChats(prev => ({ ...prev, [next]: [{ from: 'system', text: 'Belum ada pesan. Kirim sapaan pertama kepada pelapor.' }] }))
    }
    // set default statusInput sesuai status aktif
    const sel = reports.find(r => r.id === id)
    if (sel) setStatusInput(sel.status)
  }

  const handleStatusChange = (reportId, newStatus) => {
    reportStorage.updateReportStatus(reportId, newStatus)
    setStatusInput(newStatus)
    loadDashboardData()
    playSound()
  }

  const handleDeleteReport = (reportId) => {
    if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      reportStorage.deleteReport(reportId)
      // bersihkan chatnya juga kalau ada
      setChats(prev => {
        const cp = { ...prev }
        delete cp[reportId]
        return cp
      })
      if (selectedReportId === reportId) {
        setSelectedReportId(null)
        setExpandedReport(null)
      }
      loadDashboardData()
      playSound()
    }
  }

  const sendChat = () => {
    if (!selectedReportId || !chatInput.trim()) return
    playSound()
    setChats(prev => ({
      ...prev,
      [selectedReportId]: [...(prev[selectedReportId] || []), { from: 'admin', text: chatInput.trim() }]
    }))
    setChatInput('')
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
          <button
            className="nav-btn nav-btn--admin"   // ⬅️ tambahkan ini, hapus nav-btn-active
            onClick={() => handleMenuClick('/dashboard')}
          >
            Admin
          </button>
          <button className="nav-btn" onClick={() => handleMenuClick('/laporkan')}>Laporkan</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/edukasi')}>Edukasi</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/login')}>Chat</button>
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

        {/* Ringkasan (awal 0) */}
        <div className="summary-section">
          <h2 className="section-title">Ringkasan</h2>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-label">Total</div><div className="stat-value">{stats.total || 0}</div></div>
            <div className="stat-card"><div className="stat-label">30 Hari</div><div className="stat-value">{stats.thirtyDays || 0}</div></div>
            <div className="stat-card"><div className="stat-label">Selesai</div><div className="stat-value">{stats.completed || 0}</div></div>
            <div className="stat-card"><div className="stat-label">Baru</div><div className="stat-value">{stats.new || 0}</div></div>
          </div>
        </div>

        {/* Antrian */}
        <section className="queue-section">
          <h2 className="section-title">Antrian</h2>
          <div className="queue-frame">
            {reports.map((r) => (
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

          {/* Meta header */}
          <div className="chat-meta">
            <div>Kategori: <b>{selectedReport?.type || '-'}</b></div>
            <div>Lokasi: <b>{selectedReport?.details.where || '-'}</b></div>
            <div>Waktu: <b>{selectedReport?.date || '-'}</b></div>
          </div>

          {/* Room */}
          <div className="chat-card">
            {!selectedReport && (
              <>
                <div className="chat-banner">Belum ada pesan. Kirim sapaan pertama kepada pelapor</div>
                <div className="chat-actions disabled">
                  <input className="chat-input" placeholder="Ketik balasan..." disabled />
                  <button className="btn-kirim" disabled>Kirim</button>
                  <select className="status-input" disabled>
                    <option>Status...</option>
                  </select>
                  <button className="btn-status" disabled>Update Status</button>
                </div>
              </>
            )}

            {selectedReport && (
              <>
                <div className="chat-window">
                  {(chats[selectedReportId] || []).map((m, i) => (
                    <div key={i} className={`bubble ${m.from}`}>
                      {m.text}
                    </div>
                  ))}
                </div>

                <div className="chat-actions">
                  <input
                    className="chat-input"
                    placeholder="Ketik balasan..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendChat()}
                  />
                  <button className="btn-kirim" onClick={sendChat}>Kirim</button>

                  <select
                    className="status-input"
                    value={statusInput}
                    onChange={e => setStatusInput(e.target.value)}
                  >
                    <option value="Baru">Baru</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                  <button className="btn-status" onClick={() => handleStatusChange(selectedReportId, statusInput)}>
                    Update Status
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Analitik */}
        <div className="analytics-section">
          <h2 className="section-title">Analitik sekolah</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3 className="analytics-title">Lokasi kejadian</h3>
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
