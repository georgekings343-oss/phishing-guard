import { Link } from 'react-router-dom';

// Inside your component, add these to your quick actions array:
const quickActions = [
  // ... your existing actions
  {
    name: 'Email Analyzer',
    description: 'Check suspicious emails for phishing',
    icon: '📧',
    path: '/email-analyzer',
    color: 'blue'
  },
  {
    name: 'URL Checker', 
    description: 'Verify suspicious links and websites',
    icon: '🔗',
    path: '/url-checker',
    color: 'green'
  },
  // ... rest of your existing actions
];

// In your JSX render method, make sure the actions are wrapped with Link:
{quickActions.map((action) => (
  <Link 
    key={action.name} 
    to={action.path}
    className="block" // or your existing card class
  >
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3`}>
        <span className="text-2xl">{action.icon}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{action.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
    </div>
  </Link>
))}