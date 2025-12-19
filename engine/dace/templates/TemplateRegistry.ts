// /engine/dace/templates/TemplateRegistry.ts
import { TherapyAppTemplate } from './TherapyAppTemplate';
import { EcommerceAppTemplate } from './EcommerceAppTemplate';
import { SocialAppTemplate } from './SocialAppTemplate';
import { DashboardAppTemplate } from './DashboardAppTemplate';
import { InterpretationAppTemplate } from './InterpretationAppTemplate';

export class TemplateRegistry {
  private templates: Map<string, any> = new Map();

  constructor() {
    this.registerTemplates();
  }

  private registerTemplates() {
    this.templates.set('interpretation', new InterpretationAppTemplate());
    this.templates.set('therapy', new TherapyAppTemplate());
    this.templates.set('ecommerce', new EcommerceAppTemplate());
    this.templates.set('social', new SocialAppTemplate());
    this.templates.set('dashboard', new DashboardAppTemplate());
    this.templates.set('blog', new TherapyAppTemplate());
    this.templates.set('crm', new TherapyAppTemplate());
  }

  getTemplate(appType: string, features: string[]) {
    const template = this.templates.get(appType);
    
    if (!template) {
      throw new Error(`Template not found for app type: ${appType}`);
    }

    const supportedFeatures = this.getSupportedFeatures(appType);
    const invalidFeatures = features.filter(f => !supportedFeatures.includes(f));
    
    if (invalidFeatures.length > 0) {
      console.warn(`Unsupported features: ${invalidFeatures.join(', ')}. Using supported features only.`);
    }

    return template;
  }

  getSupportedFeatures(appType: string): string[] {
    const featureMap: Record<string, string[]> = {
      'interpretation': [
        'ai-analysis', 
        'document-management', 
        'timeline-visualization', 
        'collaboration', 
        'analytics', 
        'precedent-search', 
        'risk-assessment',
        'auth',
        'database'
      ],
      'therapy': ['auth', 'database', 'chat', 'calendar', 'payments', 'notifications', 'file-upload', 'analytics'],
      'ecommerce': ['auth', 'database', 'payments', 'inventory', 'reviews', 'analytics', 'chat', 'notifications'],
      'social': ['auth', 'database', 'chat', 'posts', 'comments', 'notifications', 'file-upload', 'analytics'],
      'dashboard': ['auth', 'database', 'analytics', 'charts', 'export', 'notifications', 'file-upload'],
      'blog': ['auth', 'database', 'posts', 'comments', 'search', 'analytics', 'file-upload'],
      'crm': ['auth', 'database', 'contacts', 'calendar', 'tasks', 'analytics', 'notifications'],
    };

    return featureMap[appType] || ['auth', 'database'];
  }

  getAllTemplates() {
    return Array.from(this.templates.entries()).map(([name, template]) => ({
      name,
      description: template.description || `${name} application`,
      features: this.getSupportedFeatures(name),
    }));
  }
}