import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Consultation from './components/Consultation';
import MedSpaHero from './components/medspa/MedSpaHero';
import MedSpaPainPoints from './components/medspa/MedSpaPainPoints';
import MedSpaFeatures from './components/medspa/MedSpaFeatures';
import MedSpaPricing from './components/medspa/MedSpaPricing';
import MedSpaROI from './components/medspa/MedSpaROI';
import MedSpaTestimonials from './components/medspa/MedSpaTestimonials';
import MedSpaPhoneDemo from './components/medspa/MedSpaPhoneDemo';
import MedSpaDashboard from './components/medspa/MedSpaDashboard';
import MedSpaBeforeAfter from './components/medspa/MedSpaBeforeAfter';

/* ------------------------------------------------------------------ */
/*  MED SPA PAGE — Full subpage for NYC med spa owners               */
/* ------------------------------------------------------------------ */

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

  const handleBookSetup = (tier: string) => {
    setLeadSource(`medspa-pricing-${tier}`);
    scrollTo('consultation');
  };

  return (
    <div className="min-h-screen text-slate-900 bg-gradient-to-b from-[#f8f4f1] via-[#f4ebe7] to-[#f0e1dc] flex flex-col pt-20 md:pt-24 relative">
      <Navbar />

      {/* ── 1) HERO ── */}
      <MedSpaHero
        onBookDemo={handleBookDemo}
        onCalculateROI={handleCalculateROI}
      />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-rose-300/40 to-transparent my-16" />

      {/* ── 2) PAIN POINTS ── */}
      <MedSpaPainPoints />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-rose-300/40 to-transparent my-16" />

      {/* ── 3) PHONE DEMO ── */}
      <MedSpaPhoneDemo />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-rose-300/40 to-transparent my-16" />

      {/* ── 4) BEFORE/AFTER REVENUE ── */}
      <MedSpaBeforeAfter />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-rose-300/40 to-transparent my-16" />

      {/* ── 5) FEATURES ── */}
      <MedSpaFeatures />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-200/40 to-transparent my-16" />

      {/* ── 6) ROI CALCULATOR ── */}
      <MedSpaROI onBookDemo={handleBookDemo} />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-200/40 to-transparent my-16" />

      {/* ── 7) DASHBOARD ── */}
      <MedSpaDashboard />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-200/40 to-transparent my-16" />

      {/* ── 8) TESTIMONIALS ── */}
      <MedSpaTestimonials />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-200/40 to-transparent my-16" />

      {/* ── 9) PRICING ── */}
      <MedSpaPricing onBookSetup={() => handleBookSetup('premium')} />

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-purple-200/40 to-transparent my-16" />

      {/* ── 10) FINAL CTA / CONSULTATION ── */}
      <section className="py-16 px-4 md:px-6 text-center">
        <h2 className="medspa-serif text-4xl md:text-6xl mb-8 leading-tight text-slate-800">
          Ready to Capture <br />
          <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent break-words">
            $15,000+ Per Month
          </span>{' '}in Lost Revenue?
        </h2>
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Book a strategy call or calculate your exact ROI below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto justify-center mb-16">
          <button
            onClick={handleBookDemo}
            className="px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold uppercase tracking-wide text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-rose-500/30"
          >
            Book Strategy Call
          </button>
          <button
            onClick={handleCalculateROI}
            className="px-10 py-5 border-2 border-rose-400/40 bg-white/60 backdrop-blur-sm rounded-full font-bold uppercase tracking-wide text-sm text-slate-800 hover:bg-white/80 hover:border-rose-400/60 transition-all shadow-lg"
          >
            Calculate My Med Spa ROI
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-wide text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> HIPAA-Compliant
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> 5-Minute Setup
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> No Long-Term Contract
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> 30-Day Money-Back Guarantee
          </div>
        </div>
      </section>

      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-rose-300/40 to-transparent my-16" />

      {/* ── 11) CONSULTATION FORM ── */}
      <Consultation leadSource={leadSource} />

      {/* ── ANALYTICS ── */}
      <Analytics />
    </div>
  );
};

export default MedSpaPage;
