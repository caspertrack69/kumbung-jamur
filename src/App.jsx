import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  Cpu, 
  Power, 
  Settings, 
  Home, 
  Activity,
  Wifi,
  Leaf
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

// --- Design System Components ---

const GlassCard = ({ children, className = "", onClick, active = false }) => (
  <div 
    onClick={onClick}
    className={`
      relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-300
      ${active 
        ? 'bg-white/15 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
      }
      ${className}
    `}
  >
    {children}
  </div>
);

const Toggle = ({ active, disabled }) => (
  <div className={`
    w-12 h-7 rounded-full flex items-center p-1 transition-colors duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${active ? 'bg-gradient-to-r from-emerald-400 to-cyan-500' : 'bg-slate-700/50'}
  `}>
    <div className={`
      w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
      ${active ? 'translate-x-5' : 'translate-x-0'}
    `} />
  </div>
);

const Slider = ({ value, onChange, min, max, unit, label, colorClass }) => (
  <div className="w-full space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-slate-400 text-sm font-medium">{label}</span>
      <span className={`text-xl font-bold ${colorClass}`}>{value}{unit}</span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-white"
    />
  </div>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded ${className}`}></div>
);

// --- Mock Data Generator ---
const generateHistory = (base, variance) => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: i,
    value: base + Math.random() * variance - (variance / 2)
  }));
};

// --- Main Application ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  
  // Sensor State
  const [temp, setTemp] = useState(28.4);
  const [humidity, setHumidity] = useState(88);
  const [tempHistory, setTempHistory] = useState([]);
  const [humHistory, setHumHistory] = useState([]);

  // Device State
  const [devices, setDevices] = useState({
    mist: false,
    fan: true,
    light: false,
    auto: true
  });

  // Threshold State
  const [settings, setSettings] = useState({
    targetTemp: 26,
    targetHum: 90
  });

  // Simulate Initial Loading
  useEffect(() => {
    setTempHistory(generateHistory(28, 2));
    setHumHistory(generateHistory(90, 5));
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Simulate Live Data Updates
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      // Fluctuate sensor data slightly
      setTemp(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setHumidity(prev => Math.min(100, Math.max(0, parseInt(prev + (Math.random() * 4 - 2)))));

      // Update charts
      setTempHistory(prev => [...prev.slice(1), { time: Date.now(), value: temp }]);
      setHumHistory(prev => [...prev.slice(1), { time: Date.now(), value: humidity }]);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, temp, humidity]);

  const toggleDevice = (device) => {
    if (devices.auto && device !== 'auto') return; // Locked by Auto Mode

    setDevices(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-900/20 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-cyan-900/20 rounded-full blur-[80px] opacity-30"></div>
      </div>

      {/* Main Content Container (Mobile constrained) */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col pb-24">
        
        {/* Header */}
        <header className="px-6 pt-12 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              My Kumbung
            </h1>
            <p className="text-xs text-slate-400">Unit A-04 • Oyster Mushroom</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400">Online</span>
          </div>
        </header>

        {loading ? (
          // SKELETON LOADING STATE
          <div className="px-6 space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-40 w-full rounded-2xl" />
             </div>
             <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        ) : (
          // LIVE DASHBOARD
          <main className="px-6 space-y-8 flex-grow">
            
            {/* Hero Section: Monitoring */}
            <section className="grid grid-cols-2 gap-4">
              {/* Temperature Card */}
              <GlassCard className="p-4 flex flex-col justify-between h-44 relative group">
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <Thermometer size={20} />
                  </div>
                  <span className="text-xs text-slate-400 font-medium tracking-wider">TEMP</span>
                </div>
                
                <div className="z-10 mt-2">
                  <span className="text-3xl font-bold text-white tracking-tight">{temp}°</span>
                  <p className="text-xs text-slate-400 mt-1">Target: {settings.targetTemp}°C</p>
                </div>

                {/* Sparkline Chart Background */}
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

              {/* Humidity Card */}
              <GlassCard className="p-4 flex flex-col justify-between h-44 relative group">
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <Droplets size={20} />
                  </div>
                  <span className="text-xs text-slate-400 font-medium tracking-wider">HUMIDITY</span>
                </div>
                
                <div className="z-10 mt-2">
                  <span className="text-3xl font-bold text-white tracking-tight">{humidity}<span className="text-lg text-slate-400">%</span></span>
                  <p className="text-xs text-slate-400 mt-1">Target: {settings.targetHum}%</p>
                </div>

                 {/* Sparkline Chart Background */}
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

            {/* Controls Section */}
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
                {/* Auto Mode Master Switch */}
                <GlassCard 
                  active={devices.auto}
                  onClick={() => toggleDevice('auto')}
                  className="col-span-2 p-5 flex flex-row items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${devices.auto ? 'bg-purple-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                      <Cpu size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Auto Pilot</h3>
                      <p className="text-xs text-slate-400">
                        {devices.auto ? 'AI optimizing environment' : 'Manual control enabled'}
                      </p>
                    </div>
                  </div>
                  <Toggle active={devices.auto} />
                </GlassCard>

                {/* Sub Controls (Disabled visuals if Auto is ON) */}
                <GlassCard 
                  onClick={() => toggleDevice('mist')}
                  className={`p-4 space-y-4 cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                  active={devices.mist}
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg ${devices.mist ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                      <Wind size={20} />
                    </div>
                    <Toggle active={devices.mist} disabled={devices.auto} />
                  </div>
                  <div>
                    <h3 className="font-medium">Mister</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {devices.mist ? 'Spraying...' : 'Standby'}
                    </p>
                  </div>
                </GlassCard>

                <GlassCard 
                  onClick={() => toggleDevice('fan')}
                  className={`p-4 space-y-4 cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                  active={devices.fan}
                >
                   <div className="flex justify-between items-start">
                    <div className={`p-2 rounded-lg ${devices.fan ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-slate-400'}`}>
                      <Power size={20} />
                    </div>
                    <Toggle active={devices.fan} disabled={devices.auto} />
                  </div>
                  <div>
                    <h3 className="font-medium">Exhaust</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {devices.fan ? 'High RPM' : 'Off'}
                    </p>
                  </div>
                </GlassCard>

                <GlassCard 
                  onClick={() => toggleDevice('light')}
                  className={`col-span-2 p-4 flex items-center justify-between cursor-pointer ${devices.auto ? 'opacity-50 pointer-events-none grayscale' : ''}`}
                  active={devices.light}
                >
                   <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${devices.light ? 'bg-yellow-400/20 text-yellow-300' : 'bg-white/5 text-slate-400'}`}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Grow Lights</h3>
                      <p className="text-xs text-slate-400">UV Spectrum B</p>
                    </div>
                   </div>
                   <Toggle active={devices.light} disabled={devices.auto} />
                </GlassCard>

              </div>
            </section>

            {/* Threshold Settings */}
            <section className="pb-8">
               <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Settings size={18} className="text-slate-400" /> Thresholds
                </h2>
              </div>
              <GlassCard className="p-6 space-y-6">
                 <Slider 
                    label="Target Temperature" 
                    value={settings.targetTemp} 
                    unit="°C"
                    min={18} max={35}
                    onChange={(v) => setSettings(p => ({...p, targetTemp: v}))}
                    colorClass="text-orange-400"
                 />
                 <div className="h-[1px] bg-white/5 w-full"></div>
                 <Slider 
                    label="Target Humidity" 
                    value={settings.targetHum} 
                    unit="%"
                    min={40} max={99}
                    onChange={(v) => setSettings(p => ({...p, targetHum: v}))}
                    colorClass="text-cyan-400"
                 />
              </GlassCard>
            </section>

          </main>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto">
             <div className="mx-4 mb-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl h-16 flex items-center justify-around shadow-2xl">
               <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'home' ? 'text-white' : 'text-slate-600'}`}
               >
                 <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                 {activeTab === 'home' && <span className="w-1 h-1 bg-white rounded-full"></span>}
               </button>

               <div className="w-[1px] h-8 bg-white/5"></div>

               <button 
                onClick={() => setActiveTab('stats')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'stats' ? 'text-white' : 'text-slate-600'}`}
               >
                 <Activity size={22} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
                 {activeTab === 'stats' && <span className="w-1 h-1 bg-white rounded-full"></span>}
               </button>
               
               <div className="w-[1px] h-8 bg-white/5"></div>

               <button 
                onClick={() => setActiveTab('config')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'config' ? 'text-white' : 'text-slate-600'}`}
               >
                 <Leaf size={22} strokeWidth={activeTab === 'config' ? 2.5 : 2} />
                 {activeTab === 'config' && <span className="w-1 h-1 bg-white rounded-full"></span>}
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}