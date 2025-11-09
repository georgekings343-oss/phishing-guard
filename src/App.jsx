import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Your actual backend URL
  const BACKEND_URL = "https://ominous-happiness-gxx9j994g7qh9979-5001.app.github.dev";

  const checkUrl = async () => {
    if (!url) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/check-url?url=` + encodeURIComponent(url)
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to check URL', url: url });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkUrl();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🛡️ PhishGuard Pro</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter URL to check..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={checkUrl}
              disabled={loading || !url}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {loading ? 'Checking...' : 'Check URL'}
            </button>
          </div>

          {result && !result.error && (
            <div
              className={`p-4 rounded-lg ${
                result.isPhishing
                  ? 'bg-red-100 border border-red-300 text-red-800'
                  : 'bg-green-100 border border-green-300 text-green-800'
              }`}
            >
              <p className="mb-2"><strong>URL:</strong> {result.url}</p>
              <p className="mb-2">
                <strong>Status:</strong>{' '}
                {result.isPhishing ? '🚨 Phishing Detected' : '✅ Safe URL'}
              </p>
              <p><strong>Confidence:</strong> {Math.round(result.confidence * 100)}%</p>
              {result.reasons && (
                <div className="mt-2">
                  <strong>Reasons:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="text-sm">{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {result && result.error && (
            <div className="p-4 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800">
              <p><strong>Error:</strong> {result.error}</p>
            </div>
          )}
        </div>

        <div className="text-center text-gray-600">
          <p>Enter any URL to check if it's a phishing website</p>
        </div>
      </div>
    </div>
  );
}

export default App;
