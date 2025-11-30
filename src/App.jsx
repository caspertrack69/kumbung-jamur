import { useState } from 'react';
import useSystemData from './hooks/useSystemData';
import DashboardHome from './views/DashboardHome';
import StatsView from './views/StatsView';
import ConfigView from './views/ConfigView';
import Navigation from './components/Layout/Navbar';
import Header from './components/Layout/Header';
import Skeleton from './components/ui/Skeleton';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { loading, data, devices, settings, actions } = useSystemData();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-900/20 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[300px] h-[300px] bg-cyan-900/20 rounded-full blur-[80px] opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col pb-24">
        
        <Header />

        {loading ? (
          <div className="px-6 space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-40 w-full rounded-2xl" />
             </div>
             <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        ) : (
          <main className="px-6 flex-grow">
            {activeTab === 'home' && (
              <DashboardHome 
                data={data}
                settings={settings}
                devices={devices}
                toggleDevice={actions.toggleDevice}
                setSettings={actions.setSettings}
              />
            )}
            
            {activeTab === 'stats' && <StatsView data={data} />}
            {activeTab === 'config' && <ConfigView />}
          </main>
        )}

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      </div>
    </div>
  );
}