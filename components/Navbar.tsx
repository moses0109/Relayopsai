
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  SIMPLE LOGO                                                         */
/* ------------------------------------------------------------------ */
const SimpleLogo = ({ size = "w-12 h-12", isMedSpa = false }: { size?: string; isMedSpa?: boolean }) => {
  return (
    <div className={`relative ${size} flex items-center justify-center`}>
      {!isMedSpa && (
        <img
          id="mini-profile-image"
          src="/logo-icon.png"
          alt="RelayOpsAI"
          className="w-full h-full object-contain"
          draggable={false}
        />
      )}
      {isMedSpa && (
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(145deg, #1e0510 0%, #7f1234 45%, #e11d48 100%)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 42% 42%, rgba(251,113,133,0.55) 0%, transparent 68%)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48" fill="none">
            <path d="M49 -1 C39 7 29 17 27 31 C35 27 43 15 49 -1Z" fill="rgba(255,255,255,0.16)"/>
            <path d="M49 9 C41 15 35 23 34 35 C40 31 45 21 49 9Z" fill="rgba(255,255,255,0.09)"/>
            <path d="M5 37 A9 9 0 0 1 12 30" stroke="rgba(125,211,252,0.55)" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M3 40 A13 13 0 0 1 12 26" stroke="rgba(125,211,252,0.28)" strokeWidth="0.9" strokeLinecap="round"/>
            <path d="M1 43 A17 17 0 0 1 12 22" stroke="rgba(125,211,252,0.14)" strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="8" y1="47" x2="40" y2="47" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8"/>
          </svg>
          <span className="relative z-10 text-white font-black select-none"
            style={{ fontSize: '23px', lineHeight: 1, letterSpacing: '-0.5px', fontFamily: '"Arial Black","Helvetica Neue",sans-serif', textShadow: '0 0 18px rgba(255,160,180,0.9), 0 0 6px rgba(255,100,130,0.6), 0 1px 4px rgba(0,0,0,0.5)' }}>
            R
          </span>
          <div className="absolute bottom-[5px] right-[5px] w-[8px] h-[8px] rounded-full"
            style={{ background: '#7dd3fc', boxShadow: '0 0 10px 4px rgba(125,211,252,0.85)' }} />
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                              */
/* ------------------------------------------------------------------ */
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const isMedSpa = location.pathname === '/medspa';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-[60]">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center h-14 md:h-16 px-4 md:px-8 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">

          {/* Logo + Dropdown */}
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShowDropdown(!showDropdown); }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <SimpleLogo isMedSpa={isMedSpa} />
              <div className="flex flex-col items-start justify-center">
                <span className={`text-base md:text-xl font-black tracking-tight uppercase ${isMedSpa ? 'text-white group-hover:text-rose-400' : 'text-white group-hover:text-cyan-400'} transition-colors leading-none`}>
                  RelayOpsAI
                </span>
                {isMedSpa && (
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-rose-400 mt-0.5 leading-none">
                    Med Spa Edition
                  </span>
                )}
              </div>
              <svg className={`w-3 h-3 md:w-4 md:h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-4 w-52 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                <button
                  type="button"
                  onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setShowDropdown(false); }}
                  className="w-full px-5 py-4 text-left text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 whitespace-nowrap"
                >
                  🏠 Main Site
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/medspa'); window.scrollTo({ top: 0, behavior: 'smooth' }); setShowDropdown(false); }}
                  className="w-full px-5 py-4 text-left text-sm font-bold text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors whitespace-nowrap"
                >
                  💉 Med Spa Edition
                </button>
              </div>
            )}
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center space-x-14 h-full">
            <button
              type="button"
              onClick={() => scrollTo('demo')}
              className="text-xs font-black uppercase tracking-wide text-slate-400 hover:text-white transition-colors h-full flex items-center"
            >
              Demo
            </button>
            <button
              type="button"
              onClick={() => isMedSpa ? scrollTo('about') : navigate('/about')}
              className="text-xs font-black uppercase tracking-wide text-slate-400 hover:text-white transition-colors h-full flex items-center"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo('consultation')}
              className="text-xs font-black uppercase tracking-wide text-slate-400 hover:text-white transition-colors h-full flex items-center"
            >
              Contact
            </button>
          </div>

          {/* CTA */}
          <div className="flex items-center h-full">
            <button
              type="button"
              onClick={() => scrollTo('consultation')}
              className={`group/cta relative inline-flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 md:py-3 ${
                isMedSpa
                  ? 'bg-gradient-to-r from-rose-400 to-pink-500 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 border border-rose-400/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/30'
              } text-white rounded-full text-xs font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl overflow-hidden`}
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
    </nav>
  );
};

export default Navbar;
