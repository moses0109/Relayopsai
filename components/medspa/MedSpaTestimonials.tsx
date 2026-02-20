import React from 'react';

const MedSpaTestimonials: React.FC = () => {
  const testimonials = [
    { quote: "We went from missing 30% of after-hours calls to ZERO. Botox rebooking rate jumped 65% in the first quarter.", location: "Manhattan, NY", metric: "65% ↑ Rebooking" },
    { quote: "The upsell feature alone pays for itself. Clients say yes to add-ons way more when the AI suggests it naturally.", location: "Brooklyn, NY", metric: "$8k+ Monthly Revenue" },
    { quote: "I got my evenings back. No more returning calls at 9pm. The system handles it all while I'm with clients.", location: "Queens, NY", metric: "100% Call Capture" },
    { quote: "Our consultation bookings tripled in the first month. The AI qualifies leads so we only see serious buyers.", location: "Upper East Side, NY", metric: "3x Consultations" },
    { quote: "We captured significant revenue in after-hours bookings the first week. Every late-night inquiry is now confirmed.", location: "SoHo, NY", metric: "$12k Week 1" },
    { quote: "Staff can finally focus on treatments instead of phone tag. The system books, confirms, and upsells automatically.", location: "Tribeca, NY", metric: "80% Upsell Rate" },
  ];

  const display = [...testimonials, ...testimonials];

  return (
    <section className="py-12 md:py-20 bg-[#fdf8f5] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-rose-200/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-200/40 to-transparent blur-3xl pointer-events-none" />
      {/* Drifting botanical accents */}
      <svg className="absolute -top-6 -left-6 w-44 md:w-56 text-rose-200/50 pointer-events-none leaf-float-e" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M200 0 C155 25 105 70 65 160 C85 172 105 145 120 115 C148 68 175 28 200 0Z"/>
        <path d="M200 25 C168 48 125 90 95 175 C112 184 128 158 140 130 C162 88 183 52 200 25Z" opacity="0.6"/>
      </svg>
      <svg className="absolute -bottom-4 -right-4 w-36 md:w-48 text-pink-200/45 pointer-events-none leaf-float-f" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
        <path d="M0 200 C25 162 68 115 155 75 C165 92 140 112 110 132 C68 158 28 182 0 200Z"/>
        <path d="M0 175 C30 145 78 100 168 65 C176 82 152 100 122 118 C82 142 40 170 0 175Z" opacity="0.7"/>
      </svg>

      <div className="text-center mb-12 px-6 relative z-10">
        <h2 className="medspa-serif text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
          <span className="text-slate-900">NYC Med Spas</span><br />
          <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            Already Winning
          </span>
        </h2>
        <p className="text-lg md:text-xl text-slate-600 font-semibold tracking-[-0.01em]">
          Join 100+ med spas capturing $20,000+ monthly with AI
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fdf8f5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fdf8f5] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee pb-4" style={{ gap: '24px', willChange: 'transform' }}>
          {display.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] p-8 bg-white border border-rose-200/60 rounded-3xl shadow-sm hover:shadow-lg hover:shadow-rose-200/40 hover:border-rose-300 transition-shadow duration-300 text-left"
            >
              <div className="inline-flex px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full mb-5 shadow-md shadow-rose-500/20">
                {t.metric}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">"{t.quote}"</p>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-900">Med Spa Owner</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-10 text-center px-6 max-w-3xl mx-auto">
        Results shown are from actual clients. Individual results may vary based on business size, call volume, and implementation.
      </p>
    </section>
  );
};

export default MedSpaTestimonials;
