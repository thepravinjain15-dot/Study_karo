
export interface User {
  id: string;
  name: string;
  avatar: string;
  level: string;
  credits: number;
  rating: number;
  joinDate: string;
  sessionsTaught: number;
  sessionsLearned: number;
  skillsTaught: string[];
  skillsWanted: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  date: string;
}

export interface Session {
  id: string;
  skill: string;
  peer: string;
  time: string;
  status: 'Scheduled' | 'Done' | 'Cancelled';
  cost?: number;
  earn?: number;
}

export interface SkillInsight {
  summary: string;
  links: { title: string; uri: string }[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  rating: number;
  timestamp: string;
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  credits: number;
  badges: number;
}
