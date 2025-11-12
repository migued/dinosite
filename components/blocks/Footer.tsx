import { FooterBlock } from '@/types/blocks';
import { Site } from '@/types/site';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

interface FooterProps {
  block: FooterBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<FooterBlock['data']>) => void;
  theme?: Site['theme'];
}

const socialIcons: Record<string, any> = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export default function Footer({ block, isEditing, onUpdate, theme }: FooterProps) {
  const { companyName, tagline, socialLinks, copyright } = block.data;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempUrl, setTempUrl] = useState('');

  const handleEditUrl = (index: number) => {
    setEditingIndex(index);
    setTempUrl(socialLinks[index].url);
  };

  const handleSaveUrl = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks[index] = { ...newLinks[index], url: tempUrl };
    onUpdate?.({ socialLinks: newLinks });
    setEditingIndex(null);
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3
            className="text-2xl font-bold mb-2"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ companyName: e.currentTarget.textContent || '' })}
          >
            {companyName}
          </h3>
          <p
            className="text-gray-400"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ tagline: e.currentTarget.textContent || '' })}
          >
            {tagline}
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link, index) => {
            const Icon = socialIcons[link.platform.toLowerCase()];
            return Icon ? (
              <div key={index} className="relative group">
                {editingIndex === index ? (
                  <div className="flex flex-col items-center bg-gray-800 p-3 rounded-lg">
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://..."
                      className="px-3 py-2 bg-gray-700 text-white rounded mb-2 text-sm w-64"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveUrl(index)}
                        className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-2xl block"
                      onClick={(e) => isEditing && e.preventDefault()}
                    >
                      <Icon />
                    </a>
                    {isEditing && (
                      <button
                        onClick={() => handleEditUrl(index)}
                        className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        title="Edit URL"
                      >
                        <FaEdit size={10} />
                      </button>
                    )}
                  </>
                )}
              </div>
            ) : null;
          })}
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ copyright: e.currentTarget.textContent || '' })}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
