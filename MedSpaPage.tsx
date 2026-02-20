import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Consultation from './components/Consultation';
import MedSpaHero from './components/medspa/MedSpaHero';
import MedSpaPainPoints from './components/medspa/MedSpaPainPoints';
import MedSpaFeatures from './components/medspa/MedSpaFeatures';
import MedSpaROI from './components/medspa/MedSpaROI';
import MedSpaTestimonials from './components/medspa/MedSpaTestimonials';
import MedSpaPhoneDemo from './components/medspa/MedSpaPhoneDemo';
import MedSpaIncomingCall from './components/medspa/MedSpaIncomingCall';
import MedSpaGodModeLogger from './components/medspa/MedSpaGodModeLogger';
import MedSpaDashboard from './components/medspa/MedSpaDashboard';
import MedSpaGhostCrawler from './components/medspa/MedSpaGhostCrawler';
import MedSpaVisitorTicker from './components/medspa/MedSpaVisitorTicker';

/* ------------------------------------------------------------------ */
/*  MED SPA PAGE — Luxury Cream + Rose Gold                            */
/* ------------------------------------------------------------------ */

const CREAM = '#fdf8f5';
const BLUSH = '#fce7f3';

const WaveDown = ({ from, to }: { from: string; to: string }) => (
  <div className="overflow-hidden -mb-px" style={{ background: from }}>
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '90px' }}
    >
      <path
        fill={to}
        d="M0,45 C180,90 360,10 540,45 C720,80 900,5 1080,45 C1260,82 1380,18 1440,45 L1440,90 L0,90 Z"
      />
    </svg>
  </div>
);

const MedSpaPage: React.FC = () => {
  const [leadSource, setLeadSource] = useState('medspa-general');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookDemo = () => {
    setLeadSource('medspa-hero');
    scrollTo('consultation');
  };

  const handleCalculateROI = () => {
    scrollTo('calculator');
  };

  return (
    <div className="min-h-screen text-slate-900 flex flex-col overflow-x-hidden" style={{ background: CREAM }}>
      <Navbar />

      {/* 1. Hero */}
      <MedSpaHero onBookDemo={handleBookDemo} onCalculateROI={handleCalculateROI} />

      {/* Live Visitor Ticker */}
      <MedSpaVisitorTicker />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 2. Pain Points */}
      <MedSpaPainPoints />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 3. Ghost Crawler */}
      <MedSpaGhostCrawler />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 4. Phone Demo */}
      <MedSpaPhoneDemo />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 5. ROI Calculator */}
      <MedSpaROI onBookDemo={handleBookDemo} />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 6. Dashboard */}
      <MedSpaDashboard />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 7. Testimonials */}
      <MedSpaTestimonials />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 8. Features */}
      <MedSpaFeatures />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 9. Final CTA */}
      <section
        className="py-20 md:py-32 px-6 md:px-8 text-center relative overflow-hidden"
        style={{ background: CREAM }}
      >
        {/* Botanical corners */}
        <svg
          className="absolute top-0 right-0 w-52 h-52 text-rose-300/20 pointer-events-none leaf-float-a"
          viewBox="0 0 200 200" fill="currentColor" aria-hidden="true"
        >
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.6"/>
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-40 h-40 text-pink-300/20 pointer-events-none leaf-float-b"
          viewBox="0 0 200 200" fill="currentColor" aria-hidden="true"
        >
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.7"/>
        </svg>

        <div className="max-w-3xl mx-auto relative z-10">

          {/* Founder quote */}
          <div className="mb-8 p-6 rounded-2xl bg-white/70 border border-rose-200/60 shadow-lg shadow-rose-200/20 backdrop-blur-sm text-left max-w-xl mx-auto">
            <p className="text-slate-700 italic text-base leading-relaxed mb-4">
              "I built this after watching my mom — a med spa owner for 15 years — lose over $180,000 a year to missed calls and anonymous visitors. She deserved better. So does your spa."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 border border-rose-200 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">👤</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Founder, RelayOpsAI</p>
                <p className="text-xs text-slate-500">Built for med spa owners — from one</p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 mb-6">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rose-700">Only 3 Setup Slots Left This Month</span>
          </div>

          <h2 className="medspa-serif text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-4">
            <span className="text-slate-900">Stop Losing Revenue.</span><br />
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Start Growing on AI.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
            Book a free 30-minute call. We'll calculate your exact revenue leak and build your recovery plan — live, on the call, no strings attached.
          </p>

          <button
            type="button"
            onClick={handleBookDemo}
            className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.03] active:scale-[0.98] mb-8 overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative z-10">Get My Free Revenue Audit →</span>
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
            {['HIPAA-Compliant', 'No Contract', 'Setup in 5 Min', '14-Day ROI Guarantee'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Consultation leadSource={leadSource} />
      <MedSpaIncomingCall />
      <MedSpaGodModeLogger />
      <Analytics />
    </div>
  );
};

export default MedSpaPage;
