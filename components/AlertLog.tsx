
import React from 'react';
import { Alert, Severity } from '../types';

interface AlertLogProps {
  alerts: Alert[];
  onGenerateReport: (alert: Alert) => void;
  isLoadingReport: boolean;
}

const AlertLog: React.FC<AlertLogProps> = ({ alerts, onGenerateReport, isLoadingReport }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 flex flex-col h-full rounded overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 flex items-center gap-2">
          Historical Incident Database
        </h2>
        <div className="text-[9px] text-slate-600 font-mono flex items-center gap-4">
           <span>SQL_QUERY: 200 OK</span>
           <span>RECORDS: {alerts.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="text-[9px] uppercase text-slate-500 font-bold bg-slate-950/30 sticky top-0">
            <tr>
              <th className="px-5 py-2 border-b border-slate-800 w-32">Index/Time</th>
              <th className="px-5 py-2 border-b border-slate-800 w-24">Location</th>
              <th className="px-5 py-2 border-b border-slate-800">Event Signature</th>
              <th className="px-5 py-2 border-b border-slate-800 w-24">Priority</th>
              <th className="px-5 py-2 border-b border-slate-800 w-36 text-right">Intelligence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-[11px]">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-20 text-center text-slate-700 italic font-medium">
                  SYSTEM CLEAR: No active records in current session.
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-2.5 mono text-slate-500">{alert.time}</td>
                  <td className="px-5 py-2.5 font-bold text-slate-400">{alert.trackId}</td>
                  <td className="px-5 py-2.5 text-slate-300 tracking-tight">{alert.type}</td>
                  <td className="px-5 py-2.5">
                    <span className={`font-bold text-[9px] uppercase tracking-tighter ${
                      alert.severity === Severity.CRITICAL ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <button 
                      onClick={() => onGenerateReport(alert)}
                      disabled={isLoadingReport}
                      className="text-emerald-600 hover:text-emerald-400 font-bold text-[10px] uppercase tracking-tighter disabled:opacity-20 underline decoration-slate-800 underline-offset-4"
                    >
                      {isLoadingReport ? 'QUEUING...' : 'RUN_REPORT'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertLog;
