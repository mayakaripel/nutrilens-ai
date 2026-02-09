import React, { useState } from 'react';
import { Terminal, Cpu, AlertCircle } from 'lucide-react';
import { UserProfile, AppState } from './types';
import { ProfileForm } from './components/ProfileForm';
import { ImageUploader } from './components/ImageUploader';
import { ResultView } from './components/ResultView';
import { LoadingView } from './components/LoadingView';
import { analyzeFoodImage } from './services/geminiService';

const DEFAULT_PROFILE: UserProfile = {
  age: 28,
  gender: 'Male',
  goal: 'Maintenance',
  sensitivities: ['Lactose'],
  dislikes: 'Spaghetti Code',
  bio: 'Full Stack Dev. 90% Coffee, 10% Anxiety. Trying to optimize runtime performance without increasing server costs (waistline).',
  hungerLevel: 8
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisMarkdown, setAnalysisMarkdown] = useState<string>('');
  const [executionSteps, setExecutionSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const result = await analyzeFoodImage(selectedImage, profile);
      setAnalysisMarkdown(result.markdownReport);
      setExecutionSteps(result.executionSteps);
      setAppState(AppState.RESULT);
    } catch (err: any) {
      setAppState(AppState.ERROR);
      setError(err.message || "Something went wrong.");
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setAnalysisMarkdown('');
    setExecutionSteps([]);
    setSelectedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-20 md:pb-10 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="bg-[#1e1e1e] sticky top-0 z-50 border-b border-black shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-emerald-500">
            <div className="p-2 bg-[#2d2d2d] border border-slate-700 rounded">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none font-mono tracking-tight text-slate-200">Full Stack Nutrition</h1>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">v2.0.0 // Stable</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {appState === AppState.ERROR && (
          <div className="bg-red-950/10 text-red-600 p-4 rounded border border-red-200 font-mono text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p><span className="font-bold">Error 500:</span> {error}</p>
          </div>
        )}

        {appState === AppState.RESULT ? (
          <ResultView 
            markdown={analysisMarkdown} 
            steps={executionSteps}
            onReset={handleReset} 
          />
        ) : (
          <>
             {/* Analysis State or Idle State */}
            {appState === AppState.ANALYZING ? (
              <LoadingView />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-6 flex flex-col">
                  <section className="flex-grow flex flex-col">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1 font-mono flex items-center gap-2">
                      <span className="text-emerald-600">01.</span> Upload Payload
                    </h2>
                    <ImageUploader 
                      selectedImage={selectedImage}
                      onImageSelect={handleImageSelect}
                      onClear={handleClearImage}
                    />
                  </section>
                </div>

                <div className="space-y-6 h-full">
                  <section className="h-full">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1 font-mono flex items-center gap-2">
                      <span className="text-emerald-600">02.</span> Configure Environs
                    </h2>
                    <ProfileForm 
                      profile={profile} 
                      onChange={setProfile} 
                    />
                  </section>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Sticky Action Button */}
      {appState === AppState.IDLE && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-slate-200 z-40 md:static md:bg-transparent md:border-0 md:p-0 md:mt-8">
           <div className="max-w-4xl mx-auto">
            <button
              onClick={handleAnalyze}
              disabled={!selectedImage}
              className={`w-full py-4 rounded font-bold text-lg shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 font-mono border
                ${!selectedImage 
                  ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 hover:shadow-emerald-500/20'}
              `}
            >
              <Cpu className="w-5 h-5" />
              {selectedImage ? '$ run analysis --prod' : '$ waiting for input...'}
            </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;