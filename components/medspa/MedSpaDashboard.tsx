import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA DASHBOARD — Premium analytics view (MONEY FOCUSED)       */
/* ------------------------------------------------------------------ */

const MedSpaDashboard: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 leading-tight">
            You Don't Get a Dashboard. <br />
            <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              You Get a Money Printer.
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Real-time revenue tracking. No fluff. Just dollars captured.
          </p>
        </div>

        {/* Revenue-Focused Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Today's Revenue */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border-2 border-rose-400/30 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl" />
            <p className="text-rose-400 text-xs font-black uppercase tracking-wide mb-2 relative z-10">Today's Revenue</p>
            <p className="text-white text-4xl md:text-5xl font-black mb-2 relative z-10">$8,200</p>
            <p className="text-rose-300 text-sm font-bold relative z-10">↑ $2,700 more than yesterday</p>
          </div>

          {/* This Month */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-500/10 border-2 border-rose-400/30 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-3xl" />
            <p className="text-rose-400 text-xs font-black uppercase tracking-wide mb-2 relative z-10">This Month</p>
            <p className="text-white text-4xl md:text-5xl font-black mb-2 relative z-10">$69k</p>
            <p className="text-rose-300 text-sm font-bold relative z-10">↑ $27k increase vs last month</p>
          </div>

          {/* Captured Today */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-2 border-purple-400/30 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl" />
            <p className="text-purple-400 text-xs font-black uppercase tracking-wide mb-2 relative z-10">Calls Captured Today</p>
            <p className="text-white text-4xl md:text-5xl font-black mb-2 relative z-10">18/18</p>
            <p className="text-purple-300 text-sm font-bold relative z-10">100% capture rate. Zero missed.</p>
          </div>

        </div>

        {/* Live Call Feed */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-rose-400/20 bg-gradient-to-br from-[#0f172a] to-[#1a1428] shadow-2xl">

          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500/10 to-purple-500/10 backdrop-blur-sm px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <p className="text-white font-black text-sm uppercase">Live Call Feed — Glow Med Spa</p>
            </div>
            <div className="text-rose-400 text-xs font-black px-3 py-1 bg-rose-500/10 rounded-full">
              ACTIVE NOW
            </div>
          </div>

          {/* Live Calls */}
          <div className="p-6 space-y-3">
            {[
              { time: 'Just now', caller: 'Sarah M.', service: 'Botox', status: 'Booked + Upsold HydraFacial', revenue: '$1,650', color: 'rose' },
              { time: '3 min ago', caller: 'Jessica T.', service: 'Filler Consultation', status: 'Booked Thursday 2pm', revenue: '$2,200', color: 'pink' },
              { time: '8 min ago', caller: 'Nina P.', service: 'LED Therapy', status: 'Booked + Upsold Facial', revenue: '$520', color: 'purple' },
              { time: '12 min ago', caller: 'Marcus J.', service: 'Laser Hair Removal', status: 'Booked Package (6 sessions)', revenue: '$3,400', color: 'fuchsia' },
            ].map((call, i) => (
              <div key={i} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-rose-400/30 hover:bg-rose-400/[0.02] transition-all backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 bg-gradient-to-r from-${call.color}-400 to-${call.color}-500 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-black text-sm">{call.caller[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-white font-black text-sm">{call.caller}</p>
                        <span className="text-slate-600 text-xs">·</span>
                        <span className="text-slate-500 text-xs font-semibold whitespace-nowrap">{call.time}</span>
                      </div>
                      <p className="text-slate-400 text-xs mb-1">{call.service}</p>
                      <p className="text-rose-400 text-xs font-bold break-words">✓ {call.status}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-rose-400 text-xl font-black mb-1 whitespace-nowrap">{call.revenue}</p>
                    <p className="text-slate-600 text-xs uppercase font-bold tracking-wide">Captured</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary */}
          <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm px-6 py-4 border-t border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-slate-400 text-xs font-semibold">Last 24 hours:</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-right">
                  <p className="text-white font-black text-sm">47 calls</p>
                  <p className="text-slate-500 text-xs">100% answered</p>
                </div>
                <div className="text-right">
                  <p className="text-rose-400 font-black text-lg">$24,850</p>
                  <p className="text-rose-300 text-xs font-bold">Revenue captured</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <p className="text-center text-slate-500 text-xs mt-6 max-w-2xl mx-auto">
          Brooklyn med spa. Real revenue. Real time. Zero bullshit.
        </p>
      </div>
    </section>
  );
};

export default MedSpaDashboard;
