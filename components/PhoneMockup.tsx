
import React, { useState, useEffect, useRef } from 'react';

const chatMessages = [
  { role: 'user' as const, text: "Hi, my AC stopped working. Can someone come out today?" },
  { role: 'bot' as const, text: "I'm sorry to hear that! Let me check our availability right now. What's your zip code?" },
  { role: 'user' as const, text: "75201" },
  { role: 'bot' as const, text: "Great news — we have a technician available today between 2-4 PM. Should I book that for you?" },
  { role: 'user' as const, text: "Yes please!" },
  { role: 'bot' as const, text: "Done! You're booked for today 2-4 PM. You'll get a confirmation text shortly. Anything else I can help with?" },
];

const PhoneMockup: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          animateMessages();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Scroll only within the phone container, not the whole page
    if ((visibleCount > 0 || typing) && messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [visibleCount, typing]);

  const animateMessages = () => {
    let i = 0;
    const showNext = () => {
      if (i >= chatMessages.length) return;
      const isBot = chatMessages[i].role === 'bot';
      if (isBot) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setVisibleCount(prev => prev + 1);
          i++;
          setTimeout(showNext, 800);
        }, 1200);
      } else {
        setVisibleCount(prev => prev + 1);
        i++;
        setTimeout(showNext, 1000);
      }
    };
    setTimeout(showNext, 600);
  };

  return (
    <section ref={sectionRef} className="py-6 md:py-12 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">

        {/* Left — Copy */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-sky-400 text-xs font-black uppercase tracking-widest mb-3 fade-in-up">How It Sounds</p>
          <h2 className="text-2xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 leading-tight fade-in-up">
            Natural. <span className="gradient-relay">Professional.</span><br />Effective.
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mb-5 fade-in-up">
            Your AI receptionist handles conversations just like your best employee — but it never calls in sick, never puts anyone on hold, and never misses a booking.
          </p>
          <ul className="hidden lg:block space-y-4 mb-8 fade-in-up">
            {[
              'Answers in under 1 second',
              'Books appointments in real-time',
              'Knows your business inside and out',
              'Handles follow-ups naturally',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0" />
                <span className="text-sm font-bold text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sky-400 text-sm font-black uppercase tracking-wide hover:text-sky-300 transition-colors fade-in-up"
          >
            Get this for your business
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right — Phone */}
        <div className="flex-shrink-0 fade-in-up">
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute inset-[-30px] bg-gradient-to-br from-sky-500/15 to-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Phone frame */}
            <div className="relative w-[290px] md:w-[320px] bg-gray-900 rounded-[3rem] p-3 border border-white/10 shadow-2xl">
              {/* Notch */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto mb-1" />

              {/* Screen */}
              <div className="bg-gradient-to-b from-[#0c1a2e] to-[#0a1628] rounded-[2.2rem] overflow-hidden min-h-[480px] flex flex-col">
                {/* Chat header */}
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-wide">RelayOpsAI</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-[9px] font-bold uppercase">AI Receptionist</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[380px]" style={{ scrollbarWidth: 'none' }}>
                  {chatMessages.slice(0, visibleCount).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      style={{
                        animation: 'msgSlideIn 0.3s ease-out forwards',
                      }}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 text-[11px] md:text-xs leading-relaxed font-semibold ${
                          msg.role === 'user'
                            ? 'bg-sky-500 text-white rounded-2xl rounded-br-md'
                            : 'bg-white/[0.08] text-slate-200 rounded-2xl rounded-bl-md border border-white/[0.06]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3 border border-white/[0.06] flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Home indicator */}
              <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PhoneMockup;
