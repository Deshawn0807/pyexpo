
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LiveFeed from './components/LiveFeed';
import StatusCard from './components/StatusCard';
import AlertLog from './components/AlertLog';
import { Severity, Alert, SystemStatus } from './types';
import { generateSafetyReport } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    humanDetected: false,
    confidence: 99.4,
    lastUpdate: new Date().toLocaleTimeString(),
    operationalStatus: Severity.SAFE,
    trackId: 'TRK-552-B'
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isProcessingReport, setIsProcessingReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSimulation = useCallback(() => {
    setStatus(prev => {
      const isNowDanger = !prev.humanDetected;
      
      if (isNowDanger) {
        const newAlert: Alert = {
          id: Math.random().toString(36).substr(2, 9),
          time: new Date().toLocaleTimeString(),
          trackId: prev.trackId,
          type: 'UNAUTHORIZED_ENTRY_STERILE_ZONE',
          severity: Severity.CRITICAL,
          description: 'AI visual recognition confirmed human presence on Track 552-B. Automated safety protocols initiated.'
        };
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      }

      return {
        ...prev,
        humanDetected: isNowDanger,
        operationalStatus: isNowDanger ? Severity.CRITICAL : Severity.SAFE,
        confidence: isNowDanger ? 97.8 : 99.9
      };
    });
  }, []);

  const handleGenerateReport = async (alert: Alert) => {
    setIsProcessingReport(true);
    const report = await generateSafetyReport(alert);
    setSelectedReport(report || "Error generating report.");
    setIsProcessingReport(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      <Header status={status.operationalStatus} />
      
      <main className="flex-1 p-4 grid grid-cols-12 gap-4 max-w-[1920px] mx-auto w-full overflow-hidden">
        {/* Left Side: Feed and Alerts */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4 min-h-0">
          <div className="flex-shrink-0">
            <LiveFeed 
              isDanger={status.humanDetected} 
              confidence={status.confidence} 
            />
          </div>

          <div className="flex-1 min-h-[300px]">
            <AlertLog 
              alerts={alerts} 
              onGenerateReport={handleGenerateReport} 
              isLoadingReport={isProcessingReport}
            />
          </div>
        </div>

        {/* Right Side: Status and Reports */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="flex-shrink-0">
            <StatusCard 
              status={status} 
              onToggleSim={toggleSimulation} 
            />
          </div>

          {/* Report Display - Integrated into the sidebar layout */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded p-4 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4 flex items-center gap-2">
              Analytic Insight Panel
            </h3>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {selectedReport ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="text-[11px] text-emerald-400 font-mono mb-2 uppercase tracking-tighter">[GEMINI_AI_REPORT_GEN_SUCCESS]</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    {selectedReport}
                  </p>
                  <button 
                    onClick={() => setSelectedReport(null)}
                    className="text-[9px] text-slate-600 hover:text-slate-400 font-bold uppercase tracking-widest mt-4"
                  >
                    CLOSE_ANALYSIS
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center mb-3">
                    <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">
                    Awaiting incident selection for deep analysis
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="h-10 px-6 border-t border-slate-900 bg-slate-950 flex items-center justify-between text-[9px] text-slate-700 font-bold uppercase tracking-[0.25em]">
        <div>RAILSAFE_SECURE_KERNEL v3.1.0 // ALL SYSTEMS NOMINAL</div>
        <div className="flex gap-8 items-center">
            <span>Uptime: 243d 11h 04m</span>
            <div className="flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-emerald-900 rounded-full"></div>
                <span>Sync Status: Verified</span>
            </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
};

export default App;
