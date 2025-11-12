import { NavbarBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import Button from '@/components/ui/Button';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';

interface NavbarProps {
  block: NavbarBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<NavbarBlock['data']>) => void;
  theme?: Site['theme'];
}

export default function Navbar({ block, isEditing, onUpdate, theme }: NavbarProps) {
  const { logo, links, ctaText, ctaLink } = block.data;
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
  const [tempHref, setTempHref] = useState('');
  const [editingCTA, setEditingCTA] = useState(false);
  const [tempCTALink, setTempCTALink] = useState('');

  const handleEditLink = (index: number) => {
    setEditingLinkIndex(index);
    setTempHref(links[index].href);
  };

  const handleSaveLink = (index: number) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], href: tempHref };
    onUpdate?.({ links: newLinks });
    setEditingLinkIndex(null);
  };

  const handleEditCTA = () => {
    setEditingCTA(true);
    setTempCTALink(ctaLink || '');
  };

  const handleSaveCTA = () => {
    onUpdate?.({ ctaLink: tempCTALink });
    setEditingCTA(false);
  };

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
              <div key={index} className="relative group">
                {editingLinkIndex === index ? (
                  <div className="absolute top-8 left-0 bg-white border border-gray-300 p-3 rounded-lg shadow-xl z-50 w-64">
                    <input
                      type="url"
                      value={tempHref}
                      onChange={(e) => setTempHref(e.target.value)}
                      placeholder="#section or /page"
                      className="px-3 py-2 border border-gray-300 rounded mb-2 text-sm w-full"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveLink(index)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingLinkIndex(null)}
                        className="px-3 py-1 bg-gray-300 rounded text-sm hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <a
                      href={link.href}
                      className="transition-colors"
                      style={{ color: theme?.textColor || '#374151' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = theme?.primaryColor || '#3B82F6'}
                      onMouseLeave={(e) => e.currentTarget.style.color = theme?.textColor || '#374151'}
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onClick={(e) => isEditing && e.preventDefault()}
                      onBlur={(e) => {
                        const newLinks = [...links];
                        newLinks[index] = { ...link, label: e.currentTarget.textContent || '' };
                        onUpdate?.({ links: newLinks });
                      }}
                    >
                      {link.label}
                    </a>
                    {isEditing && (
                      <button
                        onClick={() => handleEditLink(index)}
                        className="absolute -top-2 -right-5 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        title="Edit URL"
                      >
                        <FaEdit size={10} />
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}

            {ctaText && (
              <div className="relative group">
                {editingCTA ? (
                  <div className="absolute top-12 right-0 bg-white border border-gray-300 p-3 rounded-lg shadow-xl z-50 w-64">
                    <input
                      type="url"
                      value={tempCTALink}
                      onChange={(e) => setTempCTALink(e.target.value)}
                      placeholder="https://..."
                      className="px-3 py-2 border border-gray-300 rounded mb-2 text-sm w-full"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveCTA}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCTA(false)}
                        className="px-3 py-1 bg-gray-300 rounded text-sm hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => !isEditing && ctaLink && window.open(ctaLink, '_self')}
                    >
                      <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdate?.({ ctaText: e.currentTarget.textContent || '' })}
                      >
                        {ctaText}
                      </span>
                    </Button>
                    {isEditing && (
                      <button
                        onClick={handleEditCTA}
                        className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        title="Edit CTA URL"
                      >
                        <FaEdit size={10} />
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
