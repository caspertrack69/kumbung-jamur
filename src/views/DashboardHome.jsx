import React from 'react';
import { 
  Thermometer, Droplets, Wind, Zap, Cpu, Power, Settings 
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer 
} from 'recharts';
import GlassCard from "../components/ui/GlassCard";
import Toggle from "../components/ui/Toggle";
import Slider from "../components/ui/Slider";




const DashboardHome = ({ data, settings, devices, toggleDevice, setSettings }) => {
  const { temp, humidity, tempHistory, humHistory } = data;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="grid grid-cols-2 gap-4">
        <GlassCard className="p-4 flex flex-col justify-between h-44 relative group">
          <div className="flex justify-between items-start z-10">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400"><Thermometer size={20} /></div>
            <span className="text-xs text-slate-400 font-medium tracking-wider">TEMP</span>
          </div>
          <div className="z-10 mt-2">
            <span className="text-3xl font-bold text-white tracking-tight">{temp}°</span>
            <p className="text-xs text-slate-400 mt-1">Target: {settings.targetTemp}°C</p>
          </div>
          <div className="absolute inset-0 bottom-0 top-12 opacity-30 group-hover:opacity-50 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tempHistory}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#fb923c" strokeWidth={2} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex flex-col justify-between h-44 relative group">
          <div className="flex justify-between items-start z-10">
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400"><Droplets size={20} /></div>
            <span className="text-xs text-slate-400 font-medium tracking-wider">HUMIDITY</span>
          </div>
          <div className="z-10 mt-2">
            <span className="text-3xl font-bold text-white tracking-tight">{humidity}<span className="text-lg text-slate-400">%</span></span>
            <p className="text-xs text-slate-400 mt-1">Target: {settings.targetHum}%</p>
          </div>
          <div className="absolute inset-0 bottom-0 top-12 opacity-30 group-hover:opacity-50 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={humHistory}>
                <defs>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fill="url(#colorHum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* Action Center */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" /> Action Center
          </h2>
          {devices.auto && (
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 uppercase tracking-widest font-bold">
              AI Active
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <GlassCard 
            active={devices.auto} onClick={() => toggleDevice('auto')}
            className="col-span-2 p-5 flex flex-row items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-colors ${devices.auto ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Auto Pilot</h3>
                <p className="text-xs text-slate-400">{devices.auto ? 'AI optimizing environment' : 'Manual control enabled'}</p>
              </div>
            </div>
            <Toggle active={devices.auto} />
          </GlassCard>

          <GlassCard 
            onClick={() => toggleDevice('mist')}
            className={`p-4 space-y-4 cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
            active={devices.mist}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${devices.mist ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}><Wind size={20} /></div>
              <Toggle active={devices.mist} disabled={devices.auto} />
            </div>
            <div>
              <h3 className="font-medium">Mister</h3>
              <p className="text-xs text-slate-400 mt-1">{devices.mist ? 'Spraying...' : 'Standby'}</p>
            </div>
          </GlassCard>

          <GlassCard 
            onClick={() => toggleDevice('fan')}
            className={`p-4 space-y-4 cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
            active={devices.fan}
          >
              <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg ${devices.fan ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-slate-400'}`}><Power size={20} /></div>
              <Toggle active={devices.fan} disabled={devices.auto} />
            </div>
            <div>
              <h3 className="font-medium">Exhaust</h3>
              <p className="text-xs text-slate-400 mt-1">{devices.fan ? 'High RPM' : 'Off'}</p>
            </div>
          </GlassCard>

          <GlassCard 
            onClick={() => toggleDevice('light')}
            className={`col-span-2 p-4 flex items-center justify-between cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
            active={devices.light}
          >
              <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${devices.light ? 'bg-yellow-400/20 text-yellow-300' : 'bg-white/5 text-slate-400'}`}><Zap size={20} /></div>
              <div><h3 className="font-medium">Grow Lights</h3><p className="text-xs text-slate-400">UV Spectrum B</p></div>
              </div>
              <Toggle active={devices.light} disabled={devices.auto} />
          </GlassCard>
        </div>
      </section>

      {/* Settings Section */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Settings size={18} className="text-slate-400" /> Thresholds
          </h2>
        </div>
        <GlassCard className="p-6 space-y-6">
            <Slider label="Target Temperature" value={settings.targetTemp} unit="°C" min={18} max={35}
              onChange={(v) => setSettings(p => ({...p, targetTemp: v}))} colorClass="text-orange-400"
            />
            <div className="h-[1px] bg-white/5 w-full"></div>
            <Slider label="Target Humidity" value={settings.targetHum} unit="%" min={40} max={99}
              onChange={(v) => setSettings(p => ({...p, targetHum: v}))} colorClass="text-cyan-400"
            />
        </GlassCard>
      </section>
    </div>
  );
};
export default DashboardHome;