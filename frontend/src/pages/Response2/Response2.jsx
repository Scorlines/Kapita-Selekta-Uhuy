import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Response2.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function Response2() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const bullyingType = sessionStorage.getItem('bullyingType') || 'Aku didorong / disakiti';

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
      navigate('/jenisbullying');
    }, 200);
  };

  const handleNext = () => {
    playSound();
    setTimeout(() => {
      navigate('/kapan-terjadi');
    }, 200);
  };

  const handleKirim = () => {
    playSound();
    setTimeout(() => {
      navigate('/kapan-terjadi');
    }, 200);
  };

  const getPageContent = () => {
    switch (currentPage) {
      case 1:
        return "Nobi ngerti, itu gak baik. Kamu bersini banget cerita tentang ini.";
      case 2:
        return "Kamu tidak sendirian dalam menghadapi ini. Nobi ada untukmu.";
      case 3:
        return "Yuk kita laporkan supaya masalah ini bisa ditangani dengan baik.";
      default:
        return "";
    }
  };

  return (
    <div className="response-page">
      {/* Header */}
      <div className="response-header">
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
      <div className="response-content">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>{getPageContent()}</p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Right Panel - Story Card */}
        <div className="story-panel">
          <div className="story-card">
            <h2>Ceritain ke Nobi apa yang terjadi disini ya...</h2>
            <p className="story-text">{bullyingType}</p>
            
            {/* Action Button */}
            {currentPage < 3 ? (
              <button className="next-button" onClick={handleNext}>
                <span>NEXT</span>
                <span className="next-icon">➜</span>
              </button>
            ) : (
              <button className="kirim-button" onClick={handleKirim}>
                <span>Kirim</span>
              </button>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span className={`page-dot ${currentPage === 1 ? 'active' : ''}`}>1</span>
            <span className={`page-dot ${currentPage === 2 ? 'active' : ''}`}>2</span>
            <span className={`page-dot ${currentPage === 3 ? 'active' : ''}`}>3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response2;
