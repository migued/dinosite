import { Block } from '@/types/blocks';
import { Site } from '@/types/site';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Hero from './Hero';
import Features from './Features';
import ContactForm from './ContactForm';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navbar from './Navbar';
import Stats from './Stats';
import CTA from './CTA';
import Pricing from './Pricing';
import Gallery from './Gallery';
import Team from './Team';
import FAQ from './FAQ';
import Video from './Video';
import Newsletter from './Newsletter';
import LogoGrid from './LogoGrid';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import BlogCategories from './BlogCategories';
import { FaGripVertical } from 'react-icons/fa';

interface BlockRendererProps {
  blocks: Block[];
  isEditing?: boolean;
  onUpdateBlock?: (blockId: string, data: any) => void;
  isDraggable?: boolean;
  theme: Site['theme'];
}

interface SortableBlockProps {
  block: Block;
  isEditing?: boolean;
  isDraggable?: boolean;
  onUpdate: (data: any) => void;
  theme: Site['theme'];
}

function SortableBlock({ block, isEditing, isDraggable, onUpdate, theme }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'navbar':
        return <Navbar block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'hero':
        return <Hero block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'features':
        return <Features block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'stats':
        return <Stats block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'cta':
        return <CTA block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'pricing':
        return <Pricing block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'gallery':
        return <Gallery block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'team':
        return <Team block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'faq':
        return <FAQ block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'video':
        return <Video block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'newsletter':
        return <Newsletter block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'logoGrid':
        return <LogoGrid block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'testimonials':
        return <Testimonials block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'contact':
        return <ContactForm block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'footer':
        return <Footer block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'blogList':
        return <BlogList block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'blogPost':
        return <BlogPost block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      case 'blogCategories':
        return <BlogCategories block={block} isEditing={isEditing} onUpdate={onUpdate} theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDraggable ? 'hover:outline hover:outline-2 hover:outline-blue-400' : ''}`}
    >
      {isDraggable && (
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 z-10 bg-white rounded shadow-lg p-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
          title="Drag to reorder"
        >
          <FaGripVertical className="text-gray-600" />
        </div>
      )}
      {renderBlockContent()}
    </div>
  );
}

export default function BlockRenderer({
  blocks,
  isEditing,
  onUpdateBlock,
  isDraggable,
  theme,
}: BlockRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="w-full">
      {sortedBlocks.map((block) => (
        <SortableBlock
          key={block.id}
          block={block}
          isEditing={isEditing}
          isDraggable={isDraggable}
          onUpdate={(data) => onUpdateBlock?.(block.id, data)}
          theme={theme}
        />
      ))}
    </div>
  );
}
