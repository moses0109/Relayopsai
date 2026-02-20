import React, { useState } from 'react';

interface MedSpaROIProps {
  onBookDemo: () => void;
}

const MedSpaROI: React.FC<MedSpaROIProps> = ({ onBookDemo }) => {
  const [missedCalls, setMissedCalls] = useState(15);
  const [avgValue, setAvgValue] = useState(1800);
  const [rebookRate, setRebookRate] = useState(50);

  const monthlyMissedCalls = missedCalls * 4;
  const monthlyLostRevenue = monthlyMissedCalls * avgValue;
  const recoverableRevenue = Math.round(monthlyLostRevenue * 0.80);
  const premiumCost = 1299;
  const roi = Math.round(recoverableRevenue / premiumCost);

  return (
    <section id="calculator" className="py-8 px-4 md:px-6 relative bg-[#fdf8f5]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="medspa-serif text-3xl md:text-5xl font-black mb-6 leading-tight text-slate-900">
            See Your Exact Revenue Recovery<br />
            in{' '}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              60 Seconds.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Inputs */}
          <div className="bg-white border border-rose-200 rounded-3xl p-6 md:p-8 shadow-lg">
            <h3 className="text-rose-600 font-black text-sm uppercase tracking-wide mb-6">Your Med Spa Data</h3>

            <div className="space-y-6">
              {[
                { id: 'missed-calls', label: 'Weekly Missed Calls', value: missedCalls, min: 5, max: 40, step: 1, display: missedCalls.toString(), set: setMissedCalls, lo: '5', hi: '40' },
                { id: 'avg-value', label: 'Avg Consultation Value', value: avgValue, min: 500, max: 3000, step: 100, display: `$${avgValue.toLocaleString()}`, set: setAvgValue, lo: '$500', hi: '$3,000' },
                { id: 'rebook-rate', label: 'Current Rebooking Rate', value: rebookRate, min: 20, max: 80, step: 1, display: `${rebookRate}%`, set: setRebookRate, lo: '20%', hi: '80%' },
              ].map((s) => (
                <div key={s.id}>
                  <label htmlFor={s.id} className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-3">
                    {s.label}
                  </label>
                  <input
                    id={s.id}
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    aria-label={s.label}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: '#fb7185' }}
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-2">
                    <span>{s.lo}</span>
                    <span className="text-slate-800 font-black text-xl">{s.display}</span>
                    <span>{s.hi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-white to-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-rose-500 font-black text-sm uppercase tracking-wide mb-6 relative z-10">Your Revenue Recovery</h3>

            <div className="space-y-6 relative z-10">
              {[
                { label: 'Monthly Lost Revenue', value: `$${monthlyLostRevenue.toLocaleString()}`, color: 'text-slate-900' },
                { label: 'Recoverable with AI (80% capture)', value: `$${recoverableRevenue.toLocaleString()}`, color: 'text-rose-600' },
                { label: `ROI vs Scale Plan ($${premiumCost.toLocaleString()})`, value: `${roi}x`, color: 'text-rose-600' },
                { label: 'Breakeven', value: '1 recovered consultation', color: 'text-slate-900', small: true },
              ].map((row, i) => (
                <div key={i} className={`pb-4 ${i < 3 ? 'border-b border-rose-200/40' : ''}`}>
                  <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">{row.label}</p>
                  <p className={`font-black italic ${row.small ? 'text-2xl' : 'text-4xl md:text-5xl'} ${row.color}`}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/60 rounded-xl border border-rose-200/40 relative z-10 backdrop-blur-sm">
              <p className="text-sm text-slate-700 leading-relaxed">
                With RelayOpsAI, you'd capture{' '}
                <span className="text-rose-600 font-black">{Math.round(monthlyMissedCalls * 0.8)} more consultations</span>{' '}
                this month ={' '}
                <span className="text-rose-600 font-black">${recoverableRevenue.toLocaleString()}</span> in revenue.
              </p>
            </div>

            <button
              type="button"
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
