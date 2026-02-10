
import React, { useState, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  FUTURISTIC AUDIO DEMO PLAYER                                       */
/*  Advanced UI with animated visualizer, pulsing effects, orbits      */
/* ------------------------------------------------------------------ */

const Samples: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = '/demo.mp3';
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setError(null);
      })
      .catch((err) => {
        console.error('Audio playback error:', err);
        setError('Missing: Add your demo.mp3 file to the public/ folder, then refresh this page.');
      });
  };

  // Generate random bar heights for visualizer
  const visualizerBars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: i * 0.05,
  }));

  return (
    <section id="demo" className="py-12 md:py-16 px-4 md:px-6 scroll-mt-24 relative overflow-hidden">
      {/* Animated background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] blur-[150px] rounded-full pointer-events-none transition-all duration-1000 ${
        isPlaying ? 'bg-cyan-500/20 scale-125' : 'bg-cyan-500/5'
      }`} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 leading-tight">
          Hear Your AI <br />
          <span className="gradient-relay">In Action.</span>
        </h2>

        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Listen to a real conversation between a business owner and our AI receptionist.
        </p>

        {/* Audio element */}
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

        {/* FUTURISTIC AUDIO PLAYER */}
        <div className="relative inline-block mb-8">
          {/* Outer rotating orbit rings */}
          <div className={`absolute inset-0 transition-all duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            {/* Ring 1 - slow rotation */}
            <div className="absolute inset-[-60px] md:inset-[-80px] border-2 border-cyan-400/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full blur-sm" />
            </div>
            {/* Ring 2 - medium rotation */}
            <div className="absolute inset-[-40px] md:inset-[-60px] border border-purple-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full blur-sm" />
            </div>
          </div>

          {/* Pulsing glow when playing */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isPlaying
              ? 'bg-gradient-to-r from-cyan-500/30 to-purple-600/30 blur-3xl animate-pulse scale-150'
              : 'opacity-0'
          }`} />

          {/* Audio visualizer bars */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] flex items-center justify-center">
              {visualizerBars.map((bar) => {
                const angle = (bar.id / visualizerBars.length) * 360;
                const radius = 140; // Adjust for mobile vs desktop
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={bar.id}
                    className="absolute w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full origin-bottom"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                      height: '20px',
                      animation: isPlaying ? 'audioBar 0.6s ease-in-out infinite' : 'none',
                      animationDelay: `${bar.delay}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Main play button */}
          <button
            onClick={togglePlay}
            className="relative group"
          >
            {/* Glass morphism background */}
            <div className={`relative w-32 h-32 md:w-44 md:h-44 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-xl border-2 ${
              isPlaying
                ? 'bg-black/40 border-cyan-400/50 shadow-[0_0_60px_rgba(6,182,212,0.4)] scale-110'
                : 'bg-black/60 border-white/20 hover:border-cyan-400/50 hover:bg-black/40 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
            }`}>

              {/* Inner glow circle */}
              <div className={`absolute inset-6 rounded-full transition-all duration-500 ${
                isPlaying
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-600/20 animate-pulse'
                  : 'bg-gradient-to-br from-white/5 to-white/10 group-hover:from-cyan-500/10 group-hover:to-purple-600/10'
              }`} />

              {/* Icon */}
              <div className="relative z-10">
                {isPlaying ? (
                  <svg className="w-10 h-10 md:w-14 md:h-14 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 md:w-14 md:h-14 text-white ml-1 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>

              {/* Scanning line effect when playing */}
              {isPlaying && (
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                </div>
              )}
            </div>

            {/* Corner accents */}
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-full transition-all duration-500 ${
              isPlaying ? 'border-cyan-400 opacity-100' : 'border-white/20 opacity-0 group-hover:opacity-50'
            }`} />
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-full transition-all duration-500 ${
              isPlaying ? 'border-purple-500 opacity-100' : 'border-white/20 opacity-0 group-hover:opacity-50'
            }`} />
          </button>
        </div>

        {/* Status label with glitch effect */}
        <div className="mb-8 h-8">
          <p className={`font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${
            isPlaying ? 'text-cyan-400' : 'text-white'
          }`}>
            {isPlaying ? (
              <span className="inline-flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
                PLAYING — CLICK TO PAUSE
              </span>
            ) : (
              'HEAR YOUR AI IN ACTION'
            )}
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="mt-8 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-rose-400 text-xs font-bold leading-relaxed">{error}</p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
          These are demo recordings. Every AI is fully customized to your business, scripts, and workflow.
        </p>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes audioBar {
          0%, 100% { height: 8px; opacity: 0.3; }
          50% { height: 32px; opacity: 1; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Samples;
