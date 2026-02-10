
import React, { useState, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  MULTI-STEP ROI ESTIMATOR                                           */
/*  Step 1 → pick industry  |  Step 2 → sliders  |  Step 3 → results  */
/* ------------------------------------------------------------------ */

const industries = [
  { id: 'hvac',       label: 'HVAC',           defaults: { calls: 30, missed: 25, value: 1200 } },
  { id: 'dental',     label: 'Dental',         defaults: { calls: 40, missed: 20, value: 800  } },
  { id: 'salon',      label: 'Salon',          defaults: { calls: 25, missed: 30, value: 150  } },
  { id: 'restaurant', label: 'Restaurant',     defaults: { calls: 60, missed: 35, value: 80   } },
  { id: 'realestate', label: 'Real Estate',    defaults: { calls: 20, missed: 20, value: 5000 } },
  { id: 'law',        label: 'Law Firm',       defaults: { calls: 15, missed: 15, value: 3000 } },
  { id: 'auto',       label: 'Auto Repair',    defaults: { calls: 25, missed: 25, value: 600  } },
  { id: 'plumbing',   label: 'Plumbing',       defaults: { calls: 20, missed: 30, value: 900  } },
  { id: 'fitness',    label: 'Fitness',        defaults: { calls: 35, missed: 25, value: 200  } },
  { id: 'other',      label: 'Other',          defaults: { calls: 25, missed: 20, value: 500  } },
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
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
            The Missed <span className="text-cyan-400">Call Tax.</span>
          </h2>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed max-w-md mx-auto">
            See exactly how much revenue your phone line is leaking every month.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* ── STEP 1: Industry selector ── */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-center">
                Step 1 of 3 — Select Your Industry
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => pickIndustry(ind.id)}
                    className="py-5 px-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/50 hover:bg-white/[0.08] transition-all font-black uppercase text-[10px] tracking-widest text-white"
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Sliders ── */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-10">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                  Step 2 of 3 — Your Numbers
                </p>

                {/* Calls per day */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-widest text-[10px] font-black">
                    <span>Calls per day</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full">{callsPerDay}</span>
                  </div>
                  <input
                    type="range" min="1" max="200" value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Unanswered % */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-widest text-[10px] font-black">
                    <span>Unanswered calls (%)</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full">{missedRate}%</span>
                  </div>
                  <input
                    type="range" min="1" max="80" value={missedRate}
                    onChange={(e) => setMissedRate(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Average job value */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center uppercase tracking-widest text-[10px] font-black">
                    <span>Avg job / order value ($)</span>
                    <span className="text-white bg-white/5 px-4 py-1 rounded-full">${avgJobValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range" min="20" max="10000" step="10" value={avgJobValue}
                    onChange={(e) => setAvgJobValue(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-all shadow-xl mt-4"
                >
                  Calculate My Losses
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="text-slate-700 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors block mx-auto"
                >
                  ← Change Industry
                </button>
              </div>

              {/* Live preview */}
              <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2">
                  Live Estimate
                </p>
                <h3 className="text-4xl md:text-5xl font-black text-rose-500 tracking-tighter italic">
                  -${stats.lostRevenue.toLocaleString()}
                </h3>
                <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mt-2">
                  Lost per month from {stats.missedCalls} missed calls
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === 3 && (
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[4rem] max-w-2xl mx-auto text-center animate-in zoom-in-95 fade-in duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-purple-600" />

              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Your Results
              </p>

              {/* Lost revenue */}
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 mb-2">
                  Estimated Monthly Loss
                </p>
                <h3 className="text-5xl md:text-7xl font-black text-rose-500 tracking-tighter italic">
                  -${stats.lostRevenue.toLocaleString()}
                </h3>
                <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mt-3">
                  From {stats.missedCalls} missed calls / month
                </p>
              </div>

              {/* Recoverable */}
              <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-2">
                  Recoverable with RelayOpsAI
                </p>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">
                  +${stats.recoverable.toLocaleString()}
                </h3>
              </div>

              {/* Extra metrics */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xl font-black text-white italic">{stats.hoursSavedWeek}h</div>
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                    Saved / Week
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-lg font-black text-cyan-400 italic leading-tight">{stats.suggestedTier}</div>
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                    Suggested Plan
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToConsultation}
                className="w-full py-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl"
              >
                Book My Demo
              </button>

              <button
                onClick={() => setStep(2)}
                className="mt-6 text-slate-700 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors"
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
