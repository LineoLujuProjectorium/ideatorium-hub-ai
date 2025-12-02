cd ~/lujuinc-app-studios-2025/creatorium-ai
cat > deepseek-simple.html << 'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeepSeek DevStudio - Simple Version</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            min-height: 100vh;
            font-family: system-ui, -apple-system, sans-serif;
        }
        
        .gradient-text {
            background: linear-gradient(90deg, #60a5fa, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .card {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .message-user {
            background: linear-gradient(90deg, #3b82f6, #6366f1);
        }
        
        .message-ai {
            background: #1e293b;
        }
    </style>
</head>
<body class="text-white p-4">
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <header class="flex justify-between items-center mb-8 p-4 card rounded-2xl">
            <div class="flex items-center space-x-3">
                <div class="text-3xl">🧠</div>
                <h1 class="text-2xl font-bold gradient-text">DeepSeek DevStudio</h1>
            </div>
            <div class="flex space-x-3">
                <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                    <i class="fab fa-github mr-2"></i>Connect GitHub
                </button>
                <button class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                    <i class="fas fa-plus mr-2"></i>New Project
                </button>
            </div>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Sidebar -->
            <div class="card rounded-2xl p-6">
                <h2 class="text-xl font-bold mb-6">AI Assistants</h2>
                <div class="space-y-3">
                    <div class="p-3 bg-blue-900/30 rounded-lg flex items-center space-x-3">
                        <div class="text-2xl">🤖</div>
                        <span>DeepSeek Coder</span>
                    </div>
                    <div class="p-3 bg-gray-800 rounded-lg flex items-center space-x-3">
                        <div class="text-2xl">👨‍💻</div>
                        <span>Code Reviewer</span>
                    </div>
                    <div class="p-3 bg-gray-800 rounded-lg flex items-center space-x-3">
                        <div class="text-2xl">🐛</div>
                        <span>Debug Assistant</span>
                    </div>
                    <div class="p-3 bg-gray-800 rounded-lg flex items-center space-x-3">
                        <div class="text-2xl">🎨</div>
                        <span>UI Designer</span>
                    </div>
                </div>
                
                <div class="mt-8">
                    <h3 class="font-bold mb-4">Quick Stats</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span>Projects</span>
                            <span class="font-bold">4</span>
                        </div>
                        <div class="flex justify-between">
                            <span>AI Tokens</span>
                            <span class="font-bold">1,247</span>
                        </div>
                        <div class="flex justify-between">
                            <span>API Status</span>
                            <span class="text-green-400 font-bold">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Chat -->
                <div class="card rounded-2xl p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">AI Chat Assistant</h2>
                        <div class="flex space-x-2 bg-gray-800 p-1 rounded-lg">
                            <button class="px-4 py-2 bg-blue-600 rounded-lg">DeepSeek</button>
                            <button class="px-4 py-2 rounded-lg hover:bg-gray-700">ChatGPT</button>
                        </div>
                    </div>
                    
                    <!-- Chat Messages -->
                    <div class="h-64 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-900/50 rounded-xl">
                        <div class="message-ai p-4 rounded-xl max-w-[80%]">
                            <div class="flex items-center space-x-2 mb-2">
                                <div class="text-xl">🤖</div>
                                <span class="font-semibold">DeepSeek AI</span>
                            </div>
                            <p>Hello! I'm your AI development assistant. I can help you with coding, debugging, project planning, and more. How can I assist you today?</p>
                        </div>
                        
                        <div class="message-user p-4 rounded-xl max-w-[80%] ml-auto">
                            <div class="flex items-center space-x-2 mb-2 justify-end">
                                <span class="font-semibold">You</span>
                                <div class="text-xl">👤</div>
                            </div>
                            <p>Can you create a responsive navbar for my website?</p>
                        </div>
                        
                        <div class="message-ai p-4 rounded-xl max-w-[80%]">
                            <div class="flex items-center space-x-2 mb-2">
                                <div class="text-xl">🤖</div>
                                <span class="font-semibold">DeepSeek AI</span>
                            </div>
                            <p>Certainly! Here's a responsive navbar with Tailwind CSS:</p>
                            <pre class="mt-2 p-3 bg-gray-950 rounded-lg text-sm overflow-x-auto">
<code>&lt;nav class="bg-gray-800 p-4"&gt;
  &lt;div class="container mx-auto flex justify-between items-center"&gt;
    &lt;div class="text-xl font-bold"&gt;Logo&lt;/div&gt;
    &lt;div class="hidden md:flex space-x-6"&gt;
      &lt;a href="#" class="hover:text-blue-400"&gt;Home&lt;/a&gt;
      &lt;a href="#" class="hover:text-blue-400"&gt;Projects&lt;/a&gt;
      &lt;a href="#" class="hover:text-blue-400"&gt;About&lt;/a&gt;
    &lt;/div&gt;
    &lt;button class="md:hidden"&gt;☰&lt;/button&gt;
  &lt;/div&gt;
&lt;/nav&gt;</code></pre>
                        </div>
                    </div>
                    
                    <!-- Chat Input -->
                    <div class="flex space-x-4">
                        <input 
                            type="text" 
                            placeholder="Ask me about coding, projects, or debugging..."
                            class="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="chatInput"
                        >
                        <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
                            <i class="fas fa-paper-plane mr-2"></i>Send
                        </button>
                    </div>
                </div>

                <!-- Projects -->
                <div class="card rounded-2xl p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">My Projects</h2>
                        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                            + New Project
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-semibold text-lg">E-Commerce Platform</h3>
                                    <p class="text-gray-400 text-sm">Full-featured online shopping</p>
                                </div>
                                <span class="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">Active</span>
                            </div>
                            <div class="mt-4">
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Progress</span>
                                    <span>75%</span>
                                </div>
                                <div class="w-full bg-gray-800 rounded-full h-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 75%"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-900/50 p-4 rounded-xl hover:bg-gray-800/50 transition">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-semibold text-lg">Task Management</h3>
                                    <p class="text-gray-400 text-sm">Collaborative task manager</p>
                                </div>
                                <span class="text-xs px-2 py-1 bg-yellow-900 text-yellow-300 rounded">Building</span>
                            </div>
                            <div class="mt-4">
                                <div class="flex justify-between text-sm mb-1">
                                    <span>Progress</span>
                                    <span>40%</span>
                                </div>
                                <div class="w-full bg-gray-800 rounded-full h-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 40%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="mt-8 text-center text-gray-400">
            <p>Built for Luju Inc App Studios 2025 • AI-Powered Development Platform</p>
            <p class="text-sm mt-2">Backend: http://localhost:5000 • Frontend: http://localhost:3000</p>
        </footer>
    </div>

    <script>
        // Simple chat functionality
        document.querySelector('button').addEventListener('click', function() {
            const input = document.getElementById('chatInput');
            if (input.value.trim()) {
                alert('Message sent: ' + input.value + '\n\nIn a real app, this would connect to DeepSeek API.');
                input.value = '';
            }
        });
        
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.querySelector('button').click();
            }
        });
    </script>
</body>
</html>
HTML

echo "✅ Created simple HTML version!"
echo "Open this file in your browser:"
echo "open deepseek-simple.html"