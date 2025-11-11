import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './KapanTerjadi.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function KapanTerjadi() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const bullyingType = sessionStorage.getItem('bullyingType') || '';

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
      navigate(-1); // Go back to previous response page
    }, 200);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Mohon pilih tanggal dan waktu kejadian!');
      return;
    }

    playSound();
    
    // Simpan data ke sessionStorage
    sessionStorage.setItem('tanggalKejadian', selectedDate);
    sessionStorage.setItem('waktuKejadian', selectedTime);
    
    setTimeout(() => {
      navigate('/menu'); // Navigate to menu after submit
    }, 200);
  };

  return (
    <div className="kapan-terjadi-page">
      {/* Header */}
      <div className="kapan-header">
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
      <div className="kapan-content">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>Sekarang coba ingat-ingat ya, kapan itu terjadi?</p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Form Section */}
        <div className="form-section">
          {/* Hari/Tanggal Card */}
          <div className="datetime-card">
            <div className="card-header">
              <span className="card-icon">📅</span>
              <h3>Hari / Tanggal</h3>
            </div>
            <input 
              type="date" 
              value={selectedDate}
              onChange={handleDateChange}
              className="date-input"
              placeholder="Pilih Hari / Tanggal"
            />
          </div>

          {/* Waktu Kejadian Card */}
          <div className="datetime-card">
            <div className="card-header">
              <h3>Waktu Kejadian</h3>
            </div>
            <input 
              type="time" 
              value={selectedTime}
              onChange={handleTimeChange}
              className="time-input"
              placeholder="Pilih waktu terjadinya"
            />
          </div>

          {/* Submit Button */}
          <button className="submit-button" onClick={handleSubmit}>
            <span>Kirim</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default KapanTerjadi;
