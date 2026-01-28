
import React from 'react';
import { Severity } from '../types';

interface HeaderProps {
  status: Severity;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case Severity.CRITICAL:
        return { color: 'bg-red-950/40 text-red-400 border-red-900/50', label: 'CRITICAL ALERT' };
      case Severity.WARNING:
        return { color: 'bg-amber-950/40 text-amber-400 border-amber-900/50', label: 'WARNING' };
      default:
        return { color: 'bg-slate-900/60 text-emerald-500 border-slate-800', label: 'SYSTEM SAFE' };
    }
  };

  const config = getStatusConfig();

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-xs font-bold tracking-[0.2em] text-slate-200 uppercase leading-none">
            Railway Safety Terminal
          </h1>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">
            Institutional Monitoring Interface V3.1.0
          </span>
        </div>
        <div className="h-6 w-px bg-slate-800 ml-2"></div>
        <div className="text-[10px] text-slate-400 mono uppercase tracking-tight">
          NODE: DX-552-PERIMETER
        </div>
      </div>
      
      <div className={`flex items-center px-3 py-1 rounded border text-[10px] font-bold tracking-widest ${config.color} transition-colors duration-300`}>
        <div className={`h-1.5 w-1.5 rounded-full mr-2 ${
          status === Severity.CRITICAL ? 'bg-red-500' : status === Severity.WARNING ? 'bg-amber-500' : 'bg-emerald-500'
        }`}></div>
        {config.label}
      </div>
    </header>
  );
};

export default Header;
