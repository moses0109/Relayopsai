import React from 'react';

interface MedSpaHeroProps {
  onBookDemo: () => void;
  onCalculateROI: () => void;
}

const MedSpaHero: React.FC<MedSpaHeroProps> = ({ onBookDemo, onCalculateROI }) => {
  return (
    <header id="top" className="relative pt-20 pb-12 md:pt-28 md:pb-16 px-4 md:px-6 bg-[#fdf8f5]">

      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf8f5] via-rose-50/80 to-pink-100/60" />

        {/* Top-right botanical */}
        <svg className="absolute -top-6 -right-6 w-72 h-72 md:w-96 md:h-96 text-rose-200/80 leaf-float-a" viewBox="0 0 200 200" fill="currentColor">
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.75"/>
          <path d="M175 0 C145 35 105 82 80 170 C95 178 110 152 122 124 C144 80 162 38 175 0Z" opacity="0.55"/>
          <path d="M200 55 C178 75 145 110 120 185 C134 191 146 170 156 148 C170 123 188 95 200 55Z" opacity="0.4"/>
        </svg>

        {/* Bottom-left botanical */}
        <svg className="absolute -bottom-6 -left-6 w-56 h-56 md:w-72 md:h-72 text-pink-200/70 leaf-float-b" viewBox="0 0 200 200" fill="currentColor">
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.7"/>
          <path d="M0 200 C40 165 92 112 178 62 C185 80 162 98 132 118 C92 142 45 175 0 200Z" opacity="0.5"/>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-br from-rose-100/50 via-pink-50/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Founder badge */}
        <div className="flex justify-center mb-5">
          <div className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200/60 shadow-lg shadow-rose-500/10 hover:shadow-xl hover:shadow-rose-500/20 hover:border-rose-300/80 transition-all duration-300">
            <span className="text-rose-500 text-base">💛</span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              Built after my mom's med spa lost $180K/year to missed calls
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="medspa-serif text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] leading-tight mb-4 px-2">
          <span className="block text-slate-900">Turn Missed Calls Into</span>
          <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Booked Appointments.
          </span>
        </h1>

        {/* Star rating */}
        <div className="flex justify-center items-center gap-3 mb-5">
          <div className="flex items-center gap-0.5">
            {[0,1,2,3,4].map(i => (
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-slate-500 text-sm font-semibold">4.9/5 — 200+ med spas nationwide</span>
        </div>

        {/* Subheadline */}
        <p className="text-center text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-5 leading-relaxed font-medium px-2">
          RelayOpsAI handles inbound calls, follows up on missed inquiries, reactivates dormant leads, and books appointments — automatically. Your staff stays focused on the room. We handle everything else.
        </p>

        {/* Benefit bullets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm font-semibold text-slate-600 mb-8">
          {[
            '24/7 AI call answering',
            'Automated follow-up and lead reactivation',
            'Fewer missed revenue opportunities',
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{b}</span>
            </div>
          ))}
        </div>

        {/* Social proof testimonial card */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-10 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200/70 shadow-xl shadow-rose-200/30 hover:shadow-2xl hover:shadow-rose-300/30 transition-all duration-500 hover:-translate-y-1">
          <p className="text-slate-700 italic mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
            "We went from missing 30% of after-hours calls to zero — and Botox rebookings jumped 65% in 90 days. It paid for itself in the first week."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200/60 flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-2xl">🌸</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">Christina R., Owner</p>
              <p className="text-sm text-slate-500">Lumière Med Spa · Manhattan, NY</p>
              <div className="flex items-center gap-1 mt-1">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-12">
          <button
            type="button"
            onClick={onBookDemo}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-full font-bold text-base md:text-lg hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 shadow-2xl shadow-rose-500/40 hover:shadow-rose-500/50 hover:scale-[1.03] active:scale-[0.98] overflow-hidden w-full sm:w-auto max-w-sm"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Book Your Demo
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={onCalculateROI}
            className="px-8 py-4 rounded-full font-bold text-base text-slate-700 border border-rose-200/60 hover:border-rose-300 hover:bg-white/60 bg-white/40 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto max-w-sm"
          >
            Calculate My Revenue Leak →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto pt-8 md:pt-10 border-t border-rose-200/50">
          {[
            { value: '24/7', label: 'Always Available' },
            { value: '98%', label: 'Call Capture Rate' },
            { value: '$27k', label: 'Avg Monthly Lift' },
            { value: '<1s', label: 'Response Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center group p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/70 transition-all duration-300 hover:shadow-lg hover:shadow-rose-200/50">
              <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-br from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
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
