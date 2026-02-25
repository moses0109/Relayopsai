import React from 'react';

const MedSpaPainPoints: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-8 bg-pink-100 overflow-hidden">

      {/* Botanical corners */}
      <svg className="absolute -top-4 -right-6 w-56 h-56 md:w-72 md:h-72 text-rose-300/50 leaf-float-a pointer-events-none" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
        <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.65"/>
        <path d="M175 0 C145 35 105 82 80 170 C95 178 110 152 122 124 C144 80 162 38 175 0Z" opacity="0.45"/>
      </svg>
      <svg className="absolute -bottom-4 -left-6 w-44 h-44 md:w-60 md:h-60 text-pink-300/50 leaf-float-b pointer-events-none" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
        <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.6"/>
        <path d="M0 200 C40 165 92 112 178 62 C185 80 162 98 132 118 C92 142 45 175 0 200Z" opacity="0.4"/>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Empathy badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200/70 shadow-md shadow-rose-200/40">
            <span className="text-rose-500 text-base">💛</span>
            <span className="text-sm font-semibold text-slate-700 italic">
              My mom faced every one of these. Now her clients don't have to.
            </span>
          </div>
        </div>

        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3">The Problem</p>
          <h2 className="medspa-serif text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
            Most Med Spas Are Leaking<br />
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Revenue Every Day.
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            It is not a staffing problem. It is a coverage problem. The revenue is there — it is just not being captured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              stat: '62%',
              label: 'of calls go unanswered during peak hours and after close',
              detail: 'Every missed call is a potential booking that went to your competitor. At an average ticket of $300–$1,200, this adds up fast.',
            },
            {
              stat: '35%',
              label: 'of med spa calls come in after hours — when no one picks up',
              detail: 'Evenings and weekends are when people research treatments. If your phone goes to voicemail at 7pm, they call the next spa on Google.',
            },
            {
              stat: '80%',
              label: 'of callers will not leave a voicemail — they just hang up',
              detail: 'No voicemail means no callback. No callback means that lead is gone. You will never know they called.',
            },
            {
              stat: '$0',
              label: 'recovered from missed calls that never got a text-back',
              detail: 'A simple follow-up text within 60 seconds can save that lead. Without it, they are already dialing your competitor.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-[#fdf8f5] border-2 border-rose-200 hover:border-rose-400 rounded-3xl hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-200/60 transition-all duration-300"
            >
              {/* Stat pill badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-500 text-white font-black text-lg mb-4 shadow-md shadow-rose-400/30">
                {item.stat}
              </div>
              <p className="text-slate-900 font-bold text-base mb-3">{item.label}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-10 p-6 md:p-8 bg-white/80 border border-rose-200 rounded-3xl shadow-lg shadow-rose-100/50 backdrop-blur-sm">
          <p className="text-slate-800 font-semibold text-base md:text-lg text-center">
            Our clients recover an average of{' '}
            <span className="text-rose-600 font-black">$15,000 – $27,000 per month</span>{' '}
            in revenue that was already slipping through. No additional headcount required.
          </p>
        </div>

      </div>
    </section>
  );
};

export default MedSpaPainPoints;
