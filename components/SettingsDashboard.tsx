
import React, { useState } from 'react';
import { User } from '../types';

interface SettingsDashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const SettingsDashboard: React.FC<SettingsDashboardProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <section>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-500 font-medium">Manage your personal information, security protocols, and preferences.</p>
      </section>

      <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col md:flex-row">
        {/* SIDE NAV */}
        <div className="w-full md:w-64 border-r border-gray-100 p-6 space-y-2">
           {[
             { id: 'profile', label: 'Profile Information', icon: '👤' },
             { id: 'security', label: 'Security & 2FA', icon: '🔒' },
             { id: 'notifications', label: 'Notifications', icon: '🔔' },
           ].map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-3 ${
                 activeTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
               }`}
             >
               <span>{item.icon}</span>
               <span>{item.label}</span>
             </button>
           ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-10">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <h3 className="text-xl font-black text-gray-900">Personal Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                   <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium" defaultValue={user.name} />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                   <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium" defaultValue="alex.rivera@example.com" />
                 </div>
               </div>
               <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                 Save Changes
               </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <h3 className="text-xl font-black text-gray-900">Security Center</h3>
               <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                    <span className="text-2xl text-emerald-600">🛡️</span>
                    <div>
                       <p className="text-sm font-black text-emerald-700">Two-Factor Authentication</p>
                       <p className="text-xs text-emerald-600 font-medium">Your account is currently protected.</p>
                    </div>
                 </div>
                 <button className="text-[10px] font-black text-emerald-700 uppercase tracking-widest hover:underline">Manage</button>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <div>
                       <p className="text-sm font-bold text-gray-900">Change Password</p>
                       <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest">Update</button>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div>
                       <p className="text-sm font-bold text-gray-900">LinkedIn Integration</p>
                       <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Connected</p>
                    </div>
                    <button className="text-red-500 font-bold text-[10px] uppercase tracking-widest">Disconnect</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
