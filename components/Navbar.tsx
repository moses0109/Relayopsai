
import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

/* ------------------------------------------------------------------ */
/*  INTERACTIVE LOGO with 3D tilt, ripple, and glow effects           */
/* ------------------------------------------------------------------ */
const InteractiveLogo = ({ size = "w-12 h-12 md:w-14 md:h-14", src = "/logo.png" }: { size?: string, src?: string }) => {
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
      style={{ perspective: '600px' }}
    >
      <div className="absolute inset-[-6px] bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/20 group-hover:border-cyan-400/60 transition-all duration-200 shadow-lg group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${ripple ? 0.9 : 1})`,
          transition: ripple ? 'transform 0.1s ease' : 'transform 0.2s ease-out',
        }}
      >
        <img src={src} alt="RelayOpsAI" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
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
interface NavbarProps {
  onCtaClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDentalPage = location.pathname === '/dentists';

  const scrollTo = (id: string) => {
    // If on dental page and clicking a main nav link, go home first ideally, 
    // but for now let's just assumes nav links are for the current page structure 
    // or we hide them on dental page if they don't apply.
    // For simplicity, we'll keep them but if on dental, maybe we navigate home.

    if (isDentalPage && id !== 'top') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    if (isDentalPage) {
      navigate('/');
    } else {
      scrollTo('top');
    }
  };

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default behavior if no handler (e.g. on dental page)
      window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank');
    }
  };

  return (
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-[60]">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-24 px-4 md:px-12 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
          <button onClick={() => navigate('/')} className="flex items-center space-x-3 md:space-x-5 group cursor-pointer h-full">
            <InteractiveLogo src="/logo.png" />
            <div className="flex flex-col items-start text-left">
              <span className="text-lg md:text-2xl font-black tracking-tighter italic uppercase text-white group-hover:text-cyan-400 transition-colors">RelayOpsAI</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Intelligence Agency</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-14 h-full">
            {/* Solutions Dropdown */}
            <div className="relative group h-full flex items-center">
              <button className="text-xs font-black uppercase tracking-wide text-slate-400 group-hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none">
                Solutions
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-[80%] left-[-20px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[70]">
                <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-2 w-64 shadow-2xl backdrop-blur-3xl">
                  <button
                    onClick={() => { navigate('/dentists'); }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-cyan-500/10 group/item transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden flex-shrink-0 bg-black/40 p-1.5 flex items-center justify-center">
                      <img src="/dental-logo.png" alt="Dental" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="block text-xs font-black uppercase tracking-wide text-slate-300 group-hover/item:text-cyan-400">Dental Practices</span>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">AI Front Desk</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

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
              onClick={handleCta}
              className="group/cta relative inline-flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:shadow-xl overflow-hidden border border-cyan-400/30"
            >
              <span className="relative z-10 hidden sm:inline">Book a Demo</span>
              <span className="relative z-10 sm:hidden">Demo</span>
              <svg className="relative z-10 w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ripple-out {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-ripple-out { animation: ripple-out 0.6s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>
    </nav>
  );
};

export default Navbar;
