
import React, { useState } from 'react';
import { User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user?: User) => void;
  initialMode?: 'signin' | 'signup';
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const [loading, setLoading] = useState(false);

  // Sign in fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up fields
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const showError = (msg: string) => alert(msg);

  const readAccounts = () => {
    try {
      const raw = localStorage.getItem('skillswap_accounts');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  };

  const writeAccounts = (accounts: any[]) => {
    localStorage.setItem('skillswap_accounts', JSON.stringify(accounts));
  };

  // Seed a demo account if none exist for convenience
  React.useEffect(() => {
    const accounts = readAccounts();
    if (!accounts || accounts.length === 0) {
      // seed a demo account that includes sample hours to appear on the dashboard
      const demo = { name: 'Alex Rivera', email: 'demo@skillswap.pro', password: 'password123', avatar: '', sessionsTaught: 12, sessionsLearned: 6 };
      writeAccounts([demo]);
    }
  }, []);

  const makeUserObj = (name: string, avatar?: string, sessionsTaught = 0, sessionsLearned = 0) => ({
    id: Math.random().toString(36).substr(2, 9),
    name,
    avatar: avatar || `/avatars/${name.replace(/\s+/g, '-').toLowerCase()}.png`,
    level: 'Learner',
    credits: 100,
    rating: 4.8,
    joinDate: new Date().toLocaleDateString(),
    sessionsTaught,
    sessionsLearned,
    skillsTaught: [],
    skillsWanted: [],
    badges: [],
  });

  const handleSignIn = () => {
    if (!email || !password) return showError('Please enter email and password');
    setLoading(true);
    setTimeout(() => {
      const accounts = readAccounts();
      const found = accounts.find((a: any) => a.email === email && a.password === password);
      if (!found) {
        setLoading(false);
        return showError('Invalid credentials. Please check email and password or sign up.');
      }
      const user = makeUserObj(found.name, found.avatar, found.sessionsTaught || 0, found.sessionsLearned || 0);
      localStorage.setItem('skillswap_user', JSON.stringify(user));
      setLoading(false);
      onLogin(user);
    }, 800);
  };

  const handleSignUp = () => {
    if (!name || !signupEmail || !signupPassword) return showError('Please provide name, email and password');
    setLoading(true);
    setTimeout(() => {
      const accounts = readAccounts();
      if (accounts.find((a: any) => a.email === signupEmail)) {
        setLoading(false);
        return showError('An account already exists with this email. Please sign in.');
      }
      const account = { name, email: signupEmail, password: signupPassword, avatar: '' };
      accounts.unshift(account);
      writeAccounts(accounts);

      const user = makeUserObj(account.name, account.avatar);
      localStorage.setItem('skillswap_user', JSON.stringify(user));
      setLoading(false);
      onLogin(user);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
        >
          ✕
        </button>

        <div className="p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button onClick={() => setMode('signin')} className={`px-4 py-2 rounded-lg font-bold ${mode === 'signin' ? 'bg-indigo-600 text-white' : 'text-gray-600 bg-gray-50'}`}>Sign In</button>
            <button onClick={() => setMode('signup')} className={`px-4 py-2 rounded-lg font-bold ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'text-gray-600 bg-gray-50'}`}>Sign Up</button>
          </div>

          {mode === 'signin' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium" />
              </div>

              <button onClick={handleSignIn} disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-indigo-200">{loading ? <span className="animate-spin">⌛</span> : 'Sign In'}</button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Choose a password" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium" />
              </div>

              <button onClick={handleSignUp} disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3 shadow-lg shadow-indigo-200">{loading ? <span className="animate-spin">⌛</span> : 'Create Account'}</button>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
            Secure login with SkillSwap Auth Engine
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
