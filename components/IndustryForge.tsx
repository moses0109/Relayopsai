
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface Scenario {
  id: string;
  icon: string;
  industry: string;
  case: string;
  intents: string[];
  systemPrompt: string;
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    id: 'pizza',
    icon: '🍕',
    industry: 'Pizza Shop',
    case: 'Order Taking',
    intents: ['Take Orders', 'Menu Questions', 'Delivery ETA'],
    systemPrompt: `You are the AI receptionist for Mario's Pizza Shop. Your job is to take pizza orders, answer menu questions, and provide delivery estimates. Be friendly and efficient. Menu: Cheese ($12), Pepperoni ($14), Supreme ($16), Veggie ($15). Delivery takes 30-45 minutes. Always confirm the order and ask for delivery address and phone number.`
  },
  {
    id: 'salon',
    icon: '💇',
    industry: 'Hair Salon',
    case: 'Appointment Booking',
    intents: ['Book Haircut', 'Color Consult', 'Reschedule'],
    systemPrompt: `You are the AI receptionist for Glam Hair Salon. Book appointments for haircuts, coloring, styling. Services: Haircut ($50, 1hr), Full Color ($120, 2hrs), Highlights ($150, 3hrs). Available Mon-Sat 9am-6pm. Get client name, service, preferred date/time, and phone number. Be warm and professional.`
  },
  {
    id: 'hvac',
    icon: '🛠️',
    industry: 'HVAC',
    case: 'Emergency Dispatch',
    intents: ['Urgent Repair', 'Maintenance Quote', 'Billing FAQ'],
    systemPrompt: `You are the AI dispatcher for CoolAir HVAC. Handle emergency AC/heating repairs, schedule maintenance, and answer billing questions. Emergency service available 24/7. Regular maintenance $199. Emergency calls prioritized within 2 hours. Get customer name, address, issue description, and callback number.`
  },
  {
    id: 'dental',
    icon: '🦷',
    industry: 'Dental Office',
    case: 'Patient Scheduling',
    intents: ['Book Cleaning', 'Emergency Help', 'Insurance Check'],
    systemPrompt: `You are the AI receptionist for Bright Smile Dental. Schedule cleanings, handle dental emergencies, verify insurance. Services: Cleaning ($150, 1hr), Exam ($75), Emergency same-day available. Hours: Mon-Fri 8am-5pm. Get patient name, insurance, preferred appointment time, and contact info.`
  },
  {
    id: 'fitness',
    icon: '💪',
    industry: 'Fitness Gym',
    case: 'Membership Sales',
    intents: ['Join Gym', 'Class Schedule', 'Personal Training'],
    systemPrompt: `You are the AI receptionist for PowerFit Gym. Sign up new members, share class schedules, book personal training. Memberships: Basic ($29/mo), Premium ($49/mo with classes), Elite ($79/mo with PT). Classes daily at 6am, 12pm, 6pm. Get prospect name, goals, and contact to schedule tour.`
  },
  {
    id: 'restaurant',
    icon: '🍽️',
    industry: 'Restaurant',
    case: 'Reservation Desk',
    intents: ['Book Table', 'Party Size', 'Menu Info'],
    systemPrompt: `You are the AI host for The Garden Bistro. Take reservations, accommodate party sizes, answer menu questions. Open Tue-Sun 5pm-10pm. Parties up to 12 guests. Popular dishes: Filet Mignon ($42), Salmon ($28), Vegetarian Pasta ($24). Get guest name, party size, date/time, and phone number.`
  },
  {
    id: 'realestate',
    icon: '🏢',
    industry: 'Real Estate',
    case: 'Showing Scheduler',
    intents: ['Schedule Showing', 'Pricing Info', 'Open House'],
    systemPrompt: `You are the AI assistant for Summit Realty. Schedule property showings, provide pricing info, share open house times. Be professional and capture lead details. Get client name, property interest, budget range, preferred showing times, and contact info. Showings available daily 9am-7pm.`
  },
  {
    id: 'auto',
    icon: '🚗',
    industry: 'Auto Repair',
    case: 'Service Booking',
    intents: ['Oil Change', 'Diagnostics', 'Parts Inquiry'],
    systemPrompt: `You are the AI service advisor for QuickFix Auto. Book oil changes ($49), diagnostics ($89), and general repairs. Hours: Mon-Sat 7am-6pm. Most services same-day. Get customer name, vehicle make/model/year, issue description, preferred date, and callback number.`
  },
];

