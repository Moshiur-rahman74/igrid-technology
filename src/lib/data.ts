import { supabase } from './supabase';
import { products } from '@/data/products';
import { Product, ProductBrand, ProductCategory } from '@/types/product';
import { DatabaseProduct, Brand, Category, CompatibilityRule, QuotationRequest, Feedback, BlogPost, CaseStudy, AdminUser } from '@/types/supabase';

// Helper function to convert DatabaseProduct to Product
function convertToProduct(dbProduct: DatabaseProduct): Product {
  const { created_at: _created_at, updated_at: _updated_at, ...product } = dbProduct;
  return product as Product;
}

// Helper functions that work with fetched or local data
export const getProductsByCategory = (category: string, allProducts: Product[]): Product[] => {
  return allProducts.filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string, allProducts: Product[]): Product[] => {
  return allProducts.filter(product => product.brand === brand);
};

export const getProductsByBudgetLevel = (budgetLevel: string, allProducts: Product[]): Product[] => {
  return allProducts.filter(product => product.budgetLevel === budgetLevel);
};

export const getInStockProducts = (allProducts: Product[]): Product[] => {
  return allProducts.filter(product => product.stockStatus === 'In Stock');
};

// Products
export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    console.log('Supabase not configured, using local product data');
    return products;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.warn('Supabase fetch error, using local product data:', error.message);
      return products;
    }

    if (!data || data.length === 0) {
      console.log('No products in Supabase, using local data');
      return products;
    }

    return data.map(convertToProduct);
  } catch (error) {
    console.warn('Supabase network error, using local product data:', error instanceof Error ? error.message : 'Unknown error');
    return products;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    return products.find(p => p.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn('Supabase fetch error for product, using local data:', error.message);
      return products.find(p => p.id === id) || null;
    }

    if (!data) {
      return products.find(p => p.id === id) || null;
    }

    return convertToProduct(data);
  } catch (error) {
    console.warn('Supabase network error for product, using local data:', error instanceof Error ? error.message : 'Unknown error');
    return products.find(p => p.id === id) || null;
  }
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  if (!supabase) {
    // Extract unique brands from local products
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
    return uniqueBrands.map((brand, index) => ({
      id: `brand-${index}`,
      name: brand as ProductBrand,
    }));
  }

  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*');

    if (error) {
      console.warn('Supabase fetch error for brands, using local data:', error.message);
      const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
      return uniqueBrands.map((brand, index) => ({
        id: `brand-${index}`,
        name: brand as ProductBrand,
      })) as Brand[];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error for brands, using local data:', error instanceof Error ? error.message : 'Unknown error');
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand)));
    return uniqueBrands.map((brand, index) => ({
      id: `brand-${index}`,
      name: brand as ProductBrand,
    })) as Brand[];
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  if (!supabase) {
    // Extract unique categories from local products
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.map((category, index) => ({
      id: `category-${index}`,
      name: category as ProductCategory,
    })) as Category[];
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      console.warn('Supabase fetch error for categories, using local data:', error.message);
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
      return uniqueCategories.map((category, index) => ({
        id: `category-${index}`,
        name: category as ProductCategory,
      })) as Category[];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error for categories, using local data:', error instanceof Error ? error.message : 'Unknown error');
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.map((category, index) => ({
      id: `category-${index}`,
      name: category as ProductCategory,
    })) as Category[];
  }
}

// Compatibility Rules
export async function getCompatibilityRules(): Promise<CompatibilityRule[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('compatibility_rules')
      .select('*');

    if (error) {
      console.warn('Supabase fetch error for compatibility rules:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error for compatibility rules:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// Quotation Requests
export async function createQuotationRequest(request: Omit<QuotationRequest, 'id' | 'created_at' | 'updated_at'>): Promise<QuotationRequest | null> {
  if (!supabase) {
    console.warn('Supabase not configured, quotation request not saved');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('quotation_requests')
      .insert(request)
      .select()
      .single();

    if (error) {
      console.warn('Supabase error creating quotation request:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Supabase network error creating quotation request:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function getQuotationRequests(): Promise<QuotationRequest[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('quotation_requests')
      .select('*');

    if (error) {
      console.warn('Supabase error fetching quotation requests:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error fetching quotation requests:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// Feedback
export async function createFeedback(feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at'>): Promise<Feedback | null> {
  if (!supabase) {
    console.warn('Supabase not configured, feedback not saved');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert(feedback)
      .select()
      .single();

    if (error) {
      console.warn('Supabase error creating feedback:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Supabase network error creating feedback:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export async function getFeedback(): Promise<Feedback[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*');

    if (error) {
      console.warn('Supabase error fetching feedback:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error fetching feedback:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

// Blog Posts
export async function getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
  if (!supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('blog_posts')
      .select('*');

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase error fetching blog posts:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error fetching blog posts:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.warn('Supabase error fetching blog post:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Supabase network error fetching blog post:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Case Studies
export async function getCaseStudies(publishedOnly: boolean = true): Promise<CaseStudy[]> {
  if (!supabase) {
    return [];
  }

  try {
    let query = supabase
      .from('case_studies')
      .select('*');

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase error fetching case studies:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error fetching case studies:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.warn('Supabase error fetching case study:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Supabase network error fetching case study:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Admin Users
export async function getAdminUsers(): Promise<AdminUser[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*');

    if (error) {
      console.warn('Supabase error fetching admin users:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Supabase network error fetching admin users:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
}
