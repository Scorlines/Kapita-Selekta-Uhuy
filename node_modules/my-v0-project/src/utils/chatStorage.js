// Utility untuk manage chat conversations antara siswa dan admin

const CHAT_STORAGE_KEY = 'anti_bullying_chats';

// Get all chat conversations
export const getAllChats = () => {
  try {
    const chats = localStorage.getItem(CHAT_STORAGE_KEY);
    return chats ? JSON.parse(chats) : [];
  } catch (error) {
    console.error('Error getting chats:', error);
    return [];
  }
};

// Get specific chat by code
export const getChatByCode = (code) => {
  try {
    const chats = getAllChats();
    return chats.find(chat => chat.code === code) || null;
  } catch (error) {
    console.error('Error getting chat by code:', error);
    return null;
  }
};

// Create new chat session
export const createChat = (code, category) => {
  try {
    const chats = getAllChats();
    
    // Check if chat already exists
    const existingChat = chats.find(chat => chat.code === code);
    if (existingChat) {
      return existingChat;
    }

    const newChat = {
      id: Date.now().toString(),
      code: code.toUpperCase(),
      category: category || 'Umum',
      status: 'Aktif',
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      messages: [],
      unreadAdmin: 0,
      unreadStudent: 0
    };

    chats.push(newChat);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    return newChat;
  } catch (error) {
    console.error('Error creating chat:', error);
    return null;
  }
};

// Add message to chat
export const addMessage = (code, message, sender) => {
  try {
    const chats = getAllChats();
    const chatIndex = chats.findIndex(chat => chat.code === code);

    if (chatIndex === -1) {
      console.error('Chat not found');
      return false;
    }

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: sender, // 'student' or 'admin'
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    chats[chatIndex].messages.push(newMessage);
    chats[chatIndex].lastActivity = new Date().toISOString();

    // Update unread count
    if (sender === 'student') {
      chats[chatIndex].unreadAdmin = (chats[chatIndex].unreadAdmin || 0) + 1;
    } else {
      chats[chatIndex].unreadStudent = (chats[chatIndex].unreadStudent || 0) + 1;
    }

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    return true;
  } catch (error) {
    console.error('Error adding message:', error);
    return false;
  }
};

// Mark messages as read
export const markAsRead = (code, reader) => {
  try {
    const chats = getAllChats();
    const chatIndex = chats.findIndex(chat => chat.code === code);

    if (chatIndex === -1) {
      return false;
    }

    if (reader === 'admin') {
      chats[chatIndex].unreadAdmin = 0;
    } else {
      chats[chatIndex].unreadStudent = 0;
    }

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    return true;
  } catch (error) {
    console.error('Error marking as read:', error);
    return false;
  }
};

// Update chat status
export const updateChatStatus = (code, status) => {
  try {
    const chats = getAllChats();
    const chatIndex = chats.findIndex(chat => chat.code === code);

    if (chatIndex === -1) {
      return false;
    }

    chats[chatIndex].status = status;
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    return true;
  } catch (error) {
    console.error('Error updating chat status:', error);
    return false;
  }
};

// Delete chat
export const deleteChat = (code) => {
  try {
    const chats = getAllChats();
    const filteredChats = chats.filter(chat => chat.code !== code);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(filteredChats));
    return true;
  } catch (error) {
    console.error('Error deleting chat:', error);
    return false;
  }
};

// Get total unread count for admin
export const getTotalUnreadAdmin = () => {
  try {
    const chats = getAllChats();
    return chats.reduce((total, chat) => total + (chat.unreadAdmin || 0), 0);
  } catch (error) {
    console.error('Error getting total unread:', error);
    return 0;
  }
};
