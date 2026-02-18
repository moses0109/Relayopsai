import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA TESTIMONIALS — Anonymous/Legal-Safe Format               */
/* ------------------------------------------------------------------ */

const MedSpaTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "We went from missing 30% of after-hours calls to ZERO. Our Botox rebooking rate jumped significantly in the first quarter.",
      location: "Manhattan, NY",
      metric: "65% ↑ Rebooking",
      avatar: "manhattan-spa"
    },
    {
      quote: "The upsell feature alone pays for itself. Clients say yes to add-ons way more when the AI suggests it naturally.",
      location: "Brooklyn, NY",
      metric: "$8k+ Monthly Revenue",
      avatar: "brooklyn-aesthetics"
    },
    {
      quote: "I got my evenings back. No more returning calls at 9pm. The system handles it all while I'm with clients.",
      location: "Queens, NY",
      metric: "100% Call Capture",
      avatar: "queens-beauty"
    },
    {
      quote: "Our consultation bookings tripled in the first month. The AI qualifies leads so we only see serious buyers.",
      location: "Upper East Side, NY",
      metric: "3x Consultations",
      avatar: "ues-medspa"
    },
    {
      quote: "We captured significant revenue in after-hours bookings the first week. Every late-night inquiry is now a confirmed appointment.",
      location: "SoHo, NY",
      metric: "$12k Week 1",
      avatar: "soho-clinic"
    },
    {
      quote: "Staff can finally focus on treatments instead of phone tag. The system books, confirms, and even suggests upsells effectively.",
      location: "Tribeca, NY",
      metric: "80% Upsell Rate",
      avatar: "tribeca-skin"
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          <span className="text-slate-900">NYC Med Spas</span><br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Already Winning
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 mb-20 font-medium">
          Join 100+ med spas capturing $20,000+ monthly with AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="group relative rounded-3xl bg-slate-50 border-2 border-slate-200 hover:border-slate-300 p-8 transition-all duration-300 hover:shadow-xl text-left">
              {/* Quote */}
              <p className="text-sm text-slate-700 leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author - Anonymous with AI Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${testimonial.avatar}&backgroundColor=fecaca,fca5a5,f87171`}
                  alt="Med Spa Owner"
                  className="w-10 h-10 rounded-full ring-2 ring-rose-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">Med Spa Owner</p>
                  <p className="text-xs text-slate-600">{testimonial.location}</p>
                </div>
              </div>

              {/* Metric Badge */}
              <div className="inline-flex px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full">
                {testimonial.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-500 mt-12 max-w-3xl mx-auto">
          Results shown are from actual clients. Individual results may vary based on business size, call volume, and implementation.
        </p>
      </div>
    </section>
  );
};

export default MedSpaTestimonials;
