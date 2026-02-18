import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PRICING — $599 Starter / $999 Premium                    */
/* ------------------------------------------------------------------ */

interface MedSpaPricingProps {
  onBookSetup: () => void;
}

const MedSpaPricing: React.FC<MedSpaPricingProps> = ({ onBookSetup }) => {
  const [openTier, setOpenTier] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-10 px-4 md:px-6 scroll-mt-32 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
            Two Tiers. One Goal: <br />
            <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
              Fill Your Calendar.
            </span>
          </h2>
          <p className="text-slate-700 text-sm md:text-base max-w-xl mx-auto leading-relaxed fade-in-up break-words px-4">
            One recovered consultation pays for the entire month. Done-for-you setup, dedicated support, no long-term contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto pt-8">

          {/* ── STARTER ── */}
          <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white/50 border border-rose-200/60 hover:border-rose-300/80 hover:shadow-xl backdrop-blur-xl">
            <div className="h-1 bg-gradient-to-r from-slate-500 to-slate-600" />

            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-slate-700 mb-1">Starter</h3>
              <p className="text-xs font-semibold text-slate-600 mb-6">Solo Providers & Small Spas</p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 relative -top-4">$</span>
                <span className="text-5xl font-black tracking-tight text-slate-800">599</span>
                <span className="text-sm font-bold text-slate-600 ml-1">/mo</span>
              </div>

              <p className="text-xs font-semibold text-slate-600 mb-1">400 minutes (~100 calls/mo)</p>
              <p className="text-xs font-bold text-rose-600 mb-6">$697 one-time setup</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  '24/7 inbound call answering',
                  'Real-time booking (Acuity, Vagaro, Square)',
                  'SMS appointment confirmations',
                  'Basic rebooking reminders (30-day)',
                  'Custom knowledge base',
                  'Monthly support call',
                  'HIPAA-compliant infrastructure',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-rose-600 flex-shrink-0 mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Add-on Minutes */}
              <div className="mb-6 pt-4 border-t border-rose-200/30">
                <button
                  onClick={() => setOpenTier(openTier === 'starter' ? null : 'starter')}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span>+ Add-On Minutes</span>
                  <svg className={`w-4 h-4 transition-transform ${openTier === 'starter' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openTier === 'starter' && (
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <p>+200 min: <span className="text-slate-900 font-bold">$99/mo</span></p>
                    <p>+500 min: <span className="text-slate-900 font-bold">$219/mo</span></p>
                  </div>
                )}
              </div>

              <button
                onClick={onBookSetup}
                className="w-full py-4 bg-gradient-to-r from-slate-400 to-slate-500 text-black rounded-full font-black uppercase tracking-wide text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
              >
                Start Capturing After-Hours Revenue
              </button>
            </div>
          </div>

          {/* ── PREMIUM ── */}
          <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-rose-50/80 to-pink-50/80 border-2 border-rose-400/40 hover:border-rose-400/60 hover:shadow-[0_0_50px_rgba(244,114,182,0.25)] backdrop-blur-xl">
            <div className="h-1 bg-gradient-to-r from-rose-400 to-pink-500" />

            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
              ⭐ Most Popular
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-grow">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-rose-600 mb-1">Premium</h3>
              <p className="text-xs font-semibold text-slate-700 mb-6">Multi-Provider & High-Volume</p>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xs font-bold text-slate-600 relative -top-4">$</span>
                <span className="text-5xl font-black tracking-tight text-slate-900">999</span>
                <span className="text-sm font-bold text-slate-600 ml-1">/mo</span>
              </div>

              <p className="text-xs font-semibold text-slate-700 mb-1">800 minutes (~200 calls/mo)</p>
              <p className="text-xs font-bold text-rose-600 mb-6">$697 one-time setup</p>

              {/* Features */}
              <p className="text-xs font-bold text-rose-600 mb-3 uppercase tracking-wide">Everything in Starter, PLUS:</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  '✨ Outbound rebooking calls (90-day Botox/filler reminders)',
                  '✨ Upsell automation during booking',
                  '✨ Post-treatment engagement (aftercare texts)',
                  '✨ Package sales guidance',
                  '✨ Advanced analytics dashboard',
                  '✨ Bi-weekly strategy calls',
                  '✨ Priority support (24/7 escalation)',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-rose-600 flex-shrink-0 mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Add-on Minutes */}
              <div className="mb-6 pt-4 border-t border-rose-200/30">
                <button
                  onClick={() => setOpenTier(openTier === 'premium' ? null : 'premium')}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <span>+ Add-On Minutes</span>
                  <svg className={`w-4 h-4 transition-transform ${openTier === 'premium' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openTier === 'premium' && (
                  <div className="mt-3 space-y-2 text-xs text-slate-700">
                    <p>+300 min: <span className="text-slate-900 font-bold">$129/mo</span></p>
                    <p>+700 min: <span className="text-slate-900 font-bold">$249/mo</span></p>
                  </div>
                )}
              </div>

              <button
                onClick={onBookSetup}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-black uppercase tracking-wide text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-rose-500/30"
              >
                Unlock Full Revenue Automation
              </button>
            </div>
          </div>

        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 text-xs font-bold uppercase tracking-wide text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> HIPAA-Compliant
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> 5-Minute Setup
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> No Long-Term Contract
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> 30-Day Money-Back
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedSpaPricing;
