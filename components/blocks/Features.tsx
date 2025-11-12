import { FeaturesBlock } from '@/types/blocks';
import { Site } from '@/types/site';

interface FeaturesProps {
  block: FeaturesBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<FeaturesBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Features({ block, isEditing, onUpdate, theme }: FeaturesProps) {
  const { title, subtitle, features } = block.data;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3
                className="text-xl font-semibold text-gray-900 mb-2"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, title: e.currentTarget.textContent || '' };
                  onUpdate?.({ features: newFeatures });
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-600"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, description: e.currentTarget.textContent || '' };
                  onUpdate?.({ features: newFeatures });
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
