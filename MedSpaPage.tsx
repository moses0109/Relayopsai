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
  const [storyOpen, setStoryOpen] = useState(false);

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

      {/* 9. About / Founder Story */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-8 relative overflow-hidden" style={{ background: CREAM }}>

        {/* Botanical accents */}
        <svg className="absolute -top-4 -right-6 w-56 text-rose-200/60 pointer-events-none leaf-float-a" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.6"/>
        </svg>
        <svg className="absolute -bottom-4 -left-6 w-40 text-pink-200/50 pointer-events-none leaf-float-b" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.6"/>
        </svg>

        <div className="max-w-4xl mx-auto relative z-10">

          {/* ── Profile / PFP Card ── */}
          <div className="mb-8 group/card p-7 md:p-10 rounded-3xl bg-gradient-to-br from-[#fdf8f5] via-rose-50/80 to-pink-100/60 border border-rose-200/60 shadow-xl shadow-rose-100/40 hover:shadow-2xl hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-500">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

              {/* Avatar */}
              <div className="relative flex-shrink-0 group/av">
                {/* Glow halo — intensifies on hover */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-rose-300/35 via-pink-200/25 to-purple-200/15 blur-lg group-hover/card:blur-xl group-hover/card:from-rose-300/50 transition-all duration-500 pointer-events-none" />
                {/* Avatar frame */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl shadow-rose-400/35 ring-2 ring-rose-100">
                  <img
                    src="/pfp-medspa.jpg"
                    alt="RelayOpsAI Founder"
                    className="w-full h-full object-cover"
                  />
                  {/* Online dot */}
                  <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white shadow-md shadow-emerald-400/60" />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-rose-200 shadow-md whitespace-nowrap">
                  <svg className="w-3 h-3 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span className="text-[9px] font-black text-rose-600 uppercase tracking-wide">Verified Founder</span>
                </div>
              </div>

              {/* Content hierarchy */}
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">

                {/* H2 — Name / headline */}
                <h2 className="medspa-serif text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-slate-900 mb-1">
                  We Built This Because<br />
                  <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Someone We Love Needed It.
                  </span>
                </h2>

                {/* H3 — Title */}
                <h3 className="text-sm font-bold text-slate-500 mb-3 mt-1">
                  Founder, RelayOpsAI · Son of a med spa owner
                </h3>

                {/* Bio */}
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                  Built after watching my mom lose $180K/year to missed calls. RelayOpsAI is what I wish existed for her — and now it does, for 200+ med spa owners across the country.
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200/70 shadow-sm">
                    <div className="flex gap-0.5">
                      {[0,1,2,3,4].map(i => (
                        <svg key={i} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-600">4.9/5</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200/70 shadow-sm">
                    <span className="text-xs font-bold text-rose-600">200+</span>
                    <span className="text-xs font-semibold text-slate-500">med spas nationwide</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-200/70 shadow-sm">
                    <span className="text-xs font-bold text-slate-600">HIPAA-Compliant</span>
                  </div>
                </div>

                {/* CTA — Book Your Demo */}
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="group relative inline-flex items-center gap-2 min-h-[48px] px-7 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-full font-bold text-sm hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 shadow-xl shadow-rose-400/30 hover:shadow-rose-500/40 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />
                  <span className="relative z-10">Book Your Demo</span>
                  <svg className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

              </div>
            </div>
          </div>

          {/* ── Our Story Accordion ── */}
          <div className="rounded-3xl bg-white border border-rose-100 shadow-lg shadow-rose-100/30 overflow-hidden">

            {/* Trigger */}
            <button
              type="button"
              onClick={() => setStoryOpen((v: boolean) => !v)}
              aria-expanded={storyOpen}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left group hover:bg-rose-50/60 transition-colors duration-200"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">Founder Story</p>
                <span className="medspa-serif text-xl md:text-2xl font-black text-slate-900 group-hover:text-rose-700 transition-colors duration-200">
                  Our Story
                </span>
                {!storyOpen && (
                  <p className="text-sm text-slate-400 font-medium mt-1">
                    Why we built RelayOpsAI — and who it's really for.
                  </p>
                )}
              </div>
              <div className={`flex-shrink-0 ml-6 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${storyOpen ? 'bg-rose-100 border-rose-300 rotate-180' : 'bg-rose-50 border-rose-200 group-hover:bg-rose-100'}`}>
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expandable content */}
            <div
              style={{
                maxHeight: storyOpen ? '1000px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              aria-hidden={!storyOpen ? 'true' : 'false'}
            >
              <div className="px-6 md:px-8 pb-8 border-t border-rose-100/60">
                <div className="space-y-5 text-slate-700 text-base md:text-lg leading-relaxed pt-6">
                  <p>My mom ran a med spa for 15 years. Early mornings, late nights, every ounce of energy poured into her clients. She was exceptional at her craft — her clients knew it, her reviews showed it.</p>
                  <p>But the phone didn't care. It rang at 9 PM when she was home exhausted. It rang during a 90-minute laser session when she couldn't pick up. People found her online at midnight, ready to book — and left when no one answered. She was losing <span className="text-rose-600 font-bold">$15,000+ every month</span> to missed calls and anonymous visitors. Not from lack of effort. Just from being human.</p>
                  <p>I looked at every AI answering service and scheduling tool available. None of them were built for a luxury med spa. Too robotic. Too complex. Too cheap-feeling for the clients she'd spent years earning.</p>
                  <div className="border-l-4 border-rose-400 pl-6 py-2 bg-rose-50/60 rounded-r-xl">
                    <p className="text-slate-900 font-bold text-lg md:text-xl">So we built RelayOpsAI. For her first. Now for every spa owner facing the same problem.</p>
                  </div>
                  <p>Today, 200+ med spas use RelayOpsAI to answer every call, recover every after-hours lead, and book consultations automatically — while their owners stay focused on the clients already in the room.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

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
