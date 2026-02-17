
import React, { useEffect, useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './Navbar';
import ChatWidget from './ChatWidget';
import IncomingCall from './IncomingCall';

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
        return Math.round(missedCalls * (avgCaseValue / 2));
    }, [callsPerDay, missedPercentage, avgCaseValue]);

    return (
        <div className="min-h-screen text-slate-900 bg-white flex flex-col font-sans selection:bg-blue-100 italic-none">
            <Navbar />
            <IncomingCall />

            {/* ── 1) HERO SECTION ── */}
            <header className="relative pt-32 pb-40 lg:pt-56 lg:pb-72 px-6 bg-white overflow-hidden">
                {/* Visual Background - Dental Office Texture */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
                        alt="Modern Dental Practice"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            {/* Dental Badge */}
                            <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Exclusively for Modern Dental Practices</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.9] text-slate-900 mb-10">
                                Never Miss Another <br />
                                <span className="text-blue-600 italic">High-Value Case</span> <br />
                                Again.
                            </h1>

                            {/* Subheadline */}
                            <p className="text-slate-600 text-lg md:text-2xl font-medium max-w-xl mb-12 leading-relaxed">
                                RelayOpsAI answers every call, books appointments, and confirms visits — so your practice <span className="text-slate-900 font-bold">stops leaking revenue</span> without hiring more staff.
                            </p>

                            {/* Bullet Proof Points */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                                {[
                                    "24/7 Call Answering",
                                    "Real-Time Appointment Booking",
                                    "Insurance & FAQ Handling",
                                    "SMS Confirmations + Reminders",
                                    "After-Hours & Lunch Coverage"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                                        <span className="text-slate-700 font-bold uppercase tracking-wide text-xs">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Primary CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <button
                                    onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                                    className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/30"
                                >
                                    Book My 30-Minute Setup Call
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute -inset-10 bg-blue-100/50 blur-[100px] rounded-full"></div>
                            <img
                                src="https://images.unsplash.com/photo-1606811841660-1b51e9dd2d47?auto=format&fit=crop&q=80&w=2070"
                                alt="Modern Dental Office"
                                className="relative rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/5] h-[600px] w-full"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2) THE PROBLEM SECTION ── */}
            <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6 font-serif italic">The Pain of Missed Calls</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
                            Your Front Desk <span className="text-rose-600">Can't Catch Every Call.</span>
                        </h3>
                        <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-3xl mx-auto">
                            And Every Missed Call Is Revenue Walking to Another Practice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            {[
                                "Lunch breaks & Staff meetings",
                                "After-hours & Weekend calls",
                                "Staff overwhelmed with in-office patients",
                                "Patients hang up after 30 seconds of holding",
                                "Voicemails that never get returned"
                            ].map((pain, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2.5"></div>
                                    <p className="text-xl text-slate-700 font-bold">{pain}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl text-center">
                            <p className="text-slate-500 font-black uppercase text-xs tracking-widest mb-4">A single missed new patient call can mean:</p>
                            <h4 className="text-5xl font-black text-rose-600 mb-6">$800 – $3,000+</h4>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-8 italic">in lifetime value.</p>
                            <div className="p-8 rounded-3xl bg-rose-50 text-rose-700 font-black uppercase tracking-tight leading-relaxed">
                                If you miss 2–3 calls per day, that's potentially $20k–$50k+ per month walking out the door.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3) THE SOLUTION ── */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">Our Solution</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 uppercase">
                            RelayOpsAI Acts Like a <br />
                            <span className="text-blue-600 italic">Trained Front Desk</span> — 24/7.
                        </h3>
                        <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
                            It doesn't just "answer calls." It handles the entire patient journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Books Appointments", desc: "Instantly books new patient appointments directly into your PMS schedule." },
                            { title: "Reschedules Cancellations", desc: "Handles patient changes and backfills cancellations to keep chairs full." },
                            { title: "Answers FAQ & Insurance", desc: "Provides detailed answers about insurance providers and practice protocols." },
                            { title: "Sends Confirmations", desc: "Automated SMS reminders and multi-touch confirmations slash no-shows." },
                            { title: "Transfers Urgent Calls", desc: "Smart logic identifies dental emergencies and routes them to your team." },
                            { title: "Zero Payroll Overhead", desc: "A world-class receptionist that never calls in sick or needs health insurance." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors group">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 font-black mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-slate-900">{item.title}</h4>
                                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-12">
                        {["No hold times.", "No voicemail black hole.", "No extra payroll."].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg font-black uppercase tracking-tight text-slate-900">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4) BEFORE vs AFTER ── */}
            <section className="py-32 px-6 bg-slate-900 text-white rounded-[4rem] mx-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">The Performance Shift</h2>
                        <div className="h-1 bg-blue-600 w-24 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {/* Before */}
                        <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 group hover:border-rose-500/30 transition-all">
                            <h4 className="text-2xl font-black uppercase tracking-tighter mb-10 text-rose-500 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 text-lg">✕</span>
                                Before RelayOpsAI
                            </h4>
                            <ul className="space-y-8">
                                {[
                                    "Missed calls during busy hours",
                                    "Overloaded front desk & hold times",
                                    "New patients go to local competitors",
                                    "No-show chaos and empty blocks",
                                    "Front desk staff burnout"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-5 text-slate-400 font-bold uppercase text-sm tracking-wide">
                                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* After */}
                        <div className="p-12 rounded-[3.5rem] bg-blue-600/10 border border-blue-500/30 group hover:border-blue-400 transition-all shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                            <h4 className="text-2xl font-black uppercase tracking-tighter mb-10 text-blue-400 flex items-center gap-4">
                                <span className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white text-lg">✓</span>
                                After RelayOpsAI
                            </h4>
                            <ul className="space-y-8">
                                {[
                                    "100% 24/7 call and text coverage",
                                    "Appointments booked automatically",
                                    "Reduced no-shows via smart reminders",
                                    "Front desk focuses on in-office patients",
                                    "Maximized chair utilization"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-5 text-white font-black uppercase text-sm tracking-wide">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5) ROI SNAPSHOT ── */}
            <section className="py-40 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 text-slate-900">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">How Much Revenue Are <br /><span className="text-rose-600">Missed Calls</span> Costing You?</h2>
                        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-slate-50 border border-slate-100 italic font-medium text-slate-600 text-lg leading-relaxed">
                            "Even a 3-chair practice missing 2 calls per day could lose 60+ patients per month, costing $40,000+ in production."
                        </div>
                    </div>

                    <div className="bg-[#0a192f] p-12 rounded-[4rem] text-white shadow-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-slate-300">
                            <div className="space-y-12">
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Incoming Calls / Day</span>
                                        <span className="text-blue-400 font-black">{callsPerDay}</span>
                                    </div>
                                    <input type="range" min="10" max="200" value={callsPerDay} onChange={e => setCallsPerDay(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Missed / After-Hours Rate</span>
                                        <span className="text-rose-400 font-black">{missedPercentage}%</span>
                                    </div>
                                    <input type="range" min="5" max="60" value={missedPercentage} onChange={e => setMissedPercentage(Number(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                                </div>
                            </div>
                            <div className="text-center p-12 bg-white/5 rounded-[3rem] border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-blue-400">Monthly Revenue Leakage</p>
                                <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white">${monthlyLoss.toLocaleString()}</h3>
                                <div className="h-1 bg-blue-600 w-16 mx-auto mb-6"></div>
                                <p className="text-sm text-slate-400 font-black uppercase tracking-widest leading-relaxed">
                                    Recover this with <br />
                                    <span className="text-white">RelayOpsAI 24/7 Answer</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6) BUILT FOR MODERN PRACTICES ── */}
            <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-6">Designed Specifically for <br /><span className="text-blue-600 italic">Dental Workflows</span></h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">This isn't generic AI. It's built for production per chair.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-slate-900">
                        {[
                            { title: "Understand Terminology", desc: "Recognizes hygiene codes, cosmetic inquiries, and dental emergency indicators." },
                            { title: "Direct PMS Sync", desc: "Native integrations with Dentrix, Open Dental, EagleSoft, and more." },
                            { title: "Secure & Compliant", desc: "HIPAA-grade security protocols for all patient communications and data." },
                            { title: "Vertical Specialization", desc: "Designed for practice growth and chair utilization metrics." }
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                <h4 className="font-black uppercase tracking-tight mb-4 text-slate-900">{s.title}</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7) TRUST / SCARCITY ── */}
            <section className="py-32 px-6 bg-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-blue-600 mb-8">Growth-Focused Partners Only</h2>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-10 leading-snug">
                        Now onboarding a limited number of dental practices for <span className="italic underline underline-offset-8 decoration-blue-500 decoration-4">founder-level pricing.</span>
                    </h3>
                    <p className="text-slate-500 text-lg font-medium mb-12 italic">
                        "We finally stopped coming in to a list of missed calls and started coming in to a full schedule. RelayOpsAI is a game changer for chair time."
                    </p>
                    <p className="text-sm font-black uppercase tracking-widest text-slate-900">— Dr. Sarah Jenkins, Practice Principal</p>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-40 px-6 bg-slate-900 text-white text-center rounded-t-[4rem]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                        Stop Losing Patients to <br /><span className="text-blue-500">Missed Calls.</span>
                    </h2>
                    <p className="text-slate-400 text-xl font-medium mb-12 uppercase tracking-widest max-w-2xl mx-auto">
                        Every unanswered call is production lost. RelayOpsAI ensures your phones are working for you 24/7.
                    </p>
                    <button
                        onClick={() => window.open('https://calendly.com/elironebusiness/15-minute-call-capture-setup', '_blank')}
                        className="px-16 py-8 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(37,99,235,0.3)]"
                    >
                        Book My 30-Minute Setup Call
                    </button>
                    <p className="mt-12 text-[10px] font-bold text-slate-500 uppercase tracking-[0.8em]">Rapid Deployment within 72 Hours.</p>
                </div>
            </section>

            <Analytics />
        </div>
    );
};

export default DentalPage;
