import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SensorData, EngagementData, ChartDataPoint } from '../types';

interface ClassroomContextType {
  sensors: SensorData;
  engagement: EngagementData;
  history: ChartDataPoint[];
  forecast: ChartDataPoint[];
}

const defaultSensors: SensorData = {
  temperature: 28.7,
  humidity: 74.9,
  co2: 800,
  light: 450,
  noise: 47.5,
  airQuality: 136,
};

const defaultEngagement: EngagementData = {
  totalStudents: 32,
  avgEngagement: 78,
  occupancyStatus: 'High',
  emotionBreakdown: {
    happy: 30,
    neutral: 50,
    surprised: 10,
    sad: 5,
    angry: 5,
  },
};

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export const ClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sensors, setSensors] = useState<SensorData>(defaultSensors);
  const [engagement, setEngagement] = useState<EngagementData>(defaultEngagement);
  const [history, setHistory] = useState<ChartDataPoint[]>([]);
  const [forecast, setForecast] = useState<ChartDataPoint[]>([]);

  // Simulate live data updates
  useEffect(() => {
    // Initial forecast data
    setForecast([
      { time: 'Now', value: 28.7, value2: 29.0 },
      { time: '+5m', value: 28.9, value2: 29.2 },
      { time: '+10m', value: 29.1, value2: 29.5 },
      { time: '+15m', value: 29.0, value2: 29.3 },
    ]);

    // Initial history
    const initialHistory = Array.from({ length: 10 }, (_, i) => ({
      time: `${10 + i}:00`,
      value: 60 + Math.random() * 30,
    }));
    setHistory(initialHistory);

    const interval = setInterval(() => {
      setSensors((prev) => ({
        temperature: parseFloat((prev.temperature + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        humidity: parseFloat((prev.humidity + (Math.random() * 1 - 0.5)).toFixed(1)),
        co2: Math.floor(prev.co2 + (Math.random() * 20 - 10)),
        light: Math.floor(prev.light + (Math.random() * 10 - 5)),
        noise: parseFloat((prev.noise + (Math.random() * 2 - 1)).toFixed(1)),
        airQuality: Math.floor(prev.airQuality + (Math.random() * 4 - 2)),
      }));

      setEngagement((prev) => ({
        ...prev,
        avgEngagement: Math.min(100, Math.max(0, Math.floor(prev.avgEngagement + (Math.random() * 6 - 3)))),
        emotionBreakdown: {
           happy: Math.max(0, prev.emotionBreakdown.happy + (Math.random() * 4 - 2)),
           neutral: Math.max(0, prev.emotionBreakdown.neutral + (Math.random() * 4 - 2)),
           surprised: Math.max(0, prev.emotionBreakdown.surprised + (Math.random() * 2 - 1)),
           sad: Math.max(0, prev.emotionBreakdown.sad + (Math.random() * 2 - 1)),
           angry: Math.max(0, prev.emotionBreakdown.angry + (Math.random() * 1 - 0.5)),
        }
      }));

      // Update history graph
      setHistory(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: engagement.avgEngagement
        };
        const newHistory = [...prev, newPoint];
        if (newHistory.length > 10) newHistory.shift();
        return newHistory;
      });

    }, 3000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ClassroomContext.Provider value={{ sensors, engagement, history, forecast }}>
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroomData = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroomData must be used within a ClassroomProvider');
  }
  return context;
};