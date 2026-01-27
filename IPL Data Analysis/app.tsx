
import React, { useState } from 'react';
import { LayoutDashboard, Users, Zap, BrainCircuit, Trophy, Menu, X, ChevronRight } from 'lucide-react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import Comparison from './components/Comparison';
import BarChartRace from './components/BarChartRace';
import AIInsights from './components/AIInsights';
import DreamTeam from './components/DreamTeam';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'comparison', label: 'Player Head-to-Head', icon: <Users size={20} /> },
    { id: 'animations', label: 'Bar Chart Race', icon: <Zap size={20} /> },
    { id: 'ai-insights', label: 'AI Strategy Hub', icon: <BrainCircuit size={20} /> },
    { id: 'dream-team', label: 'Dream Team XI', icon: <Trophy size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col z-50
      `}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {isSidebarOpen && <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">IPL Analytics</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as AppView)}
              className={`
                w-full flex items-center px-4 py-3 rounded-lg transition-colors
                ${currentView === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {item.icon}
              {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          {isSidebarOpen && <p>© 2024 Cricket Analytics Pro</p>}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Section /</span>
            <span className="font-semibold text-blue-400 capitalize">{currentView.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-full animate-pulse">
              Live Data Syncing
            </div>
            <img src="https://picsum.photos/seed/user/32/32" className="w-8 h-8 rounded-full border border-slate-700" alt="User" />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'comparison' && <Comparison />}
          {currentView === 'animations' && <BarChartRace />}
          {currentView === 'ai-insights' && <AIInsights />}
          {currentView === 'dream-team' && <DreamTeam />}
        </div>
      </main>
    </div>
  );
};

export default App;