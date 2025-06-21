'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import InstructionalSection from '@/components/InstructionalSection';
import PromptInput from '@/components/PromptInput';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PromptElement, PromptFeedback, PromptHistory } from '@/types';
import { getPromptHistory, savePromptToHistory } from '@/lib/prompt-utils';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import ExamplePrompts from '@/components/ExamplePrompts';
import PromptHistoryDisplay from '@/components/PromptHistoryDisplay';

interface ErrorMessage {
  message: string;
  type: 'error' | 'success';
}

export default function Home() {
  const [feedback, setFeedback] = useState<PromptFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [promptHistory, setPromptHistory] = useState<PromptHistory[]>([]);
  const [showExamples, setShowExamples] = useState(true);

  useEffect(() => {
    setPromptHistory(getPromptHistory());
  }, []);

  const handlePromptSubmit = async (promptElements: PromptElement) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promptElements),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to evaluate prompt');
      }
      
      setFeedback(data);
      const newEntry = savePromptToHistory(promptElements, data);
      setPromptHistory(getPromptHistory());
      setError({
        message: 'Prompt evaluated successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error evaluating prompt:', error);
      setError({
        message: error instanceof Error ? error.message : 'Failed to evaluate prompt',
        type: 'error'
      });
      setFeedback(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!feedback) return;
    
    setIsGeneratingImage(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }
      
      setImageUrl(data.imageUrl);
      if (feedback) {
        const history = getPromptHistory();
        const lastEntry = history[0];
        if (lastEntry) {
          lastEntry.imageUrl = data.imageUrl;
          localStorage.setItem('promptHistory', JSON.stringify(history));
          setPromptHistory(history);
        }
      }
      setError({
        message: 'Image generated successfully!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error generating image:', error);
      setError({
        message: error instanceof Error ? error.message : 'Failed to generate image',
        type: 'error'
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePromptSelect = (prompt: PromptElement) => {
    setShowExamples(false);
    // Fill the form with the selected prompt
    // The PromptInput component will need to be updated to accept initialValues
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <InstructionalSection />
      
      {showExamples ? (
        <div className="max-w-6xl mx-auto p-4">
          <ExamplePrompts onSelectExample={handlePromptSelect} />
          <button
            onClick={() => setShowExamples(false)}
            className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Skip Examples
          </button>
        </div>
      ) : (
        <>
          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
          {isLoading && (
            <div className="max-w-4xl mx-auto p-4">
              <LoadingSpinner size="large" />
              <p className="text-center mt-4 text-gray-600">
                Evaluating your prompt...
              </p>
            </div>
          )}
          <FeedbackDisplay 
            feedback={feedback}
            onGenerateImage={handleGenerateImage}
            imageUrl={imageUrl}
            isGeneratingImage={isGeneratingImage}
          />
        </>
      )}

      {promptHistory.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
          <AnalyticsDashboard history={promptHistory} />
          <PromptHistoryDisplay
            history={promptHistory}
            onUsePrompt={handlePromptSelect}
          />
        </div>
      )}
      
      <Footer />
      {error && (
        <Toast
          message={error.message}
          type={error.type}
          onClose={() => setError(null)}
        />
      )}
    </main>
  );
}
