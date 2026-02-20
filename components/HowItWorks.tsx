
import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We learn about your business, services, hours, and exactly how you want calls handled.',
    icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    accent: 'from-sky-500 to-blue-600',
    accentLight: 'sky',
  },
  {
    num: '02',
    title: 'We Build It',
    desc: 'We create your custom AI receptionist — trained on your business, your way. You don\'t touch a thing.',
    icon: 'M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z',
    accent: 'from-violet-500 to-purple-600',
    accentLight: 'violet',
  },
  {
    num: '03',
    title: 'Go Live',
    desc: 'Your AI starts answering calls. You focus on your business while we handle the rest.',
    icon: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
    accent: 'from-emerald-500 to-green-600',
    accentLight: 'emerald',
  },
];

const HowItWorks: React.FC = () => (
  <section id="about" className="py-10 md:py-14 px-4 md:px-6 scroll-mt-24 relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-sky-500/[0.04] via-violet-500/[0.03] to-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16 md:mb-20">
        <p className="text-sky-400 text-xs font-black uppercase tracking-widest mb-4 fade-in-up">The Process</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter mb-4 fade-in-up leading-tight">
          Three Steps. <span className="gradient-relay">We Do the Work.</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto fade-in-up">
          You focus on your business. We handle everything else.
        </p>
      </div>

      {/* Steps — stacked cards on mobile, horizontal on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5">
        {steps.map((step, i) => (
          <div
            key={i}
            className="stagger-item group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
          >
            {/* Top accent bar */}
            <div className={`h-1 bg-gradient-to-r ${step.accent}`} />

            {/* Card body */}
            <div className="relative bg-white/[0.03] border border-white/[0.06] group-hover:border-white/[0.15] backdrop-blur-sm p-8 md:p-10 transition-all duration-500 group-hover:bg-white/[0.05]">
              {/* Large faded number background */}
              <div className="absolute top-4 right-6 text-[5rem] md:text-[6rem] font-black italic text-white/[0.02] group-hover:text-white/[0.05] leading-none transition-all duration-500 pointer-events-none select-none">
                {step.num}
              </div>

              {/* Number + Icon row */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={step.icon} />
                  </svg>
                </div>
                <div className={`text-sm font-black uppercase tracking-widest bg-gradient-to-r ${step.accent} bg-clip-text text-transparent`}>
                  Step {step.num}
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-white relative z-10">
                {step.title}
              </h4>

              {/* Description */}
              <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10">
                {step.desc}
              </p>

              {/* Bottom connector arrow — visible on mobile between cards */}
              {i < 2 && (
                <div className="md:hidden flex justify-center mt-6 -mb-2">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop connecting arrows between cards */}
      <div className="hidden md:flex justify-center items-center gap-4 mt-8 fade-in-up">
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-sky-500/30" />
        <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-violet-500/30 to-transparent" />
        <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-emerald-500/30" />
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-emerald-500/30 to-transparent" />
      </div>
    </div>
  </section>
);

export default HowItWorks;
