// /components/providers/DACEProvider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast, Toaster } from 'sonner';

interface DACEContextType {
  apps: any[];
  addApp: (app: any) => void;
  updateApp: (appId: string, updates: any) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const DACEContext = createContext<DACEContextType | undefined>(undefined);

export function DACEProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<any[]>([]);

  const addApp = (app: any) => {
    setApps(prev => [app, ...prev]);
    showNotification(`App "${app.name}" created successfully!`, 'success');
  };

  const updateApp = (appId: string, updates: any) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, ...updates } : app
    ));
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
    }
  };

  return (
    <DACEContext.Provider value={{ apps, addApp, updateApp, showNotification }}>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      {children}
    </DACEContext.Provider>
  );
}

export const useDACE = () => {
  const context = useContext(DACEContext);
  if (!context) {
    throw new Error('useDACE must be used within DACEProvider');
  }
  return context;
};