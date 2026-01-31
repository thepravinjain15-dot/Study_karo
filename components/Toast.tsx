import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div className="fixed top-6 right-6 z-[999] pointer-events-auto">
      <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg border border-indigo-700/30">
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
