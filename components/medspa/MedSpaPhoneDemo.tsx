import React, { useState, useEffect, useRef } from 'react';

const MedSpaPhoneDemo: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [
    { role: 'customer', text: "Hi, I'm interested in Botox. Do you have appointments this week?" },
    { role: 'ai', text: "Absolutely! I can help you book a consultation. Have you had Botox before?" },
    { role: 'customer', text: "No, this is my first time. I'm a bit nervous." },
    { role: 'ai', text: "That's completely normal! Dr. Chen specializes in first-time treatments. We have availability Thursday at 2pm or Friday at 4pm. Which works better?" },
    { role: 'customer', text: "Thursday at 2pm works!" },
    { role: 'ai', text: "Perfect! I've booked you for Thursday, March 21st at 2pm. Would you like to add a HydraFacial for $150? It pairs beautifully with Botox." },
    { role: 'customer', text: "Sure, let's do it!" },
    { role: 'ai', text: "Wonderful! You're all set. I'll send a confirmation text with prep instructions. See you Thursday! ✨" },
  ];

  useEffect(() => {
    if (visibleCount >= messages.length) return;
    const timer = setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setVisibleCount(c => c + 1);
      }, 800);
    }, 1200);
    return () => clearTimeout(timer);
  }, [visibleCount, messages.length]);

  useEffect(() => {
    if ((visibleCount > 0 || typing) && messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, [visibleCount, typing]);

  return (
    <section className="py-10 px-4 md:px-6 relative bg-pink-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="medspa-serif text-3xl md:text-5xl font-black mb-4 text-slate-900 leading-tight">
            Watch It{' '}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Book & Upsell
            </span>{' '}
            in Real-Time
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
            This is what happens when a prospect calls at 9pm. No staff needed. Just revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Phone mockup */}
          <div className="relative mx-auto" style={{ maxWidth: '340px' }}>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[50px] p-4 shadow-2xl border-8 border-slate-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-slate-900 rounded-b-3xl z-10" />
              <div className="bg-gradient-to-b from-[#0f172a] to-[#1a1428] rounded-[42px] overflow-hidden border border-slate-600 relative" style={{ height: '600px' }}>

                <div className="bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-black">AI</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-black">RelayOpsAI Med Spa</p>
                    <p className="text-rose-400 text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse inline-block" />
                      Active
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(600px - 60px)' }}>
                  {messages.slice(0, visibleCount).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-white border border-rose-400/30'
                          : 'bg-white/10 text-slate-200'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-rose-400/30 px-4 py-3 rounded-2xl flex gap-1">
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-purple-500/20 blur-3xl rounded-full -z-10" />
          </div>

          {/* Stats */}
          <div className="space-y-6">
            {[
              { icon: '📞', title: 'After-Hours = $$$', desc: '60% of med spa calls happen after 6pm. Your AI never sleeps.' },
              { icon: '💰', title: 'Upsells Automatically', desc: 'AI suggests add-ons during booking. $150 HydraFacial → instant revenue bump.' },
              { icon: '🎯', title: 'Qualifies Every Lead', desc: 'Asks about experience, concerns, budget. Only serious buyers get booked.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#fdf8f5] border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-slate-900 font-black text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedSpaPhoneDemo;
