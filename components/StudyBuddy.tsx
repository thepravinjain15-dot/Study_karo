import React, { useEffect, useRef, useState } from 'react';

const STUDY_URL = 'https://study-buddy-bot.vercel.app/';

const StudyBuddy: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // If iframe hasn't loaded within 6s, assume it's blocked or slow
      if (loading) setBlocked(true);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleLoad = () => {
    setLoading(false);
    setBlocked(false);
  };

  const handleOpenNewTab = () => {
    window.open(STUDY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-6 max-w-full w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-black text-[#111827]">Study Buddy</h1>
          <p className="text-sm text-gray-600">A friendly study mentor — embedded inside your dashboard.</p>
        </div>
        {blocked && (
          <div className="text-right">
            <p className="text-sm text-rose-600">This site may block embedding. You can open it in a new tab.</p>
            <button
              onClick={handleOpenNewTab}
              className="mt-2 inline-flex items-center px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              Open in new tab
            </button>
          </div>
        )}
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden h-[calc(100vh-200px)]">
        {!blocked ? (
          <iframe
            ref={iframeRef}
            title="Study Buddy"
            src={STUDY_URL}
            onLoad={handleLoad}
            className="w-full h-full"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center">
            <div>
              <p className="text-gray-700 mb-4">Embedding is blocked by the remote site or taking too long to load.</p>
              <button onClick={handleOpenNewTab} className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
                Open Study Buddy in a new tab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyBuddy;
