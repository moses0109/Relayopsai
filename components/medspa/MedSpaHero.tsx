import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA HERO — Modern Premium Aesthetic (2026)                   */
/* ------------------------------------------------------------------ */

interface MedSpaHeroProps {
  onBookDemo: () => void;
  onCalculateROI: () => void;
}

const MedSpaHero: React.FC<MedSpaHeroProps> = ({ onBookDemo, onCalculateROI }) => {
  return (
    <header id="top" className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-8 overflow-hidden">
      {/* Ambient gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-purple-50/30 pointer-events-none" />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-12 rounded-full bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-200/50 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-slate-700 tracking-wide">
            AI Voice Agent for Med Spas
          </span>
        </div>

        {/* Massive headline with modern typography */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
          <span className="block text-slate-900">Never Miss</span>
          <span className="block text-slate-900">Another</span>
          <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Consultation
          </span>
        </h1>

        {/* Clean subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          24/7 AI that answers calls, books appointments, and brings clients back—
          <span className="text-slate-900 font-semibold"> automatically</span>.
        </p>

        {/* Modern CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button
            onClick={onBookDemo}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-base hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Demo
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </button>

          <button
            onClick={onCalculateROI}
            className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-full font-semibold text-base hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Calculate ROI
          </button>
        </div>

        {/* Clean stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {[
            { value: '24/7', label: 'Always Available' },
            { value: '98%', label: 'Capture Rate' },
            { value: '$27k', label: 'Avg Monthly Lift' },
            { value: '<1s', label: 'Response Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">
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
