
import React from 'react';

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Marcus Thorne", company: "Thorne Estates", content: "Transformed our lead intake. 40% increase in viewings." },
    { name: "Sarah Jenkings", company: "SolarFlux Inc", content: "Indistinguishable from our staff. Customers love it." },
    { name: "Dr. Elena Rossi", company: "Rossi Wellness", content: "Intake calls are automated now. Efficiency has tripled." },
    { name: "James Wilson", company: "Metro Auto", content: "Our after-hours booking is now 100% automated." },
    { name: "Lila Chen", company: "Chen Legal", content: "Professional tone that matches our firm perfectly." },
    { name: "Danial K.", company: "K-Fitness", content: "Best investment for our lead generation this year." }
  ];

  // Double the reviews for seamless loop
  const displayReviews = [...reviews, ...reviews];

  return (
    <div className="relative flex overflow-hidden">
      <div className="flex animate-marquee gap-6">
        {displayReviews.map((rev, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] p-8 bg-white/[0.03] border border-white/5 rounded-[2rem]">
            <p className="text-slate-400 text-xs font-medium italic mb-6 leading-relaxed uppercase tracking-tight">
              "{rev.content}"
            </p>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-white">{rev.name}</h4>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">{rev.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
