import { TeamBlock } from '@/types/blocks';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface TeamProps {
  block: TeamBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<TeamBlock['data']>) => void;
}

export default function Team({ block, isEditing, onUpdate }: TeamProps) {
  const { title, subtitle, members } = block.data;

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
          {members.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {member.image && (
                <img
                  src={member.image || 'https://via.placeholder.com/400x400'}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-gray-900 mb-1"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newMembers = [...members];
                    newMembers[index] = { ...member, name: e.currentTarget.textContent || '' };
                    onUpdate?.({ members: newMembers });
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-blue-600 font-medium mb-3"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newMembers = [...members];
                    newMembers[index] = { ...member, role: e.currentTarget.textContent || '' };
                    onUpdate?.({ members: newMembers });
                  }}
                >
                  {member.role}
                </p>
                <p
                  className="text-gray-600 text-sm mb-4"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const newMembers = [...members];
                    newMembers[index] = { ...member, bio: e.currentTarget.textContent || '' };
                    onUpdate?.({ members: newMembers });
                  }}
                >
                  {member.bio}
                </p>
                {member.social && (
                  <div className="flex space-x-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <FaEnvelope size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
