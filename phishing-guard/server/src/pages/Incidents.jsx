import React from 'react';
import { AlertTriangle, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Incidents = () => {
  const navigate = useNavigate();

  const incidents = [
    {
      id: 1,
      title: "Phishing Email Campaign",
      type: "Phishing",
      severity: "High",
      status: "Resolved",
      timestamp: "2024-01-15 14:30",
      description: "Multiple phishing emails targeting employees"
    },
    {
      id: 2,
      title: "Malware Detection",
      type: "Malware",
      severity: "Critical",
      status: "Investigating",
      timestamp: "2024-01-15 10:15",
      description: "Ransomware detected on workstation"
    },
    {
      id: 3,
      title: "Suspicious Login",
      type: "Access",
      severity: "Medium",
      status: "Resolved",
      timestamp: "2024-01-14 18:45",
      description: "Unusual login attempt from foreign IP"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'Investigating': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <XCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <h1 className="text-3xl font-bold">Security Incidents</h1>
            </div>
          </div>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(incident.status)}
                  <h3 className="text-xl font-semibold text-white">{incident.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm border ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className="text-sm text-gray-400">{incident.timestamp}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 mb-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                      {incident.type}
                    </span>
                    <span className="text-gray-400">Status: {incident.status}</span>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">3</div>
            <div className="text-gray-400 text-sm">Active Incidents</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">12</div>
            <div className="text-gray-400 text-sm">Resolved Today</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">2</div>
            <div className="text-gray-400 text-sm">Under Investigation</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">98%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;