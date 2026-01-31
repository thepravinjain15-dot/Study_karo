
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

import LoginModal from './components/LoginModal';
import LearnDashboard from './components/LearnDashboard';
import TeachDashboard from './components/TeachDashboard';
import SessionsDashboard from './components/SessionsDashboard';
import CertificatesDashboard from './components/CertificatesDashboard';
import SettingsDashboard from './components/SettingsDashboard';
import StudyBuddy from './components/StudyBuddy';
import Toast from './components/Toast';
import { MOCK_USER } from './constants';
import { User, Session, Transaction } from './types';

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginModalMode, setLoginModalMode] = useState<'signin' | 'signup'>('signin');
  const [toast, setToast] = useState<string | null>(null);
  const [user, setUser] = useState<User>({ ...MOCK_USER, credits: 100 });
  const [sessions, setSessions] = useState<Session[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const location = useLocation();

  useEffect(() => {
    const savedAuth = localStorage.getItem('skillswap_auth');
    if (savedAuth === 'true') setIsLoggedIn(true);

    const savedUser = localStorage.getItem('skillswap_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && typeof parsedUser === 'object') setUser(parsedUser);
      } catch (e) { console.error("Failed to parse user", e); }
    }

    const savedSessions = localStorage.getItem('skillswap_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        if (Array.isArray(parsed)) setSessions(parsed);
      } catch (e) { console.error("Failed to parse sessions", e); }
    }

    const savedTx = localStorage.getItem('skillswap_tx');
    if (savedTx) {
      try {
        const parsed = JSON.parse(savedTx);
        if (Array.isArray(parsed)) setTransactions(parsed);
      } catch (e) { console.error("Failed to parse transactions", e); }
    }
  }, []);

  const handleLogin = (loggedUser?: User) => {
    setIsLoggedIn(true);
    if (loggedUser) {
      setUser(loggedUser);
      localStorage.setItem('skillswap_user', JSON.stringify(loggedUser));
    }
    localStorage.setItem('skillswap_auth', 'true');
    setShowLoginModal(false);

    // show welcome toast
    setToast(`Welcome, ${loggedUser?.name || 'Learner'}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('skillswap_auth');
    localStorage.removeItem('skillswap_user');
    localStorage.removeItem('skillswap_sessions');
    localStorage.removeItem('skillswap_tx');
    setSessions([]);
    setTransactions([]);
    setUser({ ...MOCK_USER, credits: 100 });
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
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] overflow-hidden">
      {isLoggedIn && <Sidebar onLogout={handleLogout} />}
      
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {isLoggedIn && <TopBar user={user} onLogout={handleLogout} />}
        
        <main className={`flex-1 overflow-y-auto ${isLoggedIn ? 'ml-60' : ''}`}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage onSignUp={() => { setLoginModalMode('signup'); setShowLoginModal(true); }} />} />
            <Route path="/dashboard" element={<Dashboard user={user} onUpdateCredits={updateCredits} onAddSession={addSession} sessions={sessions} />} />
            <Route path="/learn" element={<LearnDashboard user={user} onUpdateCredits={updateCredits} onAddSession={addSession} />} />
            <Route path="/teach" element={<TeachDashboard user={user} sessions={sessions} />} />
            <Route path="/sessions" element={<SessionsDashboard sessions={sessions} />} />
            <Route path="/profile" element={<CertificatesDashboard user={user} />} />
            <Route path="/marketplace" element={<Marketplace onUpdateCredits={updateCredits} userCredits={user.credits} />} />
            <Route path="/feed" element={<SocialFeed />} />
            <Route path="/leaderboard" element={<Leaderboard />} />            <Route path="/study" element={<StudyBuddy />} />            <Route path="/settings" element={<SettingsDashboard user={user} onUpdateUser={setUser} />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />
          </Routes>
        </main>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
          initialMode={loginModalMode}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
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
