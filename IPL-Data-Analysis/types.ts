
export interface Player {
  id: string;
  name: string;
  team: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicketkeeper';
  stats: PlayerStats;
  image: string;
}

export interface PlayerStats {
  runs: number;
  wickets: number;
  average: number;
  strikeRate: number;
  economy: number;
  matches: number;
  highestScore: number;
  bestFigures: string;
  form: number[]; // Last 10 match scores
}

export interface Match {
  id: string;
  season: string;
  team1: string;
  team2: string;
  venue: string;
  winner: string;
  margin: string;
  date: string;
}

export interface SeasonalData {
  year: number;
  topRunScorers: { name: string; runs: number }[];
  topWicketTakers: { name: string; wickets: number }[];
}

export type AppView = 'dashboard' | 'comparison' | 'animations' | 'ai-insights' | 'dream-team';