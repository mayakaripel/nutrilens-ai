import React, { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onClear: () => void;
  selectedImage: File | null;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onClear, selectedImage, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClear();
  };

  if (selectedImage && previewUrl) {
    return (
      <div className="relative w-full h-64 md:h-80 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
        <img src={previewUrl} alt="Food Preview" className="w-full h-full object-cover" />
        {!disabled && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={() => !disabled && fileInputRef.current?.click()}
      className={`w-full h-64 md:h-80 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer
        ${disabled ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' : 'bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30'}
      `}
    >
      <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
        <Camera className="w-8 h-8" />
      </div>
      <div className="text-center px-4">
        <p className="font-medium text-slate-700">Tap to snap or upload</p>
        <p className="text-sm text-slate-400 mt-1">Show us what you're about to eat</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
};
