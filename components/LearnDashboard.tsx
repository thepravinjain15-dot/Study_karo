
import React, { useState } from 'react';
import { User, Session } from '../types';
import BookingModal from './BookingModal';

interface LearnDashboardProps {
  user: User;
  onUpdateCredits: (amount: number, description: string) => void;
  onAddSession: (session: Session) => void;
}

const LearnDashboard: React.FC<LearnDashboardProps> = ({ user, onUpdateCredits, onAddSession }) => {
  const [search, setSearch] = useState('');
  const [bookingData, setBookingData] = useState<{ mentor: string; skill: string; cost: number } | null>(null);

  const mentors = [
    { name: 'Dr. Emily Watson', skill: 'Quantum Physics', cost: 15, rating: 4.9, bio: 'PhD in Particle Physics with 10+ years teaching experience.' },
    { name: 'Jake Sully', skill: 'Bioluminescence Art', cost: 10, rating: 4.8, bio: 'Professional digital artist specializing in neon and glow.' },
    { name: 'Monica Geller', skill: 'Professional Organizing', cost: 8, rating: 5.0, bio: 'I will change your life through systematic storage.' },
    { name: 'Linus Torvalds', skill: 'C Programming', cost: 25, rating: 4.9, bio: 'Founder of major open source initiatives.' },
  ].filter(m => m.skill.toLowerCase().includes(search.toLowerCase()));

  const confirmBooking = () => {
    if (!bookingData) return;
    onUpdateCredits(-bookingData.cost, `Booked ${bookingData.skill} with ${bookingData.mentor}`);
    onAddSession({
      id: Math.random().toString(36).substr(2, 9),
      skill: bookingData.skill,
      peer: bookingData.mentor,
      time: 'Starts in 2h',
      status: 'Scheduled',
      cost: bookingData.cost
    });
    setBookingData(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in slide-in-from-right-4 duration-500">
      <section className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Acquire New Skills</h1>
          <p className="text-gray-500 font-medium">Browse verified mentors and schedule 1-on-1 sessions using your credits.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search skills (e.g. Coding, Yoga)..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor, i) => (
          <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-8 flex flex-col group hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl shadow-inner">
                {mentor.skill.includes('Physics') ? '⚛️' : mentor.skill.includes('Art') ? '🎨' : mentor.skill.includes('C ') ? '💻' : '🧼'}
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Session Cost</p>
                <p className="text-xl font-black text-indigo-600">💎 {mentor.cost}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-gray-900 mb-2">{mentor.skill}</h3>
            <p className="text-sm font-bold text-indigo-500 mb-3">by {mentor.name}</p>
            <p className="text-xs text-gray-400 font-medium leading-relaxed mb-8 flex-1">{mentor.bio}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center space-x-1 text-yellow-500 font-bold text-sm">
                <span>★</span> <span>{mentor.rating}</span>
              </div>
              <button 
                onClick={() => setBookingData({ mentor: mentor.name, skill: mentor.skill, cost: mentor.cost })}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookingData && (
        <BookingModal 
          skill={bookingData.skill}
          mentor={bookingData.mentor}
          cost={bookingData.cost}
          userCredits={user.credits}
          onConfirm={confirmBooking}
          onClose={() => setBookingData(null)}
        />
      )}
    </div>
  );
};

export default LearnDashboard;
