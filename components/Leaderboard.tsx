
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';

const Leaderboard: React.FC = () => {
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const others = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-left">
        <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
          Community Rankings
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Top Contributors</h1>
        <p className="text-gray-500 font-medium text-sm mt-1">Celebrating the mentors and learners driving our exchange economy.</p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThree.map((user, index) => (
          <div key={user.rank} className={`relative bg-white p-8 rounded-2xl border ${index === 0 ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-gray-200'} shadow-sm text-center card-hover`}>
            {index === 0 && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Top Mentor
              </div>
            )}
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img src={user.avatar} className="w-full h-full rounded-full object-cover border-2 border-white shadow-md" alt={user.name} />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                index === 0 ? 'bg-yellow-400 text-yellow-900' : 
                index === 1 ? 'bg-gray-200 text-gray-600' : 
                'bg-orange-100 text-orange-700'
              }`}>
                {user.rank}
              </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{user.name}</h3>
            <div className="flex items-center justify-center space-x-2 mb-4">
               <span className="text-indigo-600 font-bold text-sm">💎 {user.credits}</span>
               <span className="text-gray-300">•</span>
               <span className="text-gray-500 text-sm font-medium">★ {user.rating}</span>
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(user.badges)].slice(0, 4).map((_, i) => (
                <span key={i} className="text-xs">🏅</span>
              ))}
              {user.badges > 4 && <span className="text-[10px] text-gray-400 font-bold">+{user.badges - 4}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Ranking Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contributor</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Trust Score</th>
              <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {others.map((u) => (
              <tr key={u.rank} className="group hover:bg-gray-50/50 transition-colors cursor-default">
                <td className="px-8 py-5">
                  <span className="font-bold text-gray-400 text-sm">#{u.rank}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <img src={u.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                      <p className="font-bold text-sm text-gray-900">{u.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">Level {Math.floor(u.credits / 100) + 1} Member</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100">
                    ★ {u.rating}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="font-bold text-indigo-600 text-sm">💎 {u.credits}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
