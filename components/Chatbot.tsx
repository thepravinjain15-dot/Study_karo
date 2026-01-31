
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/gemini';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! I’m your SkillSwap assistant. How can I help you level up today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const botReply = await getChatbotResponse(userMsg);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[150] w-14 h-14 rounded-full shadow-xl transition-all active:scale-90 flex items-center justify-center border border-white/20
          ${isOpen ? 'bg-white text-indigo-600 rotate-90' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}
        `}
      >
        <span className="text-2xl">{isOpen ? '✕' : '💬'}</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-[calc(100vw-4rem)] md:w-[380px] bg-white h-[550px] z-[150] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl text-indigo-600 border border-indigo-100">🤖</div>
               <div>
                 <p className="font-bold text-sm text-gray-900">SkillSwap AI</p>
                 <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Always Online</span>
                 </div>
               </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30"
          >
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}
                `}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl flex space-x-1.5 border border-gray-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-3">
            <input 
              type="text" 
              placeholder="Ask me about skills..."
              className="flex-1 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100"
            >
              <span className="text-lg">↗️</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
