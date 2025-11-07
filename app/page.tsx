import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Build Beautiful Websites with{' '}
            <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning one-page websites in seconds. Just describe your
            vision and let AI do the heavy lifting. Edit, customize, and
            export—all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-gray-600">
                Describe your website and let Claude AI create a complete,
                professional site in seconds.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Visual Editor
              </h3>
              <p className="text-gray-600">
                Click to edit text, drag to reorganize sections. No code
                required.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Export & Deploy
              </h3>
              <p className="text-gray-600">
                Download as HTML or publish to your custom domain instantly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Beautiful Templates
              </h3>
              <p className="text-gray-600">
                Start with professionally designed blocks optimized for your
                industry.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                From idea to live website in under 5 minutes. Perfect for rapid
                prototyping.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Affordable Pricing
              </h3>
              <p className="text-gray-600">
                Start free, upgrade as you grow. No hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Website?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of creators, entrepreneurs, and agencies building
            with AI.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 DinoSite. Built with ❤️ and AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
