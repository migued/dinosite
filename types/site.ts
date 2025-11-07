import { Block } from './blocks';

export type Viewport = 'desktop' | 'tablet' | 'mobile';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  blocks: Block[];
  seo: SEOMetadata;
  isHome: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  publishedAt?: string;
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  subdomain: string;

  // Multi-page support
  pages: Page[];
  currentPageId?: string; // For editor

  // Blog support
  blog?: {
    enabled: boolean;
    posts: BlogPost[];
    categories: string[];
  };

  // Legacy single-page support (backward compatible)
  blocks?: Block[];

  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };

  // Global SEO
  seo: SEOMetadata;

  created_at: string;
  updated_at: string;
  published: boolean;
  published_url?: string;
}

export interface CreateSiteInput {
  name: string;
  description: string;
  industry: string;
}

export interface User {
  id: string;
  email: string;
  subscription_status: 'free' | 'pro' | 'business';
  subscription_id?: string;
  created_at: string;
}
