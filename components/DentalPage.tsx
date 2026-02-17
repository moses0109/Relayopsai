
import React, { useEffect, useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import Logo from './Logo';
import ChatWidget from './ChatWidget';
import IncomingCall from './IncomingCall';

/* ------------------------------------------------------------------ */
/*  PHONE MOCKUP COMPONENT                                             */
/* ------------------------------------------------------------------ */
const PhoneMockup = () => {
    return (
        <div className="relative w-[300px] h-[600px] bg-[#030303] rounded-[3.5rem] border-[12px] border-[#1a1a1a] shadow-2xl shadow-blue-500/20 overflow-hidden">
            {/* Screen */}
            <div className="absolute inset-0 bg-[#0a0a0f] flex flex-col pt-12 p-4">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-4 mb-4">
                    <span className="text-[10px] text-white">9:41</span>
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                        <div className="w-4 h-3 bg-white/40 rounded-sm"></div>
                    </div>
                </div>

                {/* Call Interface */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                    </div>
                    <p className="text-white text-lg font-bold">Incoming Patient Call</p>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">Belle AI Answering...</p>
                </div>

                {/* SMS Flow */}
                <div className="space-y-3 mt-auto mb-8">
                    <div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-bl-none max-w-[85%] border border-white/5">
                        <p className="text-[10px] text-slate-400 font-bold mb-1">New Patient</p>
                        <p className="text-xs text-white">"Hi, do you have any openings for a cleaning tomorrow?"</p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-br-none max-w-[85%] self-end ml-auto">
                        <p className="text-[10px] text-blue-100 font-bold mb-1">Belle AI</p>
                        <p className="text-xs text-white">"Yes! We have an 11:00 AM slot. Would you like me to book that for you?"</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-bl-none max-w-[85%] border border-white/5">
                        <p className="text-xs text-white">"Perfect, please book it."</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-1 w-24 bg-white/20 rounded-full mx-auto mt-auto mb-2"></div>
            </div>
            {/* Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#1a1a1a] rounded-b-3xl"></div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  DENTAL ROI CALCULATOR                                              */
/* ------------------------------------------------------------------ */
const DentalROI = () => {
    const [callsPerDay, setCallsPerDay] = useState(40);
    const [missedRate, setMissedRate] = useState(25);
    const [avgCaseValue, setAvgCaseValue] = useState(800);

    const stats = useMemo(() => {
        const monthlyCalls = callsPerDay * 22;
        const missedCalls = Math.round(monthlyCalls * (missedRate / 100));
        const lostRevenue = missedCalls * avgCaseValue;
        return { missedCalls, lostRevenue };
    }, [callsPerDay, missedRate, avgCaseValue]);

    return (
        <section id="roi-calculator" className="py-24 px-6 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0a192f] mb-4">
                        How Much Revenue Are Missed Calls Costing You?
                    </h2>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">A custom revenue audit for your practice</p>
                </div>

                <div className="bg-white border-2 border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            {/* Sliders with better styling */}
                            {[
                                { label: "Calls Per Day", val: callsPerDay, min: 10, max: 200, set: setCallsPerDay, suffix: "" },
                                { label: "Missed/After-Hours", val: missedRate, min: 5, max: 60, set: setMissedRate, suffix: "%" },
                                { label: "Avg Case Value", val: avgCaseValue, min: 200, max: 5000, set: setAvgCaseValue, prefix: "$" }
                            ].map((input, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.2em] text-[#0a192f]">
                                        <span>{input.label}</span>
                                        <span className="text-blue-600 font-black">{input.prefix}{input.val}{input.suffix}</span>
                                    </div>
                                    <input
                                        type="range" min={input.min} max={input.max} value={input.val}
                                        onChange={(e) => input.set(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#0a192f] p-12 rounded-[2.5rem] text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-blue-400">Total Monthly Leakage</p>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                                ${stats.lostRevenue.toLocaleString()}
                            </h3>
                            <div className="h-1 bg-blue-600 w-12 mx-auto mb-8 rounded-full"></div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 leading-loose">
                                Loss from approximately <br />
                                <span className="text-white">{stats.missedCalls} missed patients</span> <br />
                                every month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ------------------------------------------------------------------ */
/*  DENTAL PAGE COMPONENT                                              */
/* ------------------------------------------------------------------ */
const DentalPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen text-[#0a192f] bg-white flex flex-col pt-16 md:pt-24 relative overflow-x-hidden">
            <Navbar />

            {/* ── HERO ── */}
            <header className="relative pt-20 pb-40 px-6 bg-[#030303] overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
                        alt="Dental Office Background"
                        className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#030303]/40 to-[#030303]/90"></div>
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 blur-[180px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-6xl md:text-7xl lg:text-[100px] font-black tracking-[calc(-0.06em)] uppercase mb-8 leading-[0.82] text-white">
                            Stop Losing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Dental Cases</span> <br />
                            to Missed Calls.
                        </h1>

                        <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed mx-auto lg:mx-0">
                            RelayOpsAI answers every call, books appointments, confirms visits, and reduces no-shows — without hiring another front desk employee.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <button
                                onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                className="px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/30"
                            >
                                Book Dental Demo
                            </button>
                        </div>

                        <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50 grayscale contrast-125">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">HIPAA READY</span>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">PMS SECURE</span>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">24/7 LIVE</span>
                        </div>
                    </div>

                    <div className="flex justify-center items-center scale-75 md:scale-100">
                        <PhoneMockup />
                    </div>
                </div>
            </header>

            {/* ── THE TOOTH FLOW (SCROLL) ── */}
            <section className="bg-white py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        <div className="group">
                            <div className="mb-10 text-rose-500">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Missed calls, empty chair.</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">Every voicemail you receive is a patient calling your competitor. Stop leaking revenue today.</p>
                        </div>
                        <div className="group">
                            <div className="mb-10 text-blue-600">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">AI answers, books, and reminds.</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">Belle handles the friction. From answering FAQs to real-time calendar syncing, the patient is never left waiting.</p>
                        </div>
                        <div className="group">
                            <div className="mb-10 text-emerald-500">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Full schedule, calm front desk.</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">Enable your team to focus on the patients in front of them, while the AI packs your schedule for tomorrow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROBLEM CARDS ── */}
            <section className="py-32 px-6 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Practice Fixes</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Direct impact on your daily operations</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "24/7 Coverage", desc: "Belle never sleeps. Capture emergency calls at 3 AM and weekend leads without lifting a finger." },
                            { title: "Staff Burnout", desc: "Stop forcing your clinical staff to handle phones. Let the AI take the load so they can assist you bedside." },
                            { title: "Booking Integration", desc: "Syncs directly with your PMS. Appointments appear in your schedule like magic — no manual entry." },
                            { title: "Automatic Returns", desc: "If a patient hangs up, Belle sends an instant SMS follow-up to recover the lead immediately." }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all duration-500">
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{card.title}</h3>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BEFORE / AFTER ── */}
            <section className="py-40 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                        <div className="p-16 rounded-[4rem] bg-slate-50">
                            <h3 className="text-base font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Old Front Desk</h3>
                            <ul className="space-y-8">
                                {["Missed calls go to voicemail", "Voicemails never get checked", "Patients call the dentist down the road", "Schedule has constant holes"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-6">
                                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                        <span className="text-xl font-bold uppercase tracking-tight text-slate-500">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-16 rounded-[4rem] bg-[#0a192f] text-white shadow-2xl">
                            <h3 className="text-base font-black uppercase tracking-[0.3em] text-blue-400 mb-12">RelayOpsAI Enabled</h3>
                            <ul className="space-y-8">
                                {["Every call answered in 2 seconds", "Instant appointment booking", "Automated SMS patient confirmations", "Maximum production per chair"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-6">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-xl font-bold uppercase tracking-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <DentalROI />

            {/* ── TRUST ── */}
            <section className="py-32 px-6 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] mb-20 text-slate-400">Security & Integrity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div>
                            <div className="text-blue-600 font-black uppercase tracking-[0.2em] mb-4">HIPAA Ready</div>
                            <p className="text-slate-500 text-sm font-medium leading-loose uppercase tracking-wide">Data handling protocols designed to meet modern security standards.</p>
                        </div>
                        <div>
                            <div className="text-blue-600 font-black uppercase tracking-[0.2em] mb-4">Secure Audio</div>
                            <p className="text-slate-500 text-sm font-medium leading-loose uppercase tracking-wide">End-to-end encryption for all patient interactions and recordings.</p>
                        </div>
                        <div>
                            <div className="text-blue-600 font-black uppercase tracking-[0.2em] mb-4">PMS Integration</div>
                            <p className="text-slate-500 text-sm font-medium leading-loose uppercase tracking-wide">Direct sync with Dentrix, Open Dental, and more via secure API.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-24 px-6 bg-[#030303] text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-6"><Logo /></div>
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">© 2026 RelayOpsAI</p>
                    </div>
                    <div className="flex justify-center md:justify-end gap-12">
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Privacy</button>
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Terms</button>
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Contact</button>
                    </div>
                </div>
            </footer>

            <ChatWidget />
            <IncomingCall />
            <Analytics />
        </div>
    );
};

export default DentalPage;
