import React from 'react';
import { Home, Activity, Leaf } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home },
    { id: 'stats', icon: Activity },
    { id: 'config', icon: Leaf }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
          <div className="mx-4 mb-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl h-16 flex items-center justify-around shadow-2xl">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'text-white scale-110' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  {activeTab === tab.id && <span className="w-1 h-1 bg-white rounded-full mt-1"></span>}
                </button>
                {index < tabs.length - 1 && <div className="w-[1px] h-8 bg-white/5"></div>}
              </React.Fragment>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Navigation;