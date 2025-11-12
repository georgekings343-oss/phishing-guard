import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5001;

// Allow frontend to call backend (Vite dev server)
app.use(cors({ origin: 'https://ominous-happiness-gxx9j994g7qh9979-5173.app.github.dev' }));

// Proxy pf-signin requests
app.get('/proxy-pf-signin', async (req, res) => {
  try {
    const url = `https://github.dev/pf-signin${req.url.split('?')[1] ? '?' + req.url.split('?')[1] : ''}`;
    const response = await fetch(url, { redirect: 'follow' });
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Proxy manifest.json requests
app.get('/proxy-manifest', async (req, res) => {
  try {
    const url = 'https://ominous-happiness-gxx9j994g7qh9979-5173.app.github.dev/manifest.json';
    const response = await fetch(url);
    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
