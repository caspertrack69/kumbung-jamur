import GlassCard from "../components/ui/GlassCard";
import { Wifi, Save, RotateCcw, Settings } from 'lucide-react';

const ConfigView = () => (
  <div className="space-y-6 animate-fade-in pb-8">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-white">System Settings</h2>
    </div>

    {/* Connectivity Settings */}
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Wifi size={20} /></div>
        <div><h3 className="font-semibold text-white">Connectivity</h3><p className="text-xs text-slate-400">ESP32 Network Config</p></div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-400 block mb-1.5 uppercase font-bold tracking-wider">WiFi SSID</label>
          <input type="text" defaultValue="Kumbung_Net_2.4G" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600" />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1.5 uppercase font-bold tracking-wider">Password</label>
          <input type="password" defaultValue="********" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:bg-slate-900/80 outline-none transition-all placeholder:text-slate-600" />
        </div>
        <button className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
          <Save size={18} /> Save Network
        </button>
      </div>
    </GlassCard>

    {/* Sensor Calibration */}
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-3">
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Settings size={20} /></div>
        <div><h3 className="font-semibold text-white">Sensor Calibration</h3><p className="text-xs text-slate-400">Fine tune readings</p></div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Temp Offset</span>
          <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg px-3 py-1 border border-white/5">
            <button className="text-slate-400 hover:text-white">-</button>
            <span className="text-sm font-mono w-8 text-center">+0.5</span>
            <button className="text-slate-400 hover:text-white">+</button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Humidity Offset</span>
          <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg px-3 py-1 border border-white/5">
            <button className="text-slate-400 hover:text-white">-</button>
            <span className="text-sm font-mono w-8 text-center">-2.0</span>
            <button className="text-slate-400 hover:text-white">+</button>
          </div>
        </div>
        <button className="w-full mt-2 bg-white/5 hover:bg-white/10 text-slate-300 font-medium py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
          <RotateCcw size={18} /> Reset Defaults
        </button>
      </div>
    </GlassCard>
  </div>
);
export default ConfigView;