
import React from 'react';
import { User, Session } from '../types';

interface TeachDashboardProps {
  user: User;
  sessions: Session[];
}

const TeachDashboard: React.FC<TeachDashboardProps> = ({ user, sessions }) => {
  const offerings = [
    { skill: 'React Development', level: 'Expert', demand: 'High', price: 10 },
    { skill: 'UI Architecture', level: 'Advanced', demand: 'Medium', price: 15 },
    { skill: 'Public Speaking', level: 'Intermediate', demand: 'High', price: 5 },
  ];

  const pendingRequests = [
    { name: 'John Doe', skill: 'React Development', time: 'Tomorrow, 10:00 AM' },
    { name: 'Sarah Miller', skill: 'UI Architecture', time: 'Friday, 2:00 PM' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in slide-in-from-left-4 duration-500">
      <section>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Mentor Command Center</h1>
        <p className="text-gray-500 font-medium">Manage your expertise and pending requests from the community.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* OFFERINGS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-xl font-black text-gray-900">Current Offerings</h2>
               <button className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-all">+ Add Skill</button>
             </div>
             <div className="space-y-4">
               {offerings.map((offer, i) => (
                 <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                   <div>
                     <p className="text-sm font-black text-gray-900 mb-1">{offer.skill}</p>
                     <div className="flex items-center space-x-3">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{offer.level}</span>
                       <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${offer.demand === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                         {offer.demand} Demand
                       </span>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Rate</p>
                     <p className="text-lg font-black text-indigo-600">💎 {offer.price}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* PENDING REQUESTS */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100">
              <h2 className="text-xl font-black mb-6">Pending Requests</h2>
              <div className="space-y-4">
                {pendingRequests.map((req, i) => (
                  <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-xs font-black mb-1">{req.name} wants to learn</p>
                    <p className="text-sm font-bold opacity-80 mb-4">{req.skill}</p>
                    <div className="flex space-x-2">
                       <button className="flex-1 bg-white text-indigo-600 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">Accept</button>
                       <button className="flex-1 bg-red-500/20 text-white py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/30 transition-all">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Performance Insights</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-2xl font-black text-emerald-600">4.9</p>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Avg Rating</p>
                 </div>
                 <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-2xl font-black text-blue-600">92%</p>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Success Rate</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TeachDashboard;
