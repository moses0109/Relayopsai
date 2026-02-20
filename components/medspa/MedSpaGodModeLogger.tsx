import React, { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  GOD MODE LOGGER — Ghost Crawler™ live feed, luxury cream/rose style */
/* ------------------------------------------------------------------ */

const VISITORS = [
  { name: 'Sarah M.',    service: 'Botox Pricing',        value: '$1,800', ip: '104.21.x.x' },
  { name: 'Jennifer K.', service: 'Lip Filler Gallery',   value: '$650',   ip: '172.68.x.x' },
  { name: 'Rachel T.',   service: 'Laser Package (6x)',   value: '$3,400', ip: '198.41.x.x' },
  { name: 'Maria L.',    service: 'HydraFacial',          value: '$450',   ip: '141.101.x.x'},
  { name: 'Amanda C.',   service: 'VIP Membership',       value: '$299/mo',ip: '162.158.x.x'},
  { name: 'Priya S.',    service: 'CoolSculpting',        value: '$2,100', ip: '108.162.x.x'},
  { name: 'Olivia H.',   service: 'Microblading Consult', value: '$850',   ip: '190.93.x.x' },
  { name: 'Natalie B.',  service: 'PRP Hair Restore',     value: '$1,200', ip: '188.114.x.x'},
];

type Stage = 'detected' | 'outreach' | 'booked';

interface ActiveVisitor {
  name: string;
  service: string;
  value: string;
  stage: Stage;
  key: number;
}

const MedSpaGodModeLogger: React.FC = () => {
  const [visitor, setVisitor]   = useState<ActiveVisitor | null>(null);
  const [visible, setVisible]   = useState(true);
  const [minimized, setMinimized] = useState(false);
  const keyRef = useRef(0);
  const idxRef = useRef(0);

  useEffect(() => {
    const runCycle = () => {
      const v = VISITORS[idxRef.current % VISITORS.length];
      idxRef.current++;
      keyRef.current++;

      // stage 1 — detected
      setVisitor({ ...v, stage: 'detected', key: keyRef.current });

      // stage 2 — outreach
      const t1 = setTimeout(() => {
        setVisitor(prev => prev ? { ...prev, stage: 'outreach' } : null);
      }, 2200);

      // stage 3 — booked
      const t2 = setTimeout(() => {
        setVisitor(prev => prev ? { ...prev, stage: 'booked' } : null);
      }, 4500);

      return [t1, t2];
    };

    const timers = runCycle();
    const interval = setInterval(() => { runCycle(); }, 8000);
    const initial = setTimeout(() => { runCycle(); }, 5000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, []);

  if (!visible) return null;

  const stageConfig: Record<Stage, { label: string; dot: string; text: string; badge: string }> = {
    detected: {
      label: 'Ghost Crawler™ detected a visitor',
      dot: 'bg-amber-400',
      text: 'text-amber-700',
      badge: 'bg-amber-50 border-amber-200 text-amber-700',
    },
    outreach: {
      label: 'AI voice call queued via Vapi...',
      dot: 'bg-rose-500 animate-pulse',
      text: 'text-rose-700',
      badge: 'bg-rose-50 border-rose-200 text-rose-700',
    },
    booked: {
      label: 'Appointment booked!',
      dot: 'bg-emerald-500',
      text: 'text-emerald-700',
      badge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
  };

  const cfg = visitor ? stageConfig[visitor.stage] : null;

  return (
    <div
      className="fixed bottom-24 left-3 sm:left-4 z-40 transition-all duration-300"
      style={{ width: minimized ? '160px' : '268px' }}
    >
      <div
        className="rounded-2xl overflow-hidden shadow-xl shadow-rose-200/40 border border-rose-200/70"
        style={{ background: '#fdf8f5' }}
      >
        {/* Header bar */}
        <button
          type="button"
          onClick={() => setMinimized(m => !m)}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white/80 border-b border-rose-100 hover:bg-rose-50/60 transition-colors duration-200"
        >
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-sm shadow-rose-500/50 flex-shrink-0" />
          <span className="text-[10px] font-black text-rose-700 uppercase tracking-[0.12em] flex-1 text-left">
            Ghost Crawler™ — Live
          </span>
          <svg
            className={`w-3 h-3 text-rose-400 transition-transform duration-200 flex-shrink-0 ${minimized ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setVisible(false); }}
            className="ml-1 text-rose-300 hover:text-rose-500 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </button>

        {/* Body */}
        {!minimized && visitor && cfg && (
          <div className="px-3.5 py-3 space-y-2">
            {/* Status line */}
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wide ${cfg.text}`}>
                {cfg.label}
              </span>
            </div>

            {/* Visitor card */}
            <div className="rounded-xl bg-white border border-rose-100 p-2.5 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[8px] font-black">{visitor.name[0]}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{visitor.name}</span>
                </div>
                {visitor.stage === 'booked' && (
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    ✓ {visitor.value}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <svg className="w-2.5 h-2.5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z"/>
                </svg>
                Browsing: <span className="text-slate-700 font-semibold">{visitor.service}</span>
              </div>

              {(visitor.stage === 'outreach' || visitor.stage === 'booked') && (
                <div className="flex items-center gap-1.5 text-[10px] font-medium">
                  <svg className="w-2.5 h-2.5 text-rose-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                  </svg>
                  <span className={visitor.stage === 'booked' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                    {visitor.stage === 'booked' ? 'AI call placed — booked!' : 'AI voice call in progress...'}
                  </span>
                </div>
              )}
            </div>

            {/* Progress stages */}
            <div className="flex items-center gap-1">
              {(['detected', 'outreach', 'booked'] as Stage[]).map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                    s === 'detected' ? 'bg-amber-400' :
                    s === 'outreach' && (visitor.stage === 'outreach' || visitor.stage === 'booked') ? 'bg-rose-500' :
                    s === 'booked' && visitor.stage === 'booked' ? 'bg-emerald-500' :
                    'bg-rose-100'
                  }`} />
                  {i < 2 && <div className="w-0.5" />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[9px] text-slate-400 font-medium text-right">
              {visitor.stage === 'detected' ? 'Detected' : visitor.stage === 'outreach' ? 'AI Outreach' : '✓ Booked'} · just now
            </p>
          </div>
        )}

        {/* Footer */}
        {!minimized && (
          <div className="px-3.5 py-2 border-t border-rose-100/60 bg-rose-50/40 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
            <span className="text-[9px] text-rose-500 font-semibold uppercase tracking-wider">
              Tracking all visitors in real-time
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedSpaGodModeLogger;
