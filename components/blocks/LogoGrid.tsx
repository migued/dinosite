import { LogoGridBlock } from '@/types/blocks';
import { Site } from '@/types/site';

interface LogoGridProps {
  block: LogoGridBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<LogoGridBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function LogoGrid({ block, isEditing, onUpdate, theme }: LogoGridProps) {
  const { title, subtitle, logos } = block.data;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold text-gray-900 mb-4"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
          >
            {title}
          </h2>
          <p
            className="text-xl text-gray-600"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <a
              key={index}
              href={logo.url || '#'}
              target={logo.url ? '_blank' : undefined}
              rel={logo.url ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-w-full max-h-16 object-contain"
                />
              ) : (
                <div
                  className="text-center text-gray-400 text-sm font-medium"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newLogos = [...logos];
                    newLogos[index] = { ...logo, name: e.currentTarget.textContent || '' };
                    onUpdate?.({ logos: newLogos });
                  }}
                >
                  {logo.name}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
