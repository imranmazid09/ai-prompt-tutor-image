import { PromptHistory } from '@/types';

interface PromptHistoryDisplayProps {
  history: PromptHistory[];
  onUsePrompt: (prompt: PromptHistory['prompt']) => void;
}

export default function PromptHistoryDisplay({ 
  history,
  onUsePrompt
}: PromptHistoryDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Your Prompt History</h2>
      
      {history.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          Your prompt history will appear here after you create your first prompt.
        </p>
      ) : (
        <div className="space-y-6">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {entry.prompt.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(entry.timestamp).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.feedback.totalScore >= 80
                      ? 'bg-green-100 text-green-800'
                      : entry.feedback.totalScore >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {Math.round(entry.feedback.totalScore)}%
                  </span>
                  <button
                    onClick={() => onUsePrompt(entry.prompt)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Use this prompt"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H4a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {entry.imageUrl && (
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                  <img
                    src={entry.imageUrl}
                    alt={entry.prompt.subject}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {Object.entries(entry.feedback.elements).map(([element, feedback]) => (
                  <div key={element} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="capitalize text-gray-600">
                        {element.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium">{Math.round(feedback.score)}%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${feedback.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
