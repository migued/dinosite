import { VideoBlock } from '@/types/blocks';
import { Site } from '@/types/site';

interface VideoProps {
  block: VideoBlock;
  isEditing?: boolean;
  onUpdate?: (data: Partial<VideoBlock['data']>) => void;
  theme?: Site['theme'];
}

// Extract video ID from YouTube or Vimeo URL
const getVideoEmbedUrl = (url: string): string => {
  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return url;
};

export default function Video({ block, isEditing, onUpdate, theme }: VideoProps) {
  const { title, subtitle, videoUrl, thumbnail } = block.data;
  const embedUrl = getVideoEmbedUrl(videoUrl);

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.textContent || '' })}
          >
            {title}
          </h2>
          <p
            className="text-xl text-gray-300"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.({ subtitle: e.currentTarget.textContent || '' })}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {isEditing && (
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>Video URL: {videoUrl}</p>
            <p className="text-xs mt-1">Edit in sidebar properties (coming soon)</p>
          </div>
        )}
      </div>
    </section>
  );
}
