import React, { useState } from "react";

const PublicChecker = () => {
  const [url, setUrl] = useState("");
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:4000/api/public-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, emailText }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Server not reachable." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Public Email & URL Safety Checker
        </h1>

        {/* URL Input */}
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Enter URL:
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full mb-4 p-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        {/* Email Text Input */}
        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Paste Email Message:
        </label>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste suspicious email message here..."
          className="w-full h-32 p-3 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Check Safety"}
        </button>

        {/* Result display */}
        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
            <h2 className="text-lg font-semibold mb-2">Results:</h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicChecker;
