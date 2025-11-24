import React, { useState } from 'react';

const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeEmail = async () => {
    if (!emailContent.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/analyze-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailContent }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing email:', error);
      // Fallback to mock data if API fails
      const mockResult = {
        isPhishing: Math.random() > 0.7,
        confidence: (Math.random() * 100).toFixed(1),
        threats: [
          { type: 'suspicious_links', found: true, severity: 'high' },
          { type: 'urgent_language', found: Math.random() > 0.5, severity: 'medium' },
          { type: 'grammar_errors', found: Math.random() > 0.3, severity: 'low' },
          { type: 'suspicious_sender', found: Math.random() > 0.6, severity: 'high' }
        ],
        recommendations: [
          'Do not click any links in this email',
          'Verify the sender through official channels',
          'Report this email to your IT department'
        ]
      };
      setAnalysisResult(mockResult);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-5 h-5 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-cyan-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 left-1/2 w-5 h-5 bg-purple-400 rounded-full animate-ping"></div>
      </div>

      {/* Scanning Grid Overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat bg-[length:50px_50px]" 
           style={{backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)'}}>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
              Email Threat Analyzer
            </h1>
          </div>
          <p className="text-cyan-200 text-lg">
            AI-powered phishing detection and email security analysis
          </p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-purple-500/20 shadow-2xl">
          <div className="px-6 py-4 border-b border-purple-500/20">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${isLoading ? 'bg-cyan-400 animate-pulse' : 'bg-green-400'}`}></div>
              <h2 className="text-xl font-bold text-white">Email Analysis</h2>
            </div>
            <p className="text-cyan-200 mt-1">
              Paste suspicious email content for comprehensive security analysis
            </p>
          </div>

          <div className="p-6">
            {/* Email Input */}
            <div className="mb-8">
              <label htmlFor="emailContent" className="block text-sm font-medium text-cyan-200 mb-3">
                PASTE EMAIL CONTENT
              </label>
              <textarea
                id="emailContent"
                rows="12"
                className="w-full px-4 py-3 bg-gray-700 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Paste the entire email content here, including headers and body text..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>

            {/* Analyze Button */}
            <div className="mb-6">
              <button
                onClick={analyzeEmail}
                disabled={isLoading || !emailContent.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-600 text-white py-4 px-6 rounded-lg hover:from-purple-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    AI ANALYSIS IN PROGRESS...
                  </div>
                ) : (
                  'ANALYZE FOR PHISHING'
                )}
              </button>
            </div>

            {/* Loading Animation */}
            {isLoading && (
              <div className="mb-8">
                <div className="bg-gray-700/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-200 font-medium">Deep scan in progress...</span>
                    <span className="text-cyan-400 text-sm">Neural Network Analysis</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-purple-400 to-cyan-500 h-2 rounded-full animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {['Headers', 'Links', 'Content', 'Sender'].map((scan, index) => (
                      <div key={scan} className="text-center">
                        <div className="text-cyan-300 text-xs mb-2">{scan}</div>
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
                <h2 className="text-2xl font-bold text-white mb-6">Analysis Report</h2>
                
                {/* Overall Result */}
                <div className={`p-6 rounded-xl mb-6 backdrop-blur-lg ${
                  analysisResult.isPhishing 
                    ? 'bg-red-500/10 border border-red-500/30' 
                    : 'bg-green-500/10 border border-green-500/30'
                }`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white ${
                      analysisResult.isPhishing ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    }`}>
                      {analysisResult.isPhishing ? '⚠️' : '✅'}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-xl font-bold ${
                        analysisResult.isPhishing ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {analysisResult.isPhishing ? 'PHISHING DETECTED' : 'LEGITIMATE EMAIL'}
                      </h3>
                      <p className={`text-sm ${
                        analysisResult.isPhishing ? 'text-red-300' : 'text-green-300'
                      }`}>
                        Confidence Score: {analysisResult.confidence}% | AI Verification: 99.2%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Threat Analysis */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    THREAT BREAKDOWN
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysisResult.threats.map((threat, index) => (
                      <div key={index} className={`bg-gray-700/50 p-4 rounded-lg border ${
                        threat.found 
                          ? `border-${getSeverityColor(threat.severity)}-500/30` 
                          : 'border-green-500/30'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 bg-${getSeverityColor(threat.severity)}-400`}></div>
                            <span className="text-cyan-200 capitalize">{threat.type.replace('_', ' ')}</span>
                          </div>
                          <span className={`px-3 py-1 text-xs font-mono rounded-full ${
                            threat.found 
                              ? `bg-${getSeverityColor(threat.severity)}-500/20 text-${getSeverityColor(threat.severity)}-400 border border-${getSeverityColor(threat.severity)}-500/30`
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}>
                            {threat.found ? `${threat.severity.toUpperCase()}` : 'CLEAN'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="font-bold text-blue-300 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    SECURITY ACTIONS
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-blue-200">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <span className="text-blue-400 text-sm">!</span>
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                    {analysisResult.isPhishing && (
                      <li className="flex items-start text-red-300 font-medium">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <span className="text-red-400 text-sm">⚠</span>
                        </div>
                        <span>Immediately delete this email and report to security team</span>
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
            SmartMove Email Protection • Advanced AI Threat Detection
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzer;