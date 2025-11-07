export type BlockType = 'hero' | 'features' | 'contact' | 'testimonials' | 'footer' | 'navbar' | 'stats' | 'cta' | 'pricing' | 'gallery';

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

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarBlock extends BaseBlock {
  type: 'navbar';
  data: {
    logo: string;
    links: NavLink[];
    ctaText?: string;
    ctaLink?: string;
  };
}

export interface Stat {
  value: string;
  label: string;
  icon?: string;
}

export interface StatsBlock extends BaseBlock {
  type: 'stats';
  data: {
    title: string;
    subtitle: string;
    stats: Stat[];
  };
}

export interface CTABlock extends BaseBlock {
  type: 'cta';
  data: {
    title: string;
    subtitle: string;
    primaryCTA: string;
    primaryLink: string;
    secondaryCTA?: string;
    secondaryLink?: string;
  };
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export interface PricingBlock extends BaseBlock {
  type: 'pricing';
  data: {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
  };
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  data: {
    title: string;
    subtitle: string;
    images: GalleryImage[];
  };
}

export type Block =
  | HeroBlock
  | FeaturesBlock
  | ContactBlock
  | TestimonialsBlock
  | FooterBlock
  | NavbarBlock
  | StatsBlock
  | CTABlock
  | PricingBlock
  | GalleryBlock;
