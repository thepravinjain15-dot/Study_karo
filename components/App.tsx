
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SocialFeed from './components/SocialFeed';
import Marketplace from './components/Marketplace';
import ProfilePage from './components/ProfilePage';
import Leaderboard from './components/Leaderboard';
import Chatbot from './components/Chatbot';
import LoginModal from './components/LoginModal';
import { MOCK_USER } from './constants';
import { User, Session, Transaction } from './types';

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ ...MOCK_USER, credits: 100 });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('skillswap_auth');
    if (saved === 'true') setIsLoggedIn(true);

    const savedUser = localStorage.getItem('skillswap_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
    }

    const savedSessions = localStorage.getItem('skillswap_sessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));

    const savedTx = localStorage.getItem('skillswap_tx');
    if (savedTx) setTransactions(JSON.parse(savedTx));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('skillswap_auth', 'true');
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('skillswap_auth');
    localStorage.removeItem('skillswap_user');
    localStorage.removeItem('skillswap_sessions');
    localStorage.removeItem('skillswap_tx');
  };

  const updateCredits = (amount: number, description: string) => {
    const newCredits = Math.max(0, user.credits + amount);
    const newUser = { ...user, credits: newCredits };
    setUser(newUser);
    localStorage.setItem('skillswap_user', JSON.stringify(newUser));

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: amount > 0 ? 'earn' : 'spend',
      amount: Math.abs(amount),
      description,
      date: new Date().toLocaleDateString(),
    };
    const newTxs = [newTx, ...transactions];
    setTransactions(newTxs);
    localStorage.setItem('skillswap_tx', JSON.stringify(newTxs));
  };

  const addSession = (session: Session) => {
    const newSessions = [session, ...sessions];
    setSessions(newSessions);
    localStorage.setItem('skillswap_sessions', JSON.stringify(newSessions));
  };

  if (!isLoggedIn && location.pathname !== '/') {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {isLoggedIn && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {isLoggedIn ? (
          <TopBar user={user} onLogout={handleLogout} />
        ) : null}
        
        <main className={`flex-1 overflow-y-auto ${isLoggedIn ? '' : ''}`}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage onSignUp={() => setShowLoginModal(true)} />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  user={user} 
                  onUpdateCredits={updateCredits} 
                  onAddSession={addSession}
                  sessions={sessions}
                />
              } 
            />
            <Route path="/feed" element={<div className="ml-60 p-8"><SocialFeed /></div>} />
            <Route path="/marketplace" element={<div className="ml-60 p-8"><Marketplace onUpdateCredits={updateCredits} userCredits={user.credits} /></div>} />
            <Route path="/profile" element={<div className="ml-60 p-8"><ProfilePage user={user} /></div>} />
            <Route path="/leaderboard" element={<div className="ml-60 p-8"><Leaderboard /></div>} />
          </Routes>
        </main>
      </div>

      {isLoggedIn && <Chatbot />}
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
