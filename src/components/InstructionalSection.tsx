export default function InstructionalSection() {
  return (
    <section className="max-w-6xl mx-auto p-4 space-y-4">
      <details className="bg-white rounded-lg shadow-md p-4">
        <summary className="text-lg font-semibold cursor-pointer">
          How to Use This AI Tutor
        </summary>
        <div className="mt-4 space-y-2">
          <p>1. Fill in each of the 6 prompt elements below</p>
          <p>2. Click "Evaluate My Prompt" to get AI feedback</p>
          <p>3. Improve your prompt based on the feedback</p>
          <p>4. Once you achieve an 80% score, you can generate an image!</p>
        </div>
      </details>

      <details className="bg-white rounded-lg shadow-md p-4">
        <summary className="text-lg font-semibold cursor-pointer">
          View 6-Element Framework Example
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Subject</h3>
            <p className="text-gray-600">The main focus of your image (e.g., "a majestic dragon")</p>
          </div>
          <div>
            <h3 className="font-semibold">Artistic Style</h3>
            <p className="text-gray-600">The artistic approach (e.g., "digital art", "oil painting", "photography")</p>
          </div>
          <div>
            <h3 className="font-semibold">Details</h3>
            <p className="text-gray-600">Specific characteristics (e.g., "scales gleaming with iridescent colors")</p>
          </div>
          <div>
            <h3 className="font-semibold">Composition</h3>
            <p className="text-gray-600">How the image is framed (e.g., "dramatic low angle view")</p>
          </div>
          <div>
            <h3 className="font-semibold">Lighting</h3>
            <p className="text-gray-600">Light conditions (e.g., "backlit by a setting sun")</p>
          </div>
          <div>
            <h3 className="font-semibold">Color</h3>
            <p className="text-gray-600">Color palette or scheme (e.g., "rich jewel tones with gold accents")</p>
          </div>
        </div>
      </details>
    </section>
  );
}
