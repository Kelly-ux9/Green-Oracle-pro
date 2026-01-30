
import React from 'react';
import { DiagnosisResult } from '../types';

interface ResultCardProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const isHealthy = result.status === 'Healthy';
  const isUnknown = result.status === 'Unknown';

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`px-8 py-6 flex items-center justify-between ${
        isHealthy ? 'bg-emerald-50' : isUnknown ? 'bg-stone-50' : 'bg-red-50'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${
            isHealthy ? 'bg-emerald-100 text-emerald-700' : isUnknown ? 'bg-stone-200 text-stone-600' : 'bg-red-100 text-red-700'
          }`}>
            {isHealthy ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : isUnknown ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">{result.diseaseName}</h2>
            <p className={`text-sm font-semibold uppercase tracking-wider ${
              isHealthy ? 'text-emerald-700' : isUnknown ? 'text-stone-500' : 'text-red-700'
            }`}>
              {result.status} • {Math.round(result.confidence * 100)}% Confidence
            </p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-stone-400 hover:text-stone-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">Description</h3>
          <p className="text-stone-600 leading-relaxed">{result.description}</p>
        </div>

        {!isHealthy && !isUnknown && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.334-.398-1.817a1 1 0 00-1.487-.876 6.721 6.721 0 00-3.186 4.587c-.09.431-.135.858-.135 1.29a5.1 5.1 0 00.335 1.847c.69 1.813 2.032 3.056 3.94 3.68a9.25 9.25 0 006.159-.275 9.602 9.602 0 003.932-3.188 7.086 7.086 0 001.158-4.739c-.099-1.034-.56-2.015-1.205-2.858a1 1 0 00-1.539.118c-.37.524-.728 1.052-1.033 1.513a12.916 12.916 0 01-.933 1.265c-.342.414-.684.75-1.032.993a.96.96 0 01-.31.146c-.249.074-.535.126-.82.126-.531 0-1.003-.311-1.25-.79a3.45 3.45 0 01-.351-1.609c0-.48.056-.957.17-1.42a20.13 20.13 0 01.554-1.75c.198-.559.443-1.125.748-1.65.257-.442.546-.823.859-1.138a1 1 0 00-.112-1.448z" clipRule="evenodd" />
                </svg>
                Treatment Options
              </h3>
              <ul className="space-y-3">
                {result.treatmentOptions.map((opt, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Prevention
              </h3>
              <ul className="space-y-3">
                {result.preventionMeasures.map((opt, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-600">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {isHealthy && (
          <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 text-center">
             <p className="text-emerald-700 font-medium">Your plant appears to be thriving! Keep up with the preventive care mentioned above to maintain its health.</p>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <button 
            onClick={onReset}
            className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all active:scale-95"
          >
            New Diagnosis
          </button>
        </div>
      </div>
    </div>
  );
};
