import { examplePrompts } from '@/lib/prompt-utils';
import { PromptElement } from '@/types';

interface ExamplePromptsProps {
  onSelectExample: (prompt: PromptElement) => void;
}

export default function ExamplePrompts({ onSelectExample }: ExamplePromptsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examplePrompts.map((example) => (
          <div
            key={example.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{example.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                example.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-800'
                  : example.difficulty === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {example.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">{example.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={() => onSelectExample(example.prompt)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Use This Example
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
