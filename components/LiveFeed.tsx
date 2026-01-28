
import React from 'react';

interface LiveFeedProps {
  isDanger: boolean;
  confidence: number;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ isDanger, confidence }) => {
  return (
    <div className="relative aspect-video bg-black rounded border border-slate-800 overflow-hidden">
      {/* Simulation Image */}
      <img 
        src={isDanger ? "https://images.unsplash.com/photo-1515165562839-978bbcf18277?q=80&w=1280&h=720&auto=format&fit=crop" : "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1280&h=720&auto=format&fit=crop"} 
        alt="Railway Feed" 
        className={`w-full h-full object-cover transition-all duration-700 ${isDanger ? 'grayscale-0' : 'grayscale brightness-50'}`}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* AI Bounding Boxes */}
      {isDanger && (
        <div className="absolute top-[25%] left-[40%] w-24 h-56 border border-red-500">
          <div className="absolute -top-5 left-0 bg-red-600 text-white text-[9px] font-mono px-1">
            OBJ_HUMAN_01 [{confidence}%]
          </div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-red-500"></div>
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-red-500"></div>
        </div>
      )}

      {/* Interface Elements */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-2 py-1">
          <div className={`h-1.5 w-1.5 rounded-full ${isDanger ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">CAM-04 [PRIMARY]</span>
        </div>
        <div className="bg-slate-950/80 border border-slate-800 px-2 py-1">
          <span className="text-[9px] font-mono text-slate-400 uppercase">FOV: 84.2° | RES: 1080P</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-4">
         <div className="text-[9px] font-mono text-slate-500 bg-black/40 px-1 uppercase">LATENCY: 14ms</div>
         <div className="text-[9px] font-mono text-slate-500 bg-black/40 px-1 uppercase">BUFFER: OPTIMAL</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 bg-slate-950/80 border border-slate-800 px-2 py-0.5">
        REC_STAMP: {new Date().toISOString().split('T')[1].slice(0, 11)}
      </div>

      {/* Frame border */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
    </div>
  );
};

export default LiveFeed;
