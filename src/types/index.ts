export interface PromptElement {
  subject: string;
  artisticStyle: string;
  details: string;
  composition: string;
  lighting: string;
  color: string;
}

export interface ElementFeedback {
  score: number;
  feedback: string;
  examples: {
    strong: string;
    weak: string;
  };
}

export interface PromptFeedback {
  totalScore: number;
  elements: {
    [K in keyof PromptElement]: ElementFeedback;
  };
}

export interface PromptHistory {
  id: string;
  timestamp: string;
  prompt: PromptElement;
  feedback: PromptFeedback;
  imageUrl?: string;
}

export interface PromptAnalytics {
  averageScore: number;
  elementAverages: {
    [K in keyof PromptElement]: number;
  };
  totalPrompts: number;
  improvementTrend: number; // Percentage improvement over time
}

export interface ExamplePrompt {
  id: string;
  name: string;
  description: string;
  prompt: PromptElement;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}
