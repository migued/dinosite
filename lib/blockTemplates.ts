import { BlockType } from '@/types/blocks';

// Template data for creating new blocks
export const blockTemplates: Record<BlockType, any> = {
  navbar: {
    logo: 'Brand',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaText: 'Get Started',
    ctaLink: '#contact',
  },

  hero: {
    title: 'Welcome to Your Website',
    subtitle: 'Create something amazing with our platform',
    ctaText: 'Get Started',
    ctaLink: '#contact',
  },

  features: {
    title: 'Amazing Features',
    subtitle: 'Everything you need to succeed',
    features: [
      { icon: '⚡', title: 'Fast', description: 'Lightning-fast performance' },
      { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
      { icon: '📱', title: 'Responsive', description: 'Works on all devices' },
    ],
  },

  stats: {
    title: 'Our Impact',
    subtitle: 'Numbers that matter',
    stats: [
      { value: '10K+', label: 'Happy Customers', icon: '👥' },
      { value: '99%', label: 'Satisfaction Rate', icon: '⭐' },
      { value: '24/7', label: 'Support', icon: '🎧' },
      { value: '50+', label: 'Countries', icon: '🌍' },
    ],
  },

  cta: {
    title: 'Ready to Get Started?',
    subtitle: 'Join thousands of satisfied customers today',
    primaryCTA: 'Start Free Trial',
    primaryLink: '#signup',
    secondaryCTA: 'Learn More',
    secondaryLink: '#learn',
  },

  pricing: {
    title: 'Simple, Transparent Pricing',
    subtitle: 'Choose the plan that works for you',
    tiers: [
      {
        name: 'Starter',
        price: '$9',
        period: 'month',
        features: ['5 Projects', '10GB Storage', 'Email Support'],
        highlighted: false,
      },
      {
        name: 'Pro',
        price: '$29',
        period: 'month',
        features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
        highlighted: true,
      },
      {
        name: 'Enterprise',
        price: '$99',
        period: 'month',
        features: ['Custom Solutions', 'Unlimited Storage', '24/7 Phone Support', 'Dedicated Manager'],
        highlighted: false,
      },
    ],
  },

  gallery: {
    title: 'Our Gallery',
    subtitle: 'Check out our latest work',
    images: [
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 1', caption: 'Project 1' },
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 2', caption: 'Project 2' },
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 3', caption: 'Project 3' },
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 4', caption: 'Project 4' },
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 5', caption: 'Project 5' },
      { url: 'https://via.placeholder.com/400x300', alt: 'Image 6', caption: 'Project 6' },
    ],
  },

  team: {
    title: 'Meet Our Team',
    subtitle: 'The people behind the magic',
    members: [
      {
        name: 'John Doe',
        role: 'CEO & Founder',
        bio: 'Passionate about building great products',
        image: 'https://via.placeholder.com/400x400',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          email: 'john@example.com',
        },
      },
      {
        name: 'Jane Smith',
        role: 'Head of Design',
        bio: 'Creating beautiful user experiences',
        image: 'https://via.placeholder.com/400x400',
        social: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      },
      {
        name: 'Mike Johnson',
        role: 'Lead Developer',
        bio: 'Building scalable solutions',
        image: 'https://via.placeholder.com/400x400',
        social: {
          linkedin: 'https://linkedin.com',
        },
      },
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know',
    items: [
      {
        question: 'How does it work?',
        answer: 'Our platform is designed to be simple and intuitive. Just sign up, create your project, and start building!',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.',
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Yes! You can cancel your subscription at any time with no penalties or hidden fees.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund your payment.',
      },
    ],
  },

  video: {
    title: 'Watch Our Story',
    subtitle: 'See how we\'re making a difference',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },

  newsletter: {
    title: 'Stay Updated',
    subtitle: 'Subscribe to our newsletter for the latest updates',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },

  logoGrid: {
    title: 'Trusted By Leading Companies',
    subtitle: 'Join thousands of satisfied customers',
    logos: [
      { name: 'Company 1', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
      { name: 'Company 2', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
      { name: 'Company 3', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
      { name: 'Company 4', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
      { name: 'Company 5', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
      { name: 'Company 6', image: 'https://via.placeholder.com/150x50', url: 'https://example.com' },
    ],
  },

  testimonials: {
    title: 'What Our Customers Say',
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director, TechCorp',
        content: 'This platform has transformed how we work. Highly recommended!',
      },
      {
        name: 'David Chen',
        role: 'Founder, StartupXYZ',
        content: 'The best investment we\'ve made for our business. Amazing support team!',
      },
      {
        name: 'Emily Brown',
        role: 'Product Manager, InnovateCo',
        content: 'Incredible value and ease of use. Our team loves it!',
      },
    ],
  },

  contact: {
    title: 'Get In Touch',
    subtitle: 'We\'d love to hear from you',
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Suite 100, City, State 12345',
  },

  footer: {
    companyName: 'Your Company',
    tagline: 'Building the future, one step at a time',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
    copyright: '© 2024 Your Company. All rights reserved.',
  },

  blogList: {
    title: 'Latest from Our Blog',
    subtitle: 'Insights, tutorials, and updates from our team',
    postsToShow: 6,
    layout: 'grid',
  },

  blogPost: {
    postId: undefined,
  },

  blogCategories: {
    title: 'Explore by Category',
    displayStyle: 'grid',
  },
};

export const blockDescriptions: Record<BlockType, string> = {
  navbar: 'Sticky navigation bar with logo and links',
  hero: 'Eye-catching header with title and CTA',
  features: 'Showcase key features in a grid',
  stats: 'Display impressive numbers and metrics',
  cta: 'Strong call-to-action section',
  pricing: 'Pricing tiers and plans',
  gallery: 'Image gallery with hover effects',
  team: 'Team members with photos and bios',
  faq: 'Collapsible frequently asked questions',
  video: 'Embedded YouTube or Vimeo video',
  newsletter: 'Email subscription form',
  logoGrid: 'Grid of client/partner logos',
  testimonials: 'Customer reviews and quotes',
  contact: 'Contact form and information',
  footer: 'Footer with links and social media',
  blogList: 'Display recent blog posts in grid or list',
  blogPost: 'Full blog post with content and metadata',
  blogCategories: 'Browse blog posts by category',
};
