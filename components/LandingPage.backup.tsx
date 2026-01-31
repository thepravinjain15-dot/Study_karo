import React from 'react';

interface LandingPageProps {
  onSignUp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignUp }) => {
  return (
    <div className="bg-white min-h-screen">
      {/* Simple Header */}
      <nav className="container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logos/learn-loop.svg" alt="Learn Loop" className="w-10 h-10 rounded-full bg-white p-1 object-contain shadow-sm" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">SkillSwap</span>
        </div>
        <button 
          onClick={onSignUp}
          className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
        >
          Sign In
        </button>
      </nav>

      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 max-w-2xl">
            <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Available Worldwide
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Master new skills through <span className="text-indigo-600">peer-to-peer</span> exchange.
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              No money required. Trade skills you have for skills you need. Join a community of over 10,000 learners and mentors leveling up together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onSignUp}
                className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
              >
                Join for Free
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
                How it Works
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-8 grayscale opacity-50">
              <span className="font-bold text-sm tracking-widest text-gray-400">TRUSTED BY 10K+ LEARNERS</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-100 rounded-[3rem] rotate-3 blur-3xl opacity-50"></div>
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-2xl relative z-10 space-y-8">
              <div className="flex items-center space-x-4 border-b border-gray-50 pb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">💎</div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Community Vault</p>
                  <p className="text-lg font-bold text-gray-900">14.2k Skills Exchanged</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'React Development', user: 'Sarah Chen', rating: 4.9 },
                  { name: 'Digital Photography', user: 'Marcus Aurelius', rating: 4.8 },
                  { name: 'Spanish Fluency', user: 'Elena Rodriguez', rating: 5.0 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-200"></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-[11px] text-gray-500">by {item.user}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">★ {item.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">The Credit Economy</h2>
            <p className="text-lg text-gray-500 font-medium">Earn by teaching. Spend by learning. It's that simple.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="text-4xl">🧑‍🏫</div>
              <h3 className="text-xl font-bold">Teach Hours</h3>
              <p className="text-gray-500 text-sm">Earn 5 credits for every hour you spend sharing your expertise.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🎓</div>
              <h3 className="text-xl font-bold">Learn Anything</h3>
              <p className="text-gray-500 text-sm">Spend 10 credits to book an hour with any verified mentor.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🏅</div>
              <h3 className="text-xl font-bold">Get Certified</h3>
              <p className="text-gray-500 text-sm">Build your profile and earn verified digital badges for your work.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
