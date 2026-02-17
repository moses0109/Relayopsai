
import React, { useEffect, useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import Logo from './Logo';

/* ------------------------------------------------------------------ */
/*  PHONE MOCKUP COMPONENT                                             */
/* ------------------------------------------------------------------ */
const PhoneMockup = () => {
    return (
        <div className="relative w-[280px] h-[580px] bg-[#030303] rounded-[3rem] border-[10px] border-slate-800 shadow-2xl shadow-blue-500/10 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0f] flex flex-col pt-10 p-4">
                <div className="flex justify-between items-center px-4 mb-4">
                    <span className="text-[10px] text-white">10:45 AM</span>
                    <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 bg-white/20 rounded-full"></div>
                        <div className="w-3.5 h-2.5 bg-white/40 rounded-sm"></div>
                    </div>
                </div>

                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                    </div>
                    <p className="text-white text-sm font-bold">New Patient Call</p>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-1">Answering with AI...</p>
                </div>

                <div className="space-y-3 mt-auto mb-8">
                    <div className="bg-slate-800/50 p-3 rounded-2xl rounded-bl-none max-w-[90%]">
                        <p className="text-[10px] text-blue-400 font-black mb-1">Patient</p>
                        <p className="text-[11px] text-white font-medium prose-sm">"I need an emergency crown repair today, do you have room?"</p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-br-none max-w-[90%] ml-auto">
                        <p className="text-[10px] text-blue-100 font-black mb-1">Belle AI</p>
                        <p className="text-[11px] text-white font-medium">"I can fit you in at 2 PM today. I've sent a text to confirm your info!"</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-center">
                        <p className="text-[9px] text-emerald-400 font-black uppercase tracking-tighter">Appointment Booked</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl"></div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  DENTAL PAGE COMPONENTS                                             */
/* ------------------------------------------------------------------ */
const DentalPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [callsPerDay, setCallsPerDay] = useState(45);
    const [missedPercentage, setMissedPercentage] = useState(25);
    const [avgCaseValue, setAvgCaseValue] = useState(850);

    const monthlyLoss = useMemo(() => {
        const monthlyTotalCalls = callsPerDay * 20;
        const missedCalls = monthlyTotalCalls * (missedPercentage / 100);
        return Math.round(missedCalls * avgCaseValue);
    }, [callsPerDay, missedPercentage, avgCaseValue]);

    return (
        <div className="min-h-screen text-slate-900 bg-white flex flex-col font-sans selection:bg-blue-100 italic-none">
            <Navbar />

            {/* ── 1) HERO SECTION ── */}
            <header className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 px-6 bg-slate-50 overflow-hidden">
                {/* Background Visual (Dental Office) */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
                        alt="Modern Dental Office"
                        className="w-full h-full object-cover opacity-[0.07] grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            {/* Headline */}
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-slate-900 mb-8">
                                Stop Missing Calls. <br />
                                <span className="text-blue-600 italic">Start Booking More</span> <br />
                                Appointments.
                            </h1>

                            {/* Subheadline */}
                            <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed">
                                RelayOpsAI handles every call, books appointments, and confirms visits — so your front desk never misses another high-value revenue opportunity.
                            </p>

                            {/* Value Bullets */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                {[
                                    { text: "24/7 Call Answering", icon: "✓" },
                                    { text: "Automatic Appointment Booking", icon: "✓" },
                                    { text: "SMS Patient Confirmations", icon: "✓" },
                                    { text: "Reduced No-Shows", icon: "✓" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                                            {item.icon}
                                        </div>
                                        <span className="text-slate-700 font-bold uppercase tracking-wide text-xs">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                className="px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/30"
                            >
                                Book 30-Minute Setup Call
                            </button>
                        </div>

                        <div className="hidden lg:flex justify-end p-8">
                            <PhoneMockup />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2) PROBLEMS / PAIN SECTION ── */}
            <section className="py-32 px-6 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">
                            Your Front Desk is <span className="text-rose-600">Leaking Revenue.</span>
                        </h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">The hidden cost of missed calls in a dental practice</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "The Emergency Exit", desc: "A patient with acute pain calls after 5 PM. If you don't answer, they find the next practice on Google. That's a $1,500 case gone in 30 seconds." },
                            { title: "No-Show Waste", desc: "Empty chairs are the silent killers of practice production. Belle AI sends multi-touch SMS reminders that cut no-shows by 40%." },
                            { title: "Insurance FAQ Drain", desc: "Your experienced staff spends 2 hours a day answering 'Do you take my insurance?'. Let Belle handle the basic questions while your staff handles the patients." }
                        ].map((pain, i) => (
                            <div key={i} className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-2">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-slate-900">{pain.title}</h3>
                                <p className="text-slate-600 text-lg font-medium leading-relaxed italic">{pain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3) ROI CALCULATOR ── */}
            <section className="py-32 px-6 bg-[#0a192f] text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Practice Revenue Audit</h2>
                        <p className="text-blue-400 font-black uppercase text-xs tracking-[0.3em]">See exactly how much revenue is leaking out</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-12 rounded-[4rem] backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                {/* Sliders */}
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Incoming Calls / Day</span>
                                        <span className="text-blue-400 font-black">{callsPerDay}</span>
                                    </div>
                                    <input type="range" min="10" max="200" value={callsPerDay} onChange={e => setCallsPerDay(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Missed / After-Hours Rate</span>
                                        <span className="text-rose-400 font-black">{missedPercentage}%</span>
                                    </div>
                                    <input type="range" min="5" max="60" value={missedPercentage} onChange={e => setMissedPercentage(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Avg Case Production</span>
                                        <span className="text-emerald-400 font-black">${avgCaseValue}</span>
                                    </div>
                                    <input type="range" min="300" max="5000" value={avgCaseValue} onChange={e => setAvgCaseValue(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                                </div>
                            </div>
                            <div className="text-center p-10 bg-white/5 rounded-[3rem] border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-blue-400">Monthly Revenue Leakage</p>
                                <h3 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 text-white">${monthlyLoss.toLocaleString()}</h3>
                                <div className="h-1 bg-blue-600 w-12 mx-auto mb-6"></div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                    Recover this through <br />
                                    <span className="text-white">AI answering & booking</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4) HOW IT WORKS ── */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">The Implementation</h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Launched and syncing in under 72 hours</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Map Logic", desc: "We sync with your Dentrix, Open Dental, or EagleSoft schedule and learn your rules." },
                            { step: "02", title: "Deploy Belle", desc: "Your custom AI receptionist goes live, answering calls 24/7 with studio-grade voice quality." },
                            { step: "03", title: "Fill Chairs", desc: "New bookings appear directly in your PMS. Your staff arrives to a full schedule every day." }
                        ].map((s, i) => (
                            <div key={i} className="relative p-12 bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden">
                                <span className="absolute top-[-20px] left-[-20px] text-[150px] font-black text-slate-200/50 leading-none select-none">{s.step}</span>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-slate-900">{s.title}</h3>
                                    <p className="text-slate-600 font-medium leading-relaxed italic">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5) TRUST / SOCIAL PROOF ── */}
            <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] mb-20 text-slate-400">Built for Modern Practices</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 grayscale opacity-60">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">HIPAA</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security Ready</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">PMS</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Direct Integration</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">VOICE</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Human-Grade AI</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">72H</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Fast Deployment</span>
                        </div>
                    </div>

                    <div className="mt-40 max-w-2xl mx-auto">
                        <div className="text-4xl italic font-serif text-slate-400 mb-8 leading-relaxed">
                            "The AI has already booked 14 high-value cases in its first three weeks for us. It feels like adding a front desk rockstar without the overhead."
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-slate-900">Dr. Sarah Jenkins</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Practice Principal, NYC</p>
                    </div>
                </div>
            </section>

            {/* ── 6) FINAL CTA ── */}
            <section className="py-40 px-6 bg-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-10 text-slate-900 uppercase">
                        Book Your <br /><span className="text-blue-600 italic">Practice Audit.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium mb-12 uppercase tracking-widest">Stop leaking production. Start booking more cases today.</p>
                    <button
                        onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                        className="px-12 py-7 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/30"
                    >
                        Book 30-Minute Setup Call
                    </button>
                    <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">No long-term contracts. Results in 7 days.</p>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <Logo />
                    <div className="flex gap-12">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                    </div>
                </div>
            </footer>

            <Analytics />
        </div>
    );
};

export default DentalPage;
