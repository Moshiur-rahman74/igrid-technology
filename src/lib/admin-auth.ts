import { supabase } from './supabase';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function getAdminUser() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Check if user is admin by checking admin_profiles table
  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  return adminProfile || null;
}

export async function requireAdmin() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    return false;
  }

  return true;
}
