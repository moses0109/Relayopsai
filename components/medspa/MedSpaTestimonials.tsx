import React from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA TESTIMONIALS — NYC spa owners                            */
/* ------------------------------------------------------------------ */

const MedSpaTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "We went from missing 30% of after-hours calls to ZERO. Our Botox rebooking rate jumped 65% in 90 days.",
      name: "Dr. Sarah Chen",
      title: "Glow Med Spa, Manhattan",
      metric: "65% ↑ Rebooking"
    },
    {
      quote: "The upsell feature alone pays for itself. Clients say yes to add-ons way more when the AI suggests it naturally.",
      name: "Jessica Martinez",
      title: "Radiance Aesthetics, Brooklyn",
      metric: "$8k+ Monthly Revenue"
    },
    {
      quote: "I got my evenings back. No more returning calls at 9pm. RelayOpsAI handles it all while I'm with clients.",
      name: "Nina Patel",
      title: "Pure Skin Studio, Queens",
      metric: "100% Call Capture"
    },
    {
      quote: "Our consultation bookings tripled in the first month. The AI qualifies leads so we only see serious buyers.",
      name: "Marcus Johnson",
      title: "Luxe Aesthetics, Upper East Side",
      metric: "3x Consultations"
    },
    {
      quote: "We captured $12k in after-hours bookings in week one. Every midnight Botox inquiry is now a confirmed appointment.",
      name: "Dr. Amira Patel",
      title: "Revival Med Spa, SoHo",
      metric: "$12k Week 1"
    },
    {
      quote: "Staff can finally focus on treatments instead of phone tag. AI books, confirms, and even upsells better than humans.",
      name: "Lisa Wong",
      title: "Radiant Skin Clinic, Tribeca",
      metric: "80% Upsell Rate"
    },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-rose-400 text-xs font-black uppercase tracking-widest mb-4 fade-in-up">Real Results</p>
        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 fade-in-up leading-tight">
          NYC Med Spas Already Capturing <br />
          <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent break-words">
            $20,000+ Per Month
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => {
            const gradients = [
              'from-rose-400 to-pink-500',
              'from-purple-400 to-pink-500',
              'from-pink-400 to-rose-500',
              'from-rose-400 to-purple-500',
              'from-fuchsia-400 to-pink-500',
              'from-pink-400 to-purple-500',
            ];
            return (
              <div key={i} className="diagonal-fly-in group p-6 rounded-2xl bg-white/60 border border-rose-400/30 hover:border-rose-400/50 hover:bg-white/80 hover:shadow-xl transition-all duration-500 backdrop-blur-xl text-left" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Profile Image */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[i]} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-black text-lg">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-900 font-black text-sm break-words">{testimonial.name}</p>
                    <p className="text-slate-600 text-xs font-semibold break-words">{testimonial.title}</p>
                  </div>
                </div>

                <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-6 break-words">
                  "{testimonial.quote}"
                </p>

                <div className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full">
                  <p className="text-rose-400 font-black text-xs whitespace-nowrap">{testimonial.metric}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MedSpaTestimonials;
