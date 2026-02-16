
import React, { useState, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Testimonials from './components/Testimonials';
import Samples from './components/Samples';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import ChatWidget from './components/ChatWidget';
import IncomingCall from './components/IncomingCall';
import Integrations from './components/Integrations';

/* ------------------------------------------------------------------ */
/*  HERO LOGO                                                          */
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
      <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={handleInteraction} onTouchStart={handleInteraction}
        className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 mx-auto cursor-pointer group" style={{ perspective: '800px' }}>
        <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-400/30 group-hover:border-cyan-400/60 shadow-2xl group-hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-shadow duration-500"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isPressed ? 0.92 : 1})`, transition: isPressed ? 'transform 0.1s ease' : 'transform 0.15s ease-out' }}>
          <img src="/logo.png" alt="RelayOpsAI" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
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
/*  INDUSTRY ROUTING MODAL                                             */
/* ------------------------------------------------------------------ */
const IndustryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const [showOtherMsg, setShowOtherMsg] = useState(false);
  const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

  if (!isOpen) return null;

  const handleDental = () => {
    localStorage.setItem('relayops_industry', 'dental');
    navigate('/dentists');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl shadow-cyan-500/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!showOtherMsg ? (
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white mb-3">What type of business do you run?</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-8">Select your industry to see the right solution</p>
            <div className="space-y-4">
              <button onClick={handleDental}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0b1221] to-[#0f172a] border border-cyan-500/30 text-white font-black uppercase tracking-wide text-sm hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-300 flex items-center gap-4 group text-left">
                <div className="w-16 h-16 rounded-full bg-black/50 border border-cyan-500/30 p-2 flex-shrink-0 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <img src="/dental-logo.png" alt="Dental" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
                <div>
                  <span className="block text-cyan-400 text-lg">Dental Practice</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI Front Desk & Booking</span>
                </div>
                <svg className="w-5 h-5 ml-auto text-slate-600 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
              <button onClick={() => setShowOtherMsg(true)}
                className="w-full py-4 px-6 rounded-2xl bg-white/[0.04] border border-white/10 text-white font-black uppercase tracking-wide text-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center gap-4 group text-left">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                </div>
                <div>
                  <span className="block text-slate-300 text-lg">Other Business</span>
                  <span className="block text-[10px] text-slate-600 font-bold uppercase tracking-wider">Custom Implementation</span>
                </div>
                <svg className="w-5 h-5 ml-auto text-slate-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-4">We'd Love to Talk</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">We currently specialize in dental practices, but we'd still love to learn about your business.</p>
            <button onClick={() => { localStorage.setItem('relayops_industry', 'other'); window.open(CALENDLY_LINK, '_blank'); }}
              className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black uppercase tracking-wide text-sm hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300">
              Book a Call
            </button>
            <button onClick={() => setShowOtherMsg(false)} className="mt-4 text-slate-500 hover:text-white text-xs font-black uppercase tracking-wide transition-colors">← Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  CORE FEATURES SECTION                                              */
/* ------------------------------------------------------------------ */
const coreFeatures = [
  {
    icon: 'M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z',
    title: '24/7 Call Answering', desc: 'Never miss a customer call again — day, night, weekends, holidays.'
  },
  {
    icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z',
    title: 'Smart Appointment Booking', desc: 'AI books directly into your calendar in real time — zero manual entry.'
  },
  {
    icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z',
    title: 'Instant SMS Follow-Ups', desc: 'Automatic text confirmations and follow-ups after every call.'
  },
  {
    icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7H9v-2h6v2zm0 4H9v-2h6v2z',
    title: 'Call Summaries & Reporting', desc: 'Full transcripts and analytics so you always know what happened.'
  },
  {
    icon: 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
    title: 'Multi-Language Support', desc: 'Speaks with customers in 30+ languages automatically — no multilingual staff needed.'
  },
  {
    icon: 'M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z',
    title: 'Custom AI Voice for Your Business', desc: 'A voice that sounds like your brand — professional, warm, and uniquely yours.'
  },
];

/* ------------------------------------------------------------------ */
/*  INDUSTRY SECTION                                                   */
/* ------------------------------------------------------------------ */
const IndustrySection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
          Built for Your <span className="gradient-relay">Industry.</span>
        </h2>
        <p className="text-slate-500 uppercase font-bold text-xs tracking-wide max-w-lg mx-auto leading-relaxed fade-in-up mb-12 break-words px-4">
          Industry-specific AI solutions tailored to your business workflow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button onClick={() => { localStorage.setItem('relayops_industry', 'dental'); navigate('/dentists'); }}
            className="stagger-item group p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-cyan-400/10 border border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-all duration-500 backdrop-blur-sm text-left">
            <div className="w-14 h-14 mb-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" /></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2">Dental & Orthodontic</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">AI front desk for dental practices</p>
            <span className="inline-flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wide group-hover:gap-3 transition-all">
              Explore Solution <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </button>
          <button onClick={onOpenModal}
            className="stagger-item group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm text-left">
            <div className="w-14 h-14 mb-4 bg-white/[0.04] rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-wide text-white mb-2">Other Business</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">More industries launching soon</p>
            <span className="inline-flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wide group-hover:text-white group-hover:gap-3 transition-all">
              Contact Us <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */
const App: React.FC = () => {
  const [addonsOpen, setAddonsOpen] = useState(false);
  const [openTier, setOpenTier] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openAuditModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen text-white bg-transparent flex flex-col pt-16 md:pt-24 relative">
      <ParticleBackground />
      <Navbar onCtaClick={openAuditModal} />
      <IndustryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── 1) HERO ── */}
      <header id="top" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 flex flex-col items-center text-center relative overflow-x-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-cyan-600/8 via-blue-600/5 to-purple-600/3 blur-[80px] rounded-full pointer-events-none" />
        <HeroLogo />

        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-xs font-black uppercase tracking-wide break-words">AI Receptionist — Live 24/7</span>
        </div>

        <h1 className="clamp-hero font-black mb-6 md:mb-8 tracking-tighter italic uppercase relative z-10">
          Never Miss Another <br />
          <span className="gradient-relay">Customer Opportunity</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg lg:text-2xl max-w-3xl mx-auto mb-10 font-medium leading-relaxed relative z-10 px-2">
          RelayOpsAI answers calls, books appointments, responds to customers, and automates communication — 24/7.
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 relative z-10">
          {[
            { val: '24/7', label: 'Call Coverage' },
            { val: '30+', label: 'Languages' },
            { val: '98%', label: 'Answer Rate' },
            { val: '<2s', label: 'Avg Response' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
              <span className="text-white font-black text-sm whitespace-nowrap">{s.val}</span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wide break-words">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full max-w-xl justify-center mb-10 relative z-20 px-4">
          <button onClick={() => scrollTo('demo')}
            className="group px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-white to-gray-100 text-black rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 border border-white/20">
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Hear the AI in Action
          </button>
          <button onClick={openAuditModal}
            className="px-8 md:px-10 py-4 md:py-5 border-2 border-cyan-500/30 bg-cyan-500/5 rounded-full font-black uppercase tracking-wide text-xs md:text-sm hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 backdrop-blur-sm">
            Get a Custom Business Audit
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto border-t border-white/[0.04] pt-8">
          <p className="text-xs font-black uppercase tracking-wide text-slate-700 mb-10 break-words">Trusted by Local Businesses</p>
          <Testimonials />
        </div>
      </header>

      {/* ── 2) DEMO ── */}
      <Samples />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 3) REVENUE PAIN ── */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/[0.03] to-transparent pointer-events-none" data-parallax="0.3" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none fade-in-up">
            Missed Calls Cost You <br /><span className="text-rose-500">Real Money</span>
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
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 5) HOW IT WORKS ── */}
      <HowItWorks />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 6) CORE FEATURES ── */}
      <section className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
              Designed for <span className="gradient-relay">Real Businesses.</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed fade-in-up break-words px-4">
              Capture more leads. Respond instantly. Grow without hiring more staff.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((f, i) => (
              <div key={i} className="stagger-item group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 backdrop-blur-sm">
                <div className="w-12 h-12 mb-5 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d={f.icon} /></svg>
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">{f.title}</h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 7) INDUSTRY ROUTING ── */}
      <IndustrySection onOpenModal={openAuditModal} />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* ── 8) TRUST / METRICS ── */}
      <section id="customers" className="py-16 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-3 fade-in-up">Performance Standards.</h2>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wide fade-in-up break-words">What you get when every call is answered</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { val: '24/7', label: 'Coverage', sub: 'Always on, never sleeps' },
            { val: '98%', label: 'Answer Rate', sub: 'Industry-leading accuracy' },
            { val: 'Instant', label: 'Booking + SMS', sub: 'Real-time confirmations' },
            { val: '48hr', label: 'Setup Time', sub: 'Fully done for you' },
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

      {/* ── 9) INTEGRATIONS ── */}
      <Integrations />
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 10) PRICING ── */}
      <section id="pricing" className="py-20 px-4 md:px-6 scroll-mt-32 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">Investment.</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed fade-in-up break-words px-4">
              One missed job covers the entire monthly cost. Full done-for-you setup, dedicated support, no long-term contracts.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {/* STARTER */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-white/[0.03] border border-white/[0.06] hover:border-slate-400/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-slate-400 to-slate-500" />
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-lg font-extrabold uppercase tracking-wide text-slate-300 mb-1">Starter</h3>
                <p className="text-xs font-semibold text-slate-600 mb-6">For Small Businesses</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs font-bold text-slate-500 relative -top-4">$</span>
                  <span className="text-5xl font-black tracking-tight text-white">349</span>
                  <span className="text-sm font-bold text-slate-500 ml-1">/mo</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mb-1">Ideal for businesses under 300 calls/mo</p>
                <p className="text-xs font-bold mb-5"><span className="line-through text-slate-600">$497 Setup</span> <span className="text-emerald-400 ml-1">WAIVED</span></p>
                <div className="mb-8 relative">
                  <button onClick={() => setOpenTier(openTier === 'starter' ? null : 'starter')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-slate-400 hover:border-slate-300 transition-all duration-300">
                    <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">300 minutes / month</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openTier === 'starter' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'starter' ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.04]">
                        <span className="text-xs font-semibold text-white flex-grow">300 minutes / month</span>
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"><div><span className="text-xs font-semibold text-slate-400">Extra minutes</span><span className="text-[10px] text-slate-600 ml-2">$0.35/min overage</span></div></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {['1 Fully Custom AI Receptionist', '70+ Studio-Grade AI Voices', '1 Dedicated Phone Number', '24/7 Call Answering', 'Appointment Booking + Calendar Sync', 'SMS Confirmations', 'Smart Knowledge Base & FAQs', 'Lead Capture & Client Profiles', 'Call Transcripts & Summaries', 'Multi-Language Support (30+)', 'Dedicated Account Manager', '24/7 Priority Support'].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-400 flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('consultation')} className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-white/10 border border-white/10 hover:bg-white/20 hover:shadow-lg">Start Now</button>
              </div>
            </div>

            {/* GROWTH — featured */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 lg:scale-[1.04] z-10 bg-gradient-to-br from-cyan-500/10 via-blue-600/8 to-cyan-400/10 border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.15)] hover:shadow-[0_0_100px_rgba(6,182,212,0.25)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              <div className="absolute top-5 right-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wide shadow-xl">Most Popular</div>
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
                <div className="mb-8 relative">
                  <button onClick={() => setOpenTier(openTier === 'growth' ? null : 'growth')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-cyan-400 hover:border-cyan-300 transition-all duration-300">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">700 minutes / month</span>
                    <span className="text-[10px] font-bold text-cyan-400/50 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-cyan-400/50 transition-transform duration-300 ${openTier === 'growth' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'growth' ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/10"><span className="text-xs font-semibold text-white flex-grow">700 minutes / month</span><svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"><div><span className="text-xs font-semibold text-slate-400">Extra minutes</span><span className="text-[10px] text-slate-600 ml-2">$0.30/min overage</span></div></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {['3 Fully Custom AI Receptionists', '3 Phone Numbers', 'Everything in Starter', 'CRM Integration (Salesforce, HubSpot, etc.)', 'Call Transfer to Live Staff', 'Returning Caller Recognition', 'Multi-Language Support (30+ Auto-Detect)', 'Industry-Specific Templates', 'Analytics Dashboard & Reporting', 'Priority Setup (48hr)'].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-300 flex items-start gap-3">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('consultation')} className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">Start Now</button>
              </div>
            </div>

            {/* ELITE */}
            <div className="stagger-item group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-purple-500/8 via-purple-900/5 to-amber-500/5 border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-sm">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-amber-500" />
              <div className="absolute top-5 right-5 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wide shadow-xl">Premium</div>
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
                <div className="mb-8 relative">
                  <button onClick={() => setOpenTier(openTier === 'elite' ? null : 'elite')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117] border-l-2 border-purple-400 hover:border-purple-300 transition-all duration-300">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                    <span className="text-sm font-bold text-white flex-grow text-left">1,500 minutes / month</span>
                    <span className="text-[10px] font-bold text-purple-400/50 uppercase tracking-wide mr-1">Included</span>
                    <svg className={`w-4 h-4 text-purple-400/50 transition-transform duration-300 ${openTier === 'elite' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openTier === 'elite' ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#0d1117] rounded-xl border border-white/[0.06] p-3 space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-500/10"><span className="text-xs font-semibold text-white flex-grow">1,500 minutes / month</span><svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors"><div><span className="text-xs font-semibold text-slate-400">Extra minutes</span><span className="text-[10px] text-slate-600 ml-2">$0.25/min overage</span></div></div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {['Unlimited Custom AI Receptionists', '5 Phone Numbers', 'Everything in Growth', 'Multi-Language Support (30+ Auto-Detect)', 'Custom Voice & Personality', 'Custom API & Webhook Integrations', 'White-Glove Onboarding', 'Weekly Performance Reviews', 'Dedicated Slack/Teams Channel'].map((f, j) => (
                    <li key={j} className="text-xs font-semibold text-slate-400 flex items-start gap-3">
                      <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('consultation')} className="w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-xs text-white transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 shadow-lg shadow-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">Start Now</button>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-14 max-w-4xl mx-auto fade-in-up">
            <button onClick={() => setAddonsOpen(!addonsOpen)} className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 group">
              <span className="text-sm font-black uppercase tracking-wide text-white">Available Add-Ons</span>
              <svg className={`w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 ${addonsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${addonsOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Outbound Campaigns', price: '+$297/mo', desc: 'Cold/warm calling with lead lists & sales AI' },
                  { name: 'Extra Phone Numbers', price: '+$25/mo each', desc: 'Additional dedicated numbers for departments' },
                  { name: 'Custom API Workflows', price: '+$197/mo', desc: 'Zapier, webhooks, custom integrations' },
                  { name: 'White-Label Reseller', price: 'Custom', desc: 'Brand it as your own — full reseller dashboard' },
                ].map((addon, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 transition-all duration-300">
                    <div><p className="text-xs font-black text-white uppercase tracking-wide mb-1">{addon.name}</p><p className="text-[10px] font-semibold text-slate-600 leading-relaxed">{addon.desc}</p></div>
                    <span className="text-xs font-black text-cyan-400 whitespace-nowrap mt-0.5">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-10 text-center text-slate-600 text-xs font-semibold break-words px-4">Extra minutes billed at discounted tiered rates &middot; No hidden fees &middot; No contracts &middot; Cancel anytime</p>
        </div>
      </section>
      <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── 11) CTA — See What RelayOpsAI Can Do ── */}
      <section id="consultation" className="py-16 px-6 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none fade-in-up">
            See What RelayOpsAI <br /><span className="gradient-relay">Can Do.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-xl mx-auto mb-10 fade-in-up">
            Get a personalized audit of your current call handling and see exactly how much revenue you're leaving on the table.
          </p>
          <button onClick={openAuditModal}
            className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-black text-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all duration-300 shadow-2xl shadow-cyan-500/30 fade-in-up">
            Get a Custom Audit
          </button>
          <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-wide break-words">
            Limited implementation slots available each month. No credit card required.
          </p>
        </div>
      </section>

      <ChatWidget />
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
