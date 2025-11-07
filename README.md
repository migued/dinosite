# 🦕 DinoSite - AI Website Builder

Build beautiful one-page websites in seconds with AI. Just describe your vision, and let Claude AI create a professional website that you can edit and export instantly.

## ✨ Features

### MVP (Current Version)
- 🤖 **AI-Powered Generation**: Describe your website and Claude AI creates it in seconds
- ✏️ **Visual Editor**: Click to edit text inline, no code required
- 🎨 **5 Essential Blocks**:
  - Hero Section (with CTA)
  - Features Grid
  - Testimonials
  - Contact Form
  - Footer (with social links)
- 📦 **HTML Export**: Download your site as a standalone HTML file
- 💾 **Local Storage**: Sites saved in browser (Supabase integration coming soon)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Anthropic API key (for AI generation)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dinosite
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
# Required for AI generation
ANTHROPIC_API_KEY=your-anthropic-api-key

# Coming soon (not required for MVP)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

1. **Landing Page**: Visit the homepage to see the product overview
2. **Dashboard**: Click "Get Started Free" to go to your dashboard
3. **Create a Site**:
   - Enter your website name (e.g., "My Coffee Shop")
   - Describe your business (e.g., "A modern coffee shop with artisanal drinks")
   - Choose your industry (e.g., "Coffee Shop", "Tech Startup", "Photography")
   - Click "Generate Website" and wait ~10-15 seconds
4. **Edit Your Site**:
   - Click "Edit" to enable editing mode
   - Click on any text to edit it inline
   - Click "Preview" to see how it looks
   - Click "Save" to save changes (currently to localStorage)
   - Click "Export HTML" to download your site
5. **Export**: Download as HTML and host anywhere!

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude 3.5 Sonnet
- **State Management**: Zustand
- **Icons**: React Icons
- **Future**: Supabase (Auth + DB), Stripe (Payments)

## 📁 Project Structure

```
dinosite/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx      # User dashboard
│   │   └── sites/[id]/editor/      # Site editor
│   └── api/
│       ├── ai/generate/            # AI generation endpoint
│       └── sites/export/           # HTML export endpoint
├── components/
│   ├── blocks/                     # Block components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Footer.tsx
│   │   └── BlockRenderer.tsx
│   ├── editor/                     # Editor components
│   │   ├── Editor.tsx
│   │   ├── EditorToolbar.tsx
│   │   └── EditorSidebar.tsx
│   └── ui/                         # UI components
│       ├── Button.tsx
│       └── Input.tsx
├── lib/
│   ├── ai/                         # AI utilities
│   │   ├── client.ts
│   │   └── prompts.ts
│   ├── export/                     # Export utilities
│   │   └── htmlExporter.ts
│   ├── store/                      # State management
│   │   └── editorStore.ts
│   └── supabase/                   # Supabase config (future)
└── types/
    ├── blocks.ts                   # Block type definitions
    └── site.ts                     # Site type definitions
```

## 🎯 Roadmap

### Phase 1: MVP ✅ (Current)
- [x] AI generation
- [x] 5 essential blocks
- [x] Basic visual editor
- [x] HTML export
- [x] Dashboard
- [ ] Supabase integration (in progress)
- [ ] Stripe payments (in progress)

### Phase 2: Enhanced Editor (Next)
- [ ] Drag & drop reordering
- [ ] Color palette customization
- [ ] Responsive preview (mobile/tablet/desktop)
- [ ] More blocks (navbar, gallery, pricing, etc.)
- [ ] Template library

### Phase 3: Multi-page & Advanced Features
- [ ] Multiple pages
- [ ] Blog functionality
- [ ] Advanced forms with integrations
- [ ] SEO optimization

### Phase 4: Business Features
- [ ] E-commerce basics
- [ ] Analytics dashboard
- [ ] Custom domains
- [ ] Team collaboration

### Phase 5: AI Excellence
- [ ] AI content generation for blocks
- [ ] AI image suggestions
- [ ] AI-powered SEO
- [ ] Chat-based editing

## 🤝 Contributing

This is currently a personal project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- UI inspiration from modern website builders

---

**Made with ❤️ and AI**
