import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col pt-16 md:pt-24 overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-28 px-6 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[130px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/[0.07] border border-cyan-500/20 mb-6">
            <span className="text-cyan-400 text-sm">💛</span>
            <span className="text-sm font-semibold text-cyan-300">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="text-white">We Built This For</span><br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Our Family.
            </span><br />
            <span className="text-white">Now We Build It For Yours.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            RelayOpsAI started with one problem: a small business owner who worked too hard to lose revenue to a ringing phone no one answered.
          </p>
        </div>
      </section>

      {/* ── FOUNDER STORY ── */}
      <section className="py-12 md:py-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white/[0.04] to-cyan-500/[0.03] border border-white/[0.07] p-8 md:p-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl flex-shrink-0">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <p className="font-black text-white text-base">Founder, RelayOpsAI</p>
                <p className="text-sm text-slate-500">Son of a med spa owner</p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                My mom ran a med spa for 15 years. She woke up early, stayed late, and poured everything into her clients. She was <span className="text-white font-semibold">exceptional</span> at her craft.
              </p>
              <p>
                But every evening when she left, the phone kept ringing. Clients calling at 9 PM to book Botox. People browsing her website at midnight, ready to schedule — and leaving because there was no one to answer. She was losing <span className="text-cyan-400 font-bold">$15,000+ every month</span> to voicemail. Not because of anything she did wrong. Just because she was human.
              </p>
              <p>
                I tried to find a solution for her. I looked at every AI tool, every answering service, every scheduling software out there. None of them were built for a real small business owner. They were too complex, too expensive, or so robotic that they would have embarrassed her in front of the luxury clients she'd spent years earning.
              </p>
              <p className="text-white font-semibold text-xl md:text-2xl border-l-4 border-cyan-500 pl-6 py-2">
                So we built RelayOpsAI. For her. And for every business owner working too hard to lose revenue to a missed call.
              </p>
              <p>
                Today, 200+ businesses use RelayOpsAI to answer every call, capture every lead, and grow revenue on autopilot — while they focus on the work that actually matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-10 md:py-14 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">Our Mission</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            No Small Business Should Lose Revenue<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Because They're Too Busy Doing the Work.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We exist to give independent business owners the same competitive edge as enterprise companies — without the enterprise price tag or complexity.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-cyan-400 text-xs font-black uppercase tracking-widest mb-10">What We Believe</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '📞',
                title: 'Speed wins.',
                body: 'The first business to respond gets the booking. We respond in under one second — every time, day or night.',
              },
              {
                icon: '🤝',
                title: 'AI should feel human.',
                body: 'Technology that sounds robotic drives customers away. Ours sounds like your best employee — warm, knowledgeable, professional.',
              },
              {
                icon: '📈',
                title: 'ROI or nothing.',
                body: "If we're not making you more money than we cost, we're not doing our job. That's why we back everything with a 14-day guarantee.",
              },
              {
                icon: '🔒',
                title: 'Trust is earned.',
                body: 'HIPAA compliance, transparent pricing, no lock-in contracts. We earn your business every month — or you leave.',
              },
              {
                icon: '⚡',
                title: 'Simple scales.',
                body: "Five-minute setup. No IT team required. We handle the complexity so you can focus on what you're great at.",
              },
              {
                icon: '🌱',
                title: 'We grow when you grow.',
                body: 'Our success is measured by your revenue recovery — not seats sold or contracts signed. We win together.',
              },
            ].map((v, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] transition-all duration-300">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-white font-black text-base mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: '200+', label: 'Businesses Live' },
              { val: '$27k', label: 'Avg Monthly Lift' },
              { val: '98%', label: 'Call Capture Rate' },
              { val: '< 1s', label: 'Response Time' },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">{s.val}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 md:py-20 px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Ready to Stop Leaving<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Revenue on the Table?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Book a free 30-minute call and we'll show you exactly how much you're losing — and how to get it back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:scale-[1.03] active:scale-[0.98] overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <span className="relative z-10">Get My Free Revenue Audit →</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/medspa')}
              className="px-8 py-4 rounded-full font-bold text-base text-slate-400 border border-white/[0.1] hover:border-rose-400/40 hover:text-rose-300 bg-white/[0.02] transition-all duration-300 w-full sm:w-auto"
            >
              Med Spa Edition →
            </button>
          </div>
        </div>
      </section>

      <Analytics />
    </div>
  );
};

export default AboutPage;
