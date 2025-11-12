import { CTABlock } from '@/types/blocks';
import { Site } from '@/types/site';
import Button from '@/components/ui/Button';

interface CTAProps {
  block: CTABlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<CTABlock['data']>) => void;
  theme?: Site['theme'];
}

export default function CTA({ block, isEditing, onUpdate, theme }: CTAProps) {
  const { title, subtitle, primaryCTA, primaryLink, secondaryCTA, secondaryLink } = block.data;

  return (
    <section
      className="py-20 px-4 text-white"
      style={{
        background: `linear-gradient(to bottom right, ${theme?.primaryColor || '#3B82F6'}, ${theme?.secondaryColor || '#9333EA'})`
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-5xl font-bold mb-6"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
        >
          {title}
        </h2>
        <p
          className="text-2xl mb-10"
          style={{ opacity: 0.9 }}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
        >
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => !isEditing && window.open(primaryLink, '_self')}
          >
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={(e) => onUpdate?.({ primaryCTA: e.currentTarget.textContent || '' })}
            >
              {primaryCTA}
            </span>
          </Button>
          {secondaryCTA && secondaryLink && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => !isEditing && window.open(secondaryLink, '_self')}
              className="!text-white !border-white hover:!bg-white"
              style={{ '--hover-text-color': theme?.primaryColor || '#3B82F6' } as React.CSSProperties}
            >
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ secondaryCTA: e.currentTarget.textContent || '' })}
              >
                {secondaryCTA}
              </span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
