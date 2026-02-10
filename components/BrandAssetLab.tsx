
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const BrandAssetLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);

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
      } catch (err) {
        console.error('Error opening key dialog:', err);
      }
    }
  };

  const generateAsset = async () => {
    if (!prompt) return;

    // Users MUST select their own API key for gemini-3-pro-image-preview
    // @ts-ignore
    if (typeof window.aistudio !== 'undefined') {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setNeedsKey(true);
        return;
      }
    }

    setIsLoading(true);
    try {
      // Create new instance right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: `High-fidelity modern business visual. Cinematic dark tech aesthetic. Subject: ${prompt}` }] },
        config: { imageConfig: { aspectRatio: '16:9', imageSize: '1K' } },
      });
      const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        setResult(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
      }
    } catch (err: any) {
      console.error(err);
      // Reset key selection if entity not found
      if (err.message?.includes("Requested entity was not found")) {
        setNeedsKey(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-black/40">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 hover:text-white transition-all mb-8"
        >
          {isOpen ? '[ Close Lab ]' : '[ Access Asset Lab ]'}
        </button>

        {isOpen && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {needsKey ? (
              <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] flex flex-col items-center">
                <h3 className="text-xl font-black uppercase italic mb-4">Laboratory Access Restricted</h3>
                <p className="text-slate-500 text-xs mb-8 font-medium max-w-xs uppercase tracking-widest leading-relaxed">
                  High-fidelity visuals require project-specific authorization. Please select a valid billing project API key.
                </p>
                <p className="text-[9px] text-slate-600 mb-6 uppercase tracking-tighter italic italic">
                  Requires a paid GCP project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">Billing documentation</a>
                </p>
                <button onClick={handleOpenKeyDialog} className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-all shadow-xl shadow-white/5">
                  Authorize Access
                </button>
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem]">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe a custom brand visual..."
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all min-h-[100px] resize-none mb-6"
                />
                <button 
                  onClick={generateAsset}
                  disabled={isLoading || !prompt}
                  className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] disabled:opacity-30"
                >
                  {isLoading ? 'Processing...' : 'Generate Visual'}
                </button>
              </div>
            )}
            {result && (
              <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/5">
                <img src={result} className="w-full h-full object-cover" alt="Asset" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandAssetLab;
