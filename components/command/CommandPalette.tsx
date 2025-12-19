// /components/command/CommandPalette.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Sparkles, Globe, Smartphone, Tablet, Check, Scale, FileText, Brain, Timeline, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const APP_TYPES = [
  { id: 'interpretation', name: 'Interpretation', icon: '⚖️', color: 'bg-indigo-500', description: 'Litigation Intelligence Platform' },
  { id: 'therapy', name: 'Therapy App', icon: '🫂', color: 'bg-blue-500', description: 'Mental health & counseling' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒', color: 'bg-green-500', description: 'Online store & payments' },
  { id: 'social', name: 'Social Network', icon: '👥', color: 'bg-purple-500', description: 'Community & connections' },
  { id: 'dashboard', name: 'Analytics Dashboard', icon: '📊', color: 'bg-amber-500', description: 'Data visualization & insights' },
  { id: 'blog', name: 'Blog/CMS', icon: '📝', color: 'bg-pink-500', description: 'Content management system' },
  { id: 'crm', name: 'CRM Tool', icon: '👨‍💼', color: 'bg-indigo-500', description: 'Customer relationship management' },
];

const FEATURES = {
  interpretation: [
    { id: 'ai-analysis', name: 'AI Legal Analysis', description: 'Document review & risk assessment', icon: Brain },
    { id: 'document-management', name: 'Document Management', description: 'Secure filing & version control', icon: FileText },
    { id: 'timeline-visualization', name: 'Case Timeline', description: 'Visual chronology of events', icon: Timeline },
    { id: 'collaboration', name: 'Team Collaboration', description: 'Multi-user case management', icon: Users },
    { id: 'precedent-search', name: 'Precedent Search', description: 'Legal database integration', icon: Search },
    { id: 'risk-assessment', name: 'Risk Assessment', description: 'Predictive analytics', icon: Scale },
    { id: 'analytics', name: 'Case Analytics', description: 'Performance metrics & insights', icon: '📈' },
  ],
  default: [
    { id: 'auth', name: 'User Authentication', description: 'Login, signup, profiles' },
    { id: 'database', name: 'Database', description: 'Supabase backend' },
    { id: 'chat', name: 'Real-time Chat', description: 'Messaging system' },
    { id: 'payments', name: 'Payments', description: 'Stripe integration' },
    { id: 'calendar', name: 'Calendar', description: 'Booking & scheduling' },
    { id: 'notifications', name: 'Push Notifications', description: 'Mobile alerts' },
    { id: 'analytics', name: 'Analytics', description: 'Usage tracking' },
    { id: 'file-upload', name: 'File Upload', description: 'Images, documents' },
  ]
};

const PLATFORMS = [
  { id: 'web', name: 'Web', icon: Globe },
  { id: 'ios', name: 'iOS', icon: Smartphone },
  { id: 'android', name: 'Android', icon: Tablet },
];

interface CommandPaletteProps {
  onExecute: (command: {
    appType: string;
    appName: string;
    features: string[];
    platforms: string[];
  }) => Promise<void>;
  isExecuting: boolean;
}

export function CommandPalette({ onExecute, isExecuting }: CommandPaletteProps) {
  const [appType, setAppType] = useState<string>('');
  const [appName, setAppName] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'database']);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['web']);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const getFeaturesForApp = (type: string) => {
    return FEATURES[type as keyof typeof FEATURES] || FEATURES.default;
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleExecute = async () => {
    if (!appType || !appName.trim()) {
      alert('Please select an app type and enter a name');
      return;
    }

    await onExecute({
      appType,
      appName: appName.trim(),
      features: selectedFeatures,
      platforms: selectedPlatforms,
    });

    // Reset form
    setAppType('');
    setAppName('');
    setSelectedFeatures(['auth', 'database']);
    setSelectedPlatforms(['web']);
    setStep(1);
  };

  const selectedApp = APP_TYPES.find(app => app.id === appType);
  const availableFeatures = getFeaturesForApp(appType);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Deterministic App Creation Engine
          </h1>
          <Badge variant="outline" className="ml-2">
            DACE v1.0
          </Badge>
        </div>
        <p className="text-gray-500">
          No AI hallucinations. Template → Code → Deploy. 100% deterministic.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            <span className={`text-sm ${step >= s ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {s === 1 ? 'App Type' : s === 2 ? 'Features' : 'Deploy'}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: App Type Selection */}
      {step === 1 && (
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">1. Select App Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {APP_TYPES.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setAppType(app.id);
                    setStep(2);
                    // Auto-generate name
                    if (app.id === 'interpretation') {
                      setAppName('Interpretation Litigation Platform');
                      setSelectedFeatures(['ai-analysis', 'document-management', 'timeline-visualization']);
                    } else {
                      setAppName(`My ${app.name}`);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    appType === app.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">{app.icon}</span>
                    <span className="font-medium">{app.name}</span>
                    <span className="text-xs text-gray-500 text-center">
                      {app.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Features Selection */}
      {step === 2 && appType && (
        <>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {APP_TYPES.find(a => a.id === appType)?.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold">{selectedApp?.name}</h3>
                      <p className="text-sm text-gray-600">{selectedApp?.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      placeholder="Enter your app name..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      This will be your app's official name
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-gray-500"
                >
                  ← Change Type
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">2. Select Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableFeatures.map((feature: any) => {
                  const Icon = feature.icon || (() => null);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {typeof feature.icon === 'string' ? (
                              <span>{feature.icon}</span>
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                            <div className="font-medium">{feature.name}</div>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {feature.description}
                          </div>
                        </div>
                        {selectedFeatures.includes(feature.id) && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => setStep(3)}
                  className="w-full"
                >
                  Continue to Deployment →
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 3: Platforms & Execute */}
      {step === 3 && appType && (
        <>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">3. Select Platforms</h3>
              <div className="flex flex-wrap gap-4 mb-8">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => handlePlatformToggle(platform.id)}
                      className={`flex-1 min-w-[120px] p-4 rounded-xl border-2 flex flex-col items-center transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-8 h-8 mb-2" />
                      <span className="font-medium">{platform.name}</span>
                      {selectedPlatforms.includes(platform.id) && (
                        <Badge className="mt-2" variant="secondary">
                          Selected
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">App Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">App Type:</span>
                    <span className="font-medium">
                      {APP_TYPES.find(a => a.id === appType)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">App Name:</span>
                    <span className="font-medium">{appName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium text-right">
                      {selectedFeatures.length} selected
                      <div className="text-xs text-gray-500 mt-1">
                        {selectedFeatures.map(f => 
                          availableFeatures.find((af: any) => af.id === f)?.name
                        ).join(', ')}
                      </div>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platforms:</span>
                    <span className="font-medium">
                      {selectedPlatforms.map(p => 
                        PLATFORMS.find(pl => pl.id === p)?.name
                      ).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Execute Button */}
              <Button
                onClick={handleExecute}
                disabled={isExecuting || selectedPlatforms.length === 0}
                className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isExecuting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating & Deploying App...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" />
                    🚀 Generate & Deploy App Instantly
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                This will create a production-ready app and deploy it automatically.
                No AI hallucinations - 100% deterministic template-based generation.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}