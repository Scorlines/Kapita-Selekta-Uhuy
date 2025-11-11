import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiCheck } from 'react-icons/fi';
import './LaporanSuccess.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function LaporanSuccess() {
  const navigate = useNavigate();
  const [reportCode, setReportCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Ambil report ID dari sessionStorage
    const reportId = sessionStorage.getItem('reportId');
    
    if (!reportId) {
      // Jika tidak ada report ID, redirect ke menu
      navigate('/menu');
      return;
    }

    // Gunakan report ID langsung sebagai kode rahasia
    setReportCode(reportId);
  }, [navigate]);

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleBackClick = () => {
    playSound();
    // Bersihkan report ID
    sessionStorage.removeItem('reportId');
    setTimeout(() => {
      navigate('/menu');
    }, 200);
  };

  const handleFinishClick = () => {
    playSound();
    // Bersihkan report ID
    sessionStorage.removeItem('reportId');
    setTimeout(() => {
      navigate('/menu');
    }, 200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reportCode);
    setCopied(true);
    playSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="success-page">
      {/* Header */}
      <div className="success-header">
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

      {/* Content Section */}
      <div className="success-content">
        {/* Left Section - Bear */}
        <div className="bear-section">
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Right Section - Success Message */}
        <div className="message-section">
          <div className="success-card">
            <div className="stars-decoration">
              <span className="star">⭐</span>
              <span className="star">✨</span>
              <span className="star">⭐</span>
            </div>
            
            <div className="plane-icon">✈️</div>
            
            <h2 className="success-title">
              Yee! Ceritamu udah sampai ke Nobi!
            </h2>
            
            <p className="success-subtitle">
              "Kamu hebat banget karena udah berani cerita 💛"
            </p>

            <div className="code-section">
              <p className="code-label">Simpan kode rahasia untuk chat dan cek status:</p>
              <div className="code-display">
                <span className="code-text">{reportCode}</span>
                <button 
                  className="copy-button" 
                  onClick={handleCopyCode}
                  title="Copy kode"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
              {copied && <p className="copied-message">✓ Kode berhasil disalin!</p>}
            </div>

            <div className="stars-decoration bottom">
              <span className="star">⭐</span>
              <span className="star">✨</span>
              <span className="star">⭐</span>
            </div>
          </div>

          <button className="finish-button" onClick={handleFinishClick}>
            <span>Finish</span>
            <span className="arrow-icon">➜</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LaporanSuccess;
