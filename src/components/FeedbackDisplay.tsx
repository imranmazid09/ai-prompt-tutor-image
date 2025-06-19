import { PromptFeedback } from "@/types";
import ImageDisplay from "./ImageDisplay";

interface FeedbackDisplayProps {
  feedback: PromptFeedback | null;
  onGenerateImage: () => void;
  imageUrl: string | null;
  isGeneratingImage: boolean;
}

export default function FeedbackDisplay({ 
  feedback, 
  onGenerateImage, 
  imageUrl,
  isGeneratingImage
}: FeedbackDisplayProps) {
  if (!feedback) return null;

  const canGenerateImage = feedback.totalScore >= 80;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          Overall Score: {feedback.totalScore}%
        </h2>
        
        <div className="space-y-6">
          {Object.entries(feedback.elements).map(([element, elementFeedback]) => (
            <div key={element} className="border-b pb-4">
              <h3 className="text-lg font-semibold capitalize mb-2">
                {element.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="h-2 bg-gray-200 rounded-full flex-grow"
                  role="progressbar"
                  aria-valuenow={elementFeedback.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${elementFeedback.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{elementFeedback.score}%</span>
              </div>
              <p className="text-gray-700 mb-2">{elementFeedback.feedback}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-800">Strong Example:</p>
                  <p className="text-green-700">{elementFeedback.examples.strong}</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-800">Weak Example:</p>
                  <p className="text-red-700">{elementFeedback.examples.weak}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canGenerateImage ? (
          <div className="mt-6">
            <button
              onClick={onGenerateImage}
              disabled={isGeneratingImage}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGeneratingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Image...
                </>
              ) : (
                'Generate Image'
              )}
            </button>
            <ImageDisplay
              imageUrl={imageUrl}
              isLoading={isGeneratingImage}
              prompt={feedback.elements.subject.content}
            />
          </div>
        ) : (
          <p className="mt-6 text-center text-red-600">
            Achieve a score of 80% or higher to unlock image generation!
          </p>
        )}
      </div>
    </div>
  );
}
