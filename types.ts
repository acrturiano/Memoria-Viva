export enum BloomLevel {
  REMEMBER = 'Recordar',
  UNDERSTAND = 'Comprender',
  APPLY = 'Aplicar',
  ANALYZE = 'Analizar',
  EVALUATE = 'Evaluar',
  CREATE = 'Crear'
}

export interface TimelineEvent {
  year: number;
  month?: string;
  title: string;
  shortDescription: string;
  fullDescription?: string; // Fetched from AI or expanded
}

export interface Concept {
  term: string;
  shortDefinition: string;
  fullDefinition?: string;
}

export interface Question {
  id: string;
  level: BloomLevel;
  text: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation?: string;
}

export interface PodcastState {
  isAdmin: boolean;
  audioUrl: string | null;
  title: string;
}