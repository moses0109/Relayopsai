
import React, { useState, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  INTERACTIVE LOGO with 3D tilt, ripple, and glow effects           */
/* ------------------------------------------------------------------ */
const InteractiveLogo = ({ size = "w-12 h-12 md:w-14 md:h-14" }: { size?: string }) => {
  const [ripple, setRipple] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative ${size} cursor-pointer group`}
      style={{
        perspective: '600px',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-[-6px] bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

      {/* Main logo container with 3D tilt */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-200 shadow-lg group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${ripple ? 0.9 : 1})`,
          transition: ripple ? 'transform 0.1s ease' : 'transform 0.2s ease-out',
        }}
      >
        <img
          src="/logo.png"
          alt="RelayOpsAI"
          className="w-full h-full object-cover"
        />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />

        {/* Ripple effect on click */}
        {ripple && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-cyan-400/30 rounded-full animate-ripple-out" />
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */
const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-[60]">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-24 px-4 md:px-12 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
          <button onClick={() => scrollTo('top')} className="flex items-center space-x-3 md:space-x-5 group cursor-pointer h-full">
            <InteractiveLogo />
            <span className="text-lg md:text-2xl font-black tracking-tighter italic uppercase text-white group-hover:text-cyan-400 transition-colors">RelayOpsAI</span>
          </button>

          <div className="hidden lg:flex items-center space-x-14 h-full">
            {[
              { label: 'Demo', id: 'demo' },
              { label: 'About', id: 'about' },
              { label: 'Pricing', id: 'pricing' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className="text-xs font-black uppercase tracking-wide text-slate-400 hover:text-white transition-colors h-full flex items-center"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center h-full">
            <button
              onClick={() => scrollTo('consultation')}
              className="inline-flex items-center justify-center px-5 md:px-10 py-2.5 md:py-3.5 bg-white text-black rounded-full text-xs font-black uppercase tracking-wide hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              <span className="hidden sm:inline">Consultation</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logo interaction animations */}
      <style>{`
        @keyframes ripple-out {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-ripple-out {
          animation: ripple-out 0.6s ease-out forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
