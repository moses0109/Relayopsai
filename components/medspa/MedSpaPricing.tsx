import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PRICING — Modern Premium Design (2026)                   */
/* ------------------------------------------------------------------ */

interface MedSpaPricingProps {
  onBookSetup: () => void;
}

const MedSpaPricing: React.FC<MedSpaPricingProps> = ({ onBookSetup }) => {
  const [openTier, setOpenTier] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 px-6 md:px-8 scroll-mt-32 relative bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Urgency */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 mb-6">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rose-700">
              February Special: Save $200 on Setup (3 slots left)
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            <span className="text-slate-900">$1,800 Per Call.</span><br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              $599 to Capture Them All.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Recover one missed consultation. The entire month is paid for.
            <span className="block mt-2 text-slate-900 font-bold">Most clients ROI in 3 days.</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">

          {/* STARTER */}
          <div className="group relative rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden hover:shadow-xl">
            <div className="p-10 md:p-12">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-sm text-slate-600">Solo Providers & Small Spas</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-6xl font-black text-slate-900">$599</span>
                <span className="text-lg text-slate-600 font-medium">/month</span>
              </div>

              <div className="text-sm text-slate-600 mb-2">400 minutes (~100 calls/mo)</div>
              <div className="text-sm font-semibold text-rose-600 mb-10">+ $697 one-time setup</div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {[
                  '24/7 inbound call answering',
                  'Real-time booking integration',
                  'SMS appointment confirmations',
                  'Basic rebooking reminders',
                  'Custom knowledge base',
                  'Monthly support call',
                  'HIPAA-compliant infrastructure',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <svg className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Add-on */}
              <div className="mb-8 pb-8 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => setOpenTier(openTier === 'starter' ? null : 'starter')}
                  className="w-full text-left flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <span>Add-On Minutes</span>
                  <svg className={`w-4 h-4 transition-transform ${openTier === 'starter' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openTier === 'starter' && (
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>+200 min: <span className="text-slate-900 font-semibold">$99/mo</span></p>
                    <p>+500 min: <span className="text-slate-900 font-semibold">$219/mo</span></p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onBookSetup}
                className="w-full py-4 px-6 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* PREMIUM */}
          <div className="group relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-slate-700">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              Most Popular
            </div>

            <div className="p-10 md:p-12">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <p className="text-sm text-slate-400">Multi-Provider & High-Volume</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-6xl font-black text-white">$999</span>
                <span className="text-lg text-slate-400 font-medium">/month</span>
              </div>

              <div className="text-sm text-slate-400 mb-2">800 minutes (~200 calls/mo)</div>
              <div className="text-sm font-semibold text-rose-400 mb-10">+ $697 one-time setup</div>

              {/* Features */}
              <p className="text-xs font-bold text-rose-400 mb-4 uppercase tracking-wider">Everything in Starter, PLUS:</p>
              <ul className="space-y-4 mb-10">
                {[
                  'Outbound rebooking calls (90-day reminders)',
                  'Upsell automation during booking',
                  'Post-treatment engagement texts',
                  'Package sales guidance',
                  'Advanced analytics dashboard',
                  'Bi-weekly strategy calls',
                  'Priority support (24/7 escalation)',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Add-on */}
              <div className="mb-8 pb-8 border-t border-slate-700 pt-6">
                <button
                  type="button"
                  onClick={() => setOpenTier(openTier === 'premium' ? null : 'premium')}
                  className="w-full text-left flex items-center justify-between text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>Add-On Minutes</span>
                  <svg className={`w-4 h-4 transition-transform ${openTier === 'premium' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openTier === 'premium' && (
                  <div className="mt-4 space-y-2 text-sm text-slate-400">
                    <p>+300 min: <span className="text-white font-semibold">$129/mo</span></p>
                    <p>+700 min: <span className="text-white font-semibold">$249/mo</span></p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onBookSetup}
                className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
              >
                Get Premium
              </button>
            </div>
          </div>

        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-slate-600">
          {['HIPAA-Compliant', '5-Minute Setup', 'No Long-Term Contract', '30-Day Money-Back'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedSpaPricing;
