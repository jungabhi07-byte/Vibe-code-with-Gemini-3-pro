import React, { useState } from 'react';
import { UserHealthData } from '../types';
import { ChevronRight, Loader2 } from 'lucide-react';

interface SymptomFormProps {
  onSubmit: (data: UserHealthData) => void;
  isLoading: boolean;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserHealthData>({
    age: '',
    gender: 'Prefer not to say',
    symptoms: '',
    duration: '',
    history: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us how you're feeling</h2>
        <p className="text-gray-500">
          Please provide as much detail as possible to help our AI generate an accurate assessment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Age</label>
            <input
              required
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 30"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Symptoms</label>
          <textarea
            required
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Describe your symptoms in detail. E.g., 'Sharp pain in lower back, started yesterday...'"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Duration</label>
          <input
            required
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 2 days, 1 week, just started"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Medical History (Optional)</label>
          <textarea
            name="history"
            value={formData.history}
            onChange={handleChange}
            placeholder="Any existing conditions, allergies, or medications?"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all min-h-[80px]"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
            isLoading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-teal-500/30'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Analyzing...
            </>
          ) : (
            <>
              Generate Assessment <ChevronRight className="ml-2" size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
