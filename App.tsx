import React, { useState } from 'react';
import { Header } from './components/Header';
import { SymptomForm } from './components/SymptomForm';
import { AssessmentResult } from './components/AssessmentResult';
import { analyzeSymptoms } from './services/geminiService';
import { HealthAssessmentResponse, UserHealthData } from './types';
import { HeartPulse, Stethoscope, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<HealthAssessmentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssessmentSubmit = async (data: UserHealthData) => {
    setIsLoading(true);
    setError(null);
    try {
      const assessment = await analyzeSymptoms(
        data.age,
        data.gender,
        data.symptoms,
        data.duration,
        data.history
      );
      setResult(assessment);
    } catch (err) {
      console.error(err);
      setError("We encountered an issue analyzing your symptoms. Please try again or check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAssessment = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section (only show when no result) */}
          {!result && !isLoading && (
            <div className="text-center mb-10 mt-6 animate-fade-in">
              <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full text-teal-600 mb-4">
                <Stethoscope size={32} />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Check your symptoms with AI
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get instant insights about your health concerns. Our advanced AI analyzes your symptoms against a vast medical knowledge base to suggest potential causes and next steps.
              </p>
            </div>
          )}

          {/* Main Content Area */}
          <div className="transition-all duration-500 ease-in-out">
            {error && (
               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                 <span className="block sm:inline">{error}</span>
               </div>
            )}

            {!result ? (
               <SymptomForm onSubmit={handleAssessmentSubmit} isLoading={isLoading} />
            ) : (
               <AssessmentResult data={result} onReset={resetAssessment} />
            )}
          </div>
          
          {/* Features Grid (only show when no result) */}
           {!result && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in-delayed">
                <FeatureCard 
                    icon={<Activity className="text-blue-500" />}
                    title="Fast Analysis"
                    desc="Get a preliminary assessment in seconds, not days."
                />
                 <FeatureCard 
                    icon={<HeartPulse className="text-red-500" />}
                    title="Holistic Approach"
                    desc="We consider your age, history, and lifestyle factors."
                />
                 <FeatureCard 
                    icon={<Stethoscope className="text-teal-500" />}
                    title="Actionable Advice"
                    desc="Clear steps on what to do next and how to find care."
                />
            </div>
           )}

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2">© {new Date().getFullYear()} HealthCompass AI. All rights reserved.</p>
          <p>
            <span className="font-semibold text-gray-500">Important:</span> This tool is for informational purposes only. 
            In case of emergency, call your local emergency number immediately.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="mb-4 bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default App;
