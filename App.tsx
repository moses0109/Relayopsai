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
/*  IMMERSIVE HERO LOGO                                                */
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
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleInteraction = () => {
    setIsPressed(true);
    setRipples(prev => [...prev, Date.now()]);
    setTimeout(() => setIsPressed(false), 200);
    setTimeout(() => setRipples(prev => prev.slice(1)), 800);
  };

  return (
    <div className="relative mb-6 md:mb-8">
      <style>{`
        @keyframes corePulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%       { opacity: 0.30; transform: scale(1.04); }
        }
        @keyframes heroRipple {
          from { transform: scale(1); opacity: 0.4; }
          to   { transform: scale(1.7); opacity: 0; }
        }
      `}</style>

      {/* Subtle ambient glow behind logo */}
      <div className="absolute inset-[-30px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

      {/* Two slow rotating orbit rings */}
      <div className="absolute inset-[-18px] md:inset-[-22px] pointer-events-none">
        <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-[spin_20s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_3px_rgba(6,182,212,0.7)]" />
        </div>
        <div className="absolute inset-4 border border-blue-400/15 rounded-full animate-[spin_13s_linear_infinite_reverse]">
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_6px_rgba(147,197,253,0.8)]" />
        </div>
      </div>

      {/* Logo container with 3D tilt */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] mx-auto cursor-pointer group"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.96 : 1})`,
            transition: isPressed ? 'transform 0.1s ease' : 'transform 0.25s ease-out',
          }}
        >
          <img
            src="/logo-hero.png"
            alt="RelayOpsAI"
            className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(6,182,212,0.55)] group-hover:drop-shadow-[0_0_80px_rgba(6,182,212,0.7)] transition-all duration-700"
            draggable={false}
            style={{ filter: 'brightness(1.1) saturate(1.2)' }}
          />

          {/* Subtle center pulse */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 48%, rgba(6,182,212,0.18) 0%, transparent 55%)', animation: 'corePulse 3s ease-in-out infinite' }} />

          {ripples.map((id) => (
            <div key={id} className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-400/25 rounded-full animate-[heroRipple_0.8s_ease-out_forwards]" />
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
  const [leadSource, setLeadSource] = useState('general');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen text-white bg-[#0f172a] flex flex-col pt-16 md:pt-24 relative">
      <ParticleBackground />
      <Navbar />

      {/* ── 1) HERO ── */}
      <header id="top" className="relative flex flex-col justify-center overflow-x-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[130px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
        </div>

        {/* Split content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 pb-8 md:pt-10 md:pb-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">

          {/* LEFT: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 backdrop-blur-sm">
              <div className="relative flex-shrink-0">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60" />
              </div>
              <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">AI Receptionist — Live 24/7</span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[82px] font-black tracking-[-0.03em] leading-[0.9] mb-5 md:mb-6">
              <span className="block text-white">Your Phone.</span>
              <span className="block text-white">On Autopilot.</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Starting Today.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-lg mb-7 leading-relaxed font-medium">
              AI that answers every call, books every job, and follows up automatically — while you focus on the work that pays.
            </p>

            {/* Star rating trust signal */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-slate-400 text-xs font-semibold">4.9/5 — 120+ businesses live</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => scrollTo('demo')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-black uppercase tracking-wide text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <svg className="w-4 h-4 relative z-10 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span className="relative z-10">Hear the AI in Action</span>
              </button>
              <button
                type="button"
                onClick={() => { setLeadSource('hero'); scrollTo('consultation'); }}
                className="px-8 py-4 border border-white/[0.12] bg-white/[0.03] rounded-full font-black uppercase tracking-wide text-sm hover:bg-white/[0.07] hover:border-white/25 transition-all duration-300 backdrop-blur-sm text-center"
              >
                Book a Demo
              </button>
            </div>

            {/* Friction remover */}
            <p className="text-slate-600 text-xs font-semibold mb-8 flex items-center justify-center lg:justify-start gap-2">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              No credit card · Setup in 5 min · Cancel anytime
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-10">
              {[
                { val: '98%',  label: 'Answer Rate' },
                { val: '$27k', label: 'Monthly Lift' },
                { val: '<1s',  label: 'Response Time' },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-8 bg-white/[0.08]" />}
                  <div className="text-center lg:text-left">
                    <div className="text-xl md:text-2xl font-black text-white leading-none">{s.val}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide font-bold mt-1">{s.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT: Logo + floating call card — desktop only */}
          <div className="hidden lg:flex relative items-center justify-center lg:justify-end">
            <HeroLogo />

            {/* Floating call captured card */}
            <div className="hidden sm:block absolute -bottom-2 lg:bottom-6 -left-2 lg:-left-10 bg-[#0d1f35]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-4 shadow-2xl w-52 pointer-events-none z-30">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white text-[11px] font-bold leading-tight">Call Captured</div>
                  <div className="text-slate-500 text-[10px]">2 min ago · HVAC Co.</div>
                </div>
              </div>
              <p className="text-slate-300 text-[11px] italic leading-snug">"Booked AC repair for Thursday at 2pm"</p>
            </div>
          </div>
        </div>

        {/* Features grid — full width at bottom */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 border-t border-white/[0.04] pt-8 pb-8 md:pb-12">
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

      {/* ── 10) FINAL CTA ── */}
      <section className="py-20 md:py-32 px-6 md:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-400">Only 3 Setup Slots Left This Month</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="text-white">See How We Can</span><br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Build Your Business
            </span><br />
            <span className="text-white">on AI.</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Book a free 15-minute call. We'll show you exactly how much revenue you're losing — and how to recover it starting this week.
          </p>

          <button
            type="button"
            onClick={() => { setLeadSource('hero'); scrollTo('consultation'); }}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-[0.98] mb-10 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative z-10">Get My Free Revenue Audit →</span>
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
            {['No Credit Card', 'No Contract', 'Setup in 5 Min', '14-Day ROI Guarantee'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 11) FAQ ── */}
      <FAQ />

      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 12) CONSULTATION ── */}
      <Consultation leadSource={leadSource} />

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
