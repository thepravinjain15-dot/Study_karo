
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Learn Skills', path: '/learn', icon: '🎓' },
    { label: 'Teach Skills', path: '/teach', icon: '🧑‍🏫' },
    { label: 'Sessions', path: '/sessions', icon: '📅' },
    { label: 'Certificates', path: '/profile', icon: '📜' },
    { label: 'Marketplace', path: '/marketplace', icon: '🛒' },
    { label: 'Social Feed', path: '/feed', icon: '📱' },
    { label: 'Study', path: '/study', icon: '🤖' },
    { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-60 bg-[#111827] text-white flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-white/5">
      <div className="p-8 mb-4">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 transition-all group-hover:scale-110">
            S
          </div>
          <span className="text-xl font-black tracking-tight">SkillSwap</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = !item.external && location.pathname === item.path;
          if (item.external) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-gray-400 hover:text-white hover:bg-white/5`}
              >
                <span className="text-lg opacity-80">{item.icon}</span>
                <span>{item.label}</span>
                <span className="ml-auto text-xs opacity-60">↗</span>
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg opacity-80">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-4">
        {/* Quick Share to LinkedIn CTA in Sidebar */}
        <button 
          onClick={() => {
            const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://skillswap.pro/profile/alex-rivera");
            window.open(url, '_blank', 'width=600,height=600');
          }}
          className="w-full flex items-center justify-center space-x-2 bg-[#0077b5] text-white py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00669c] transition-all"
        >
          <span>🔗</span>
          <span>Share Profile</span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors p-3 rounded-xl hover:bg-red-500/5"
        >
          <span className="text-lg">🚪</span>
          <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
