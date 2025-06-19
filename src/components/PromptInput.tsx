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
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-6">
      {Object.entries(promptElements).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <label htmlFor={key} className="block text-lg font-semibold capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <textarea
            id={key}
            value={value}
            onChange={(e) => handleChange(key as keyof PromptElement, e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim().toLowerCase()}...`}
          />
        </div>
      ))}
      
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Evaluating..." : "Evaluate My Prompt"}
        </button>
        <button
          type="button"
          onClick={() => setPromptElements({
            subject: "",
            artisticStyle: "",
            details: "",
            composition: "",
            lighting: "",
            color: "",
          })}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
        >
          Start New Prompt
        </button>
      </div>
    </form>
  );
}
