import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA FEATURES — Luxury light aesthetic                        */
/* ------------------------------------------------------------------ */

const MedSpaFeatures: React.FC = () => {
  const features = [
    {
      icon: '💰',
      title: '+$450/Call Upsells',
      desc: '"Add HydraFacial for $150?" — 47% say yes vs 8% with staff'
    },
    {
      icon: '🌙',
      title: '+$15k/Month After-Hours',
      desc: '60% of calls happen after 6pm. We answer. You get paid.'
    },
    {
      icon: '📅',
      title: '+$8k/Month Rebookings',
      desc: 'Auto-text Botox clients at 12 weeks. 65% rebook automatically.'
    },
    {
      icon: '🎯',
      title: 'Zero Tire-Kickers',
      desc: 'AI qualifies by budget + history. Only real buyers get booked.'
    },
  ];

  return (
    <section className="py-10 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="medspa-serif text-4xl md:text-6xl mb-8 fade-in-up leading-tight text-slate-800">
            How We Print Money <br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">For Your Spa</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="stagger-item group p-8 rounded-2xl bg-white/60 border border-purple-200/60 hover:border-purple-300/80 hover:bg-white/80 hover:shadow-xl transition-all duration-500 backdrop-blur-xl">
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
