import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// ✅ Serve frontend from /dist
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// ✅ API route
app.get('/api/test', (req, res) => {
  res.json({
    status: "OK",
    message: "Backend API working!",
    time: new Date().toISOString()
  });
});

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "UP", uptime: process.uptime() });
});

// ✅ Catch-all route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Start server
app.listen(5001, "0.0.0.0", () => {
 console.log(`✅ Backend running on port 5001`);
  console.log(`✅ Frontend served from /dist`);
});

