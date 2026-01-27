
import React, { useState } from 'react';
import { PLAYERS } from '../mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Check, ArrowDownAZ, LayoutGrid } from 'lucide-react';

const Comparison: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['1', '2']);
  const [sortBy, setSortBy] = useState<'name' | 'team'>('name');

  const togglePlayer = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 3) setSelectedIds([...selectedIds, id]);
    }
  };

  // Sort players based on current selection
  const sortedPlayers = [...PLAYERS].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a.team.localeCompare(b.team);
    }
  });

  const selectedPlayers = PLAYERS.filter(p => selectedIds.includes(p.id));

  // Normalize stats for Radar Chart
  const radarData = [
    { subject: 'Strike Rate', fullMark: 200 },
    { subject: 'Average', fullMark: 60 },
    { subject: 'Runs (x100)', fullMark: 100 },
    { subject: 'Matches', fullMark: 300 },
    { subject: 'Highest Score', fullMark: 150 },
  ].map(item => {
    const entry: any = { subject: item.subject };
    selectedPlayers.forEach(p => {
      let value = 0;
      switch(item.subject) {
        case 'Strike Rate': value = p.stats.strikeRate; break;
        case 'Average': value = p.stats.average; break;
        case 'Runs (x100)': value = p.stats.runs / 100; break;
        case 'Matches': value = p.stats.matches; break;
        case 'Highest Score': value = p.stats.highestScore; break;
      }
      entry[p.name] = value;
    });
    return entry;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Head-to-Head Comparison</h2>
          <p className="text-slate-400">Select up to 3 players to visualize comparative metrics on the radar graph.</p>
        </div>
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <span className="pl-3 pr-1 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <ArrowDownAZ size={14} /> Sort By
          </span>
          <div className="flex gap-1">
            <button 
              onClick={() => setSortBy('name')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${sortBy === 'name' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              Name
            </button>
            <button 
              onClick={() => setSortBy('team')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${sortBy === 'team' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              Team
            </button>
          </div>
        </div>
      </div>

      {/* Player Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedPlayers.map(player => (
          <button 
            key={player.id}
            onClick={() => togglePlayer(player.id)}
            className={`
              relative flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-center group
              ${selectedIds.includes(player.id) 
                ? 'bg-blue-600/10 border-blue-500 ring-4 ring-blue-500/10 scale-[1.02] shadow-xl shadow-blue-900/10' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'}
            `}
          >
            <div className="relative">
              <div className={`
                absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity
                ${selectedIds.includes(player.id) ? 'bg-blue-500 opacity-20' : 'bg-slate-500'}
              `} />
              <img 
                src={player.image} 
                alt={player.name} 
                className={`
                  relative w-20 h-20 rounded-full object-cover border-2 transition-transform duration-300
                  ${selectedIds.includes(player.id) ? 'border-blue-400 scale-105' : 'border-slate-700'}
                `} 
              />
              {selectedIds.includes(player.id) && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1.5 border-2 border-slate-950 shadow-lg">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-slate-100 truncate w-full">{player.name}</p>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider">{player.team}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-4">
        {/* Radar Chart Container */}
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 h-[500px] flex flex-col">
          <h3 className="text-lg font-bold mb-6 text-slate-300">Statistical Distribution</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                {selectedPlayers.map((p, i) => (
                  <Radar
                    key={p.id}
                    name={p.name}
                    dataKey={p.name}
                    stroke={colors[i]}
                    fill={colors[i]}
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                ))}
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
            {selectedPlayers.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></span>
                <span className="text-slate-400 font-bold">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player Info Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-2 text-slate-300 px-1">Performance Details</h3>
          {selectedPlayers.map((player, idx) => (
            <div 
              key={player.id} 
              className="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-slate-800 hover:translate-x-1 transition-all duration-300" 
              style={{ borderLeftColor: colors[idx] }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={player.image} className="w-14 h-14 rounded-full border-2 border-slate-800 object-cover shadow-lg" alt={player.name} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                       <span className="text-[10px] font-bold text-slate-400">{player.team}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">{player.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{player.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-slate-100 tabular-nums">{player.stats.runs}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Runs</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800/50">
                <div className="text-center group/stat">
                  <p className="text-blue-400 font-bold text-lg group-hover/stat:scale-110 transition-transform">{player.stats.strikeRate}</p>
                  <p className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">Strike Rate</p>
                </div>
                <div className="text-center group/stat">
                  <p className="text-emerald-400 font-bold text-lg group-hover/stat:scale-110 transition-transform">{player.stats.average}</p>
                  <p className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">Average</p>
                </div>
                <div className="text-center group/stat">
                  <p className="text-purple-400 font-bold text-lg group-hover/stat:scale-110 transition-transform">{player.stats.matches}</p>
                  <p className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">Matches</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comparison;