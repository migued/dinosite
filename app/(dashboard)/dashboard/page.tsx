'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function DashboardPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [sites, setSites] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
  });
  const [aiConfig, setAiConfig] = useState({
    provider: 'openrouter',
    model: 'qwen/qwen-2.5-coder-32b-instruct',
  });

  // Load AI preferences from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('ai_config');
      if (savedConfig) {
        setAiConfig(JSON.parse(savedConfig));
      }
    }
  }, []);

  // Load sites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadedSites = Object.keys(localStorage)
        .filter((key) => key.startsWith('site_'))
        .map((key) => JSON.parse(localStorage.getItem(key) || '{}'));
      setSites(loadedSites);
    }
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Save AI config preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('ai_config', JSON.stringify(aiConfig));
      }

      // Call AI generation API with model selection
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          aiConfig,
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const generatedData = await response.json();

      // Store in localStorage for now (will use Supabase later)
      const siteId = crypto.randomUUID();
      const site = {
        id: siteId,
        user_id: 'demo-user',
        name: formData.name,
        subdomain: formData.name.toLowerCase().replace(/\s+/g, '-'),
        pages: generatedData.pages,
        currentPageId: generatedData.pages[0].id,
        seo: generatedData.seo,
        theme: generatedData.theme,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published: false,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(`site_${siteId}`, JSON.stringify(site));
        localStorage.setItem('lastSiteId', siteId);
      }

      // Redirect to editor
      router.push(`/sites/${siteId}/editor`);
    } catch (error) {
      console.error('Error creating site:', error);
      alert('Failed to create site. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">DinoSite</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Demo User</span>
            <Link href="/">
              <Button variant="outline" size="sm">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Create New Site Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Website
          </h2>
          <p className="text-gray-600 mb-6">
            Tell us about your website and AI will generate it for you.
          </p>

          <form onSubmit={handleCreate} className="space-y-4 max-w-2xl">
            <Input
              label="Website Name"
              placeholder="My Awesome Business"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="A modern coffee shop with artisanal drinks and cozy atmosphere..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <Input
              label="Industry"
              placeholder="Coffee Shop, Tech Startup, Photography, etc."
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              required
            />

            {/* AI Model Selector */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🤖 AI Provider & Model
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    value={aiConfig.provider}
                    onChange={(e) => {
                      const newProvider = e.target.value;
                      let newModel = aiConfig.model;

                      // Set default model for provider
                      if (newProvider === 'openrouter') {
                        newModel = 'qwen/qwen-2.5-coder-32b-instruct';
                      } else if (newProvider === 'anthropic') {
                        newModel = 'claude-sonnet-4-5-20250929';
                      } else if (newProvider === 'openai') {
                        newModel = 'gpt-4-turbo-preview';
                      }

                      setAiConfig({ provider: newProvider, model: newModel });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="openrouter">OpenRouter</option>
                    <option value="anthropic">Anthropic (Direct)</option>
                    <option value="openai">OpenAI (Direct)</option>
                    <option value="custom">Custom API</option>
                  </select>
                </div>
                <div>
                  {aiConfig.provider === 'openrouter' && (
                    <select
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <optgroup label="Free Models">
                        <option value="qwen/qwen-2.5-coder-32b-instruct">Qwen 2.5 Coder (Free)</option>
                        <option value="meta-llama/llama-3.2-3b-instruct:free">Llama 3.2 3B (Free)</option>
                        <option value="google/gemma-2-9b-it:free">Gemma 2 9B (Free)</option>
                        <option value="microsoft/phi-3-mini-128k-instruct:free">Phi-3 Mini (Free)</option>
                      </optgroup>
                      <optgroup label="Premium Models">
                        <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                        <option value="openai/gpt-4-turbo">GPT-4 Turbo</option>
                        <option value="x-ai/grok-beta">Grok Beta</option>
                        <option value="google/gemini-pro-1.5">Gemini Pro 1.5</option>
                      </optgroup>
                    </select>
                  )}
                  {aiConfig.provider === 'anthropic' && (
                    <input
                      type="text"
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      placeholder="claude-sonnet-4-5-20250929"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  )}
                  {aiConfig.provider === 'openai' && (
                    <input
                      type="text"
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      placeholder="gpt-4-turbo-preview"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  )}
                  {aiConfig.provider === 'custom' && (
                    <input
                      type="text"
                      value={aiConfig.model}
                      onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                      placeholder="your-model-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {aiConfig.provider === 'openrouter' && aiConfig.model.includes(':free') ? (
                  <span className="text-green-600">✓ This model is FREE on OpenRouter</span>
                ) : (
                  <span>Selected: {aiConfig.provider} / {aiConfig.model}</span>
                )}
              </p>
            </div>

            <Button type="submit" disabled={isCreating} size="lg">
              {isCreating ? '🤖 Generating with AI...' : '✨ Generate Website'}
            </Button>
          </form>
        </div>

        {/* Your Sites */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Sites</h2>

          {sites.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">
                No sites yet. Create your first one above! 👆
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {site.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {site.subdomain}.dinosite.com
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/sites/${site.id}/editor`}>
                      <Button size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm('Are you sure you want to delete this site?')
                        ) {
                          if (typeof window !== 'undefined') {
                            localStorage.removeItem(`site_${site.id}`);
                            window.location.reload();
                          }
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
