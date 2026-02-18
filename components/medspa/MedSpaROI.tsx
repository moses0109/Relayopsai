import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA ROI CALCULATOR — $1,800 avg consultation value           */
/* ------------------------------------------------------------------ */

interface MedSpaROIProps {
  onBookDemo: () => void;
}

const MedSpaROI: React.FC<MedSpaROIProps> = ({ onBookDemo }) => {
  const [missedCalls, setMissedCalls] = useState(15);
  const [avgValue, setAvgValue] = useState(1800);
  const [rebookRate, setRebookRate] = useState(50);

  // Calculate ROI
  const monthlyMissedCalls = missedCalls * 4;
  const monthlyLostRevenue = monthlyMissedCalls * avgValue;
  const recoverableRevenue = Math.round(monthlyLostRevenue * 0.80); // 80% capture rate
  const premiumCost = 999;
  const roi = Math.round(recoverableRevenue / premiumCost);
  const breakeven = 1; // Always 1 consultation

  return (
    <section id="calculator" className="py-8 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 fade-in-up leading-tight">
            See Your Exact Revenue Recovery <br />
            in <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">60 Seconds.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT: Calculator Inputs ── */}
          <div className="bg-white/50 border border-rose-200/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-lg">
            <h3 className="text-rose-600 font-black text-sm uppercase tracking-wide mb-6">Your Med Spa Data</h3>

            <div className="space-y-6">
              {/* Weekly Missed Calls */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-3">
                  Weekly Missed Calls
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={missedCalls}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: '#fb7185',
                  }}
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>5</span>
                  <span className="text-slate-800 font-black text-xl">{missedCalls}</span>
                  <span>40</span>
                </div>
              </div>

              {/* Avg Consultation Value */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-3">
                  Avg Consultation Value
                </label>
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="100"
                  value={avgValue}
                  onChange={(e) => setAvgValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: '#fb7185',
                  }}
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>$500</span>
                  <span className="text-slate-800 font-black text-xl">${avgValue.toLocaleString()}</span>
                  <span>$3,000</span>
                </div>
              </div>

              {/* Current Rebooking Rate */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-3">
                  Current Rebooking Rate
                </label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={rebookRate}
                  onChange={(e) => setRebookRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: '#fb7185',
                  }}
                />
                <div className="flex justify-between text-xs text-slate-600 mt-2">
                  <span>20%</span>
                  <span className="text-slate-800 font-black text-xl">{rebookRate}%</span>
                  <span>80%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Live Results ── */}
          <div className="bg-gradient-to-br from-white/70 to-rose-50/70 border border-rose-400/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-rose-400 font-black text-sm uppercase tracking-wide mb-6 relative z-10">Your Revenue Recovery</h3>

            <div className="space-y-6 relative z-10">
              {/* Lost Revenue */}
              <div className="pb-4 border-b border-rose-200/30">
                <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Monthly Lost Revenue</p>
                <p className="text-4xl md:text-5xl font-black text-slate-900 italic">
                  ${monthlyLostRevenue.toLocaleString()}
                </p>
              </div>

              {/* Recoverable */}
              <div className="pb-4 border-b border-rose-200/30">
                <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Recoverable with AI (80% capture)</p>
                <p className="text-4xl md:text-5xl font-black text-rose-600 italic">
                  ${recoverableRevenue.toLocaleString()}
                </p>
              </div>

              {/* ROI */}
              <div className="pb-4 border-b border-rose-200/30">
                <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">ROI vs. Premium Plan ($999)</p>
                <p className="text-4xl md:text-5xl font-black text-rose-600 italic">
                  {roi}x
                </p>
              </div>

              {/* Breakeven */}
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Breakeven</p>
                <p className="text-2xl font-black text-slate-900">
                  {breakeven} recovered consultation
                </p>
              </div>
            </div>

            {/* Live Preview Text */}
            <div className="mt-8 p-4 bg-white/60 rounded-xl border border-rose-200/40 relative z-10 backdrop-blur-sm">
              <p className="text-sm text-slate-700 leading-relaxed">
                With RelayOpsAI, you'd capture <span className="text-rose-600 font-black">{Math.round(monthlyMissedCalls * 0.8)} more consultations</span> this month = <span className="text-rose-600 font-black">${recoverableRevenue.toLocaleString()}</span> in revenue.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onBookDemo}
              className="w-full mt-6 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-black uppercase tracking-wide text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-rose-500/20 relative z-10"
            >
              Book My Free Med Spa Setup Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedSpaROI;
