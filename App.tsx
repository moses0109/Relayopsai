
import React, { useState, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Testimonials from './components/Testimonials';
import Samples from './components/Samples';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import Consultation from './components/Consultation';
import ChatWidget from './components/ChatWidget';
import IncomingCall from './components/IncomingCall';

/* ------------------------------------------------------------------ */
/*  HERO LOGO — Large immersive interactive logo with effects          */
/* ------------------------------------------------------------------ */
const HeroLogo = () => {
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
      {/* Outer orbital rings */}
      <div className="absolute inset-[-40px] md:inset-[-70px] pointer-events-none">
        <div className="absolute inset-0 border border-cyan-400/10 rounded-full animate-[spin_25s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px]" />
        </div>
        <div className="absolute inset-3 border border-blue-500/10 rounded-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[2px]" />
        </div>
      </div>

      {/* Ambient glow behind logo */}
      <div className="absolute inset-[-30px] bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite] pointer-events-none" />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 mx-auto cursor-pointer group"
        style={{ perspective: '800px' }}
      >
        {/* 3D tilting container */}
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-400/30 group-hover:border-cyan-400/60 shadow-2xl group-hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-shadow duration-500"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.92 : 1})`,
            transition: isPressed ? 'transform 0.1s ease' : 'transform 0.15s ease-out',
          }}
        >
          <img
            src="/logo.png"
            alt="RelayOpsAI"
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />

          {/* Ripple effects */}
          {ripples.map((id) => (
            <div key={id} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl animate-[heroRipple_0.8s_ease-out_forwards]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  APP LAYOUT                                                         */
/*  1. Hero  2. Demo  3. Revenue Pain  4. ROI Calculator               */
/*  5. How It Works  6. Industries  7. Trust  8. Pricing               */
/*  9. Consultation  10. ChatWidget (floating)                         */
/* ------------------------------------------------------------------ */

const App: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen text-white bg-transparent flex flex-col pt-16 md:pt-24 relative">
      {/* Animated dark-blue particle network */}
      <ParticleBackground />

      <Navbar />

      {/* ── 1) HERO ── */}
      <header id="top" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-cyan-600/10 via-blue-600/[0.07] to-purple-600/5 blur-[160px] rounded-full pointer-events-none animate-pulse" />

        {/* Interactive Hero Logo */}
        <HeroLogo />

        {/* Live badge — Smith.ai-style trust indicator */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-xs font-black uppercase tracking-wide break-words">
            AI Receptionist — Live 24/7
          </span>
        </div>

        <h1 className="clamp-hero font-black mb-6 md:mb-8 tracking-tighter italic uppercase relative z-10">
          Never Miss Another <br />
          <span className="gradient-relay">Customer Call</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-10 font-medium leading-relaxed relative z-10 px-2">
          RelayOpsAI answers your calls 24/7, books appointments, and follows up automatically — so you never lose business again.
        </p>

        {/* Stat chips — Synthflow / Bland-style inline metrics */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-10 relative z-10">
          {[
            { val: '24/7', label: 'Call Coverage' },
            { val: '98%',  label: 'Answer Rate' },
            { val: '<2s',  label: 'Avg Response' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <span className="text-white font-black text-sm whitespace-nowrap">{s.val}</span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wide break-words">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full max-w-xl justify-center mb-10 md:mb-10 relative z-20 px-4">
          <button
            onClick={() => scrollTo('demo')}
            className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-white to-gray-100 text-black rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 border border-white/20"
          >
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Hear the AI in Action
          </button>
          <button
            onClick={() => scrollTo('consultation')}
            className="px-8 md:px-10 py-4 md:py-5 border-2 border-cyan-500/30 bg-cyan-500/5 rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 backdrop-blur-sm"
          >
            Book a Demo
          </button>
        </div>

        {/* Testimonials */}
        <div className="w-full max-w-7xl mx-auto border-t border-white/[0.04] pt-8">
          <p className="text-xs font-black uppercase tracking-wide text-slate-700 mb-10 break-words">
            Trusted by Local Businesses
          </p>
          <Testimonials />
        </div>
      </header>

      {/* ── 2) DEMO ── */}
      <Samples />

      {/* ── 3) REVENUE PAIN ── */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.03] to-transparent pointer-events-none" data-parallax="0.3" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none fade-in-up">
            Missed Calls Cost You <br />
            <span className="text-rose-500">Real Money</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-6 fade-in-up">
            If you miss just 5 calls per day and your average job is $200, that's over $30,000 per year in lost revenue.
          </p>
          <p className="text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10 fade-in-up">
            RelayOpsAI makes sure every call is answered, every lead is captured, and every opportunity is followed up.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Call Coverage', val: '100%', sub: 'Never go to voicemail' },
              { label: 'Capture Rate', val: '98%', sub: 'Lead recovery avg' },
              { label: 'ROI Potential', val: '10X+', sub: 'Relative to salary' },
            ].map((m, i) => (
              <div key={i} className="stagger-item group p-10 rounded-3xl bg-gradient-to-br from-white/[0.02] to-cyan-500/[0.02] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-cyan-500/[0.05] hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-sm">
                <div className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 text-4xl sm:text-5xl font-black italic mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-300 break-words">{m.val}</div>
                <div className="text-xs font-black uppercase tracking-wide text-white mb-1 break-words">{m.label}</div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wide break-words">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4) ROI CALCULATOR ── */}
      <Calculator />

      {/* ── 5) HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── 6) INDUSTRIES WE SERVE ── */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.03] to-transparent pointer-events-none" data-parallax="0.2" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
            Built for Service Businesses <span className="gradient-relay">Like Yours</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-md mx-auto mb-10 fade-in-up">
            If your business relies on phone calls, RelayOpsAI works for you.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { label: 'HVAC',        icon: 'M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z' },
              { label: 'Dental',      icon: 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z' },
              { label: 'Salon',       icon: 'M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z' },
              { label: 'Restaurant',  icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z' },
              { label: 'Real Estate', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
              { label: 'Law Firm',    icon: 'M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z' },
              { label: 'Auto Repair', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' },
              { label: 'Plumbing',    icon: 'M19.28 8.6l-.7-1.21-1.27.51-1.18.47-.33-.88-.18-.47H12.5v2h2.09l.87 2.29c.12.31.18.64.18.97v5.68c0 .4-.33.73-.73.73h-2.09c-.41 0-.73-.33-.73-.73V12.5H9.6L7.5 10.4V7.59L5.41 9.68 4 8.27l3.59-3.59 2.5 2.5V10h2.38l1.5-1.5H19.28z' },
              { label: 'Fitness',     icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z' },
              { label: 'Med Spa',     icon: 'M17.73 12.02l3.98-3.98-2.2-2.2-3.99 3.98-2.15-2.16 4-3.97-2.22-2.22-3.98 3.98-2.36-2.36-2.2 2.2 12.71 12.71 2.2-2.2-2.15-2.14.36-.37zm-6.71 2.09l-2.12-2.12-4.03 4.03 2.12 2.12 4.03-4.03z' },
              { label: 'Insurance',   icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' },
              { label: 'Roofing',     icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
            ].map((ind, i) => (
              <div key={i} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 text-center cursor-default backdrop-blur-sm">
                <div className="w-10 h-10 mx-auto mb-3 bg-white/[0.04] rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                  <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d={ind.icon} />
                  </svg>
                </div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500 group-hover:text-cyan-400 transition-colors duration-300 break-words">{ind.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7) TRUST / METRICS ── */}
      <section id="customers" className="py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-3 fade-in-up">
            Performance Standards.
          </h2>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wide fade-in-up break-words">
            What you get when every call is answered
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { val: '24/7',    label: 'Coverage',     sub: 'Always on, never sleeps' },
            { val: '98%',     label: 'Answer Rate',   sub: 'Industry-leading accuracy' },
            { val: 'Instant', label: 'Booking + SMS', sub: 'Real-time confirmations' },
            { val: '48hr',    label: 'Setup Time',    sub: 'Fully done for you' },
          ].map((item, i) => (
            <div key={i} className="stagger-item group text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-cyan-500/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 group-hover:scale-110 break-words">{item.val}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1 group-hover:text-cyan-400 transition-colors duration-300 break-words">{item.label}</div>
              <div className="text-xs font-medium text-slate-700 uppercase tracking-wide mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 break-words">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8) PRICING ── */}
      <section id="pricing" className="py-16 px-6 scroll-mt-32 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
              Investment.
            </h2>
            <p className="text-slate-500 uppercase font-bold text-xs tracking-wide max-w-md mx-auto leading-relaxed fade-in-up break-words px-4">
              One missed job often covers the entire monthly cost. Every plan includes full done-for-you setup and optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '$297',
                desc: 'For Small Businesses',
                bestFor: 'Best for businesses with under 300 monthly calls',
                features: ['300 Minutes Included', 'Standard Booking Flow', 'SMS Follow-ups', 'Full Done-For-You Setup', 'Email Support'],
              },
              {
                name: 'Growth',
                price: '$597',
                desc: 'For Busy Businesses',
                popular: true,
                bestFor: 'Best for growing teams with 300–700 monthly calls',
                features: ['700 Minutes Included', 'CRM & Calendar Integration', 'Lead Scoring Logic', 'Priority Setup (48hr)', 'Monthly Optimization'],
              },
              {
                name: 'Elite',
                price: '$997',
                desc: 'High-Volume & Enterprise',
                bestFor: 'Best for high-volume operations with 700+ monthly calls',
                features: ['1,500 Minutes Included', 'Custom API Workflows', 'Bespoke Voice Mapping', 'Account Strategist', 'Weekly Performance Reviews'],
              },
            ].map((t, i) => (
              <div
                key={i}
                className={`stagger-item group p-10 rounded-[2.5rem] border flex flex-col transition-all duration-500 relative backdrop-blur-sm ${
                  t.popular
                    ? 'bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-purple-600/10 border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] scale-[1.03] z-10 hover:shadow-[0_0_100px_rgba(6,182,212,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.05] hover:border-cyan-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]'
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-black uppercase px-5 py-1.5 rounded-full tracking-wide shadow-xl whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-black uppercase italic mb-1 break-words">{t.name}</h3>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-6 break-words">{t.desc}</div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black tracking-tighter">{t.price}</span>
                  <span className="text-slate-500 text-xs font-bold uppercase">/mo</span>
                </div>

                <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-wide mb-8 break-words">{t.bestFor}</p>

                <ul className="space-y-4 flex-grow mb-10">
                  {t.features.map((f, j) => (
                    <li key={j} className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-3 break-words">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo('consultation')}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-wide text-xs transition-all duration-300 hover:scale-[1.02] break-words ${
                    t.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                      : 'bg-white text-black hover:shadow-lg'
                  }`}
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-slate-700 text-xs font-bold uppercase tracking-wide break-words px-4">
            Extra minutes billed at discounted tiered rates. No hidden setup fees.
          </p>
        </div>
      </section>

      {/* ── 9) CONSULTATION ── */}
      <Consultation />

      {/* ── 10) FLOATING CHAT WIDGET ── */}
      <ChatWidget />

      {/* ── 11) INCOMING CALL POPUP ── */}
      <IncomingCall />

      {/* Analytics */}
      <Analytics />

      {/* Hero logo animation */}
      <style>{`
        @keyframes heroRipple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
