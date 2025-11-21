import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi'
import './Admin.css'
import logoImage from '../../assets/logo pojok kanan .png'
import bearImage from '../../assets/sapa.png'

function Admin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
      navigate('/menu')
    }, 200)
  }

  const handleMenuClick = (menu) => {
    playSound()
    setTimeout(() => {
      navigate(menu)
    }, 100)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // Validasi input
    if (!username.trim()) {
      setError('Username tidak boleh kosong!')
      return
    }

    if (!password.trim()) {
      setError('Password tidak boleh kosong!')
      return
    }

    setIsLoading(true)
    playSound()

    // Simulasi login (nanti bisa diganti dengan API call)
    setTimeout(() => {
      // Dummy credentials untuk demo
      if (username === 'admin' && password === 'admin123') {
        playSound()
        navigate('/dashboard')
      } else {
        setError('Username atau password salah!')
        setIsLoading(false)
      }
    }, 1000)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="admin-page">
      {/* Header Navigation */}
      <header className="admin-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-content">
        <h1 className="login-title">Login Admin</h1>
        
        <form onSubmit={handleLogin} className="login-form">
          {/* Username Input */}
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>

      {/* Back Button */}
      <button className="back-button-bottom" onClick={handleBackClick}>
        <FiArrowLeft className="back-icon" />
        <span>BACK</span>
      </button>
    </div>
  )
}

export default Admin
