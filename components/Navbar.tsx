
import React from 'react';

const RelayLogoMark = ({ className = "w-9 h-9" }) => (
  <div className={`relative ${className} group`}>
    {/* Outer glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

    {/* Main logo container */}
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-cyan-400/30 rounded-2xl flex items-center justify-center overflow-hidden group-hover:border-cyan-400/60 transition-all duration-500 shadow-xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,242,255,0.15)_0%,_transparent_50%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,242,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px]"></div>

      {/* The R letter */}
      <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-300 to-blue-400 font-black italic text-lg select-none drop-shadow-[0_0_8px_rgba(0,242,255,0.5)] group-hover:scale-110 transition-transform duration-300">
        R
      </span>
    </div>
  </div>
);

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
            <RelayLogoMark />
            <span className="text-base md:text-xl font-black tracking-tighter italic uppercase text-white group-hover:text-cyan-400 transition-colors">RelayOpsAI</span>
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
                className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-white transition-colors h-full flex items-center"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center h-full">
            <button
              onClick={() => scrollTo('consultation')}
              className="inline-flex items-center justify-center px-5 md:px-10 py-2.5 md:py-3.5 bg-white text-black rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              <span className="hidden sm:inline">Consultation</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
