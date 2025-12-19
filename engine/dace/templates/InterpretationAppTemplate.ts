// /engine/dace/templates/InterpretationAppTemplate.ts
import { DACEIntent } from '../DeterministicEngine';

export class InterpretationAppTemplate {
  name = 'interpretation-app';
  version = '1.0.0';
  description = 'Litigation Intelligence Platform - Case analysis, document review, and legal insights';
  
  dependencies = {
    frontend: ['react', 'react-dom', 'nextjs', 'tailwindcss', 'supabase-js'],
    backend: ['supabase', 'postgresql', 'openai', 'anthropic'],
    analytics: ['chart.js', 'recharts'],
    document: ['pdf-lib', 'mammoth'],
  };

  generate(intent: DACEIntent) {
    const hasAI = intent.features.includes('ai-analysis');
    const hasDocuments = intent.features.includes('document-management');
    const hasTimeline = intent.features.includes('timeline-visualization');
    const hasCollaboration = intent.features.includes('collaboration');

    return {
      structure: this.generateStructure(intent.appName),
      packageJson: this.generatePackageJson(intent.appName, hasAI),
      appFiles: this.generateAppFiles(intent, {
        hasAI,
        hasDocuments,
        hasTimeline,
        hasCollaboration
      }),
      databaseSchema: this.generateDatabaseSchema(),
      deploymentConfigs: this.generateDeploymentConfigs(intent),
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
        'dashboard/',
        'cases/',
        'documents/',
        'timeline/',
        'analytics/',
        'api/',
        'ai/',
      ],
      'components/': [
        'case/',
        'document/',
        'timeline/',
        'analytics/',
        'ai/',
        'ui/',
      ],
      'lib/': [
        'supabase.ts',
        'ai.ts',
        'utils.ts',
        'legal.ts',
      ],
      'public/': [
        'icon.png',
        'splash.png',
        'legal-bg.jpg',
      ],
    };
  }

  private generatePackageJson(appName: string, hasAI: boolean) {
    const baseDeps = {
      'next': '14.0.0',
      'react': '18.2.0',
      'react-dom': '18.2.0',
      '@supabase/supabase-js': '^2.38.0',
      'lucide-react': '^0.309.0',
      'date-fns': '^2.30.0',
      'recharts': '^2.8.0',
      'react-query': '^3.39.3',
      'zod': '^3.22.4',
      '@tanstack/react-table': '^8.10.0',
      'pdf-lib': '^1.17.1',
    };

    if (hasAI) {
      baseDeps['openai'] = '^4.20.0';
      baseDeps['@anthropic-ai/sdk'] = '^0.27.0';
    }

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
      dependencies: baseDeps,
    };
  }

  private generateAppFiles(intent: DACEIntent, features: any) {
    const files: Record<string, string> = {};

    // Main layout with legal-themed styling
    files['app/layout.tsx'] = `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '${intent.appName} - Litigation Intelligence Platform',
  description: 'AI-powered case analysis, document review, and legal insights for modern law firms',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${inter.className} bg-gray-50 dark:bg-gray-900\`}>
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
`;

    // Main dashboard page
    files['app/page.tsx'] = `
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CaseMetrics from '@/components/analytics/CaseMetrics';
import RecentCases from '@/components/case/RecentCases';
import DocumentQueue from '@/components/document/DocumentQueue';
import AIInsightsPanel from '@/components/ai/AIInsightsPanel';
import TimelineOverview from '@/components/timeline/TimelineOverview';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CaseMetrics />
            <RecentCases />
            <TimelineOverview />
          </div>
          <div className="space-y-8">
            <DocumentQueue />
            <AIInsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

    // Dashboard Header Component
    files['components/dashboard/DashboardHeader.tsx'] = `
'use client';

import { Scale, Bell, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Interpretation
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Litigation Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search cases, documents, or insights..."
                className="pl-10 w-80 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
`;

    // Case Metrics Component
    files['components/analytics/CaseMetrics.tsx'] = `
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Clock, Award, Scale, FileText } from 'lucide-react';

const metrics = [
  {
    title: 'Active Cases',
    value: '24',
    change: '+12%',
    trend: 'up',
    icon: Scale,
    color: 'bg-blue-500',
  },
  {
    title: 'Documents Reviewed',
    value: '1,847',
    change: '+23%',
    trend: 'up',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    title: 'Avg. Resolution Time',
    value: '42 days',
    change: '-8%',
    trend: 'down',
    icon: Clock,
    color: 'bg-amber-500',
  },
  {
    title: 'Success Rate',
    value: '89%',
    change: '+5%',
    trend: 'up',
    icon: Award,
    color: 'bg-purple-500',
  },
];

export default function CaseMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
            <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          Case Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={\`p-3 rounded-xl \${metric.color} bg-opacity-10\`}>
                    <Icon className={\`w-6 h-6 \${metric.color.replace('bg-', 'text-')}\`} />
                  </div>
                  <div className={\`flex items-center gap-1 text-sm \${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}\`}>
                    <TrendIcon className="w-4 h-4" />
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
`;

    // Recent Cases Component
    files['components/case/RecentCases.tsx'] = `
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Eye, Download, Share2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const cases = [
  {
    id: 'C-2024-001',
    title: 'Smith vs. TechCorp Inc.',
    type: 'Patent Infringement',
    status: 'active',
    lastActivity: '2 hours ago',
    documents: 24,
    riskLevel: 'high',
    progress: 75,
  },
  {
    id: 'C-2024-002',
    title: 'Johnson Class Action',
    type: 'Employment Law',
    status: 'review',
    lastActivity: '1 day ago',
    documents: 142,
    riskLevel: 'medium',
    progress: 45,
  },
  {
    id: 'C-2024-003',
    title: 'Davis Contract Dispute',
    type: 'Contract Law',
    status: 'drafting',
    lastActivity: '3 days ago',
    documents: 18,
    riskLevel: 'low',
    progress: 30,
  },
  {
    id: 'C-2024-004',
    title: 'Thompson IP Case',
    type: 'Intellectual Property',
    status: 'active',
    lastActivity: '5 days ago',
    documents: 67,
    riskLevel: 'high',
    progress: 60,
  },
  {
    id: 'C-2024-005',
    title: 'Wilson Personal Injury',
    type: 'Tort Law',
    status: 'settlement',
    lastActivity: '1 week ago',
    documents: 89,
    riskLevel: 'medium',
    progress: 90,
  },
];

export default function RecentCases() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      drafting: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      settlement: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return colors[risk] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Cases</CardTitle>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="font-mono font-semibold">{caseItem.id}</TableCell>
                <TableCell className="font-medium">{caseItem.title}</TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getRiskColor(caseItem.riskLevel)}>
                    {caseItem.riskLevel.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {caseItem.documents}
                      </span>
                    </div>
                    <span>docs</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{caseItem.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: \`\${caseItem.progress}%\` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
`;

    // AI Insights Panel Component
    files['components/ai/AIInsightsPanel.tsx'] = `
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const insights = [
  {
    type: 'risk',
    title: 'High Conflict Potential',
    description: 'Case C-2024-001 shows 87% similarity to precedent with unfavorable outcomes.',
    icon: AlertTriangle,
    color: 'text-red-600 bg-red-100 dark:bg-red-900',
    action: 'Review Strategy',
  },
  {
    type: 'opportunity',
    title: 'Strong Precedent Match',
    description: 'Found 3 favorable precedents with 92% relevance to Johnson Class Action.',
    icon: Target,
    color: 'text-green-600 bg-green-100 dark:bg-green-900',
    action: 'View Precedents',
  },
  {
    type: 'insight',
    title: 'Pattern Detected',
    description: 'Opposing counsel consistently settles at 65-70% of claim value.',
    icon: Lightbulb,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900',
    action: 'Analyze Pattern',
  },
];

export default function AIInsightsPanel() {
  return (
    <Card className="border-2 border-dashed border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <Brain className="w-5 h-5 text-white" />
          </div>
          AI Legal Insights
          <Badge variant="outline" className="ml-2 text-xs">
            BETA
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={\`p-2 rounded-lg \${insight.color}\`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {insight.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {insight.action} →
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                AI Analysis Ready
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                12 documents queued for review
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Start Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
`;

    // Add more components if features are enabled
    if (features.hasDocuments) {
      files['components/document/DocumentQueue.tsx'] = `
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const documents = [
  { name: 'Complaint - Smith.pdf', status: 'reviewed', pages: 24, aiScore: 92 },
  { name: 'Deposition Transcript.docx', status: 'pending', pages: 56, aiScore: 45 },
  { name: 'Expert Report.pdf', status: 'in-progress', pages: 18, aiScore: 78 },
  { name: 'Motion to Dismiss.pdf', status: 'needs-attention', pages: 12, aiScore: 23 },
  { name: 'Discovery Requests.zip', status: 'pending', pages: 142, aiScore: 15 },
];

export default function DocumentQueue() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reviewed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'needs-attention': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-green-100 text-green-800 dark:bg-green-900';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900';
      case 'needs-attention': return 'bg-red-100 text-red-800 dark:bg-red-900';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{doc.pages} pages</span>
                    <span>AI Score: {doc.aiScore}%</span>
                  </div>
                </div>
              </div>
              <div className={\`px-2 py-1 rounded text-xs font-medium \${getStatusColor(doc.status)}\`}>
                {doc.status.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Review Progress</span>
            <span>42%</span>
          </div>
          <Progress value={42} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
`;
    }

    return files;
  }

  private generateDatabaseSchema() {
    return {
      tables: [
        {
          name: 'cases',
          schema: `
            create table cases (
              id uuid default gen_random_uuid() primary key,
              case_number text not null unique,
              title text not null,
              description text,
              case_type text check (case_type in ('civil', 'criminal', 'family', 'corporate', 'ip', 'employment')),
              status text check (status in ('draft', 'active', 'review', 'settlement', 'closed', 'archived')) default 'draft',
              jurisdiction text,
              court text,
              judge text,
              opposing_counsel text,
              risk_level text check (risk_level in ('low', 'medium', 'high', 'critical')) default 'medium',
              estimated_value decimal(15,2),
              start_date date,
              estimated_end_date date,
              actual_end_date date,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null,
              updated_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'documents',
          schema: `
            create table documents (
              id uuid default gen_random_uuid() primary key,
              case_id uuid references cases(id) on delete cascade,
              title text not null,
              file_name text not null,
              file_path text not null,
              file_type text,
              file_size integer,
              pages integer,
              status text check (status in ('uploaded', 'processing', 'reviewed', 'needs_review', 'archived')) default 'uploaded',
              ai_analysis jsonb,
              keywords text[],
              summary text,
              created_by uuid references users(id),
              created_at timestamp with time zone default timezone('utc'::text, now()) not null,
              updated_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'timeline_events',
          schema: `
            create table timeline_events (
              id uuid default gen_random_uuid() primary key,
              case_id uuid references cases(id) on delete cascade,
              event_type text check (event_type in ('filing', 'hearing', 'discovery', 'deposition', 'motion', 'settlement', 'trial', 'judgment', 'appeal')),
              title text not null,
              description text,
              event_date date not null,
              event_time time,
              location text,
              participants text[],
              documents text[],
              outcome text,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'legal_precedents',
          schema: `
            create table legal_precedents (
              id uuid default gen_random_uuid() primary key,
              citation text not null unique,
              case_name text not null,
              court text,
              year integer,
              jurisdiction text,
              summary text,
              full_text text,
              keywords text[],
              relevance_score integer check (relevance_score >= 0 and relevance_score <= 100),
              related_cases uuid[],
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
        {
          name: 'ai_analyses',
          schema: `
            create table ai_analyses (
              id uuid default gen_random_uuid() primary key,
              case_id uuid references cases(id) on delete cascade,
              document_id uuid references documents(id) on delete cascade,
              analysis_type text check (analysis_type in ('risk', 'precedent', 'strategy', 'clause', 'timeline')),
              model text,
              prompt text,
              response jsonb not null,
              confidence_score decimal(3,2),
              insights text[],
              recommendations text[],
              created_at timestamp with time zone default timezone('utc'::text, now()) not null
            );
          `,
        },
      ],
      functions: [
        {
          name: 'calculate_case_risk_score',
          sql: `
            create or replace function calculate_case_risk_score(case_id uuid)
            returns decimal(3,2)
            language plpgsql
            as $$
            declare
              risk_score decimal(3,2);
            begin
              select 
                case
                  when count(ai.*) = 0 then 0.5
                  else avg(ai.confidence_score * 
                    case 
                      when ai.analysis_type = 'risk' then 0.4
                      when ai.analysis_type = 'precedent' then 0.3
                      else 0.1
                    end)
                end
              into risk_score
              from ai_analyses ai
              where ai.case_id = calculate_case_risk_score.case_id;
              
              return coalesce(risk_score, 0.5);
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
            env: {
              SUPABASE_URL: '$SUPABASE_URL',
              SUPABASE_ANON_KEY: '$SUPABASE_ANON_KEY',
              OPENAI_API_KEY: '$OPENAI_API_KEY',
              ANTHROPIC_API_KEY: '$ANTHROPIC_API_KEY',
            },
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
additional_redirect_urls = [
  "capacitor://localhost",
  "http://localhost"
]
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
  appId: 'com.interpretation.litigation',
  appName: '${intent.appName}',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#1e40af",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
        `,
      },
    };
  }
}