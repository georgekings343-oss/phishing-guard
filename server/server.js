import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// ===== Default Root Route =====
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Phishing Guard Backend</h1>
    <p>Server is running successfully on port ${PORT}</p>
    <ul>
      <li><a href="/health">Health Check</a></li>
      <li><a href="/api/test">API Test Endpoint</a></li>
    </ul>
  `);
});

// ===== Test route =====
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '🚀 Backend server is running!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// ===== Auth login endpoint =====
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  // Demo authentication logic
  if (email === 'admin@smartmove.com' && password === 'admin123') {
    res.json({ 
      success: true, 
      user: { 
        email, 
        name: 'Admin User',
        role: 'administrator'
      },
      token: 'demo-jwt-token-12345',
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }
});

// ===== Health check =====
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'PhishGuard Backend' });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🏠 Root route: http://localhost:${PORT}/`);
});
