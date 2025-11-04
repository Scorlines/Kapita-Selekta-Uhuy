import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Laporkan.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/jempol.png';

function Laporkan() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    what: '',
    when: '',
    who: '',
    where: ''
  });

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
      navigate('/');
    }, 200);
  };

  const handleReportClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.');
    setShowForm(false);
    setFormData({ what: '', when: '', who: '', where: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="main-menu-page">
      <div className="background-overlay"></div>
      
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

      {/* Menu Buttons */}
      <div className="menu-buttons">
        <button
          className="menu-btn menu-report"
          onClick={handleReportClick}
        >
          Laporkan
        </button>
      </div>

      {showForm && (
        <div className="report-form-overlay">
          <div className="report-form">
            <h3>Laporkan Kejadian Bullying</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Apa yang terjadi?</label>
                <textarea
                  value={formData.what}
                  onChange={(e) => handleInputChange('what', e.target.value)}
                  placeholder="Jelaskan kejadian yang Anda alami..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Kapan itu terjadi?</label>
                <input
                  type="datetime-local"
                  value={formData.when}
                  onChange={(e) => handleInputChange('when', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Siapa yang terlibat?</label>
                <input
                  type="text"
                  value={formData.who}
                  onChange={(e) => handleInputChange('who', e.target.value)}
                  placeholder="Nama pelaku atau korban..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Lokasi Kejadian</label>
                <input
                  type="text"
                  value={formData.where}
                  onChange={(e) => handleInputChange('where', e.target.value)}
                  placeholder="Tempat kejadian..."
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Batal
                </button>
                <button type="submit" className="submit-btn">
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="decorative-elements">
        <div className="tree-left"></div>
        <div className="tree-right"></div>
        <div className="plant-bottom-left"></div>
        <div className="plant-bottom-center"></div>
        <div className="plant-bottom-right"></div>
        <div className="shield-small"></div>
      </div>
    </div>
  );
}

export default Laporkan;
