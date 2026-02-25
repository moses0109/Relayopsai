import React from 'react';

/* ------------------------------------------------------------------ */
/*  LIVE VISITOR TICKER — horizontal scrolling social-proof strip      */
/* ------------------------------------------------------------------ */

const EVENTS = [
  { icon: '📅', text: 'Sarah M. just booked a Botox consultation — Manhattan, NY' },
  { icon: '💰', text: 'Jennifer K. upgraded to VIP Membership — $299/mo locked in' },
  { icon: '📞', text: 'AI answered after-hours call → Rachel T. booked Laser Package' },
  { icon: '✅', text: 'Maria L. rebooked HydraFacial (12-week auto-reminder sent)' },
  { icon: '🎯', text: 'Amanda C. qualified & booked CoolSculpting consult — $2,100' },
  { icon: '⚡', text: 'Priya S. called at 11:47pm → AI answered → appointment set' },
  { icon: '📅', text: 'Olivia H. booked Microblading consult — 42 seconds flat' },
  { icon: '💰', text: 'Natalie B. upgraded add-on during call → +$450 upsell captured' },
  { icon: '📞', text: 'AI handled 8 simultaneous inbound calls — zero hold time' },
  { icon: '✅', text: 'Auto-reminder sent → Botox rebooking confirmed in 3 minutes' },
];

/* Double the array so the marquee loops seamlessly */
const TICKER = [...EVENTS, ...EVENTS];

const MedSpaVisitorTicker: React.FC = () => {
  return (
    <div
      className="relative overflow-hidden border-y border-rose-200/60 py-3"
      style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #fdf8f5 50%, #fff0f5 100%)' }}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #fdf8f5, transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #fdf8f5, transparent)' }} />

      {/* Live dot + label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 bg-[#fdf8f5] pr-2">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.15em] whitespace-nowrap">Live</span>
      </div>

      {/* Scrolling track */}
      <div className="flex whitespace-nowrap" style={{ animation: 'tickerScroll 38s linear infinite' }}>
        {TICKER.map((ev, i) => (
          <div key={i} className="inline-flex items-center gap-2 px-6">
            <span className="text-base leading-none">{ev.icon}</span>
            <span className="text-xs font-semibold text-slate-700">{ev.text}</span>
            <span className="text-rose-300 mx-2 select-none">·</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedSpaVisitorTicker;
