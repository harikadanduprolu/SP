'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Brain, 
  Lightbulb,
  BookOpen,
  Zap,
  Minimize2,
  Maximize2
} from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI study assistant. I can help you with explanations, generate mind maps, create flashcards, or answer any questions about your subjects. What would you like to study today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const quickActions = [
    { icon: Brain, label: 'Explain Concept', action: 'explain' },
    { icon: Lightbulb, label: 'Generate Ideas', action: 'generate' },
    { icon: BookOpen, label: 'Create Summary', action: 'summarize' },
    { icon: Zap, label: 'Quick Quiz', action: 'quiz' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: "I understand your question! Let me help you with that. Based on your study materials, here's what I can tell you...",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const prompts = {
      explain: "Can you explain a concept for me?",
      generate: "Help me generate study ideas",
      summarize: "Create a summary of my notes",
      quiz: "Give me a quick quiz"
    };

    setMessage(prompts[action as keyof typeof prompts]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 glow-effect"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
    }`}>
      <div className="glass rounded-2xl border border-white/10 h-full flex flex-col glow-effect">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Study Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white' 
                      : 'glass border border-white/10'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      className="flex items-center gap-2 p-2 glass rounded-lg hover:bg-white/10 transition-colors text-xs"
                    >
                      <Icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 glass rounded-lg border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}