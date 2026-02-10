
import React, { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  INCOMING CALL POPUP                                                */
/*  Appears after scrolling, plays demo when accepted                  */
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

      // Show call popup after scrolling 1.5 viewports
      if (scrollPosition > windowHeight * 1.5 && !showCall && !isCallActive) {
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

    // Play audio
    if (audioRef.current) {
      audioRef.current.src = '/demo.mp3';
      audioRef.current.play().catch(err => {
        console.error('Audio playback error:', err);
      });
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
      {/* Audio element */}
      <audio
        ref={audioRef}
        onEnded={endCall}
      />

      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
        showCall || isCallActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={isCallActive ? endCall : declineCall} />

      {/* Phone UI */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[101] w-full max-w-md transition-transform duration-700 ease-out ${
        showCall || isCallActive ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="mx-4 mb-8 bg-gradient-to-b from-gray-900 to-black rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">

          {/* INCOMING CALL SCREEN */}
          {isRinging && (
            <div className="p-8 pb-12">
              {/* Status */}
              <div className="text-center mb-8">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  Incoming Call
                </p>
                <h3 className="text-white text-2xl font-black tracking-tight">
                  RelayOpsAI
                </h3>
                <p className="text-gray-500 text-sm mt-1">AI Receptionist</p>
              </div>

              {/* Animated Avatar */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-32 h-32 bg-cyan-400/20 rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
                    <div className="absolute w-40 h-40 bg-cyan-400/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                  </div>

                  {/* Avatar circle */}
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-gray-800 shadow-xl">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8">
                {/* Decline */}
                <button
                  onClick={declineCall}
                  className="group w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-all active:scale-95"
                >
                  <svg className="w-6 h-6 text-white rotate-135" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </button>

                {/* Accept */}
                <button
                  onClick={acceptCall}
                  className="group w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 transition-all active:scale-95 animate-pulse"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </button>
              </div>

              <p className="text-center text-gray-500 text-xs mt-8 font-bold uppercase tracking-widest">
                Swipe to answer
              </p>
            </div>
          )}

          {/* ACTIVE CALL SCREEN */}
          {isCallActive && (
            <div className="p-8 pb-12 bg-gradient-to-b from-emerald-900/20 to-transparent">
              {/* Status */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                    Call in Progress
                  </span>
                </div>
                <h3 className="text-white text-2xl font-black tracking-tight">
                  RelayOpsAI
                </h3>
                <p className="text-gray-400 text-sm mt-1">AI Receptionist Demo</p>
              </div>

              {/* Audio Waveform Visualization */}
              <div className="flex justify-center items-center gap-1 h-24 mb-12">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-400 to-emerald-400 rounded-full"
                    style={{
                      height: '40px',
                      animation: 'audioWave 0.8s ease-in-out infinite',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>

              {/* End Call Button */}
              <div className="flex justify-center">
                <button
                  onClick={endCall}
                  className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 transition-all active:scale-95"
                >
                  <svg className="w-8 h-8 text-white rotate-135" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </button>
              </div>

              <p className="text-center text-gray-500 text-xs mt-8 font-bold uppercase tracking-widest">
                Tap to end call
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes audioWave {
          0%, 100% { height: 8px; opacity: 0.4; }
          50% { height: 64px; opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default IncomingCall;
