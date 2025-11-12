import React, { useState } from 'react';

const UrlChecker = () => {
  const [url, setUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUrl = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        isMalicious: Math.random() > 0.6,
        riskScore: (Math.random() * 100).toFixed(1),
        domainAge: Math.floor(Math.random() * 3650) + 1,
        sslValid: Math.random() > 0.2,
        reputation: Math.random() > 0.5 ? 'Good' : 'Poor',
        threats: [
          { type: 'malware', found: Math.random() > 0.7 },
          { type: 'phishing', found: Math.random() > 0.6 },
          { type: 'suspicious', found: Math.random() > 0.5 }
        ]
      };
      setAnalysisResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">URL Safety Checker</h1>
            <p className="text-gray-600 mt-1">Check any URL for potential phishing, malware, or security threats</p>
          </div>

          <div className="p-6">
            {/* URL Input */}
            <div className="mb-6">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Enter URL to Check
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  id="url"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  onClick={checkUrl}
                  disabled={isLoading || !url.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Checking...' : 'Check URL'}
                </button>
              </div>
            </div>

            {/* Results */}
            {analysisResult && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Security Analysis</h2>
                
                {/* Overall Risk */}
                <div className={`p-4 rounded-md mb-6 ${
                  analysisResult.isMalicious ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        analysisResult.isMalicious ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {analysisResult.isMalicious ? '⚠️' : '✅'}
                      </div>
                      <div className="ml-3">
                        <h3 className={`text-lg font-medium ${
                          analysisResult.isMalicious ? 'text-red-800' : 'text-green-800'
                        }`}>
                          {analysisResult.isMalicious ? 'Malicious URL Detected' : 'URL Appears Safe'}
                        </h3>
                        <p className={`text-sm ${
                          analysisResult.isMalicious ? 'text-red-600' : 'text-green-600'
                        }`}>
                          Risk Score: {analysisResult.riskScore}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Domain Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domain Age:</span>
                        <span className="font-medium">{analysisResult.domainAge} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SSL Certificate:</span>
                        <span className={`font-medium ${analysisResult.sslValid ? 'text-green-600' : 'text-red-600'}`}>
                          {analysisResult.sslValid ? 'Valid' : 'Invalid'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reputation:</span>
                        <span className={`font-medium ${
                          analysisResult.reputation === 'Good' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {analysisResult.reputation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Threat Detection</h4>
                    <div className="space-y-2">
                      {analysisResult.threats.map((threat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-600 capitalize">{threat.type}:</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            threat.found ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {threat.found ? 'Detected' : 'Not Found'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">Security Recommendations</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Avoid entering personal information on this website</li>
                    <li>• Verify the website through official sources</li>
                    <li>• Use antivirus software with web protection</li>
                    {analysisResult.isMalicious && (
                      <li className="font-medium">• This URL has been flagged as potentially malicious</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlChecker;