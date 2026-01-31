
import React from 'react';
import { User } from '../types';

interface TopBarProps {
  user: User;
  onLogout: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ user, onLogout }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40 ml-60">
      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input 
            type="search" 
            placeholder="Search skills or people..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-standard"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
          <span className="text-sm">💳</span>
          <span className="text-sm font-bold text-indigo-700">{user.credits} Credits</span>
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center space-x-3 group cursor-pointer relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-8 h-8 rounded-full border border-gray-200 object-cover"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-none mb-1">{user.name}</p>
            <p className="text-[10px] text-gray-500 font-medium">Standard Plan</p>
          </div>
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-standard p-1 z-50">
            <button className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-md transition-colors font-semibold">
              Profile Settings
            </button>
            <button 
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors font-bold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
