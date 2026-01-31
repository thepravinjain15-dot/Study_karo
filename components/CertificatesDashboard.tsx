
import React from 'react';
import { User } from '../types';

interface CertificatesDashboardProps {
  user: User;
}

const CertificatesDashboard: React.FC<CertificatesDashboardProps> = ({ user }) => {
  const earnedCerts = [
    { id: 'c1', title: 'React Mastery v4.0', hours: 42, date: 'Mar 24, 2024', provider: 'SkillSwap Verified' },
    { id: 'c2', title: 'UI UX Architecture', hours: 18, date: 'Feb 12, 2024', provider: 'Design Hub' },
  ];

  const downloadCertificate = async (cert: any) => {
    try {
      const width = 1200;
      const height = 900;
      const svg = `<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
          <defs>
            <style>
              .bg{fill:#0f172a}
              .card{fill:#fff;rx:24}
              .title{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; fill:#111827}
              .muted{font-family:Inter; fill:#6b7280}
            </style>
          </defs>
          <rect width='100%' height='100%' class='bg' />
          <rect x='40' y='40' width='1120' height='820' fill='#fff' rx='24' />
          <text x='600' y='170' text-anchor='middle' font-size='36' font-weight='700' class='title'>Certificate of Achievement</text>
          <text x='600' y='270' text-anchor='middle' font-size='28' class='muted'>This certifies that</text>
          <text x='600' y='340' text-anchor='middle' font-size='48' font-weight='800' class='title'>${user.name || 'Learner'}</text>
          <text x='600' y='420' text-anchor='middle' font-size='22' class='muted'>has completed the course</text>
          <text x='600' y='480' text-anchor='middle' font-size='30' font-weight='700' class='title'>${cert.title}</text>
          <text x='600' y='560' text-anchor='middle' font-size='16' class='muted'>${cert.hours} hours • ${cert.provider}</text>
          <text x='600' y='620' text-anchor='middle' font-size='14' class='muted'>Verified on ${cert.date}</text>
          <g transform='translate(160,660)'>
            <rect x='0' y='0' width='360' height='80' rx='12' fill='#111827' opacity='0.06'/>
            <text x='20' y='48' font-size='14' fill='#374151' class='muted'>SkillSwap • skillswap.pro</text>
          </g>
        </svg>`;

      const svgData = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const safeName = cert.title.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
          a.download = `${safeName}-certificate.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      img.onerror = (e) => {
        console.error('Image load error', e);
        alert('Failed to generate certificate image.');
      };
      img.src = svgData;
    } catch (err) {
      console.error('Download certificate error:', err);
      alert('Could not download certificate.');
    }
  };


  const handleLinkedInShare = (certTitle: string) => {
    const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(`https://skillswap.pro/verify/${certTitle.replace(/\s+/g, '-').toLowerCase()}`);
    window.open(url, '_blank', 'width=600,height=600');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <section>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Verified Credentials</h1>
        <p className="text-gray-500 font-medium">Your earned achievements and professional learning certifications.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {earnedCerts.map((cert, i) => (
          <div key={cert.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Certification</p>
              <h3 className="text-xl font-black leading-tight mb-4">{cert.title}</h3>
              <div className="flex justify-between items-end">
                <div>
                   <p className="text-[10px] font-bold opacity-60 uppercase">Verified on</p>
                   <p className="text-xs font-black">{cert.date}</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm">🎖️</div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Total Hours</span>
                <span className="text-gray-900 font-black">{cert.hours}h</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-widest">Issuer</span>
                <span className="text-indigo-600 font-black">{cert.provider}</span>
              </div>
              <div className="flex space-x-2 pt-4 border-t border-gray-50">
                <button onClick={() => downloadCertificate(cert)} className="flex-1 py-3 bg-gray-50 text-gray-700 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Download</button>
                <button 
                  onClick={() => handleLinkedInShare(cert.title)}
                  className="flex-1 py-3 bg-[#0077b5] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#00669c] transition-all shadow-md shadow-blue-100"
                >
                  Share to LinkedIn
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm text-gray-300">🎓</div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">Complete more teaching sessions to unlock advanced badges.</p>
        </div>
      </div>
    </div>
  );
};

export default CertificatesDashboard;
