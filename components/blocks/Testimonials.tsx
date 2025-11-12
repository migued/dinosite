import { TestimonialsBlock } from '@/types/blocks';
import { Site } from '@/types/site';

interface TestimonialsProps {
  block: TestimonialsBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<TestimonialsBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Testimonials({ block, isEditing, onUpdate, theme }: TestimonialsProps) {
  const { title, testimonials } = block.data;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-gray-900 text-center mb-16"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <p
                className="text-gray-700 mb-4 italic"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, content: e.currentTarget.textContent || '' };
                  onUpdate?.({ testimonials: newTestimonials });
                }}
              >
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div>
                  <p
                    className="font-semibold text-gray-900"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index] = { ...testimonial, name: e.currentTarget.textContent || '' };
                      onUpdate?.({ testimonials: newTestimonials });
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newTestimonials = [...testimonials];
                      newTestimonials[index] = { ...testimonial, role: e.currentTarget.textContent || '' };
                      onUpdate?.({ testimonials: newTestimonials });
                    }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
