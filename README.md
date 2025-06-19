# AI Prompt Writing Tutor for Image Generation

An educational web application that helps students learn to write effective prompts for AI image generation using a 6-element framework. The app provides real-time feedback and generates images using the Gemini API.

## Features

- Interactive prompt writing framework with 6 key elements
- Real-time AI-powered feedback and scoring
- Dynamic examples of strong and weak prompts
- Image generation for high-scoring prompts (80%+ required)
- Mobile-friendly responsive design

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Gemini API (via secure proxy)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - App Router pages and API routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and API client
- `/src/types` - TypeScript type definitions

## License

MIT License
