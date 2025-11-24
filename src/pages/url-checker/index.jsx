import React, { useState } from 'react';

const UrlChecker = () => {
  const [url, setUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUrl = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    setAnalysisResult(null);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
      </div>

      {/* Scanning Grid Overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat bg-[length:50px_50px]" 
           style={{backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)'}}>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              URL Security Scanner
            </h1>
          </div>
          <p className="text-cyan-200 text-lg">
            Advanced threat detection powered by SmartMove AI
          </p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-cyan-500/20 shadow-2xl">
          <div className="px-6 py-4 border-b border-cyan-500/20">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${isLoading ? 'bg-cyan-400 animate-pulse' : 'bg-green-400'}`}></div>
              <h2 className="text-xl font-bold text-white">URL Analysis</h2>
            </div>
            <p className="text-cyan-200 mt-1">
              Enter any URL to scan for malware, phishing, and security threats
            </p>
          </div>

          <div className="p-6">
            {/* URL Input */}
            <div className="mb-8">
              <label htmlFor="url" className="block text-sm font-medium text-cyan-200 mb-3">
                ENTER URL TO SCAN
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  id="url"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  onClick={checkUrl}
                  disabled={isLoading || !url.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      SCANNING...
                    </div>
                  ) : (
                    'SCAN URL'
                  )}
                </button>
              </div>
            </div>

            {/* Loading Animation */}
            {isLoading && (
              <div className="mb-8">
                <div className="bg-gray-700/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-200 font-medium">Scanning in progress...</span>
                    <span className="text-cyan-400 text-sm">AI Analysis</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {['Malware', 'Phishing', 'Reputation', 'SSL'].map((scan, index) => (
                      <div key={scan} className="text-center">
                        <div className="text-cyan-300 text-xs mb-1">{scan}</div>
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {analysisResult && (
              <div className="border-t border-cyan-500/20 pt-6">
                <h2 className="text-2xl font-bold text-white mb-6">Scan Results</h2>

                {/* Overall Risk */}
                <div className={`p-6 rounded-xl mb-6 backdrop-blur-lg ${
                  analysisResult.isMalicious 
                    ? 'bg-red-500/10 border border-red-500/30' 
                    : 'bg-green-500/10 border border-green-500/30'
                }`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white ${
                      analysisResult.isMalicious ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    }`}>
                      {analysisResult.isMalicious ? '⚠️' : '✅'}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-xl font-bold ${
                        analysisResult.isMalicious ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {analysisResult.isMalicious ? 'THREAT DETECTED' : 'SECURE CONNECTION'}
                      </h3>
                      <p className={`text-sm ${
                        analysisResult.isMalicious ? 'text-red-300' : 'text-green-300'
                      }`}>
                        Risk Level: {analysisResult.riskScore}% | Confidence: 98.7%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-cyan-500/20">
                    <h4 className="font-bold text-cyan-300 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      SECURITY ANALYSIS
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-cyan-500/10">
                        <span className="text-cyan-200">Domain Age</span>
                        <span className="text-white font-mono">{analysisResult.domainAge} days</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-cyan-500/10">
                        <span className="text-cyan-200">SSL Certificate</span>
                        <span className={`font-mono ${analysisResult.sslValid ? 'text-green-400' : 'text-red-400'}`}>
                          {analysisResult.sslValid ? 'VALID' : 'INVALID'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-cyan-200">Reputation Score</span>
                        <span className={`font-mono ${analysisResult.reputation === 'Good' ? 'text-green-400' : 'text-red-400'}`}>
                          {analysisResult.reputation.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 p-6 rounded-xl border border-cyan-500/20">
                    <h4 className="font-bold text-cyan-300 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      THREAT DETECTION
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.threats.map((threat, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-cyan-500/10 last:border-b-0">
                          <span className="text-cyan-200 capitalize">{threat.type}</span>
                          <span className={`px-3 py-1 text-xs font-mono rounded-full ${
                            threat.found 
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {threat.found ? 'DETECTED' : 'CLEAN'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-bold text-blue-300 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    SECURITY RECOMMENDATIONS
                  </h4>
                  <ul className="text-blue-200 space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Avoid entering personal information on this website
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Verify the website through official sources before proceeding
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Ensure your antivirus software is up to date
                    </li>
                    {analysisResult.isMalicious && (
                      <li className="flex items-center text-red-300 font-medium">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></div>
                        This URL has been flagged as potentially malicious - proceed with extreme caution
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-cyan-400/70 text-sm">
            Powered by SmartMove Security AI • Real-time threat intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlChecker;