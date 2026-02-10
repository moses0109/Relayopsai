
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, decodeAudioData } from '../services/audioUtils';

const MultiSpeakerDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'Agent' | 'Customer' | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      // Create a new instance right before the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Generate a 15-second realistic dialogue between:
      Sarah (RelayAI Agent): Professional, warm, efficient.
      Mark (Customer): Business owner asking about receptionist capacity.
      
      Sarah: Hello Mark! I noticed you were exploring our receptionist workflows. How can RelayAI help automate your inbound calls today?
      Mark: Hey Sarah. Yeah, I'm wondering if you can handle our high-volume support tickets and sync them to HubSpot?
      Sarah: Absolutely. We handle unlimited concurrent streams and update your CRM in real-time. Shall I set up an integration trial?
      Mark: That sounds perfect, let's do it.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: [
                {
                  speaker: 'Sarah',
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
                },
                {
                  speaker: 'Mark',
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                }
              ]
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio generated");

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioContextRef.current,
        24000,
        1
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      sourceRef.current = source;
      source.onended = () => {
        setIsPlaying(false);
        setCurrentSpeaker(null);
      };

      setIsPlaying(true);
      setIsLoading(false);
      source.start(0);

      setTimeout(() => setCurrentSpeaker('Agent'), 0);
      setTimeout(() => setCurrentSpeaker('Customer'), 4000);
      setTimeout(() => setCurrentSpeaker('Agent'), 8000);
      setTimeout(() => setCurrentSpeaker('Customer'), 12000);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const stopConversation = () => {
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch {}
    }
    setIsPlaying(false);
    setCurrentSpeaker(null);
  };

  return (
    <section id="dialogue" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter uppercase leading-none">The Interaction</h2>
          <p className="text-slate-400 text-lg">Experience the RelayAI human cadence in a real business scenario.</p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 backdrop-blur-md shadow-2xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className={`flex flex-col items-center transition-all duration-500 ${currentSpeaker === 'Agent' ? 'scale-110' : 'opacity-40 grayscale'}`}>
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-cyan-500/20 border-2 border-white/20">
                <span className="text-2xl font-black italic">R</span>
              </div>
              <span className="font-bold text-white tracking-widest text-xs uppercase">Sarah (RelayAI Agent)</span>
            </div>

            <div className="relative z-10">
              {isLoading ? (
                <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-cyan-500 animate-spin"></div>
              ) : isPlaying ? (
                <button 
                  onClick={stopConversation}
                  className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600 transition-all transform hover:scale-110"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
              ) : (
                <button 
                  onClick={startConversation}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition-all transform hover:scale-110 shadow-2xl"
                >
                  <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              )}
            </div>

            <div className={`flex flex-col items-center transition-all duration-500 ${currentSpeaker === 'Customer' ? 'scale-110' : 'opacity-40 grayscale'}`}>
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4 border-2 border-white/10">
                <span className="text-2xl font-bold text-slate-300">MC</span>
              </div>
              <span className="font-bold text-slate-400 tracking-widest text-xs uppercase">Mark (CEO)</span>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase italic">Proprietary Multi-Speaker Synthesis • Ultra-Low Latency</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiSpeakerDemo;
