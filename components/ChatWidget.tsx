
import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  PRE-SCRIPTED CHAT WIDGET (bottom-right floating)                   */
/*  100 % static — no live LLM, no API calls.                         */
/*  Edit the `responses` map below to change the copy.                 */
/* ------------------------------------------------------------------ */

const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

interface Message {
  from: 'bot' | 'user';
  text: string;
}

interface Option {
  label: string;
  /** key into `responses`, OR a special action string */
  next: string;
}

interface BotNode {
  text: string;
  options: Option[];
}

const responses: Record<string, BotNode> = {
  greeting: {
    text: "Welcome to RelayOpsAI! I can help you understand how our AI voice agents work. What would you like to know?",
    options: [
      { label: 'What does RelayOpsAI do?', next: 'whatWeDo' },
      { label: 'Who is this for?',          next: 'whoFor' },
      { label: 'How does a demo work?',     next: 'demoCall' },
      { label: 'Get Free Call Estimate',    next: '__scrollCalculator' },
    ],
  },
  whatWeDo: {
    text: "We deploy custom AI voice agents that answer your business calls 24/7. Unlike generic bots, our AI sounds human, books appointments directly into your calendar, sends SMS follow-ups, and captures every lead — even at 2 AM. Setup is fully done-for-you.",
    options: [
      { label: 'Who is this for?',      next: 'whoFor' },
      { label: 'How does setup work?',  next: 'setup' },
      { label: 'Book a Demo',           next: '__bookDemo' },
    ],
  },
  whoFor: {
    text: "We work with local service businesses — HVAC companies, dental offices, salons, law firms, real estate teams, restaurants, and more. If you get phone calls and can't always answer them, RelayOpsAI is built for you.",
    options: [
      { label: 'What does RelayOpsAI do?', next: 'whatWeDo' },
      { label: 'How does setup work?',     next: 'setup' },
      { label: 'Book a Demo',              next: '__bookDemo' },
    ],
  },
  demoCall: {
    text: "It's a quick 15-minute call where we analyze your current call volume, identify how many leads you're missing, and show you exactly how our AI would handle your specific calls. No pressure, no commitment — just clarity on what you're leaving on the table.",
    options: [
      { label: 'Book a Demo',             next: '__bookDemo' },
      { label: 'See Pricing',             next: '__scrollPricing' },
      { label: 'Get Free Call Estimate',   next: '__scrollCalculator' },
    ],
  },
  setup: {
    text: "We handle everything. After the demo call we map your call flow, FAQs, and calendar system. Within 48-72 hours your AI agent is live — answering calls, booking appointments, and following up via SMS. You don't touch a single dashboard.",
    options: [
      { label: 'See Pricing',           next: '__scrollPricing' },
      { label: 'Book a Demo',           next: '__bookDemo' },
      { label: 'Start Over',            next: '__reset' },
    ],
  },
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(responses.greeting.options);

  /* ---- helpers ---- */
  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ from: 'bot', text: responses.greeting.text }]);
      setCurrentOptions(responses.greeting.options);
    }
  };

  const handleOption = (opt: Option) => {
    /* Special actions */
    if (opt.next === '__scrollCalculator') { scrollTo('calculator'); return; }
    if (opt.next === '__scrollPricing')    { scrollTo('pricing');    return; }
    if (opt.next === '__bookDemo') {
      window.open(CALENDLY_LINK, '_blank');
      return;
    }
    if (opt.next === '__reset') {
      setMessages([{ from: 'bot', text: responses.greeting.text }]);
      setCurrentOptions(responses.greeting.options);
      return;
    }

    /* Normal flow */
    const node = responses[opt.next];
    if (!node) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: opt.label },
      { from: 'bot',  text: node.text },
    ]);
    setCurrentOptions(node.options);
  };

  return (
    <>
      {/* Floating toggle button - matches site theme */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : openChat}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] z-[70] hover:scale-110 hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-300 group pointer-events-auto border border-cyan-400/30"
      >
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-lg" />
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[90vw] md:w-[380px] max-h-[520px] bg-black/40 backdrop-blur-2xl border border-cyan-500/20 rounded-[2rem] shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden z-[70] animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-6 border-b border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-black italic shadow-lg border border-cyan-400/30">
              R
            </div>
            <div className="flex-1">
              <span className="font-black italic uppercase tracking-tighter block text-sm text-white">
                RelayOpsAI
              </span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-5 overflow-y-auto space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-bold ${
                    m.from === 'user'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-slate-300 border border-white/5'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick-reply options */}
            {currentOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {currentOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/60 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-[10px] font-black uppercase tracking-widest text-white"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="p-4 border-t border-cyan-500/10">
            <button
              onClick={() => scrollTo('calculator')}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold uppercase tracking-wider text-[10px] hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98] transition-all"
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
