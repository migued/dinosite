import { FooterBlock } from '@/types/blocks';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

interface FooterProps {
  block: FooterBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<FooterBlock['data']>) => void;
}

const socialIcons: Record<string, any> = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export default function Footer({ block, isEditing, onUpdate }: FooterProps) {
  const { companyName, tagline, socialLinks, copyright } = block.data;

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
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <Icon />
              </a>
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
