
import { Player, Match, SeasonalData } from './types';

export const TEAMS = [
  'CSK', 'MI', 'RCB', 'KKR', 'SRH', 'RR', 'DC', 'PBKS', 'GT', 'LSG'
];

export const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    team: 'RCB',
    role: 'Batsman',
    image: 'https://picsum.photos/seed/virat/200/200',
    stats: {
      runs: 7263, wickets: 4, average: 37.2, strikeRate: 130.0, economy: 8.8,
      matches: 237, highestScore: 113, bestFigures: '2/25',
      form: [18, 54, 32, 101, 45, 12, 67, 82, 41, 5]
    }
  },
  {
    id: '2',
    name: 'Jasprit Bumrah',
    team: 'MI',
    role: 'Bowler',
    image: 'https://picsum.photos/seed/bumrah/200/200',
    stats: {
      runs: 62, wickets: 145, average: 23.3, strikeRate: 18.9, economy: 7.39,
      matches: 120, highestScore: 16, bestFigures: '5/10',
      form: [2, 0, 3, 1, 4, 1, 0, 2, 1, 3]
    }
  },
  {
    id: '3',
    name: 'MS Dhoni',
    team: 'CSK',
    role: 'Wicketkeeper',
    image: 'https://picsum.photos/seed/dhoni/200/200',
    stats: {
      runs: 5082, wickets: 0, average: 38.8, strikeRate: 135.9, economy: 0,
      matches: 250, highestScore: 84, bestFigures: '0/0',
      form: [21, 14, 37, 2, 45, 28, 11, 5, 20, 18]
    }
  },
  {
    id: '4',
    name: 'Rashid Khan',
    team: 'GT',
    role: 'Bowler',
    image: 'https://picsum.photos/seed/rashid/200/200',
    stats: {
      runs: 443, wickets: 139, average: 20.7, strikeRate: 19.1, economy: 6.67,
      matches: 109, highestScore: 79, bestFigures: '4/24',
      form: [1, 2, 0, 1, 3, 2, 1, 0, 4, 1]
    }
  },
  {
    id: '5',
    name: 'Suryakumar Yadav',
    team: 'MI',
    role: 'Batsman',
    image: 'https://picsum.photos/seed/sky/200/200',
    stats: {
      runs: 3249, wickets: 0, average: 32.1, strikeRate: 143.3, economy: 0,
      matches: 139, highestScore: 103, bestFigures: '0/0',
      form: [83, 7, 52, 103, 15, 36, 48, 22, 61, 10]
    }
  },
  {
    id: '6',
    name: 'Hardik Pandya',
    team: 'MI',
    role: 'All-rounder',
    image: 'https://picsum.photos/seed/hardik/200/200',
    stats: {
      runs: 2309, wickets: 53, average: 30.3, strikeRate: 145.8, economy: 8.75,
      matches: 123, highestScore: 91, bestFigures: '3/17',
      form: [21, 1, 34, 5, 66, 0, 12, 2, 45, 1]
    }
  }
];

export const SEASONAL_HISTORY: SeasonalData[] = [
  {
    year: 2018,
    topRunScorers: [{ name: 'Kane Williamson', runs: 735 }, { name: 'Rishabh Pant', runs: 684 }, { name: 'KL Rahul', runs: 659 }],
    topWicketTakers: [{ name: 'Andrew Tye', wickets: 24 }, { name: 'Rashid Khan', wickets: 21 }, { name: 'Siddharth Kaul', wickets: 21 }]
  },
  {
    year: 2019,
    topRunScorers: [{ name: 'David Warner', runs: 692 }, { name: 'KL Rahul', runs: 593 }, { name: 'Quinton de Kock', runs: 529 }],
    topWicketTakers: [{ name: 'Imran Tahir', wickets: 26 }, { name: 'Kagiso Rabada', wickets: 25 }, { name: 'Deepak Chahar', wickets: 22 }]
  },
  {
    year: 2020,
    topRunScorers: [{ name: 'KL Rahul', runs: 670 }, { name: 'Shikhar Dhawan', runs: 618 }, { name: 'David Warner', runs: 548 }],
    topWicketTakers: [{ name: 'Kagiso Rabada', wickets: 30 }, { name: 'Jasprit Bumrah', wickets: 27 }, { name: 'Trent Boult', wickets: 25 }]
  },
  {
    year: 2021,
    topRunScorers: [{ name: 'Ruturaj Gaikwad', runs: 635 }, { name: 'Faf du Plessis', runs: 633 }, { name: 'KL Rahul', runs: 626 }],
    topWicketTakers: [{ name: 'Harshal Patel', wickets: 32 }, { name: 'Avesh Khan', wickets: 24 }, { name: 'Jasprit Bumrah', wickets: 21 }]
  },
  {
    year: 2022,
    topRunScorers: [{ name: 'Jos Buttler', runs: 863 }, { name: 'KL Rahul', runs: 616 }, { name: 'Quinton de Kock', runs: 508 }],
    topWicketTakers: [{ name: 'Yuzvendra Chahal', wickets: 27 }, { name: 'Wanindu Hasaranga', wickets: 26 }, { name: 'Kagiso Rabada', wickets: 23 }]
  },
  {
    year: 2023,
    topRunScorers: [{ name: 'Shubman Gill', runs: 890 }, { name: 'Faf du Plessis', runs: 730 }, { name: 'Devon Conway', runs: 672 }],
    topWicketTakers: [{ name: 'Mohammed Shami', wickets: 28 }, { name: 'Mohit Sharma', wickets: 27 }, { name: 'Rashid Khan', wickets: 27 }]
  },
  {
    year: 2024,
    topRunScorers: [{ name: 'Virat Kohli', runs: 741 }, { name: 'Ruturaj Gaikwad', runs: 583 }, { name: 'Travis Head', runs: 567 }],
    topWicketTakers: [{ name: 'Harshal Patel', wickets: 24 }, { name: 'Varun Chakaravarthy', wickets: 21 }, { name: 'Jasprit Bumrah', wickets: 20 }]
  }
];
