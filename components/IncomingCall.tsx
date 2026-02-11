
import React, { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  INCOMING CALL NOTIFICATION                                         */
/*  Compact banner slides from top like a real phone notification       */
/* ------------------------------------------------------------------ */

const IncomingCall: React.FC = () => {
  const [showCall, setShowCall] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDismissed, setCallDismissed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (callDismissed) return;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 3.5 && !showCall && !isCallActive) {
        setShowCall(true);
        setIsRinging(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCall, isCallActive, callDismissed]);

  const acceptCall = () => {
    setIsRinging(false);
    setIsCallActive(true);
    if (audioRef.current) {
      audioRef.current.src = '/demo.mp3';
      audioRef.current.play().catch(err => console.error('Audio error:', err));
    }
  };

  const declineCall = () => {
    setShowCall(false);
    setIsRinging(false);
    setCallDismissed(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setShowCall(false);
    setCallDismissed(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (!showCall && !isCallActive) return null;

  return (
    <>
      <audio ref={audioRef} onEnded={endCall} />

      {/* Slim overlay — only when active call */}
      {isCallActive && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-500" onClick={endCall} />
      )}

      {/* TOP NOTIFICATION BANNER */}
      <div className={`fixed top-0 left-0 right-0 z-[101] transition-transform duration-500 ease-out ${
        showCall || isCallActive ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="mx-3 mt-3 md:mx-auto md:max-w-md">

          {/* RINGING STATE — compact notification */}
          {isRinging && (
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-4 call-slide-in">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/20 phone-vibrate">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  {/* Ring ripple */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 ring-expand" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Incoming Call</p>
                  <p className="text-white text-sm font-black tracking-tight truncate">RelayOpsAI Demo</p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={declineCall} className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center active:scale-90 transition-all">
                    <svg className="w-4 h-4 text-white rotate-135" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </button>
                  <button onClick={acceptCall} className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-emerald-500/30 accept-pulse">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE CALL STATE — compact bar */}
          {isCallActive && (
            <div className="bg-emerald-900/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest">Live — RelayOpsAI</p>
                  <div className="flex items-center gap-[2px] h-4 mt-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-[2px] bg-emerald-400/80 rounded-full" style={{
                        height: '12px',
                        animation: 'miniWave 0.6s ease-in-out infinite',
                        animationDelay: `${i * 0.04}s`,
                      }} />
                    ))}
                  </div>
                </div>

                <button onClick={endCall} className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center active:scale-90 transition-all">
                  <svg className="w-4 h-4 text-white rotate-135" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ringExpand {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes phoneVibrate {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-3deg); }
          20% { transform: rotate(3deg); }
          30% { transform: rotate(-2deg); }
          40% { transform: rotate(2deg); }
          50% { transform: rotate(0deg); }
        }
        @keyframes acceptPulse {
          0%, 100% { box-shadow: 0 4px 6px -1px rgba(16,185,129,0.3); }
          50% { box-shadow: 0 4px 15px -1px rgba(16,185,129,0.6); }
        }
        @keyframes miniWave {
          0%, 100% { height: 3px; opacity: 0.4; }
          50% { height: 14px; opacity: 1; }
        }
        @keyframes callSlideIn {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .ring-expand { animation: ringExpand 1.5s ease-out infinite; }
        .phone-vibrate { animation: phoneVibrate 0.8s ease-in-out infinite; }
        .accept-pulse { animation: acceptPulse 1.2s ease-in-out infinite; }
        .call-slide-in { animation: callSlideIn 0.4s ease-out; }
      `}</style>
    </>
  );
};

export default IncomingCall;
