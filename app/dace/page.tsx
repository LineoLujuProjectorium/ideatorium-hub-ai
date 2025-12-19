// /app/dace/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { CommandPalette } from '@/components/command/CommandPalette';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Globe, Smartphone, CheckCircle, Clock, Rocket, Scale, Brain, FileText } from 'lucide-react';

const BACKGROUNDS = [
  '/dashboard-bg-1.jpeg',
  '/dashboard-bg-2.jpeg',
  '/dashboard-bg-3.jpeg',
  '/dashboard-bg-4.jpeg',
  '/dashboard-bg-5.jpeg',
  '/dashboard-bg-6.jpeg',
  '/dashboard-bg-7.jpeg',
  '/dashboard-bg-8.jpeg',
  '/dashboard-bg-9.jpeg',
];

interface DACEApp {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'generating' | 'deploying' | 'live' | 'published';
  deployments: {
    web?: { url: string; status: string; logs?: string[] };
    ios?: { url: string; status: string; buildNumber?: string; logs?: string[] };
    android?: { url: string; status: string; buildNumber?: string; logs?: string[] };
    supabase?: { url: string; status: string; projectId?: string; logs?: string[] };
  };
  createdAt: Date;
}

export default function DACE() {
  const [apps, setApps] = useState<DACEApp[]>([
    {
      id: 'app_interpretation_001',
      name: 'Interpretation Litigation Platform',
      type: 'interpretation',
      status: 'live',
      deployments: {
        web: { 
          url: 'https://interpretation-ligation.vercel.app', 
          status: 'deployed',
          logs: ['Deployed successfully', 'Domain configured']
        },
        supabase: {
          url: 'https://sb-abc123.supabase.co',
          status: 'active',
          projectId: 'sb-abc123'
        }
      },
      createdAt: new Date('2024-01-15'),
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateApp = async (command: any) => {
    setIsCreating(true);
    
    try {
      const response = await fetch('/api/dace/create-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command),
      });
      
      const result = await response.json();
      
      if (result.success) {
        const newApp: DACEApp = {
          id: result.app.id,
          name: result.app.name,
          type: command.appType,
          status: 'live',
          deployments: result.app.deployments,
          createdAt: new Date(),
        };
        
        setApps(prev => [newApp, ...prev]);
        
        // Show success notification
        const webUrl = result.app.deployments.web?.url;
        const iosUrl = result.app.deployments.ios?.testflight;
        const androidUrl = result.app.deployments.android?.store;
        
        alert(`🚀 App "${command.appName}" deployed successfully!\n\n${webUrl ? `🌐 Web: ${webUrl}\n` : ''}${iosUrl ? `📱 iOS: ${iosUrl}\n` : ''}${androidUrl ? `🤖 Android: ${androidUrl}\n` : ''}`);
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to create app:', error);
      alert('Failed to create app. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'deploying':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'generating':
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAppIcon = (type: string) => {
    switch (type) {
      case 'interpretation':
        return <Scale className="w-4 h-4 text-indigo-600" />;
      case 'therapy':
        return <span>🫂</span>;
      case 'ecommerce':
        return <span>🛒</span>;
      case 'social':
        return <span>👥</span>;
      default:
        return <Rocket className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPlatformBadges = (deployments: any) => {
    const badges = [];
    if (deployments.web) badges.push({ platform: 'Web', icon: Globe, color: 'bg-blue-100 text-blue-800' });
    if (deployments.ios) badges.push({ platform: 'iOS', icon: Smartphone, color: 'bg-gray-100 text-gray-800' });
    if (deployments.android) badges.push({ platform: 'Android', icon: Smartphone, color: 'bg-green-100 text-green-800' });
    if (deployments.supabase) badges.push({ platform: 'Database', icon: '🗄️', color: 'bg-purple-100 text-purple-800' });
    return badges;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {BACKGROUNDS.map((bg, index) => (
          <div
            key={bg}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === backgroundIndex ? 'opacity-20' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ideatorium DACE Engine
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-2">
                Deterministic App Creation Engine. Turn ideas into production apps in minutes.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Brain className="w-3 h-3 mr-1" /> AI-Powered
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Scale className="w-3 h-3 mr-1" /> Legal Tech
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              ⚡ Real-time Generation
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              🌐 Multi-platform
            </Badge>
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              🚀 One-click Deploy
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Command Palette */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-dashed border-indigo-200 bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-100">
                    <Rocket className="w-5 h-5 text-indigo-600" />
                  </div>
                  Create New App
                </CardTitle>
                <CardDescription>
                  Select app type, features, and platforms. Generation is 100% deterministic.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommandPalette 
                  onExecute={handleCreateApp} 
                  isExecuting={isCreating}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Active Apps & Stats */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">{apps.length}</div>
                    <div className="text-sm text-gray-600">Active Apps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {apps.filter(a => a.status === 'live').length}
                    </div>
                    <div className="text-sm text-gray-600">Live Deployments</div>
                  </div>
                  <div className="text-center col-span-2">
                    <div className="text-lg font-semibold text-gray-700 mt-4">
                      Featured Template
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Scale className="w-5 h-5 text-indigo-600" />
                      <span className="font-medium">Interpretation</span>
                      <Badge className="ml-2">New</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Litigation Intelligence Platform
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Apps List */}
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Your Applications</CardTitle>
                <CardDescription>
                  {apps.length} app{apps.length !== 1 ? 's' : ''} deployed
                </CardDescription>
              </CardHeader>
              <CardContent>
                {apps.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="mb-4">No apps created yet</div>
                    <div className="text-sm">Use the command palette to create your first app</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-lg border hover:border-indigo-300 transition-colors bg-white"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-50">
                              {getAppIcon(app.type)}
                            </div>
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {getStatusIcon(app.status)}
                                {app.name}
                              </div>
                              <div className="text-sm text-gray-500 capitalize flex items-center gap-2">
                                {app.type} App
                                {app.type === 'interpretation' && (
                                  <Badge variant="outline" className="text-xs">
                                    <Brain className="w-3 h-3 mr-1" />
                                    AI Legal
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge variant={
                            app.status === 'live' ? 'default' : 
                            app.status === 'deploying' ? 'secondary' : 'outline'
                          }>
                            {app.status}
                          </Badge>
                        </div>
                        
                        {/* Platforms */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {getPlatformBadges(app.deployments).map((badge, idx) => {
                            const Icon = badge.icon;
                            return (
                              <Badge key={idx} variant="outline" className={`text-xs ${badge.color}`}>
                                {typeof Icon === 'string' ? (
                                  <span className="mr-1">{Icon}</span>
                                ) : (
                                  <Icon className="w-3 h-3 mr-1" />
                                )}
                                {badge.platform}
                              </Badge>
                            );
                          })}
                        </div>
                        
                        {/* Links */}
                        <div className="space-y-1">
                          {app.deployments.web?.url && (
                            <a
                              href={app.deployments.web.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                              <Globe className="w-3 h-3" />
                              Web App: {new URL(app.deployments.web.url).hostname}
                            </a>
                          )}
                          {app.deployments.supabase?.url && (
                            <div className="text-sm text-gray-600">
                              <span className="mr-1">🗄️</span>
                              Database: {app.deployments.supabase.projectId}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-400 mt-2">
                          Created {app.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            💡 <strong>DACE Principle:</strong> Same input = Same output. No AI randomness. 
            Templates are versioned and tested.
          </p>
          <p className="mt-2">
            Apps are deployed to Vercel (web), Supabase (database), and prepared for App Store/Play Store submission.
          </p>
        </div>
      </div>
    </div>
  );
}
