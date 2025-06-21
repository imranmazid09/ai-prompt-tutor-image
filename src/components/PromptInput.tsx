import { PromptElement } from "@/types";
import { useState } from "react";

interface PromptInputProps {
  onSubmit: (promptElements: PromptElement) => void;
  isLoading: boolean;
}

export default function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [promptElements, setPromptElements] = useState<PromptElement>({
    subject: "",
    artisticStyle: "",
    details: "",
    composition: "",
    lighting: "",
    color: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(promptElements);
  };

  const handleChange = (
    element: keyof PromptElement,
    value: string
  ) => {
    setPromptElements((prev) => ({
      ...prev,
      [element]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(promptElements).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label 
              htmlFor={key} 
              className="block text-lg font-medium text-gray-700 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <div className="relative">
              <textarea
                id={key}
                value={value}
                onChange={(e) => handleChange(key as keyof PromptElement, e.target.value)}
                disabled={isLoading}
                className="w-full h-24 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase().trim()}...`}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {value.length}/200
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || Object.values(promptElements).some(v => !v.trim())}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Evaluating...</span>
            </>
          ) : (
            <span>Evaluate My Prompt</span>
          )}
        </button>
      </div>
    </form>
  );
}
