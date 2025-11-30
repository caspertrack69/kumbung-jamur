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
export default Slider;