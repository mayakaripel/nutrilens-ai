import React, { useState } from 'react';
import { CheckSquare, Square, Terminal, ArrowRight } from 'lucide-react';

interface TacticalAdviceProps {
  steps: string[];
}

export const TacticalAdvice: React.FC<TacticalAdviceProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  if (!steps || steps.length === 0) return null;

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl mt-6">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400">
          <Terminal className="w-5 h-5" />
          <h3 className="font-mono font-bold text-sm tracking-wide uppercase">Deployment Checklist</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-emerald-500">{progress}%</span>
        </div>
      </div>

      <div className="p-2">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          return (
            <div 
              key={index}
              onClick={() => toggleStep(index)}
              className={`
                group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent
                ${isCompleted 
                  ? 'bg-emerald-900/10 text-slate-500 line-through decoration-slate-600' 
                  : 'hover:bg-slate-800/50 hover:border-slate-700 text-slate-300'}
              `}
            >
              <div className={`mt-0.5 shrink-0 transition-colors ${isCompleted ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-400'}`}>
                {isCompleted ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
              </div>
              <div className="font-mono text-sm leading-relaxed">
                {step}
              </div>
              {!isCompleted && (
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};