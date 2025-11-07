import { ContactBlock } from '@/types/blocks';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ContactFormProps {
  block: ContactBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<ContactBlock['data']>) => void;
}

export default function ContactForm({ block, isEditing, onUpdate }: ContactFormProps) {
  const { title, subtitle, email, phone, address } = block.data;

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
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

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p
                className="text-gray-600"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => onUpdate?.({ email: e.currentTarget.textContent || '' })}
              >
                {email}
              </p>
            </div>
            {phone && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p
                  className="text-gray-600"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ phone: e.currentTarget.textContent || '' })}
                >
                  {phone}
                </p>
              </div>
            )}
            {address && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p
                  className="text-gray-600"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ address: e.currentTarget.textContent || '' })}
                >
                  {address}
                </p>
              </div>
            )}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                rows={5}
                placeholder="Your message..."
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
