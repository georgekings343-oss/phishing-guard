// Add these API endpoints to your server/server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock database for demo (in production, use a real database)
let users = [];

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, phone, password, role } = req.body;
  
  console.log('New user signup:', {
    firstName,
    lastName,
    email,
    phone,
    role
  });

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create new user (in production, hash the password!)
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    firstName,
    lastName,
    email,
    phone,
    role: role || 'employee',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Simulate processing delay
  setTimeout(() => {
    res.json({
      success: true,
      message: 'User registered successfully',
      user: newUser
    });
  }, 1000);
});

// Email analysis endpoint
app.post('/api/analyze-email', (req, res) => {
  const { emailContent } = req.body;
  
  // Add your actual email analysis logic here
  const analysisResult = {
    isPhishing: false, // Replace with actual detection
    confidence: 85.5,
    threats: [],
    recommendations: []
  };
  
  res.json(analysisResult);
});

// URL checking endpoint  
app.post('/api/check-url', (req, res) => {
  const { url } = req.body;
  
  // Add your actual URL checking logic here
  const checkResult = {
    isMalicious: false, // Replace with actual detection
    riskScore: 23.4,
    domainAge: 365,
    sslValid: true,
    reputation: 'Good'
  };
  
  res.json(checkResult);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});