import { NewsletterBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import { useState } from 'react';

interface NewsletterProps {
  block: NewsletterBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<NewsletterBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Newsletter({ block, isEditing, onUpdate, theme }: NewsletterProps) {
  const { title, subtitle, placeholder, buttonText } = block.data;
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      alert(`Subscribed: ${email} (Integration coming soon!)`);
      setEmail('');
    }
  };

  return (
    <section
      className="py-20 px-4"
      style={{
        background: `linear-gradient(to right, ${theme?.secondaryColor || '#9333EA'}, ${theme?.primaryColor || '#3B82F6'})`
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
        >
          {title}
        </h2>
        <p
          className="text-xl mb-8"
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
        >
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              disabled={isEditing}
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isEditing}
              className="px-8 py-4 bg-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ color: theme?.primaryColor || '#3B82F6' }}
            >
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onClick={(e) => isEditing && e.preventDefault()}
                onBlur={(e) => onUpdate?.({ buttonText: e.currentTarget.textContent || '' })}
              >
                {buttonText}
              </span>
            </button>
          </div>
          <p className="text-sm mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}
