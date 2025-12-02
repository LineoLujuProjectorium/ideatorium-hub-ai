#!/bin/bash
set -e

echo "🚀 Complete DeepSeek DevStudio Setup..."

# Create project
mkdir -p deepseek-devstudio
cd deepseek-devstudio

# Create frontend structure
echo "📦 Creating frontend..."
mkdir -p frontend/app/components frontend/public
cd frontend

# Create package.json
cat > package.json << 'PKG'
{
  "name": "deepseek-devstudio-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "axios": "^1.6.7",
    "react-markdown": "^9.0.1",
    "react-icons": "^5.0.1",
    "socket.io-client": "^4.7.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
PKG

# Create next.config.js
cat > next.config.js << 'NEXT'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
NEXT

# Create tailwind.config.js
cat > tailwind.config.js << 'TAILWIND'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        }
      }
    },
  },
  plugins: [],
}
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

# Create tsconfig.json
cat > tsconfig.json << 'TSC'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSC

# Create layout.tsx
cat > app/layout.tsx << 'LAYOUT'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeepSeek DevStudio - AI-Powered Development Platform',
  description: 'Build, code, and deploy with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
LAYOUT

# Create globals.css
cat > app/globals.css << 'GLOBALS'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 15, 23, 42;
  --background-end-rgb: 30, 41, 59;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  min-height: 100vh;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Code styling */
pre {
  background: #1e293b;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid #334155;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}
GLOBALS

# Create a SIMPLE page.tsx first
cat > app/page.tsx << 'PAGE'
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🧠</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DeepSeek DevStudio
              </h1>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                Connect GitHub
              </button>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                New Project
              </button>
            </div>
          </div>
          <p className="text-gray-400 mt-4">AI-Powered Development Platform with DeepSeek at its Core</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">AI Assistants</h2>
            <div className="space-y-4">
              {['DeepSeek Coder', 'Code Reviewer', 'Debug Assistant', 'UI Designer'].map((name) => (
                <div key={name} className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <div className="text-2xl">🤖</div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chat Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">AI Chat Assistant</h2>
              <div className="h-64 overflow-y-auto mb-4 p-4 bg-gray-900 rounded-lg">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="font-semibold">DeepSeek AI</div>
                    <p className="text-gray-300">Hello! I'm your AI assistant. How can I help you code today?</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <input 
                  type="text" 
                  placeholder="Ask me anything about coding..."
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  Send
                </button>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['E-Commerce Platform', 'Task Management', 'Weather API', 'AI Content Generator'].map((project) => (
                  <div key={project} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-700 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{project}</h3>
                        <p className="text-sm text-gray-400">Last updated: Today</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>Built for Luju Inc App Studios 2025</p>
          <p className="text-sm mt-2">Backend running on http://localhost:5000</p>
        </footer>
      </div>
    </div>
  )
}
PAGE

echo "✅ Frontend created successfully!"

# Go back to project root
cd ..

# Setup backend
echo "⚙️ Setting up backend..."
mkdir -p backend
cd backend

# Create backend package.json
cat > package.json << 'BACKENDPKG'
{
  "name": "deepseek-devstudio-backend",
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
BACKENDPKG

# Create server.js (simpler, no TypeScript for now)
cat > server.js << 'SERVER'
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'DeepSeek DevStudio API is running!',
    status: 'online',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'DeepSeek DevStudio Backend',
    uptime: process.uptime()
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is properly connected to frontend!',
    data: {
      projects: 4,
      aiEnabled: true,
      githubConnected: false
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});
SERVER

# Create .env file
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env

echo "✅ Backend created successfully!"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 To start the application:"
echo "1. Open Terminal 1 (Backend):"
echo "   cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/backend"
echo "   npm install && npm run dev"
echo ""
echo "2. Open Terminal 2 (Frontend):"
echo "   cd ~/lujuinc-app-studios-2025/creatorium-ai/deepseek-devstudio/frontend"
echo "   npm install && npm run dev"
echo ""
echo "3. Open your browser to:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
