#!/bin/bash

echo "🚀 Creating DeepSeek DevStudio Project..."

# Navigate to project directory
cd ~/lujuinc-app-studios-2025/creatorium-ai

# Clean up if exists
rm -rf deepseek-devstudio

# Create project structure
mkdir deepseek-devstudio
cd deepseek-devstudio

echo "📦 Setting up frontend..."
npx create-next-app@latest frontend --typescript --tailwind --yes --no-src-dir --import-alias "@/*" --app

cd frontend
npm install axios react-markdown prismjs socket.io-client react-icons

echo "⚙️ Setting up backend..."
cd ..
mkdir backend
cd backend
npm init -y
npm install express cors dotenv axios socket.io
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors

# Create server.ts
cat > server.ts << 'SRV'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'DeepSeek DevStudio API is running!',
    status: 'online',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
SRV

# Create .env file
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env

# Update package.json
cat > package.json << 'PKG'
{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only server.ts",
    "start": "node dist/server.js",
    "build": "tsc"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.2",
    "socket.io": "^4.7.2"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "typescript": "^5.3.3",
    "ts-node-dev": "^2.0.0"
  }
}
PKG

# Create tsconfig.json
cat > tsconfig.json << 'TSC'
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["./**/*"],
  "exclude": ["node_modules", "dist"]
}
TSC

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Open Terminal 1 and run: cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/backend && npm run dev"
echo "2. Open Terminal 2 and run: cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/frontend && npm run dev"
echo "3. Open browser to: http://localhost:3000"
echo "4. Check backend: http://localhost:5000"
