# Gemma 3 1B LiteRT Model Server

[![Vercel Deployment](https://vercel badge.vercel.app)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014-blue.svg)](https://nodejs.org/)

A Vercel serverless function that serves the Gemma 3 1B Int4 quantized LiteRT model from Supabase storage.

## 🚀 Deployment

Deploy this project to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gemma-3-1b-litertlm-vercel)

## 📋 Features

- Serves the Gemma 3 1B Int4 quantized LiteRT model (~557MB) from Supabase storage
- Proxy endpoint for efficient model delivery with caching
- Health check and model info endpoints
- Optimized for Vercel serverless functions
- Ready for integration with LiteRT/TensorFlow Lite applications

## 📖 Documentation

### Model Information

- **Model**: Gemma 3 1B Instruction Tuned (int4 quantized)
- **Format**: LiteRT (.litertlm)
- **Size**: ~557 MB
- **Source**: [Supabase Storage](https://cgaogjbvmwvltkamvyvc.supabase.co/storage/v1/object/public/models/gemma3-1b-it-int4.litertlm)

### API Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status and timestamp.

#### Model Information
```http
GET /api/model/info
```
Returns metadata about the hosted model.

#### Model File Access
```http
GET /models/gemma3-1b-it-int4.litertlm
```
Proxies the model file from Supabase with caching headers.

## 🛠️ Development

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

## 🚦 Usage

This service is designed to be used with LiteRT/TensorFlow Lite for running Gemma 3 1B models in web or edge environments.

Example usage with TensorFlow Lite:
```javascript
import { interpret } from '@tensorflow/tfjs';

// Note: Actual implementation would require LiteRT bindings
const model = await fetchModel('/models/gemma3-1b-it-int4.litertlm');
// ... run inference
```

## 🔧 Configuration

The project uses Vercel's platform for deployment. Key configuration files:

- `vercel.json` - Vercel platform configuration
- `api/index.js` - Vercel serverless function
- `server.js` - Express server (for local development)

## 📦 Releases

### v1.0.0 (Initial Release)
- Initial deployment of Gemma 3 1B Int4 LiteRT model
- Basic proxy service with health checks
- Vercel deployment configuration

[View all releases](https://github.com/your-username/gemma-3-1b-litertlm-vercel/releases)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Gemma 3](https://blog.google/technology/developers/gemma-3/) by Google
- [Supabase](https://supabase.com) for model storage
- [Vercel](https://vercel.com) for serverless deployment
- [TensorFlow Lite](https://www.tensorflow.org/lite) for LiteRT format

---

Made with ❤️ for the AI community