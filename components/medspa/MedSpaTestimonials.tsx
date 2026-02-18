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
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&q=80"
    },
    {
      quote: "The upsell feature alone pays for itself. Clients say yes to add-ons way more when the AI suggests it naturally.",
      location: "Brooklyn, NY",
      metric: "$8k+ Monthly Revenue",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop&q=80"
    },
    {
      quote: "I got my evenings back. No more returning calls at 9pm. The system handles it all while I'm with clients.",
      location: "Queens, NY",
      metric: "100% Call Capture",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=200&h=200&fit=crop&q=80"
    },
    {
      quote: "Our consultation bookings tripled in the first month. The AI qualifies leads so we only see serious buyers.",
      location: "Upper East Side, NY",
      metric: "3x Consultations",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&h=200&fit=crop&q=80"
    },
    {
      quote: "We captured significant revenue in after-hours bookings the first week. Every late-night inquiry is now a confirmed appointment.",
      location: "SoHo, NY",
      metric: "$12k Week 1",
      image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=200&h=200&fit=crop&q=80"
    },
    {
      quote: "Staff can finally focus on treatments instead of phone tag. The system books, confirms, and even suggests upsells effectively.",
      location: "Tribeca, NY",
      metric: "80% Upsell Rate",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&h=200&fit=crop&q=80"
    },
  ];

  return (
    <section className="py-24 px-6 md:px-8 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-rose-100/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-tight mb-6">
          <span className="text-slate-900 drop-shadow-sm">NYC Med Spas</span><br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Already Winning
          </span>
        </h2>

        <p className="text-lg md:text-xl text-slate-600 mb-20 font-semibold tracking-[-0.01em]">
          Join 100+ med spas capturing $20,000+ monthly with AI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="diagonal-fly-in group relative rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/60 hover:border-slate-300/80 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-2 text-left" style={{ animationDelay: `${i * 0.15}s` }}>
              {/* Quote */}
              <p className="text-sm text-slate-700 leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              {/* Author - Anonymous with NYC Building Photo */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.location} Building`}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200/60 shadow-md flex-shrink-0 group-hover:scale-110 group-hover:ring-rose-300/60 transition-all duration-300"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">Med Spa Owner</p>
                  <p className="text-xs text-slate-600">{testimonial.location}</p>
                </div>
              </div>

              {/* Metric Badge */}
              <div className="inline-flex px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg shadow-rose-500/30 group-hover:shadow-xl group-hover:shadow-rose-500/40 transition-all duration-300">
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

      {/* Diagonal flying animation */}
      <style>{`
        @keyframes diagonalFlyIn {
          0% {
            opacity: 0;
            transform: translate(-80px, 80px) rotate(-5deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
          }
        }
        .diagonal-fly-in {
          opacity: 0;
          animation: diagonalFlyIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default MedSpaTestimonials;
