// app/components/HTMLGenerator.tsx
'use client';

import {useState} from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function HTMLGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateHTML = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generator', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt}),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('Failed to generate HTML');
      }

      // Sanitize the HTML before setting it
      const sanitizedHTML = DOMPurify.sanitize(data.html);
      setGeneratedHTML(sanitizedHTML);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">HTML Generator Demo</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Describe what you want to generate:
            </label>
            <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
            />
          </div>

          <button
              onClick={generateHTML}
              disabled={isLoading || !prompt.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate HTML'}
          </button>

          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
          )}

          {generatedHTML && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Generated HTML:</h3>
                  <pre className="p-4 rounded-lg overflow-auto text-sm">
                <code>{generatedHTML}</code>
              </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Rendered Output:</h3>
                  <div
                      className="border border-gray-300 p-4 rounded-lg bg-white min-h-[200px]"
                      dangerouslySetInnerHTML={{__html: generatedHTML}}
                  />
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
