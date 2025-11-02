import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiVolume2 } from 'react-icons/fi'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)

  const playSound = () => {
    // Membuat suara "ding" yang ceria untuk anak SD
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Nada pertama - lebih tinggi
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
    
    // Nada kedua - sedikit lebih rendah, dimulai setelah nada pertama
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
    
    // Delay navigasi untuk memberi waktu animasi dan suara
    setTimeout(() => {
      navigate('/login')
    }, 600)
  }

  return (
    <div className="landing-page">
      {/* Clouds */}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
      
      {/* Logo */}
      <div className="landing-logo">
        <div className="logo-bear">
          <div className="bear-face">
            <div className="bear-ear bear-ear-left"></div>
            <div className="bear-ear bear-ear-right"></div>
            <div className="bear-head">
              <div className="bear-eyes">
                <div className="bear-eye bear-eye-left"></div>
                <div className="bear-eye bear-eye-right"></div>
              </div>
              <div className="bear-nose"></div>
              <div className="bear-mouth"></div>
            </div>
          </div>
        </div>
        <div className="logo-text">
          <h1>SAFE SCHOOL</h1>
          <p>Elementary School Reporting Website</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="landing-content">
        {/* Trees Background */}
        <div className="trees-container">
          <div className="tree tree-1"></div>
          <div className="tree tree-2"></div>
          <div className="tree tree-3"></div>
        </div>

        {/* Speech Bubble */}
        <div className="speech-bubble">
          <p>Yuk, kita mulai petualangan anti-bullying bersama!</p>
        </div>

        {/* Main Bear Character */}
        <div className={`main-bear ${isAnimating ? 'bounce' : ''}`}>
          <div className="bear-character">
            <div className="bear-ears">
              <div className="ear ear-left"></div>
              <div className="ear ear-right"></div>
            </div>
            <div className="bear-face-main">
              <div className="eyes">
                <div className="eye eye-left">
                  <div className="pupil"></div>
                </div>
                <div className="eye eye-right">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="nose-main"></div>
              <div className="smile"></div>
              <div className="cheek cheek-left"></div>
              <div className="cheek cheek-right"></div>
            </div>
            <div className="bear-body">
              <div className="overalls">
                <div className="strap strap-left"></div>
                <div className="strap strap-right"></div>
              </div>
              <div className="arms">
                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>
              </div>
            </div>
          </div>

          {/* Start Sign */}
          <div className="start-sign">
            <button 
              className={`start-button ${isAnimating ? 'clicked' : ''}`}
              onClick={handleStartClick}
            >
              <span className="start-text">MULAI</span>
              <FiVolume2 className="sound-icon" />
            </button>
          </div>
        </div>

        {/* River and Ground */}
        <div className="river">
          <div className="water-flow"></div>
          <div className="water-flow water-flow-2"></div>
        </div>

        {/* Decorative Elements */}
        <div className="flowers">
          <div className="flower flower-1"></div>
          <div className="flower flower-2"></div>
          <div className="flower flower-3"></div>
          <div className="flower flower-4"></div>
        </div>

        {/* Small Animals */}
        <div className="small-animals">
          <div className="rabbit rabbit-1"></div>
          <div className="rabbit rabbit-2"></div>
          <div className="bird bird-1"></div>
          <div className="bird bird-2"></div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
