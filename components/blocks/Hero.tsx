import { HeroBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import Button from '@/components/ui/Button';

interface HeroProps {
  block: HeroBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<HeroBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Hero({ block, isEditing, onUpdate, theme }: HeroProps) {
  const { title, subtitle, ctaText, ctaLink, backgroundImage } = block.data;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : '#f3f4f6',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 ${
            backgroundImage ? 'text-white' : 'text-gray-900'
          }`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
        >
          {title}
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 ${
            backgroundImage ? 'text-gray-200' : 'text-gray-600'
          }`}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
        >
          {subtitle}
        </p>

        <Button
          size="lg"
          onClick={() => !isEditing && ctaLink && window.open(ctaLink, '_blank')}
        >
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ ctaText: e.currentTarget.textContent || '' })}
          >
            {ctaText}
          </span>
        </Button>
      </div>
    </section>
  );
}
