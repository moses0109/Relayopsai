
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createPcmBlob, decode, decodeAudioData } from '../services/audioUtils';

const LiveDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (typeof window.aistudio !== 'undefined') {
        try {
          // @ts-ignore
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setNeedsKey(!hasKey);
        } catch (err) {
          console.error('Error checking API key status:', err);
        }
      }
    };
    checkKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    // @ts-ignore
    if (typeof window.aistudio !== 'undefined') {
      try {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setNeedsKey(false);
        // Successful after triggering openSelectKey, proceed to app.
        startDemo();
      } catch (err) {
        console.error('Error opening key dialog:', err);
      }
    }
  };

  const startDemo = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // @ts-ignore
      if (typeof window.aistudio !== 'undefined') {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setNeedsKey(true);
          setIsConnecting(false);
          return;
        }
      }
      
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      } catch (micErr: any) {
        throw new Error("Microphone access denied. Please allow permissions.");
      }

      // Create new instance right before making an API call to ensure it always uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: "You are the RelayAI Voice Assistant. You are a professional business receptionist. Your tone is warm, confident, and highly efficient. You are demonstrating the power of high-fidelity Voice AI to a potential business client. Be concise and professional.",
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            const source = inputContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputContextRef.current, 24000, 1);
              const source = outputContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputContextRef.current.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.inputTranscription?.text) {
               setTranscript(prev => [...prev.slice(-3), `YOU: ${message.serverContent?.inputTranscription?.text}`]);
            }
            if (message.serverContent?.outputTranscription?.text) {
               setTranscript(prev => [...prev.slice(-3), `RELAY: ${message.serverContent?.outputTranscription?.text}`]);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e: any) => {
            // Handle key reset if entity not found
            if (e.message?.includes("Requested entity was not found")) {
              setNeedsKey(true);
            }
            setError("Session timeout. Please restart the demo.");
            stopDemo();
          },
          onclose: () => stopDemo()
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setNeedsKey(true);
      }
      setError(err.message);
      setIsConnecting(false);
    }
  };

  const stopDemo = useCallback(() => {
    setIsActive(false);
    setIsConnecting(false);
    if (sessionRef.current) { try { sessionRef.current.close(); } catch {} sessionRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; }
    if (inputContextRef.current) { inputContextRef.current.close().catch(() => {}); inputContextRef.current = null; }
    if (outputContextRef.current) { outputContextRef.current.close().catch(() => {}); outputContextRef.current = null; }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch {} });
    sourcesRef.current.clear();
    setTranscript([]);
  }, []);

  return (
    <div className="bg-white/[0.01] border border-white/10 rounded-[3rem] p-12 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-700 shadow-2xl">
      <div className="absolute top-0 right-0 p-8">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-white/10'}`}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {needsKey ? (
          <div className="text-center py-12 flex flex-col items-center">
            <h3 className="text-xl font-black uppercase italic mb-4">Demo Authorization</h3>
            <p className="text-slate-500 text-xs mb-8 font-medium max-w-xs uppercase tracking-widest leading-relaxed">Please verify your session to interact with our Voice Engine.</p>
            <p className="text-[9px] text-slate-600 mb-6 uppercase tracking-tighter italic italic">Requires a paid project API key. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">Billing documentation</a></p>
            <button onClick={handleOpenKeyDialog} className="px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:scale-105 transition-all shadow-xl shadow-cyan-500/20">
              Unlock Demo
            </button>
          </div>
        ) : !isActive && !isConnecting ? (
          <div className="text-center flex flex-col items-center">
            <div className="w-24 h-24 mb-10 relative group">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full group-hover:scale-125 transition-transform duration-700 blur-2xl"></div>
              <button onClick={startDemo} className="relative w-full h-full bg-white rounded-full flex items-center justify-center text-black hover:bg-cyan-400 transition-colors shadow-2xl">
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Start Conversation</h3>
            <p className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase">Interactive Voice Test • Always Available</p>
          </div>
        ) : isConnecting ? (
          <div className="text-center py-16 flex flex-col items-center">
            <div className="w-16 h-16 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
            <p className="text-cyan-400 font-bold text-[10px] uppercase tracking-[0.4em] animate-pulse">Connecting to Engine...</p>
          </div>
        ) : (
          <div className="w-full space-y-12 flex flex-col items-center">
            <div className="flex justify-center items-center h-24 gap-1.5 w-full">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1.5 bg-cyan-500/40 rounded-full animate-waveform" style={{ height: `${Math.random()*60 + 20}%`, animationDelay: `${i*0.04}s` }}></div>
              ))}
            </div>

            <div className="bg-black/50 rounded-3xl p-8 border border-white/5 font-medium text-[11px] space-y-4 max-h-48 overflow-y-auto custom-scrollbar w-full">
              {transcript.map((line, idx) => (
                <div key={idx} className={line.startsWith('RELAY:') ? 'text-cyan-400' : 'text-slate-300'}>
                  <span className="font-bold">{line}</span>
                </div>
              ))}
              {transcript.length === 0 && <p className="text-slate-600 italic text-center">Speak now to interact with the AI...</p>}
            </div>

            <button onClick={stopDemo} className="block text-slate-500 hover:text-rose-400 transition-colors uppercase text-[9px] font-black tracking-[0.3em]">
              End Call Demo
            </button>
          </div>
        )}

        {error && <div className="mt-8 text-rose-500 text-[10px] font-bold uppercase tracking-widest">{error}</div>}
      </div>
      
      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4); }
        }
        .animate-waveform {
          animation: waveform 0.8s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LiveDemo;
