import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RefreshCw, Code2 } from 'lucide-react';
import { TacticalAdvice } from './TacticalAdvice';

interface ResultViewProps {
  markdown: string;
  steps: string[];
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ markdown, steps, onReset }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow-xl border border-slate-300 overflow-hidden font-mono">
        <div className="bg-slate-950 px-6 py-4 flex items-center gap-3 border-b border-slate-800">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">build_logs.md</h2>
        </div>
        
        <div className="p-6 md:p-8 bg-[#ffffff]">
          {/* Main Markdown Content - Forced to Monospace */}
          <div className="prose prose-slate max-w-none prose-headings:font-mono prose-headings:font-bold prose-p:font-mono prose-li:font-mono prose-strong:text-slate-900 prose-headings:text-slate-900 text-sm md:text-base leading-relaxed text-slate-700">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-base uppercase tracking-wider font-bold mt-8 mb-4 text-emerald-700 border-b-2 border-emerald-100 pb-1 flex items-center gap-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-none pl-0 space-y-3 mb-6" {...props} />,
                li: ({node, ...props}) => (
                  <li className="relative pl-5 before:content-['>'] before:absolute before:left-0 before:text-emerald-500 before:font-bold" {...props} />
                ),
                strong: ({node, ...props}) => <strong className="font-bold text-slate-900 bg-slate-100 px-1 py-0.5 rounded" {...props} />,
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          <TacticalAdvice steps={steps} />
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white border border-slate-700 rounded hover:bg-slate-800 transition-all font-mono text-sm shadow-lg hover:shadow-xl active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            $ reboot_system
          </button>
        </div>
      </div>
    </div>
  );
};