const Header = () => (
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
);
export default Header;