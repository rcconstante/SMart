export interface SensorData {
  temperature: number;
  humidity: number;
  co2: number;
  light: number;
  noise: number;
  airQuality: number;
}

export interface EngagementData {
  totalStudents: number;
  avgEngagement: number; // Percentage 0-100
  occupancyStatus: 'Low' | 'Medium' | 'High';
  emotionBreakdown: {
    happy: number;
    neutral: number;
    surprised: number;
    sad: number;
    angry: number;
  };
}

export interface ChartDataPoint {
  time: string;
  value: number;
  value2?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'login' | 'dashboard' | 'monitor';