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
    <header id="top" className="relative pt-32 pb-20 px-6 md:px-8 overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-white">
      {/* Layered Sophisticated Backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orb - top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-to-br from-rose-200/30 via-pink-100/20 to-transparent blur-3xl animate-pulse-slow" />

        {/* Secondary gradient orb - bottom right */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-purple-200/25 via-violet-100/15 to-transparent blur-3xl" />

        {/* Tertiary accent - top left */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-sky-100/20 to-transparent blur-2xl" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(251,207,232,0.1),transparent_50%)]" />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Scarcity badge */}
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <div className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50/80 backdrop-blur-sm border border-rose-200/60 shadow-lg shadow-rose-500/10 hover:shadow-xl hover:shadow-rose-500/20 hover:border-rose-300/80 transition-all duration-300">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-sm shadow-rose-500" />
            <span className="text-sm font-semibold text-rose-700 group-hover:text-rose-800 transition-colors">
              Only 3 February Setup Slots Left
            </span>
          </div>
        </div>

        {/* Value prop - aspirational, premium */}
        <h1 className="text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.9] mb-10 animate-fade-in-up">
          <span className="block text-slate-900 drop-shadow-sm">Every Call.</span>
          <span className="block text-slate-900 drop-shadow-sm">Every Client.</span>
          <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Captured.
          </span>
        </h1>

        {/* Clean, professional value prop */}
        <p className="text-center text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-14 leading-relaxed font-medium tracking-[-0.01em]">
          AI voice agent that answers every call, books every consultation,
          and brings every client back—
          <span className="block mt-4 text-slate-900 font-bold text-2xl md:text-3xl">24/7. Automatically. Perfectly.</span>
        </p>

        {/* Social proof - early trust signal */}
        <div className="max-w-2xl mx-auto mb-12 p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-2xl shadow-slate-900/5 hover:shadow-3xl hover:shadow-slate-900/10 transition-all duration-500 hover:-translate-y-1">
          <p className="text-slate-700 italic mb-6 leading-relaxed text-lg">
            "We went from missing 30% of after-hours calls to ZERO. Botox rebookings jumped 65% in 90 days.
            This paid for itself in week one."
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&q=80"
              alt="Manhattan Building"
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-200/60 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div>
              <p className="font-bold text-slate-900 text-base">Med Spa Owner</p>
              <p className="text-sm text-slate-600 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Manhattan, NY
              </p>
            </div>
          </div>
        </div>

        {/* Single clear CTA */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <button
            type="button"
            onClick={onBookDemo}
            className="group relative px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all duration-300 shadow-2xl shadow-slate-900/30 hover:shadow-3xl hover:shadow-slate-900/40 hover:scale-[1.03] active:scale-[0.98] overflow-hidden"
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <span className="relative z-10 flex items-center gap-2">
              See Your Lost Revenue (Free Calculator)
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            No credit card • 2-minute setup • See results in 48 hours
          </p>
        </div>

        {/* Clean stats - premium presentation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto pt-12 border-t border-slate-200/60">
          {[
            { value: '24/7', label: 'Always Available' },
            { value: '98%', label: 'Capture Rate' },
            { value: '$27k', label: 'Avg Monthly Lift' },
            { value: '<1s', label: 'Response Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center group p-4 rounded-2xl hover:bg-white/60 hover:backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
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
