
import React, { useState } from 'react';
import { MOCK_POSTS } from '../constants';
import { Post } from '../types';

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-xl">✍️</div>
        <button className="flex-1 text-left px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:bg-gray-100 transition-colors">
          Share an update or milestone...
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.userAvatar} className="w-10 h-10 rounded-full border border-gray-100" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{post.userName}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{post.timestamp}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${i < post.rating ? 'text-indigo-600' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
            </div>
            
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-700 leading-relaxed">{post.caption}</p>
            </div>

            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img src={post.image} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-4 flex items-center space-x-6 border-t border-gray-50">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <span className="text-lg">👏</span>
                <span className="text-xs font-bold">{post.likes} Cheers</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <span className="text-lg">💬</span>
                <span className="text-xs font-bold">{post.comments.length} Comments</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
