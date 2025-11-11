import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import bearImage from '../../assets/pengan kertas.png'
import logoImage from '../../assets/logo pojok kanan .png'

function LandingPage() {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    const oscillator1 = audioContext.createOscillator()
    const gainNode1 = audioContext.createGain()
    
    oscillator1.connect(gainNode1)
    gainNode1.connect(audioContext.destination)
    
    oscillator1.frequency.value = 800
    oscillator1.type = 'sine'
    
    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator1.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 0.3)
    
    const oscillator2 = audioContext.createOscillator()
    const gainNode2 = audioContext.createGain()
    
    oscillator2.connect(gainNode2)
    gainNode2.connect(audioContext.destination)
    
    oscillator2.frequency.value = 1000
    oscillator2.type = 'sine'
    
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1)
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
    
    oscillator2.start(audioContext.currentTime + 0.1)
    oscillator2.stop(audioContext.currentTime + 0.4)
  }

  const handleStartClick = () => {
    setIsAnimating(true)
    playSound()
    
    setTimeout(() => {
      navigate('/menu')
    }, 600)
  }

  return (
    <div className="landing-page">
      {/* Header Title */}
      <div className="landing-header">
        <h1 className="landing-title">Yuk, kita mulai petualangan anti-bullying bersama!</h1>
      </div>

      {/* Logo Pojok Kanan */}
      <div className="corner-logo">
        <img src={logoImage} alt="Safe School Logo" />
      </div>

      {/* Main Bear Character with Sign */}
      <div className={`main-bear ${isAnimating ? 'bounce' : ''}`}>
        <img 
          src={bearImage} 
          alt="Bear Character" 
          className="bear-character"
        />
        
        {/* Start Button on Sign */}
        <button 
          className={`start-button ${isAnimating ? 'clicked' : ''}`}
          onClick={handleStartClick}
        >
          <span className="start-text">MULAI</span>
        </button>
      </div>
    </div>
  )
}

export default LandingPage
