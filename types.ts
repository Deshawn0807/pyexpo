
export enum Severity {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL'
}

export interface Alert {
  id: string;
  time: string;
  trackId: string;
  type: string;
  severity: Severity;
  description: string;
}

export interface SystemStatus {
  humanDetected: boolean;
  confidence: number;
  lastUpdate: string;
  operationalStatus: Severity;
  trackId: string;
}
