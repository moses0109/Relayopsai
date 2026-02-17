
import React from 'react';

const Logo: React.FC<{ className?: string, hideText?: boolean }> = ({ className = "h-12", hideText = false }) => {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                {/* Dark Background Circle to match imagery */}
                <div className="absolute inset-0 bg-[#030712] rounded-full border border-white/5 shadow-2xl"></div>

                {/* Outer Glow */}
                <div className="absolute inset-[-4px] bg-cyan-500/20 blur-xl rounded-full"></div>

                <svg viewBox="0 0 100 100" className="relative w-full h-full fill-none overflow-visible">
                    {/* Concentric Node Rings */}
                    <circle cx="50" cy="50" r="46" stroke="#1e40af" strokeWidth="0.5" strokeOpacity="0.4" />
                    <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.6" />

                    {/* Dots on outer ring */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                        <circle key={i} cx={50 + 46 * Math.cos(deg * Math.PI / 180)} cy={50 + 46 * Math.sin(deg * Math.PI / 180)} r="1.5" fill="#60a5fa" />
                    ))}

                    {/* Dots on inner ring */}
                    {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
                        <circle key={i} cx={50 + 38 * Math.cos(deg * Math.PI / 180)} cy={50 + 38 * Math.sin(deg * Math.PI / 180)} r="1.2" fill="#22d3ee" />
                    ))}

                    {/* Connection lines (simplified circuit look) */}
                    <path d="M50 4 Q75 10 90 25 M10 75 Q25 90 50 96" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.3" />

                    {/* Central Tooth with Circuit Design */}
                    <path
                        d="M50 20 C65 20 72 30 72 48 C72 65 65 78 55 83 C50 85 50 88 50 88 C50 88 50 85 45 83 C35 78 28 65 28 48 C28 30 35 20 50 20 Z"
                        fill="#0ea5e9"
                        fillOpacity="0.05"
                    />
                    <path
                        d="M50 20 C65 20 72 30 72 48 C72 65 65 78 55 83 C50 85 50 88 50 88 C50 88 50 85 45 83 C35 78 28 65 28 48 C28 30 35 20 50 20 Z"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                    />

                    {/* High-Fidelity Circuit Lines inside tooth */}
                    <g stroke="#22d3ee" strokeWidth="0.75" strokeOpacity="0.8" strokeLinecap="round">
                        <path d="M40 35 H60 M45 42 H55 M38 50 H62 M42 58 H58 M40 66 H60" />
                        <path d="M50 30 V75" />
                        <circle cx="50" cy="30" r="1.2" fill="#22d3ee" />
                        <circle cx="40" cy="35" r="1" fill="#22d3ee" />
                        <circle cx="60" cy="35" r="1" fill="#22d3ee" />
                        <circle cx="38" cy="50" r="1" fill="#22d3ee" />
                        <circle cx="62" cy="50" r="1" fill="#22d3ee" />
                    </g>
                </svg>
            </div>
            {!hideText && (
                <div className="flex flex-col leading-none">
                    <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">
                        Relay<span className="text-cyan-400">OpsAI</span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.45em] text-blue-500 mt-0.5">Dental</span>
                </div>
            )}
        </div>
    );
};

export default Logo;
