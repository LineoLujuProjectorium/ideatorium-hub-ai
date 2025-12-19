// /engine/intent/parser.ts
const APP_GRAMMAR = {
  CREATE: ['app', 'component', 'page'],
  WITH: ['auth', 'database', 'payment', 'chat', 'calendar'],
  FOR: ['ios', 'android', 'web', 'all'],
  USING: ['react', 'vue', 'flutter'] // templates
};

// Example: "make a therapy app with chat and calendar for ios"
// → { action: 'CREATE', type: 'app', features: ['chat', 'calendar'], platform: 'ios' }