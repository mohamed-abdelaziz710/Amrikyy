require('dotenv').config();
const express = require('express');
const path = require('path');
const { fetchAITools } = require('./dataLayer');

const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// API routes
app.use('/api/chat', chatRouter);

// Fetch AI tools from external source
app.get('/api/tools', async (req, res) => {
  try {
    const tools = await fetchAITools();
    res.json(tools);
  } catch (err) {
    console.error('Failed to fetch tools:', err);
    res.status(500).json({ error: 'Unable to fetch tools' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  module.exports = app;
}
