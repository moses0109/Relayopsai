import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PAIN POINTS — Lost revenue visualization (Luxury Light)  */
/* ------------------------------------------------------------------ */

const MedSpaPainPoints: React.FC = () => {
  const painPoints = [
    {
      icon: '🚫',
      title: 'Missed After-Hours Calls',
      cost: '$3,000/week',
      solution: 'AI answers 24/7, even at 11pm when prospects research Botox'
    },
    {
      icon: '📞',
      title: 'Staff Tied Up During Treatments',
      cost: '15-20 calls/day',
      solution: 'AI handles all inbound + outbound while you focus on clients'
    },
    {
      icon: '🔁',
      title: 'No Rebooking Automation',
      cost: '40% dont rebook',
      solution: 'Auto-reminds Botox clients at 3-month mark via SMS'
    },
  ];

  return (
    <section className="py-10 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="medspa-serif text-4xl md:text-6xl mb-8 leading-tight text-slate-800 fade-in-up">
          Your Med Spa Is Losing Money <br />
          <span className="text-rose-600">Every Day.</span>
        </h2>

        <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-16 fade-in-up leading-relaxed">
          Missed appointments cost $500+ per client. Clients forget repeat treatments. <br className="hidden md:block" />
          Staff spends hours on calls instead of serving clients. <span className="font-bold text-slate-800">This stops now.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {painPoints.map((point, i) => (
            <div key={i} className="stagger-item group p-10 md:p-12 rounded-3xl bg-white/60 border border-rose-200/60 hover:border-rose-300/80 hover:bg-white/80 hover:shadow-2xl transition-all duration-500 backdrop-blur-xl">
              <div className="text-5xl mb-6">{point.icon}</div>
              <h3 className="text-slate-800 font-bold text-xl mb-3 uppercase tracking-tight">{point.title}</h3>
              <div className="text-rose-600 font-black text-3xl mb-5">{point.cost}</div>
              <p className="text-slate-600 text-sm leading-relaxed">{point.solution}</p>
            </div>
          ))}
        </div>

        <p className="text-rose-600 text-2xl md:text-3xl font-black mt-16 uppercase tracking-wide fade-in-up">
          Capture $15,000+ Every Month with RelayOpsAI
        </p>
      </div>
    </section>
  );
};

export default MedSpaPainPoints;
