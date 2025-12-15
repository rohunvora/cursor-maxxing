import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time
    console.warn('Supabase environment variables not set - using mock client')
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: new Error('Not configured') }),
        signUp: async () => ({ data: null, error: new Error('Not configured') }),
        signInWithOAuth: async () => ({ data: null, error: new Error('Not configured') }),
        signInWithOtp: async () => ({ data: null, error: new Error('Not configured') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ data: null, error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
    } as ReturnType<typeof createBrowserClient>
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
