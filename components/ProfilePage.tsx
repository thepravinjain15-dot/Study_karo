
import React, { useState } from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const handleLinkedInShare = () => {
    const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent("https://skillswap.pro/cert/verification-id-88229");
    window.open(url, '_blank', 'width=600,height=600');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-50/50" />
        <div className="relative z-10">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">{user.name}</h1>
          <p className="text-gray-500 font-medium text-sm mb-8">
            {user.level} • Joined {user.joinDate}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
             <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center space-x-2 shadow-sm">
               <span>⚙️</span> <span>Edit Profile</span>
             </button>
             <button 
               onClick={handleLinkedInShare}
               className="bg-[#0077b5] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#00669c] transition-all shadow-sm flex items-center space-x-2"
             >
               <span>🔗</span> <span>Connect LinkedIn</span>
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Skills Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-indigo-600">🎯</span> Professional Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Teaching</p>
                <div className="flex flex-wrap gap-2">
                  {user.skillsTaught.map((skill, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold text-xs border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Learning Interests</p>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-xs border border-emerald-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3 text-yellow-500">🏆</span> Community Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {user.badges.map((badge) => (
                <div key={badge.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col items-center text-center transition-all hover:bg-white hover:border-indigo-100 hover:shadow-sm cursor-default">
                  <span className="text-3xl mb-3">{badge.icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 leading-tight">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Certifications</h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 group">
                 <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">React Ecosystems</p>
                 <p className="font-bold text-xs text-gray-800 mb-4 tracking-tight">Certified Mentor v2.0</p>
                 <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"
                 >
                   View Certificate
                 </button>
              </div>
              
              <div className="p-6 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 text-center py-10">
                 <span className="text-2xl mb-2">🎓</span>
                 <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Complete more sessions to unlock advanced badges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden animate-in zoom-in duration-300">
             <button onClick={() => setShowCertificate(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors">✕</button>
             
             <div className="p-12 text-center space-y-8">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
                   <div className="text-left">
                      <p className="text-xl font-bold text-indigo-600 tracking-tight">SkillSwap Pro</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Official Certification</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: SS-88229-X</p>
                   </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Certificate of Expertise</h2>
                  <p className="text-gray-500 font-medium">This is to certify that</p>
                  <p className="text-3xl font-extrabold text-indigo-600 font-heading">{user.name}</p>
                  <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                    Has successfully demonstrated mastery in <span className="text-gray-900 font-bold">React Ecosystems & UI Architecture</span> by completing over 40+ verified peer-teaching sessions.
                  </p>
                </div>

                <div className="pt-10 flex items-center justify-between border-t border-gray-100">
                   <div className="text-left">
                      <p className="text-xs font-bold text-gray-900">SkillSwap Verified</p>
                      <p className="text-[10px] text-gray-400 font-medium italic">Authorized via Decentralized Protocol</p>
                   </div>
                   <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center border border-indigo-100">
                      <span className="text-2xl">🎖️</span>
                   </div>
                </div>
                
                <button 
                  onClick={handleLinkedInShare}
                  className="w-full bg-[#0077b5] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#00669c] transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>🔗</span> <span>Share to LinkedIn Profile</span>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
