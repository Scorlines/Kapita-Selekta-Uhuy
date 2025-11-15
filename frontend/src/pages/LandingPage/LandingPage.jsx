import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import bearImage from '../../assets/pengan kertas.png'
import logoImage from '../../assets/logo pojok kanan .png'

function LandingPage() {
  const navigate = useNavigate()

  const playSound = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    const audioContext = new AudioCtx()

    // beep 1
    const osc1 = audioContext.createOscillator()
    const gain1 = audioContext.createGain()
    osc1.connect(gain1)
    gain1.connect(audioContext.destination)

    osc1.frequency.value = 800
    osc1.type = 'sine'

    gain1.gain.setValueAtTime(0.3, audioContext.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    osc1.start(audioContext.currentTime)
    osc1.stop(audioContext.currentTime + 0.3)

    // beep 2
    const osc2 = audioContext.createOscillator()
    const gain2 = audioContext.createGain()
    osc2.connect(gain2)
    gain2.connect(audioContext.destination)

    osc2.frequency.value = 1000
    osc2.type = 'sine'

    gain2.gain.setValueAtTime(0, audioContext.currentTime)
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1)
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

    osc2.start(audioContext.currentTime + 0.1)
    osc2.stop(audioContext.currentTime + 0.4)
  }

  const handleStartClick = () => {
    playSound()
    // boleh langsung navigate, atau kasih jeda dikit biar bunyi kedengaran
    setTimeout(() => {
      navigate('/menu')
    }, 400)
  }

  return (
    <div className="landing-page">
      {/* Logo pojok kanan atas (diam) */}
      <div className="corner-logo">
        <img src={logoImage} alt="Safe School Logo" />
      </div>

      {/* Header judul */}
      <header className="landing-header">
        <h1 className="landing-title">
          Yuk, kita mulai petualangan anti-bullying bersama!
        </h1>
      </header>

      {/* Beruang + tombol MULAI (beruang diam) */}
      <main className="landing-main">
        <div className="main-bear">
          <img
            src={bearImage}
            alt="Bear Character"
            className="bear-character"
          />

          <button
            type="button"
            className="start-button"
            onClick={handleStartClick}
          >
            <span className="start-text">MULAI</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
