import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Chat.css';
import logoImage from '../../assets/logo pojok kanan .png';
import bearImage from '../../assets/sapa.png';

function Chat() {
  const navigate = useNavigate();
  const [secretCode, setSecretCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [counselorInfo, setCounselorInfo] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

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

  const handleVerifyCode = () => {
    if (secretCode.trim() !== '') {
      playSound();
      
      // Set counselor info setelah verifikasi
      setCounselorInfo({
        code: secretCode.toUpperCase(),
        status: 'Baru',
        category: 'diejek'
      });
      
      setIsVerified(true);
      
      // Tambahkan pesan welcome dari konselor
      const welcomeMessage = {
        id: 1,
        sender: 'counselor',
        text: 'siap',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([welcomeMessage]);
    } else {
      alert('Mohon masukkan kode rahasia terlebih dahulu');
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    playSound();

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');

    // Simulasi balasan konselor setelah delay
    setTimeout(() => {
      const replyMessage = {
        id: chatMessages.length + 2,
        sender: 'counselor',
        text: 'Terima kasih sudah berbagi. Saya mengerti perasaan Anda. Bisakah Anda ceritakan lebih detail?',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isVerified) {
        handleVerifyCode();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>

        <div className="header-nav">
          <button className="nav-btn" onClick={() => navigate('/admin')}>Admin</button>
          <button className="nav-btn" onClick={() => navigate('/laporkan')}>Laporkan</button>
          <button className="nav-btn" onClick={() => navigate('/edukasi')}>Edukasi</button>
          <button className="nav-btn active">Chat</button>
        </div>
      </div>

      {/* Title */}
      <div className="chat-title-section">
        <h2 className="chat-main-title">Chat Anonim dengan Konselor</h2>
      </div>

      {!isVerified ? (
        /* Verification Screen */
        <div className="verification-section">
          <div className="verification-container">
            <input
              type="text"
              className="secret-code-input"
              placeholder="Masukkan kode rahasia"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="cek-button" onClick={handleVerifyCode}>
              Cek
            </button>
          </div>

          {/* Bottom Section with Bears */}
          <div className="bottom-section">
            <div className="bear-icons">
              <img src={bearImage} alt="Bear 1" className="bear-icon" />
              <img src={bearImage} alt="Bear 2" className="bear-icon" />
              <img src={bearImage} alt="Bear 3" className="bear-icon" />
            </div>
            <div className="bottom-text">
              <h3>Saling Jaga, Saling Sayang</h3>
              <p>Mari bersama-sama mencegah bullying di sekolah dan lingkungan kita</p>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Screen */
        <div className="chat-section">
          {/* Counselor Info Box */}
          <div className="counselor-info-box">
            <div className="info-row">
              <div className="code-display">{counselorInfo.code}</div>
              <button className="cek-button-small">Cek</button>
            </div>
            <div className="status-info">
              <span className="status-label">Status:</span> {counselorInfo.status}. 
              <span className="category-label"> Kategori:</span> {counselorInfo.category}
            </div>
          </div>

          {/* Chat Container */}
          <div className="chat-container">
            <div className="chat-messages">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'counselor-message'}`}
                >
                  <div className="message-label">
                    {msg.sender === 'user' ? 'Kamu: ' : 'Konselor: '}
                    <span className="message-text">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="chat-input-section">
            <input
              type="text"
              className="chat-input-field"
              placeholder="Tulis pesan ke Konselor..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="kirim-button" onClick={handleSendMessage}>
              Kirim
            </button>
          </div>

          {/* Bottom Section with Bears */}
          <div className="bottom-section">
            <div className="bear-icons">
              <img src={bearImage} alt="Bear 1" className="bear-icon" />
              <img src={bearImage} alt="Bear 2" className="bear-icon" />
              <img src={bearImage} alt="Bear 3" className="bear-icon" />
            </div>
            <div className="bottom-text">
              <h3>Saling Jaga, Saling Sayang</h3>
              <p>Mari bersama-sama mencegah bullying di sekolah dan lingkungan kita</p>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button className="back-btn-floating" onClick={handleBackClick}>
        <FiArrowLeft className="back-icon" />
        <span>BACK</span>
      </button>
    </div>
  );
}

export default Chat;