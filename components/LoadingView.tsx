import React, { useState, useEffect } from 'react';
import { Loader2, Terminal } from 'lucide-react';

const LOADING_MESSAGES = [
  "npm install ingredients...",
  "Compiling nutritional data...",
  "Running lint checks on calories...",
  "Checking for circular dependencies (indigestion)...",
  "Optimizing database queries (stomach capacity)...",
  "Debugging lactose compatibility...",
  "Minifying bloat potential...",
  "Deploying to staging environment..."
];

export const LoadingView: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 animate-in fade-in duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-200 blur-xl rounded-full opacity-50 animate-pulse"></div>
        <div className="relative bg-white p-4 rounded-full shadow-sm border border-emerald-100 flex items-center justify-center">
          <Terminal className="w-6 h-6 text-emerald-600 absolute" />
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin opacity-50" />
        </div>
      </div>
      <div className="font-mono text-sm">
        <span className="text-emerald-600 font-bold">{">"}</span> 
        <h3 className="inline-block ml-2 text-slate-800 min-h-[1.5em] transition-all duration-300">
          {LOADING_MESSAGES[messageIndex]}
        </h3>
      </div>
      <p className="text-xs text-slate-400 font-mono">Estimated build time: 5-10s</p>
    </div>
  );
};
