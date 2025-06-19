export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} AI Prompt Writing Tutor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
