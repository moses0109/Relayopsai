
import React, { useEffect, useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import ChatWidget from './ChatWidget';
import IncomingCall from './IncomingCall';

/* ------------------------------------------------------------------ */
/*  REFINED DENTAL LOGO (ULTRA-FIDELITY SVG)                          */
/* ------------------------------------------------------------------ */
const DentalLogoSVG = ({ className = "h-40 w-40", opacity = 1, showReflection = false }) => (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ opacity }}>
        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full"></div>
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_25px_rgba(59,130,246,0.9)] relative z-10">
            <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <linearGradient id="toothGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>

            {/* Background Disk */}
            <circle cx="200" cy="200" r="190" fill="#020617" />

            {/* Outer Node Network */}
            <g>
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * (Math.PI / 180);
                    const r = 175;
                    const x = 200 + r * Math.cos(angle);
                    const y = 200 + r * Math.sin(angle);
                    return (
                        <g key={i}>
                            <circle cx={x} cy={y} r="8" fill="url(#nodeGlow)" opacity="0.6" />
                            <circle cx={x} cy={y} r="3" fill="#93c5fd" />
                        </g>
                    );
                })}
                {[...Array(24)].map((_, i) => {
                    const angle1 = (i * 15) * (Math.PI / 180);
                    const angle2 = ((i + 1) % 24) * 15 * (Math.PI / 180);
                    const x1 = 200 + 175 * Math.cos(angle1);
                    const y1 = 200 + 175 * Math.sin(angle1);
                    const x2 = 200 + 175 * Math.cos(angle2);
                    const y2 = 200 + 175 * Math.sin(angle2);
                    const angle3 = ((i + 2) % 24) * 15 * (Math.PI / 180);
                    const x3 = 200 + 175 * Math.cos(angle3);
                    const y3 = 200 + 175 * Math.sin(angle3);
                    return (
                        <g key={i}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
                            <line x1={x1} y1={y1} x2={x3} y2={y3} stroke="#1e40af" strokeWidth="0.5" strokeOpacity="0.2" />
                        </g>
                    );
                })}
            </g>

            {/* Inner Rings */}
            <circle cx="200" cy="200" r="145" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="200" cy="200" r="138" fill="none" stroke="#60a5fa" strokeWidth="2.5" />

            {/* TOOTH */}
            <path
                id="toothMirror"
                d="M200 115 C250 115 280 150 280 200 C280 250 255 290 225 310 C205 325 200 345 200 345 C200 345 195 325 175 310 C145 290 120 250 120 200 C120 150 150 115 200 115 Z"
                fill="#020617"
                stroke="url(#toothGradient)"
                strokeWidth="5"
                strokeLinejoin="round"
            />

            {/* Inside Circuitry */}
            <g stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" fill="none">
                <path d="M165 170 H235 M165 200 H205 M165 230 H235" opacity="0.6" />
                <path d="M185 140 V280" opacity="0.4" />
                <path d="M215 140 V280" opacity="0.4" />
                <circle cx="200" cy="200" r="5" fill="#60a5fa" />
            </g>
        </svg>

        {/* The Reflection - matching the user's bitmap style */}
        {showReflection && (
            <div className="w-full h-1/2 mt-4 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent)] scale-y-[-1] grayscale">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                    <use href="#toothMirror" />
                </svg>
            </div>
        )}
    </div>
);

