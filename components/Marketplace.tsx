
import React, { useState } from 'react';
import { MOCK_RESOURCES } from '../constants';

interface MarketplaceProps {
  onUpdateCredits: (amount: number) => void;
  userCredits: number;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onUpdateCredits, userCredits }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  const filteredResources = MOCK_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = (id: string, price: number) => {
    if (userCredits < price) {
      alert("Insufficient credits. Teach a skill to earn more!");
      return;
    }
    onUpdateCredits(-price);
    setPurchasedId(id);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-block bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
            Premium Resources
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Knowledge Vault</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Unlock expert guides, templates, and study materials.</p>
        </div>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search resources..."
            className="w-full md:w-80 bg-white border border-gray-200 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
               <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                  {resource.category}
               </div>
               {purchasedId !== resource.id && (
                 <div className="absolute inset-0 bg-gray-900/5 flex items-center justify-center">
                    <span className="text-2xl opacity-40">🔒</span>
                 </div>
               )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{resource.title}</h3>
              <p className="text-gray-500 text-xs mb-6 flex-1 leading-relaxed">{resource.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</span>
                  <span className="text-xl font-extrabold text-indigo-600">💎 {resource.price}</span>
                </div>
                
                {purchasedId === resource.id ? (
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 text-center animate-in zoom-in duration-300">
                     <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5">Unlocked</p>
                     <p className="text-[10px] font-mono font-bold">PASS: skillswap123</p>
                  </div>
                ) : (
                  <button 
                    onClick={() => handlePurchase(resource.id, resource.price)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-sm"
                  >
                    Unlock Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <h4 className="font-extrabold text-2xl mb-2 tracking-tight">Monetize Your Expertise</h4>
          <p className="text-indigo-100 text-sm font-medium mb-6">Upload your premium notes and earn credits from the community.</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">
            Become a Creator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
