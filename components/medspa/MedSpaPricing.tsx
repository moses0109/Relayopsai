import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PRICING — 3 Tiers + 14-Day ROI Guarantee (cream theme)   */
/* ------------------------------------------------------------------ */

interface MedSpaPricingProps {
  onBookSetup: (tier: string) => void;
}

const MedSpaPricing: React.FC<MedSpaPricingProps> = ({ onBookSetup }) => {
  const tiers = [
    {
      name: 'Starter',
      tagline: 'AI SMS Receptionist',
      price: '$599',
      period: '/mo',
      setup: '+ $497 one-time setup',
      highlight: false,
      badge: null,
      checkColor: 'text-rose-400',
      btnClass: 'bg-white border-2 border-rose-200 hover:border-rose-400 text-slate-800 hover:shadow-lg hover:shadow-rose-100',
      features: [
        'AI SMS Receptionist — answers every inquiry',
        'Auto-Booking into your calendar',
        'Appointment confirmations & reminders',
        'Basic rebooking follow-ups at 90 days',
        'Custom knowledge base for your spa',
        'Monthly strategy call',
        'HIPAA-compliant infrastructure',
      ],
    },
    {
      name: 'Scale',
      tagline: 'Full Command Center',
      price: '$1,299',
      period: '/mo',
      setup: '+ $497 one-time setup',
      highlight: true,
      badge: 'Most Popular',
      checkColor: 'text-rose-200',
      btnClass: 'bg-white text-rose-700 font-bold hover:bg-rose-50 shadow-xl shadow-rose-900/20 hover:shadow-rose-900/30',
      features: [
        'Everything in Starter, PLUS:',
        'Voice AI — answers calls like a real receptionist',
        'Ghost Crawler™ — recovers anonymous visitors',
        'Social Proof Bubbles — "Sarah just booked Botox!"',
        'Full Command Center Dashboard',
        'Upsell automation during every booking',
        'Bi-weekly strategy & optimization calls',
        'Priority 24/7 support escalation',
      ],
    },
    {
      name: 'Empire',
      tagline: 'Strategic Partner',
      price: '$2,499',
      period: '/mo',
      setup: '+ $997 one-time setup',
      highlight: false,
      badge: 'Done-For-You',
      checkColor: 'text-rose-400',
      btnClass: 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30',
      features: [
        'Everything in Scale, PLUS:',
        'Database Reactivation — revive dormant clients',
        'Custom Marketing Automation sequences',
        'Outbound AI campaigns (SMS + Voice)',
        'Multi-location management',
        'Dedicated Strategic Partner (weekly calls)',
        'Custom reporting & revenue attribution',
        'White-glove onboarding & staff training',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden scroll-mt-20 bg-[#fdf8f5]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-rose-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-100/20 to-transparent blur-3xl" />
        {/* Botanical drifts */}
        <svg className="absolute -top-6 -right-8 w-44 md:w-60 text-rose-200/40 leaf-float-d" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.65"/>
          <path d="M175 0 C145 35 105 82 80 170 C95 178 110 152 122 124 C144 80 162 38 175 0Z" opacity="0.4"/>
        </svg>
        <svg className="absolute -bottom-6 -left-8 w-36 md:w-52 text-pink-200/35 leaf-float-c" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.6"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50/80 border border-rose-200/60 shadow-lg shadow-rose-500/10 mb-6">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rose-700">
              February Special — 3 setup slots remaining
            </span>
          </div>

          <h2 className="medspa-serif text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5">
            <span className="text-slate-900">One Recovered Call</span><br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Pays for the Month.
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Most clients see ROI within 72 hours of going live.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14 items-start">
          {tiers.map((tier, i) => (
            /* Outer wrapper gives vertical space for the badge above the card */
            <div key={i} className={`relative ${tier.badge ? 'pt-6' : ''}`}>

              {/* Badge lives OUTSIDE overflow-hidden so it renders fully */}
              {tier.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30 whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div
                className={`relative rounded-3xl transition-all duration-500 hover:-translate-y-1 ${
                  tier.highlight
                    ? 'bg-gradient-to-b from-rose-800 via-rose-700 to-pink-800 border-2 border-rose-400/60 shadow-2xl shadow-rose-900/40 hover:shadow-rose-900/50'
                    : 'bg-white border border-rose-200 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-200/40'
                }`}
              >
              <div className="p-8 md:p-10">
                <div className="mb-7">
                  <h3 className={`text-xl font-black mb-1 ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                  <p className={`text-sm font-semibold ${tier.highlight ? 'text-rose-200' : 'text-rose-500'}`}>{tier.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-5xl font-black font-mono ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>{tier.price}</span>
                  <span className={`font-medium ${tier.highlight ? 'text-rose-200' : 'text-slate-500'}`}>{tier.period}</span>
                </div>
                <p className={`text-xs mb-8 ${tier.highlight ? 'text-rose-200' : 'text-slate-400'}`}>{tier.setup}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-3 text-sm ${
                      j === 0 && i > 0
                        ? `${tier.highlight ? 'text-rose-200' : 'text-slate-400'} font-semibold`
                        : tier.highlight ? 'text-rose-100' : 'text-slate-700'
                    }`}>
                      {j === 0 && i > 0 ? (
                        <span className="flex-shrink-0 mt-0.5">—</span>
                      ) : (
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.checkColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onBookSetup(tier.name.toLowerCase())}
                  className={`group relative w-full py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${tier.btnClass}`}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="relative z-10">Get Started with {tier.name}</span>
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* 14-Day Guarantee */}
        <div className="relative rounded-3xl overflow-hidden border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50/50 p-8 md:p-12 text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-rose-200/30 to-transparent blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-5xl mb-5">🛡️</div>
            <h3 className="medspa-serif text-3xl md:text-4xl font-black text-slate-900 mb-4">
              The 14-Day ROI Guarantee
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
              If RelayOpsAI doesn't recover more than its monthly cost within your first 14 days,{' '}
              <span className="text-slate-900 font-bold">you get a 100% refund. No questions. No hassle.</span>
            </p>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              We're confident because the average med spa recovers $8,000–$24,000 in the first month. We only win when you win.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600 mt-10">
          {['HIPAA-Compliant', '5-Min Setup', 'No Long-Term Contract', '14-Day Money-Back'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
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
