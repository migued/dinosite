import { Block } from './blocks';

export interface Site {
  id: string;
  user_id: string;
  name: string;
  subdomain: string;
  blocks: Block[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  created_at: string;
  updated_at: string;
  published: boolean;
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
