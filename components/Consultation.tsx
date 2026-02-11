
import React, { useState } from 'react';

const Consultation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ volume: '', industry: '' });
  const [emailSent, setEmailSent] = useState(false);

  const CALENDLY_LINK = 'https://calendly.com/elironebusiness/15-minute-call-capture-setup';

  // Send email notification with prospect data
  const sendEmailNotification = async (volume: string, industry: string) => {
    if (emailSent) return; // Prevent duplicate sends

    console.log('📧 Sending notification - Volume:', volume, 'Industry:', industry);

    try {
      const emailData = {
        to: 'elironebusiness@gmail.com',
        subject: '🎯 New Demo Request - RelayOpsAI',
        volume: volume,
        industry: industry,
        timestamp: new Date().toLocaleString(),
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/elironebusiness@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (response.ok) {
        setEmailSent(true);
        console.log('✅ Email sent successfully!', result);
      } else {
        console.error('❌ Email failed:', result);
      }
    } catch (error) {
      console.error('❌ Email error:', error);
    }
  };

  const industries = [
    "HVAC", "Dental", "Real Estate", "Med Spa", "Plumbing", "Auto Repair", "Home Services", "Legal", "Other"
  ];

  return (
    <section id="consultation" className="py-16 px-6 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
          Capture your <br /><span className="gradient-relay">Growth.</span>
        </h2>
        
        <div className="mt-10 bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[4rem] max-w-2xl mx-auto">
          {step === 1 && (
            <div className="space-y-10">
              <div>
                <p className="text-cyan-400 text-xs md:text-sm font-black uppercase tracking-wide mb-4">Step 1 of 2</p>
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white px-2">How many calls do you receive weekly?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Under 20", "20–50", "50–100", "100+"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setAnswers({...answers, volume: opt}); setStep(2); }}
                    className="w-full py-6 px-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all font-black uppercase text-sm md:text-base tracking-wide text-white shadow-2xl shadow-cyan-500/30 border-2 border-cyan-400/50"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div>
                <p className="text-cyan-400 text-xs md:text-sm font-black uppercase tracking-wide mb-4">Step 2 of 2</p>
                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white px-2">What is your primary industry?</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => {
                      setAnswers({...answers, industry: ind});
                      sendEmailNotification(answers.volume, ind);
                      setStep(3);
                    }}
                    className="w-full py-6 px-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 transition-all font-black uppercase text-sm md:text-base tracking-wide text-white shadow-2xl shadow-cyan-500/30 border-2 border-cyan-400/50"
                  >
                    {ind}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-wide transition-colors"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white mb-4">You're Qualified!</h3>
                <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-wide px-4">Select a 15-minute slot below to finalize your system design.</p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => window.open(CALENDLY_LINK, '_blank')}
                  className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-black text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-emerald-500/30 uppercase tracking-wide"
                >
                  Open Scheduler
                </button>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-wide transition-colors"
              >
                [ Start Over ]
              </button>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-wide sm:tracking-widest break-words">
          Limited implementation slots available each month. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Consultation;
