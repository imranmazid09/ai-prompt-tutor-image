import { PromptHistory, PromptAnalytics } from '@/types';
import { calculateAnalytics } from '@/lib/prompt-utils';

interface AnalyticsDashboardProps {
  history: PromptHistory[];
}

export default function AnalyticsDashboard({ history }: AnalyticsDashboardProps) {
  const analytics = calculateAnalytics(history);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Progress Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Prompts"
          value={analytics.totalPrompts.toString()}
        />
        <StatCard
          title="Average Score"
          value={`${Math.round(analytics.averageScore)}%`}
        />
        <StatCard
          title="Recent Improvement"
          value={`${Math.round(analytics.improvementTrend)}%`}
          positive={analytics.improvementTrend > 0}
        />
        <StatCard
          title="Best Element"
          value={getBestElement(analytics)}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Element Performance</h3>
      <div className="space-y-4">
        {Object.entries(analytics.elementAverages).map(([element, score]) => (
          <div key={element} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="capitalize">
                {element.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-medium">{Math.round(score)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  positive?: boolean;
}

function StatCard({ title, value, positive }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className={`text-2xl font-bold ${
        positive !== undefined
          ? positive
            ? 'text-green-600'
            : 'text-red-600'
          : 'text-gray-900'
      }`}>
        {value}
      </p>
    </div>
  );
}

function getBestElement(analytics: PromptAnalytics): string {
  return Object.entries(analytics.elementAverages)
    .reduce((best, [element, score]) => {
      return score > best.score ? { element, score } : best;
    }, { element: '', score: 0 })
    .element.replace(/([A-Z])/g, ' $1').trim();
}
