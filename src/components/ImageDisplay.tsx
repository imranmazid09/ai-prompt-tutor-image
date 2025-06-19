interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

export default function ImageDisplay({ imageUrl, isLoading, prompt }: ImageDisplayProps) {
  return (
    <div className="mt-6 rounded-lg overflow-hidden bg-gray-100">
      {isLoading ? (
        <div className="aspect-square w-full flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Generating your image...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
          </div>
        </div>
      ) : imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt={prompt}
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <a
              href={imageUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              View Full Size
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
