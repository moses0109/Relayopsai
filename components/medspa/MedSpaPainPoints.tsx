import React from 'react';

const MedSpaPainPoints: React.FC = () => {
  const painPoints = [
    {
      stat: '$1,200',
      title: 'Per Missed Call',
      problem: 'Every unanswered call after 6 PM',
      solution: 'That\'s a filler appointment, a Botox package, or a laser treatment walking straight to your competitor.',
    },
    {
      stat: '60%',
      title: 'Calls After Hours',
      problem: 'Clients research at 9, 10, 11 PM',
      solution: 'Your front desk clocks out. Our AI clocks in. It answers, qualifies, and books — before they find someone else.',
    },
    {
      stat: '97%',
      title: 'Visitors Ghost You',
      problem: 'Anonymous traffic with buying intent',
      solution: 'We unmask them, fire a personalized outreach in under 3 minutes, and recover revenue you never knew you were losing.',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 relative overflow-hidden bg-pink-100">
      {/* Drifting botanical accents */}
      <svg className="absolute -top-4 -right-8 w-48 md:w-64 text-rose-300/30 pointer-events-none leaf-float-c" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
        <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.65"/>
        <path d="M175 0 C145 35 105 82 80 170 C95 178 110 152 122 124 C144 80 162 38 175 0Z" opacity="0.45"/>
      </svg>
      <svg className="absolute -bottom-4 -left-8 w-40 md:w-52 text-pink-300/25 pointer-events-none leaf-float-d" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
        <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.65"/>
      </svg>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="medspa-serif text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          <span className="text-slate-900">Your Front Desk is</span><br />
          <span className="text-rose-600">Overwhelmed and Leaking Cash.</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
          Every missed call, every unanswered DM, every client who waited on hold and hung up —
          is a <span className="text-slate-900 font-bold">$1,200 filler appointment going to your competitor.</span>{' '}
          <span className="text-rose-600 font-semibold">This is fixable. Today.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="group relative rounded-3xl bg-[#fdf8f5] border-2 border-rose-200 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-200/60 p-10 transition-all duration-300 text-left hover:-translate-y-1"
            >
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

        <div className="mt-12">
          <p className="text-2xl md:text-4xl font-black text-rose-600">
            Average Recovery: $15,000–$27,000/Month.
          </p>
          <p className="text-base text-slate-500 mt-3 font-semibold">Speed to Lead wins the booking. We respond in 30 seconds.</p>
        </div>
      </div>
    </section>
  );
};

export default MedSpaPainPoints;
