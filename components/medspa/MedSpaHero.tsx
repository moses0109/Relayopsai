import React, { useState, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA LOGO — Luxury immersive branding                         */
/* ------------------------------------------------------------------ */
const MedSpaLogo = () => {
  const [ripples, setRipples] = useState<number[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleInteraction = () => {
    setIsPressed(true);
    setRipples(prev => [...prev, Date.now()]);
    setTimeout(() => setIsPressed(false), 200);
    setTimeout(() => setRipples(prev => prev.slice(1)), 800);
  };

  return (
    <div className="relative mb-8 md:mb-10">
      {/* Orbital rings */}
      <div className="absolute inset-[-40px] md:inset-[-70px] pointer-events-none">
        <div className="absolute inset-0 border border-rose-400/10 rounded-full animate-[spin_25s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-rose-400 rounded-full blur-[2px]" />
        </div>
        <div className="absolute inset-3 border border-pink-500/10 rounded-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full blur-[2px]" />
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-[-20px] bg-gradient-to-br from-rose-500/15 to-pink-600/15 rounded-full blur-2xl pointer-events-none" />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 mx-auto cursor-pointer group"
        style={{ perspective: '800px' }}
      >
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-rose-400/30 group-hover:border-rose-400/60 shadow-2xl group-hover:shadow-[0_0_60px_rgba(244,114,182,0.4)] transition-shadow duration-500"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.92 : 1})`,
            transition: isPressed ? 'transform 0.1s ease' : 'transform 0.15s ease-out',
          }}
        >
          {/* Logo background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600" />

          {/* RelayOpsAI branding */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-4xl md:text-6xl font-black mb-2">R</div>
            <div className="text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-90">
              Med Spa
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />

          {/* Ripple effects */}
          {ripples.map((id) => (
            <div key={id} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-rose-400/20 rounded-3xl animate-[heroRipple_0.8s_ease-out_forwards]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  MED SPA HERO — Luxury spa aesthetic for women-run beauty clinics */
/* ------------------------------------------------------------------ */

interface MedSpaHeroProps {
  onBookDemo: () => void;
  onCalculateROI: () => void;
}

const MedSpaHero: React.FC<MedSpaHeroProps> = ({ onBookDemo, onCalculateROI }) => {
  return (
    <header id="top" className="py-8 md:py-10 lg:py-12 px-4 md:px-6 flex flex-col items-center text-center relative overflow-x-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-rose-200/50 via-pink-100/40 to-purple-200/50 blur-[140px] rounded-full pointer-events-none" />

      {/* Luxury Med Spa Logo */}
      <MedSpaLogo />

      {/* Brooklyn Badge */}
      <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-white/70 border border-rose-200/70 backdrop-blur-xl shadow-lg">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        <span className="text-rose-600 text-xs font-bold uppercase tracking-wider break-words">
          Made in Brooklyn — AI for NYC Med Spas
        </span>
      </div>

      {/* Headline */}
      <h1 className="medspa-serif text-5xl md:text-7xl lg:text-8xl mb-10 md:mb-12 relative z-10 leading-[0.95] text-slate-800">
        Never Miss a Consultation. <br />
        <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Keep Every Client Coming Back.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-slate-700 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto mb-6 font-semibold leading-relaxed relative z-10 px-2">
        24/7 AI Voice & Text for NYC Med Spas — Capture Every Lead, Upsell Treatments, Automate Follow-Ups
      </p>

      <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed relative z-10 px-2">
        Your AI assistant answers calls, books Botox consultations, reminds clients about 90-day touch-ups, and upsells add-ons — without lifting a finger.
      </p>

      {/* BIG Social Proof Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 relative z-10 max-w-5xl mx-auto w-full px-4">
        {[
          { num: '100+', label: 'NYC Med Spas' },
          { num: '98%', label: 'Capture Rate' },
          { num: '$27k', label: 'Avg Revenue Lift' },
          { num: '24/7', label: 'After-Hours' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/60 border border-rose-200/60 backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <p className="text-rose-600 text-4xl md:text-5xl font-black mb-2">{stat.num}</p>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full max-w-2xl justify-center mb-12 relative z-20 px-4">
        <button
          onClick={onBookDemo}
          className="group px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold uppercase tracking-wide text-sm md:text-base hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/40 transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          Book a 2-Minute Demo
        </button>
        <button
          onClick={onCalculateROI}
          className="px-10 md:px-12 py-5 md:py-6 border-2 border-rose-400/50 bg-white/70 backdrop-blur-xl rounded-full font-bold uppercase tracking-wide text-sm md:text-base text-slate-800 hover:bg-white/90 hover:border-rose-400/70 hover:shadow-xl transition-all duration-300 shadow-lg"
        >
          See How Much Revenue You're Losing
        </button>
      </div>

      {/* Video Demo Section */}
      <div className="w-full max-w-4xl mx-auto relative z-10 px-4">
        <div className="relative rounded-3xl overflow-hidden border border-rose-200/50 shadow-2xl group bg-white/50 backdrop-blur-xl">
          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-rose-100/50 via-pink-50/50 to-purple-100/50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shadow-xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="medspa-serif text-slate-800 text-2xl mb-3">Watch AI Handle Real Med Spa Calls</p>
              <p className="text-slate-600 text-base">See Botox consultations, booking confirmations & upsells in action</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MedSpaHero;
