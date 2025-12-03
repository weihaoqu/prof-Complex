export enum ProfessorMood {
  NEUTRAL = 'neutral',
  ANGRY = 'angry',
  HELPFUL = 'helpful'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'professor';
  content: string;
  mood?: ProfessorMood;
  citations?: string[];
  chalkboardImage?: string; // Base64 or URL
  timestamp: number;
}

export interface GenAIResponse {
  text: string;
  mood: ProfessorMood;
  chalkboard_description?: string;
}
