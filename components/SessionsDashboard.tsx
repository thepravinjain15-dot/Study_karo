
import React, { useState } from 'react';
import { Session } from '../types';

interface SessionsDashboardProps {
  sessions: Session[];
}

const SessionsDashboard: React.FC<SessionsDashboardProps> = ({ sessions = [] }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'teaching'>('learning');

  const filtered = sessions.filter(s => activeTab === 'learning' ? s.cost : s.earn);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <section>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Your Schedule</h1>
        <p className="text-gray-500 font-medium">Keep track of your upcoming and past skill exchange appointments.</p>
      </section>

      <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('learning')}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'learning' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Learning Sessions
          </button>
          <button 
            onClick={() => setActiveTab('teaching')}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'teaching' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Teaching Sessions
          </button>
        </div>

        <div className="p-8 space-y-6">
          {filtered.length > 0 ? (
            filtered.map(session => (
              <div key={session.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                    {activeTab === 'learning' ? '🎓' : '🧑‍🏫'}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 mb-1">{session.skill}</h4>
                    <p className="text-xs text-gray-500 font-medium">{session.peer} • {session.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Transaction</p>
                    <p className={`text-sm font-black ${session.cost ? 'text-red-500' : 'text-emerald-600'}`}>
                      {session.cost ? `- 💎${session.cost}` : `+ 💎${session.earn}`}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    session.status === 'Scheduled' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4 opacity-10">🗓️</div>
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">No sessions found in this category.</p>
              <button className="mt-6 text-indigo-600 font-bold text-xs hover:underline">Explore the Marketplace</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionsDashboard;
