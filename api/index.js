const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration
const MODEL_URL = 'https://cgaogjbvmwvltkamvyvc.supabase.co/storage/v1/object/public/models/gemma3-1b-it-int4.litertlm';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'gemma-3-1b-litertlm-proxy'
  });
});

// Model info endpoint
app.get('/api/model/info', (req, res) => {
  res.json({
    name: 'gemma-3-1b-it-int4.litertlm',
    type: 'LiteRT model',
    description: 'Gemma 3 1B Instruction Tuned model quantized to int4 format',
    size_mb: 557,
    source: MODEL_URL,
    endpoint: '/models/gemma3-1b-it-int4.litertlm'
  });
});

// Proxy the model file from Supabase with caching
app.use(
  '/models/gemma3-1b-it-int4.litertlm',
  createProxyMiddleware({
    target: MODEL_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/models/gemma3-1b-it-int4.litertlm': ''
    },
    onProxyReq: (proxyReq) => {
      // Set caching headers for better performance
      proxyReq.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    },
    onProxyRes: (proxyRes) => {
      // Add caching headers to response
      proxyRes.headers['cache-control'] = 'public, max-age=31536000';
      proxyRes.headers['access-control-allow-origin'] = '*';
    }
  })
);

// Serve static files from public directory
app.use(express.static('public'));

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;