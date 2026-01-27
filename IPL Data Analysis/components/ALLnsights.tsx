
import React, { useState, useEffect } from 'react';
import { getWinProbability, getPlayerCluster, getAICommentary } from '../geminiService';
import { PLAYERS } from '../mockData';
import { BrainCircuit, Calculator, ShieldCheck, Target, Loader2 } from 'lucide-react';

const AIInsights: React.FC = () => {
  const [target, setTarget] = useState(180);
  const [runs, setRuns] = useState(100);
  const [wickets, setWickets] = useState(4);
  const [balls, setBalls] = useState(42);
  const [probData, setProbData] = useState<any>(null);
  const [clusters, setClusters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [clusterLoading, setClusterLoading] = useState(false);

  const calculateProb = async () => {
    setLoading(true);
    const result = await getWinProbability(runs, wickets, balls, target);
    setProbData(result);
    setLoading(false);
  };

  const loadClusters = async () => {
    setClusterLoading(true);
    const result = await getPlayerCluster(PLAYERS);
    setClusters(result);
    setClusterLoading(false);
  };

  useEffect(() => {
    loadClusters();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">AI Strategy & Insights</h2>
        <p className="text-slate-400">Powered by Gemini - Real-time probability models and squad clustering.</p>
      </div>

      {/* Win Predictor */}
      <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Calculator className="text-blue-500" size={24} />
          </div>
          <h3 className="text-xl font-bold">Win Probability Engine</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Match Target</label>
                <input 
                  type="number" 
                  value={target} 
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Current Score</label>
                <input 
                  type="number" 
                  value={runs} 
                  onChange={(e) => setRuns(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Wickets Lost</label>
                <input 
                  type="number" 
                  max={10}
                  value={wickets} 
                  onChange={(e) => setWickets(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Balls Left</label>
                <input 
                  type="number" 
                  max={120}
                  value={balls} 
                  onChange={(e) => setBalls(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <button 
              onClick={calculateProb}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
              Calculate Chasing Probability
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-950/50 p-8 rounded-3xl border border-slate-800/50 min-h-[300px]">
            {probData ? (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                    <circle 
                      cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                      className="text-blue-500 transition-all duration-1000"
                      strokeDasharray={2 * Math.PI * 80}
                      strokeDashoffset={2 * Math.PI * 80 * (1 - probData.probability / 100)}
                    />
                  </svg>
                  <span className="absolute text-5xl font-black">{probData.probability}%</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Chasing Victory Prob</h4>
                <p className="text-sm text-slate-400 max-w-sm italic">"{probData.reasoning}"</p>
              </div>
            ) : (
              <div className="text-center text-slate-600 space-y-4">
                <Target size={64} className="mx-auto opacity-20" />
                <p>Adjust parameters and run model to see predictions.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Clustering */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <BrainCircuit className="text-purple-500" size={24} />
            </div>
            <h3 className="text-xl font-bold">AI Player Clustering</h3>
          </div>
          <button 
            onClick={loadClusters}
            className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
          >
            Refine Clusters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusterLoading ? (
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-48 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
             ))
          ) : (
            clusters.map((c, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all group">
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase rounded-full mb-4">
                  {c.role}
                </span>
                <h4 className="text-xl font-bold mb-2 text-slate-100">{c.name}</h4>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {c.description}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default AIInsights;
