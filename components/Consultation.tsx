
import React, { useState } from 'react';

interface ConsultationProps {
  leadSource?: string;
}

const Consultation: React.FC<ConsultationProps> = ({ leadSource = 'general' }) => {
  const [step, setStep] = useState(1);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    businessType: '', volume: '', message: '',
  });

  const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

  const isMedSpa = leadSource.startsWith('medspa');

  const industries = isMedSpa
    ? ["Botox & Fillers", "HydraFacial & Peels", "Laser Treatments", "Body Contouring", "Skin Tightening", "Full Med Spa Menu"]
    : ["HVAC", "Real Estate", "Med Spa", "Plumbing", "Auto Repair", "Home Services", "Legal", "Salon", "Restaurant", "Fitness", "Insurance", "Other"];

  const volumes = isMedSpa
    ? ["Under 30 calls/week", "30-60 calls/week", "60-100 calls/week", "100+ calls/week"]
    : ["Under 20", "20–50", "50–100", "100+"];

  const businessLabel = isMedSpa ? "Primary Services You Offer" : "Business Type";
  const volumeLabel = isMedSpa ? "Weekly Call Volume (Including After-Hours)" : "Weekly Call Volume";

  const getLeadLabel = () => {
    if (leadSource.startsWith('pricing-')) {
      const plan = leadSource.replace('pricing-', '');
      return `Warm Lead (from ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan)`;
    }
    if (leadSource === 'calculator') return 'Exploring Lead (from ROI Calculator)';
    if (leadSource === 'hero') return 'Browsing Lead (from Hero CTA)';
    return 'Browsing Lead (General CTA)';
  };

  const sendEmailNotification = async () => {
    if (emailSent) return;
    try {
      const emailData = {
        to: 'elironebusiness@gmail.com',
        subject: `New Demo Request - ${getLeadLabel()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType,
        weeklyCallVolume: formData.volume,
        message: formData.message || '(none)',
        leadSource: getLeadLabel(),
        timestamp: new Date().toLocaleString(),
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/elironebusiness@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.businessType || !formData.volume) return;
    sendEmailNotification();
    setStep(2);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="consultation" className="py-16 px-4 md:px-6 relative">
      {/* Removed gradient overlay to match page background */}

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className={`text-4xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none fade-in-up ${isMedSpa ? 'text-slate-800' : ''}`}>
          Capture your <br />
          <span className={isMedSpa ? 'bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent' : 'gradient-relay'}>Growth.</span>
        </h2>

        <div className={`mt-10 ${isMedSpa ? 'bg-white/50 border border-rose-200/60 backdrop-blur-xl' : 'bg-white/[0.02] border border-white/10'} p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl max-w-2xl mx-auto fade-in-up`}>
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>Name</label>
                  <input
                    type="text" required placeholder="Your name"
                    value={formData.name} onChange={(e) => updateField('name', e.target.value)}
                    className={`w-full ${isMedSpa ? 'bg-white/70 border border-rose-200/40 text-slate-900 placeholder:text-slate-500 focus:border-rose-400/70' : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-sky-400/50'} rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>Email</label>
                  <input
                    type="email" required placeholder="you@business.com"
                    value={formData.email} onChange={(e) => updateField('email', e.target.value)}
                    className={`w-full ${isMedSpa ? 'bg-white/70 border border-rose-200/40 text-slate-900 placeholder:text-slate-500 focus:border-rose-400/70' : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-sky-400/50'} rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>Phone</label>
                  <input
                    type="tel" required placeholder="Your phone number"
                    value={formData.phone} onChange={(e) => updateField('phone', e.target.value)}
                    className={`w-full ${isMedSpa ? 'bg-white/70 border border-rose-200/40 text-slate-900 placeholder:text-slate-500 focus:border-rose-400/70' : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-sky-400/50'} rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>{businessLabel}</label>
                  <select
                    required value={formData.businessType} onChange={(e) => updateField('businessType', e.target.value)}
                    className={`w-full ${isMedSpa ? 'bg-white/70 border border-rose-200/40 text-slate-900 focus:border-rose-400/70' : 'bg-white/[0.04] border border-white/[0.08] text-white focus:border-sky-400/50'} rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all appearance-none cursor-pointer`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2394a3b8' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="" disabled className={isMedSpa ? "bg-white text-slate-900" : "bg-gray-900 text-white"}>{isMedSpa ? "Select your primary services" : "Select your industry"}</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind} className={isMedSpa ? "bg-white text-slate-900" : "bg-gray-900 text-white"}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>{volumeLabel}</label>
                <div className={`grid ${isMedSpa ? 'grid-cols-2' : 'grid-cols-4'} gap-2`}>
                  {volumes.map(vol => (
                    <button
                      key={vol} type="button"
                      onClick={() => updateField('volume', vol)}
                      className={`py-3 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${
                        formData.volume === vol
                          ? isMedSpa
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                            : 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                          : isMedSpa
                            ? 'bg-white/[0.04] border border-white/[0.08] text-slate-700 hover:border-rose-400/30 hover:text-slate-900'
                            : 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:border-sky-400/30 hover:text-white'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wide ${isMedSpa ? 'text-rose-600' : 'text-sky-400'} mb-2`}>Message {!isMedSpa && '(Optional)'}</label>
                <textarea
                  placeholder={isMedSpa ? "Tell us about your med spa: location, services, biggest challenges with missed calls..." : "Tell us about your business and what you're looking for..."}
                  value={formData.message} onChange={(e) => updateField('message', e.target.value)}
                  rows={3}
                  className={`w-full ${isMedSpa ? 'bg-white/70 border border-rose-200/40 text-slate-900 placeholder:text-slate-500 focus:border-rose-400/70' : 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 focus:border-sky-400/50'} rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all resize-none`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-5 ${isMedSpa ? 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-xl shadow-rose-500/20' : 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-xl shadow-sky-500/20'} text-white rounded-2xl font-black uppercase tracking-wide text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2`}
              >
                Book My Free Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 sm:space-y-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white mb-3">You're Qualified!</h3>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide px-2">Select a 15-minute slot below to finalize your system design.</p>
              </div>
              <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => window.open(CALENDLY_LINK, '_blank')}
                  className="w-full px-8 py-5 sm:py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-black text-base sm:text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/30 uppercase tracking-wide"
                >
                  Open Scheduler
                </button>
              </div>
              <button
                onClick={() => { setStep(1); setEmailSent(false); }}
                className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-wide transition-colors"
              >
                [ Start Over ]
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 text-slate-500 text-xs font-bold uppercase tracking-wide break-words">
          Limited implementation slots available each month. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Consultation;
