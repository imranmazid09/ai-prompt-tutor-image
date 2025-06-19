import { PromptHistory, PromptAnalytics, PromptElement, PromptFeedback } from '@/types';

const STORAGE_KEY = 'promptHistory';

export function savePromptToHistory(prompt: PromptElement, feedback: PromptFeedback, imageUrl?: string): PromptHistory {
  const history = getPromptHistory();
  
  const newEntry: PromptHistory = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    prompt,
    feedback,
    imageUrl,
  };
  
  const updatedHistory = [newEntry, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  
  return newEntry;
}

export function getPromptHistory(): PromptHistory[] {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function calculateAnalytics(history: PromptHistory[]): PromptAnalytics {
  if (history.length === 0) {
    return {
      averageScore: 0,
      elementAverages: {
        subject: 0,
        artisticStyle: 0,
        details: 0,
        composition: 0,
        lighting: 0,
        color: 0,
      },
      totalPrompts: 0,
      improvementTrend: 0,
    };
  }

  const totalScores = history.reduce((sum, entry) => sum + entry.feedback.totalScore, 0);
  
  const elementTotals = history.reduce((totals, entry) => {
    Object.entries(entry.feedback.elements).forEach(([element, feedback]) => {
      totals[element as keyof PromptElement] = 
        (totals[element as keyof PromptElement] || 0) + feedback.score;
    });
    return totals;
  }, {} as Record<keyof PromptElement, number>);

  // Calculate improvement trend
  const recentPrompts = history.slice(0, Math.min(5, history.length));
  const olderPrompts = history.slice(Math.max(0, history.length - 5));
  
  const recentAvg = recentPrompts.reduce((sum, p) => sum + p.feedback.totalScore, 0) / recentPrompts.length;
  const olderAvg = olderPrompts.reduce((sum, p) => sum + p.feedback.totalScore, 0) / olderPrompts.length;
  
  const improvementTrend = olderAvg === 0 ? 0 : ((recentAvg - olderAvg) / olderAvg) * 100;

  return {
    averageScore: totalScores / history.length,
    elementAverages: Object.fromEntries(
      Object.entries(elementTotals).map(([element, total]) => [
        element,
        total / history.length,
      ])
    ) as Record<keyof PromptElement, number>,
    totalPrompts: history.length,
    improvementTrend,
  };
}

// Example prompts that users can start from
export const examplePrompts = [
  {
    id: '1',
    name: 'Magical Forest',
    description: 'A beginner-friendly prompt showcasing basic nature elements',
    difficulty: 'beginner',
    tags: ['nature', 'fantasy', 'peaceful'],
    prompt: {
      subject: 'an enchanted forest clearing with a small crystal-clear pond',
      artisticStyle: 'digital art with soft watercolor effects',
      details: 'fireflies floating in the air, wild flowers blooming around the pond',
      composition: 'wide angle view emphasizing the depth of the forest',
      lighting: 'dusk lighting with warm golden rays filtering through the trees',
      color: 'rich greens and purples with golden highlights'
    }
  },
  {
    id: '2',
    name: 'Futuristic City',
    description: 'An intermediate prompt exploring architectural elements',
    difficulty: 'intermediate',
    tags: ['cityscape', 'sci-fi', 'architecture'],
    prompt: {
      subject: 'a sprawling futuristic metropolis with floating buildings',
      artisticStyle: 'detailed concept art in a neo-futuristic style',
      details: 'holographic advertisements, flying vehicles, and glass skybridges connecting buildings',
      composition: 'dramatic low angle view looking up at the towering structures',
      lighting: 'neon lights reflecting off glass surfaces with a purple sunset backdrop',
      color: 'deep blues and purples with bright neon accents'
    }
  },
  {
    id: '3',
    name: 'Abstract Emotion',
    description: 'An advanced prompt focusing on abstract concepts',
    difficulty: 'advanced',
    tags: ['abstract', 'emotional', 'conceptual'],
    prompt: {
      subject: 'the concept of hope emerging from darkness',
      artisticStyle: 'abstract expressionism with elements of surrealism',
      details: 'flowing ribbons of light intertwining with shadowy forms',
      composition: 'spiral composition drawing the eye from darkness to light',
      lighting: 'dramatic contrast between deep shadows and brilliant light',
      color: 'deep blacks transitioning to brilliant whites with touches of gold'
    }
  }
] as const;
