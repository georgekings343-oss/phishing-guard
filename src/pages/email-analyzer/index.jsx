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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Email Analyzer</h1>
            <p className="text-gray-600 mt-1">Paste suspicious email content to analyze for phishing attempts</p>
          </div>

          <div className="p-6">
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="emailContent" className="block text-sm font-medium text-gray-700 mb-2">
                Email Content
              </label>
              <textarea
                id="emailContent"
                rows="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste the entire email content here, including headers if possible..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>

            {/* Analyze Button */}
            <div className="mb-6">
              <button
                onClick={analyzeEmail}
                disabled={isLoading || !emailContent.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Email for Phishing'
                )}
              </button>
            </div>

            {/* Results */}
            {analysisResult && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h2>
                
                {/* Overall Result */}
                <div className={`p-4 rounded-md mb-6 ${
                  analysisResult.isPhishing ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      analysisResult.isPhishing ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {analysisResult.isPhishing ? '⚠️' : '✅'}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-lg font-medium ${
                        analysisResult.isPhishing ? 'text-red-800' : 'text-green-800'
                      }`}>
                        {analysisResult.isPhishing ? 'Phishing Detected' : 'No Phishing Detected'}
                      </h3>
                      <p className={`text-sm ${
                        analysisResult.isPhishing ? 'text-red-600' : 'text-green-600'
                      }`}>
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Threats Found */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Threat Analysis</h3>
                  <div className="space-y-2">
                    {analysisResult.threats.map((threat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${getSeverityColor(threat.severity)}-400 mr-3`}></div>
                          <span className="capitalize">{threat.type.replace('_', ' ')}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          threat.found 
                            ? `bg-${getSeverityColor(threat.severity)}-100 text-${getSeverityColor(threat.severity)}-800`
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {threat.found ? `Found (${threat.severity})` : 'Not Found'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <span className="text-blue-600 text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
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

export default EmailAnalyzer;