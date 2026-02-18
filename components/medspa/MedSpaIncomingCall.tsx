import React, { useState, useEffect } from 'react';

/* ------------------------------------------------------------------ */
/*  MED SPA INCOMING CALL — Loss Aversion / Pain Point Animation    */
/* ------------------------------------------------------------------ */

const MedSpaIncomingCall: React.FC = () => {
  const [showCall, setShowCall] = useState(false);
  const [currentCall, setCurrentCall] = useState(0);

  const calls = [
    {
      name: "Botox Consultation",
      number: "(212) 555-0142",
      status: "MISSED CALL",
      value: "$1,800 Lost",
      time: "11:47 PM"
    },
    {
      name: "New Client Inquiry",
      number: "(917) 555-0198",
      status: "LINE BUSY",
      value: "$2,200 Lost",
      time: "After Hours"
    },
    {
      name: "Filler Appointment",
      number: "(646) 555-0173",
      status: "NO ANSWER",
      value: "$1,650 Lost",
      time: "7:23 PM"
    },
    {
      name: "Rebooking Request",
      number: "(347) 555-0156",
      status: "UNANSWERED",
      value: "$980 Lost",
      time: "6:45 PM"
    }
  ];

  useEffect(() => {
    // Show call after 3 seconds
    const showTimer = setTimeout(() => setShowCall(true), 3000);

    // Hide call after 8 seconds
    const hideTimer = setTimeout(() => setShowCall(false), 8000);

    // Cycle through different calls every 15 seconds
    const cycleTimer = setInterval(() => {
      setCurrentCall((prev) => (prev + 1) % calls.length);
      setShowCall(true);
      setTimeout(() => setShowCall(false), 5000);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(cycleTimer);
    };
  }, []);

  const call = calls[currentCall];

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${
        showCall
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* Phone Card - Med Spa Theme */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-rose-500/30 w-80">
        {/* Pulsing ring indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4">
          <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-rose-500 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              {call.status}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-semibold">{call.time}</span>
        </div>

        {/* Caller Info */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{call.name}</p>
              <p className="text-slate-400 text-xs">{call.number}</p>
            </div>
          </div>

          {/* Lost Value Badge - PAIN POINT */}
          <div className="bg-rose-500/20 border border-rose-500/40 rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-0.5">Revenue Lost</p>
              <p className="text-white text-xl font-black">{call.value}</p>
            </div>
            <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Call Actions (Disabled - showing they missed it) */}
        <div className="flex gap-3">
          <button
            disabled
            className="flex-1 py-3 bg-slate-700/50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wide cursor-not-allowed opacity-50"
          >
            Too Late
          </button>
          <button
            disabled
            className="flex-1 py-3 bg-rose-500/30 text-rose-300 rounded-full text-xs font-bold uppercase tracking-wide cursor-not-allowed opacity-50"
          >
            Can't Answer
          </button>
        </div>

        {/* Bottom message */}
        <p className="text-center text-xs text-slate-500 mt-4 font-semibold">
          This happens 127 times per month
        </p>
      </div>
    </div>
  );
};

export default MedSpaIncomingCall;
