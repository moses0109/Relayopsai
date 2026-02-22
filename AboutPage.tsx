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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/[0.07] border border-cyan-500/20 mb-6">
            <span className="text-cyan-400 text-sm">⚡</span>
            <span className="text-sm font-semibold text-cyan-300">AI Operations Platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="text-white">Your Business.</span><br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Running on AI.
            </span><br />
            <span className="text-white">Around the Clock.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            RelayOpsAI is an AI operations platform that handles your calls, captures your leads, books your appointments, and follows up with customers — automatically, 24/7, without adding headcount.
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-10 md:py-14 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-cyan-400 text-xs font-black uppercase tracking-widest mb-10">What RelayOpsAI Does</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: '📞',
                title: 'Answers Every Call — Even at 2 AM',
                body: "Your AI receptionist picks up before the second ring, handles FAQs, qualifies leads, and books appointments. It sounds like your best employee and never calls in sick.",
              },
              {
                icon: '📅',
                title: 'Books Appointments Automatically',
                body: "Connected directly to your calendar. Clients book, reschedule, and confirm — without you touching anything. Every slot filled, zero back-and-forth.",
              },
              {
                icon: '💬',
                title: 'Follows Up So You Don\'t Have To',
                body: "Automated SMS and call follow-ups go out within minutes of a missed call or inquiry. No lead slips through. No manual chasing required.",
              },
              {
                icon: '👻',
                title: 'Recovers Anonymous Website Traffic',
                body: "97% of website visitors leave without contacting you. Our system identifies them and triggers personalized outreach within 30 seconds — turning browsers into booked clients.",
              },
            ].map((item, i) => (
              <div key={i} className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-black text-base mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="py-10 md:py-14 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-white/[0.04] to-cyan-500/[0.03] border border-white/[0.07] p-8 md:p-12">
            <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">Why businesses use RelayOpsAI</p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mb-8 text-white">
              You Didn't Start Your Business<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">To Manage Phones and Follow-Ups.</span>
            </h2>
            <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                Every hour your team spends answering repeat questions, chasing leads, or manually booking appointments is an hour not spent delivering your actual service. That's not just inefficient — it's <span className="text-white font-semibold">expensive.</span>
              </p>
              <p>
                The average service business misses <span className="text-cyan-400 font-bold">30–40% of inbound calls</span> during busy periods and after hours. Each one is a potential client who dialed the next business on Google.
              </p>
              <p className="text-white font-semibold text-lg md:text-xl border-l-4 border-cyan-500 pl-6 py-2">
                RelayOpsAI closes that gap — giving you enterprise-grade AI operations at a fraction of the cost of hiring.
              </p>
              <p>
                Our clients recapture an average of <span className="text-white font-bold">$15,000–$27,000 per month</span> in revenue that was already slipping through the cracks. They save 20+ hours a week in admin time. And they do it without adding a single employee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ── */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">Who we work with</p>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-4">
            If Your Business Answers Phones<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">and Books Appointments, We Can Help.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            We work with service businesses across every industry. If you're losing revenue to missed calls, slow follow-up, or anonymous website traffic — the fix is the same regardless of what you sell.
          </p>
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

      {/* ── HOW IT'S DIFFERENT ── */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-cyan-400 text-xs font-black uppercase tracking-widest mb-10">Why RelayOpsAI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '🚀',
                title: 'Live in 5 minutes.',
                body: 'No IT team. No months-long onboarding. You give us your business info, we configure your AI, you go live. That\'s it.',
              },
              {
                icon: '🧠',
                title: 'Sounds like a human.',
                body: 'Not a robotic phone tree. Your AI knows your services, your tone, your FAQs — and holds a real conversation with your customers.',
              },
              {
                icon: '📊',
                title: 'ROI you can measure.',
                body: 'See every call handled, every lead captured, every booking made. Your dashboard shows exactly how much revenue your AI is recovering.',
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

      {/* ── CTA ── */}
      <section className="py-14 md:py-20 px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Ready to Put Your Business<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">on AI Autopilot?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Book a free 30-minute call. We'll show you exactly what AI can do for your specific business — and what it costs you not to have it.
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
