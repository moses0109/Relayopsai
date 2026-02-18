
import React, { useState } from 'react';

const faqs = [
  {
    q: 'How does RelayOpsAI work?',
    a: 'We deploy a custom AI voice agent trained specifically on your business — your services, pricing, hours, and tone. It answers calls 24/7, books appointments directly into your calendar, sends SMS confirmations, and captures every lead. Setup takes 5 minutes and requires zero technical knowledge on your end.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plans start at $349/month for small businesses and scale based on call volume and features. Every plan includes done-for-you setup, a custom knowledge base, and dedicated support. One recovered job typically pays for the entire month.',
  },
  {
    q: 'Can it handle multiple languages?',
    a: 'Yes. Our AI supports 16+ languages with automatic detection. When a caller speaks Spanish, French, or any supported language, the AI seamlessly switches to match — no awkward transfers or language barriers.',
  },
  {
    q: "What happens if the AI can't answer something?",
    a: "If a question falls outside the AI's knowledge base, it gracefully captures the caller's details (name, number, and question) and immediately notifies you via text and email so you can follow up personally. No caller is ever left hanging.",
  },
  {
    q: 'How long does setup take?',
    a: "Most businesses go live within 5 minutes. We handle everything: mapping your call flow, building your knowledge base, configuring calendar integrations, and testing. You don't touch a thing.",
  },
  {
    q: 'Do I need to change my phone number?',
    a: 'No. We can forward your existing business number to your AI agent, or provide a new dedicated line. Your customers never know the difference — it sounds like a real receptionist at your business.',
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
            Frequently Asked <span className="gradient-relay">Questions.</span>
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wide fade-in-up">
            Everything you need to know before getting started
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="stagger-item rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-white/[0.12]">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-slate-500 group-hover:text-sky-400 flex-shrink-0 transition-all duration-300 ${openIdx === i ? 'rotate-45 text-sky-400' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIdx === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
