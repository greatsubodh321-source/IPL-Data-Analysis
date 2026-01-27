
import React from 'react';
import { PLAYERS, TEAMS } from '../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Search, Filter, TrendingUp, Users, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const topPlayers = [...PLAYERS].sort((a, b) => b.stats.runs - a.stats.runs);

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-slate-800 group-hover:${color} text-white transition-colors`}>
          <Icon size={24} />
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-100">{value}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">IPL 2024 Overview</h2>
          <p className="text-slate-400">Real-time performance metrics and season statistics.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search players or teams..." 
              className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64"
            />
          </div>
          <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all">
            <Filter size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Runs" value="2,451" change="+12.5%" icon={TrendingUp} color="bg-blue-600" />
        <StatCard title="Total Wickets" value="184" change="+5.2%" icon={Users} color="bg-indigo-600" />
        <StatCard title="Avg Strike Rate" value="142.8" change="+8.1%" icon={Activity} color="bg-purple-600" />
        <StatCard title="Matches Played" value="48" change="26 Left" icon={TrendingUp} color="bg-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Runs Distribution */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" /> Top Run Scorers (Season)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPlayers} layout="vertical" margin={{ left: 40, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar dataKey="stats.runs" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                  {topPlayers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#60a5fa' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance Heatmap or Line */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" /> Strike Rate vs Average
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={topPlayers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="stats.strikeRate" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="stats.average" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-slate-400">Strike Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-slate-400">Average</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
