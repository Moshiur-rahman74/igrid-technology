import { ProductBrand, ProductCategory, BudgetLevel, StockStatus } from './product';

// Database table types for Supabase

export interface DatabaseProduct {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  model: string;
  price: number;
  image: string;
  description: string;
  voltage: string;
  powerRating: string;
  communicationProtocol: string;
  inputOutputCount: string;
  compatibilityNotes: string;
  warranty: string;
  recommendedFor: string[];
  budgetLevel: BudgetLevel;
  stockStatus: StockStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: string;
  name: ProductBrand;
  logo?: string;
  description?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: ProductCategory;
  description?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompatibilityRule {
  id: string;
  source_product_id: string;
  target_product_id: string;
  rule_type: 'required' | 'recommended' | 'incompatible' | 'optional';
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuotationRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  message: string;
  product_ids: string[];
  status: 'pending' | 'reviewed' | 'quoted' | 'closed';
  created_at?: string;
  updated_at?: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  company_name?: string;
  rating: number;
  category: FeedbackCategory;
  message: string;
  status: FeedbackStatus;
  created_at?: string;
  updated_at?: string;
}

export type FeedbackCategory = 
  | 'product_quality'
  | 'customer_service'
  | 'delivery'
  | 'pricing'
  | 'website_experience'
  | 'other';

export type FeedbackStatus = 'new' | 'reviewed' | 'solved';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author?: string;
  cover_image?: string;
  published: boolean;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry?: string;
  problem?: string;
  solution?: string;
  result?: string;
  content?: string;
  image?: string;
  published: boolean;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at?: string;
  updated_at?: string;
}
