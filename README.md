# CodeForge AI 🚀

![CodeForge AI](https://img.shields.io/badge/AI-Powered-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204-purple)

**The Ultimate AI-Powered Full-Stack Application Builder**

CodeForge AI is a revolutionary web application builder that surpasses Lovable with advanced AI capabilities, better developer experience, and more powerful features. Build production-ready applications using natural language powered by Claude Sonnet 4.

## ✨ Features

### Core Features

- **🤖 AI Code Generation**: Claude Sonnet 4 generates production-ready code from natural language prompts
- **💻 Advanced Code Editor**: Monaco editor with IntelliSense, auto-completion, and syntax highlighting for 50+ languages
- **⚡ Live Preview**: Real-time preview with hot reload across desktop, tablet, and mobile views
- **💬 AI Chat Assistant**: Context-aware AI assistant for code generation, debugging, and guidance
- **📁 Project Management**: Create, save, and manage multiple projects with auto-save
- **🎨 Template Marketplace**: Start with professionally designed templates for common use cases

### Advanced Features (Beyond Lovable)

- **🎯 Component Library**: Drag-and-drop interface builder with reusable components
- **🗄️ Visual Database Designer**: Design schemas with AI assistance and instant migrations
- **🔄 Version Control**: Built-in Git-like versioning with unlimited undo/redo
- **🚀 One-Click Deployment**: Deploy to Vercel, Netlify, or custom servers
- **👥 Real-Time Collaboration**: Work together like Figma with live cursors
- **🔌 API Testing**: Built-in API playground for testing endpoints
- **📊 Performance Metrics**: Monitor performance, bundle size, and optimization opportunities
- **🔒 Enterprise Security**: Sandboxed execution, encrypted storage, and secure deployments

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Anthropic API key (for AI features)
- Optional: Supabase account (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codeforge-ai.git
   cd codeforge-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:
   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Quick Start Guide

### Creating Your First Project

1. **Start from Landing Page**
   - Click "Start Building" to go to the editor
   - Or browse "Explore Templates" for pre-built templates

2. **Use the Editor**
   - **Sidebar**: Browse and manage your project files
   - **Code Editor**: Write code with Monaco editor (VS Code's editor)
   - **Preview Panel**: See live changes in real-time
   - **AI Chat**: Ask questions, generate code, fix bugs

3. **AI-Powered Development**
   ```
   Examples of what you can ask:
   - "Create a landing page with a hero section and pricing cards"
   - "Add authentication with email and password"
   - "Generate a REST API for user management"
   - "Create a responsive navbar with dark mode toggle"
   - "Fix the TypeScript errors in this file"
   ```

4. **Preview Your App**
   - Toggle between desktop, tablet, and mobile views
   - See changes instantly with hot reload
   - Test responsiveness and interactions

5. **Save and Deploy**
   - Projects auto-save as you work
   - Click "Export" to download your project
   - Use "Deploy" for one-click deployment

## 🏗️ Architecture

### Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui Components
- Monaco Editor
- Framer Motion

**Backend**
- Next.js API Routes
- Supabase (PostgreSQL)
- Anthropic Claude API
- NextAuth.js

**AI & Code Generation**
- Claude Sonnet 4 (latest model)
- Context-aware code generation
- Multi-file project generation
- Intelligent code completion

### Project Structure

```
codeforge-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── ai/           # AI endpoints
│   ├── editor/           # Main editor page
│   ├── projects/         # Project management
│   ├── templates/        # Template marketplace
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── editor/           # Editor components
│   ├── landing/          # Landing page
│   └── ui/              # Reusable UI components
├── lib/                  # Utilities and core logic
│   ├── ai/              # AI integration
│   ├── store/           # State management (Zustand)
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🎨 Features in Detail

### AI Code Generation

CodeForge AI uses Claude Sonnet 4, Anthropic's most advanced model:

- **Natural Language to Code**: Describe what you want, get production-ready code
- **Context-Aware**: AI understands your entire project structure
- **Multi-File Generation**: Generate complete features across multiple files
- **Smart Refactoring**: Improve existing code with AI suggestions
- **Bug Detection**: Automatically detect and fix common issues

### Code Editor

Powered by Monaco Editor (the same editor as VS Code):

- **IntelliSense**: Intelligent code completion
- **Syntax Highlighting**: Support for 50+ languages
- **Error Detection**: Real-time linting and type checking
- **Code Formatting**: Auto-format with Prettier
- **Multi-File Editing**: Work on multiple files simultaneously
- **Git Diff**: Visual diff for version control

### Live Preview

See your changes instantly:

- **Hot Module Reload**: Updates without full page refresh
- **Responsive Views**: Test desktop, tablet, and mobile layouts
- **Console Output**: View browser console in the preview
- **Network Monitor**: Track API calls and requests
- **Error Boundaries**: Graceful error handling

### Template Marketplace

Start faster with pre-built templates:

- **SaaS Landing Page**: Complete with pricing and CTAs
- **E-commerce Store**: Product catalog, cart, and checkout
- **Dashboard App**: Analytics and data visualization
- **Social Network**: Posts, comments, and profiles
- **Blog Platform**: Content management with markdown
- **Portfolio Site**: Project showcase and contact form

## 📚 API Reference

### AI Generation API

```typescript
POST /api/ai/generate
{
  "prompt": "Create a login form with email and password",
  "context": "React + TypeScript project"
}
```

### AI Chat API

```typescript
POST /api/ai/chat
{
  "messages": [
    { "role": "user", "content": "How do I add authentication?" }
  ]
}
```

## 🔒 Security

- **Sandboxed Preview**: Code runs in isolated iframes
- **API Key Encryption**: Sensitive data encrypted at rest
- **Input Validation**: All user inputs sanitized
- **Content Security Policy**: Strict CSP headers
- **Rate Limiting**: Prevent API abuse
- **HTTPS Only**: Secure connections required

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Netlify

1. Connect your GitHub repository
2. Configure build settings: `npm run build`
3. Set environment variables
4. Deploy

### Custom Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Anthropic](https://www.anthropic.com/) - Claude AI API
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Supabase](https://supabase.com/) - Backend infrastructure

## 📞 Support

- 📧 Email: support@codeforge.ai
- 💬 Discord: [Join our community](https://discord.gg/codeforge)
- 🐦 Twitter: [@codeforgeai](https://twitter.com/codeforgeai)
- 📖 Docs: [docs.codeforge.ai](https://docs.codeforge.ai)

## 🗺️ Roadmap

- [ ] **Q1 2025**
  - [ ] Mobile app (iOS/Android)
  - [ ] GitHub integration for direct commits
  - [ ] Team collaboration features

- [ ] **Q2 2025**
  - [ ] Plugin system for extensions
  - [ ] Custom AI model fine-tuning
  - [ ] Advanced debugging tools

- [ ] **Q3 2025**
  - [ ] Multi-language support (Python, Go, etc.)
  - [ ] Cloud IDE integration
  - [ ] Enterprise features

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/codeforge-ai&type=Date)](https://star-history.com/#yourusername/codeforge-ai&Date)

---

**Built with ❤️ using Next.js, TypeScript, and Claude Sonnet 4**

*CodeForge AI - Build Apps with AI, 10x Faster*
