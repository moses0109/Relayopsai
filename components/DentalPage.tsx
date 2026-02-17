
import React, { useEffect, useState, useMemo } from 'react';
// Version: 1.0.1 - Pushed at 11:05 PM
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import ChatWidget from './ChatWidget';
import IncomingCall from './IncomingCall';

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
                    <p className="text-white text-sm font-bold">Patient Request</p>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-1">Relay Answering...</p>
                </div>

                <div className="space-y-3 mt-auto mb-8">
                    <div className="bg-slate-800/50 p-3 rounded-2xl rounded-bl-none max-w-[90%]">
                        <p className="text-[10px] text-blue-400 font-black mb-1">Patient</p>
                        <p className="text-[11px] text-white font-medium prose-sm">"I have a broken crown and need to see someone today."</p>
                    </div>
                    <div className="bg-blue-600 p-3 rounded-2xl rounded-br-none max-w-[90%] ml-auto">
                        <p className="text-[10px] text-blue-100 font-black mb-1">Relay AI</p>
                        <p className="text-[11px] text-white font-medium">"I can book you for an emergency slot at 1:30 PM. Shall I confirm?"</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-center">
                        <p className="text-[9px] text-emerald-400 font-black uppercase tracking-tighter">Emergency Booked</p>
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
        <div className="min-h-screen text-white bg-[#030712] flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            <IncomingCall />

            {/* ── 1) HERO SECTION ── */}
            <header className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 px-6 bg-[#030712] overflow-hidden">
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

                {/* Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            {/* The Actual Circle Image */}
                            <div className="mb-12 relative group h-32 w-32 md:h-40 md:w-40">
                                <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse rounded-full"></div>
                                <img
                                    src="/dental-logo.png"
                                    alt="RelayOpsAI Dental"
                                    className="relative w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                />
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-white mb-8">
                                Stop Missing Calls. <br />
                                <span className="text-blue-500 italic">Start Booking More</span> <br />
                                Appointments.
                            </h1>

                            {/* Subheadline */}
                            <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed">
                                Relay handles every call, books appointments, and confirms visits — so your front desk never misses another high-value revenue opportunity.
                            </p>

                            {/* Value Bullets */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                {[
                                    { text: "24/7 Call Answering", icon: "✓" },
                                    { text: "Seamless Scheduler Integration", icon: "✓" },
                                    { text: "SMS Patient Confirmations", icon: "✓" },
                                    { text: "Reduced Practice No-Shows", icon: "✓" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                                            {item.icon}
                                        </div>
                                        <span className="text-slate-300 font-bold uppercase tracking-wide text-xs">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <button
                                    onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                    className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/40 border border-blue-400/30"
                                >
                                    Book 30-Minute Setup Call
                                </button>
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="doctor" />
                                        </div>
                                    ))}
                                    <div className="pl-6 flex items-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trusted by 50+ Modern Practices</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-end p-8 relative">
                            <div className="absolute inset-[-40px] bg-blue-500/5 blur-[120px] rounded-full"></div>
                            <PhoneMockup />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2) PROBLEMS / PAIN SECTION ── */}
            <section className="py-32 px-6 bg-[#050b1a] border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
                            Your Front Desk is <span className="text-rose-500">Leaking Revenue.</span>
                        </h2>
                        <p className="text-blue-400 font-bold uppercase text-xs tracking-[0.3em]">The hidden cost of missed calls in your practice</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "The Emergency Exit", desc: "A patient with acute pain calls after 5 PM. If you don't answer, they find the next practice on Google. That's a high-production case gone in seconds." },
                            { title: "No-Show Waste", desc: "Empty chairs are the silent killers of practice production. Relay sends multi-touch SMS reminders that cut no-shows by 40%." },
                            { title: "Staff Burnout Barrier", desc: "Your experienced staff spends hours answering 'Do you take my insurance?'. Let Relay handle the FAQs while your staff handles the patients in-house." }
                        ].map((pain, i) => (
                            <div key={i} className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04] hover:shadow-2xl hover:-translate-y-2">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-white">{pain.title}</h3>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed italic">{pain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3) ROI CALCULATOR ── */}
            <section className="py-32 px-6 bg-[#030712] relative">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Practice Revenue Audit</h2>
                        <p className="text-blue-400 font-black uppercase text-xs tracking-[0.4em]">See exactly how much revenue is leaking out</p>
                    </div>

                    <div className="bg-[#0a0a0f] border border-white/10 p-12 rounded-[4rem] shadow-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                            <div className="space-y-12">
                                {/* Sliders */}
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Incoming Calls / Day</span>
                                        <span className="text-blue-400 font-black">{callsPerDay}</span>
                                    </div>
                                    <input type="range" min="10" max="200" value={callsPerDay} onChange={e => setCallsPerDay(Number(e.target.value))} className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Missed / After-Hours Rate</span>
                                        <span className="text-rose-500 font-black">{missedPercentage}%</span>
                                    </div>
                                    <input type="range" min="5" max="60" value={missedPercentage} onChange={e => setMissedPercentage(Number(e.target.value))} className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Avg Case Production</span>
                                        <span className="text-emerald-500 font-black">${avgCaseValue}</span>
                                    </div>
                                    <input type="range" min="300" max="5000" value={avgCaseValue} onChange={e => setAvgCaseValue(Number(e.target.value))} className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                                </div>
                            </div>
                            <div className="text-center p-10 bg-white/5 rounded-[3rem] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 text-blue-400">Monthly Revenue Leakage</p>
                                <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">${monthlyLoss.toLocaleString()}</h3>
                                <div className="h-1 bg-blue-600 w-16 mx-auto mb-6"></div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                    Recover this through <br />
                                    <span className="text-white">AI answering & booking</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4) HOW IT WORKS ── */}
            <section className="py-32 px-6 bg-[#050b1a] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">The Implementation</h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Launched and syncing in under 72 hours</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Map Logic", desc: "We sync with your Dentrix, Open Dental, or EagleSoft schedule and learn your rules." },
                            { step: "02", title: "Deploy Relay", desc: "Your custom AI receptionist goes live, answering calls 24/7 with studio-grade voice quality." },
                            { step: "03", title: "Fill Chairs", desc: "New bookings appear directly in your PMS. Your staff arrives to a full schedule every day." }
                        ].map((s, i) => (
                            <div key={i} className="relative p-12 bg-white/[0.02] rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:bg-white/[0.04]">
                                <span className="absolute top-[-20px] left-[-20px] text-[150px] font-black text-white/[0.03] leading-none select-none">{s.step}</span>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{s.title}</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed italic">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5) TRUST / SOCIAL PROOF ── */}
            <section className="py-32 px-6 bg-[#030712] border-y border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-20 text-slate-600">Built for Modern Practice Owners</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 grayscale opacity-40">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">HIPAA</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Secure Protocol</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">PMS</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Direct Write-Back</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">VOICE</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latency-Reduced AI</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black italic mb-2">72H</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Quick Integration</span>
                        </div>
                    </div>

                    <div className="mt-40 max-w-2xl mx-auto">
                        <div className="text-4xl italic font-serif text-slate-500 mb-8 leading-relaxed">
                            "The system booked 14 high-production cases in its first month. It’s like adding a high-performance receptionist without the extra overhead."
                        </div>
                        <p className="text-sm font-black uppercase tracking-widest text-white">Dr. Sarah Jenkins</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mt-1">Practice Principal, NYC</p>
                    </div>
                </div>
            </section>

            {/* ── 6) FINAL CTA ── */}
            <section className="py-40 px-6 bg-[#030712] text-center relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-10 text-white uppercase">
                        Book Your <br /><span className="text-blue-500 italic">Practice Audit.</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium mb-12 uppercase tracking-[0.2em]">Stop leaking production. Start filling your chairs today.</p>
                    <button
                        onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                        className="px-12 py-7 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/40"
                    >
                        Book 30-Minute Setup Call
                    </button>
                    <p className="mt-8 text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em]">No contracts. Results delivered in 7 days.</p>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-24 px-6 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-4">
                        <img src="/dental-logo.png" alt="Relay Dental" className="h-10 object-contain" />
                        <span className="text-xl font-black uppercase italic tracking-tighter text-white">Relay<span className="text-blue-500">OpsAI</span></span>
                    </div>
                    <div className="flex gap-12">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                    </div>
                </div>
            </footer>

            <Analytics />
        </div>
    );
};

export default DentalPage;
