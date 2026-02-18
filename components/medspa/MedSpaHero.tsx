import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA HERO — Conversion Psychology Optimized                   */
/* ------------------------------------------------------------------ */

interface MedSpaHeroProps {
  onBookDemo: () => void;
  onCalculateROI: () => void;
}

const MedSpaHero: React.FC<MedSpaHeroProps> = ({ onBookDemo, onCalculateROI }) => {
  return (
    <header id="top" className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-rose-100/40 via-transparent to-purple-100/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Scarcity badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rose-700">
              Only 3 February Setup Slots Left
            </span>
          </div>
        </div>

        {/* Value prop - aspirational, premium */}
        <h1 className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
          <span className="block text-slate-900">Every Call.</span>
          <span className="block text-slate-900">Every Client.</span>
          <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Captured.
          </span>
        </h1>

        {/* Clean, professional value prop */}
        <p className="text-center text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          AI voice agent that answers every call, books every consultation,
          and brings every client back—
          <span className="block mt-3 text-slate-900 font-bold">24/7. Automatically. Perfectly.</span>
        </p>

        {/* Social proof - early trust signal */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-sm">
          <p className="text-slate-700 italic mb-4 leading-relaxed">
            "We went from missing 30% of after-hours calls to ZERO. Botox rebookings jumped 65% in 90 days.
            This paid for itself in week one."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&q=80"
              alt="Manhattan Building"
              className="w-12 h-12 rounded-lg object-cover ring-2 ring-slate-200"
            />
            <div>
              <p className="font-bold text-slate-900">Med Spa Owner</p>
              <p className="text-sm text-slate-600">Manhattan, NY</p>
            </div>
          </div>
        </div>

        {/* Single clear CTA */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <button
            type="button"
            onClick={onBookDemo}
            className="group relative px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              See Your Lost Revenue (Free Calculator)
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <p className="text-sm text-slate-600 font-medium">
            No credit card • 2-minute setup • See results in 48 hours
          </p>
        </div>

        {/* Clean stats - premium presentation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto pt-12 border-t border-slate-200">
          {[
            { value: '24/7', label: 'Always Available' },
            { value: '98%', label: 'Capture Rate' },
            { value: '$27k', label: 'Avg Monthly Lift' },
            { value: '<1s', label: 'Response Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default MedSpaHero;
