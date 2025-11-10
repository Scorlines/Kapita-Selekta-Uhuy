import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './LaporanForm.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';
import { reportStorage } from '../../utils/reportStorage';

function LaporanForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    what: '',
    when: '',
    who: '',
    where: ''
  });
  const [activeField, setActiveField] = useState(null);

  const bullyingType = sessionStorage.getItem('bullyingType') || 'Tidak disebutkan';

  // Auto-focus pada field yang dipilih dari halaman /laporkan
  useEffect(() => {
    const focusField = sessionStorage.getItem('focusField');
    if (focusField) {
      setTimeout(() => {
        const inputElement = document.getElementById(`input-${focusField}`);
        if (inputElement) {
          inputElement.focus();
          // Scroll ke field yang dipilih
          inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        sessionStorage.removeItem('focusField');
      }, 500);
    }
  }, []);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const reportData = {
      what: formData.what,
      when: formData.when,
      who: formData.who,
      where: formData.where,
      type: bullyingType
    };

    const savedReport = reportStorage.saveReport(reportData);
    
    playSound();
    
    alert(`Laporan berhasil dikirim! 
    
ID Laporan: ${savedReport.id}
Jenis: ${bullyingType}
Status: ${savedReport.status}
    
Terima kasih atas partisipasi Anda. Tim admin akan segera menindaklanjuti laporan ini.`);
    
    sessionStorage.removeItem('bullyingType');
    navigate('/menu');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldFocus = (field) => {
    setActiveField(field);
  };

  const handleFieldBlur = () => {
    setActiveField(null);
  };

  const fields = [
    { 
      id: 'what', 
      icon: '⏰', 
      label: 'Apa yang terjadi?', 
      type: 'textarea', 
      placeholder: 'Jelaskan kejadian yang Anda alami...',
      color: '#FFB6C1'
    },
    { 
      id: 'when', 
      icon: '📅', 
      label: 'Kapan itu terjadi?', 
      type: 'datetime-local', 
      placeholder: '',
      color: '#FFE17B'
    },
    { 
      id: 'who', 
      icon: '😊', 
      label: 'Siapa yang terlibat?', 
      type: 'text', 
      placeholder: 'Nama pelaku atau korban...',
      color: '#87CEEB'
    },
    { 
      id: 'where', 
      icon: '🔒', 
      label: 'Lokasi Kejadian', 
      type: 'text', 
      placeholder: 'Tempat kejadian...',
      color: '#DDA0DD'
    }
  ];

  return (
    <div className="laporan-form-page">
      {/* Header */}
      <div className="laporan-header">
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
      <div className="laporan-content">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>
              Ceritakan dengan detail ya, teman! Semakin lengkap ceritamu, semakin mudah kami membantumu 💪
            </p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-container">
            <h2>Laporkan Kejadian Bullying</h2>
            <p className="selected-type">Jenis yang dipilih: <strong>{bullyingType}</strong></p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="interactive-fields">
                {fields.map((field) => (
                  <div 
                    key={field.id}
                    className={`interactive-field ${activeField === field.id ? 'active' : ''} ${formData[field.id] ? 'filled' : ''}`}
                    style={{ 
                      backgroundColor: field.color,
                      borderColor: activeField === field.id ? '#FF6B35' : '#5D4037'
                    }}
                    onClick={() => document.getElementById(`input-${field.id}`).focus()}
                  >
                    <div className="field-header">
                      <span className="field-icon">{field.icon}</span>
                      <span className="field-label">{field.label}</span>
                    </div>
                    <div className="field-input-container">
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`input-${field.id}`}
                          value={formData[field.id]}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          onFocus={() => handleFieldFocus(field.id)}
                          onBlur={handleFieldBlur}
                          placeholder={field.placeholder}
                          required
                          rows="3"
                        />
                      ) : (
                        <input
                          id={`input-${field.id}`}
                          type={field.type}
                          value={formData[field.id]}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          onFocus={() => handleFieldFocus(field.id)}
                          onBlur={handleFieldBlur}
                          placeholder={field.placeholder}
                          required
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-buttons">
                <button type="button" onClick={handleBackClick} className="cancel-btn">
                  Batal
                </button>
                <button type="submit" className="submit-btn">
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaporanForm;
