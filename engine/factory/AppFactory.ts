// /engine/factory/AppFactory.ts
class AppFactory {
  async createFromIntent(intent: ParsedIntent) {
    // 1. Select base template (therapy, ecommerce, social, etc.)
    const template = await this.selectTemplate(intent);
    
    // 2. Apply feature modules (auth, chat, etc.)
    const modules = await this.applyFeatures(template, intent.features);
    
    // 3. Generate platform-specific code
    const artifacts = await this.compileForPlatform(modules, intent.platform);
    
    // 4. Create project record in DB
    const project = await this.persistProject(artifacts);
    
    // 5. Instantiate running instance
    await this.deploySandbox(project);
    
    return project;
  }
}