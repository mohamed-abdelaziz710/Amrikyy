const express = require('express');
const path = require('path');
const QRCode = require('qrcode');

const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// API routes
app.use('/api/chat', chatRouter);

// Optional QR code generation endpoint
app.get('/api/qr', async (req, res) => {
  try {
    const data = req.query.data;
    if (!data) {
      return res.status(400).json({ error: 'Missing data parameter' });
    }
    const qrDataUrl = await QRCode.toDataURL(data);
    res.json({ dataUrl: qrDataUrl });
  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({ error: 'QR generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
