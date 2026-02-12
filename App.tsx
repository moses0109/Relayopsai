
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
import Integrations from './components/Integrations';

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
      <div className="absolute inset-[-20px] bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-2xl pointer-events-none" />

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
      <header id="top" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 flex flex-col items-center text-center relative overflow-x-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-cyan-600/8 via-blue-600/5 to-purple-600/3 blur-[80px] rounded-full pointer-events-none" />

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
            { val: '70+',  label: 'AI Voices' },
            { val: '16',   label: 'Languages' },
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

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

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

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 5) HOW IT WORKS ── */}
      <HowItWorks />

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 6) TRUST / METRICS ── */}
      <section id="customers" className="py-16 overflow-x-hidden">
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

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 7) INTEGRATIONS ── */}
      <Integrations />

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 8) PRICING ── */}
      <section id="pricing" className="py-16 px-6 scroll-mt-32 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
              Investment.
            </h2>
            <p className="text-slate-500 uppercase font-bold text-xs tracking-wide max-w-lg mx-auto leading-relaxed fade-in-up break-words px-4">
              One missed job covers the entire monthly cost. Every plan includes full done-for-you setup, dedicated support, and no long-term contracts.
            </p>
          </div>

          {/* ── COMPACT PRICING CARDS ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* ── STARTER ── */}
            <div className="stagger-item group p-6 md:p-8 rounded-[2rem] border flex flex-col transition-all duration-500 relative backdrop-blur-sm bg-white/[0.02] border-white/[0.06] hover:border-slate-400/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]">
              <h3 className="text-lg font-black uppercase italic mb-1 text-slate-300">Starter</h3>
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-4">For Small Businesses</div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black tracking-tighter text-white">$349</span>
                <span className="text-slate-500 text-xs font-bold uppercase">/mo</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <div className="text-sm font-black text-white">300</div>
                  <div className="text-[8px] font-bold text-slate-600 uppercase">Min/mo</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <div className="text-sm font-black text-white">1</div>
                  <div className="text-[8px] font-bold text-slate-600 uppercase">Agent</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                  <div className="text-sm font-black text-white">1</div>
                  <div className="text-[8px] font-bold text-slate-600 uppercase">Number</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['70+ AI Voices', 'Knowledge Base', '24/7 Answering', 'SMS + Booking', 'Account Manager', 'Priority Support'].map((t, j) => (
                  <span key={j} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[9px] font-bold text-slate-400 uppercase tracking-wide">{t}</span>
                ))}
              </div>

              <button
                onClick={() => scrollTo('consultation')}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-wide text-xs transition-all duration-300 hover:scale-[1.02] bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:shadow-lg"
              >
                Get Started
              </button>
            </div>

            {/* ── GROWTH ── */}
            <div className="stagger-item group p-6 md:p-8 rounded-[2rem] border flex flex-col transition-all duration-500 relative backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 via-blue-600/8 to-cyan-400/10 border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] lg:scale-[1.03] z-10 hover:shadow-[0_0_100px_rgba(6,182,212,0.25)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-wide shadow-xl whitespace-nowrap">
                Most Popular
              </div>

              <h3 className="text-lg font-black uppercase italic mb-1 text-cyan-400">Growth</h3>
              <div className="text-[10px] font-bold text-cyan-400/50 uppercase tracking-wide mb-4">For Growing Teams</div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">$697</span>
                <span className="text-cyan-400/50 text-xs font-bold uppercase">/mo</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="text-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="text-sm font-black text-cyan-400">700</div>
                  <div className="text-[8px] font-bold text-cyan-400/50 uppercase">Min/mo</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="text-sm font-black text-cyan-400">3</div>
                  <div className="text-[8px] font-bold text-cyan-400/50 uppercase">Agents</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="text-sm font-black text-cyan-400">3</div>
                  <div className="text-[8px] font-bold text-cyan-400/50 uppercase">Numbers</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Everything in Starter', 'CRM Integration', 'Call Transfer', '16 Languages', 'Industry Templates', 'Analytics', '48hr Setup'].map((t, j) => (
                  <span key={j} className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400/80 uppercase tracking-wide">{t}</span>
                ))}
              </div>

              <button
                onClick={() => scrollTo('consultation')}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-wide text-xs transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                Get Started
              </button>
            </div>

            {/* ── ELITE ── */}
            <div className="stagger-item group p-6 md:p-8 rounded-[2rem] border flex flex-col transition-all duration-500 relative backdrop-blur-sm bg-gradient-to-br from-purple-500/8 via-purple-900/5 to-amber-500/5 border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-wide shadow-xl whitespace-nowrap">
                Premium
              </div>

              <h3 className="text-lg font-black uppercase italic mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">Elite</h3>
              <div className="text-[10px] font-bold text-purple-400/50 uppercase tracking-wide mb-4">High-Volume & Multi-Location</div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">$1,297</span>
                <span className="text-purple-400/50 text-xs font-bold uppercase">/mo</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="text-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-sm font-black text-purple-400">1,500</div>
                  <div className="text-[8px] font-bold text-purple-400/50 uppercase">Min/mo</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-sm font-black text-purple-400 text-[11px]">Unlimited</div>
                  <div className="text-[8px] font-bold text-purple-400/50 uppercase">Agents</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="text-sm font-black text-purple-400">5</div>
                  <div className="text-[8px] font-bold text-purple-400/50 uppercase">Numbers</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Everything in Growth', 'Custom Voice', 'API & Webhooks', 'White-Glove Setup', 'Weekly Reviews', 'Slack/Teams Channel'].map((t, j) => (
                  <span key={j} className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-bold text-purple-400/80 uppercase tracking-wide">{t}</span>
                ))}
              </div>

              <button
                onClick={() => scrollTo('consultation')}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-wide text-xs transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                Get Started
              </button>
            </div>

          </div>

          {/* ── FEATURE COMPARISON TABLE ── */}
          <div className="mt-16 fade-in-up">
            <h3 className="text-center text-sm font-black uppercase tracking-wide text-white mb-8">Compare All Features</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left p-4 text-[10px] font-bold text-slate-600 uppercase tracking-wide w-[40%]">Feature</th>
                    <th className="text-center p-4 text-[10px] font-bold text-slate-400 uppercase tracking-wide">Starter</th>
                    <th className="text-center p-4 text-[10px] font-bold text-cyan-400 uppercase tracking-wide">Growth</th>
                    <th className="text-center p-4 text-[10px] font-bold text-purple-400 uppercase tracking-wide">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Minutes Included', starter: '300', growth: '700', elite: '1,500' },
                    { feature: 'AI Receptionists', starter: '1', growth: '3', elite: 'Unlimited' },
                    { feature: 'Phone Numbers', starter: '1', growth: '3', elite: '5' },
                    { feature: '70+ Studio-Grade AI Voices', starter: true, growth: true, elite: true },
                    { feature: '24/7 Call Answering', starter: true, growth: true, elite: true },
                    { feature: 'Appointment Booking + Calendar', starter: true, growth: true, elite: true },
                    { feature: 'SMS Confirmations', starter: true, growth: true, elite: true },
                    { feature: 'Smart Knowledge Base & FAQs', starter: true, growth: true, elite: true },
                    { feature: 'Lead Capture & Client Profiles', starter: true, growth: true, elite: true },
                    { feature: 'Call Transcripts & Summaries', starter: true, growth: true, elite: true },
                    { feature: 'Dedicated Account Manager', starter: true, growth: true, elite: true },
                    { feature: '24/7 Priority Support', starter: true, growth: true, elite: true },
                    { feature: 'CRM Integration', starter: false, growth: true, elite: true },
                    { feature: 'Call Transfer to Live Staff', starter: false, growth: true, elite: true },
                    { feature: 'Returning Caller Recognition', starter: false, growth: true, elite: true },
                    { feature: '16-Language Support', starter: false, growth: true, elite: true },
                    { feature: 'Industry-Specific Templates', starter: false, growth: true, elite: true },
                    { feature: 'Analytics Dashboard', starter: false, growth: true, elite: true },
                    { feature: 'Priority Setup (48hr)', starter: false, growth: true, elite: true },
                    { feature: 'Custom Voice & Personality', starter: false, growth: false, elite: true },
                    { feature: 'Custom API & Webhooks', starter: false, growth: false, elite: true },
                    { feature: 'White-Glove Onboarding', starter: false, growth: false, elite: true },
                    { feature: 'Weekly Performance Reviews', starter: false, growth: false, elite: true },
                    { feature: 'Dedicated Slack/Teams Channel', starter: false, growth: false, elite: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="p-3 md:p-4 text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">{row.feature}</td>
                      {[row.starter, row.growth, row.elite].map((val, j) => (
                        <td key={j} className="text-center p-3 md:p-4">
                          {typeof val === 'string' ? (
                            <span className={`text-xs font-black ${j === 0 ? 'text-white' : j === 1 ? 'text-cyan-400' : 'text-purple-400'}`}>{val}</span>
                          ) : val ? (
                            <svg className={`w-4 h-4 mx-auto ${j === 0 ? 'text-emerald-400' : j === 1 ? 'text-cyan-400' : 'text-purple-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          ) : (
                            <span className="text-slate-700 text-xs">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-14 fade-in-up">
            <h3 className="text-center text-sm font-black uppercase tracking-wide text-white mb-6">Available Add-Ons</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { name: 'Outbound Campaigns', price: '+$297/mo', desc: 'Cold/warm calling with lead lists & sales AI' },
                { name: 'Extra Phone Numbers', price: '+$25/mo each', desc: 'Additional dedicated numbers' },
                { name: 'Custom API Workflows', price: '+$197/mo', desc: 'Zapier, webhooks, custom integrations' },
                { name: 'White-Label Reseller', price: 'Custom', desc: 'Brand it as your own' },
              ].map((addon, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                  <p className="text-[10px] font-black uppercase tracking-wide text-white mb-1 break-words">{addon.name}</p>
                  <p className="text-xs font-black text-cyan-400 mb-1">{addon.price}</p>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-wide leading-relaxed break-words">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-slate-700 text-xs font-bold uppercase tracking-wide break-words px-4">
            Extra minutes billed at discounted tiered rates. No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
