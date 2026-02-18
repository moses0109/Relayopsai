import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA BEFORE/AFTER — Revenue comparison charts                 */
/* ------------------------------------------------------------------ */

const MedSpaBeforeAfter: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-rose-400 text-xs font-black uppercase tracking-widest mb-4">Real NYC Med Spa Data</p>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
            Before vs. After <br />
            <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
              RelayOpsAI
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            This is what happened to Glow Med Spa (Manhattan) in their first 90 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* BEFORE */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-red-500/5 to-red-900/10 border-2 border-red-500/20 backdrop-blur-sm">
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full">
              <span className="text-red-400 text-xs font-black uppercase">Before</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">
              Manual Phone Handling
            </h3>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Monthly Revenue</p>
                <p className="text-white text-3xl font-black">$42,000</p>
                <p className="text-red-400 text-xs mt-1">Missing 30% of after-hours calls</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Calls Answered</p>
                <p className="text-white text-3xl font-black">70%</p>
                <p className="text-red-400 text-xs mt-1">30% missed = $12k/mo lost</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Rebooking Rate</p>
                <p className="text-white text-3xl font-black">35%</p>
                <p className="text-red-400 text-xs mt-1">No automated follow-ups</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Upsell Rate</p>
                <p className="text-white text-3xl font-black">8%</p>
                <p className="text-red-400 text-xs mt-1">Staff too busy to suggest add-ons</p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="space-y-2">
              {[
                'Staff overwhelmed during peak hours',
                'Midnight calls go straight to voicemail',
                'No rebooking reminders = churn',
                'Lost $12,000+ monthly in missed opportunities',
              ].map((pain, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-red-300">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <span>{pain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 to-pink-900/10 border-2 border-rose-400/40 backdrop-blur-sm shadow-[0_0_50px_rgba(244,114,182,0.15)]">
            <div className="absolute top-4 right-4 px-3 py-1 bg-rose-500/20 border border-rose-400/40 rounded-full">
              <span className="text-rose-400 text-xs font-black uppercase">After</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">
              With RelayOpsAI
            </h3>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-rose-400/20 shadow-[0_0_20px_rgba(244,114,182,0.1)]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Monthly Revenue</p>
                <p className="text-white text-3xl font-black">$69,400</p>
                <p className="text-rose-400 text-xs mt-1 font-bold">↑ +$27,400/mo (+65%)</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-rose-400/20 shadow-[0_0_20px_rgba(244,114,182,0.1)]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Calls Answered</p>
                <p className="text-white text-3xl font-black">100%</p>
                <p className="text-rose-400 text-xs mt-1 font-bold">↑ +30% capture</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-rose-400/20 shadow-[0_0_20px_rgba(244,114,182,0.1)]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Rebooking Rate</p>
                <p className="text-white text-3xl font-black">65%</p>
                <p className="text-rose-400 text-xs mt-1 font-bold">↑ +30% with AI reminders</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-rose-400/20 shadow-[0_0_20px_rgba(244,114,182,0.1)]">
                <p className="text-slate-500 text-xs font-bold uppercase mb-1">Upsell Rate</p>
                <p className="text-white text-3xl font-black">47%</p>
                <p className="text-rose-400 text-xs mt-1 font-bold">↑ +39% with AI suggestions</p>
              </div>
            </div>

            {/* Wins */}
            <div className="space-y-2">
              {[
                'Zero missed calls. Ever.',
                'After-hours revenue jumped $15k/month',
                'Botox rebookings automated at 12 weeks',
                'AI upsells add-ons 5x better than staff',
              ].map((win, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-rose-300">
                  <span className="text-rose-400 mt-0.5">✓</span>
                  <span>{win}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-400/20 backdrop-blur-sm">
          <p className="text-white text-2xl md:text-3xl font-black mb-3">
            That's <span className="text-rose-400">+$27,400/month</span> in just 90 days.
          </p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Same team. Same services. Just smarter phone handling. Your med spa could see similar results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MedSpaBeforeAfter;
