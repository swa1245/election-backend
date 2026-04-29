import { SupportedCountry } from '../constants/countries.js';

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming' | 'current';
}

export interface ElectionStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ElectionData {
  country: SupportedCountry;
  timeline: TimelineItem[];
  steps: ElectionStep[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
