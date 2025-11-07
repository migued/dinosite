import { StatsBlock } from '@/types/blocks';

interface StatsProps {
  block: StatsBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<StatsBlock['data']>) => void;
}

export default function Stats({ block, isEditing, onUpdate }: StatsProps) {
  const { title, subtitle, stats } = block.data;

  return (
    <section className="py-20 px-4 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-bold mb-4"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
          >
            {title}
          </h2>
          <p
            className="text-xl text-blue-100"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && (
                <div className="text-4xl mb-2">{stat.icon}</div>
              )}
              <div
                className="text-5xl font-bold mb-2"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, value: e.currentTarget.textContent || '' };
                  onUpdate?.({ stats: newStats });
                }}
              >
                {stat.value}
              </div>
              <p
                className="text-blue-100"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, label: e.currentTarget.textContent || '' };
                  onUpdate?.({ stats: newStats });
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
