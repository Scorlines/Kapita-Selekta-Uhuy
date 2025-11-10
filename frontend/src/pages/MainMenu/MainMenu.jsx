import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './MainMenu.css'
import logoImage from '../../assets/logo pojok kanan .png'
import bearImage from '../../assets/jempol.png'

function MainMenu() {
  const navigate = useNavigate()

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

  const handleBackClick = () => {
    playSound()
    setTimeout(() => {
      navigate('/')
    }, 200)
  }

  const handleMenuClick = (route) => {
    playSound()
    setTimeout(() => {
      navigate(route)
    }, 200)
  }

  return (
    <div className="main-menu-page">
      {/* Header */}
      <div className="menu-header">
        <button className="back-button" onClick={handleBackClick}>
          <FiArrowLeft className="back-icon" />
          <span>BACK</span>
        </button>

        <div className="header-title">
          <h1>SAHABAT DIGITAL ANTI BULLYING</h1>
        </div>

        <div className="corner-logo">
          <img src={logoImage} alt="Safe School Logo" />
        </div>
      </div>

      {/* Welcome Bear Character */}
      <div className="welcome-section">
        <div className="bear-welcome">
          <img src={bearImage} alt="Nobi Bear" className="bear-character-img" />
        </div>
        <div className="welcome-bubble">
          <p>HALO! AKU NOBI 🌟</p>
          <p>Yuk, bersama kita ciptakan sekolah yang ceria dan bebas dari bullying!</p>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="menu-buttons">
        <button 
          className="menu-btn menu-admin"
          onClick={() => handleMenuClick('/admin')}
        >
          Admin
        </button>
        
        <button
          className="menu-btn menu-report"
          onClick={() => handleMenuClick('/laporkan')}
        >
          Laporkan
        </button>
        
        <button 
          className="menu-btn menu-education"
          onClick={() => handleMenuClick('/edukasi')}
        >
          Edukasi
        </button>
        
        <button 
          className="menu-btn menu-chat"
          onClick={() => handleMenuClick('/chat')}
        >
          Chat
        </button>
      </div>
    </div>
  )
}

export default MainMenu
