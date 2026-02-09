import React from 'react';
import { UserProfile } from '../types';
import { Settings, Terminal as TerminalIcon } from 'lucide-react';

interface ProfileFormProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  disabled?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onChange, disabled }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...profile, [name]: value });
  };

  const handleSensitivityToggle = (sensitivity: string) => {
    const current = profile.sensitivities;
    const next = current.includes(sensitivity)
      ? current.filter(s => s !== sensitivity)
      : [...current, sensitivity];
    onChange({ ...profile, sensitivities: next });
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-700 overflow-hidden font-mono flex flex-col h-full">
      {/* IDE Tab Bar */}
      <div className="flex items-center bg-[#252526] border-b border-black px-4 py-2 gap-2">
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#1e1e1e] px-3 py-1 rounded-t-md border-t border-l border-r border-transparent">
          <Settings className="w-3 h-3" />
          <span>user_config.json</span>
        </div>
      </div>

      <div className="p-6 space-y-6 text-sm text-slate-300">
        
        {/* Hardware Specs */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold select-none">
            // System Specifications
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-xs text-emerald-500 mb-1 group-hover:text-emerald-400 transition-colors">"hardware_age":</label>
              <input
                type="number"
                name="age"
                value={profile.age}
                onChange={handleInputChange}
                disabled={disabled}
                className="w-full bg-[#2d2d2d] border border-slate-700 rounded px-2 py-1.5 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <div className="group">
              <label className="block text-xs text-emerald-500 mb-1 group-hover:text-emerald-400 transition-colors">"model_type":</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                disabled={disabled}
                className="w-full bg-[#2d2d2d] border border-slate-700 rounded px-2 py-1.5 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              >
                <option value="Male">"Male"</option>
                <option value="Female">"Female"</option>
                <option value="Other">"Other"</option>
              </select>
            </div>
          </div>
        </div>

        {/* Runtime Config */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold select-none">
            // Runtime Objectives
          </h3>
          <div className="group">
            <label className="block text-xs text-emerald-500 mb-1 group-hover:text-emerald-400 transition-colors">"optimization_goal":</label>
            <select
              name="goal"
              value={profile.goal}
              onChange={handleInputChange}
              disabled={disabled}
              className="w-full bg-[#2d2d2d] border border-slate-700 rounded px-2 py-1.5 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
            >
              <option value="Maintenance">"MAINTENANCE_MODE"</option>
              <option value="Weight Loss">"DECREASE_LOAD"</option>
              <option value="Muscle Gain">"SCALE_UP_INFRA"</option>
            </select>
          </div>
        </div>

        {/* Dependencies/Conflicts */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold select-none">
            // Dependency Conflicts
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Lactose', 'Gluten', 'Nuts', 'Shellfish', 'Soy'].map(s => (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => handleSensitivityToggle(s)}
                className={`px-3 py-1.5 rounded border text-xs font-medium transition-all ${
                  profile.sensitivities.includes(s)
                    ? 'bg-red-900/30 border-red-500/50 text-red-400'
                    : 'bg-[#2d2d2d] border-slate-700 text-slate-500 hover:border-slate-500'
                }`}
              >
                {profile.sensitivities.includes(s) ? `!${s}` : s}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Config */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold select-none">
            // User Logs
          </h3>
          <div className="group">
            <label className="block text-xs text-emerald-500 mb-1 group-hover:text-emerald-400 transition-colors">"bio":</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              disabled={disabled}
              className="w-full bg-[#2d2d2d] border border-slate-700 rounded px-2 py-2 text-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none min-h-[80px] text-xs leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Load Status */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-blue-400">"current_load_average":</label>
            <span className="text-xs font-bold text-blue-400">
              {(profile.hungerLevel / 10).toFixed(2)}
            </span>
          </div>
          <div className="relative w-full h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
             <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${
                profile.hungerLevel > 7 ? 'bg-red-500' : profile.hungerLevel > 4 ? 'bg-yellow-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${profile.hungerLevel * 10}%`}}
             />
          </div>
          <input
            type="range"
            min="1"
            max="10"
            name="hungerLevel"
            value={profile.hungerLevel}
            onChange={(e) => onChange({ ...profile, hungerLevel: parseInt(e.target.value) })}
            disabled={disabled}
            className="w-full h-4 opacity-0 absolute -mt-3 cursor-pointer"
          />
        </div>

      </div>
    </div>
  );
};