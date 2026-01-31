
import React from 'react';
import { User, Post, Resource, LeaderboardUser } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/seed/alex/200',
  level: 'Level 3 Mentor',
  credits: 245,
  rating: 4.8,
  joinDate: 'March 2023',
  sessionsTaught: 42,
  sessionsLearned: 18,
  skillsTaught: ['React', 'UI Design', 'Public Speaking'],
  skillsWanted: ['Python', 'Cooking', 'Chess'],
  badges: [
    { id: 'b1', name: 'Super Teacher', icon: '🏆', color: 'bg-yellow-100' },
    { id: 'b2', name: 'Quick Learner', icon: '⚡', color: 'bg-blue-100' },
    { id: 'b3', name: 'Community Hero', icon: '❤️', color: 'bg-red-100' }
  ]
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    userName: 'Sarah Chen',
    userAvatar: 'https://picsum.photos/seed/sarah/150',
    image: 'https://picsum.photos/seed/coding/600/400',
    caption: 'Just finished a 2-hour Python session with @Alex. Feeling much more confident with lists and dictionaries! #Python #Learning',
    likes: 24,
    comments: [
      { id: 'c1', userName: 'Alex Rivera', text: 'You crushed it today!' }
    ],
    rating: 5,
    timestamp: '2h ago'
  },
  {
    id: 'p2',
    userId: 'u3',
    userName: 'Marcus Aurelius',
    userAvatar: 'https://picsum.photos/seed/marcus/150',
    image: 'https://picsum.photos/seed/cooking/600/400',
    caption: 'Teaching sourdough bread making tomorrow at 4 PM. Anyone interested? 🥖',
    likes: 56,
    comments: [],
    rating: 4.9,
    timestamp: '5h ago'
  },
  {
    id: 'p3',
    userId: 'u4',
    userName: 'Elena Rodriguez',
    userAvatar: 'https://picsum.photos/seed/elena/150',
    image: 'https://picsum.photos/seed/design/600/400',
    caption: 'New Figma shortcut guide I created for my mentees! Check out the marketplace for the full PDF.',
    likes: 89,
    comments: [
      { id: 'c2', userName: 'John Doe', text: 'Super helpful, thanks!' }
    ],
    rating: 4.7,
    timestamp: '1d ago'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'r1', title: 'React Performance Guide', description: 'Advanced patterns for rendering optimization.', price: 15, thumbnail: 'https://picsum.photos/seed/reactp/200/300', category: 'Tech' },
  { id: 'r2', title: 'UX Research Mastery', description: 'Template for conducting user interviews.', price: 10, thumbnail: 'https://picsum.photos/seed/ux/200/300', category: 'Design' },
  { id: 'r3', title: 'Python for Finance', description: 'Stock market analysis scripts.', price: 25, thumbnail: 'https://picsum.photos/seed/finance/200/300', category: 'Data' },
  { id: 'r4', title: 'Vegetarian Meal Prep', description: '30-day plan with grocery lists.', price: 8, thumbnail: 'https://picsum.photos/seed/meal/200/300', category: 'Lifestyle' },
  { id: 'r5', title: 'Public Speaking 101', description: 'Beat anxiety and master the stage.', price: 12, thumbnail: 'https://picsum.photos/seed/speech/200/300', category: 'Soft Skills' },
  { id: 'r6', title: 'Node.js Architecture', description: 'Scalable backend patterns.', price: 20, thumbnail: 'https://picsum.photos/seed/node/200/300', category: 'Tech' }
];

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Elena Rodriguez', avatar: 'https://picsum.photos/seed/elena/150', rating: 4.95, credits: 1240, badges: 12 },
  { rank: 2, name: 'Marcus Aurelius', avatar: 'https://picsum.photos/seed/marcus/150', rating: 4.92, credits: 980, badges: 9 },
  { rank: 3, name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/150', rating: 4.88, credits: 750, badges: 7 },
  { rank: 4, name: 'Alex Rivera', avatar: 'https://picsum.photos/seed/alex/150', rating: 4.80, credits: 245, badges: 3 },
  { rank: 5, name: 'Liam O’Brien', avatar: 'https://picsum.photos/seed/liam/150', rating: 4.78, credits: 210, badges: 4 },
  { rank: 6, name: 'Chloe Kim', avatar: 'https://picsum.photos/seed/chloe/150', rating: 4.75, credits: 195, badges: 5 },
  { rank: 7, name: 'John Doe', avatar: 'https://picsum.photos/seed/john/150', rating: 4.70, credits: 180, badges: 2 },
  { rank: 8, name: 'Sven Larson', avatar: 'https://picsum.photos/seed/sven/150', rating: 4.65, credits: 150, badges: 1 },
  { rank: 9, name: 'Yuki Sato', avatar: 'https://picsum.photos/seed/yuki/150', rating: 4.60, credits: 120, badges: 2 },
  { rank: 10, name: 'Priya Patel', avatar: 'https://picsum.photos/seed/priya/150', rating: 4.55, credits: 95, badges: 1 }
];
