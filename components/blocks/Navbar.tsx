import { NavbarBlock } from '@/types/blocks';
import Button from '@/components/ui/Button';

interface NavbarProps {
  block: NavbarBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<NavbarBlock['data']>) => void;
}

export default function Navbar({ block, isEditing, onUpdate }: NavbarProps) {
  const { logo, links, ctaText, ctaLink } = block.data;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-xl font-bold text-gray-900"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ logo: e.currentTarget.textContent || '' })}
          >
            {logo}
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const newLinks = [...links];
                  newLinks[index] = { ...link, label: e.currentTarget.textContent || '' };
                  onUpdate?.({ links: newLinks });
                }}
              >
                {link.label}
              </a>
            ))}

            {ctaText && ctaLink && (
              <Button
                size="sm"
                onClick={() => !isEditing && window.open(ctaLink, '_self')}
              >
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => onUpdate?.({ ctaText: e.currentTarget.textContent || '' })}
                >
                  {ctaText}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
