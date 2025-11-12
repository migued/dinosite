import { NavbarBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import Button from '@/components/ui/Button';

interface NavbarProps {
  block: NavbarBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<NavbarBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Navbar({ block, isEditing, onUpdate, theme }: NavbarProps) {
  const { logo, links, ctaText, ctaLink } = block.data;

  return (
    <nav
      className="shadow-sm sticky top-0 z-50"
      style={{ backgroundColor: theme?.backgroundColor || '#FFFFFF' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-xl font-bold"
            style={{ color: theme?.textColor || '#1F2937' }}
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
                className="transition-colors"
                style={{ color: theme?.textColor || '#374151' }}
                onMouseEnter={(e) => e.currentTarget.style.color = theme?.primaryColor || '#3B82F6'}
                onMouseLeave={(e) => e.currentTarget.style.color = theme?.textColor || '#374151'}
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
