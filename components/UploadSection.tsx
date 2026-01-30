
import React, { useRef, useState } from 'react';

interface UploadSectionProps {
  onAnalyze: (base64: string) => void;
  isAnalyzing: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
      // Strip prefix for API
      const base64Data = base64.split(',')[1];
      onAnalyze(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className={`relative border-2 border-dashed rounded-[2rem] p-12 transition-all flex flex-col items-center justify-center text-center ${
          dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/10'
        } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        {preview && !isAnalyzing ? (
          <div className="relative w-full max-w-xs aspect-square mb-6">
            <img src={preview} alt="Plant Preview" className="w-full h-full object-cover rounded-2xl shadow-lg" />
            <button 
              onClick={() => { setPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <h3 className="text-xl font-bold text-stone-900 mb-2">
          {isAnalyzing ? 'Analyzing Image...' : preview ? 'Analyze this plant?' : 'Upload Leaf Photo'}
        </h3>
        <p className="text-stone-500 mb-8 max-w-xs">
          Take a clear photo of the infected area or drop your image here.
        </p>

        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {!preview && (
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Choose Gallery
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold shadow-lg shadow-stone-200 hover:bg-stone-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Use Camera
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-8 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium text-emerald-600 animate-pulse">Our Oracle is consulting the knowledge base...</p>
          </div>
        )}
      </div>
      
      <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
        <div className="text-amber-500 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 mb-1">For Best Results</h4>
          <p className="text-xs text-amber-800/80 leading-relaxed">
            Ensure the leaf is well-lit, centered, and the infection is clearly visible. Avoid busy backgrounds or multiple leaves in one shot.
          </p>
        </div>
      </div>
    </div>
  );
};
