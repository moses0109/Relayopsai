import React, { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PRICING — 3 Tiers + Add-Ons                               */
/* ------------------------------------------------------------------ */

interface MedSpaPricingProps {
  onBookSetup: (tier: string) => void;
}

const MedSpaPricing: React.FC<MedSpaPricingProps> = ({ onBookSetup }) => {
  const [expandedAddon, setExpandedAddon] = useState<number | null>(null);

  const tiers = [
    {
      name: 'Starter',
      tagline: 'For solo practitioners getting started',
      price: '$347',
      period: '/mo',
      minutes: '200 AI voice minutes',
      highlight: false,
      badge: null,
      checkColor: 'text-rose-400',
      btnClass: 'bg-white border-2 border-rose-200 hover:border-rose-400 text-slate-800 hover:shadow-lg hover:shadow-rose-100',
      overage: '$1.50/min overage',
      features: [
        '200 AI voice minutes/mo',
        'Missed call SMS text-back',
        '1 phone line',
        'Google Calendar booking',
        'Custom knowledge base',
        'Call transcripts & summaries',
        'Done-for-you setup',
        'Monthly support call',
      ],
    },
    {
      name: 'Growth',
      tagline: 'For busy spas capturing every lead',
      price: '$597',
      period: '/mo',
      minutes: '500 AI voice minutes',
      highlight: true,
      badge: 'Most Popular',
      checkColor: 'text-rose-200',
      btnClass: 'bg-white text-rose-700 font-bold hover:bg-rose-50 shadow-xl shadow-rose-900/20 hover:shadow-rose-900/30',
      overage: '$1.25/min overage',
      features: [
        '500 AI voice minutes/mo',
        'Missed call SMS text-back',
        'Up to 3 phone lines',
        'Google Calendar booking',
        'Custom knowledge base',
        'Call transcripts & summaries',
        'Lead scoring (hot/warm/cold)',
        'Automated appointment reminders',
        'Done-for-you setup',
        'Bi-weekly support calls',
      ],
    },
    {
      name: 'Elite',
      tagline: 'For multi-location & high-volume spas',
      price: '$997',
      period: '/mo',
      minutes: '1,200 AI voice minutes',
      highlight: false,
      badge: 'Full Coverage',
      checkColor: 'text-rose-400',
      btnClass: 'bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30',
      overage: '$1.00/min overage',
      features: [
        '1,200 AI voice minutes/mo',
        'Unlimited SMS text-back',
        'Up to 10 phone lines',
        'Google Calendar booking',
        'Custom knowledge base',
        'Call transcripts & summaries',
        'Lead scoring + auto-tagging',
        'Reminders + no-show recovery',
        'Monthly performance reports',
        'Dedicated account manager',
        'Done-for-you setup',
        '24/7 priority support',
      ],
    },
  ];

  const addons = [
    {
      name: 'Extra Voice Minutes',
      desc: 'Add more AI call capacity without upgrading your plan.',
      options: [
        { label: '+100 minutes', price: '$99/mo' },
        { label: '+300 minutes', price: '$249/mo' },
        { label: '+500 minutes', price: '$399/mo' },
      ],
    },
    {
      name: 'Rebooking SMS Campaigns',
      desc: 'Automated text sequences to bring past clients back for Botox, fillers, and HydraFacial touchups.',
      options: [
        { label: 'Up to 500 contacts/mo', price: '$149/mo' },
        { label: 'Up to 2,000 contacts/mo', price: '$349/mo' },
      ],
    },
    {
      name: 'Additional Phone Lines',
      desc: 'Expand beyond your plan limit for multiple locations or departments.',
      options: [
        { label: 'Per additional line', price: '$49/mo each' },
      ],
    },
    {
      name: 'White-Glove Setup',
      desc: 'We build everything for you — knowledge base, scripts, calendar, testing — live in 48 hours.',
      options: [
        { label: 'One-time setup', price: '$497 one-time' },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden scroll-mt-20 bg-[#fdf8f5]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-rose-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-100/20 to-transparent blur-3xl" />
        <svg className="absolute -top-6 -right-8 w-44 md:w-60 text-rose-200/40 leaf-float-a" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.65"/>
        </svg>
        <svg className="absolute -bottom-6 -left-8 w-36 md:w-52 text-pink-200/35 leaf-float-b" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.6"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3">Simple Pricing</p>
          <h2 className="medspa-serif text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5">
            <span className="text-slate-900">One Recovered Call</span><br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Pays for the Month.
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Every plan includes done-for-you setup, a custom AI knowledge base, and a 14-day ROI guarantee. No contracts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14 items-start">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative ${tier.badge ? 'pt-6' : ''}`}>

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
                    <span className={`text-5xl font-black ${tier.highlight ? 'text-white' : 'text-slate-900'}`}>{tier.price}</span>
                    <span className={`font-medium ${tier.highlight ? 'text-rose-200' : 'text-slate-500'}`}>{tier.period}</span>
                  </div>
                  <p className={`text-xs mb-1 ${tier.highlight ? 'text-rose-200' : 'text-slate-400'}`}>{tier.minutes} included</p>
                  <p className={`text-xs mb-8 ${tier.highlight ? 'text-rose-200/70' : 'text-slate-400/80'}`}>{tier.overage}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-3 text-sm ${tier.highlight ? 'text-rose-100' : 'text-slate-700'}`}>
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.checkColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
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
                    <span className="relative z-10">Book Your Setup Call</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-Ons */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-2">Power-Ups</p>
            <h3 className="medspa-serif text-2xl md:text-3xl font-black text-slate-900">Add-Ons & Extras</h3>
          </div>

          <div className="space-y-3">
            {addons.map((addon, i) => (
              <div key={i} className="rounded-2xl bg-white border border-rose-200 overflow-hidden hover:border-rose-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setExpandedAddon(expandedAddon === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">{addon.name}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{addon.desc}</p>
                  </div>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    expandedAddon === i ? 'bg-rose-100 border-rose-300 rotate-180' : 'bg-rose-50 border-rose-200'
                  }`}>
                    <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div style={{ maxHeight: expandedAddon === i ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div className="px-5 pb-5 pt-0">
                    <div className="flex flex-wrap gap-3">
                      {addon.options.map((opt, j) => (
                        <div key={j} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fdf8f5] border border-rose-200 shadow-sm">
                          <span className="text-sm font-semibold text-slate-700">{opt.label}</span>
                          <span className="text-sm font-black text-rose-600">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              We are confident because the average med spa recovers $8,000–$24,000 in the first month. We only win when you win.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600 mt-10">
          {['HIPAA-Compliant', 'Done-for-You Setup', 'No Long-Term Contract', '14-Day Money-Back'].map((badge, i) => (
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
