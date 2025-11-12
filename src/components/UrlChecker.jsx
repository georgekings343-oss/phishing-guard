import React, { useState } from 'react';

const UrlChecker = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Make request to backend (proxied via vite.config.js)
      const res = await fetch(`/api/check-url?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to check URL');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          🛡️ Phishing URL Checker
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="url"
            required
            placeholder="Enter a URL to check (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check URL'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">🔍 Results:</h2>
            <p><strong>URL:</strong> {result.url}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={result.isPhishing ? 'text-red-600' : 'text-green-600'}>
                {result.isPhishing ? '⚠️ Phishing suspected' : '✅ Safe'}
              </span>
            </p>
            <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
            <p><strong>Reason(s):</strong> {result.reasons?.join(', ')}</p>
            <p className="text-xs text-gray-500 mt-2">
              Checked at: {new Date(result.checkedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlChecker;
