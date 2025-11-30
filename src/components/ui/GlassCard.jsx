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
export default GlassCard;