import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const CREAM = '#fdf8f5';

const MedSpaAboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-slate-900 flex flex-col pt-16 md:pt-24 overflow-x-hidden" style={{ background: CREAM }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 md:py-28 px-6 md:px-8 text-center overflow-hidden" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)' }} />
        </div>

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200/70 shadow-md shadow-rose-200/40 mb-6">
            <span className="text-rose-500 text-sm">💛</span>
            <span className="text-sm font-semibold text-slate-700">Built With Heart</span>
          </div>
          <h1 className="medspa-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            <span className="text-slate-900">We Built This Because</span><br />
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Someone We Love Needed It.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            RelayOpsAI was born from watching a med spa owner we love lose thousands every month to missed calls — not from lack of effort, just from being human.
          </p>
        </div>
      </section>

      {/* Profile Card */}
      <section className="px-6 md:px-8 pb-12" style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-7 md:p-10 rounded-3xl bg-gradient-to-br from-[#fdf8f5] via-rose-50/80 to-pink-100/60 border border-rose-200/60 shadow-xl shadow-rose-100/40">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

              {/* Avatar — clean founder icon */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-rose-300/30 via-pink-200/20 to-purple-200/10 blur-lg pointer-events-none" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 shadow-2xl shadow-rose-400/35 ring-2 ring-rose-100 flex items-center justify-center">
                  {/* Person silhouette icon */}
                  <svg className="w-12 h-12 md:w-14 md:h-14 text-white/90" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white shadow-md shadow-emerald-400/60" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                <h3 className="text-sm font-bold text-slate-500 mb-3 mt-1">
                  Founder, RelayOpsAI · Son of a med spa owner
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                  Built after watching my mom lose $180K/year to missed calls. RelayOpsAI is what I wish existed for her — and now it does, for med spa owners across the country.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
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
                    <span className="text-xs font-bold text-slate-600">HIPAA-Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-6 text-center">Our Story</p>
          <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed">
            <p>My mom ran a med spa for 15 years. Early mornings, late nights, every ounce of energy poured into her clients. She was exceptional at her craft — her clients knew it, her reviews showed it.</p>
            <p>But the phone didn't care. It rang at 9 PM when she was home exhausted. It rang during a 90-minute laser session when she couldn't pick up. People called at midnight, ready to book — and left when no one answered. She was losing <span className="text-rose-600 font-bold">$15,000+ every month</span> to missed calls. Not from lack of effort. Just from being human.</p>
            <p>I looked at every AI answering service and scheduling tool available. None of them were built for a luxury med spa. Too robotic. Too complex. Too cheap-feeling for the clients she'd spent years earning.</p>
            <div className="border-l-4 border-rose-400 pl-6 py-4 bg-rose-50/60 rounded-r-xl">
              <p className="text-slate-900 font-bold text-lg md:text-xl">So we built RelayOpsAI. For her first. Now for every spa owner facing the same problem.</p>
            </div>
            <p>Today, med spas use RelayOpsAI to answer every call, text back every missed caller, and book consultations automatically — while their owners stay focused on the clients already in the room.</p>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-pink-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-rose-600 text-xs font-black uppercase tracking-widest mb-10">What RelayOpsAI Does for Med Spas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: '📞',
                title: 'AI Voice Receptionist',
                body: 'Answers every inbound call 24/7 with a natural, professional voice. Handles FAQs, books appointments into your Google Calendar, and captures caller info — all without staff.',
              },
              {
                icon: '💬',
                title: 'Missed Call SMS Text-Back',
                body: 'Detects missed calls within seconds and sends a personalized text message. Continues the conversation via SMS so you never lose a lead to voicemail.',
              },
              {
                icon: '🔔',
                title: 'Automated Follow-Up',
                body: 'Sends booking confirmations, 24-hour and 2-hour reminders, no-show recovery messages, and rebooking nudges for recurring treatments like Botox and fillers.',
              },
              {
                icon: '📊',
                title: 'Call Intelligence',
                body: 'Every call scored (hot, warm, cold, spam), fully transcribed, and summarized. Real-time dashboard shows exactly what your AI is handling and what revenue it\'s recovering.',
              },
            ].map((item, i) => (
              <div key={i} className="p-7 rounded-2xl bg-[#fdf8f5] border border-rose-200 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-200/60 hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-slate-900 font-black text-base mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 px-6 md:px-8" style={{ background: CREAM }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: '24/7', label: 'Always Available' },
              { val: '50+', label: 'Premium AI Voices' },
              { val: '30+', label: 'Languages Supported' },
              { val: '< 1s', label: 'SMS Response Time' },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/80 border border-rose-200/60 shadow-sm">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-rose-500 to-pink-600 bg-clip-text text-transparent mb-1">{s.val}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 px-6 md:px-8 text-center bg-pink-100">
        <div className="max-w-2xl mx-auto">

          <svg className="absolute -top-4 -right-6 w-56 text-rose-200/40 pointer-events-none leaf-float-a" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
            <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          </svg>

          <h2 className="medspa-serif text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-slate-900">
            Ready to Stop Losing<br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Bookings to Missed Calls?</span>
          </h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Book a free 30-minute demo. We'll show you exactly how RelayOpsAI works for your med spa — no pressure, no pitch decks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/medspa')}
              className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-full font-bold text-lg hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 transition-all duration-300 shadow-2xl shadow-rose-500/30 hover:scale-[1.03] active:scale-[0.98] overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative z-10">Book Your Demo</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="px-8 py-4 rounded-full font-bold text-base text-slate-500 border border-rose-200 hover:border-rose-400 hover:text-rose-600 bg-white/60 transition-all duration-300 w-full sm:w-auto"
            >
              Main Agency About →
            </button>
          </div>
        </div>
      </section>

      <Analytics />
    </div>
  );
};

export default MedSpaAboutPage;