/* ------------------------------------------------------------------ */
/*  PHONE MOCKUP COMPONENT                                             */
/* ------------------------------------------------------------------ */
const PhoneMockup = () => {
    return (
        <div className="relative w-[300px] h-[610px] bg-[#030303] rounded-[3.5rem] border-[12px] border-slate-800 shadow-[0_0_100px_rgba(59,130,246,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a0f] flex flex-col pt-10 p-4">
                <div className="flex justify-between items-center px-4 mb-4">
                    <span className="text-[10px] text-white/60">11:15 AM</span>
                </div>
                <div className="flex flex-col items-center mb-10 text-center px-2">
                    <DentalLogoSVG className="h-20 w-20 mb-4" />
                    <p className="text-white text-base font-black">Patient Inbound</p>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Relay Active...</p>
                </div>
                <div className="space-y-4 mt-auto mb-10">
                    <div className="bg-slate-900/80 p-4 rounded-2xl rounded-bl-none border border-white/5">
                        <p className="text-[10px] text-blue-400 font-black mb-1.5 uppercase">Patient</p>
                        <p className="text-xs text-white font-medium leading-relaxed">"I have a broken crown and need to see someone today."</p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-2xl rounded-br-none shadow-lg">
                        <p className="text-[10px] text-white/80 font-black mb-1.5 uppercase">Relay AI</p>
                        <p className="text-xs text-white font-black leading-relaxed">"I can book you for an emergency slot at 1:30 PM. Shall I confirm?"</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-b-[2rem]"></div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  DENTAL PAGE                                                        */
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
        return Math.round(missedCalls * (avgCaseValue / 2));
    }, [callsPerDay, missedPercentage, avgCaseValue]);

    return (
        <div className="min-h-screen text-white bg-[#030303] flex flex-col font-sans selection:bg-blue-600/40 overflow-x-hidden">
            <Navbar />
            <IncomingCall />

            {/* ── 1) HERO SECTION ── */}
            <header className="relative pt-32 pb-40 lg:pt-64 lg:pb-80 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#030303]"></div>
                    {/* Immersive Dental Office Background */}
                    <div className="absolute inset-0 opacity-20 grayscale saturate-0 mix-blend-overlay scale-110">
                        <img
                            src="https://images.unsplash.com/photo-1629909608135-ca40a60965d1?auto=format&fit=crop&q=80&w=2000"
                            alt="Dental Clinic"
                            className="w-full h-full object-cover blur-[8px]"
                        />
                    </div>
                    <div className="absolute -top-[20%] -right-[10%] opacity-10 rotate-[15deg]">
                        <DentalLogoSVG className="h-[1200px] w-[1200px]" opacity={0.3} />
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-blue-600/10 blur-[250px] rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-cyan-600/5 blur-[200px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="mb-10 flex items-center gap-4">
                                <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(37,99,235,0.4)]">Dental Solution 2.0</span>
                                <div className="h-[1px] w-20 bg-blue-600/30"></div>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-white mb-12">
                                Never Miss <br />
                                <span className="text-blue-500 italic block mt-2">A Single Call.</span> <br />
                                Fill Every Chair.
                            </h1>

                            <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-xl mb-14 leading-relaxed">
                                Relay handles every call, books appointments, and confirms visits 24/7 — so you <span className="text-white font-black underline decoration-blue-500 underline-offset-4">never leak revenue</span> to your competitors again.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-10">
                                <button
                                    onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                    className="w-full sm:w-auto px-16 py-8 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(37,99,235,0.5)] border border-blue-400/30"
                                >
                                    Book Setup Call
                                </button>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] inline-block border-l-2 border-blue-600 pl-4">PMS INTEGRATED & HIPAA COMPLIANT</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-end items-center relative py-20 lg:py-0">
                            <PhoneMockup />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2) IMMERSIVE PAIN SECTION ── */}
            <section className="py-40 px-6 bg-[#050b1a] relative border-y border-white/5">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="grid grid-cols-4 md:grid-cols-6 h-full w-full">
                        {[...Array(24)].map((_, i) => (
                            <div key={i} className="flex items-center justify-center border-r border-b border-white/10 p-12">
                                <DentalLogoSVG className="h-16 w-16" opacity={0.1} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-32">
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
                            Leak Less <span className="text-rose-500 italic block">Production.</span>
                        </h2>
                        <div className="h-1 bg-blue-600 w-32 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "The Emergency Exit", desc: "A patient in pain calls after 5 PM. No one answers. They book with the guy down the street. That's a $1,500 crown lost in 10 seconds." },
                            { title: "Staff Overload", desc: "Your team is stuck on the phone answering routine questions while your in-office patients wait. Staff burnout is where good clinics die." },
                            { title: "No-Show Waste", desc: "Empty chairs are the highest cost in dentistry. Relay sends multi-touch confirmations that cut no-shows by 40% automatically." }
                        ].map((pain, i) => (
                            <div key={i} className="group p-12 rounded-[3.5rem] bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all shadow-2xl backdrop-blur-xl">
                                <DentalLogoSVG className="h-14 w-14 mb-8" />
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 text-white group-hover:text-blue-400 transition-colors">{pain.title}</h3>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed italic">{pain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3) ROI AUDIT ── */}
            <section className="py-40 px-6 bg-[#030303] relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="bg-[#0a0a0f] border border-blue-500/20 p-20 rounded-[5rem] shadow-[0_0_100px_rgba(59,130,246,0.1)] relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-20">
                            <DentalLogoSVG className="h-48 w-48" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                            <div className="space-y-16">
                                <div>
                                    <div className="flex justify-between mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Daily Inbound Calls</span>
                                        <span className="text-blue-400 font-black text-2xl">{callsPerDay}</span>
                                    </div>
                                    <input type="range" min="10" max="200" value={callsPerDay} onChange={e => setCallsPerDay(Number(e.target.value))} className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-600" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Missed Rate</span>
                                        <span className="text-rose-500 font-black text-2xl">{missedPercentage}%</span>
                                    </div>
                                    <input type="range" min="5" max="60" value={missedPercentage} onChange={e => setMissedPercentage(Number(e.target.value))} className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-rose-500" />
                                </div>
                            </div>

                            <div className="relative text-center p-14 bg-white/5 rounded-[4rem] border border-blue-500/40 backdrop-blur-3xl shadow-2xl">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-blue-400">Monthly Revenue Leakage</p>
                                <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 text-white">${monthlyLoss.toLocaleString()}</h3>
                                <button
                                    onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                    className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                >
                                    Stop the Bleeding
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4) THE "EVERYWHERE" BRANDING ── */}
            <section className="py-40 px-6 bg-[#030303] text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                                AI Built For <br /><span className="text-blue-600 italic">Dental Reality.</span>
                            </h2>
                            <p className="text-slate-400 text-xl md:text-2xl font-medium mb-16 leading-relaxed">
                                Most AI receptionists are generic bots. Relay is hard-coded for dentistry. It knows the difference between a prophy and a root canal.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {[
                                    { title: "Direct PMS Write", desc: "Instantly books into Dentrix, Open Dental, or EagleSoft." },
                                    { title: "HIPAA Compliant", desc: "Full encryption and secure handling of all PHI." },
                                    { title: "Smart Triage", desc: "Prioritizes high-production emergencies automatically." },
                                    { title: "72H Deployment", desc: "Live and answering calls for your practice in 3 days." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4 p-8 bg-white/5 rounded-3xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <DentalLogoSVG className="h-8 w-8" />
                                            <h4 className="font-black uppercase tracking-widest text-sm">{item.title}</h4>
                                        </div>
                                        <p className="text-slate-500 text-xs font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 relative">
                            {[
                                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
                                "https://images.unsplash.com/photo-1629909608135-ca40a60965d1?auto=format&fit=crop&q=80&w=800",
                                "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
                                "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
                            ].map((img, i) => (
                                <div key={i} className="relative aspect-square bg-[#0a0a0f] rounded-[4rem] flex flex-col items-center justify-center p-2 border border-blue-500/10 hover:border-blue-500/40 transition-all group overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 grayscale group-hover:opacity-40 transition-opacity">
                                        <img src={img} className="w-full h-full object-cover" alt="dental clinical" />
                                    </div>
                                    <div className="absolute top-8 left-8 text-[10px] font-black text-white/40 uppercase tracking-widest z-10">Module 0{i + 1}</div>
                                    <DentalLogoSVG className="h-24 w-24 relative z-10 group-hover:scale-110 transition-transform" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-60 px-6 bg-[#030303] text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <DentalLogoSVG className="h-[1000px] w-[1000px] animate-slow-spin-fast" opacity={0.2} />
                    </div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-16 uppercase italic">
                        Start Booking <br /><span className="text-blue-500">While You Sleep.</span>
                    </h2>
                    <p className="text-slate-400 text-2xl font-medium mb-16 uppercase tracking-[0.3em] max-w-2xl mx-auto italic">
                        Every unanswered call is production lost. Stop leaking patients today.
                    </p>
                    <button
                        onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                        className="px-20 py-10 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all shadow-[0_0_80px_rgba(37,99,235,0.6)] border-4 border-white/20"
                    >
                        Book Setup Call
                    </button>
                </div>
            </section>

            <footer className="py-24 px-6 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-4">
                        <DentalLogoSVG className="h-12 w-12" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">Relay<span className="text-blue-500">OpsAI</span></span>
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em] mt-1">Dental Practice Solution</span>
                        </div>
                    </div>
                    <div className="flex gap-16">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-white transition-colors cursor-pointer">HIPAA Ready</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-white transition-colors cursor-pointer">PMS Direct Sync</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-white transition-colors cursor-pointer">24/7 Coverage</span>
                    </div>
                </div>
            </footer>

            <Analytics />

            <style jsx>{`
                @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-slow-spin-fast { animation: slowSpin 60s linear infinite; }
            `}</style>
        </div>
    );
};

export default DentalPage;
