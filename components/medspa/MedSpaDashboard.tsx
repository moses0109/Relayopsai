import React, { useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA DASHBOARD — Cream/Rose luxury theme (dark contrast section) */
/* ------------------------------------------------------------------ */

const socialProofEvents = [
  { name: 'Sarah M.', action: 'just booked Botox', value: '$1,800', time: '2s ago' },
  { name: 'Jennifer K.', action: 'booked Lip Filler', value: '$650', time: '12s ago' },
  { name: 'Rachel T.', action: 'signed up for VIP Membership', value: '$299/mo', time: '34s ago' },
  { name: 'Maria L.', action: 'booked HydraFacial', value: '$450', time: '1m ago' },
  { name: 'Amanda C.', action: 'booked Laser Package (6x)', value: '$3,400', time: '2m ago' },
];

const MedSpaDashboard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState(0);
  const [revenue, setRevenue] = useState(847320);
  const [humanTakeover, setHumanTakeover] = useState(false);
  const [callsToday, setCallsToday] = useState(34);
  const [proofIndex, setProofIndex] = useState(0);
  const [proofVisible, setProofVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 120) + 60);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallsToday(prev => prev + 1);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProofVisible(false);
      setTimeout(() => {
        setProofIndex(prev => (prev + 1) % socialProofEvents.length);
        setProofVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const leads = [
    {
      name: "Jennifer M.",
      service: "Botox Consultation",
      temp: "Hot" as const,
      active: true,
      value: "$1,800",
      time: "2 min ago",
      transcript: [
        { role: "ai", text: "Hi Jennifer! Thanks for calling Glow Med Spa. I'd love to help you book a Botox consultation — we have an opening this Thursday at 2pm. Does that work?" },
        { role: "client", text: "Oh wow yes! How long does it take?" },
        { role: "ai", text: "The consultation is about 30 minutes. Dr. Kim will walk you through the treatment areas and pricing. We also have a first-visit package — $50 off your first treatment. Want me to lock in Thursday?" },
        { role: "client", text: "Yes please! What do I need to bring?" },
        { role: "ai", text: "Just a valid ID and arrive 5 minutes early for your intake form. I'm sending a confirmation text now with all the details. See you Thursday, Jennifer! ✨" },
      ]
    },
    {
      name: "Rachel T.",
      service: "Lip Filler Inquiry",
      temp: "Warm" as const,
      active: true,
      value: "$650",
      time: "8 min ago",
      transcript: [
        { role: "ai", text: "Hi Rachel! Thanks for calling Glow Med Spa. Are you interested in our lip or cheek filler packages?" },
        { role: "client", text: "Yeah I want lip filler. How much is it?" },
        { role: "ai", text: "Our lip filler starts at $650 per syringe with Dr. Kim. We also have a popular combo — lips + tear troughs for $1,150 this month only. Want to book a free consultation first?" },
        { role: "client", text: "Maybe... I need to think about it." },
        { role: "ai", text: "Totally! I'll text you our before/after gallery and pricing menu right now. If you decide within 48 hours I can hold your slot — shall I send it?" },
      ]
    },
    {
      name: "Maria K.",
      service: "HydraFacial",
      temp: "Hot" as const,
      active: false,
      value: "$450",
      time: "31 min ago",
      transcript: [
        { role: "ai", text: "Hi Maria! You called about HydraFacial — great choice. We have openings today at 4pm or tomorrow at 11am. Which works better?" },
        { role: "client", text: "Today at 4 works perfect!" },
        { role: "ai", text: "Booked! You're all set for today at 4pm. We're at 285 Madison Ave, Suite 12. Parking on the street. Confirmation text sent — see you soon!" },
        { role: "client", text: "Amazing, thank you!" },
      ]
    },
    {
      name: "Sophia L.",
      service: "VIP Membership",
      temp: "Cold" as const,
      active: false,
      value: "$299/mo",
      time: "1 hr ago",
      transcript: [
        { role: "ai", text: "Hi Sophia! Thanks for your interest in our VIP Membership. It includes a monthly HydraFacial, 10% off all treatments, and priority booking — all for $299/month. Any questions?" },
        { role: "client", text: "Just browsing for now, thanks." },
        { role: "ai", text: "No problem! I'll send you our membership brochure. Your first month is $99 if you'd like to try it. We'll check in with you in a few days!" },
      ]
    },
  ];

  const tempStyles: Record<'Hot' | 'Warm' | 'Cold', string> = {
    Hot:  'text-rose-400 bg-rose-400/10 border-rose-400/30',
    Warm: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    Cold: 'text-slate-400 bg-slate-400/10 border-slate-400/30',
  };

  const lead = leads[selectedLead];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden" style={{ background: '#fdf8f5' }}>

      {/* ── Subtle cream background blooms ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-rose-200/30 blur-[90px] rounded-full" />
        <div className="absolute -top-12 -right-12 w-[350px] h-[350px] bg-pink-200/25 blur-[80px] rounded-full" />
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-12 relative">
          {/* Social proof bubble */}
          <div
            className={`inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-rose-50 border border-rose-200 mb-6 max-w-full transition-all duration-400 ${
              proofVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold text-rose-700 text-center">
              🎉 <span className="text-slate-900 font-black">{socialProofEvents[proofIndex].name}</span>{' '}
              {socialProofEvents[proofIndex].action} —{' '}
              <span className="text-rose-600 font-black">{socialProofEvents[proofIndex].value}</span>
            </span>
            <span className="text-[10px] text-slate-400 flex-shrink-0">{socialProofEvents[proofIndex].time}</span>
          </div>

          <h2 className="medspa-serif text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5 text-slate-900">
            Meet Your<br />
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
              AI Receptionist
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            While you're with clients, your AI answers every call, books appointments, and texts back missed callers — 24/7.
            Your dashboard shows every call and booking in real time.
          </p>
        </div>

        {/* ── DASHBOARD SHELL ── */}
        <div className="rounded-3xl bg-[#1a0f14] border border-rose-900/40 shadow-2xl shadow-rose-900/20 overflow-hidden">

          {/* Fake app chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#130a0f] border-b border-rose-900/40">
            <div className="w-3 h-3 rounded-full bg-rose-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-pink-400/70" />
            <span className="ml-4 text-xs text-rose-300/50 font-mono tracking-wide hidden sm:inline">
              RelayOpsAI — Glow Med Spa · Command Center
            </span>
            <span className="ml-4 text-xs text-rose-300/50 font-mono sm:hidden">
              Command Center
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
              <span className="text-xs text-rose-400 font-mono font-bold">LIVE</span>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-4">

            {/* ── ROI TICKER ── */}
            <div className="rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-rose-500/10 border border-rose-500/20 px-4 md:px-5 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-1">
                  Total Revenue Recovered
                </p>
                <p className="text-2xl sm:text-3xl md:text-5xl font-black text-white font-mono tracking-tight tabular-nums">
                  ${revenue.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  +$1,800 captured (last hour)
                </div>
                <p className="text-xs text-slate-500 font-mono">Since activation — Feb 3, 2025</p>
              </div>
            </div>

            {/* ── METRICS GRID ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Calls Answered Today', value: callsToday.toString(), color: 'text-rose-400',   border: 'border-rose-500/20' },
                { label: 'Appointments Booked',  value: '11',                  color: 'text-pink-300',   border: 'border-pink-500/20' },
                { label: 'Missed Calls Saved',   value: '8',                   color: 'text-amber-400',  border: 'border-amber-500/20' },
                { label: 'SMS Text-Backs Sent',   value: '23',                  color: 'text-rose-300',   border: 'border-rose-400/20' },
              ].map((m, i) => (
                <div key={i} className={`rounded-xl bg-rose-950/30 border ${m.border} p-4`}>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2 leading-tight">{m.label}</p>
                  <p className={`text-2xl md:text-3xl font-black font-mono tabular-nums ${m.color}`}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* ── LIVE FEED + TRANSCRIPT ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Live Pulse Feed */}
              <div className="rounded-2xl bg-rose-950/20 border border-rose-900/40 overflow-hidden">
                <div className="px-4 py-3 border-b border-rose-900/40 flex items-center gap-2">
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Active AI Conversations
                  </span>
                  <span className="ml-auto text-xs text-slate-500">
                    {leads.filter(l => l.active).length} live now
                  </span>
                </div>

                <div className="divide-y divide-rose-900/30">
                  {leads.map((l, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setSelectedLead(i); setHumanTakeover(false); }}
                      className={`w-full text-left px-4 py-3.5 flex items-center gap-3 transition-all duration-200 ${
                        selectedLead === i ? 'bg-rose-900/25' : 'hover:bg-rose-900/15'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        l.active
                          ? 'bg-rose-400 animate-pulse shadow-[0_0_6px_rgba(251,113,133,0.7)]'
                          : 'bg-slate-600'
                      }`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold text-white truncate">{l.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tempStyles[l.temp]}`}>
                            {l.temp}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-slate-500 truncate">{l.service}</p>
                          <span className="text-[10px] text-slate-600">·</span>
                          <p className="text-[10px] text-slate-600 flex-shrink-0">{l.time}</p>
                        </div>
                      </div>

                      <span className="text-sm font-black text-rose-400 flex-shrink-0">{l.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transcript Viewer */}
              <div className="rounded-2xl bg-rose-950/20 border border-rose-900/40 overflow-hidden flex flex-col min-h-[320px]">
                <div className="px-4 py-3 border-b border-rose-900/40 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    lead.active ? 'bg-rose-400 animate-pulse' : 'bg-slate-600'
                  }`} />
                  <span className="text-xs font-bold text-slate-300 flex-1 truncate">
                    {lead.name} — {lead.service}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHumanTakeover(!humanTakeover)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-200 flex-shrink-0 ${
                      humanTakeover
                        ? 'bg-rose-500 text-white shadow-[0_0_16px_rgba(244,63,94,0.6)] animate-pulse'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/40 hover:bg-rose-500/25'
                    }`}
                  >
                    <span className="hidden sm:inline">{humanTakeover ? "🔴 YOU'RE LIVE" : 'HUMAN TAKEOVER'}</span>
                    <span className="sm:hidden">{humanTakeover ? '🔴 LIVE' : 'TAKEOVER'}</span>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[240px]">
                  {lead.transcript.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-rose-950/60 text-slate-200 border border-rose-900/40 rounded-tl-sm'
                          : 'bg-rose-500/20 text-rose-200 border border-rose-500/20 rounded-tr-sm'
                      }`}>
                        {msg.role === 'ai' && (
                          <span className="block text-[10px] font-bold text-rose-400 mb-1 uppercase tracking-widest">
                            Aria AI
                          </span>
                        )}
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Human takeover input */}
                {humanTakeover && (
                  <div className="px-4 pb-4 pt-2 border-t border-rose-900/40">
                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wide mb-2">
                      You're in control — AI paused
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-rose-950/40 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-rose-500/70 transition-colors"
                      />
                      <button type="button" className="px-3 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors">
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-slate-500 text-sm font-medium mt-8">
          Every call answered. Every booking tracked. Every missed call recovered via SMS.
        </p>

      </div>
    </section>
  );
};

export default MedSpaDashboard;
