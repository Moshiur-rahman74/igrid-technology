-- Supabase Database Schema for IGrid Technology Website
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  model TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  voltage TEXT NOT NULL,
  power_rating TEXT NOT NULL,
  communication_protocol TEXT NOT NULL,
  input_output_count TEXT NOT NULL,
  compatibility_notes TEXT NOT NULL,
  warranty TEXT NOT NULL,
  recommended_for TEXT[] NOT NULL,
  budget_level TEXT NOT NULL,
  stock_status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  logo TEXT,
  description TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility rules table
CREATE TABLE IF NOT EXISTS compatibility_rules (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  target_product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rule_type TEXT NOT NULL CHECK (rule_type IN ('required', 'recommended', 'incompatible', 'optional')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(source_product_id, target_product_id)
);

-- Quotation requests table
CREATE TABLE IF NOT EXISTS quotation_requests (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  industry TEXT,
  message TEXT NOT NULL,
  product_ids TEXT[] NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'quoted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_logo TEXT,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_budget_level ON products(budget_level);
CREATE INDEX IF NOT EXISTS idx_products_stock_status ON products(stock_status);
CREATE INDEX IF NOT EXISTS idx_quotation_requests_status ON quotation_requests(status);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_product_id ON feedback(product_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compatibility_rules_updated_at BEFORE UPDATE ON compatibility_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotation_requests_updated_at BEFORE UPDATE ON quotation_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Products: Allow read access to everyone, write access to authenticated users
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Products can be inserted by authenticated users"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products can be updated by authenticated users"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Products can be deleted by authenticated users"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- Brands: Allow read access to everyone
CREATE POLICY "Brands are viewable by everyone"
  ON brands FOR SELECT
  USING (true);

CREATE POLICY "Brands can be managed by authenticated users"
  ON brands FOR ALL
  USING (auth.role() = 'authenticated');

-- Categories: Allow read access to everyone
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Compatibility rules: Allow read access to everyone
CREATE POLICY "Compatibility rules are viewable by everyone"
  ON compatibility_rules FOR SELECT
  USING (true);

CREATE POLICY "Compatibility rules can be managed by authenticated users"
  ON compatibility_rules FOR ALL
  USING (auth.role() = 'authenticated');

-- Quotation requests: Allow insert by everyone, read/write by authenticated
CREATE POLICY "Quotation requests can be inserted by everyone"
  ON quotation_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Quotation requests are viewable by authenticated users"
  ON quotation_requests FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Quotation requests can be updated by authenticated users"
  ON quotation_requests FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Feedback: Allow insert by everyone, read/write by authenticated
CREATE POLICY "Feedback can be inserted by everyone"
  ON feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Feedback is viewable by authenticated users"
  ON feedback FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Feedback can be updated by authenticated users"
  ON feedback FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Blog posts: Allow read of published posts to everyone, manage by authenticated
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "All blog posts are viewable by authenticated users"
  ON blog_posts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Blog posts can be managed by authenticated users"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Case studies: Allow read of published studies to everyone, manage by authenticated
CREATE POLICY "Published case studies are viewable by everyone"
  ON case_studies FOR SELECT
  USING (published = true);

CREATE POLICY "All case studies are viewable by authenticated users"
  ON case_studies FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Case studies can be managed by authenticated users"
  ON case_studies FOR ALL
  USING (auth.role() = 'authenticated');

-- Admin users: Restricted access
CREATE POLICY "Admin users are viewable by authenticated users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin users can be managed by authenticated users"
  ON admin_users FOR ALL
  USING (auth.role() = 'authenticated');
