
import React from 'react';

const Logo: React.FC<{ className?: string, hideText?: boolean }> = ({ className = "h-10", hideText = false }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>

                <svg viewBox="0 0 100 100" className="relative w-full h-full fill-none">
                    {/* Concentric Circles of Nodes */}
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" className="text-blue-400" />
                    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" className="text-blue-500" />

                    {/* Node Dots & Lines */}
                    <g className="text-blue-400">
                        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                            <React.Fragment key={i}>
                                <circle cx={50 + 45 * Math.cos(deg * Math.PI / 180)} cy={50 + 45 * Math.sin(deg * Math.PI / 180)} r="1.5" fill="currentColor" />
                                <circle cx={50 + 38 * Math.cos((deg + 30) * Math.PI / 180)} cy={50 + 38 * Math.sin((deg + 30) * Math.PI / 180)} r="1" fill="currentColor" />
                            </React.Fragment>
                        ))}
                    </g>

                    {/* Tooth Shape */}
                    <path
                        d="M50 25 C65 25 70 35 70 50 C70 65 65 75 55 80 C50 82 50 85 50 85 C50 85 50 82 45 80 C35 75 30 65 30 50 C30 35 35 25 50 25 Z"
                        fill="currentColor"
                        className="text-blue-500"
                        fillOpacity="0.1"
                    />
                    <path
                        d="M50 25 C65 25 70 35 70 50 C70 65 65 75 55 80 C50 82 50 85 50 85 C50 85 50 82 45 80 C35 75 30 65 30 50 C30 35 35 25 50 25 Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-400"
                    />

                    {/* Circuit Lines inside tooth */}
                    <path d="M40 40 H60 M45 50 H55 M40 60 H60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" className="text-blue-200" strokeLinecap="round" />
                    <path d="M50 35 V75" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" className="text-blue-200" strokeLinecap="round" />
                </svg>
            </div>
            {!hideText && (
                <div className="flex flex-col leading-none">
                    <span className="text-lg md:text-xl font-black uppercase italic tracking-tighter text-white">RelayOpsAI</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Dental</span>
                </div>
            )}
        </div>
    );
};

export default Logo;
