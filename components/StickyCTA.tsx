
import React, { useState, useEffect } from 'react';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('relay-cta-dismissed');
    if (dismissed) setIsDismissed(true);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('relay-cta-dismissed', 'true');
  };

  const openChatbot = () => {
    // Click the chatbot button
    const chatbotButton = document.querySelector('.fixed.bottom-8.right-8') as HTMLElement;
    if (chatbotButton) {
      chatbotButton.click();
    }
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-24 right-8 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-500">
      {/* Phone Widget */}
      <div className="relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 bg-cyan-500 rounded-3xl animate-pulse opacity-20 blur-xl"></div>

        {/* Main phone card */}
        <div className="relative bg-gradient-to-br from-black to-gray-900 border-2 border-cyan-500/50 rounded-3xl p-6 shadow-2xl shadow-cyan-500/20 min-w-[280px]">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Phone icon with animation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-4">
            <p className="text-white font-black text-sm uppercase tracking-wider mb-1">Talk to AI Now</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Click to start conversation</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={openChatbot}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Start Chat
          </button>

          {/* Live indicator */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">AI Online</span>
          </div>
        </div>

        {/* Arrow pointing to chatbot */}
        <div className="absolute -bottom-6 right-6 text-cyan-400 animate-bounce">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
