
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  credits: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout, credits, darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const navItems = [
    { label: 'ARENA', path: '/dashboard', icon: '⚔️' },
    { label: 'FEED', path: '/feed', icon: '📡' },
    { label: 'VAULT', path: '/marketplace', icon: '💎' },
    { label: 'FAME', path: '/leaderboard', icon: '🏆' },
    { label: 'USER', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-6xl">
      <nav className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl relative overflow-hidden group">
        {/* Decorative HUD Scanline */}
        <div className="animate-scanline opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logos/learn-loop.svg" alt="Learn Loop" className="w-12 h-12 rounded-full bg-white p-1 shadow-lg object-contain" />
            <span className="hidden md:block text-xl font-black font-gamer tracking-tighter text-white">
              SKILLSWAP<span className="text-blue-500">.PRO</span>
            </span>
          </Link>

          {isLoggedIn && (
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl text-[10px] font-black font-gamer tracking-[0.2em] transition-all flex items-center space-x-2 ${
                    location.pathname === item.path 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {location.pathname === item.path && (
                    <span className="absolute inset-0 bg-blue-600/10 rounded-xl border border-blue-500/20"></span>
                  )}
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">Credits</span>
                <span className="text-lg font-black text-white font-gamer leading-none mt-1">
                   <span className="text-blue-500">💎</span> {credits}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <button 
                onClick={onLogout}
                className="text-[10px] font-black text-red-500 hover:text-red-400 font-gamer tracking-widest"
              >
                DISCONNECT
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black font-gamer tracking-widest hover:bg-blue-500 transition-all shadow-xl text-[10px] clip-hud"
            >
              LOGIN / SIGNUP
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
