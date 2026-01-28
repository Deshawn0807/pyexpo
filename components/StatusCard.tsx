
import React from 'react';
import { SystemStatus, Severity } from '../types';

interface StatusCardProps {
  status: SystemStatus;
  onToggleSim: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, onToggleSim }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 flex flex-col h-full rounded">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 flex items-center gap-2">
          Telemetry & Diagnostics
        </h2>
      </div>

      <div className="p-6 space-y-5 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Detection Status</label>
            <div className={`text-sm font-bold mono ${status.humanDetected ? 'text-red-500' : 'text-emerald-500'}`}>
              {status.humanDetected ? 'INTRUSION' : 'NOMINAL'}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <label className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Active Track</label>
            <div className="text-sm font-bold text-slate-300 mono">{status.trackId}</div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-[9px] text-slate-500 uppercase font-bold">
            <span>Model Confidence</span>
            <span className="mono text-slate-300">{status.confidence}%</span>
          </div>
          <div className="w-full h-1 bg-slate-800 overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ${status.humanDetected ? 'bg-red-500' : 'bg-emerald-500'}`} 
              style={{ width: `${status.confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold">Processors</span>
            <span className="text-[10px] text-emerald-500 mono font-bold tracking-tighter">ONLINE</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold">Sensors (04/04)</span>
            <span className="text-[10px] text-emerald-500 mono font-bold tracking-tighter">CALIBRATED</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-950/50 border-t border-slate-800">
        <button 
          onClick={onToggleSim}
          className={`w-full py-2.5 rounded text-[10px] font-bold tracking-[0.1em] transition-all border ${
            status.operationalStatus === Severity.SAFE 
            ? 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-300' 
            : 'bg-red-950/20 border-red-500 text-red-500 hover:bg-red-900/30'
          }`}
        >
          {status.operationalStatus === Severity.SAFE ? 'TRIGGER TEST EVENT' : 'ACKNOWLEDGE & RESET'}
        </button>
      </div>
    </div>
  );
};

export default StatusCard;
