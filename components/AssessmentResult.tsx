import React from 'react';
import { HealthAssessmentResponse, UrgencyLevel } from '../types';
import { AlertTriangle, CheckCircle, Info, Stethoscope, HeartPulse, ShieldAlert, ArrowLeft } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface AssessmentResultProps {
  data: HealthAssessmentResponse;
  onReset: () => void;
}

export const AssessmentResult: React.FC<AssessmentResultProps> = ({ data, onReset }) => {
  
  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.LOW: return 'text-green-600 bg-green-100 border-green-200';
      case UrgencyLevel.MODERATE: return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case UrgencyLevel.HIGH: return 'text-orange-600 bg-orange-100 border-orange-200';
      case UrgencyLevel.CRITICAL: return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyValue = (level: UrgencyLevel) => {
    switch (level) {
      case UrgencyLevel.LOW: return 25;
      case UrgencyLevel.MODERATE: return 50;
      case UrgencyLevel.HIGH: return 75;
      case UrgencyLevel.CRITICAL: return 100;
      default: return 0;
    }
  };

  const getUrgencyHex = (level: UrgencyLevel) => {
     switch (level) {
      case UrgencyLevel.LOW: return '#16a34a';
      case UrgencyLevel.MODERATE: return '#ca8a04';
      case UrgencyLevel.HIGH: return '#ea580c';
      case UrgencyLevel.CRITICAL: return '#dc2626';
      default: return '#9ca3af';
    }
  }

  const chartData = [
    { name: 'Urgency', value: getUrgencyValue(data.urgency), fill: getUrgencyHex(data.urgency) }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <button 
        onClick={onReset}
        className="flex items-center text-gray-500 hover:text-teal-600 transition-colors mb-4"
      >
        <ArrowLeft size={20} className="mr-1" /> Back to Form
      </button>

      {/* Urgency Header */}
      <div className={`p-6 rounded-2xl border ${getUrgencyColor(data.urgency)} shadow-sm flex flex-col md:flex-row items-center justify-between`}>
        <div className="flex items-center space-x-4">
            <div className="h-16 w-16 md:h-20 md:w-20 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                        cx="50%" 
                        cy="50%" 
                        innerRadius="60%" 
                        outerRadius="100%" 
                        barSize={10} 
                        data={chartData} 
                        startAngle={90} 
                        endAngle={-270}
                    >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={30} // Use number, not string with %
                    />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                    <HeartPulse size={24} className="opacity-80" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold opacity-90 uppercase tracking-wider text-xs mb-1">Estimated Urgency</h3>
                <span className="text-3xl font-bold tracking-tight">{data.urgency}</span>
            </div>
        </div>
        <div className="mt-4 md:mt-0 max-w-md text-sm md:text-right opacity-90">
            {data.summary}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Conditions */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-6 border-b border-gray-100 pb-4">
                    <Stethoscope className="text-teal-500" />
                    <h3 className="text-xl font-bold text-gray-800">Potential Conditions</h3>
                </div>
                <div className="space-y-4">
                    {data.potentialConditions.map((condition, idx) => (
                        <div key={idx} className="group border border-gray-100 hover:border-teal-200 rounded-xl p-4 transition-all hover:shadow-md bg-gray-50 hover:bg-white">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 text-lg">{condition.name}</h4>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    {condition.probability} Probability
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{condition.description}</p>
                            <div className="flex items-start text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
                                <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                                <span>{condition.reasoning}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Advice */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Immediate Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                 <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="text-orange-500" />
                    <h3 className="text-lg font-bold text-gray-800">Recommended Actions</h3>
                </div>
                <ul className="space-y-3">
                    {data.recommendedActions.map((action, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                            <CheckCircle size={16} className="text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                            {action}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Lifestyle Tips */}
             <div className="bg-teal-50 rounded-2xl shadow-sm border border-teal-100 p-6">
                 <div className="flex items-center space-x-2 mb-4">
                    <HeartPulse className="text-teal-600" />
                    <h3 className="text-lg font-bold text-teal-900">Lifestyle & Care</h3>
                </div>
                <ul className="space-y-3">
                    {data.lifestyleTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start text-sm text-teal-800">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start space-x-3 text-gray-500 text-sm">
        <ShieldAlert className="flex-shrink-0 mt-0.5" size={18} />
        <div>
            <span className="font-bold block text-gray-700 mb-1">Medical Disclaimer</span>
            <p>{data.disclaimer}</p>
            <p className="mt-2 text-xs">
                This AI-generated assessment is for informational purposes only. Always consult a qualified healthcare professional for diagnosis and treatment.
                If you are experiencing a medical emergency, call emergency services immediately.
            </p>
        </div>
      </div>
    </div>
  );
};
