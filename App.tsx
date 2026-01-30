
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { UploadSection } from './components/UploadSection';
import { ResultCard } from './components/ResultCard';
import { analyzePlantImage } from './services/geminiService';
import { View, DiagnosisResult } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const diagnosis = await analyzePlantImage(base64);
      setResult(diagnosis);
    } catch (err) {
      console.error(err);
      setError('The Oracle encountered an issue during analysis. Please try again with a clearer photo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onStart={() => setView('diagnostic')} />
            <Features />
            <section className="py-24 max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">Our Mission</h2>
                  <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                    Agriculture is the backbone of society, yet farmers face immense pressure from pests and diseases. 
                    The Green Oracle bridge the gap between complex diagnostic technology and rural accessibility.
                  </p>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                    By leveraging AI vision, we provide immediate, scientifically-backed answers that save crops, 
                    reduce chemical misuse, and ensure food security for local communities.
                  </p>
                  <button 
                    onClick={() => setView('about')}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Read our full vision &rarr;
                  </button>
                </div>
                <div className="flex-1 relative">
                  <img src="https://picsum.photos/seed/farmer/800/600" alt="Farmer in field" className="rounded-3xl shadow-2xl" />
                  <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                    <p className="italic text-sm">"This tool has helped us identify rust disease early enough to save our entire season's harvest."</p>
                    <p className="mt-2 font-bold text-xs uppercase tracking-widest">— Local Farmer</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      
      case 'diagnostic':
        return (
          <div className="py-16 md:py-24 px-4 min-h-[80vh]">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-4">Plant Diagnostic Hub</h2>
              <p className="text-stone-600">Secure your harvest with precise, AI-driven identification.</p>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {result ? (
              <ResultCard result={result} onReset={handleReset} />
            ) : (
              <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            )}
          </div>
        );

      case 'about':
        return (
          <div className="py-24 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-8">About The Green Oracle</h1>
            <div className="prose prose-stone prose-lg max-w-none text-stone-600 space-y-6">
              <p>
                <strong>The Green Oracle</strong> is a web-based smart plant disease detection system designed to support farmers, 
                students, and home gardeners in identifying plant diseases accurately and at an early stage.
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-12">The Problem</h3>
              <p>
                Agriculture faces several persistent challenges related to plant health management, including late detection of 
                diseases, limited access to experts, and incorrect use of pesticides. These issues negatively impact food 
                security and sustainable farming.
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-12">Our Solution</h3>
              <p>
                By integrating image processing and machine learning, we offer a low-cost, accessible platform. 
                Users upload leaf images and receive scientifically informed recommendations instantly.
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mt-12">Uniqueness</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Functions as a decision-support system, not just a classifier.</li>
                <li>Provides step-by-step treatment and prevention guidance.</li>
                <li>Web-based and device-independent.</li>
                <li>Cost-effective and sustainable for school-level implementation.</li>
              </ul>
            </div>
            <button 
              onClick={() => setView('diagnostic')}
              className="mt-12 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all active:scale-95"
            >
              Start Diagnostic Journey
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
             <div className="bg-emerald-600 p-1 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-white font-bold">The Green Oracle</span>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} The Green Oracle. Student-driven Innovation for Sustainable Agriculture.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
