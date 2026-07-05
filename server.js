const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy requests to the model file from Supabase
app.use('/models/gemma3-1b-it-int4.litertlm', createProxyMiddleware({
  target: 'https://cgaogjbvmwvltkamvyvc.supabase.co',
  changeOrigin: true,
  pathRewrite: {
    '^/models/gemma3-1b-it-int4.litertlm': '/storage/v1/object/public/models/gemma3-1b-it-int4.litertlm'
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('Accept-Encoding', 'identity');
  }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Model info endpoint
app.get('/api/model/info', (req, res) => {
  res.json({
    name: 'gemma-3-1b-it-int4.litertlm',
    type: 'LiteRT model',
    source: 'Supabase storage',
    endpoint: '/models/gemma3-1b-it-int4.litertlm'
  });
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;