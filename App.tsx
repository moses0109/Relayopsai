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
import Features from './components/Features';
import PhoneMockup from './components/PhoneMockup';
import FAQ from './components/FAQ';

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
      <div className="absolute inset-[-40px] md:inset-[-70px] pointer-events-none">
        <div className="absolute inset-0 border border-cyan-400/10 rounded-full animate-[spin_25s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px]" />
        </div>
        <div className="absolute inset-3 border border-blue-500/10 rounded-full animate-[spin_18s_linear_infinite_reverse]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[2px]" />
        </div>
      </div>

      <div className="absolute inset-[-20px] bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full blur-2xl pointer-events-none" />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] mx-auto cursor-pointer group"
        style={{ perspective: '800px' }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.92 : 1})`,
            transition: isPressed ? 'transform 0.1s ease' : 'transform 0.15s ease-out',
          }}
        >
          <img
            src="/logo-hero.png"
            alt="RelayOpsAI"
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.6)] group-hover:drop-shadow-[0_0_60px_rgba(6,182,212,0.8)] transition-all duration-500"
            draggable={false}
          />
          {ripples.map((id) => (
            <div key={id} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-[heroRipple_0.8s_ease-out_forwards]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  APP LAYOUT                                                         */
/* ------------------------------------------------------------------ */

const App: React.FC = () => {
  const [addonsOpen, setAddonsOpen] = useState(false);
  const [openTier, setOpenTier] = useState<string | null>(null);
  const [leadSource, setLeadSource] = useState('general');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen text-white bg-[#0f172a] flex flex-col pt-16 md:pt-24 relative">
      <ParticleBackground />
      <Navbar />

      {/* ── 1) HERO ── */}
      <header id="top" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 flex flex-col items-center text-center relative overflow-x-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-cyan-600/8 via-blue-600/5 to-purple-600/3 blur-[80px] rounded-full pointer-events-none" />

        <HeroLogo />

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
          RelayOpsAI answers every call, books every appointment, and captures every dollar — so you make more money starting today.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-10 relative z-10">
          {[
            { val: '24/7', label: 'Call Coverage' },
            { val: '70+',  label: 'AI Voices' },
            { val: '16',   label: 'Languages' },
            { val: '<1s',  label: 'Avg Response' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <span className="text-white font-black text-sm whitespace-nowrap">{s.val}</span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wide break-words">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full max-w-xl justify-center mb-10 md:mb-10 relative z-20 px-4">
          <button
            onClick={() => scrollTo('demo')}
            className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-white to-gray-100 text-black rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 border border-white/20"
          >
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Hear the AI in Action
          </button>
          <button
            onClick={() => { setLeadSource('hero'); scrollTo('consultation'); }}
            className="px-8 md:px-10 py-4 md:py-5 border-2 border-cyan-500/30 bg-cyan-500/5 rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 backdrop-blur-sm"
          >
            Book a Demo
          </button>
        </div>

        {/* Features grid replaces Testimonials in hero */}
        <div className="w-full max-w-7xl mx-auto border-t border-white/[0.04] pt-8">
          <Features />
        </div>
      </header>

      {/* ── 2) DEMO ── */}
      <Samples />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 3) PHONE MOCKUP ── */}
      <PhoneMockup />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 4) REVENUE PAIN ── */}
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
          <p className="text-emerald-400 text-base md:text-lg font-black max-w-2xl mx-auto mb-4 fade-in-up uppercase tracking-wide">
            Capture $1,500+ in one week with RelayOpsAI.
          </p>
          <p className="text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10 fade-in-up">
            We make sure every call is answered, every lead is captured, and every opportunity turns into cash.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Weekly Revenue', val: '$1,500+', sub: 'Captured in week one' },
              { label: 'Capture Rate', val: '98%', sub: 'Every lead secured' },
              { label: 'ROI Potential', val: '10X+', sub: 'Return on investment' },
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

      {/* ── 5) ROI CALCULATOR ── */}
      <Calculator onBookDemo={() => { setLeadSource('calculator'); scrollTo('consultation'); }} />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 6) HOW IT WORKS ── */}
      <HowItWorks />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 7) TRUST / METRICS ── */}
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
            { val: '5min',    label: 'Setup Time',    sub: 'Fully done for you' },
          ].map((item, i) => (
            <div key={i} className="stagger-item group text-center p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-cyan-500/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-400 group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300 group-hover:scale-110 break-words">{item.val}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1 group-hover:text-cyan-400 transition-colors duration-300 break-words">{item.label}</div>
              <div className="text-xs font-medium text-slate-700 uppercase tracking-wide mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 break-words">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 8) INTEGRATIONS ── */}
      <Integrations />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 9) TESTIMONIALS (moved here — social proof before pricing) ── */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sky-400 text-xs font-black uppercase tracking-widest mb-4 fade-in-up">What Our Clients Say</p>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-12 fade-in-up">
            Trusted by <span className="gradient-relay">Local Businesses</span>
          </h2>
          <Testimonials />
        </div>
      </section>

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 10) PRICING ── */}
      <section id="pricing" className="py-20 px-4 md:px-6 scroll-mt-32 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
              Investment.
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed fade-in-up break-words px-4">
              One recovered job pays for the entire month. Done-for-you setup, dedicated support, no long-term contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

            {/* ── STARTER ── */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white/[0.03] border border-white/[0.06] hover:border-slate-400/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-slate-400 to-slate-500" />

              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold uppercase tracking-wide text-slate-300 mb-1">Starter</h3>
                <p className="text-xs font-semibold text-slate-600 mb-6">For Solo & Small Businesses</p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs font-bold text-slate-500 relative -top-4">$</span>
                  <span className="text-5xl font-black tracking-tight text-white">349</span>
                  <span className="text-sm font-bold text-slate-500 ml-1">/mo</span>
                </div>

                <p className="text-xs font-semibold text-slate-500 mb-1">Best for under 300 calls/mo</p>
                <p className="text-xs font-bold text-amber-400 mb-5">$497 one-time setup fee</p>

                {/* Minutes pill */}
                <div className="mb-8 relative">
                  <button
                    onClick={() => setOpenTier(openTier === 'starter' ? null : 'starter')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-slate-400 hover:border-slate-300 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">300 minutes / month</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openTier === 'starter' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'starter' ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.04]">
                        <span className="text-xs font-semibold text-white flex-grow">300 minutes / month</span>
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-starter'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-sky-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+200 minutes</span>
                        <span className="text-xs font-bold text-sky-400">+$59/mo</span>
                      </button>
                      <button onClick={() => { setLeadSource('pricing-starter'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-sky-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+500 minutes</span>
                        <span className="text-xs font-bold text-sky-400">+$129/mo</span>
                      </button>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                        <div>
                          <span className="text-xs font-semibold text-slate-400">Extra minutes</span>
                          <span className="text-[10px] text-slate-600 ml-2">$0.40/min overage</span>
                        </div>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-starter'); scrollTo('consultation'); }} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                        Need More? Let's Talk <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 flex-grow mb-8">
                  {[
                    'Done-for-You Setup',
                    'Custom Knowledge Base',
                    'Custom System Prompt',
                    '1 Custom AI Receptionist',
                    '1 Dedicated Phone Number',
                    '70+ Studio-Grade AI Voices',
                    '24/7 Call Answering',
                    'Appointment Booking + Calendar Sync',
                    'SMS Confirmations',
                    'Missed Call Text-Back',
                    'Lead Capture & Client Profiles',
                    'Call Transcripts & Summaries',
                    'Voicemail Transcription',
                    'Email Notifications',
                    'Basic Analytics Dashboard',
                    'Monthly Support Call',
                  ].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-400 flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setLeadSource('pricing-starter'); scrollTo('consultation'); }}
                  className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-white/10 border border-white/10 hover:bg-white/20 hover:shadow-lg"
                >
                  Book Your Setup Call
                </button>
              </div>
            </div>

            {/* ── GROWTH — featured card ── */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 lg:scale-[1.04] z-10 bg-gradient-to-br from-cyan-500/10 via-blue-600/8 to-cyan-400/10 border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] hover:shadow-[0_0_100px_rgba(6,182,212,0.25)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

              <div className="absolute top-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wide shadow-xl">
                Most Popular
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold uppercase tracking-wide text-cyan-400 mb-1">Growth</h3>
                <p className="text-xs font-semibold text-cyan-400/50 mb-6">For Growing Teams</p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs font-bold text-cyan-400/60 relative -top-4">$</span>
                  <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">697</span>
                  <span className="text-sm font-bold text-cyan-400/50 ml-1">/mo</span>
                </div>

                <p className="text-xs font-semibold text-cyan-400/60 mb-1">Best for 300–700 calls/mo</p>
                <p className="text-xs font-bold mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>

                {/* Minutes pill */}
                <div className="mb-8 relative">
                  <button
                    onClick={() => setOpenTier(openTier === 'growth' ? null : 'growth')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-cyan-400 hover:border-cyan-300 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">700 minutes / month</span>
                    <span className="text-[10px] font-bold text-cyan-400/50 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-cyan-400/50 transition-transform duration-300 ${openTier === 'growth' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'growth' ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/10">
                        <span className="text-xs font-semibold text-white flex-grow">700 minutes / month</span>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-growth'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+300 minutes</span>
                        <span className="text-xs font-bold text-cyan-400">+$79/mo</span>
                      </button>
                      <button onClick={() => { setLeadSource('pricing-growth'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+700 minutes</span>
                        <span className="text-xs font-bold text-cyan-400">+$169/mo</span>
                      </button>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                        <div>
                          <span className="text-xs font-semibold text-slate-400">Extra minutes</span>
                          <span className="text-[10px] text-slate-600 ml-2">$0.35/min overage</span>
                        </div>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-growth'); scrollTo('consultation'); }} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
                        Need More? Let's Talk <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 flex-grow mb-8">
                  {[
                    'Done-for-You Setup',
                    'Custom Knowledge Base',
                    'Custom System Prompt',
                    '3 Custom AI Receptionists',
                    '3 Dedicated Phone Numbers',
                    'Everything in Starter, plus:',
                    'CRM Integration (Salesforce, HubSpot, etc.)',
                    'Call Transfer to Live Staff',
                    'Returning Caller Recognition',
                    'Automated Review Requests (Google/Yelp)',
                    '16-Language Support (Auto-Detect)',
                    'Industry-Specific Call Scripts',
                    'Advanced Analytics & Reporting',
                    'Automated Follow-Up Sequences',
                    'Dedicated Account Manager',
                    'Bi-Weekly Support Calls',
                  ].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-300 flex items-start gap-3">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setLeadSource('pricing-growth'); scrollTo('consultation'); }}
                  className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                >
                  Book Your Setup Call
                </button>
              </div>
            </div>

            {/* ── ELITE ── */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-purple-500/8 via-purple-900/5 to-amber-500/5 border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-amber-500" />

              <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wide shadow-xl">
                Premium
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400 mb-1">Elite</h3>
                <p className="text-xs font-semibold text-purple-400/50 mb-6">High-Volume & Multi-Location</p>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs font-bold text-purple-400/60 relative -top-4">$</span>
                  <span className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">1,297</span>
                  <span className="text-sm font-bold text-purple-400/50 ml-1">/mo</span>
                </div>

                <p className="text-xs font-semibold text-purple-400/50 mb-1">Built for 700+ calls/mo</p>
                <p className="text-xs font-bold mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>

                {/* Minutes pill */}
                <div className="mb-8 relative">
                  <button
                    onClick={() => setOpenTier(openTier === 'elite' ? null : 'elite')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-purple-400 hover:border-purple-300 transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">1,500 minutes / month</span>
                    <span className="text-[10px] font-bold text-purple-400/50 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-purple-400/50 transition-transform duration-300 ${openTier === 'elite' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'elite' ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-500/10">
                        <span className="text-xs font-semibold text-white flex-grow">1,500 minutes / month</span>
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-elite'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-purple-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+500 minutes</span>
                        <span className="text-xs font-bold text-purple-400">+$99/mo</span>
                      </button>
                      <button onClick={() => { setLeadSource('pricing-elite'); scrollTo('consultation'); }} className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-purple-500/10 transition-colors cursor-pointer">
                        <span className="text-xs font-semibold text-slate-300">+1,000 minutes</span>
                        <span className="text-xs font-bold text-purple-400">+$179/mo</span>
                      </button>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                        <div>
                          <span className="text-xs font-semibold text-slate-400">Extra minutes</span>
                          <span className="text-[10px] text-slate-600 ml-2">$0.30/min overage</span>
                        </div>
                      </div>
                      <button onClick={() => { setLeadSource('pricing-elite'); scrollTo('consultation'); }} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                        Need More? Let's Talk <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 flex-grow mb-8">
                  {[
                    'Done-for-You Setup',
                    'Custom Knowledge Base',
                    'Custom System Prompt',
                    'Unlimited Custom AI Receptionists',
                    '5 Dedicated Phone Numbers',
                    'Everything in Growth, plus:',
                    'Custom Voice Cloning & Personality',
                    'Custom API & Webhook Integrations',
                    'Outbound AI Campaigns (Recall/Follow-up)',
                    'No-Show Recovery Automation',
                    'Multi-Location Routing',
                    'HIPAA-Compliant Call Handling',
                    'White-Glove Onboarding',
                    'Weekly Performance Reviews',
                    'Dedicated Slack/Teams Channel',
                    '24/7 Priority Support',
                  ].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-400 flex items-start gap-3">
                      <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setLeadSource('pricing-elite'); scrollTo('consultation'); }}
                  className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 shadow-lg shadow-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  Book Your Setup Call
                </button>
              </div>
            </div>

          </div>

          {/* Add-ons accordion */}
          <div className="mt-14 max-w-4xl mx-auto fade-in-up">
            <button
              onClick={() => setAddonsOpen(!addonsOpen)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <span className="text-sm font-black uppercase tracking-wide text-white">Available Add-Ons</span>
              <svg
                className={`w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 ${addonsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${addonsOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Outbound Campaigns', price: '+$297/mo', desc: 'Recall, reactivation & lead nurture calling' },
                  { name: 'Extra Phone Numbers', price: '+$25/mo each', desc: 'Dedicated numbers for departments or locations' },
                  { name: 'Custom API Workflows', price: '+$197/mo', desc: 'Zapier, webhooks, custom system integrations' },
                  { name: 'Review Booster', price: '+$97/mo', desc: 'Automated Google & Yelp review requests post-call' },
                  { name: 'SMS Marketing Campaigns', price: '+$147/mo', desc: 'Promotional texts, recall reminders, announcements' },
                  { name: 'White-Label Reseller', price: 'Custom', desc: 'Brand it as your own — full reseller dashboard' },
                ].map((addon, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300">
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-wide mb-1">{addon.name}</p>
                      <p className="text-[10px] font-semibold text-slate-600 leading-relaxed">{addon.desc}</p>
                    </div>
                    <span className="text-xs font-black text-cyan-400 whitespace-nowrap mt-0.5">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-600 text-xs font-semibold break-words px-4">
            Extra minutes billed at discounted tiered rates &middot; No hidden fees &middot; No contracts &middot; Cancel anytime
          </p>
        </div>
      </section>

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 11) CONSULTATION ── */}
      <Consultation leadSource={leadSource} />

      {/* ── 12) FAQ (under Capture your Growth) ── */}
      <FAQ />

      {/* ── 13) FLOATING CHAT WIDGET ── */}
      <ChatWidget />

      {/* ── 14) INCOMING CALL POPUP ── */}
      <IncomingCall />

      <Analytics />

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
