
import React, { useMemo } from 'react';
import { PLAYERS } from '../mockData';
import { Trophy, Star, Shield, Sword } from 'lucide-react';

const DreamTeam: React.FC = () => {
  // Logic to select best XI based on balanced roles and high stats
  const dreamXI = useMemo(() => {
    const sorted = [...PLAYERS].sort((a, b) => b.stats.strikeRate + b.stats.average - (a.stats.strikeRate + a.stats.average));
    
    const openers = sorted.filter(p => p.role === 'Batsman').slice(0, 2);
    const middleOrder = sorted.filter(p => p.role === 'Batsman').slice(2, 4);
    const wk = sorted.find(p => p.role === 'Wicketkeeper') || sorted[0];
    const allRounders = sorted.filter(p => p.role === 'All-rounder').slice(0, 2);
    const bowlers = [...PLAYERS].sort((a, b) => b.stats.wickets - a.stats.wickets).filter(p => p.role === 'Bowler').slice(0, 4);

    return {
      topOrder: openers,
      middle: [...middleOrder, wk],
      lower: allRounders,
      attack: bowlers
    };
  }, []);

  const PlayerRow = ({ player, pos }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 mb-2 hover:bg-slate-800/60 transition-all">
      <div className="flex items-center gap-4">
        <span className="text-slate-600 font-bold text-xs w-4">{pos}</span>
        <img src={player.image} className="w-10 h-10 rounded-full border border-slate-700" alt="" />
        <div>
          <h5 className="font-bold text-sm">{player.name}</h5>
          <p className="text-[10px] text-slate-500 uppercase font-bold">{player.team} • {player.role}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="text-right">
          <p className="text-xs font-bold text-blue-400">{player.stats.runs || '-'}</p>
          <p className="text-[8px] text-slate-600 font-bold">RUNS</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-orange-400">{player.stats.wickets || '-'}</p>
          <p className="text-[8px] text-slate-600 font-bold">WKTS</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          SEASON DREAM XI
        </h2>
        <p className="text-slate-400">The most optimized playing XI based on algorithmic performance scoring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h4 className="flex items-center gap-2 text-slate-100 font-bold mb-4 border-b border-slate-800 pb-2">
              <Sword className="text-red-400" size={18} /> Top Order
            </h4>
            {dreamXI.topOrder.map((p, i) => <PlayerRow key={p.id} player={p} pos={i+1} />)}
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-slate-100 font-bold mb-4 border-b border-slate-800 pb-2">
              <Star className="text-yellow-400" size={18} /> Middle Order
            </h4>
            {dreamXI.middle.map((p, i) => <PlayerRow key={p.id} player={p} pos={i+3} />)}
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-slate-100 font-bold mb-4 border-b border-slate-800 pb-2">
              <Shield className="text-blue-400" size={18} /> Bowling Attack
            </h4>
            {dreamXI.attack.map((p, i) => <PlayerRow key={p.id} player={p} pos={i+8} />)}
          </div>
        </div>

        <div className="hidden lg:block">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-32">
             <div className="relative aspect-[3/4] bg-emerald-900/10 rounded-2xl border-2 border-emerald-500/20 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                   backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                }}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-between py-12">
                   <div className="flex gap-16">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-slate-800 mb-2 overflow-hidden">
                           <img src={dreamXI.topOrder[0].image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="text-[10px] font-bold bg-slate-900/80 px-2 py-0.5 rounded">{dreamXI.topOrder[0].name.split(' ')[0]}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-slate-800 mb-2 overflow-hidden">
                           <img src={dreamXI.topOrder[1].image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p className="text-[10px] font-bold bg-slate-900/80 px-2 py-0.5 rounded">{dreamXI.topOrder[1].name.split(' ')[0]}</p>
                      </div>
                   </div>

                   <div className="flex gap-8">
                      {dreamXI.middle.slice(0, 3).map(p => (
                        <div key={p.id} className="text-center">
                          <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-slate-800 mb-2 overflow-hidden">
                             <img src={p.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <p className="text-[10px] font-bold bg-slate-900/80 px-2 py-0.5 rounded">{p.name.split(' ')[0]}</p>
                        </div>
                      ))}
                   </div>

                   <div className="flex gap-8">
                      {dreamXI.attack.map(p => (
                        <div key={p.id} className="text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-slate-800 mb-2 overflow-hidden">
                             <img src={p.image} className="w-full h-full object-cover" alt="" />
                          </div>
                          <p className="text-[8px] font-bold bg-slate-900/80 px-1 py-0.5 rounded">{p.name.split(' ')[0]}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full"></div>
             </div>
             <div className="mt-8 flex items-center justify-between p-4 bg-slate-950 rounded-2xl">
               <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Estimated Team Power</p>
                  <p className="text-2xl font-black text-blue-400">94.8 / 100</p>
               </div>
               <Trophy className="text-yellow-500" size={32} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DreamTeam;