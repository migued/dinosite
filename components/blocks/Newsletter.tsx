import { NewsletterBlock } from '@/types/blocks';
import { useState } from 'react';

interface NewsletterProps {
  block: NewsletterBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<NewsletterBlock['data']>) => void;
}

export default function Newsletter({ block, isEditing, onUpdate }: NewsletterProps) {
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
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
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
          className="text-xl text-blue-100 mb-8"
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
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
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
          <p className="text-blue-100 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}
