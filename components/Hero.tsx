
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-10 pointer-events-none">
        <img src="https://picsum.photos/seed/plants/1200/800" alt="Plant background" className="w-full h-full object-cover rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
          AI-Powered Agriculture
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-900 mb-6 leading-tight">
          Empowering Farmers with <br />
          <span className="text-emerald-600">Agricultural Intelligence</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-stone-600 mb-10 leading-relaxed">
          The Green Oracle is a smart diagnostic system designed to identify plant diseases instantly. 
          Upload a photo of a leaf and get professional-grade advice for treatment and prevention.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95"
          >
            Diagnose My Plant
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-2xl font-bold text-lg hover:bg-stone-50 transition-all active:scale-95">
            Learn More
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Accuracy', value: '98%', desc: 'AI Vision' },
            { label: 'Speed', value: '< 5s', desc: 'Real-time Analysis' },
            { label: 'Accessibility', value: '24/7', desc: 'Always Available' },
            { label: 'Cost', value: 'Free', desc: 'Open Access' },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-stone-900">{stat.label}</div>
              <div className="text-xs text-stone-500 uppercase tracking-wide">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
