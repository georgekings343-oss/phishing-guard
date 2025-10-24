import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  LogOut,
  Settings,
  FileText,
  LayoutDashboard,
  Shield,
  CheckCircle,
  Cpu,
  Network,
  Moon,
  Sun,
  X,
  PieChart as PieChartIcon,
  BarChart3
} from "lucide-react";

// Chart components
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [showMalwareAlert, setShowMalwareAlert] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef(null);

  // Mock data for charts
  const threatData = [
    { name: 'Phishing', value: 45 },
    { name: 'Malware', value: 25 },
    { name: 'Ransomware', value: 15 },
    { name: 'DDoS', value: 10 },
    { name: 'Other', value: 5 }
  ];

  const monthlyStats = [
    { month: 'Jan', threats: 45, blocked: 42 },
    { month: 'Feb', threats: 52, blocked: 49 },
    { month: 'Mar', threats: 38, blocked: 36 },
    { month: 'Apr', threats: 67, blocked: 64 },
    { month: 'May', threats: 55, blocked: 53 },
    { month: 'Jun', threats: 72, blocked: 70 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Mock data for the dashboard
  const stats = {
    threatsBlocked: 1247,
    detectionRate: '98.5%',
    activeAlerts: 3,
    trainingCompleted: 67,
    totalIncidents: 128,
    activeUsers: 54
  };

  const recentThreats = [
    { id: 1, type: 'Phishing Email', severity: 'High', status: 'Blocked', time: '2 min ago' },
    { id: 2, type: 'Malicious Link', severity: 'Medium', status: 'Blocked', time: '15 min ago' },
    { id: 3, type: 'Suspicious Attachment', severity: 'Low', status: 'Quarantined', time: '1 hour ago' }
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 10, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // Reset drop when it reaches bottom with some randomness
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // Simulate malware detection
  useEffect(() => {
    const scanInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsScanning(true);
        setTimeout(() => {
          setShowMalwareAlert(true);
          setIsScanning(false);
        }, 2000);
      }
    }, 15000);

    return () => clearInterval(scanInterval);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMalwareAlert = () => {
    setShowMalwareAlert(false);
  };

  // Theme classes
  const themeClasses = {
    dark: {
      bg: 'bg-gray-900',
      card: 'bg-gray-800/90 backdrop-blur-lg',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-green-500/30',
      hover: 'hover:border-green-500/50'
    },
    light: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      card: 'bg-white/90 backdrop-blur-lg',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-blue-500/30',
      hover: 'hover:border-blue-500/50'
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`flex h-screen ${currentTheme.bg} ${currentTheme.text} relative overflow-hidden transition-colors duration-300`}>
      
      {/* Matrix Code Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ display: theme === 'dark' ? 'block' : 'none' }}
      />

      {/* Light theme background */}
      {theme === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
          {/* Subtle grid for light theme */}
          <div className="absolute inset-0 bg-[size:50px_50px] bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]"></div>
        </div>
      )}

      {/* Network Circuit Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,0,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(0,255,255,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Scanning animation */}
      {isScanning && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse pointer-events-none"></div>
      )}

      {/* Malware Detection Alert */}
      {showMalwareAlert && (
        <div className="absolute top-4 right-4 left-4 z-50 animate-pulse">
          <div className="bg-red-600 border-2 border-red-400 rounded-lg p-4 shadow-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-white" />
              <div>
                <h3 className="text-white font-bold text-lg">CRITICAL THREAT DETECTED!</h3>
                <p className="text-red-100">Malicious code injection attempt detected in network stream</p>
              </div>
            </div>
            <button 
              onClick={closeMalwareAlert}
              className="text-white hover:text-red-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 ${currentTheme.card} border-r ${currentTheme.border} flex flex-col relative z-10 transition-colors duration-300 shadow-2xl`}>
        <div className={`px-6 py-4 text-2xl font-bold border-b ${currentTheme.border} flex items-center justify-between`}>
          <div className="flex items-center">
            <Shield className={`mr-2 ${
              theme === 'dark' ? 'text-green-400' : 'text-blue-600'
            }`} size={24} />
            <span className={`bg-gradient-to-r ${
              theme === 'dark' ? 'from-green-400 to-cyan-400' : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              SmartMove
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:scale-110' 
                : 'bg-blue-100 hover:bg-blue-200 text-orange-500 hover:scale-110'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'incidents', icon: AlertTriangle, label: 'Incidents' },
            { id: 'reports', icon: FileText, label: 'Reports' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-300 ${
                activeTab === item.id 
                  ? `${
                      theme === 'dark' 
                        ? 'bg-green-600/20 border-green-500/50 text-green-400 shadow-lg shadow-green-500/20' 
                        : 'bg-blue-600/20 border-blue-500/50 text-blue-600 shadow-lg shadow-blue-500/20'
                    } border transform scale-105` 
                  : `hover:${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'} border border-transparent hover:${currentTheme.border} ${currentTheme.textSecondary} hover:scale-102`
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className={`p-4 border-t ${currentTheme.border}`}>
          <button className={`flex items-center space-x-3 w-full text-left transition-all duration-300 p-3 rounded-lg ${
            theme === 'dark' 
              ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
              : 'text-red-600 hover:text-red-700 hover:bg-red-100'
          }`}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-auto relative z-10">
        {/* Top bar */}
        <header className={`flex justify-between items-center ${currentTheme.card} border-b ${currentTheme.border} p-4 transition-colors duration-300 shadow-lg`}>
          <h1 className="text-xl font-semibold flex items-center">
            <Cpu className={`mr-2 ${
              theme === 'dark' ? 'text-green-400' : 'text-blue-600'
            }`} size={20} />
            Security Operations Center
            {isScanning && (
              <span className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30 animate-pulse flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                Live Scanning...
              </span>
            )}
          </h1>
          <div className="flex items-center space-x-4">
            <span className={currentTheme.textSecondary}>Admin User</span>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border-2 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 border-green-400' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400'
            }`}>
              A
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: AlertTriangle, label: 'Total Incidents', value: stats.totalIncidents, color: 'red' },
              { icon: Users, label: 'Active Users', value: stats.activeUsers, color: 'blue' },
              { icon: ShieldCheck, label: 'Threats Blocked', value: stats.threatsBlocked, color: 'green' },
              { icon: CheckCircle, label: 'Detection Rate', value: stats.detectionRate, color: 'purple' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`${currentTheme.card} rounded-xl border ${currentTheme.border} p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
              >
                <div className={`p-3 rounded-lg border ${
                  theme === 'dark' 
                    ? `bg-${stat.color}-500/20 border-${stat.color}-500/30 group-hover:bg-${stat.color}-500/30` 
                    : `bg-${stat.color}-500/10 border-${stat.color}-500/20 group-hover:bg-${stat.color}-500/20`
                } transition-colors`}>
                  <stat.icon className={`text-${stat.color}-400`} size={28} />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${currentTheme.textSecondary}`}>{stat.label}</h2>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart - Threat Distribution */}
            <div className={`${currentTheme.card} rounded-xl border ${currentTheme.border} p-6 transition-colors duration-300 shadow-lg`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <PieChartIcon className={`mr-2 ${
                  theme === 'dark' ? 'text-green-400' : 'text-blue-600'
                }`} size={20} />
                Threat Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={threatData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {threatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart - Monthly Stats */}
            <div className={`${currentTheme.card} rounded-xl border ${currentTheme.border} p-6 transition-colors duration-300 shadow-lg`}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BarChart3 className={`mr-2 ${
                  theme === 'dark' ? 'text-green-400' : 'text-blue-600'
                }`} size={20} />
                Monthly Threat Activity
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
                    <XAxis dataKey="month" stroke={currentTheme.textSecondary} />
                    <YAxis stroke={currentTheme.textSecondary} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="threats" fill="#8884d8" name="Total Threats" />
                    <Bar dataKey="blocked" fill="#82ca9d" name="Blocked Threats" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Threats */}
          <div className={`${currentTheme.card} rounded-xl border ${currentTheme.border} p-6 transition-colors duration-300 shadow-lg`}>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Network className={`mr-2 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} size={20} />
              Recent Threat Activity
            </h2>
            <div className="space-y-3">
              {recentThreats.map((threat) => (
                <div 
                  key={threat.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                    theme === 'dark' 
                      ? 'bg-gray-700/50 border-gray-600/30 hover:border-gray-500/50' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      threat.severity === 'High' ? 'bg-red-500 animate-pulse' :
                      threat.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-semibold">{threat.type}</p>
                      <p className={`text-sm ${currentTheme.textSecondary}`}>{threat.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    threat.severity === 'High' 
                      ? theme === 'dark' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                        : 'bg-red-500/10 text-red-600 border-red-500/20'
                      : threat.severity === 'Medium'
                      ? theme === 'dark'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                      : theme === 'dark'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                  }`}>
                    {threat.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;