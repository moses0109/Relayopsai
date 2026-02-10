
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-400 underline font-black hover:text-cyan-300 transition-colors break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'bot', text: '' }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const streamResponse = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          systemInstruction: `YOU ARE THE RELAYOPSAI GROWTH AGENT. 
          
          IDENTITY RULES:
          1. You represent ONLY RelayOpsAI. Do not mention other brands.
          2. Your sole mission is protecting business revenue by eliminating missed calls.
          3. Your tone is elite, technical, yet highly persuasive.
          
          BUSINESS LOGIC:
          - A missed call = A lost customer to a competitor. 
          - Human receptionists are expensive and sleep. RelayOpsAI is $297/mo and never sleeps.
          - Customers hate voicemail; they love instant answers.
          
          ACTION RULES:
          - If the user asks for a link, pricing, or a meeting, PROVIDE THIS LINK IMMEDIATELY: ${CALENDLY_LINK}
          - Do not insist on questions if the user is in a hurry.
          
          PRICING:
          - Starter: $297/mo. Growth: $597/mo. Pro: $997/mo.`,
        },
      });

      let fullText = '';
      for await (const chunk of streamResponse) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      let errorMsg = "We're experiencing high demand! To get priority answers, please book your discovery call directly here: " + CALENDLY_LINK;
      
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        errorMsg = "RelayOpsAI is currently processing a high volume of requests. Skip the wait and book your priority session here: " + CALENDLY_LINK;
      }

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = errorMsg;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      {showTooltip && !isOpen && (
        <div className="fixed bottom-28 right-8 z-[70] animate-bounce pointer-events-none">
          <div className="bg-white text-black px-6 py-3 rounded-2xl shadow-2xl relative border border-black/10">
            <p className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">RelayOpsAI Concierge is Online</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-black/10"></div>
          </div>
        </div>
      )}

      <button 
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl z-[70] hover:scale-110 active:scale-95 transition-all group pointer-events-auto"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black animate-pulse"></div>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[600px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden z-[70] animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black italic">R</div>
              <div>
                <span className="font-black italic uppercase tracking-tighter block text-sm text-white">RelayOpsAI</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Growth Engine Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center py-10 px-4">
                <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-cyan-400">WELCOME TO RELAYOPSAI.</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">How much revenue are you losing to missed calls? I can help you fix it now.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-xs leading-relaxed font-bold shadow-sm ${m.role === 'user' ? 'bg-white text-black' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
                  {renderTextWithLinks(m.text || (i === messages.length - 1 && isLoading ? "Analyzing..." : ""))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-black border-t border-white/5">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message RelayOpsAI..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-xs text-white focus:outline-none focus:border-white/20 transition-all pr-16"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading}
                className="absolute right-3 top-3 bottom-3 px-4 bg-white text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
