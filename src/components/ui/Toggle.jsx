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
export default Toggle;