const IndustryForge: React.FC = () => {
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [generatedScenarios, setGeneratedScenarios] = useState<Scenario[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Chat state
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const displayScenarios = useMemo(() => {
    const combined = [...generatedScenarios, ...PRESET_SCENARIOS];
    if (!search.trim()) return combined.slice(0, 8);
    return combined.filter(s =>
      s.industry.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, generatedScenarios]);

  const handleGenerate = async () => {
    const query = search.trim();
    if (!query) return;

    const alreadyExists = [...PRESET_SCENARIOS, ...generatedScenarios].some(
      s => s.industry.toLowerCase() === query.toLowerCase()
    );
    if (alreadyExists) {
      setError(`Industry "${query}" already exists.`);
      return;
    }

    setLoadingId('forging');
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 3 call intents and a system prompt for a Voice AI receptionist in the "${query}" industry. Format as JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              case: { type: Type.STRING, description: 'Short use case name' },
              intents: { type: Type.ARRAY, items: { type: Type.STRING } },
              emoji: { type: Type.STRING },
              systemPrompt: { type: Type.STRING, description: 'AI agent instructions' }
            },
            required: ['case', 'intents', 'emoji', 'systemPrompt']
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      const newScenario: Scenario = {
        id: `gen-${Date.now()}`,
        industry: query.charAt(0).toUpperCase() + query.slice(1),
        icon: data.emoji || '🤖',
        case: data.case || 'General Support',
        intents: data.intents || ['Inbound Lead', 'Question Routing', 'Appointment'],
        systemPrompt: data.systemPrompt || `You are an AI receptionist for a ${query} business. Be helpful and professional.`
      };

      setGeneratedScenarios(prev => [newScenario, ...prev]);
    } catch (err) {
      setError("AI Forge high-load. Try again in 10s.");
    } finally {
      setLoadingId(null);
    }
  };

  const openChat = (scenario: Scenario) => {
    setActiveChatId(scenario.id);
    setMessages([
      {
        role: 'bot',
        text: `Hello! I'm the AI receptionist for ${scenario.industry}. How can I help you today?`
      }
    ]);
    setInput('');
  };

  const closeChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !activeChatId) return;

    const activeScenario = [...generatedScenarios, ...PRESET_SCENARIOS].find(s => s.id === activeChatId);
    if (!activeScenario) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'bot', text: '' }]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const streamResponse = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          systemInstruction: activeScenario.systemPrompt,
        },
      });

      let fullText = '';
      for await (const chunk of streamResponse) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "I'm experiencing high demand right now. Please book a consultation to speak with our team directly!";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const activeScenario = [...generatedScenarios, ...PRESET_SCENARIOS].find(s => s.id === activeChatId);

  return (
    <section id="sectors" className="py-32 px-6 scroll-mt-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6 leading-tight">
              Try Our AI <br /><span className="gradient-relay">In Action.</span>
            </h2>
            <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-6 max-w-xl">
               <p className="text-slate-300 text-sm font-bold uppercase tracking-tight leading-relaxed">
                 Click any business below to chat with a live AI demo. Your real AI will be custom-built for your specific business.
               </p>
            </div>
          </div>

          <div className="w-full md:w-96 relative">
             <input
               type="text"
               placeholder="Search or Forge any industry..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
               className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-700 font-bold"
             />
             <button
               onClick={handleGenerate}
               disabled={loadingId === 'forging' || !search.trim()}
               className="absolute right-3 top-2.5 bottom-2.5 bg-white text-black px-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-cyan-400 transition-colors disabled:opacity-30"
             >
               {loadingId === 'forging' ? 'Forging...' : 'Forge'}
             </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 text-rose-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayScenarios.length > 0 ? displayScenarios.map((s) => (
            <div
              key={s.id}
              className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] transition-all flex flex-col gap-6 relative overflow-hidden group hover:border-cyan-500/30 hover:bg-white/[0.05]"
            >
              <div className="flex justify-between items-start">
                <span className="text-4xl">{s.icon}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-black uppercase italic text-white mb-1">{s.industry}</h4>
                <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-4">{s.case}</p>
                <div className="space-y-2">
                   {s.intents.map((intent, idx) => (
                     <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{intent}</span>
                     </div>
                   ))}
                </div>
              </div>
              <button
                onClick={() => openChat(s)}
                className="w-full py-4 bg-cyan-500 text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Chat Now →
              </button>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">No match. Type an industry above to Forge a new agent demo.</p>
            </div>
          )}
        </div>
      </div>

      {/* CHAT MODAL */}
      {activeChatId && activeScenario && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl h-[700px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                  {activeScenario.icon}
                </div>
                <div>
                  <span className="font-black italic uppercase tracking-tighter block text-lg text-white">{activeScenario.industry}</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">AI Demo Active</span>
                </div>
              </div>
              <button onClick={closeChat} className="text-slate-500 hover:text-white transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm leading-relaxed font-bold shadow-sm ${m.role === 'user' ? 'bg-white text-black' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
                    {m.text || (i === messages.length - 1 && isLoading ? "Thinking..." : "")}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-black border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Message ${activeScenario.industry} AI...`}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm text-white focus:outline-none focus:border-white/20 transition-all pr-16"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-3 top-3 bottom-3 px-4 bg-cyan-500 text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 font-black"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default IndustryForge;
