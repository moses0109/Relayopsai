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
import MedSpaIncomingCall from './components/medspa/MedSpaIncomingCall';

/* ------------------------------------------------------------------ */
/*  MED SPA PAGE — Conversion Psychology Optimized Flow             */
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
    <div className="min-h-screen text-slate-900 bg-white flex flex-col relative">
      <Navbar />

      {/* CONVERSION FLOW:
          1. Hero - Attention + Loss Aversion ($18k/month slipping away)
          2. Pain Points - Agitate the problem
          3. ROI Calculator - Show them their specific loss
          4. Social Proof - Build trust with testimonials
          5. Features - Show how we solve it
          6. Pricing - Make the offer
          7. Final CTA - Last chance conversion
          8. Consultation Form - Capture the lead
      */}

      <MedSpaHero
        onBookDemo={handleBookDemo}
        onCalculateROI={handleCalculateROI}
      />

      <MedSpaPainPoints />

      <MedSpaROI onBookDemo={handleBookDemo} />

      <MedSpaTestimonials />

      <MedSpaFeatures />

      <MedSpaPricing onBookSetup={() => handleBookSetup('premium')} />

      {/* Final CTA Section */}
      <section className="py-24 px-6 md:px-8 text-center bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            <span className="text-slate-900">Ready to Stop</span><br />
            <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Losing Money?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            127 missed calls per month = $228,600 lost annually.
            <span className="block mt-2 text-slate-900 font-bold">See your exact numbers below.</span>
          </p>

          <button
            type="button"
            onClick={handleBookDemo}
            className="px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-[1.03] active:scale-[0.98] mb-8"
          >
            Calculate My Lost Revenue (Free)
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600">
            {['HIPAA-Compliant', '5-Min Setup', 'No Contract', '30-Day Guarantee'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Consultation leadSource={leadSource} />

      {/* Pain Point Animation - Shows missed calls */}
      <MedSpaIncomingCall />

      <Analytics />
    </div>
  );
};

export default MedSpaPage;
