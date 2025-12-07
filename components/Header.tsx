import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-teal-600">
          <Activity size={28} strokeWidth={2.5} />
          <h1 className="text-xl font-bold tracking-tight text-gray-900">HealthCompass AI</h1>
        </div>
        <nav>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-teal-600 transition-colors">
            New Assessment
          </a>
        </nav>
      </div>
    </header>
  );
};
