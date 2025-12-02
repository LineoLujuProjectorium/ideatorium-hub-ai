#!/bin/bash
set -e

echo "🚀 Setting up DeepSeek DevStudio with proper styling..."

# Create project structure
mkdir -p deepseek-devstudio
cd deepseek-devstudio

echo "📦 Setting up frontend with Next.js 14..."
npx create-next-app@latest frontend --typescript --tailwind --app --no-eslint --import-alias "@/*" --no-src-dir --yes

cd frontend

# Install additional dependencies
npm install axios react-markdown react-icons socket.io-client

echo "⚙️ Creating configuration files..."

# Create proper tailwind.config.ts
cat > tailwind.config.ts << 'TAILWIND'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
export default config
TAILWIND

# Create postcss.config.js
cat > postcss.config.js << 'POSTCSS'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
POSTCSS

echo "✅ Frontend setup complete!"

# Go back to project root
cd ..

echo "⚙️ Setting up backend..."
mkdir -p backend
cd backend

# Create package.json
cat > package.json << 'PKG'
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
PKG

# Create server.js
cat > server.js << 'SERVER'
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'DeepSeek DevStudio API is running!',
    status: 'online',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
SERVER

# Create .env
echo "PORT=5000" > .env

echo "✅ Backend setup complete!"
echo ""
echo "🎉 Setup finished!"
echo ""
echo "📋 Next steps:"
echo "1. Open Terminal 1:"
echo "   cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/backend"
echo "   npm install && npm run dev"
echo ""
echo "2. Open Terminal 2:"
echo "   cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/frontend"
echo "   npm install && npm run dev"
echo ""
echo "3. Then I'll give you the final code to paste!"
