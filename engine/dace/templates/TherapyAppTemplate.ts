// /engine/dace/templates/TherapyAppTemplate.ts
import { DACEIntent } from '../DeterministicEngine';

export class TherapyAppTemplate {
  name = 'therapy-app';
  version = '1.0.0';
  dependencies = {
    frontend: ['react', 'react-dom', 'nextjs', 'tailwindcss', 'supabase-js'],
    backend: ['supabase', 'postgresql'],
    mobile: ['capacitor', '@capacitor/core'],
  };

  generate(intent: DACEIntent) {
    const hasAuth = intent.features.includes('auth');
    const hasChat = intent.features.includes('chat');
    const hasCalendar = intent.features.includes('calendar');
    const hasPayments = intent.features.includes('payments');

    return {
      // Project structure
      structure: this.generateStructure(intent.appName),
      
      // Package.json
      packageJson: this.generatePackageJson(intent.appName),
      
      // Core app files
      appFiles: this.generateAppFiles(intent, {
        hasAuth,
        hasChat,
        hasCalendar,
        hasPayments
      }),
      
      // Database schema
      databaseSchema: this.generateDatabaseSchema(intent),
      
      // Deployment configs
      deploymentConfigs: this.generateDeploymentConfigs(intent),
      
      // Mobile configs
      mobileConfigs: intent.platforms.includes('ios') || intent.platforms.includes('android')
        ? this.generateMobileConfigs(intent)
        : null,
    };
  }

  private generateStructure(appName: string) {
    return {
      'app/': [
        'layout.tsx',
        'page.tsx',
        'globals.css',
        'api/',
        'auth/',
        'dashboard/',
        'chat/',
        'appointments/',
        'payments/',
      ],
      'components/': [
        'ui/',
        'auth/',
        'chat/',
        'calendar/',
      ],
      'lib/': [
        'supabase.ts',
        'utils.ts',
      ],
      'public/': [
        'icon.png',
        'splash.png',
      ],
    };
  }

  private generatePackageJson(appName: string) {
    return {
      name: appName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        'build:ios': 'npm run build && npx cap sync ios',
        'build:android': 'npm run build && npx cap sync android',
      },
      dependencies: {
        'next': '14.0.0',
        'react': '18.2.0',
        'react-dom': '18.2.0',
        '@supabase/supabase-js': '^2.38.0',
        '@capacitor/core': '^5.0.0',
        '@capacitor/ios': '^5.0.0',
        '@capacitor/android': '^5.0.0',
        'lucide-react': '^0.309.0',
        'date-fns': '^2.30.0',
      },
    };
  }

  private generateAppFiles(intent: DACEIntent, features: any) {
    const files: Record<string, string> = {};

    // Main layout
    files['app/layout.tsx'] = `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '${intent.appName} - Professional Therapy Platform',
  description: 'Connect with licensed therapists for mental health support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="\${inter.className} bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
`;

    // Main page
    files['app/page.tsx'] = `
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TherapistGrid from '@/components/therapist/TherapistGrid';
import AppointmentBooking from '@/components/booking/AppointmentBooking';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TherapistGrid />
      ${features.hasCalendar ? '<AppointmentBooking />' : ''}
      <FeaturesSection />
    </div>
  );
}
`;

    // Add feature-specific files
    if (features.hasAuth) {
      files['components/auth/AuthProvider.tsx'] = `
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
`;
    }

    if (features.hasChat) {
      files['components/chat/ChatInterface.tsx'] = `
'use client';

import { useState, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { user } = useAuth();

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate therapist response
    setTimeout(() => {
      const therapistMessage = {
        id: Date.now() + 1,
        text: "I understand. Tell me more about how you're feeling.",
        sender: 'therapist',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, therapistMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-xl bg-white shadow-lg">
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Therapist Chat</h3>
            <p className="text-sm opacity-90">Secure, encrypted messaging</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={\`flex \${msg.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div
              className={\`max-w-[70%] rounded-2xl px-4 py-2 \${msg.sender === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }\`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
`;
    }

    return files;
  }

  private generateDatabaseSchema(intent: DACEIntent) {
    return {
      tables: [
        {
          name: 'users',
          schema: `
            create table users (
              id uuid default gen_random_uuid() primary key,
              email text unique not null,
              full_name text,
              avatar_url text,
              user_type text check (user_type in ('client', 'therapist', 'admin')),
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'appointments',
          schema: `
            create table appointments (
              id uuid default gen_random_uuid() primary key,
              client_id uuid references users(id),
              therapist_id uuid references users(id),
              scheduled_at timestamp with time zone not null,
              duration_minutes integer default 50,
              status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
              notes text,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'messages',
          schema: `
            create table messages (
              id uuid default gen_random_uuid() primary key,
              sender_id uuid references users(id),
              receiver_id uuid references users(id),
              content text not null,
              read boolean default false,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
      ],
      functions: [
        {
          name: 'get_therapist_availability',
          sql: `
            create or replace function get_therapist_availability(therapist_id uuid)
            returns table(available_slots timestamp)
            language plpgsql
            as $$
            begin
              return query
              -- Generate available slots logic here
              select generate_series(
                now(),
                now() + interval '7 days',
                interval '1 hour'
              ) as available_slots;
            end;
            $$;
          `,
        },
      ],
    };
  }

  private generateDeploymentConfigs(intent: DACEIntent) {
    return {
      vercel: {
        'vercel.json': JSON.stringify(
          {
            buildCommand: 'npm run build',
            outputDirectory: '.next',
            devCommand: 'npm run dev',
            installCommand: 'npm install',
            framework: 'nextjs',
          },
          null,
          2
        ),
      },
      supabase: {
        'supabase/config.toml': `
[project]
name = "${intent.appName}"
database = "postgres"
        
[auth]
site_url = "https://${intent.appName.toLowerCase().replace(/\s+/g, '-')}.vercel.app"
enable_email_signup = true
        `,
      },
    };
  }

  private generateMobileConfigs(intent: DACEIntent) {
    return {
      capacitor: {
        'capacitor.config.ts': `
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.${intent.appName.toLowerCase().replace(/\s+/g, '')}.app',
  appName: '${intent.appName}',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
        `,
      },
      fastlane: {
        'fastlane/Fastfile': `
default_platform(:ios)

platform :ios do
  desc "Deploy to TestFlight"
  lane :beta do
    increment_build_number
    build_app(scheme: "${intent.appName}")
    upload_to_testflight
  end
end

platform :android do
  desc "Deploy to Play Store"
  lane :deploy do
    gradle(task: "clean")
    gradle(task: "bundle", build_type: "Release")
    upload_to_play_store
  end
end
        `,
      },
    };
  }
}