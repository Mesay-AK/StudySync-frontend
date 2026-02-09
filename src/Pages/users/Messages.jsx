import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faMessage, faBook,  faChartBar, faGear,
  faSearch, faPlus,faRightFromBracket,faHouse,
  faPaperPlane, faEllipsisV, faCheck, faCheckDouble,
  faPaperclip, faSmile, faImage, faFile, faVideo, faTimes, faUser,

} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DSideBar from '../../components/DSideBar';
import NotificationsDropdown from '../../components/NotificationsDropdown';

const userMenu = [
  { name: 'Dashboard', href: '/user/dashboard', icon: <FontAwesomeIcon icon={faHouse} /> },
  { name: 'Study Rooms', href: '/user/study-rooms', icon: <FontAwesomeIcon icon={faComments} /> },
  { name: 'Messages', href: '/user/messages', icon: <FontAwesomeIcon icon={faMessage} /> },
  { name: 'Materials', href: '/user/materials', icon: <FontAwesomeIcon icon={faBook} /> },
  { name: 'Analytics', href: '/user/analytics', icon: <FontAwesomeIcon icon={faChartBar} /> },
  { name: 'Logout', href: '/logout', icon: <FontAwesomeIcon icon={faRightFromBracket} /> }
];

const mockConversations = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "AJ",
      status: "online",
      lastSeen: "2 minutes ago"
    },
    lastMessage: "Hey! Are you ready for the calculus exam tomorrow?",
    timestamp: "2:30 PM",
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 2,
    user: {
      name: "Maria Garcia",
      avatar: "MG",
      status: "away",
      lastSeen: "1 hour ago"
    },
    lastMessage: "Thanks for sharing the physics notes!",
    timestamp: "1:45 PM",
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 3,
    user: {
      name: "James Wilson",
      avatar: "JW",
      status: "offline",
      lastSeen: "3 hours ago"
    },
    lastMessage: "Can you help me with the algorithm problem?",
    timestamp: "11:20 AM",
    unreadCount: 1,
    isOnline: false
  },
  {
    id: 4,
    user: {
      name: "Sarah Chen",
      avatar: "SC",
      status: "online",
      lastSeen: "5 minutes ago"
    },
    lastMessage: "The study group meeting is at 6 PM today",
    timestamp: "10:15 AM",
    unreadCount: 0,
    isOnline: true
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Hey! Are you ready for the calculus exam tomorrow?",
    timestamp: "2:30 PM",
    isRead: false,
    type: "text"
  },
  {
    id: 2,
    senderId: 0, // Current user
    content: "Not really, I'm still struggling with derivatives. Can you help me?",
    timestamp: "2:32 PM",
    isRead: true,
    type: "text"
  },
  {
    id: 3,
    senderId: 1,
    content: "Of course! I have some practice problems that might help. Let me send them to you.",
    timestamp: "2:35 PM",
    isRead: false,
    type: "text"
  },
  {
    id: 4,
    senderId: 1,
    content: "Here's the file with practice problems",
    timestamp: "2:36 PM",
    isRead: false,
    type: "file",
    fileName: "calculus_practice.pdf",
    fileSize: "2.4 MB"
  }
];

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [composeSearch, setComposeSearch] = useState('');
  const [composeRecipient, setComposeRecipient] = useState(null);
  const [composeText, setComposeText] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = mockConversations.find(conv => conv.id === selectedConversation);
  const currentMessages = mockMessages; // In real app, this would be filtered by conversation

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const allUsers = mockConversations.map(c => c.user.name);
  const filteredUsers = allUsers.filter(name => name.toLowerCase().includes(composeSearch.toLowerCase()));

  const handleComposeSend = () => {
    if (!composeRecipient || !composeText.trim()) return;
    console.log('Starting new conversation with:', composeRecipient, 'text:', composeText);
    setShowNewMessage(false);
    setComposeRecipient(null);
    setComposeSearch('');
    setComposeText('');
  };

  return (
    <div className="flex min-h-screen">
      <DSideBar menuItems={userMenu} />
      
      <main className="flex-1 bg-gradient-to-br from-stone-800 via-stone-600 to-stone-900 text-white">
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-stone-700/60 backdrop-blur-md p-4 border-b border-white/10 mb-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Messages</h1>
            <div className="flex items-center gap-4  mr-12">
              <button 
                onClick={() => setShowNewMessage(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} />
                New Message
              </button>
              <Link to="/user/settings" className="hover:text-blue-400"><FontAwesomeIcon icon={faGear} /></Link>
              <NotificationsDropdown />
            </div>
          </div>
        </header>

        {showNewMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowNewMessage(false)}></div>
            <div className="relative w-full max-w-lg mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Message</h2>
                <button onClick={() => setShowNewMessage(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-blue-200 mb-2">To</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={composeSearch}
                      onChange={(e) => { setComposeSearch(e.target.value); setComposeRecipient(null); }}
                      placeholder="Search user by name..."
                      className="w-full bg-white/10 text-white placeholder-blue-200 px-3 py-2 rounded-lg border border-white/20 focus:outline-none"
                    />
                    {composeSearch && (
                      <div className="absolute left-0 right-0 mt-2 bg-stone-800/90 border border-white/10 rounded-lg max-h-40 overflow-auto z-10">
                        {filteredUsers.length === 0 && (
                          <div className="px-3 py-2 text-sm text-blue-200">No matches</div>
                        )}
                        {filteredUsers.map(name => (
                          <button
                            key={name}
                            type="button"
                            onClick={() => { setComposeRecipient(name); setComposeSearch(name); }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 text-white flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faUser} className="text-blue-300" /> {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-blue-200 mb-2">Message</label>
                  <textarea
                    rows="3"
                    value={composeText}
                    onChange={(e) => setComposeText(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-white/10 text-white placeholder-blue-200 px-3 py-2 rounded-lg border border-white/20 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowNewMessage(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Cancel</button>
                  <button onClick={handleComposeSend} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">Send</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-blue-300" />
                </div>
              </div>

              <div className="overflow-y-auto h-full">
                {filteredConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {conversation.user.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-800"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-blue-200">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-blue-200 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex flex-col">
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {currentConversation.user.avatar}
                          </div>
                          {currentConversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-800"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{currentConversation.user.name}</h3>
                          <p className="text-xs text-blue-200">
                            {currentConversation.isOnline ? 'Online' : `Last seen ${currentConversation.user.lastSeen}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <FontAwesomeIcon icon={faVideo} className="text-blue-300" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <FontAwesomeIcon icon={faEllipsisV} className="text-blue-300" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentMessages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 0
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/10 text-white'
                        }`}>
                          {message.type === 'file' ? (
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faFile} className="text-blue-300" />
                              <div>
                                <p className="font-medium">{message.fileName}</p>
                                <p className="text-xs opacity-75">{message.fileSize}</p>
                              </div>
                            </div>
                          ) : (
                            <p>{message.content}</p>
                          )}
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-75">{message.timestamp}</span>
                            {message.senderId === 0 && (
                              <FontAwesomeIcon 
                                icon={message.isRead ? faCheckDouble : faCheck} 
                                className="text-xs opacity-75" 
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faPaperclip} className="text-blue-300" />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faImage} className="text-blue-300" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full bg-white/10 text-white placeholder-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faSmile} className="text-blue-300" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faMessage} className="text-6xl text-blue-300 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">Select a conversation</h3>
                    <p className="text-blue-200">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Messages;
