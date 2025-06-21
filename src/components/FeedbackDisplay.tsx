import { PromptFeedback, PromptElement } from "@/types";
import ImageDisplay from "./ImageDisplay";

interface FeedbackDisplayProps {
  feedback: PromptFeedback | null;
  prompt: PromptElement | null;
  onGenerateImage: () => void;
  imageUrl: string | null;
  isGeneratingImage: boolean;
}

export default function FeedbackDisplay({ 
  feedback, 
  prompt,
  onGenerateImage, 
  imageUrl,
  isGeneratingImage
}: FeedbackDisplayProps) {
  if (!feedback || !prompt) return null;

  const canGenerateImage = feedback.totalScore >= 80;
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Feedback Summary</h2>
            <div className={`text-3xl font-bold px-4 py-2 rounded-lg ${getScoreColor(feedback.totalScore)}`}>
              {feedback.totalScore}%
            </div>
          </div>
          
          <div className="grid gap-6">
            {Object.entries(feedback.elements).map(([element, elementFeedback]) => (
              <div key={element} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold capitalize text-gray-700">
                    {element.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(elementFeedback.score)}`}>
                    {elementFeedback.score}%
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{elementFeedback.feedback}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-green-700 mb-1">Strong Example:</p>
                    <p className="text-green-600">{elementFeedback.examples.strong}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-medium text-red-700 mb-1">Weak Example:</p>
                    <p className="text-red-600">{elementFeedback.examples.weak}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {canGenerateImage ? (
          <div className="p-6 bg-gray-50">
            <button
              onClick={onGenerateImage}
              disabled={isGeneratingImage}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isGeneratingImage ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating Image...</span>
                </>
              ) : (
                'Generate Image'
              )}
            </button>
            <ImageDisplay
              imageUrl={imageUrl}
              isLoading={isGeneratingImage}
              prompt={prompt.subject}
            />
          </div>
        ) : (
          <div className="p-6 bg-red-50">
            <p className="text-center text-red-600 font-medium">
              Achieve a score of 80% or higher to unlock image generation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
