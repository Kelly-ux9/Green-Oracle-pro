
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setView('home')}
        >
          <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-900">
            Green <span className="text-emerald-600">Oracle</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('about')}
            className={`text-sm font-medium transition-colors ${currentView === 'about' ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'}`}
          >
            About
          </button>
          <button 
            onClick={() => setView('diagnostic')}
            className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
          >
            Start Diagnosis
          </button>
        </div>

        <button 
          onClick={() => setView('diagnostic')}
          className="md:hidden bg-emerald-600 text-white p-2 rounded-full shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
