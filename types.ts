export enum UrgencyLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface PotentialCondition {
  name: string;
  probability: string; // e.g., "High", "Moderate"
  description: string;
  reasoning: string;
}

export interface HealthAssessmentResponse {
  summary: string;
  urgency: UrgencyLevel;
  potentialConditions: PotentialCondition[];
  recommendedActions: string[];
  lifestyleTips: string[];
  disclaimer: string;
}

export interface UserHealthData {
  age: string;
  gender: string;
  symptoms: string;
  duration: string;
  history: string;
}
