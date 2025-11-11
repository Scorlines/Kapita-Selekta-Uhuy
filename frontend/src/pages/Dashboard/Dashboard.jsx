import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import logoImage from '../../assets/logo pojok kanan .png'
import { reportStorage } from '../../utils/reportStorage'

function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    thirtyDays: 0,
    completed: 0,
    new: 0
  })
  const [reports, setReports] = useState([])
  const [lastReportCount, setLastReportCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [expandedReport, setExpandedReport] = useState(null)

  // Load data saat komponen dimount
  useEffect(() => {
    // Inisialisasi data dummy jika belum ada data
    initializeDummyData()
    loadDashboardData()
    
    // Refresh data setiap 5 detik untuk update real-time
    const interval = setInterval(loadDashboardData, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const initializeDummyData = () => {
    const existingReports = reportStorage.getAllReports()
    if (existingReports.length === 0) {
      // Tambahkan beberapa data dummy
      const dummyReports = [
        {
          name: 'Ahmad Rizki',
          what: 'Saya dipukul oleh teman sekelas di koridor sekolah',
          when: '2025-11-08T14:30:00',
          who: 'Siswa kelas 8B',
          where: 'Koridor lantai 2'
        },
        {
          name: '', // Anonim
          what: 'Diejek dan dihina karena penampilan fisik',
          when: '2025-11-08T10:15:00',
          who: 'Beberapa siswa kelas 9A',
          where: 'Kantin sekolah'
        },
        {
          name: 'Siti Nurhaliza',
          what: 'Diancam dan diminta uang jajan',
          when: '2025-11-07T16:45:00',
          who: 'Siswa senior',
          where: 'Toilet sekolah'
        }
      ]
      
      dummyReports.forEach(report => {
        reportStorage.saveReport(report)
      })
    }
  }

  const loadDashboardData = () => {
    // Load statistik
    const newStats = reportStorage.getStats()
    
    // Cek apakah ada laporan baru
    if (lastReportCount > 0 && newStats.total > lastReportCount) {
      setShowNotification(true)
      playNotificationSound()
      setTimeout(() => setShowNotification(false), 5000)
    }
    
    setStats(newStats)
    setLastReportCount(newStats.total)
    
    // Load laporan terbaru (maksimal 5 laporan)
    const allReports = reportStorage.getAllReports()
    const recentReports = allReports
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map(report => ({
        id: report.id,
        date: reportStorage.formatDate(report.timestamp),
        type: report.type,
        student: report.student,
        reporterName: report.name || 'Anonim',
        status: report.status,
        urgency: report.urgency,
        details: {
          name: report.name || 'Anonim',
          what: report.what,
          when: report.when,
          who: report.who,
          where: report.where
        }
      }))
    
    setReports(recentReports)
  }

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 600
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const handleMenuClick = (menu) => {
    playSound()
    setTimeout(() => {
      navigate(menu)
    }, 100)
  }

  const handleStatusChange = (reportId, newStatus) => {
    reportStorage.updateReportStatus(reportId, newStatus)
    loadDashboardData() // Refresh data
    playSound()
  }

  const handleDeleteReport = (reportId) => {
    if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      reportStorage.deleteReport(reportId)
      loadDashboardData() // Refresh data
      playSound()
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Baru': return '#FF6B6B'
      case 'Diproses': return '#4ECDC4'
      case 'Selesai': return '#45B7D1'
      default: return '#95A5A6'
    }
  }

  const toggleReportExpansion = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId)
  }

  return (
    <div className="dashboard-page">
      {/* Header Navigation */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-btn nav-btn-active" onClick={() => handleMenuClick('/dashboard')}>Admin</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/laporkan')}>Laporkan</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/edukasi')}>Edukasi</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/chat')}>Chat</button>
        </nav>
      </header>

      {/* Notification */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <span className="notification-icon">🚨</span>
            <span className="notification-text">Laporan baru telah diterima!</span>
            <button 
              className="notification-close"
              onClick={() => setShowNotification(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard Analytics</h1>
        
        {/* Summary Statistics */}
        <div className="summary-section">
          <h2 className="section-title">Ringkasan</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">30 Hari</div>
              <div className="stat-value">{stats.thirtyDays}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Selesai</div>
              <div className="stat-value">{stats.completed}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Baru</div>
              <div className="stat-value">{stats.new}</div>
            </div>
          </div>
        </div>

        {/* Queue Section */}
        <div className="queue-section">
          <div className="section-header">
            <h2 className="section-title">Antrian</h2>
            <button 
              className="refresh-btn"
              onClick={() => {
                loadDashboardData()
                playSound()
              }}
              title="Refresh Data"
            >
              🔄 Refresh
            </button>
          </div>
          <div className="reports-list">
            {reports.length === 0 ? (
              <div className="no-reports">
                <p>Tidak ada laporan saat ini</p>
              </div>
            ) : (
              reports.map((report) => (
                <div 
                  key={report.id} 
                  className={`report-card ${expandedReport === report.id ? 'expanded' : ''}`}
                  onClick={() => toggleReportExpansion(report.id)}
                >
                  <div className="expand-indicator">
                    {expandedReport === report.id ? '▼' : '▶'}
                  </div>
                  <div className="report-info">
                    <div className="report-type">{report.type}</div>
                    <div className="report-date">{report.date}</div>
                    <div className="report-reporter">Pelapor: {report.reporterName}</div>
                    <div className="report-student">{report.student}</div>
                    
                    <div className="report-meta">
                      <span 
                        className="report-status"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      >
                        Status: {report.status}
                      </span>
                      <span className="report-urgency">Urgensi: {report.urgency}</span>
                    </div>
                    
                    {/* Detail laporan - hanya tampil saat expanded */}
                    <div className="report-details">
                      <div className="detail-item">
                        <strong>Pelapor:</strong> {report.details.name}
                      </div>
                      <div className="detail-item">
                        <strong>Apa:</strong> {report.details.what}
                      </div>
                      <div className="detail-item">
                        <strong>Kapan:</strong> {report.details.when}
                      </div>
                      <div className="detail-item">
                        <strong>Siapa:</strong> {report.details.who}
                      </div>
                      <div className="detail-item">
                        <strong>Dimana:</strong> {report.details.where}
                      </div>
                    </div>
                    
                    {/* Action buttons - hanya tampil saat expanded */}
                    <div className="report-actions" onClick={(e) => e.stopPropagation()}>
                      {report.status === 'Baru' && (
                        <button 
                          className="action-btn process-btn"
                          onClick={() => handleStatusChange(report.id, 'Diproses')}
                        >
                          Proses
                        </button>
                      )}
                      {report.status === 'Diproses' && (
                        <button 
                          className="action-btn complete-btn"
                          onClick={() => handleStatusChange(report.id, 'Selesai')}
                        >
                          Selesaikan
                        </button>
                      )}
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
