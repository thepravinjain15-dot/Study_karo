
import React from 'react';

interface BookingModalProps {
  skill: string;
  mentor: string;
  cost: number;
  userCredits: number;
  onConfirm: () => void;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ skill, mentor, cost, userCredits, onConfirm, onClose }) => {
  const canAfford = userCredits >= cost;

  return (
    <div className="fixed inset-0 z-[250] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">🗓️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Session</h2>
            <p className="text-gray-500 text-sm">Review your session details</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 text-sm font-medium">Skill</span>
              <span className="text-gray-900 text-sm font-bold">{skill}</span>
            </div>
            <div className="flex justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 text-sm font-medium">Mentor</span>
              <span className="text-gray-900 text-sm font-bold">{mentor}</span>
            </div>
            <div className="flex justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="text-indigo-600 text-sm font-bold">Cost</span>
              <span className="text-indigo-700 text-lg font-black">💎 {cost}</span>
            </div>
          </div>

          {!canAfford && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold mb-6 border border-red-100">
              ⚠️ Insufficient credits. Teach a session to earn more!
            </div>
          )}

          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              disabled={!canAfford}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
