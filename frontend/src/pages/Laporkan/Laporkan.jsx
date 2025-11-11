import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Laporkan.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function Laporkan() {
  const navigate = useNavigate();

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const handleBackClick = () => {
  playSound();
  setTimeout(() => {
    navigate('/menu');
  }, 200);
};

  const handleReportClick = () => {
    playSound();
    setTimeout(() => {
      navigate('/jenisbullying');
    }, 200);
  };

  const handleFieldClick = (fieldId) => {
    playSound();
    sessionStorage.setItem('focusField', fieldId);
    setTimeout(() => {
      navigate('/jenisbullying');
    }, 200);
  };

  return (
    <div className="laporkan-page">
      {/* Header */}
      <div className="laporkan-header">
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
      <div className="content-container">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>
              Halo, teman-teman hebat! 👋 Nobi di sini untuk jadi sahabat rahasiamu. 
              Ceritakan apa yang terjadi, aku akan menjaga rahasiamu 🤫
            </p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Main Content */}
        <div className="center-content">
          <div className="shield-icon">🛡️</div>
          <h2 className="main-heading">LINGKUNGAN KITA AMAN!</h2>
          
          <button className="lapor-button" onClick={handleReportClick}>
            LAPOR SEKARANG
          </button>

          {/* Field Buttons */}
          <div className="field-buttons">
            <button className="field-btn field-what" onClick={() => handleFieldClick('what')}>
              <span className="field-icon">⏰</span>
              <span className="field-text">Apa yang terjadi?</span>
            </button>
            <button className="field-btn field-when" onClick={() => handleFieldClick('when')}>
              <span className="field-icon">📅</span>
              <span className="field-text">Kapan itu terjadi?</span>
            </button>
            <button className="field-btn field-who" onClick={() => handleFieldClick('who')}>
              <span className="field-icon">😊</span>
              <span className="field-text">Siapa yang terlibat?</span>
            </button>
            <button className="field-btn field-where" onClick={() => handleFieldClick('where')}>
              <span className="field-icon">🔒</span>
              <span className="field-text">Lokasi Kejadian</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laporkan;
