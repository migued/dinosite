import { GalleryBlock } from '@/types/blocks';
import { Site } from '@/types/site';

interface GalleryProps {
  block: GalleryBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<GalleryBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Gallery({ block, isEditing, onUpdate, theme }: GalleryProps) {
  const { title, subtitle, images } = block.data;

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.url || 'https://via.placeholder.com/400x300'}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p
                    className="text-white text-sm"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newImages = [...images];
                      newImages[index] = { ...image, caption: e.currentTarget.textContent || '' };
                      onUpdate?.({ images: newImages });
                    }}
                  >
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
