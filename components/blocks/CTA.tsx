import { CTABlock } from '@/types/blocks';
import Button from '@/components/ui/Button';

interface CTAProps {
  block: CTABlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<CTABlock['data']>) => void;
}

export default function CTA({ block, isEditing, onUpdate }: CTAProps) {
  const { title, subtitle, primaryCTA, primaryLink, secondaryCTA, secondaryLink } = block.data;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
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
          className="text-2xl mb-10 text-blue-100"
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
              className="!text-white !border-white hover:!bg-white hover:!text-blue-600"
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
