// Supabase Database Types for IGrid Technology

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: Brand
        Insert: BrandInsert
        Update: BrandUpdate
      }
      categories: {
        Row: Category
        Insert: CategoryInsert
        Update: CategoryUpdate
      }
      products: {
        Row: Product
        Insert: ProductInsert
        Update: ProductUpdate
      }
      compatibility_rules: {
        Row: CompatibilityRule
        Insert: CompatibilityRuleInsert
        Update: CompatibilityRuleUpdate
      }
      quotation_requests: {
        Row: QuotationRequest
        Insert: QuotationRequestInsert
        Update: QuotationRequestUpdate
      }
      feedback: {
        Row: Feedback
        Insert: FeedbackInsert
        Update: FeedbackUpdate
      }
      blogs: {
        Row: Blog
        Insert: BlogInsert
        Update: BlogUpdate
      }
      case_studies: {
        Row: CaseStudy
        Insert: CaseStudyInsert
        Update: CaseStudyUpdate
      }
      admin_profiles: {
        Row: AdminProfile
        Insert: AdminProfileInsert
        Update: AdminProfileUpdate
      }
    }
  }
}

// Brand Types
export interface Brand {
  id: string
  name: string
  logo: string | null
  description: string | null
  website: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface BrandInsert {
  id?: string
  name: string
  logo?: string | null
  description?: string | null
  website?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface BrandUpdate {
  id?: string
  name?: string
  logo?: string | null
  description?: string | null
  website?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  parent_id: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface CategoryInsert {
  id?: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  parent_id?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface CategoryUpdate {
  id?: string
  name?: string
  slug?: string
  description?: string | null
  icon?: string | null
  parent_id?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

// Product Types
export interface Product {
  id: string
  name: string
  brand_id: string | null
  category_id: string | null
  model: string | null
  price: number | null
  image: string | null
  description: string | null
  voltage: string | null
  power_rating: string | null
  communication_protocol: string | null
  input_output_count: number | null
  compatibility_notes: string | null
  warranty: string | null
  recommended_for: string | null
  budget_level: string | null
  stock_status: string
  status: string
  created_at: string
  updated_at: string
}

export interface ProductInsert {
  id?: string
  name: string
  brand_id?: string | null
  category_id?: string | null
  model?: string | null
  price?: number | null
  image?: string | null
  description?: string | null
  voltage?: string | null
  power_rating?: string | null
  communication_protocol?: string | null
  input_output_count?: number | null
  compatibility_notes?: string | null
  warranty?: string | null
  recommended_for?: string | null
  budget_level?: string | null
  stock_status?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface ProductUpdate {
  id?: string
  name?: string
  brand_id?: string | null
  category_id?: string | null
  model?: string | null
  price?: number | null
  image?: string | null
  description?: string | null
  voltage?: string | null
  power_rating?: string | null
  communication_protocol?: string | null
  input_output_count?: number | null
  compatibility_notes?: string | null
  warranty?: string | null
  recommended_for?: string | null
  budget_level?: string | null
  stock_status?: string
  status?: string
  created_at?: string
  updated_at?: string
}

// Compatibility Rule Types
export interface CompatibilityRule {
  id: string
  product_id: string | null
  compatible_product_id: string | null
  rule_type: string | null
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface CompatibilityRuleInsert {
  id?: string
  product_id?: string | null
  compatible_product_id?: string | null
  rule_type?: string | null
  description?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface CompatibilityRuleUpdate {
  id?: string
  product_id?: string | null
  compatible_product_id?: string | null
  rule_type?: string | null
  description?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

// Quotation Request Types
export interface QuotationRequest {
  id: string
  customer_name: string
  company_name: string | null
  email: string
  phone: string | null
  country: string | null
  industry_type: string | null
  machine_type: string | null
  budget_range: string | null
  selected_products: Json | null
  estimated_cost: number | null
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface QuotationRequestInsert {
  id?: string
  customer_name: string
  company_name?: string | null
  email: string
  phone?: string | null
  country?: string | null
  industry_type?: string | null
  machine_type?: string | null
  budget_range?: string | null
  selected_products?: Json | null
  estimated_cost?: number | null
  message?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface QuotationRequestUpdate {
  id?: string
  customer_name?: string
  company_name?: string | null
  email?: string
  phone?: string | null
  country?: string | null
  industry_type?: string | null
  machine_type?: string | null
  budget_range?: string | null
  selected_products?: Json | null
  estimated_cost?: number | null
  message?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

// Feedback Types
export interface Feedback {
  id: string
  name: string
  email: string
  company_name: string | null
  rating: number | null
  category: string | null
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface FeedbackInsert {
  id?: string
  name: string
  email: string
  company_name?: string | null
  rating?: number | null
  category?: string | null
  message?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface FeedbackUpdate {
  id?: string
  name?: string
  email?: string
  company_name?: string | null
  rating?: number | null
  category?: string | null
  message?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

// Blog Types
export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  author: string | null
  cover_image: string | null
  published: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface BlogInsert {
  id?: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  author?: string | null
  cover_image?: string | null
  published?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

export interface BlogUpdate {
  id?: string
  title?: string
  slug?: string
  excerpt?: string | null
  content?: string | null
  author?: string | null
  cover_image?: string | null
  published?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

// Case Study Types
export interface CaseStudy {
  id: string
  title: string
  industry: string | null
  problem: string | null
  solution: string | null
  result: string | null
  content: string | null
  image: string | null
  published: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface CaseStudyInsert {
  id?: string
  title: string
  industry?: string | null
  problem?: string | null
  solution?: string | null
  result?: string | null
  content?: string | null
  image?: string | null
  published?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

export interface CaseStudyUpdate {
  id?: string
  title?: string
  industry?: string | null
  problem?: string | null
  solution?: string | null
  result?: string | null
  content?: string | null
  image?: string | null
  published?: boolean
  status?: string
  created_at?: string
  updated_at?: string
}

// Admin Profile Types
export interface AdminProfile {
  id: string
  user_id: string
  name: string
  email: string
  role: string
  permissions: Json | null
  last_login: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface AdminProfileInsert {
  id?: string
  user_id: string
  name: string
  email: string
  role?: string
  permissions?: Json | null
  last_login?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}

export interface AdminProfileUpdate {
  id?: string
  user_id?: string
  name?: string
  email?: string
  role?: string
  permissions?: Json | null
  last_login?: string | null
  status?: string
  created_at?: string
  updated_at?: string
}
