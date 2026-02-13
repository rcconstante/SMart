import React from 'react';
import { useClassroomData } from '../context/ClassroomContext';
import { Users, Activity, Thermometer, Wind, Zap, Mic, Sun } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard: React.FC = () => {
  const { sensors, engagement, history, forecast } = useClassroomData();

  const emotionData = Object.entries(engagement.emotionBreakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value
  }));

  // Fix: Explicitly type the sort arguments to resolve TS arithmetic operation error
  const dominantEmotion = Object.entries(engagement.emotionBreakdown)
    .sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0][0];

  const environmentStatus = sensors.temperature > 26 || sensors.co2 > 1000 ? "Warning" : "Acceptable";
  const environmentColor = sensors.temperature > 26 || sensors.co2 > 1000 ? "text-amber-500" : "text-emerald-600";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800">Hi, Student!</h2>
        <p className="text-gray-500">Welcome back to your smart classroom</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-500">Total Students</span>
                <div className="p-2 bg-emerald-100 rounded-lg"><Users size={20} className="text-emerald-600"/></div>
            </div>
            <div>
                <span className="text-4xl font-bold text-gray-800">{engagement.totalStudents}</span>
                <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Detection
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-500">Avg Engagement</span>
                <div className="p-2 bg-indigo-100 rounded-lg"><Activity size={20} className="text-indigo-600"/></div>
            </div>
            <div>
                <span className="text-4xl font-bold text-gray-800">{engagement.avgEngagement}%</span>
                <p className="mt-1 text-xs text-gray-400">Real-time analysis based on posture & emotion</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
             <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-500">Environment</span>
                <div className="p-2 bg-amber-100 rounded-lg"><Thermometer size={20} className="text-amber-600"/></div>
            </div>
            <div>
                <span className={`text-3xl font-bold ${environmentColor}`}>{environmentStatus}</span>
                <p className="mt-1 text-xs text-gray-400">Integrated Score based on IoT sensors</p>
            </div>
        </div>
      </div>

      {/* Charts Section 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-800">Student Engagement Levels</h3>
             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Last 30 mins</span>
           </div>
           <div className="flex-1 w-full h-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={history}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis dataKey="time" tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                 <YAxis domain={[0, 100]} tick={{fontSize: 12, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                 <RechartsTooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                 />
                 <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Forecast Bar Chart */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
           <div className="mb-4">
             <h3 className="font-bold text-gray-800">Temp. Forecasting</h3>
             <p className="text-xs text-gray-400">Gradient Boosting Prediction</p>
           </div>
           <div className="flex-1 w-full h-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={forecast}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis dataKey="time" tick={{fontSize: 11, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                 <YAxis domain={[25, 35]} hide />
                 <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', fontSize: '12px'}} />
                 <Bar dataKey="value" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="value2" name="Forecast" fill="#fcd34d" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-2">Engagement States</h3>
            <p className="text-xs text-gray-400 mb-4">Real-time emotion detection from CV</p>
            <div className="flex-1 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={emotionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {emotionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center text for Donut */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-xs text-gray-400 block">Dominant</span>
                    <span className="text-lg font-bold text-gray-800">{dominantEmotion}</span>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
                {emotionData.slice(0, 3).map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}}></span>
                        <span className="text-xs text-gray-600">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Environment List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80 overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-gray-800">Environment Monitor</h3>
                 <span className="text-xs text-emerald-600 font-medium">IoT Nodes Active</span>
             </div>

             <div className="space-y-6">
                {/* Temp */}
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                             <Thermometer size={16} className="text-red-500" /> Temperature
                        </div>
                        <span className="font-bold text-gray-800">{sensors.temperature}°C</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(sensors.temperature / 40) * 100}%` }}></div>
                    </div>
                </div>

                {/* Humidity */}
                <div>
                    <div className="flex justify-between items-end mb-1">
                         <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                             <Wind size={16} className="text-blue-500" /> Humidity
                        </div>
                        <span className="font-bold text-gray-800">{sensors.humidity}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${sensors.humidity}%` }}></div>
                    </div>
                </div>

                {/* Light */}
                <div>
                    <div className="flex justify-between items-end mb-1">
                         <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                             <Sun size={16} className="text-orange-500" /> Light Level
                        </div>
                        <span className="font-bold text-gray-800">{sensors.light} lux</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sensors.light / 1000) * 100)}%` }}></div>
                    </div>
                </div>

                {/* Air Quality */}
                <div>
                    <div className="flex justify-between items-end mb-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                             <Zap size={16} className="text-emerald-500" /> Air Quality (CO2)
                        </div>
                        <span className="font-bold text-gray-800">{sensors.co2} ppm</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sensors.co2 / 2000) * 100)}%` }}></div>
                    </div>
                </div>

                 {/* Noise */}
                 <div>
                    <div className="flex justify-between items-end mb-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                             <Mic size={16} className="text-purple-500" /> Noise Level
                        </div>
                        <span className="font-bold text-gray-800">{sensors.noise} dBA</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sensors.noise / 100) * 100)}%` }}></div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;