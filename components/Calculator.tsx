
import React, { useState, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  MULTI-STEP ROI ESTIMATOR                                           */
/*  Step 1 → pick industry  |  Step 2 → sliders  |  Step 3 → results  */
/* ------------------------------------------------------------------ */

const industries = [
  { id: 'hvac',       label: 'HVAC',        icon: 'M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z', defaults: { calls: 30, missed: 25, value: 1200 } },
  { id: 'dental',     label: 'Dental',      icon: 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z', defaults: { calls: 40, missed: 20, value: 800  } },
  { id: 'salon',      label: 'Salon',       icon: 'M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z', defaults: { calls: 25, missed: 30, value: 150  } },
  { id: 'restaurant', label: 'Restaurant',  icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z', defaults: { calls: 60, missed: 35, value: 80   } },
  { id: 'realestate', label: 'Real Estate', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', defaults: { calls: 20, missed: 20, value: 5000 } },
  { id: 'law',        label: 'Law Firm',    icon: 'M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z', defaults: { calls: 15, missed: 15, value: 3000 } },
  { id: 'auto',       label: 'Auto Repair', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z', defaults: { calls: 25, missed: 25, value: 600  } },
  { id: 'plumbing',   label: 'Plumbing',    icon: 'M19.28 8.6l-.7-1.21-1.27.51-1.18.47-.33-.88-.18-.47H12.5v2h2.09l.87 2.29c.12.31.18.64.18.97v5.68c0 .4-.33.73-.73.73h-2.09c-.41 0-.73-.33-.73-.73V12.5H9.6L7.5 10.4V7.59L5.41 9.68 4 8.27l3.59-3.59 2.5 2.5V10h2.38l1.5-1.5H19.28z', defaults: { calls: 20, missed: 30, value: 900  } },
  { id: 'fitness',    label: 'Fitness',     icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z', defaults: { calls: 35, missed: 25, value: 200  } },
  { id: 'medspa',     label: 'Med Spa',     icon: 'M17.73 12.02l3.98-3.98-2.2-2.2-3.99 3.98-2.15-2.16 4-3.97-2.22-2.22-3.98 3.98-2.36-2.36-2.2 2.2 12.71 12.71 2.2-2.2-2.15-2.14.36-.37zm-6.71 2.09l-2.12-2.12-4.03 4.03 2.12 2.12 4.03-4.03z', defaults: { calls: 20, missed: 20, value: 400  } },
  { id: 'insurance',  label: 'Insurance',   icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', defaults: { calls: 30, missed: 15, value: 1500 } },
  { id: 'roofing',    label: 'Roofing',     icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', defaults: { calls: 15, missed: 25, value: 3000 } },
  { id: 'other',      label: 'Other',       icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', defaults: { calls: 25, missed: 20, value: 500  } },
];

const Calculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [callsPerDay, setCallsPerDay] = useState(25);
  const [missedRate, setMissedRate] = useState(20);
  const [avgJobValue, setAvgJobValue] = useState(500);

  /* Select industry & pre-fill defaults */
  const pickIndustry = (id: string) => {
    setIndustry(id);
    const match = industries.find((i) => i.id === id);
    if (match) {
      setCallsPerDay(match.defaults.calls);
      setMissedRate(match.defaults.missed);
      setAvgJobValue(match.defaults.value);
    }
    setStep(2);
  };

  /* Calculations */
  const stats = useMemo(() => {
    const monthlyCalls    = callsPerDay * 22;
    const missedCalls     = Math.round(monthlyCalls * (missedRate / 100));
    const lostRevenue     = missedCalls * avgJobValue;
    const recoverable     = Math.round(lostRevenue * 0.9);
    const hoursSavedWeek  = Math.round((missedCalls / 4) * 3 / 60);    // ~3 min/call
    const suggestedTier   =
      monthlyCalls <= 300  ? 'Starter ($297/mo)' :
      monthlyCalls <= 700  ? 'Growth ($597/mo)'  :
                             'Elite ($997/mo)';
    return { missedCalls, lostRevenue, recoverable, hoursSavedWeek, suggestedTier };
  }, [callsPerDay, missedRate, avgJobValue]);

  const scrollToConsultation = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="calculator" className="py-12 px-6 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
            The Missed <span className="text-cyan-400">Call Tax.</span>
          </h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wide leading-relaxed max-w-md mx-auto fade-in-up">
            See exactly how much revenue your phone line is leaking every month.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* ── STEP 1: Industry selector ── */}
          {step === 1 && (
            <div className="opacity-100 transition-opacity duration-300 fade-in-up">
              <p className="text-cyan-400 text-xs font-black uppercase tracking-wide mb-6 text-center break-words">
                Step 1 of 3 — Select Your Industry
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => pickIndustry(ind.id)}
                    className="stagger-item group p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-center backdrop-blur-sm active:scale-95"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 bg-white/[0.04] rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                      <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d={ind.icon} />
                      </svg>
                    </div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500 group-hover:text-cyan-400 transition-colors duration-300 break-words">{ind.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Sliders ── */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start opacity-100 transition-opacity duration-300">
              <div className="space-y-10">
                <p className="text-cyan-400 text-xs font-black uppercase tracking-wide mb-2 break-words">
                  Step 2 of 3 — Your Numbers
                </p>

                {/* Calls per day */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-wide text-xs font-black break-words gap-2">
                    <span>Calls per day</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full whitespace-nowrap">{callsPerDay}</span>
                  </div>
                  <input
                    type="range" min="1" max="200" value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Unanswered % */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-wide text-xs font-black break-words gap-2">
                    <span>Unanswered calls (%)</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full whitespace-nowrap">{missedRate}%</span>
                  </div>
                  <input
                    type="range" min="1" max="80" value={missedRate}
                    onChange={(e) => setMissedRate(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Average job value */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-wide text-xs font-black break-words gap-2">
                    <span>Avg job / order value ($)</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full whitespace-nowrap">${avgJobValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range" min="20" max="10000" step="10" value={avgJobValue}
                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-wide text-xs rounded-2xl hover:scale-[1.02] transition-all shadow-xl mt-4 break-words"
                >
                  Calculate My Losses
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-wide transition-colors block mx-auto break-words"
                >
                  ← Change Industry
                </button>
              </div>

              {/* Live preview */}
              <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-10 rounded-2xl sm:rounded-3xl text-center">
                <p className="text-xs font-black uppercase tracking-wide text-cyan-400/70 mb-2 break-words">
                  Live Estimate
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-500 tracking-tighter italic break-words">
                  -${stats.lostRevenue.toLocaleString()}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-2 break-words">
                  Lost per month from {stats.missedCalls} missed calls
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === 3 && (
            <div className="bg-white/[0.02] border border-white/5 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl md:rounded-[4rem] max-w-2xl mx-auto text-center opacity-100 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-purple-600" />

              <p className="text-cyan-400 text-xs font-black uppercase tracking-wide mb-8 break-words">
                Your Results
              </p>

              {/* Lost revenue */}
              <div className="mb-10">
                <p className="text-xs font-black uppercase tracking-wide text-cyan-400/70 mb-2 break-words">
                  Estimated Monthly Loss
                </p>
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-rose-500 tracking-tighter italic break-words">
                  -${stats.lostRevenue.toLocaleString()}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-3 break-words">
                  From {stats.missedCalls} missed calls / month
                </p>
              </div>

              {/* Recoverable */}
              <div className="p-5 sm:p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl sm:rounded-3xl mb-10">
                <p className="text-xs font-black uppercase tracking-wide text-cyan-500 mb-2 break-words">
                  Recoverable with RelayOpsAI
                </p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter italic break-words">
                  +${stats.recoverable.toLocaleString()}
                </h3>
              </div>

              {/* Extra metrics */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-black text-white italic">{stats.hoursSavedWeek}h</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 break-words">
                    Saved / Week
                  </div>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-base sm:text-lg font-black text-cyan-400 italic leading-tight break-words">{stats.suggestedTier}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1 break-words">
                    Suggested Plan
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToConsultation}
                className="w-full py-6 bg-white text-black font-black uppercase tracking-wide text-xs rounded-2xl hover:scale-105 transition-all shadow-xl break-words"
              >
                Book My Demo
              </button>

              <button
                onClick={() => setStep(2)}
                className="mt-6 text-slate-400 hover:text-white text-xs font-black uppercase tracking-wide transition-colors break-words"
              >
                ← Adjust Numbers
              </button>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
