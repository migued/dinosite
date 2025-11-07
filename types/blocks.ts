export type BlockType = 'hero' | 'features' | 'contact' | 'testimonials' | 'footer' | 'navbar' | 'stats' | 'cta' | 'pricing' | 'gallery' | 'team' | 'faq' | 'video' | 'newsletter' | 'logoGrid' | 'blogList' | 'blogPost' | 'blogCategories';

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

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamBlock extends BaseBlock {
  type: 'team';
  data: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock extends BaseBlock {
  type: 'faq';
  data: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  data: {
    title: string;
    subtitle: string;
    videoUrl: string; // YouTube or Vimeo URL
    thumbnail?: string;
  };
}

export interface NewsletterBlock extends BaseBlock {
  type: 'newsletter';
  data: {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
  };
}

export interface Logo {
  name: string;
  image: string;
  url?: string;
}

export interface LogoGridBlock extends BaseBlock {
  type: 'logoGrid';
  data: {
    title: string;
    subtitle: string;
    logos: Logo[];
  };
}

export interface BlogListBlock extends BaseBlock {
  type: 'blogList';
  data: {
    title: string;
    subtitle: string;
    postsToShow: number;
    layout: 'grid' | 'list';
  };
}

export interface BlogPostBlock extends BaseBlock {
  type: 'blogPost';
  data: {
    postId?: string; // References a BlogPost in the site
  };
}

export interface BlogCategoriesBlock extends BaseBlock {
  type: 'blogCategories';
  data: {
    title: string;
    displayStyle: 'grid' | 'pills' | 'sidebar';
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
  | GalleryBlock
  | TeamBlock
  | FAQBlock
  | VideoBlock
  | NewsletterBlock
  | LogoGridBlock
  | BlogListBlock
  | BlogPostBlock
  | BlogCategoriesBlock;
