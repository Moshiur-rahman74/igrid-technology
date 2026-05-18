# Supabase Setup Guide

This guide will help you set up Supabase for the IGrid Technology website.

## Prerequisites

- A Supabase account (free tier is sufficient)
- Basic knowledge of SQL

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the project details:
   - Name: `igrid-technology`
   - Database Password: (choose a strong password and save it)
   - Region: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (usually 1-2 minutes)

## Step 2: Get Your Credentials

1. Go to your project dashboard
2. Navigate to **Settings > API**
3. Copy the following values:
   - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` / `public` Key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Set Environment Variables

Create or update your `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Set Up the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click "New Query"
4. Copy the contents of `supabase-schema.sql` from the project root
5. Paste it into the SQL Editor
6. Click "Run" to execute the schema
7. Verify that all tables were created successfully in the **Table Editor**

## Step 5: (Optional) Import Sample Data

If you want to populate the products table with the sample data from the project:

1. Go to the **Table Editor** in Supabase
2. Select the `products` table
3. Click "Insert row"
4. You can either:
   - Manually enter product data
   - Use the Supabase CLI to import data
   - Write a script to migrate data from `src/data/products.ts`

## Step 6: Verify the Setup

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the hardware configurator page
3. Check the browser console - you should see:
   - If Supabase is configured: No warnings, data fetched from Supabase
   - If Supabase is not configured: "Supabase environment variables not found" warning, but the app will still work with local data

## How It Works

The application is designed to work with or without Supabase:

- **With Supabase**: Data is fetched from the database, allowing for dynamic content management
- **Without Supabase**: Falls back to local sample data in `src/data/products.ts`

This ensures the application works immediately even before Supabase is set up.

## Database Tables

The schema includes the following tables:

- `products` - Product catalog
- `brands` - Brand information
- `categories` - Product categories
- `compatibility_rules` - Product compatibility rules
- `quotation_requests` - Customer quotation requests
- `feedback` - Customer feedback
- `blog_posts` - Blog content
- `case_studies` - Case study content
- `admin_users` - Admin user management

## Security Notes

- The `anon` key is safe to use in client-side code as it has Row Level Security (RLS) policies
- RLS policies are configured to allow public read access for most tables
- Write operations require authentication
- For production, consider implementing proper authentication with Supabase Auth

## Troubleshooting

### "Supabase environment variables not found"
- Check that `.env.local` exists in the project root
- Verify the variable names match exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart the development server after adding environment variables

### Data not loading from Supabase
- Check the browser console for error messages
- Verify your Supabase project URL and anon key are correct
- Ensure the tables exist in your Supabase project
- Check RLS policies in Supabase dashboard

### Connection errors
- Verify your Supabase project is active (not paused)
- Check that you're using the correct region
- Ensure your network allows connections to Supabase

## Next Steps

After setting up Supabase:

1. Implement authentication for admin features
2. Create an admin dashboard to manage products, blogs, and case studies
3. Set up real-time subscriptions for live updates
4. Configure storage for product images and other media
5. Set up database functions for complex queries

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
