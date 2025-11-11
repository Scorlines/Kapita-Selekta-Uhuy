import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './SiapaDisana.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';
import { reportStorage } from '../../utils/reportStorage';
import { createChat, addMessage } from '../../utils/chatStorage';

function SiapaDisana() {
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState('');
  const [customPerson, setCustomPerson] = useState('');

  const peopleOptions = [
    { icon: '👥', label: 'Teman sekelasku' },
    { icon: '👤', label: 'Kakak sekelasku' },
    { icon: '👨‍🏫', label: 'Guru / wali kelas melihat' },
    { icon: '👁️', label: 'Orang dewasa disekolah lihat' },
    { icon: '📱', label: 'Teman di HP / Chat' }
  ];

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
      navigate(-1);
    }, 200);
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
    setCustomPerson('');
    playSound();
  };

  const handleCustomPersonChange = (e) => {
    setCustomPerson(e.target.value);
    setSelectedPerson('');
  };

  const handleSubmit = () => {
    const finalPerson = customPerson.trim() || selectedPerson;
    
    if (!finalPerson) {
      alert('Mohon pilih atau tulis siapa yang ada disana!');
      return;
    }

    playSound();
    
    // Ambil semua data dari sessionStorage
    const bullyingType = sessionStorage.getItem('bullyingType') || 'Tidak disebutkan';
    const storyDetail = sessionStorage.getItem('storyDetail') || '';
    const tanggalKejadian = sessionStorage.getItem('tanggalKejadian') || '';
    const lokasiKejadian = sessionStorage.getItem('lokasiKejadian') || '';
    
    // Format tanggal
    const dateObj = new Date(tanggalKejadian);
    const formattedDate = dateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Siapa yang ada
    const whoWasThere = finalPerson;
    
    // Buat laporan baru
    const newReport = reportStorage.saveReport({
      type: bullyingType,
      detail: storyDetail,
      tanggal: formattedDate,
      tempat: lokasiKejadian,
      siapa: whoWasThere,
      date: formattedDate,
      details: {
        what: storyDetail,
        when: formattedDate,
        where: lokasiKejadian,
        who: whoWasThere
      }
    });
    
    // Buat chat session dengan kode = report ID
    const chatCode = newReport.id.toString();
    createChat(chatCode, bullyingType);
    
    // Tambahkan pesan pertama dari siswa (detail cerita)
    if (storyDetail.trim()) {
      addMessage(chatCode, storyDetail, 'student');
    }
    
    // Bersihkan sessionStorage
    sessionStorage.removeItem('bullyingType');
    sessionStorage.removeItem('storyDetail');
    sessionStorage.removeItem('tanggalKejadian');
    sessionStorage.removeItem('lokasiKejadian');
    
    // Simpan report ID untuk halaman sukses
    sessionStorage.setItem('reportId', newReport.id.toString());
    
    setTimeout(() => {
      navigate('/laporan-success');
    }, 200);
  };

  return (
    <div className="siapa-disana-page">
      {/* Header */}
      <div className="siapa-header">
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
      <div className="siapa-content">
        {/* Bear and Speech Bubble */}
        <div className="bear-section">
          <div className="speech-bubble">
            <p>Sekarang coba pilih ya, siapa aja yang ada waktu itu?</p>
          </div>
          <img src={bearImage} alt="Bear Character" className="bear-character" />
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="question-bubble">
            <p>siapa yang ada disana? 🤔</p>
          </div>

          {/* People Options */}
          <div className="people-buttons">
            {peopleOptions.map((person, index) => (
              <button
                key={index}
                className={`person-btn ${selectedPerson === person.label ? 'active' : ''}`}
                onClick={() => handlePersonClick(person.label)}
              >
                <span className="person-icon">{person.icon}</span>
                <span className="person-label">{person.label}</span>
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div className="custom-person-section">
            <div className="speech-bubble-small">
              <p>isi disini jika tidak ada dipilihan ya...</p>
            </div>
            <input 
              type="text" 
              value={customPerson}
              onChange={handleCustomPersonChange}
              className="custom-person-input"
              placeholder="Tulis siapa yang ada disana..."
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

export default SiapaDisana;
