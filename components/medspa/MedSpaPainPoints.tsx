import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA PAIN POINTS — Modern Clean Design                        */
/* ------------------------------------------------------------------ */

const MedSpaPainPoints: React.FC = () => {
  const painPoints = [
    {
      stat: '$3k/week',
      title: 'Lost Revenue',
      problem: 'Missed after-hours calls',
      solution: 'AI answers 24/7, even at 11pm when prospects research Botox'
    },
    {
      stat: '20 calls/day',
      title: 'Staff Overload',
      problem: 'Team tied up during treatments',
      solution: 'AI handles all inbound while you focus on clients in the chair'
    },
    {
      stat: '40%',
      title: 'Client Churn',
      problem: 'No rebooking automation',
      solution: 'Auto-reminds clients at 3-month mark for Botox touch-ups'
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
          <span className="text-slate-900">Stop Losing Money</span><br />
          <span className="text-rose-600">Every Single Day</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-20 font-medium leading-relaxed">
          Missed consultations cost $500+ each. Clients forget rebookings.
          <br className="hidden md:block" />
          Staff waste hours on phone tag. <span className="text-slate-900 font-semibold">This ends now.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, i) => (
            <div key={i} className="group relative rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-300 p-10 transition-all duration-300 hover:shadow-xl text-left">
              {/* Stat Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-500 text-white font-black text-xl mb-6">
                {point.stat}
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3">{point.title}</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">{point.problem}</p>

              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-700 leading-relaxed">{point.solution}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-2xl md:text-4xl font-black text-rose-600">
            Recover $15,000+ Monthly with AI
          </p>
        </div>
      </div>
    </section>
  );
};

export default MedSpaPainPoints;
