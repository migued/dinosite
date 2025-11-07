import { PricingBlock } from '@/types/blocks';
import Button from '@/components/ui/Button';
import { FaCheck } from 'react-icons/fa';

interface PricingProps {
  block: PricingBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<PricingBlock['data']>) => void;
}

export default function Pricing({ block, isEditing, onUpdate }: PricingProps) {
  const { title, subtitle, tiers } = block.data;

  return (
    <section className="py-20 px-4 bg-gray-50">
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

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 ${
                tier.highlighted
                  ? 'ring-2 ring-blue-600 shadow-2xl transform scale-105'
                  : 'shadow-lg'
              }`}
            >
              {tier.highlighted && (
                <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3
                className="text-2xl font-bold text-gray-900 mt-4 mb-2"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newTiers = [...tiers];
                  newTiers[index] = { ...tier, name: e.currentTarget.textContent || '' };
                  onUpdate?.({ tiers: newTiers });
                }}
              >
                {tier.name}
              </h3>
              <div className="flex items-baseline mb-6">
                <span
                  className="text-5xl font-bold text-gray-900"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newTiers = [...tiers];
                    newTiers[index] = { ...tier, price: e.currentTarget.textContent || '' };
                    onUpdate?.({ tiers: newTiers });
                  }}
                >
                  {tier.price}
                </span>
                <span
                  className="text-gray-600 ml-2"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newTiers = [...tiers];
                    newTiers[index] = { ...tier, period: e.currentTarget.textContent || '' };
                    onUpdate?.({ tiers: newTiers });
                  }}
                >
                  /{tier.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span
                      className="text-gray-700"
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newTiers = [...tiers];
                        const newFeatures = [...tier.features];
                        newFeatures[fIndex] = e.currentTarget.textContent || '';
                        newTiers[index] = { ...tier, features: newFeatures };
                        onUpdate?.({ tiers: newTiers });
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
