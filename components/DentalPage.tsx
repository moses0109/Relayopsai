
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
        <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full"></div>
        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] relative z-10">
            <defs>
                <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background Disk */}
            <circle cx="250" cy="250" r="240" fill="#020617" />

            {/* OUTER MESH RING (Triangular Node Network) */}
            <g stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.8" filter="url(#glow)">
                {[...Array(24)].map((_, i) => {
                    const angle = (i * 15) * (Math.PI / 180);
                    const r = 220;
                    const x = 250 + r * Math.cos(angle);
                    const y = 250 + r * Math.sin(angle);

                    const nextAngle = ((i + 1) % 24) * 15 * (Math.PI / 180);
                    const nextX = 250 + 220 * Math.cos(nextAngle);
                    const nextY = 250 + 220 * Math.sin(nextAngle);

                    const innerR = 180;
                    const innerX = 250 + innerR * Math.cos(angle + (7.5 * Math.PI / 180));
                    const innerY = 250 + innerR * Math.sin(angle + (7.5 * Math.PI / 180));

                    return (
                        <g key={i}>
                            {/* Outer Connections */}
                            <line x1={x} y1={y} x2={nextX} y2={nextY} />
                            {/* Triangle Mesh Connections */}
                            <line x1={x} y1={y} x2={innerX} y2={innerY} strokeOpacity="0.4" />
                            <line x1={nextX} y1={nextY} x2={innerX} y2={innerY} strokeOpacity="0.4" />
                            {/* Nodes */}
                            <circle cx={x} cy={y} r="5" fill="#22d3ee" />
                        </g>
                    );
                })}
            </g>

            {/* INNER SOLID RING */}
            <circle cx="250" cy="250" r="170" fill="none" stroke="#22d3ee" strokeWidth="5" strokeOpacity="0.9" filter="url(#glow)" />

            {/* THE MOLAR (Exact Shape) */}
            <g filter="url(#glow)">
                <path
                    id="toothMolarShape"
                    d="M250 140 
                       C320 140 360 180 360 250 
                       C360 350 320 420 280 440 
                       C265 448 255 420 250 420 
                       C245 420 235 448 220 440 
                       C180 420 140 350 140 250 
                       C140 180 180 140 250 140 Z"
                    fill="#050b1a"
                    stroke="url(#cyanGlow)"
                    strokeWidth="8"
                    strokeLinejoin="round"
                />

                {/* INTERNAL CIRCUIT BOARD TRACES */}
                <g stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.9">
                    {/* Horizontal Main Bus */}
                    <path d="M190 230 H310" />
                    <path d="M190 260 H280" />
                    <path d="M190 290 H310" />

                    {/* Vertical Branching */}
                    <path d="M210 180 V230" />
                    <path d="M240 180 V210 H280 V180" />
                    <path d="M310 230 V320" />
                    <path d="M220 290 V360" />
                    <path d="M250 260 V330 H190 V360" />
                    <path d="M280 290 V360" />

                    {/* Circuit Nodes (Dots) */}
                    <circle cx="210" cy="180" r="4" fill="#22d3ee" />
                    <circle cx="240" cy="180" r="4" fill="#22d3ee" />
                    <circle cx="280" cy="180" r="4" fill="#22d3ee" />
                    <circle cx="310" cy="320" r="4" fill="#22d3ee" />
                    <circle cx="220" cy="360" r="4" fill="#22d3ee" />
                    <circle cx="190" cy="360" r="4" fill="#22d3ee" />
                    <circle cx="280" cy="360" r="4" fill="#22d3ee" />
                </g>
            </g>
        </svg>

        {/* The Reflection - matching bitmap exactly */}
        {showReflection && (
            <div className="w-full h-1/2 mt-4 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)] scale-y-[-1] grayscale">
                <svg viewBox="0 0 500 500" className="w-full h-full">
                    <use href="#toothMolarShape" />
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
                    {/* Abstract Tech Grid Background */}
                    <div className="absolute inset-0 opacity-[0.08]" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>

                    <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-600/10 to-transparent"></div>

                    <div className="absolute -top-[20%] -right-[10%] opacity-10 rotate-[15deg]">
                        <DentalLogoSVG className="h-[1200px] w-[1200px]" opacity={0.3} />
                    </div>

                    <div className="absolute top-1/4 left-1/4 w-[1200px] h-[1200px] bg-blue-600/5 blur-[300px] rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-cyan-600/5 blur-[250px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                                    <DentalLogoSVG className="h-6 w-6" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Relay Dental SaaS v2.0</span>
                                </div>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-white mb-12">
                                Never Miss <br />
                                <span className="text-blue-500 italic block mt-2">A New Patient.</span> <br />
                                Fill Every Chair.
                            </h1>

                            <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-xl mb-14 leading-relaxed">
                                Relay handles every inbound call, triages emergencies, and books restorative cases 24/7 — so Doctor, you <span className="text-white font-black underline decoration-blue-500 underline-offset-4">never leak production</span> to the clinic across the street.
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
            <section className="py-20 md:py-40 px-4 md:px-6 bg-[#030303] relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="bg-[#0a0a0f] border border-blue-500/20 p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_0_100px_rgba(59,130,246,0.1)] relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                            <DentalLogoSVG className="h-48 w-48" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Daily Inbound Calls</span>
                                        <span className="text-blue-400 font-black text-2xl">{callsPerDay}</span>
                                    </div>
                                    <input type="range" min="10" max="200" value={callsPerDay} onChange={e => setCallsPerDay(Number(e.target.value))} className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-600" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Unanswered Rate</span>
                                        <span className="text-rose-500 font-black text-2xl">{missedPercentage}%</span>
                                    </div>
                                    <input type="range" min="5" max="60" value={missedPercentage} onChange={e => setMissedPercentage(Number(e.target.value))} className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-rose-500" />
                                </div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Calculated based on average restorative production per operative hour.</p>
                            </div>

                            <div className="relative text-center p-8 md:p-14 bg-white/[0.03] rounded-[3rem] md:rounded-[4rem] border border-blue-500/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-blue-400">Monthly Revenue Leakage</p>
                                <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 text-white break-words">
                                    ${monthlyLoss.toLocaleString()}
                                </h3>
                                <button
                                    onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                    className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                                >
                                    Recover My Production
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4) THE "EVERYWHERE" BRANDING ── */}
            <section className="py-40 px-6 bg-[#030303] text-white border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                                AI Built For <br /><span className="text-blue-600 italic">Dental Reality.</span>
                            </h2>
                            <p className="text-slate-400 text-xl md:text-2xl font-medium mb-16 leading-relaxed">
                                Most AI receptionists are generic bots. Relay is hard-coded for dentistry. It knows the difference between a prophy and a root canal. It manages your operative hours like a professional.
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
                                "Schedule Sync",
                                "Emergency Triage",
                                "Insurance Logic",
                                "Patient Recall"
                            ].map((label, i) => (
                                <div key={i} className="relative aspect-square bg-[#08080c] rounded-[4rem] flex flex-col items-center justify-center p-8 border border-white/5 hover:border-blue-500/40 hover:bg-blue-600/[0.02] transition-all group overflow-hidden shadow-2xl">
                                    <div className="absolute top-8 left-0 right-0 text-center text-[9px] font-black text-blue-500/30 uppercase tracking-[0.5em] z-10">{label}</div>

                                    {/* CSS Reflection Effect to match bitmap */}
                                    <div className="relative group-hover:scale-110 transition-transform duration-500" style={{
                                        WebkitBoxReflect: 'below 0px linear-gradient(transparent, rgba(0,0,0,0.2))'
                                    }}>
                                        <DentalLogoSVG className="h-28 w-28 md:h-36 md:w-36" />
                                    </div>

                                    <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="px-4 py-1.5 bg-blue-600/20 rounded-full border border-blue-500/30 text-[8px] font-black text-blue-400 uppercase tracking-widest">Active Module</div>
                                    </div>
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
