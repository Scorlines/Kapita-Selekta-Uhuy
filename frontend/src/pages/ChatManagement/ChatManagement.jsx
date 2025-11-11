import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import './ChatManagement.css';
import logoImage from '../../assets/logo pojok kanan .png';
import { getAllChats, addMessage, markAsRead, getChatByCode, deleteChat } from '../../utils/chatStorage';

function ChatManagement() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

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

  const loadChats = () => {
    const allChats = getAllChats();
    // Sort by last activity, most recent first
    const sortedChats = allChats.sort((a, b) => 
      new Date(b.lastActivity) - new Date(a.lastActivity)
    );
    setChats(sortedChats);
  };

  useEffect(() => {
    loadChats();
    // Auto refresh every 5 seconds
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const chat = getChatByCode(selectedChat.code);
      if (chat) {
        setChatMessages(chat.messages || []);
        // Mark as read by admin
        markAsRead(selectedChat.code, 'admin');
        // Reload chats to update unread count
        loadChats();
      }
    }
  }, [selectedChat]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSelectChat = (chat) => {
    playSound();
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (message.trim() === '' || !selectedChat) return;

    playSound();

    // Add message to storage
    addMessage(selectedChat.code, message, 'admin');

    // Add message to display
    const newMessage = {
      id: Date.now().toString(),
      sender: 'admin',
      text: message,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString()
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');

    // Reload chats to update last activity
    loadChats();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackClick = () => {
    playSound();
    setTimeout(() => {
      navigate('/dashboard');
    }, 200);
  };

  const handleRefresh = () => {
    playSound();
    loadChats();
    if (selectedChat) {
      const chat = getChatByCode(selectedChat.code);
      if (chat) {
        setChatMessages(chat.messages || []);
      }
    }
  };

  const handleDeleteChat = () => {
    if (!selectedChat) return;
    
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus chat dengan kode ${selectedChat.code}?`);
    
    if (confirmDelete) {
      playSound();
      deleteChat(selectedChat.code);
      setSelectedChat(null);
      setChatMessages([]);
      loadChats();
    }
  };

  const handleMenuClick = (menu) => {
    playSound();
    setTimeout(() => {
      navigate(menu);
    }, 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 7) return `${days} hari lalu`;
    return date.toLocaleDateString('id-ID');
  };

  return (
    <div className="chat-management-page">
      {/* Header */}
      <header className="chat-management-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-btn" onClick={() => handleMenuClick('/admin')}>Admin</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/laporkan')}>Laporkan</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/edukasi')}>Edukasi</button>
          <button className="nav-btn nav-btn-active" onClick={() => handleMenuClick('/chat-management')}>Chat</button>
        </nav>
      </header>

      <div className="chat-management-content">
        <div className="chat-management-container">
          {/* Chat List Sidebar */}
          <div className="chat-list-sidebar">
            <div className="sidebar-header">
              <h2>Daftar Chat</h2>
              <button className="refresh-icon-btn" onClick={handleRefresh} title="Refresh">
                <FiRefreshCw />
              </button>
            </div>
            <div className="chat-list">
              {chats.length === 0 ? (
                <div className="no-chats">
                  <p>Belum ada percakapan</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`chat-item ${selectedChat?.code === chat.code ? 'active' : ''}`}
                    onClick={() => handleSelectChat(chat)}
                  >
                    <div className="chat-item-header">
                      <div className="chat-code">{chat.code}</div>
                      {chat.unreadAdmin > 0 && (
                        <span className="unread-badge">{chat.unreadAdmin}</span>
                      )}
                    </div>
                    <div className="chat-item-info">
                      <span className="chat-category">{chat.category}</span>
                      <span className="chat-status">{chat.status}</span>
                    </div>
                    <div className="chat-item-last">
                      {chat.messages && chat.messages.length > 0 && (
                        <div className="last-message">
                          {chat.messages[chat.messages.length - 1].text.substring(0, 30)}...
                        </div>
                      )}
                      <div className="chat-time">{formatDate(chat.lastActivity)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {selectedChat ? (
              <>
                <div className="chat-area-header">
                  <div className="chat-header-info">
                    <h3>Kode: {selectedChat.code}</h3>
                    <div className="chat-header-meta">
                      <span className="badge badge-category">{selectedChat.category}</span>
                      <span className="badge badge-status">{selectedChat.status}</span>
                    </div>
                  </div>
                  <button className="delete-chat-btn" onClick={handleDeleteChat} title="Hapus Chat">
                    <FiTrash2 />
                    <span>Hapus</span>
                  </button>
                </div>

                <div className="chat-messages-container">
                  <div className="chat-messages-list">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`chat-message ${msg.sender === 'admin' ? 'admin-message' : 'student-message'}`}
                      >
                        <div className="message-bubble">
                          <div className="message-sender">
                            {msg.sender === 'admin' ? 'Admin' : 'Siswa'}
                          </div>
                          <div className="message-content">{msg.text}</div>
                          <div className="message-time">{msg.time}</div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="chat-input-area">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ketik pesan Anda..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button className="send-button" onClick={handleSendMessage}>
                    <FiSend />
                  </button>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <p>Pilih percakapan untuk mulai membalas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-btn-floating" onClick={handleBackClick}>
        <FiArrowLeft className="back-icon" />
        <span>BACK</span>
      </button>
    </div>
  );
}

export default ChatManagement;
