
import React, { useState } from 'react';
import { User, Session } from '../types';
import LiveCoach from './LiveCoach';

interface DashboardProps {
  user: User;
  onUpdateCredits: (amount: number, description: string) => void;
  onAddSession: (session: Session) => void;
  sessions: Session[]; 
}

const Dashboard: React.FC<DashboardProps> = ({ user, sessions = [] }) => {
  const [showLiveRoom, setShowLiveRoom] = useState(false);

  // Computed Metrics
  const hoursTaught = user.sessionsTaught;
  const hoursLearned = user.sessionsLearned;
  const trustScore = 98; // Logical metric
  const recentSessions = sessions.slice(0, 3);

  const aiRecommendations = [
    { name: 'Sarah Chen', skill: 'Python Automation', match: '98%', reason: 'Matches your interest in Data' },
    { name: 'Marcus Aurelius', skill: 'Public Speaking', match: '85%', reason: 'High demand in your network' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* 🔹 HEADER SUMMARY */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Platform Overview</h1>
          <p className="text-gray-500 font-medium">Weekly summary: +4.2h teaching, +2.1h learning.</p>
        </div>
        <button 
          onClick={() => setShowLiveRoom(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center"
        >
          <span className="mr-2">🎙️</span> AI Practice Arena
        </button>
      </section>

      {/* 🔹 METRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Credit Balance', value: `💎 ${user.credits}`, sub: 'Active Balance', color: 'text-indigo-600' },
          { label: 'Hours Taught', value: `${hoursTaught}h`, sub: 'Global contribution', color: 'text-emerald-600' },
          { label: 'Hours Learned', value: `${hoursLearned}h`, sub: 'Skill growth', color: 'text-blue-600' },
          { label: 'Trust Score', value: `${trustScore}%`, sub: 'Community rating', color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color} mb-1 tracking-tight`}>{stat.value}</p>
            <p className="text-xs text-gray-400 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🔹 LEFT CONTENT: PEER RECOMMENDATIONS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">🤖</span> Smart Peer Recommendations
            </h2>
            <div className="space-y-4">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                  <div className="flex items-center space-x-4">
                    <img src={`https://picsum.photos/seed/${rec.name}/100`} className="w-12 h-12 rounded-full object-cover shadow-sm" alt={rec.name} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900">{rec.name}</h3>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{rec.match} Match</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{rec.skill}</p>
                      <p className="text-[10px] text-indigo-500 font-bold mt-1 uppercase tracking-widest">{rec.reason}</p>
                    </div>
                  </div>
                  <button className="bg-white text-gray-700 px-5 py-2 rounded-lg font-bold text-xs border border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 RIGHT CONTENT: RECENT ACTIVITY */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">📋</span> Recent Sessions
            </h2>
            <div className="space-y-5">
              {recentSessions.length > 0 ? (
                recentSessions.map(session => (
                  <div key={session.id} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{session.skill}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{session.time} • with {session.peer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No recent sessions</p>
                </div>
              )}
            </div>
            <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all border border-gray-100 uppercase tracking-widest">
              View History
            </button>
          </div>
        </div>
      </div>

      {showLiveRoom && <LiveCoach onClose={() => setShowLiveRoom(false)} />}
    </div>
  );
};

export default Dashboard;
