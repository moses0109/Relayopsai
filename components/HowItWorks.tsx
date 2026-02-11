
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Neural Discovery", desc: "We map your current call logic, FAQ, and calendar systems into our neural engine." },
    { title: "Agent Deployment", desc: "Our team launches your studio-grade AI agent in 48-72 hours with full CRM sync." },
    { title: "Scale Phase", desc: "Your agent handles unlimited concurrent calls, ensuring no lead is ever left hanging." }
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase mb-8 md:mb-10 leading-[0.9]">
              Built for <br /><span className="gradient-relay">Velocity.</span>
            </h2>
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-8 md:gap-12 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-white text-black rounded-2xl md:rounded-[1.5rem] flex items-center justify-center font-black italic text-xl md:text-2xl group-hover:bg-cyan-400 transition-all shadow-2xl">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-wide mb-3 md:mb-4 break-words">{step.title}</h4>
                    <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed uppercase tracking-tight max-w-md break-words">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[180px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="relative bg-white/[0.03] border border-white/10 p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] backdrop-blur-3xl shadow-2xl">
              <div className="space-y-8 md:space-y-12">
                <div className="flex items-center gap-6">
                   <div className="w-2 h-10 bg-cyan-500 rounded-full"></div>
                   <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter">The Logic.</h3>
                </div>
                <p className="text-slate-300 text-lg md:text-2xl font-medium leading-relaxed italic">
                  "Most businesses lose 30% of their revenue because they can't answer the phone at 8 PM. We solve that by deploying agents that never sleep, never sound robotic, and never miss a booking."
                </p>
                <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                   <div className="relative w-14 h-14 group/logo">
                      <div className="absolute inset-[-4px] bg-gradient-to-tr from-cyan-500/40 to-blue-600/40 rounded-2xl blur-lg opacity-60 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src="/logo.png"
                        alt="RelayOpsAI"
                        className="relative w-full h-full object-cover rounded-2xl border-2 border-cyan-400/30 shadow-xl group-hover/logo:border-cyan-400/60 group-hover/logo:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
                      />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-wide text-white break-words">RelayOpsAI</span>
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500 break-words">Elite Voice Systems</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
