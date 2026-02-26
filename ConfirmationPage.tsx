import React from 'react';
import { useNavigate } from 'react-router-dom';

const CREAM = '#fdf8f5';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      title: 'Revenue Leak Audit',
      time: 'Minutes 0–10',
      body: 'We look at your call volume, after-hours traffic, and average consult value. You will see — in dollars — exactly how much revenue is leaving your practice every month.',
    },
    {
      number: '02',
      title: 'Live System Demo',
      time: 'Minutes 10–20',
      body: 'We walk through how RelayOpsAI answers inbound calls, follows up with every caller, and books appointments - all running in the background while your team stays focused on clients.',
    },
    {
      number: '03',
      title: 'Your Implementation Plan',
      time: 'Minutes 20–30',
      body: 'If it is a fit, you leave with a custom setup plan: which features apply to your practice, what goes live first, and what your expected return looks like in month one.',
    },
  ];

  const prepItems = [
    { label: 'Missed calls per week', detail: 'Rough estimate is fine — check your voicemail count if unsure.' },
    { label: 'Average consult or service value', detail: 'Botox, filler, laser — whatever your most common booking is.' },
    { label: 'CRM or booking software', detail: 'Vagaro, Mindbody, Jane App, or custom — just know what you use.' },
    { label: 'After-hours coverage today', detail: 'Do you have anyone answering calls after 6 PM? On weekends?' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: CREAM }}>

      {/* Botanical bg accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-8 -right-8 w-80 h-80 text-rose-200/40 leaf-float-a" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
          <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.65"/>
          <path d="M175 0 C145 35 105 82 80 170 C95 178 110 152 122 124 C144 80 162 38 175 0Z" opacity="0.4"/>
        </svg>
        <svg className="absolute -bottom-8 -left-8 w-64 h-64 text-pink-200/40 leaf-float-b" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
          <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.6"/>
        </svg>
      </div>

      <main className="relative z-10 flex-1 py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            {/* Checkmark */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-xl shadow-rose-400/30 mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-3">You're Confirmed</p>
            <h1 className="medspa-serif text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-4">
              Your Demo Is Booked.<br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Here's What Happens Next.
              </span>
            </h1>
            <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
              30 minutes. No pitch deck. No pressure. Just a clear picture of what your practice is currently leaving on the table — and whether we can fix it.
            </p>
          </div>

          {/* What happens on the call */}
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-6">On The Call</p>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.number} className="flex gap-5 p-6 md:p-7 rounded-2xl bg-white border border-rose-100 shadow-md shadow-rose-100/30 hover:shadow-lg hover:shadow-rose-200/30 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md shadow-rose-300/40">
                    <span className="text-white font-black text-xs">{s.number}</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="medspa-serif font-black text-slate-900 text-base md:text-lg">{s.title}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">{s.time}</span>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to prepare */}
          <div className="mb-10 p-7 md:p-9 rounded-3xl bg-white border border-rose-100 shadow-lg shadow-rose-100/30">
            <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2">Before The Call</p>
            <h2 className="medspa-serif text-xl md:text-2xl font-black text-slate-900 mb-6">
              Have These Four Things Ready
            </h2>
            <div className="space-y-4">
              {prepItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What you'll leave with */}
          <div className="mb-10 p-7 md:p-9 rounded-3xl bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-2xl shadow-rose-600/30">
            <p className="text-xs font-black uppercase tracking-widest text-rose-200 mb-2">What You Leave With</p>
            <h2 className="medspa-serif text-xl md:text-2xl font-black mb-5">
              A Specific Revenue Number. Not a Guess.
            </h2>
            <div className="space-y-3">
              {[
                'Exact monthly revenue leak estimate based on your actual call data',
                'A breakdown of which missed calls are recoverable — and which are not',
                'A custom implementation plan if RelayOpsAI is the right fit for your practice',
                'A clear answer: worth pursuing, or not — either way, you will know',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-rose-200 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-rose-50 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reassurance + authority */}
          <div className="mb-10 p-7 md:p-9 rounded-3xl bg-white border border-rose-100 shadow-md shadow-rose-100/30">
            <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2">One Thing To Know</p>
            <h2 className="medspa-serif text-xl md:text-2xl font-black text-slate-900 mb-3">
              This Is Not a Sales Call.
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              We work with a limited number of med spas. If your practice is not a strong fit — wrong volume, wrong market, wrong timing — we will tell you directly. No one benefits from a forced match.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              What we will do is show you exactly what you are currently losing, and whether our system can recover it. The numbers either work or they do not.
            </p>
            <div className="flex flex-wrap gap-3 pt-4 border-t border-rose-100">
              {['200+ Med Spas Nationwide', '4.9/5 Average Rating', 'HIPAA-Compliant', 'No Contract Required'].map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200">
                  <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold text-slate-700">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email sequences — copy reference */}
          <div className="mb-10 space-y-6">
            <p className="text-xs font-black uppercase tracking-widest text-rose-500">Reminder Sequences</p>

            {/* Confirmation email */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-rose-100 shadow-md shadow-rose-100/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Confirmation Email — Sends Immediately</p>
              <p className="font-bold text-slate-800 text-sm mb-1">Subject: Your RevAudit Is Confirmed — Here's What to Prepare</p>
              <div className="border-t border-rose-100/60 mt-4 pt-4 space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>Hi [First Name],</p>
                <p>Your 30-minute Revenue Audit with RelayOpsAI is confirmed.</p>
                <p><strong className="text-slate-800">[Date] at [Time] — [Zoom/Calendar Link]</strong></p>
                <p>Before we talk, pull these four numbers:</p>
                <ul className="list-none space-y-1 pl-0">
                  {['Missed calls per week (voicemail count is fine)', 'Average consult or service value', 'Booking software you use (Vagaro, Mindbody, etc.)', 'Whether you have after-hours coverage today'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>On the call, we will calculate your exact revenue leak live, show you how the system works, and — if it fits — give you a custom implementation plan.</p>
                <p>No pitch deck. No pressure. Just numbers.</p>
                <p className="text-slate-700 font-semibold">— The RelayOpsAI Team</p>
              </div>
            </div>

            {/* 24h reminder */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-rose-100 shadow-md shadow-rose-100/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Reminder Email — 24 Hours Before</p>
              <p className="font-bold text-slate-800 text-sm mb-1">Subject: Tomorrow's Call — One Quick Thing to Pull</p>
              <div className="border-t border-rose-100/60 mt-4 pt-4 space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>Hi [First Name],</p>
                <p>Quick reminder: your Revenue Audit is tomorrow at [Time].</p>
                <p>[Calendar Link]</p>
                <p>One thing that makes the call much more useful: your average job or consult value. Even a rough number — "$400 for a Botox session," "$1,200 for a laser package" — lets us calculate your monthly leak accurately instead of using an industry estimate.</p>
                <p>That number is the difference between a generic audit and one that's specific to your practice.</p>
                <p>See you tomorrow.</p>
                <p className="text-slate-700 font-semibold">— RelayOpsAI</p>
              </div>
            </div>

            {/* 2h SMS */}
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-rose-100 shadow-md shadow-rose-100/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">SMS — 2 Hours Before</p>
              <div className="border-t border-rose-100/60 mt-4 pt-4">
                <div className="inline-block max-w-xs bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-800 leading-relaxed">
                  RelayOpsAI: Your Revenue Audit is in 2 hours. Join here: [Link] — takes 30 min, leaves you with a specific number on what you're losing monthly. Reply STOP to opt out.
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/medspa')}
              className="text-sm font-semibold text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline transition-colors"
            >
              ← Back to RelayOpsAI for Med Spas
            </button>
          </div>

        </div>
      </main>

    </div>
  );
};

export default ConfirmationPage;
