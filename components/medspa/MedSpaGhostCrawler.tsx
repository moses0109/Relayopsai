import React, { useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  GHOST CRAWLER — Cream/Rose luxury theme                           */
/* ------------------------------------------------------------------ */

type Stage = 'visiting' | 'detected' | 'messaged' | 'booked';

const MedSpaGhostCrawler: React.FC = () => {
  const [stage, setStage] = useState<Stage>('visiting');
  const [activeVisitor, setActiveVisitor] = useState(0);

  const visitors = [
    {
      x: 48, y: 42,
      tag: 'Browsed: Botox Pricing',
      msg: '"Hi! I noticed you were checking out our Botox treatments. We have a Thursday slot open — want me to grab it for you?"',
      outcome: '✓ Botox consult booked — $1,800',
    },
    {
      x: 68, y: 58,
      tag: 'Browsed: Lip Filler Gallery',
      msg: '"Hey! Saw you checking out our filler results. Our lip package is $650 — any questions before you decide?"',
      outcome: '✓ Lip filler booked — $650',
    },
    {
      x: 30, y: 62,
      tag: 'Browsed: VIP Membership',
      msg: '"Hi! Saw you looking at our VIP Membership. First month is $99 — want me to walk you through what\'s included?"',
      outcome: '✓ Membership signup — $299/mo',
    },
  ];

  useEffect(() => {
    const runCycle = () => {
      setStage('visiting');
      const t1 = setTimeout(() => setStage('detected'), 1800);
      const t2 = setTimeout(() => setStage('messaged'), 3400);
      const t3 = setTimeout(() => setStage('booked'), 5200);
      const t4 = setTimeout(() => {
        setActiveVisitor(prev => (prev + 1) % visitors.length);
      }, 6800);
      return [t1, t2, t3, t4];
    };

    const timers = runCycle();
    const interval = setInterval(() => { runCycle(); }, 7500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  const v = visitors[activeVisitor];

  const stageLabels: { key: Stage; label: string }[] = [
    { key: 'visiting',  label: '1. Browsing' },
    { key: 'detected',  label: '2. Detected' },
    { key: 'messaged',  label: '3. AI Outreach' },
    { key: 'booked',    label: '4. Booked!' },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#fdf8f5] relative overflow-hidden">
      {/* Soft background bloom */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-l from-rose-200/30 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-pink-100/50 to-transparent blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 mb-7">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Ghost Crawler™ — Revenue Recovery</span>
            </div>

            <h2 className="medspa-serif text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-slate-900">
              We See Them.<br />
              <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                We Get Them Back.
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              97% of visitors leave without booking. They're not gone —
              <span className="text-slate-900 font-semibold"> they're anonymous. Ghost Crawler unmasks them, engages them in 30 seconds, and recovers the revenue before your competitor does.</span>
            </p>

            {/* UNMASK → ENGAGE → RECOVER */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              {[
                { step: 'UNMASK', color: 'bg-amber-100 text-amber-800 border-amber-300' },
                { step: '→', color: 'text-slate-400 font-black text-lg' },
                { step: 'ENGAGE', color: 'bg-rose-100 text-rose-800 border-rose-300' },
                { step: '→', color: 'text-slate-400 font-black text-lg' },
                { step: 'RECOVER', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
              ].map((item, i) => (
                item.step === '→'
                  ? <span key={i} className={item.color}>{item.step}</span>
                  : <span key={i} className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${item.color}`}>{item.step}</span>
              ))}
            </div>

            <div className="space-y-3 mb-10">
              {[
                { icon: '👁️', title: 'UNMASK — Intent Detection', desc: 'We identify anonymous visitors by device, behavior, and intent signal. Botox browsers. Filler shoppers. VIP prospects.' },
                { icon: '⚡', title: 'ENGAGE — 30-Second Outreach', desc: 'A personalized AI text fires within 30 seconds referencing exactly what they browsed. No templates. No generic blasts.' },
                { icon: '📅', title: 'RECOVER — Auto-Booking', desc: 'AI handles the full conversation and drops them into your calendar. Zero staff. Zero friction. Pure revenue.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/80 border border-rose-100 hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/50 transition-all duration-300">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
              <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                📊 Ghost Crawler recovers an average of{' '}
                <span className="text-rose-600 font-black text-base">23% of anonymous visitors</span>{' '}
                — revenue that was invisible to you until now.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Visualization ── */}
          <div>
            <div className="rounded-3xl bg-white border border-rose-200/60 overflow-hidden shadow-xl shadow-rose-200/40">
              {/* Header */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-rose-50/80 border-b border-rose-200/60">
                <div className="w-3 h-3 rounded-full bg-rose-400/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                <span className="ml-4 text-xs text-slate-500 font-mono">Ghost Crawler™ — Live Visitor Map</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-rose-600 font-mono font-bold">TRACKING</span>
                </div>
              </div>

              {/* Stage pills */}
              <div className="px-4 pt-4 grid grid-cols-4 gap-1.5">
                {stageLabels.map(({ key, label }) => (
                  <div
                    key={key}
                    className={`text-center py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all duration-500 ${
                      stage === key
                        ? 'bg-rose-100 text-rose-700 border border-rose-300'
                        : 'text-slate-400 border border-transparent'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="relative mx-4 my-3 rounded-xl border border-slate-200/60 bg-slate-50/60 overflow-hidden" style={{ height: '200px' }}>
                {/* Subtle grid */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Visitor dot */}
                <div
                  className={`absolute w-4 h-4 rounded-full transition-all duration-700 -translate-x-1/2 -translate-y-1/2 ${
                    stage === 'visiting'  ? 'bg-slate-300' :
                    stage === 'detected'  ? 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]' :
                    stage === 'messaged'  ? 'bg-rose-400 shadow-[0_0_14px_rgba(244,63,94,0.8)]' :
                                           'bg-rose-500 shadow-[0_0_22px_rgba(244,63,94,1)]'
                  }`}
                  style={{ left: `${v.x}%`, top: `${v.y}%` }}
                />

                {/* Detection ring */}
                {(stage === 'detected' || stage === 'messaged' || stage === 'booked') && (
                  <div
                    className="absolute w-8 h-8 rounded-full border-2 border-amber-300/60 -translate-x-1/2 -translate-y-1/2 animate-ping"
                    style={{ left: `${v.x}%`, top: `${v.y}%` }}
                  />
                )}

                {/* Tag */}
                {(stage === 'detected' || stage === 'messaged' || stage === 'booked') && (
                  <div
                    className="absolute bg-amber-50 border border-amber-300 rounded-lg px-2.5 py-1 text-[10px] text-amber-700 font-bold whitespace-nowrap -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${v.x}%`, top: `${v.y - 18}%` }}
                  >
                    {v.tag}
                  </div>
                )}

                {/* Booked */}
                {stage === 'booked' && (
                  <div className="absolute top-3 right-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs text-emerald-700 font-bold">
                    {v.outcome}
                  </div>
                )}
              </div>

              {/* AI message */}
              <div
                className={`mx-4 mb-4 rounded-xl border p-4 transition-all duration-500 ${
                  stage === 'messaged' || stage === 'booked'
                    ? 'bg-rose-50 border-rose-200 opacity-100'
                    : 'bg-slate-50/60 border-slate-200/40 opacity-30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${stage === 'messaged' || stage === 'booked' ? 'bg-rose-400 animate-pulse' : 'bg-slate-300'}`} />
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Aria AI — SMS Sent</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">{v.msg}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { value: '23%', label: 'Visitors Recovered' },
                { value: '<3 min', label: 'Outreach Time' },
                { value: '4.2x', label: 'vs. Email CTR' },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-white border border-rose-100">
                  <p className="text-rose-600 font-black text-lg">{s.value}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MedSpaGhostCrawler;
