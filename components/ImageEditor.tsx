
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    setIsLoading(true);
    setResult(null);

    try {
      // Create a new instance right before the call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: mimeType } },
            { text: prompt }
          ],
        },
      });

      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResult(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          }
        }
      }
    } catch (err) {
      console.error('Image edit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="image-lab" className="py-24 bg-slate-950 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-6">VISUAL INTELLIGENCE</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Not just voice. Use our multimodal engine to edit brand assets, qualification documents, or marketing images on the fly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video bg-slate-900 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 transition-all overflow-hidden relative group"
            >
              {image ? (
                <img src={image} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" alt="Preview" />
              ) : (
                <div className="text-center p-8">
                  <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Drop image or click to upload</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Add a retro cinematic filter and enhance lighting'"
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 px-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button 
                onClick={handleEdit}
                disabled={isLoading || !image || !prompt}
                className="absolute right-3 top-3 bottom-3 px-6 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs disabled:opacity-50 hover:bg-slate-200 transition-all"
              >
                {isLoading ? 'Processing...' : 'Apply AI Edit'}
              </button>
            </div>
          </div>

          <div className="aspect-video bg-black border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative shadow-2xl shadow-purple-500/5">
            {result ? (
              <img src={result} className="w-full h-full object-cover animate-in fade-in duration-700" alt="Result" />
            ) : isLoading ? (
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-purple-400 font-bold uppercase tracking-widest text-xs animate-pulse">Neural Editing Active</p>
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-slate-700 font-black italic text-2xl uppercase tracking-tighter">Result Preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageEditor;
