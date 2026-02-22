import React from 'react';

const MedSpaFeatures: React.FC = () => {
  const features = [
    {
      letter: 'A',
      title: 'AI Receptionist',
      bullets: [
        'Answers every inbound call — 24 hours a day',
        'Handles FAQs about services, pricing, and availability',
        'Books appointments directly into your calendar',
        'Sounds like a trained front desk staff member',
      ],
      outcome: 'Result: Zero missed calls. Every inquiry handled.',
    },
    {
      letter: 'B',
      title: 'Missed Call Text-Back',
      bullets: [
        'Detects any missed or unanswered call instantly',
        'Sends an automated SMS within seconds',
        'Re-engages the lead before they call a competitor',
        'Captures contact info and booking intent automatically',
      ],
      outcome: 'Result: Missed calls become recoverable leads.',
    },
    {
      letter: 'C',
      title: 'Automated Follow-Up',
      bullets: [
        'Post-consultation nurture sequences',
        'No-show recovery with rebooking prompts',
        'Botox and filler rebooking reminders at the right interval',
        'Runs without any manual input from your team',
      ],
      outcome: 'Result: More return visits. Less chasing.',
    },
    {
      letter: 'D',
      title: 'Lead Reactivation',
      bullets: [
        'Identifies dormant contacts in your CRM or list',
        'Sends personalized outreach to re-engage past inquiries',
        'Converts cold leads into booked consultations',
        'Zero additional ad spend required',
      ],
      outcome: 'Result: Revenue from leads you already paid for.',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-6 md:px-8 bg-pink-100 overflow-hidden">

      {/* Botanical corners */}
      <svg className="absolute -top-4 -left-6 w-52 h-52 md:w-68 md:h-68 text-rose-300/45 leaf-float-b pointer-events-none" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M0 0 C45 25 95 70 135 160 C115 172 95 145 80 115 C52 68 25 28 0 0Z"/>
        <path d="M0 25 C32 48 75 90 105 175 C88 184 72 158 60 130 C38 88 17 52 0 25Z" opacity="0.65"/>
        <path d="M25 0 C55 35 95 82 120 170 C105 178 90 152 78 124 C56 80 38 38 25 0Z" opacity="0.45"/>
      </svg>
      <svg className="absolute -bottom-4 -right-6 w-44 h-44 md:w-60 md:h-60 text-pink-300/45 leaf-float-a pointer-events-none" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M200 200 C175 162 132 115 45 75 C35 92 60 112 90 132 C132 158 172 182 200 200Z"/>
        <path d="M200 175 C170 145 122 100 32 65 C24 82 48 100 78 118 C118 142 160 170 200 175Z" opacity="0.6"/>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto">

        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-3">The Solution</p>
          <h2 className="medspa-serif text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
            How RelayOpsAI{' '}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Fixes It
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 bg-[#fdf8f5] border border-rose-200 hover:border-rose-400 rounded-2xl hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-200/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-rose-300/40">
                  <span className="text-white font-black text-sm">{f.letter}</span>
                </div>
                <h3 className="text-slate-900 font-black text-lg">{f.title}</h3>
              </div>
              <ul className="space-y-2 mb-5">
                {f.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-bold uppercase tracking-wide text-rose-600 border-t border-rose-100 pt-4">
                {f.outcome}
              </p>
            </div>
          ))}
        </div>

        {/* Credibility bar */}
        <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl shadow-md shadow-rose-100/40">
          <p className="text-slate-700 font-semibold text-sm text-center mb-4">
            Built specifically for med spa operators — not generic software repurposed for your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wide">
            {['HIPAA-Compliant', 'No Lock-In Contract', 'Structured Onboarding', 'Dedicated Setup Support', 'Live in Under 5 Minutes'].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MedSpaFeatures;
