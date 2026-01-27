
import React, { useState, useEffect, useRef } from 'react';
import { SEASONAL_HISTORY } from '../mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';

const BarChartRace: React.FC = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<any>(null);

  const currentData = SEASONAL_HISTORY[currentYearIndex];
  // Sort data for race effect
  const sortedRuns = [...currentData.topRunScorers].sort((a, b) => b.runs - a.runs);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentYearIndex(prev => {
          if (prev >= SEASONAL_HISTORY.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentYearIndex(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Bar Chart Race: Runs Legacy</h2>
          <p className="text-slate-400">Watch the evolution of the top run scorers from 2018 to 2024.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play Race'}
          </button>
          <button 
            onClick={reset}
            className="p-2 border border-slate-800 rounded-full hover:bg-slate-800 text-slate-400"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-8 right-12 text-8xl font-black text-slate-800 pointer-events-none select-none">
          {currentData.year}
        </div>
        
        <div className="h-[400px] w-full mt-12">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={sortedRuns} 
              layout="vertical" 
              margin={{ left: 80, right: 30 }}
            >
              <XAxis type="number" hide domain={[0, 1000]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#94a3b8" 
                fontSize={14} 
                fontWeight="bold"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip cursor={{ fill: 'transparent' }} content={() => null} />
              <Bar 
                dataKey="runs" 
                fill="#3b82f6" 
                radius={[0, 8, 8, 0]} 
                barSize={40}
                animationDuration={800}
                animationEasing="ease-in-out"
              >
                {sortedRuns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#60a5fa' : '#93c5fd'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-1000"
              style={{ width: `${((currentYearIndex + 1) / SEASONAL_HISTORY.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 font-bold">
            {SEASONAL_HISTORY.map(s => <span key={s.year}>{s.year}</span>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedRuns.map((p, i) => (
          <div key={p.name} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Rank {i + 1}</p>
              <h4 className="font-bold text-lg">{p.name}</h4>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-blue-400">{p.runs}</p>
              <p className="text-xs text-slate-600">Runs in {currentData.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartRace;
