
import React from 'react';

const capabilities = [
  {
    icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    title: '24/7 Inbound Calls',
    desc: 'Every call answered instantly — day, night, weekends, holidays. Zero missed leads.',
  },
  {
    icon: 'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z',
    title: 'Outbound Calling',
    desc: 'AI follows up on quotes, confirms appointments, and re-engages lapsed customers.',
  },
  {
    icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z',
    title: 'Live Booking',
    desc: 'Books directly into your calendar in real-time. Handles rescheduling and cancellations.',
  },
  {
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zm-9-4h2v2h-2v-2zm0-6h2v4h-2V6z',
    title: 'SMS Follow-Ups',
    desc: 'Sends confirmations, reminders, and follow-up texts after every call automatically.',
  },
  {
    icon: 'M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
    title: 'Multilingual',
    desc: 'Speaks 16+ languages fluently. Serve every customer in their own language.',
  },
  {
    icon: 'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
    title: 'Custom Knowledge Base',
    desc: 'Trained on your business: services, pricing, hours, policies, and FAQs.',
  },
  {
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    title: 'After Hours Coverage',
    desc: 'Your office closes but your phone never does. Capture every late-night and weekend lead.',
  },
  {
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    title: 'Call Intelligence',
    desc: 'Full transcripts, AI summaries, sentiment analysis, and weekly reports on every call.',
  },
];

const Features: React.FC = () => (
  <div className="w-full">
    <p className="text-xs font-black uppercase tracking-widest text-slate-600 mb-8 text-center">
      What Your AI Handles
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {capabilities.map((cap, i) => (
        <div
          key={i}
          className="stagger-item group p-5 md:p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-sky-400/30 hover:bg-sky-500/[0.04] transition-all duration-500"
        >
          <div className="w-10 h-10 mb-4 bg-white/[0.06] rounded-xl flex items-center justify-center group-hover:bg-sky-500/10 transition-colors duration-300">
            <svg className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d={cap.icon} />
            </svg>
          </div>
          <h4 className="text-xs md:text-sm font-black uppercase tracking-wide text-white mb-2">{cap.title}</h4>
          <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-medium">{cap.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
