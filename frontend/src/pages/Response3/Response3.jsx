import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Response3.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function Response3() {
  const navigate = useNavigate();
  const [storyDetail, setStoryDetail] = useState('');
  const bullyingType = sessionStorage.getItem('bullyingType') || 'Aku dipanggil dengan kata yang bikin sedih';

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

  const handleKirim = () => {
    if (!storyDetail.trim()) {
      alert('Mohon ceritakan kejadiannya terlebih dahulu!');
      return;
    }
    
    playSound();
    
    // Simpan detail cerita ke sessionStorage
    sessionStorage.setItem('storyDetail', storyDetail);
    
    setTimeout(() => {
      navigate('/kapan-terjadi');
    }, 200);
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
            <p>Wah, itu gak baik ya. Tapi tenang, cerita kamu aman sama Nobi. Yuk ceritakan lebih detail supaya bisa ditangani dengan baik.</p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Right Panel - Story Card */}
        <div className="story-panel">
          <div className="story-card">
            <h2>Ceritain ke Nobi apa yang terjadi disini ya...</h2>
            
            <textarea
              className="story-textarea"
              placeholder="Tulis ceritamu di sini..."
              value={storyDetail}
              onChange={(e) => setStoryDetail(e.target.value)}
              rows={6}
            />
            
            {/* Action Button */}
            <button className="kirim-button" onClick={handleKirim}>
              <span>Kirim</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response3;