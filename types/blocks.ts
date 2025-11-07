export type BlockType = 'hero' | 'features' | 'contact' | 'testimonials' | 'footer';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesBlock extends BaseBlock {
  type: 'features';
  data: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
}

export interface ContactBlock extends BaseBlock {
  type: 'contact';
  data: {
    title: string;
    subtitle: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface TestimonialsBlock extends BaseBlock {
  type: 'testimonials';
  data: {
    title: string;
    testimonials: Testimonial[];
  };
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterBlock extends BaseBlock {
  type: 'footer';
  data: {
    companyName: string;
    tagline: string;
    socialLinks: SocialLink[];
    copyright: string;
  };
}

export type Block = HeroBlock | FeaturesBlock | ContactBlock | TestimonialsBlock | FooterBlock;
