import React from 'react';

const MedSpaFeatures: React.FC = () => {
  const features = [
    {
      icon: '💰',
      title: '+$450/Call Upsells',
      desc: '"Add HydraFacial for $150?" — 47% say yes vs 8% with staff',
    },
    {
      icon: '🌙',
      title: '+$15k/Month After-Hours',
      desc: '60% of calls happen after 6pm. We answer. You get paid.',
    },
    {
      icon: '📅',
      title: '+$8k/Month Rebookings',
      desc: 'Auto-text Botox clients at 12 weeks. 65% rebook automatically.',
    },
    {
      icon: '🎯',
      title: 'Zero Tire-Kickers',
      desc: 'AI qualifies by budget + history. Only real buyers get booked.',
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden bg-pink-100">
      {/* Drifting botanical accents */}
      <svg className="absolute -top-4 -left-6 w-40 md:w-52 text-rose-300/25 pointer-events-none leaf-float-f" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
        <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.6"/>
      </svg>
      <svg className="absolute -bottom-4 -right-6 w-36 md:w-48 text-pink-300/22 pointer-events-none leaf-float-a" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
        <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.65"/>
      </svg>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="medspa-serif text-4xl md:text-6xl mb-8 leading-tight text-slate-800">
            How We Print Money<br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              For Your Spa
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-[#fdf8f5] border border-rose-200 hover:border-rose-400 hover:bg-white hover:shadow-xl hover:shadow-rose-200/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-slate-800 font-bold text-base uppercase tracking-tight mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedSpaFeatures;
