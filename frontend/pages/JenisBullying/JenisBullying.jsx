import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './JenisBullying.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function JenisBullying() {
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
      navigate('/laporkan');
    }, 200);
  };

  const handleTypeClick = (type) => {
    playSound();
    // Simpan jenis bullying yang dipilih
    sessionStorage.setItem('bullyingType', type);
    // Navigate berdasarkan jenis bullying
    setTimeout(() => {
      if (type === 'Aku diejek teman') {
        navigate('/response1');
      } else if (type === 'Aku didorong / disakiti') {
        navigate('/response2');
      } else if (type === 'Aku dipanggil dengan kata yang bikin sedih') {
        navigate('/response3');
      } else if (type === 'Aku gak diajak main / belajar bareng') {
        navigate('/response4');
      } else if (type === 'Aku dibully lewat HP / chat') {
        navigate('/response5');
      } else {
        navigate('/laporkan/form');
      }
    }, 200);
  };

  const bullyingTypes = [
    { id: 1, text: 'Aku diejek teman', emoji: '😢', color: '#FFB6C1' },
    { id: 2, text: 'Aku didorong / disakiti', emoji: '⚠️', color: '#FFE17B' },
    { id: 3, text: 'Aku dipanggil dengan kata yang bikin sedih', emoji: '😞', color: '#87CEEB' },
    { id: 4, text: 'Aku gak diajak main / belajar bareng', emoji: '💔', color: '#DDA0DD' },
    { id: 5, text: 'Aku dibully lewat HP / chat', emoji: '📱', color: '#FFD700' },
    { id: 6, text: 'Rahasiaku diceritain ke orang lain', emoji: '😔', color: '#98FB98' }
  ];

  return (
    <div className="jenis-bullying-page">
      {/* Header */}
      <div className="jenis-header">
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
      <div className="jenis-content">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>
              Pilih salah satu gejala di bawah yang paling mirip dengan masalahmu ya, teman. Jangan takut!
            </p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Bullying Type Cards */}
        <div className="bullying-cards">
          {bullyingTypes.map((type) => (
            <button
              key={type.id}
              className="bullying-card"
              style={{ backgroundColor: type.color }}
              onClick={() => handleTypeClick(type.text)}
            >
              <span className="card-emoji">{type.emoji}</span>
              <span className="card-text">{type.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JenisBullying;
