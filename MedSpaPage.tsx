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
import MedSpaDashboard from './components/medspa/MedSpaDashboard';
import MedSpaVisitorTicker from './components/medspa/MedSpaVisitorTicker';
import MedSpaPricing from './components/medspa/MedSpaPricing';

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
      <MedSpaVisitorTicker />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 2. Pain Points → 3. Phone Demo (both BLUSH — flow directly) */}
      <MedSpaPainPoints />
      <MedSpaPhoneDemo />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 4. Testimonials */}
      <MedSpaTestimonials />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 5. Features */}
      <MedSpaFeatures />

      {/* Wave blush → cream */}
      <WaveDown from={BLUSH} to={CREAM} />

      {/* 6. ROI Calculator → 7. Dashboard (all CREAM — no waves) */}
      <MedSpaROI onBookDemo={handleBookDemo} />
      <MedSpaDashboard />

      {/* 8. Pricing */}
      <MedSpaPricing onBookSetup={(tier) => { setLeadSource(`pricing-${tier}`); scrollTo('consultation'); }} />

      {/* Wave cream → blush */}
      <WaveDown from={CREAM} to={BLUSH} />

      {/* 10. Final CTA */}
      <section className="py-20 md:py-28 px-6 md:px-8 text-center bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">

          <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-4">Get Started</p>

          <h2 className="medspa-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-slate-900">
            Stop Losing Bookings<br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              to Missed Calls.
            </span>
          </h2>

          <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            Book a 30-minute demo. We will walk through your current setup, show you exactly where revenue is slipping, and demonstrate how RelayOpsAI closes the gap — no pressure, no pitch decks.
          </p>

          <button
            type="button"
            onClick={handleBookDemo}
            className="inline-flex items-center gap-3 px-10 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-lg transition-all duration-200 shadow-xl shadow-rose-600/25 hover:shadow-rose-600/40 hover:scale-[1.02] active:scale-[0.98] mb-8"
          >
            Schedule Your Demo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-400">
            {['HIPAA-Compliant', 'No Contract', 'Live in 5 Minutes', '14-Day ROI Guarantee'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Consultation leadSource={leadSource} />
      <Analytics />
    </div>
  );
};

export default MedSpaPage;
