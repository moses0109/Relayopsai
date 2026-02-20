
import React from 'react';

/* ------------------------------------------------------------------ */
/*  INTEGRATIONS ECOSYSTEM                                              */
/*  Shows 2-way sync compatibility with industry-standard tools         */
/* ------------------------------------------------------------------ */

const integrations = [
  { name: 'Salesforce',    category: 'CRM',        icon: 'M11.3 2.8c1.4-.7 3-.5 4.2.4l.4.3c1-.5 2.2-.6 3.3-.1 1.7.8 2.6 2.7 2.2 4.5l-.1.3c1.3 1 2 2.7 1.6 4.3-.4 1.6-1.7 2.8-3.3 3l-.4.1c-.5 1.2-1.7 2.1-3 2.2-1 .1-2-.2-2.8-.8l-.3-.2c-1 .5-2.2.6-3.3.2-1.7-.7-2.7-2.5-2.3-4.3l.1-.4C6.2 11.3 5.5 9.7 5.8 8c.3-1.6 1.6-2.8 3.2-3.1l.4-.1c.5-1.1 1.4-1.9 2.6-2.1l-.7.1z' },
  { name: 'HubSpot',      category: 'CRM',        icon: 'M17.5 8.5V5.2c.8-.4 1.3-1.2 1.3-2.1C18.8 1.9 17.8 1 16.7 1c-1.2 0-2.2.9-2.2 2.1 0 .9.5 1.7 1.3 2.1v3.3c-1 .3-1.9.8-2.6 1.5L7.4 5.8c.1-.3.1-.5.1-.8C7.5 3.9 6.6 3 5.5 3S3.5 3.9 3.5 5s.9 2 2 2c.4 0 .8-.1 1.1-.3l5.7 4.1c-.5.8-.8 1.8-.8 2.8 0 1.1.3 2 .9 2.9l-1.8 1.8c-.3-.1-.5-.1-.8-.1-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.3 0-.5-.1-.8l1.8-1.8c.9.6 1.9.9 3 .9 3 0 5.4-2.4 5.4-5.4 0-2.7-2-5-4.6-5.3z' },
  { name: 'ServiceTitan',  category: 'Field Service', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z' },
  { name: 'Google Calendar', category: 'Scheduling', icon: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z' },
  { name: 'Clio',          category: 'Legal CRM',   icon: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7H9v-2h6v2zm0 4H9v-2h6v2z' },
  { name: 'Zapier',        category: '5,000+ Apps', icon: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.83 3.41L12 10.96 5.17 7.59 12 4.18zM4 16.54V8.98l7 3.5v7.55l-7-3.49zm9 3.5v-7.55l7-3.5v7.56l-7 3.49z' },
  { name: 'Housecall Pro', category: 'Field Service', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { name: 'Zoho CRM',     category: 'CRM',        icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
];

const Integrations: React.FC = () => {
  return (
    <section className="py-8 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 fade-in-up">
            Plugs Into Your <span className="gradient-relay">Stack.</span>
          </h2>
          <p className="text-slate-500 uppercase font-bold text-xs tracking-wide max-w-lg mx-auto leading-relaxed fade-in-up break-words px-4">
            Two-way sync with the tools you already use. No rip-and-replace — RelayOpsAI fits right in.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {integrations.map((int, i) => (
            <div
              key={i}
              className="stagger-item group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/30 hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-600/5 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] transition-all duration-300 text-center backdrop-blur-sm"
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-white/[0.04] rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d={int.icon} />
                </svg>
              </div>
              <p className="text-xs font-black uppercase tracking-wide text-white mb-1 break-words">{int.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-600 group-hover:text-cyan-400/60 transition-colors duration-300 break-words">{int.category}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-slate-600 text-xs font-bold uppercase tracking-wide fade-in-up break-words px-4">
          Custom integrations available on Growth and Elite plans
        </p>
      </div>
    </section>
  );
};

export default Integrations;
