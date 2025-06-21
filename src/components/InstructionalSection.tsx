export default function InstructionalSection() {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm p-6 space-y-6">
        <details className="group" open>
          <summary className="flex items-center cursor-pointer">
            <span className="text-xl font-semibold text-gray-800">How to Use This AI Tutor</span>
            <svg className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 pl-4 border-l-2 border-blue-200 space-y-3">
            <p className="text-gray-600">1. Fill in each of the 6 prompt elements below with detailed descriptions</p>
            <p className="text-gray-600">2. Click "Evaluate My Prompt" to get AI feedback and scoring</p>
            <p className="text-gray-600">3. Review feedback and examples to improve your prompt</p>
            <p className="text-gray-600">4. Once you achieve an 80% score or higher, you can generate an image!</p>
          </div>
        </details>

        <details className="group">
          <summary className="flex items-center cursor-pointer">
            <span className="text-xl font-semibold text-gray-800">6-Element Framework Guide</span>
            <svg className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Subject</h3>
              <p className="text-gray-600">The main focus of your image (e.g., "a majestic dragon")</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Artistic Style</h3>
              <p className="text-gray-600">The artistic approach (e.g., "digital art", "oil painting", "photography")</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
              <p className="text-gray-600">Specific characteristics (e.g., "scales gleaming with iridescent colors")</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Composition</h3>
              <p className="text-gray-600">How the image is framed (e.g., "dramatic low angle view")</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Lighting</h3>
              <p className="text-gray-600">Light conditions (e.g., "backlit by a setting sun")</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Color</h3>
              <p className="text-gray-600">Color palette or scheme (e.g., "rich jewel tones with gold accents")</p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
