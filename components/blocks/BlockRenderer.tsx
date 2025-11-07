import { Block } from '@/types/blocks';
import Hero from './Hero';
import Features from './Features';
import ContactForm from './ContactForm';
import Testimonials from './Testimonials';
import Footer from './Footer';

interface BlockRendererProps {
  blocks: Block[];
  isEditing?: boolean;
  onUpdateBlock?: (blockId: string, data: any) => void;
}

export default function BlockRenderer({ blocks, isEditing, onUpdateBlock }: BlockRendererProps) {
  const renderBlock = (block: Block) => {
    const handleUpdate = (data: any) => {
      onUpdateBlock?.(block.id, data);
    };

    switch (block.type) {
      case 'hero':
        return <Hero key={block.id} block={block} isEditing={isEditing} onUpdate={handleUpdate} />;
      case 'features':
        return <Features key={block.id} block={block} isEditing={isEditing} onUpdate={handleUpdate} />;
      case 'contact':
        return <ContactForm key={block.id} block={block} isEditing={isEditing} onUpdate={handleUpdate} />;
      case 'testimonials':
        return <Testimonials key={block.id} block={block} isEditing={isEditing} onUpdate={handleUpdate} />;
      case 'footer':
        return <Footer key={block.id} block={block} isEditing={isEditing} onUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {blocks.sort((a, b) => a.order - b.order).map(renderBlock)}
    </div>
  );
}
