import { Thermometer, Droplets } from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid 
} from 'recharts';

import GlassCard from "../components/ui/GlassCard";


const StatsView = ({ data }) => {
  const { tempHistory, humHistory } = data;
  
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Environmental Trends</h2>
        <select className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-300 outline-none focus:border-cyan-500/50">
          <option>Last 24 Hours</option>
          <option>Last 7 Days</option>
        </select>
      </div>

      <GlassCard className="p-4">
        <h3 className="text-slate-400 text-sm mb-4 flex items-center gap-2 font-medium">
          <Thermometer size={16} className="text-orange-400"/> Temperature History
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tempHistory}>
              <defs>
                <linearGradient id="colorTempLarge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val.toFixed(0)}°`} width={30} />
              <Tooltip 
                contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}} 
                itemStyle={{color: '#fb923c'}} labelStyle={{display: 'none'}} formatter={(value) => [`${value}°C`, 'Temp']}
              />
              <Area type="monotone" dataKey="value" stroke="#fb923c" strokeWidth={3} fill="url(#colorTempLarge)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h3 className="text-slate-400 text-sm mb-4 flex items-center gap-2 font-medium">
          <Droplets size={16} className="text-cyan-400"/> Humidity History
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={humHistory}>
              <defs>
                <linearGradient id="colorHumLarge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val}%`} width={30} />
              <Tooltip 
                contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}} 
                itemStyle={{color: '#22d3ee'}} labelStyle={{display: 'none'}} formatter={(value) => [`${value}%`, 'Humidity']}
              />
              <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} fill="url(#colorHumLarge)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
export default StatsView;